import { NextRequest, NextResponse } from "next/server";
import { runAI, runAIStream, MODEL_FREE, MODEL_PREMIUM } from "@/lib/ai";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { DAILY_FREE_LIMIT } from "@/lib/limits";
import { db } from "@/lib/db";
import {
  applyGuestCookie,
  buildIncrementedGuestCookie,
  evaluateGuestUsage,
} from "@/lib/guest-limits";

const MAX_PROMPT_CHARS = 12000;
const MAX_SYSTEM_PROMPT_CHARS = 4000;

type AuthContext = {
  isAuthenticated: boolean;
  isPremium: boolean;
  resolvedUserId: string | null;
  /** Remaining uses AFTER a successful generation (-1 = unlimited). */
  remaining: number;
  isGuest: boolean;
};

function friendlyAIError(err: unknown): string {
  const message = err instanceof Error ? err.message : "AI generation failed";
  if (/rate limit|429/i.test(message)) {
    return "The AI service is busy right now. Please wait a few seconds and try again.";
  }
  if (/timeout|ETIMEDOUT|network|ECONNRESET|fetch failed/i.test(message)) {
    return "The request timed out. Try a shorter input or try again shortly.";
  }
  if (/API key|authentication|401|403/i.test(message)) {
    return "AI service configuration error. Please try again later or contact support.";
  }
  if (err instanceof Error && err.name === "AbortError") {
    return "Cancelled";
  }
  return "AI generation failed. Please try again in a moment.";
}

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
      // UTC day boundary — matches guest cookie date key (YYYY-MM-DD UTC)
      const startOfToday = new Date();
      startOfToday.setUTCHours(0, 0, 0, 0);

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
      // Project remaining after this successful use (history written on success)
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
    // Project remaining after a successful use (cookie applied only on success)
    remaining = Math.max(0, guest.remaining - 1);
  }

  return {
    ok: true,
    ctx: {
      isAuthenticated,
      isPremium,
      resolvedUserId,
      remaining,
      isGuest: !isAuthenticated,
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
      let guestCookieValue: string | undefined;
      let finalRemaining = ctx.remaining;

      // Buffer the first token so we only charge guest quota after AI responds.
      // Headers (incl. Set-Cookie) must be set before the body streams.
      const streamGen = runAIStream(
        prompt,
        safeSystemPrompt,
        model,
        slug,
        req.signal,
      );

      let firstDelta: string | undefined;
      try {
        const first = await streamGen.next();
        if (first.done || typeof first.value !== "string" || !first.value) {
          // Empty stream — try to drain any error by continuing; treat as failure
          return NextResponse.json(
            { error: "Empty response from AI. Please try again." },
            { status: 502 },
          );
        }
        firstDelta = first.value;
        fullText = firstDelta;
      } catch (err) {
        console.error("Stream AI Error (first chunk):", err);
        return NextResponse.json(
          { error: friendlyAIError(err) },
          { status: 502 },
        );
      }

      if (ctx.isGuest) {
        const inc = await buildIncrementedGuestCookie();
        guestCookieValue = inc.cookieValue;
        finalRemaining = inc.remaining;
      }

      const readable = new ReadableStream({
        async start(controller) {
          const send = (obj: Record<string, unknown>) => {
            controller.enqueue(encoder.encode(`${JSON.stringify(obj)}\n`));
          };
          try {
            send({
              type: "meta",
              remaining: finalRemaining,
              isGuest: ctx.isGuest,
              isPremium: ctx.isPremium,
            });

            send({ type: "delta", text: firstDelta });

            for await (const delta of streamGen) {
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
                error: friendlyAIError(err),
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
      if (guestCookieValue) {
        applyGuestCookie(response, guestCookieValue);
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

    let remaining = ctx.remaining;
    let guestCookieValue: string | undefined;
    if (ctx.isGuest) {
      const inc = await buildIncrementedGuestCookie();
      guestCookieValue = inc.cookieValue;
      remaining = inc.remaining;
    }

    const response = NextResponse.json({
      success: true,
      result: result.content,
      remaining,
      isGuest: ctx.isGuest,
      isPremium: ctx.isPremium,
    });

    if (guestCookieValue) {
      applyGuestCookie(response, guestCookieValue);
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
