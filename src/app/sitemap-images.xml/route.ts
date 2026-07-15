import { NextResponse } from "next/server";
import { getAllToolSlugs } from "@/data/tools";
import { getAllBlogPosts } from "@/data/blog";
import { siteConfig } from "@/config/site";

/**
 * Image Sitemap — required for Google Discover image indexing
 * Generates a standard XML image sitemap with image:image entries
 * per Google's Image Sitemap guidelines.
 */
export const dynamic = "force-dynamic";

export async function GET() {
  const baseUrl = siteConfig.url;
  const toolSlugs = getAllToolSlugs();
  const blogPosts = getAllBlogPosts();

  const entries: string[] = [];

  // Homepage OG image
  entries.push(`  <url>
    <loc>${baseUrl}</loc>
    <image:image>
      <image:loc>${baseUrl}/og-image.png</image:loc>
      <image:title>ToolNova - Free AI Tools for Students &amp; Professionals</image:title>
      <image:caption>47+ free AI-powered tools for writing, study, PDF, and productivity. No sign-up required.</image:caption>
    </image:image>
  </url>`);

  // Tool pages — share the main OG image (could be extended per tool)
  for (const slug of toolSlugs) {
    entries.push(`  <url>
    <loc>${baseUrl}/tools/${slug}</loc>
    <image:image>
      <image:loc>${baseUrl}/og-image.png</image:loc>
      <image:title>${slug.replace(/-/g, " ")} - Free AI Tool | ToolNova</image:title>
      <image:caption>Use ${slug.replace(/-/g, " ")} free online at ToolNova. No sign-up required.</image:caption>
    </image:image>
  </url>`);
  }

  // Blog posts with featured images
  for (const post of blogPosts) {
    if (post.coverImage) {
      const absoluteImageUrl = post.coverImage.startsWith("http")
        ? post.coverImage
        : `${baseUrl}${post.coverImage}`;
      entries.push(`  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <image:image>
      <image:loc>${absoluteImageUrl}</image:loc>
      <image:title>${post.title.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</image:title>
      <image:caption>${(post.excerpt || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</image:caption>
    </image:image>
  </url>`);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${entries.join("\n")}
</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
