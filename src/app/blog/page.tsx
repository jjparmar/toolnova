import { Metadata } from"next";
import Link from"next/link";
import NextImage from"next/image";
import { getAllBlogPosts, getAllCategories } from"@/data/blog";
import {
  FaArrowRight,
  FaCalendar,
  FaClock,
  FaRocket,
} from"react-icons/fa";
import { siteConfig } from"@/config/site";
import { TOOL_COUNT_LABEL } from"@/data/tools";
import BlogGridWithFilters from "@/components/blog/BlogGridWithFilters";
import { formatDisplayDate, formatReadTime } from "@/lib/format";

export const metadata: Metadata = {
  title:"Blog - AI Tools Guides, Tips & Expert Reviews 2026",
  description:"Expert guides on AI tools, productivity, writing, study tips, and business technology. Learn how to use free AI tools effectively to boost your productivity and achieve your goals.",
  keywords: ["AI tools blog","productivity tips","study guides","writing tips","AI guides","free tools tutorials","AI tool reviews","business technology guides","cloud software reviews",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,"max-snippet": -1,"max-image-preview":"large",
    },
  },
  openGraph: {
    title:"Blog - AI Tools Guides, Tips & Expert Reviews 2026",
    description:"Expert guides on AI tools, productivity, writing, and study tips.",
    url:`${siteConfig.url}/blog`,
    type:"website",
    images: [
      {
        url:`${siteConfig.url}/og-image.png`,
        width: 1200,
        height: 630,
        alt:"ToolNova Blog",
      },
    ],
  },
  twitter: {
    card:"summary_large_image",
    title:"Blog - AI Tools Guides, Tips & Expert Reviews 2026",
    description:"Expert guides on AI tools, productivity, writing, and study tips.",
    images: [`${siteConfig.url}/og-image.png`],
    creator:"@toolnovahub",
    site:"@toolnovahub",
  },
  alternates: {
    canonical:`${siteConfig.url}/blog`,
  },
};

export default function BlogPage() {
  const blogPosts = getAllBlogPosts();
  const categories = getAllCategories();
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  const blogCollectionSchema = {"@context":"https://schema.org","@type":"CollectionPage",
    name:"ToolNova Blog - AI Tools Guides & Expert Reviews",
    description:"Expert guides on AI tools, productivity, writing, study tips, and business technology.",
    url:`${siteConfig.url}/blog`,
    publisher: {"@type":"Organization",
      name:"ToolNova",
      url: siteConfig.url,
      logo: {"@type":"ImageObject",
        url:`${siteConfig.url}/logo.png`,
      },
    },
    mainEntity: {"@type":"ItemList",
      name:"ToolNova Blog Articles",
      numberOfItems: blogPosts.length,
      itemListElement: blogPosts.slice(0, 20).map((post, index) => ({"@type":"ListItem",
        position: index + 1,
        url:`${siteConfig.url}/blog/${post.slug}`,
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
      <div className="min-h-screen bg-background">
        {/* Featured */}
        <section className="mesh-hero border-b border-[var(--border-color)] py-12 md:py-16">
          <div className="page-container">
            <div className="section-header mb-8 text-center md:text-left">
              <span className="section-kicker">Blog</span>
              <h1 className="section-title mt-4">Guides &amp; insights</h1>
              <p className="section-lead mx-auto mt-2 md:mx-0">
                Practical tips for AI tools, study workflows, writing, and
                productivity.
              </p>
            </div>

            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <article className="content-panel relative grid items-center gap-8 overflow-hidden p-6 transition-all duration-300 hover:border-primary/30 md:p-8 lg:grid-cols-2">
                <div className="pointer-events-none absolute right-0 top-0 h-40 w-40 bg-primary/10 blur-2xl" />

                <div className="relative z-10">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-md shadow-primary/20">
                      Featured
                    </span>
                    <span className="rounded-full bg-muted px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="font-heading mb-4 text-2xl font-bold leading-tight tracking-tight text-foreground transition-colors group-hover:text-primary md:text-3xl lg:text-4xl">
                    {featuredPost.title}
                  </h2>
                  <p className="mb-6 line-clamp-3 text-lg leading-relaxed text-muted-foreground">
                    {featuredPost.excerpt}
                  </p>
                  <div className="mb-6 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <FaCalendar className="text-primary" aria-hidden />
                      <time dateTime={featuredPost.date}>
                        {formatDisplayDate(featuredPost.date)}
                      </time>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaClock className="text-primary" aria-hidden />
                      {formatReadTime(featuredPost.readTime)}
                    </span>
                  </div>
                  <div className="inline-flex items-center gap-2 font-bold text-primary transition-all group-hover:gap-3">
                    Read article
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                      <FaArrowRight className="text-xs" />
                    </div>
                  </div>
                </div>

                <div className="relative hidden lg:block">
                  {featuredPost.coverImage ? (
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                      <NextImage
                        src={featuredPost.coverImage}
                        alt={featuredPost.imageAlt || featuredPost.title}
                        fill
                        sizes="(max-width: 1024px) 0px, 520px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority
                        fetchPriority="high"
                      />
                    </div>
                  ) : (
                    <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-border bg-gradient-to-br from-primary/15 to-sky-500/15">
                      <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-primary shadow-xl shadow-primary/25">
                        <FaRocket className="text-4xl text-white" aria-hidden />
                      </div>
                    </div>
                  )}
                </div>
              </article>
            </Link>
          </div>
        </section>

        {/* Grid with Category Filters */}
        <section
          id="latest-articles"
          className="scroll-mt-24 border-t border-[var(--border-color)] bg-muted/35 py-12 md:py-16"
        >
          <div className="page-container max-w-[1100px]">
            <h2 className="section-title mb-6 text-2xl md:text-3xl">
              Latest articles &amp; guides
            </h2>
            <BlogGridWithFilters posts={otherPosts} categories={categories} />
          </div>
        </section>

        {/* Topics — jump links back to filtered grid */}
        {categories.length > 0 && (
          <section className="section-pad border-t border-[var(--border-color)]">
            <div className="page-container">
              <div className="section-header mx-auto max-w-lg text-center">
                <h2 className="section-title text-2xl md:text-3xl">Topics</h2>
                <p className="section-lead mx-auto">
                  Browse {blogPosts.length} guides across writing, study, PDF, and
                  career workflows.
                </p>
              </div>
              <div className="flex flex-wrap justify-center gap-2.5">
                {categories.slice(0, 12).map((topic) => (
                  <a
                    key={topic}
                    href="#latest-articles"
                    className="rounded-full border border-[var(--border-color)] bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {topic}
                  </a>
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
