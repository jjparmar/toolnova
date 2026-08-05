import { Metadata } from"next";
import Link from"next/link";
import { getAllTools, TOOL_COUNT } from"@/data/tools";
import { getAllBlogPosts } from"@/data/blog";
import { siteConfig } from"@/config/site";
import { filterIndexableBlogPosts } from"@/lib/blog-seo";

export const metadata: Metadata = {
  title:"Sitemap - All Tools, Guides & Pages",
  description:"Browse the complete ToolNova sitemap: all AI tools by category, in-depth guides, and company pages in one place.",
  alternates: {
    canonical:"https://www.toolnovahub.com/sitemap-page",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Map internal data categories to their category-hub slug + display name.
const CATEGORY_HUBS: Record<string, { slug: string; name: string }> = {"Writing Tools": { slug:"writing-tools", name:"Writing Tools" },"Study Tools": { slug:"study-tools", name:"Study Tools" },"Exam Prep": { slug:"exam-prep-tools", name:"Exam Prep Tools" },"Exam Prep Tools": { slug:"exam-prep-tools", name:"Exam Prep Tools" },"Career Tools": { slug:"career-tools", name:"Career Tools" },"Utility Tools": { slug:"utility-tools", name:"Utility Tools" },"Language Tools": { slug:"utility-tools", name:"Language Tools" },"PDF Tools": { slug:"image-pdf-tools", name:"PDF & Image Tools" },"Image Tools": { slug:"image-pdf-tools", name:"PDF & Image Tools" },
};

export default function SitemapPage() {
  const allTools = getAllTools();
  const blogPosts = filterIndexableBlogPosts(getAllBlogPosts());

  // Group tools by category, preserving the hub mapping.
  const toolsByCategory: Record<
    string,
    { slug: string; name: string; tagline: string }[]
  > = {};
  for (const { slug, data } of allTools) {
    const hub = CATEGORY_HUBS[data.category] ?? {
      slug:"utility-tools",
      name: data.category,
    };
    if (!toolsByCategory[hub.name]) toolsByCategory[hub.name] = [];
    toolsByCategory[hub.name].push({
      slug,
      name: data.name,
      tagline: data.tagline,
    });
  }

  const companyPages = [
    { name:"Home", href:"/" },
    { name:"All Tools", href:"/tools" },
    { name:"Blog", href:"/blog" },
    { name:"Pricing", href:"/pricing" },
    { name:"About Us", href:"/about" },
    { name:"Contact", href:"/contact" },
  ];

  const legalPages = [
    { name:"Privacy Policy", href:"/privacy" },
    { name:"Terms of Service", href:"/terms" },
    { name:"Disclaimer", href:"/disclaimer" },
    { name:"Cookie Policy", href:"/cookie-policy" },
    { name:"Refund Policy", href:"/refund" },
  ];

  return (
    <div className="min-h-screen bg-[#f8f9fb]">
      <section className="bg-gradient-to-br from-primary via-blue-600 to-indigo-700 py-16">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Sitemap
          </h1>
          <p className="text-blue-100 text-lg">
            Explore every ToolNova tool, guide, and page — all {TOOL_COUNT}{""}
            tools and {blogPosts.length} articles organized in one place.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6 max-w-5xl space-y-12">
          {/* Company Pages */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Company
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {companyPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="block bg-white rounded-lg p-4 border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <span className="font-medium text-foreground hover:text-primary">
                    {page.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Tools by Category */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              AI Tools by Category ({TOOL_COUNT})
            </h2>
            <div className="space-y-8">
              {Object.entries(toolsByCategory).map(([categoryName, tools]) => {
                const hub = Object.values(CATEGORY_HUBS).find(
                  (h) => h.name === categoryName,
                );
                return (
                  <div key={categoryName}>
                    <h3 className="text-lg font-semibold text-primary mb-3">
                      <Link
                        href={
                          hub
                            ?`/tools/${hub.slug}`
                            :"/tools"
                        }
                        className="hover:underline"
                      >
                        {categoryName} ({tools.length})
                      </Link>
                    </h3>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {tools.map((tool) => (
                        <Link
                          key={tool.slug}
                          href={`/tools/${tool.slug}`}
                          className="block bg-white rounded-lg p-4 border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all group"
                        >
                          <span className="font-medium text-foreground group-hover:text-primary">
                            {tool.name}
                          </span>
                          <span className="block text-xs text-muted-foreground mt-1 line-clamp-1">
                            {tool.tagline}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Blog */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Guides &amp; Articles ({blogPosts.length})
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {blogPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="block bg-white rounded-lg p-4 border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all group"
                >
                  <span className="font-medium text-foreground group-hover:text-primary line-clamp-2 block">
                    {post.title}
                  </span>
                  <span className="block text-xs text-muted-foreground mt-1">
                    {post.category} · {post.readTime}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Legal */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Legal &amp; Policies
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {legalPages.map((page) => (
                <Link
                  key={page.href}
                  href={page.href}
                  className="block bg-white rounded-lg p-4 border border-slate-100 hover:border-primary/30 hover:shadow-md transition-all"
                >
                  <span className="font-medium text-foreground hover:text-primary">
                    {page.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Machine sitemap */}
          <div className="text-center pt-8 border-t border-slate-200">
            <p className="text-sm text-muted-foreground">
              Looking for the machine-readable sitemap for search engines?{""}
              <a
                href={`${siteConfig.url}/sitemap.xml`}
                className="text-primary hover:underline font-medium"
              >
                View sitemap.xml
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
