import { Metadata } from "next";
import Link from "next/link";
import NextImage from "next/image";
import { getAllBlogPosts, getAllCategories } from "@/data/blog";
import {
  FaArrowRight,
  FaCalendar,
  FaClock,
  FaRocket,
  FaChevronRight,
} from "react-icons/fa";
import { siteConfig } from "@/config/site";
import { TOOL_COUNT_LABEL } from "@/data/tools";

export const metadata: Metadata = {
  title: "Blog - AI Tools Guides, Tips & Expert Reviews 2026 | ToolNova",
  description:
    "Expert guides on AI tools, productivity, writing, study tips, and business technology. Learn how to use free AI tools effectively to boost your productivity and achieve your goals.",
  keywords: [
    "AI tools blog",
    "productivity tips",
    "study guides",
    "writing tips",
    "AI guides",
    "free tools tutorials",
    "AI tool reviews",
    "business technology guides",
    "cloud software reviews",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
    },
  },
  openGraph: {
    title: "Blog - AI Tools Guides, Tips & Expert Reviews 2026 | ToolNova",
    description:
      "Expert guides on AI tools, productivity, writing, and study tips.",
    url: `${siteConfig.url}/blog`,
    type: "website",
    images: [
      {
        url: `${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "ToolNova Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog - AI Tools Guides, Tips & Expert Reviews 2026 | ToolNova",
    description:
      "Expert guides on AI tools, productivity, writing, and study tips.",
    images: [`${siteConfig.url}/og-image.png`],
    creator: "@toolnovahub",
    site: "@toolnovahub",
  },
  alternates: {
    canonical: `${siteConfig.url}/blog`,
  },
};

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();
  const categories = getAllCategories();
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  const blogCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "ToolNova Blog - AI Tools Guides & Expert Reviews",
    description:
      "Expert guides on AI tools, productivity, writing, study tips, and business technology.",
    url: `${siteConfig.url}/blog`,
    publisher: {
      "@type": "Organization",
      name: "ToolNova",
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntity: {
      "@type": "ItemList",
      name: "ToolNova Blog Articles",
      numberOfItems: blogPosts.length,
      itemListElement: blogPosts.slice(0, 20).map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteConfig.url}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  if (!featuredPost) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 py-20 bg-background">
        <h1 className="font-heading text-3xl font-bold mb-3">Blog</h1>
        <p className="text-muted-foreground mb-6 text-center max-w-md">
          New guides are on the way. Meanwhile, explore {TOOL_COUNT_LABEL} free
          tools.
        </p>
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 rounded-xl bg-primary text-primary-foreground font-bold px-6 py-3"
        >
          Browse tools <FaArrowRight className="text-sm" />
        </Link>
      </div>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionSchema) }}
      />
      <div className="page-shell min-h-screen">
        {/* Featured */}
        <section className="page-hero py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-8 text-center md:text-left">
              <span className="section-kicker">
                Blog
              </span>
              <h1 className="font-heading text-4xl md:text-5xl font-semibold mt-4 tracking-tight text-foreground">
                Guides &amp; insights
              </h1>
              <p className="text-muted-foreground mt-2 max-w-2xl">
                Practical tips for AI tools, study workflows, writing, and
                productivity.
              </p>
            </div>

            <Link href={`/blog/${featuredPost.slug}`} className="block group">
              <article className="content-panel grid lg:grid-cols-2 gap-8 items-center p-6 md:p-8 transition-all duration-300 relative overflow-hidden hover:border-primary/30 hover:-translate-y-0.5">
                <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 blur-2xl pointer-events-none" />

                <div className="relative z-10">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-primary text-primary-foreground text-xs font-bold uppercase tracking-wider shadow-md shadow-primary/20">
                      Featured
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1.5">
                      <FaCalendar className="text-primary" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaClock className="text-primary" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 text-primary font-bold group-hover:gap-3 transition-all">
                    Read article
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <FaArrowRight className="text-xs" />
                    </div>
                  </div>
                </div>

                <div className="relative hidden lg:block">
                  {featuredPost.coverImage ? (
                    <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                      <NextImage
                        src={featuredPost.coverImage}
                        alt={featuredPost.imageAlt || featuredPost.title}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        priority
                      />
                    </div>
                  ) : (
                    <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/15 to-sky-500/15 flex items-center justify-center border border-border">
                      <div className="w-24 h-24 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-xl shadow-primary/25">
                        <FaRocket className="text-white text-4xl" />
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </Link>
          </div>
        </section>

        {/* Grid */}
        <section className="py-12 md:py-16 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-10">
              Latest articles
            </h2>
            {otherPosts.length === 0 ? (
              <p className="text-muted-foreground">More posts coming soon.</p>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {otherPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group h-full"
                  >
                    <article className="surface-card h-full p-6 flex flex-col">
                      <div className="flex items-center gap-2 mb-4">
                        <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                        <span className="text-muted-foreground text-xs flex items-center gap-1.5">
                          <FaCalendar className="text-primary/70" />
                          {post.date}
                        </span>
                        <span className="text-muted-foreground text-xs flex items-center gap-1.5">
                          <FaClock className="text-primary/70" />
                          {post.readTime}
                        </span>
                      </div>
                      <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                        Read more
                        <FaChevronRight className="text-xs" />
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Topics */}
        {categories.length > 0 && (
          <section className="section-band py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8 text-center">
                Topics
              </h2>
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.slice(0, 12).map((topic) => (
                  <span
                    key={topic}
                    className="px-4 py-2 rounded-full bg-card border border-border text-foreground text-sm font-medium"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-primary rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden shadow-premium-lg">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <FaRocket className="text-4xl mb-6 mx-auto text-white/75" />
                <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                  Ready to boost your productivity?
                </h2>
                <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                  Try {TOOL_COUNT_LABEL} free AI-powered tools — no sign-up
                  required.
                </p>
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:bg-white/90 transition-colors shadow-lg"
                >
                  Explore free tools
                  <FaArrowRight />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* SEO copy */}
        <section className="py-12 md:py-16 border-t border-border">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-heading text-2xl font-bold mb-4 text-foreground">
              About the ToolNova productivity &amp; AI blog
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                The ToolNova Blog is a practical hub for AI productivity,
                study systems, writing workflows, and everyday digital skills —
                written for students, educators, writers, and professionals.
              </p>
              <p>
                Explore study guides (flashcards, revision planning), writing
                tips (grammar, paraphrasing, structure), PDF/image workflows, and
                career content. Every guide is designed to be actionable with our
                free browser tools.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
