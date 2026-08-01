/**
 * Guest (no-login) daily AI usage limits.
 * Cookie-signed counter so free tools work without sign-up while still
 * protecting against basic abuse. Authenticated users use DB history instead.
 */

import { createHmac, timingSafeEqual } from"crypto";
import { cookies } from"next/headers";
import type { NextResponse } from"next/server";
import { DAILY_FREE_LIMIT } from"@/lib/limits";

export const GUEST_COOKIE_NAME ="tn_guest_ai";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 2; // 2 days

function getSecret(): string {
  return (
    process.env.NEXTAUTH_SECRET ||
    process.env.GUEST_LIMIT_SECRET ||"toolnova-guest-limit-dev-secret"
  );
}

function todayKey(): string {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD UTC
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

function safeEqual(a: string, b: string): boolean {
  try {
    const ba = Buffer.from(a);
    const bb = Buffer.from(b);
    if (ba.length !== bb.length) return false;
    return timingSafeEqual(ba, bb);
  } catch {
    return false;
  }
}

export interface GuestUsageState {
  date: string;
  count: number;
  limit: number;
  remaining: number;
}

function parseGuestCookie(raw: string | undefined): { date: string; count: number } {
  if (!raw) return { date: todayKey(), count: 0 };

  const [date, countStr, sig] = raw.split(".");
  if (!date || countStr === undefined || !sig) {
    return { date: todayKey(), count: 0 };
  }

  const payload =`${date}.${countStr}`;
  const expected = sign(payload);
  if (!safeEqual(sig, expected)) {
    return { date: todayKey(), count: 0 };
  }

  const count = Math.max(0, parseInt(countStr, 10) || 0);
  if (date !== todayKey()) {
    return { date: todayKey(), count: 0 };
  }

  return { date, count };
}

function encodeGuestCookie(date: string, count: number): string {
  const payload =`${date}.${count}`;
  return`${payload}.${sign(payload)}`;
}

/**
 * Read guest usage without incrementing.
 */
export async function getGuestUsage(): Promise<GuestUsageState> {
  const jar = await cookies();
  const parsed = parseGuestCookie(jar.get(GUEST_COOKIE_NAME)?.value);
  const limit = DAILY_FREE_LIMIT;
  return {
    date: parsed.date,
    count: parsed.count,
    limit,
    remaining: Math.max(0, limit - parsed.count),
  };
}

/**
 * Check whether a guest is still under the daily free AI limit (no increment).
 */
export async function evaluateGuestUsage(): Promise<
  GuestUsageState & { allowed: boolean }
> {
  const usage = await getGuestUsage();
  return {
    ...usage,
    allowed: usage.count < usage.limit,
  };
}

/**
 * Build the signed cookie value for the next successful AI use.
 * Call only after generation succeeds so failed requests do not burn quota.
 */
export async function buildIncrementedGuestCookie(): Promise<{
  cookieValue: string;
  remaining: number;
  count: number;
  limit: number;
}> {
  const jar = await cookies();
  const parsed = parseGuestCookie(jar.get(GUEST_COOKIE_NAME)?.value);
  const limit = DAILY_FREE_LIMIT;
  const nextCount = Math.min(limit, parsed.count + 1);
  return {
    cookieValue: encodeGuestCookie(parsed.date, nextCount),
    remaining: Math.max(0, limit - nextCount),
    count: nextCount,
    limit,
  };
}

/** Attach signed guest-usage cookie to an API response. */
export function applyGuestCookie(
  response: NextResponse,
  cookieValue: string,
): void {
  response.cookies.set(GUEST_COOKIE_NAME, cookieValue, {
    httpOnly: true,
    sameSite:"lax",
    secure: process.env.NODE_ENV ==="production",
    path:"/",
    maxAge: MAX_AGE_SECONDS,
  });
}
