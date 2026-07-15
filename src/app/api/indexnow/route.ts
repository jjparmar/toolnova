import { NextRequest, NextResponse } from "next/server";
import { siteConfig } from "@/config/site";

// Keep synced with /public/[KEY].txt and scripts/ping-search-engines.js
const INDEXNOW_KEY = "fdcca368392a42d9916dcffd147d6ebf";
const INDEXNOW_KEY_LOCATION = `${siteConfig.url}/${INDEXNOW_KEY}.txt`;

const ENDPOINTS = [
  "https://api.indexnow.org/indexnow",
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
];

const MAX_URLS = 100; // IndexNow allows more; small batches are more reliable

function authorized(req: NextRequest): boolean {
  const secret =
    process.env.INDEXNOW_API_SECRET || process.env.NEXTAUTH_SECRET || "";
  if (!secret) {
    // In production require a secret so the endpoint cannot be abused
    return process.env.NODE_ENV !== "production";
  }
  const header = req.headers.get("x-indexnow-secret") || "";
  const bearer = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  return header === secret || bearer === secret;
}

function normalizeUrls(list: unknown): string[] {
  if (!Array.isArray(list)) return [];
  const host = new URL(siteConfig.url).host;
  const out: string[] = [];
  for (const item of list) {
    if (typeof item !== "string") continue;
    try {
      const u = new URL(item);
      if (u.host !== host && u.host !== host.replace(/^www\./, "")) continue;
      out.push(u.toString().replace(/\/$/, "") === siteConfig.url
        ? siteConfig.url
        : u.toString());
    } catch {
      /* skip invalid */
    }
  }
  return [...new Set(out)].slice(0, MAX_URLS);
}

export async function POST(req: NextRequest) {
  try {
    if (!authorized(req)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json().catch(() => ({}));
    const urlList = normalizeUrls(body.urlList);

    if (urlList.length === 0) {
      return NextResponse.json(
        { error: "Missing or invalid urlList array (must be on toolnovahub.com)" },
        { status: 400 },
      );
    }

    const host = new URL(siteConfig.url).host;
    const payload = {
      host,
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList,
    };

    const results = await Promise.all(
      ENDPOINTS.map(async (endpoint) => {
        try {
          const res = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
          return { endpoint, status: res.status, ok: res.ok || res.status === 202 };
        } catch (error) {
          return {
            endpoint,
            error: error instanceof Error ? error.message : "Unknown error",
          };
        }
      }),
    );

    return NextResponse.json({
      success: true,
      submittedUrls: urlList.length,
      results,
    });
  } catch (error) {
    console.error("Error pushing IndexNow:", error);
    return NextResponse.json(
      { error: "Failed to submit IndexNow request" },
      { status: 500 },
    );
  }
}

/** Health: confirm key file location (no secrets). */
export async function GET() {
  return NextResponse.json({
    protocol: "IndexNow",
    keyLocation: INDEXNOW_KEY_LOCATION,
    host: new URL(siteConfig.url).host,
    maxUrlsPerRequest: MAX_URLS,
    auth: "POST requires x-indexnow-secret or Authorization: Bearer (INDEXNOW_API_SECRET or NEXTAUTH_SECRET)",
  });
}
