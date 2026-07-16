/**
 * Shared text helpers for browser-side utility tools.
 */

/** Grapheme-aware length (emoji / combined chars count as 1 when Segmenter exists). */
export function graphemeLength(text: string): number {
  if (!text) return 0;
  try {
    if (typeof Intl !=="undefined" &&"Segmenter" in Intl) {
      const seg = new Intl.Segmenter(undefined, { granularity:"grapheme" });
      return Array.from(seg.segment(text)).length;
    }
  } catch {
    // fall through
  }
  // Code points (better than UTF-16 .length for most emoji)
  return Array.from(text).length;
}

/** Whitespace-split words; keeps hyphenated tokens as one word. */
export function countWords(text: string): string[] {
  const trimmed = text.trim();
  if (!trimmed) return [];
  return trimmed.split(/\s+/).filter((w) => w.length > 0);
}

export function countSentences(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length;
}

export function countParagraphs(text: string): number {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
}

const TITLE_SMALL =
  /^(a|an|the|and|but|or|for|nor|on|at|to|from|by|of|in|with|as)$/i;

/** Title Case with common English small-word handling (first/last always capped). */
export function toTitleCase(input: string): string {
  const words = input.toLowerCase().split(/(\s+)/);
  let wordIndex = 0;
  const totalWords = words.filter((w) => !/^\s+$/.test(w)).length;
  return words
    .map((part) => {
      if (/^\s+$/.test(part) || !part) return part;
      wordIndex += 1;
      const isEdge = wordIndex === 1 || wordIndex === totalWords;
      if (!isEdge && TITLE_SMALL.test(part)) return part.toLowerCase();
      return part.replace(/^[a-z\u00C0-\u024F]/, (c) => c.toUpperCase());
    })
    .join("");
}

export function toSentenceCase(input: string): string {
  return input
    .toLowerCase()
    .replace(/(^\s*[a-z\u00C0-\u024F])|([.!?]\s+[a-z\u00C0-\u024F])/g, (m) =>
      m.toUpperCase(),
    );
}

/** Split identifier-like text into words for camel/pascal conversion. */
function wordsFromMixed(input: string): string[] {
  const cleaned = input
    .replace(/([a-z0-9])([A-Z])/g,"$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g,"$1 $2")
    .replace(/[^a-zA-Z0-9]+/g,"")
    .trim();
  if (!cleaned) return [];
  return cleaned.split(/\s+/).filter(Boolean);
}

export function toCamelCase(input: string): string {
  const words = wordsFromMixed(input);
  if (!words.length) return"";
  return words
    .map((w, i) => {
      const lower = w.toLowerCase();
      if (i === 0) return lower;
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
}

export function toPascalCase(input: string): string {
  const words = wordsFromMixed(input);
  return words
    .map((w) => {
      const lower = w.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    })
    .join("");
}

export function toSnakeCase(input: string): string {
  return wordsFromMixed(input)
    .map((w) => w.toLowerCase())
    .join("_");
}

export function toKebabCase(input: string): string {
  return wordsFromMixed(input)
    .map((w) => w.toLowerCase())
    .join("-");
}

export type AgeBreakdown = {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  nextBirthday: Date;
  daysToNextBirthday: number;
  isBirthdayToday: boolean;
  birthDate: Date;
  calculatedOn: Date;
};

/** Exact age Y/M/D + next birthday (handles Feb 29). */
export function calculateAge(birthDate: Date, asOf: Date = new Date()): AgeBreakdown | { error: string } {
  const today = new Date(asOf);
  today.setHours(0, 0, 0, 0);
  const birth = new Date(birthDate);
  birth.setHours(0, 0, 0, 0);

  if (isNaN(birth.getTime())) return { error:"Invalid date" };
  if (birth > today) return { error:"Birth date cannot be in the future" };

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const totalDays = Math.floor(
    (today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24),
  );
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;

  // Next birthday: use Mar 1 for Feb 29 births in non-leap years
  const next = nextBirthdayDate(birth, today);
  const daysToNextBirthday = Math.round(
    (next.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
  );

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    nextBirthday: next,
    daysToNextBirthday,
    isBirthdayToday: daysToNextBirthday === 0,
    birthDate: birth,
    calculatedOn: today,
  };
}

function isLeapYear(y: number) {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
}

function nextBirthdayDate(birth: Date, today: Date): Date {
  const month = birth.getMonth();
  const day = birth.getDate();
  const tryYear = (y: number) => {
    if (month === 1 && day === 29 && !isLeapYear(y)) {
      // Anniversary on Mar 1 in non-leap years
      return new Date(y, 2, 1);
    }
    return new Date(y, month, day);
  };

  let candidate = tryYear(today.getFullYear());
  if (candidate < today) {
    candidate = tryYear(today.getFullYear() + 1);
  }
  return candidate;
}

export function parseFlexibleDate(input: string): Date | null {
  const raw = input.trim();
  if (!raw) return null;

  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) {
    const [y, m, d] = raw.split("-").map(Number);
    const date = new Date(y, m - 1, d);
    if (
      date.getFullYear() === y &&
      date.getMonth() === m - 1 &&
      date.getDate() === d
    ) {
      return date;
    }
    return null;
  }

  if (raw.includes("/")) {
    const parts = raw.split("/").map((p) => p.trim());
    if (parts.length !== 3) return null;
    const a = parseInt(parts[0], 10);
    const b = parseInt(parts[1], 10);
    const y = parseInt(parts[2], 10);
    if (!a || !b || !y || y < 1000 || y > 9999) return null;

    const candidates: Date[] = [];
    if (a >= 1 && a <= 12 && b >= 1 && b <= 31) {
      const md = new Date(y, a - 1, b);
      if (
        md.getFullYear() === y &&
        md.getMonth() === a - 1 &&
        md.getDate() === b
      ) {
        candidates.push(md);
      }
    }
    if (b >= 1 && b <= 12 && a >= 1 && a <= 31) {
      const dm = new Date(y, b - 1, a);
      if (
        dm.getFullYear() === y &&
        dm.getMonth() === b - 1 &&
        dm.getDate() === a &&
        !candidates.some(
          (c) =>
            c.getFullYear() === dm.getFullYear() &&
            c.getMonth() === dm.getMonth() &&
            c.getDate() === dm.getDate(),
        )
      ) {
        candidates.push(dm);
      }
    }
    if (candidates.length >= 1) return candidates[0];
    return null;
  }

  const fallback = new Date(raw);
  return isNaN(fallback.getTime()) ? null : fallback;
}
