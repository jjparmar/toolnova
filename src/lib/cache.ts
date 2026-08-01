import { db } from "./db";
import crypto from "crypto";

/**
 * In-memory LRU cache for hot responses (avoids DB hit on every request)
 */
const memoryCache = new Map<string, { response: string; expires: number }>();
const MEMORY_CACHE_TTL = 5 * 60 * 1000; // 5 minutes
const MEMORY_CACHE_MAX = 500;

function getMemoryCached(key: string): string | null {
  const entry = memoryCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    memoryCache.delete(key);
    return null;
  }
  // Move to end (LRU)
  memoryCache.delete(key);
  memoryCache.set(key, entry);
  return entry.response;
}

function setMemoryCached(key: string, response: string): void {
  if (memoryCache.size >= MEMORY_CACHE_MAX) {
    // Evict oldest
    const firstKey = memoryCache.keys().next().value;
    if (firstKey) memoryCache.delete(firstKey);
  }
  memoryCache.set(key, { response, expires: Date.now() + MEMORY_CACHE_TTL });
}

/**
 * Generate SHA-256 hash of the prompt to use as a key
 */
export function hashPrompt(prompt: string): string {
  return crypto.createHash("sha256").update(prompt.trim()).digest("hex");
}

/**
 * Retrieve cached response if it exists (memory first, then DB)
 */
export async function getCachedResponse(prompt: string): Promise<string | null> {
  // 1. Check memory cache first (fast path)
  const hash = hashPrompt(prompt);
  const memResult = getMemoryCached(hash);
  if (memResult) {
    return memResult;
  }

  // 2. Check DB cache (persistent path)
  try {
    // Prisma maps model AICache → client.aICache
    const cachedItem = await db.aICache.findUnique({
      where: { promptHash: hash },
    });

    if (cachedItem) {
      setMemoryCached(hash, cachedItem.response);
      return cachedItem.response;
    }
  } catch (error) {
    console.error("Cache Retrieval Error:", error);
  }

  return null;
}

/**
 * Store AI response in both memory and database
 */
export async function cacheResponse(
  prompt: string,
  response: string,
): Promise<void> {
  const hash = hashPrompt(prompt);

  // Store in memory immediately
  setMemoryCached(hash, response);

  // Store in DB for persistence
  try {
    await db.aICache.upsert({
      where: { promptHash: hash },
      update: { response },
      create: {
        promptHash: hash,
        prompt: prompt.trim().slice(0, 65000),
        response,
      },
    });
  } catch (error) {
    console.error("Cache Storage Error:", error);
  }
}
