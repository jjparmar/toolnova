/**
 * Safe post-login redirect: relative path only (no open redirects).
 */
export function safeCallbackUrl(
  raw: string | null | undefined,
  fallback ="/dashboard",
): string {
  if (!raw) return fallback;
  // Relative site path only
  if (!raw.startsWith("/") || raw.startsWith("//")) return fallback;
  // Block protocol-relative tricks and backslash escapes
  if (raw.includes("://") || raw.includes("\\")) return fallback;
  return raw;
}

/** Read callbackUrl from the current browser URL (client-only). */
export function getClientCallbackUrl(fallback ="/dashboard"): string {
  if (typeof window ==="undefined") return fallback;
  try {
    const params = new URLSearchParams(window.location.search);
    return safeCallbackUrl(params.get("callbackUrl"), fallback);
  } catch {
    return fallback;
  }
}
