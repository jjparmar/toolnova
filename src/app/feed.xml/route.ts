import { getAllBlogPosts } from"@/data/blog";
import { siteConfig } from"@/config/site";
import { filterIndexableBlogPosts } from"@/lib/blog-seo";

export const dynamic ="force-dynamic";

export async function GET() {
  // RSS only surfaces on-topic posts (same policy as sitemap / indexability)
  const posts = filterIndexableBlogPosts(getAllBlogPosts());
  const baseUrl = siteConfig.url;

  // getAllBlogPosts() is already newest-first; slice for feed size if needed
  const rssItems = posts
    .map((post) => {
      const postUrl =`${baseUrl}/blog/${post.slug}`;
      const imageUrl = post.coverImage
        ? post.coverImage.startsWith("http")
          ? post.coverImage
          :`${baseUrl}${post.coverImage}`
        :`${baseUrl}/og-image.png`;
      const pubDate = post.date
        ? new Date(post.date).toUTCString()
        : new Date().toUTCString();
      const modDate = post.dateModified
        ? new Date(post.dateModified).toUTCString()
        : pubDate;
      const description = (post.metaDescription || post.excerpt ||"").replace(
        /[<>&"']/g,
        (c) =>
          ({"<":"&lt;",">":"&gt;","&":"&amp;",
            '"':"&quot;","'":"&apos;",
          })[c] ?? c,
      );
      const fullExcerpt = (post.excerpt || post.metaDescription ||"").slice(
        0,
        500,
      );
      // Plain-text snippet from markdown body for richer feed readers / discovery
      const bodySnippet = String(post.content ||"")
        .replace(/:::[A-Z-]+[\s\S]*?:::/g," ")
        .replace(/!\[[^\]]*\]\([^)]+\)/g," ")
        .replace(/\[([^\]]+)\]\([^)]+\)/g,"$1")
        .replace(/[#>*_`|-]/g," ")
        .replace(/\s+/g," ")
        .trim()
        .slice(0, 1200);

      return`
    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${postUrl}</link>
      <guid isPermaLink="true">${postUrl}</guid>
      <description><![CDATA[${description}]]></description>
      <content:encoded><![CDATA[<p>${fullExcerpt}</p><p>${bodySnippet}</p><p><a href="${postUrl}">Read the full article on ToolNova →</a></p>]]></content:encoded>
      <pubDate>${pubDate}</pubDate>
      <dc:date>${modDate}</dc:date>
      <dc:creator><![CDATA[${post.author || siteConfig.author.name}]]></dc:creator>
      <author>${siteConfig.author.email} (${post.author || siteConfig.author.name})</author>
      ${post.category ?`<category><![CDATA[${post.category}]]></category>` :""}
      <media:content url="${imageUrl}" medium="image" width="1200" height="630">
        <media:title><![CDATA[${post.title}]]></media:title>
        <media:description><![CDATA[${description}]]></media:description>
        <media:credit role="photographer"><![CDATA[${siteConfig.name}]]></media:credit>
      </media:content>
      <media:thumbnail url="${imageUrl}" width="1200" height="630"/>
      <enclosure url="${imageUrl}" length="0" type="image/png"/>
    </item>`;
    })
    .join("\n");

  const rssFeed =`<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/"
  xmlns:media="http://search.yahoo.com/mrss/"
>
  <channel>
    <title>${siteConfig.name} Blog — AI Tools Tips, Guides &amp; Tutorials</title>
    <link>${baseUrl}/blog</link>
    <description>${siteConfig.description}</description>
    <language>${siteConfig.language ||"en"}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
    <image>
      <url>${siteConfig.logo}</url>
      <title>${siteConfig.name}</title>
      <link>${baseUrl}</link>
      <width>512</width>
      <height>512</height>
    </image>
    <copyright>Copyright ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.</copyright>
    <managingEditor>${siteConfig.author.email} (${siteConfig.author.name})</managingEditor>
    <webMaster>${siteConfig.author.email} (${siteConfig.author.name})</webMaster>
    <generator>Next.js ${siteConfig.name}</generator>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <ttl>1440</ttl>
    <sy:updatePeriod xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">daily</sy:updatePeriod>
    <sy:updateFrequency xmlns:sy="http://purl.org/rss/1.0/modules/syndication/">1</sy:updateFrequency>
    ${rssItems}
  </channel>
</rss>`;

  return new Response(rssFeed.trim(), {
    status: 200,
    headers: {"Content-Type":"application/rss+xml; charset=utf-8","Cache-Control":"public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400","X-Content-Type-Options":"nosniff",
    },
  });
}
