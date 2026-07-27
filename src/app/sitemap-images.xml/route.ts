import { NextResponse } from"next/server";
import { existsSync } from"fs";
import path from"path";
import { getAllToolSlugs } from"@/data/tools";
import { getAllBlogPosts } from"@/data/blog";
import { siteConfig } from"@/config/site";
import { TOOL_COUNT_LABEL } from"@/data/tools";

/**
 * Image Sitemap — required for Google Discover image indexing
 * Generates a standard XML image sitemap with image:image entries
 * per Google's Image Sitemap guidelines.
 * Only emits image:loc values that exist under /public to avoid GSC 404s.
 */
export const dynamic ="force-dynamic";

function publicAssetExists(webPath: string): boolean {
  if (!webPath || webPath.startsWith("http")) return true;
  const rel = webPath.startsWith("/") ? webPath.slice(1) : webPath;
  return existsSync(path.join(process.cwd(), "public", rel));
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g,"&amp;")
    .replace(/</g,"&lt;")
    .replace(/>/g,"&gt;")
    .replace(/"/g,"&quot;");
}

export async function GET() {
  const baseUrl = siteConfig.url;
  const toolSlugs = getAllToolSlugs();
  const blogPosts = getAllBlogPosts();
  const fallbackOg ="/og-image.png";

  const entries: string[] = [];

  // Homepage OG image
  entries.push(`  <url>
    <loc>${baseUrl}</loc>
    <image:image>
      <image:loc>${baseUrl}/og-image.png</image:loc>
      <image:title>ToolNova - Free AI Tools for Students &amp; Professionals</image:title>
      <image:caption>${escapeXml(TOOL_COUNT_LABEL)} free AI-powered tools for writing, study, PDF, and productivity. No sign-up required.</image:caption>
    </image:image>
  </url>`);

  // Tool pages — share the main OG image (could be extended per tool)
  for (const slug of toolSlugs) {
    const label = escapeXml(slug.replace(/-/g," "));
    entries.push(`  <url>
    <loc>${baseUrl}/tools/${slug}</loc>
    <image:image>
      <image:loc>${baseUrl}/og-image.png</image:loc>
      <image:title>${label} - Free AI Tool | ToolNova</image:title>
      <image:caption>Use ${label} free online at ToolNova. No sign-up required.</image:caption>
    </image:image>
  </url>`);
  }

  // Blog posts with featured images (skip missing files → prevents GSC image 404s)
  for (const post of blogPosts) {
    const cover =
      post.coverImage && publicAssetExists(post.coverImage)
        ? post.coverImage
        : publicAssetExists(fallbackOg)
          ? fallbackOg
          : null;
    if (!cover) continue;

    const absoluteImageUrl = cover.startsWith("http")
      ? cover
      :`${baseUrl}${cover}`;
    entries.push(`  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <image:image>
      <image:loc>${absoluteImageUrl}</image:loc>
      <image:title>${escapeXml(post.title)}</image:title>
      <image:caption>${escapeXml(post.excerpt || post.metaDescription ||"")}</image:caption>
    </image:image>
  </url>`);
  }

  const xml =`<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${entries.join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {"Content-Type":"application/xml; charset=utf-8","Cache-Control":"public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
