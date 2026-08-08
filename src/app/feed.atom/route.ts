import { getAllBlogPosts } from "@/data/blog";
import { siteConfig } from "@/config/site";
import { filterIndexableBlogPosts } from "@/lib/blog-seo";

export const dynamic = "force-dynamic";

export async function GET() {
  const posts = filterIndexableBlogPosts(getAllBlogPosts());
  const baseUrl = siteConfig.url;
  const updated = new Date().toISOString();

  const entries = posts
    .slice(0, 50)
    .map((post) => {
      const postUrl = `${baseUrl}/blog/${post.slug}`;
      const imageUrl = post.coverImage
        ? post.coverImage.startsWith("http")
          ? post.coverImage
          : `${baseUrl}${post.coverImage}`
        : `${baseUrl}/og-image.png`;
      const pubDate = post.date
        ? new Date(post.date).toISOString()
        : new Date().toISOString();
      const modDate = post.dateModified
        ? new Date(post.dateModified).toISOString()
        : pubDate;
      const safeTitle = String(post.title)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
      const safeDesc = String(post.metaDescription || post.excerpt || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      return `
  <entry>
    <title>${safeTitle}</title>
    <link href="${postUrl}" rel="alternate" type="text/html" />
    <id>${postUrl}</id>
    <published>${pubDate}</published>
    <updated>${modDate}</updated>
    <author>
      <name>${post.author || siteConfig.author.name}</name>
    </author>
    <summary>${safeDesc}</summary>
    <content type="html">&lt;img src=&quot;${imageUrl}&quot; alt=&quot;${safeTitle}&quot; width=&quot;1200&quot; height=&quot;630&quot; /&gt;&lt;p&gt;${safeDesc}&lt;/p&gt;&lt;p&gt;&lt;a href=&quot;${postUrl}&quot;&gt;Read more on ToolNova&lt;/a&gt;&lt;/p&gt;</content>
    <media:thumbnail xmlns:media="http://search.yahoo.com/mrss/" url="${imageUrl}" width="1200" height="630" />
    ${post.category ? `<category term="${post.category.replace(/&/g, '&amp;')}" />` : ""}
  </entry>`;
    })
    .join("\n");

  const atomFeed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">
  <title>${siteConfig.name} Blog</title>
  <subtitle>Free AI tools guides, tips, and tutorials for students and professionals</subtitle>
  <link href="${baseUrl}/feed.atom" rel="self" type="application/atom+xml" />
  <link href="${baseUrl}/blog" rel="alternate" type="text/html" />
  <id>${baseUrl}/blog</id>
  <updated>${updated}</updated>
  <author>
    <name>${siteConfig.author.name}</name>
    <uri>${baseUrl}</uri>
  </author>
  <icon>${baseUrl}/favicon-32x32.png</icon>
  <logo>${siteConfig.logo}</logo>
  <rights>Copyright ${new Date().getFullYear()} ${siteConfig.name}</rights>
  <generator>Next.js</generator>
  ${entries}
</feed>`;

  return new Response(atomFeed.trim(), {
    status: 200,
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
