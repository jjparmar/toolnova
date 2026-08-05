import { Metadata } from"next";
import { getAllTools } from"@/data/tools";
import { getAllBlogPosts } from"@/data/blog";
import { filterIndexableBlogPosts } from"@/lib/blog-seo";
import { SearchClient } from"./client";

export const metadata: Metadata = {
  title:"Search AI Tools & Articles",
  description:"Search ToolNova's full library of free AI tools and in-depth guides for students and professionals.",
  alternates: {
    canonical:"https://www.toolnovahub.com/search",
  },
  robots: {
    // Search-result URLs can create many thin, parameterized duplicates. Keep
    // the search useful to visitors without asking search engines to index it.
    index: false,
    follow: true,
  },
  openGraph: {
    title:"Search AI Tools & Articles",
    description:"Search ToolNova's full library of free AI tools and in-depth guides.",
    url:"https://www.toolnovahub.com/search",
    type:"website",
  },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q ="" } = await searchParams;
  const tools = getAllTools().map(({ slug, data }) => ({
    slug,
    name: data.name,
    tagline: data.tagline,
    description: data.description,
    category: data.category,
  }));

  const blogPosts = filterIndexableBlogPosts(getAllBlogPosts()).map((post) => ({
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    date: post.date,
    readTime: post.readTime,
  }));

  return (
    <SearchClient
      tools={tools}
      blogPosts={blogPosts}
      initialQuery={q}
    />
  );
}
