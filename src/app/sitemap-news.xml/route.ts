import { getAllBlogPosts } from"@/data/blog";
import { siteConfig } from"@/config/site";
import { isIndexableBlogPost } from"@/lib/blog-seo";

export const dynamic ="force-dynamic";
export const revalidate = 1800;

/**
 * Google News sitemaps must only include articles published in the last 48 hours.
 * Older posts must NOT appear here (they stay in the main sitemap).
 */
export async function GET() {
  const posts = getAllBlogPosts();
  const baseUrl = siteConfig.url;
  const cutoff = Date.now() - 48 * 60 * 60 * 1000;

  let recentPosts = posts
    .filter((post) => {
      if (!isIndexableBlogPost(post)) return false;
      if (!post.date) return false;
      const t = new Date(post.date).getTime();
      return !Number.isNaN(t) && t >= cutoff;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 1000);

  // If there are no posts in the last 48 hours, GSC will throw a "Missing XML tag" 
  // error because <urlset> cannot be empty. We provide a fallback to the single 
  // most recent post just to keep the XML schema valid.
  if (recentPosts.length === 0) {
    const allValidPosts = posts
      .filter(
        (post) =>
          isIndexableBlogPost(post) &&
          post.date &&
          !Number.isNaN(new Date(post.date).getTime())
      )
      .sort((a, b) => new Date(b.date!).getTime() - new Date(a.date!).getTime());

    if (allValidPosts.length > 0) {
      recentPosts = [allValidPosts[0]];
    }
  }

  const newsItems = recentPosts
    .map((post) => {
      const postUrl =`${baseUrl}/blog/${post.slug}`;
      const pubDate = new Date(post.date).toISOString();
      const safeTitle = String(post.title)
        .replace(/]]>/g,"]] >")
        .replace(/&/g,"&amp;");

      return`
  <url>
    <loc>${postUrl}</loc>
    <news:news>
      <news:publication>
        <news:name>${siteConfig.name}</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title><![CDATA[${safeTitle}]]></news:title>
    </news:news>
  </url>`;
    })
    .join("");

  const sitemap =`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
  ${newsItems}
</urlset>`;

  return new Response(sitemap.trim(), {
    status: 200,
    headers: {"Content-Type":"application/xml; charset=utf-8","Cache-Control":"public, s-maxage=1800, stale-while-revalidate=3600",
    },
  });
}
