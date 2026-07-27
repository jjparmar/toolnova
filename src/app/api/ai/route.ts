import { NextRequest, NextResponse } from "next/server";
import { runAI, runAIStream, MODEL_FREE, MODEL_PREMIUM } from "@/lib/ai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DAILY_FREE_LIMIT } from "@/lib/limits";
import { db } from "@/lib/db";
import { applyGuestCookie, evaluateGuestUsage } from "@/lib/guest-limits";

const MAX_PROMPT_CHARS = 12000;
const MAX_SYSTEM_PROMPT_CHARS = 4000;

type AuthContext = {
  isAuthenticated: boolean;
  isPremium: boolean;
  resolvedUserId: string | null;
  remaining: number;
  guestCookieValue?: string;
};

async function resolveAuthAndLimits(): Promise<
  | { ok: true; ctx: AuthContext }
  | { ok: false; response: NextResponse }
> {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const isAuthenticated = !!(user && user.email);

  let isPremium = false;
  let resolvedUserId: string | null = null;
  let remaining: number = DAILY_FREE_LIMIT;
  let guestCookieValue: string | undefined;

  if (isAuthenticated && user?.email) {
    const dbUser = await db.user.upsert({
      where: { email: user.email },
      create: {
        email: user.email,
        name: user.name || null,
        image: user.image || null,
      },
      update: {
        name: user.name || null,
        image: user.image || null,
      },
    });
    resolvedUserId = dbUser.id;

    const subscription = await db.subscription.findFirst({
      where: {
        userId: resolvedUserId,
        status: "active",
      },
    });
    isPremium = !!subscription;

    if (!isPremium) {
      const startOfToday = new Date();
      startOfToday.setHours(0, 0, 0, 0);

      const currentCount = await db.generationHistory.count({
        where: {
          userId: resolvedUserId,
          createdAt: { gte: startOfToday },
        },
      });

      if (currentCount >= DAILY_FREE_LIMIT) {
        return {
          ok: false,
          response: NextResponse.json(
            {
              error: `Daily free limit reached (${DAILY_FREE_LIMIT} uses). Upgrade to Pro for unlimited access, or try again tomorrow.`,
              code: "DAILY_LIMIT",
              remaining: 0,
              limit: DAILY_FREE_LIMIT,
            },
            { status: 429 },
          ),
        };
      }
      remaining = Math.max(0, DAILY_FREE_LIMIT - currentCount - 1);
    } else {
      remaining = -1;
    }
  } else {
    const guest = await evaluateGuestUsage();
    if (!guest.allowed) {
      return {
        ok: false,
        response: NextResponse.json(
          {
            error: `Daily free limit reached (${DAILY_FREE_LIMIT} uses without an account). Create a free account for another ${DAILY_FREE_LIMIT} uses/day, or upgrade to Pro for unlimited access.`,
            code: "DAILY_LIMIT",
            remaining: 0,
            limit: DAILY_FREE_LIMIT,
          },
          { status: 429 },
        ),
      };
    }
    remaining = guest.remaining;
    guestCookieValue = guest.cookieValue;
  }

  return {
    ok: true,
    ctx: {
      isAuthenticated,
      isPremium,
      resolvedUserId,
      remaining,
      guestCookieValue,
    },
  };
}

async function saveHistory(
  userId: string | null,
  slug: string,
  prompt: string,
  safeSystemPrompt: string | undefined,
  responseText: string,
) {
  if (!userId) return;
  try {
    await db.generationHistory.create({
      data: {
        userId,
        toolSlug: slug,
        prompt: JSON.stringify({
          prompt: prompt.slice(0, 8000),
          systemPrompt: safeSystemPrompt?.slice(0, 1000),
        }),
        response: responseText,
      },
    });
  } catch (historyError) {
    console.error("Error saving history:", historyError);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      prompt,
      systemPrompt,
      toolSlug = "unknown",
      stream = false,
    }: {
      prompt?: unknown;
      systemPrompt?: unknown;
      toolSlug?: string;
      stream?: unknown;
    } = body;

    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      return NextResponse.json(
        { error: "Prompt is required and must be a non-empty string" },
        { status: 400 },
      );
    }

    if (prompt.length > MAX_PROMPT_CHARS) {
      return NextResponse.json(
        {
          error: `Prompt is too long. Please keep it under ${MAX_PROMPT_CHARS.toLocaleString()} characters.`,
        },
        { status: 400 },
      );
    }

    const safeSystemPrompt =
      typeof systemPrompt === "string" && systemPrompt.trim()
        ? systemPrompt.slice(0, MAX_SYSTEM_PROMPT_CHARS)
        : undefined;

    const auth = await resolveAuthAndLimits();
    if (!auth.ok) return auth.response;
    const { ctx } = auth;

    const model = ctx.isPremium ? MODEL_PREMIUM : MODEL_FREE;
    const slug = String(toolSlug || "unknown").slice(0, 120);
    const wantStream = stream === true;

    // ── Streaming path (SSE-style NDJSON lines) ─────────────────────────
    if (wantStream) {
      const encoder = new TextEncoder();
      let fullText = "";

      const readable = new ReadableStream({
        async start(controller) {
          const send = (obj: Record<string, unknown>) => {
            controller.enqueue(
              encoder.encode(`${JSON.stringify(obj)}\n`),
            );
          };
          try {
            send({
              type: "meta",
              remaining: ctx.remaining,
              isGuest: !ctx.isAuthenticated,
              isPremium: ctx.isPremium,
            });

            for await (const delta of runAIStream(
              prompt,
              safeSystemPrompt,
              model,
              slug,
              req.signal,
            )) {
              fullText += delta;
              send({ type: "delta", text: delta });
            }

            if (!fullText.trim()) {
              send({
                type: "error",
                error: "Empty response from AI. Please try again.",
              });
            } else {
              await saveHistory(
                ctx.resolvedUserId,
                slug,
                prompt,
                safeSystemPrompt,
                fullText,
              );
              send({ type: "done", result: fullText });
            }
          } catch (err) {
            if (err instanceof Error && err.name === "AbortError") {
              send({ type: "error", error: "Cancelled" });
            } else {
              console.error("Stream AI Error:", err);
              send({
                type: "error",
                error:
                  err instanceof Error
                    ? err.message
                    : "AI generation failed",
              });
            }
          } finally {
            controller.close();
          }
        },
      });

      const response = new NextResponse(readable, {
        headers: {
          "Content-Type": "application/x-ndjson; charset=utf-8",
          "Cache-Control": "no-store",
          "X-Accel-Buffering": "no",
        },
      });
      if (ctx.guestCookieValue) {
        applyGuestCookie(response, ctx.guestCookieValue);
      }
      return response;
    }

    // ── Classic JSON path ───────────────────────────────────────────────
    const result = await runAI(prompt, safeSystemPrompt, model, slug);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "AI generation failed" },
        { status: 500 },
      );
    }

    await saveHistory(
      ctx.resolvedUserId,
      slug,
      prompt,
      safeSystemPrompt,
      result.content || "",
    );

    const response = NextResponse.json({
      success: true,
      result: result.content,
      remaining: ctx.remaining,
      isGuest: !ctx.isAuthenticated,
      isPremium: ctx.isPremium,
    });

    if (ctx.guestCookieValue) {
      applyGuestCookie(response, ctx.guestCookieValue);
    }

    return response;
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
