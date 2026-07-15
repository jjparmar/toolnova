import { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/data/blog";
import { getAllAuthors } from "@/data/authors";
import { getAllToolSlugs } from "@/data/tools";
import { siteConfig } from "@/config/site";

// Revalidate daily — fresher than static, cheaper than force-dynamic
export const revalidate = 86400;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  // Stable lastmod for tools (avoid rewriting every request with "now")
  const toolsLastMod = "2026-07-15";

  // Real last-modified dates for static pages
  // Update these when you actually change a page's content
  const HOMEPAGE_MODIFIED = "2026-07-15";
  const TOOLS_MODIFIED = "2026-07-15";
  const BLOG_MODIFIED = "2026-07-15";
  const ABOUT_MODIFIED = "2026-07-15";
  const CONTACT_MODIFIED = "2026-07-15";
  const PRICING_MODIFIED = "2026-07-15";
  const LEGAL_MODIFIED = "2026-07-15";

  // Get all blog posts
  const blogPosts = getAllBlogPosts();

  // Get all authors
  const allAuthors = getAllAuthors();

  // ── Static pages ──────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: HOMEPAGE_MODIFIED,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: TOOLS_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: BLOG_MODIFIED,
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: ABOUT_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: CONTACT_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: PRICING_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: LEGAL_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: LEGAL_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/cookie-policy`,
      lastModified: LEGAL_MODIFIED,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: LEGAL_MODIFIED,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/advertising`,
      lastModified: "2026-07-15",
      changeFrequency: "yearly" as const,
      priority: 0.35,
    },
    {
      url: `${baseUrl}/editorial-policy`,
      lastModified: LEGAL_MODIFIED,
      changeFrequency: "yearly" as const,
      priority: 0.35,
    },
    {
      url: `${baseUrl}/refund`,
      lastModified: LEGAL_MODIFIED,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/seo-audit`,
      lastModified: ABOUT_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.4,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: TOOLS_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sitemap-page`,
      lastModified: TOOLS_MODIFIED,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    },
  ];

  // ── Tool category pages ───────────────────────────────────────
  const categoryUrls: MetadataRoute.Sitemap = [
    "writing-tools",
    "study-tools",
    "exam-prep-tools",
    "image-pdf-tools",
    "utility-tools",
    "career-tools",
  ].map((category) => ({
    url: `${baseUrl}/tools/${category}`,
    lastModified: toolsLastMod,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  // ── Individual tool pages (derived from the data source of truth) ────
  const toolUrls: MetadataRoute.Sitemap = getAllToolSlugs().map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: toolsLastMod,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  // ── Author profile pages ──────────────────────────────────────────────
  const authorUrls: MetadataRoute.Sitemap = allAuthors.map((author) => ({
    url: `${baseUrl}/author/${author.slug}`,
    lastModified: ABOUT_MODIFIED,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  // ── Blog post URLs ────────────────────────────────────────────
  const blogUrls: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.dateModified
      ? new Date(post.dateModified).toISOString()
      : post.date
        ? new Date(post.date).toISOString()
        : toolsLastMod,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [
    ...staticPages,
    ...categoryUrls,
    ...toolUrls,
    ...authorUrls,
    ...blogUrls,
  ];
}
