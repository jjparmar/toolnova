import { NextRequest, NextResponse } from"next/server";
import { runAI, MODEL_FREE, MODEL_PREMIUM } from"@/lib/ai";
import { getServerSession } from"next-auth";
import { authOptions } from"@/lib/auth";
import { DAILY_FREE_LIMIT } from"@/lib/limits";
import { db } from"@/lib/db";
import { applyGuestCookie, evaluateGuestUsage } from"@/lib/guest-limits";

const MAX_PROMPT_CHARS = 12000;
const MAX_SYSTEM_PROMPT_CHARS = 4000;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      prompt,
      systemPrompt,
      toolSlug ="unknown",
    }: {
      prompt?: unknown;
      systemPrompt?: unknown;
      toolSlug?: string;
    } = body;

    if (!prompt || typeof prompt !=="string" || !prompt.trim()) {
      return NextResponse.json(
        { error:"Prompt is required and must be a non-empty string" },
        { status: 400 },
      );
    }

    if (prompt.length > MAX_PROMPT_CHARS) {
      return NextResponse.json(
        {
          error:`Prompt is too long. Please keep it under ${MAX_PROMPT_CHARS.toLocaleString()} characters.`,
        },
        { status: 400 },
      );
    }

    const safeSystemPrompt =
      typeof systemPrompt ==="string" && systemPrompt.trim()
        ? systemPrompt.slice(0, MAX_SYSTEM_PROMPT_CHARS)
        : undefined;

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
          status:"active",
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
          return NextResponse.json(
            {
              error:`Daily free limit reached (${DAILY_FREE_LIMIT} uses). Upgrade to Pro for unlimited access, or try again tomorrow.`,
              code:"DAILY_LIMIT",
              remaining: 0,
              limit: DAILY_FREE_LIMIT,
            },
            { status: 429 },
          );
        }
        // After this successful request, history will increment by 1
        remaining = Math.max(0, DAILY_FREE_LIMIT - currentCount - 1);
      } else {
        remaining = -1;
      }
    } else {
      // Guest (no account) — free daily allowance via signed cookie
      const guest = await evaluateGuestUsage();
      if (!guest.allowed) {
        return NextResponse.json(
          {
            error:`Daily free limit reached (${DAILY_FREE_LIMIT} uses without an account). Create a free account for another ${DAILY_FREE_LIMIT} uses/day, or upgrade to Pro for unlimited access.`,
            code:"DAILY_LIMIT",
            remaining: 0,
            limit: DAILY_FREE_LIMIT,
          },
          { status: 429 },
        );
      }
      remaining = guest.remaining;
      guestCookieValue = guest.cookieValue;
    }

    const model = isPremium ? MODEL_PREMIUM : MODEL_FREE;
    const slug = String(toolSlug ||"unknown").slice(0, 120);
    // Tool-aware system prompts + higher token limits for quality results
    const result = await runAI(prompt, safeSystemPrompt, model, slug);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error ||"AI generation failed" },
        { status: 500 },
      );
    }

    if (resolvedUserId) {
      try {
        await db.generationHistory.create({
          data: {
            userId: resolvedUserId,
            toolSlug: slug,
            prompt: JSON.stringify({
              prompt: prompt.slice(0, 8000),
              systemPrompt: safeSystemPrompt?.slice(0, 1000),
            }),
            response: result.content ||"",
          },
        });
      } catch (historyError) {
        console.error("Error saving history:", historyError);
      }
    }

    const response = NextResponse.json({
      success: true,
      result: result.content,
      remaining,
      isGuest: !isAuthenticated,
      isPremium,
    });

    if (guestCookieValue) {
      applyGuestCookie(response, guestCookieValue);
    }

    return response;
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error:"Internal server error" },
      { status: 500 },
    );
  }
}
