/** Shared display formatters for blog/UI */

export function formatDisplayDate(input: string | Date | undefined): string {
  if (!input) return "";
  const d = input instanceof Date ? input : new Date(input);
  if (Number.isNaN(d.getTime())) return String(input);
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Normalize "5 min read" / "5" / "5 min" → "5 min read" */
export function formatReadTime(input: string | number | undefined): string {
  if (input == null || input === "") return "";
  const raw = String(input).trim();
  const n = parseInt(raw.replace(/[^\d]/g, ""), 10);
  if (!Number.isFinite(n) || n <= 0) {
    return raw.includes("read") ? raw : `${raw} read`;
  }
  return `${n} min read`;
}
