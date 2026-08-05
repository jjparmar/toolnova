import { Metadata } from"next";
import Link from"next/link";
import NextImage from"next/image";
import { notFound } from"next/navigation";
import {
  getAllBlogPosts,
  getBlogPostBySlug,
  getRelatedPosts,
} from"@/data/blog";
import { getAuthor } from"@/data/authors";
import {
  processContent,
  extractYoutubeVideoIds,
  extractHeadings,
} from"@/lib/content-processor";
import BlogSidebar from"@/components/blog/BlogSidebar";
import { ArticleHeader } from"@/components/blog/ArticleHeader";
import TableOfContents from"@/components/blog/TableOfContents";
import InArticleToolCallout from"@/components/blog/InArticleToolCallout";
import { siteConfig } from"@/config/site";
import { isIndexableBlogPost } from"@/lib/blog-seo";
import { FaArrowLeft, FaChevronRight, FaRocket } from"react-icons/fa";
import ShareButtons from"@/components/blog/ShareButtons";
import { TopBannerAd, InArticleAd, BottomBoxAd } from"@/components/ads/AdUnit";

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each blog post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title:"Post Not Found",
    };
  }

  const canonicalUrl =`${siteConfig.url}/blog/${post.slug}`;
  const ogImage = post.coverImage
    ?`${siteConfig.url}${post.coverImage}`
    :`${siteConfig.url}/og-image.png`;

  // Always emit ISO-8601 for article dates (OG + meta). Raw "Jul 21, 2026"
  // strings create duplicate/conflicting published_time tags and confuse crawlers.
  const publishedIso = post.date
    ? new Date(post.date).toISOString()
    : undefined;
  const modifiedIso = post.dateModified
    ? new Date(post.dateModified).toISOString()
    : publishedIso;

  // Off-topic SaaS/enterprise posts stay live but are noindexed so crawl
  // budget and topical authority stay on free AI / study / PDF tool content.
  const shouldIndex = isIndexableBlogPost(post);

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name:"ToolNova Editorial Team" }],
    robots: {
      index: shouldIndex,
      follow: true,
      googleBot: {
        index: shouldIndex,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type:"article",
      publishedTime: publishedIso,
      modifiedTime: modifiedIso,
      authors: ["ToolNova Editorial Team"],
      url: canonicalUrl,
      locale:"en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.imageAlt || post.title,
        },
      ],
    },
    twitter: {
      card:"summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [ogImage],
      creator:"@toolnovahub",
      site:"@toolnovahub",
    },
    alternates: {
      canonical: canonicalUrl,
    },
    other: {
      news_keywords:
        post.keywords?.slice(0, 10).join(",") || post.category ||"",
      ...(publishedIso ? { "article:published_time": publishedIso } : {}),
      ...(modifiedIso ? { "article:modified_time": modifiedIso } : {}),
      "article:author":"ToolNova Editorial Team",
      "article:section": post.category ||"Education",
      "article:tag": post.keywords?.slice(0, 5).join(",") ||"",
      "og:locale":"en_US",
      ...(modifiedIso ? { "og:updated_time": modifiedIso } : {}),
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 2);
  const youtubeIds = extractYoutubeVideoIds(post.content);
  const headings = extractHeadings(post.content);

  // Get author data for GEO
  const author = post.authorSlug ? getAuthor(post.authorSlug) : null;

  // Generate enhanced Schema.org structured data (SEO + AEO + GEO Optimized)
  const articleUrl =`${siteConfig.url}/blog/${post.slug}`;
  const articleImage = post.coverImage
    ?`${siteConfig.url}${post.coverImage}`
    :`${siteConfig.url}/og-image.png`;

  const articleSchema = {"@context":"https://schema.org","@type":"NewsArticle",
    headline: post.title,
    description: post.metaDescription,
    image: {"@type":"ImageObject",
      url: articleImage,
      width: 1200,
      height: 630,
    },
    author: {"@type":"Organization",
      name:"ToolNova Editorial Team",
      url:`${siteConfig.url}/author/editorial-team`,
    },
    publisher: {"@type":"Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {"@type":"ImageObject",
        url:`${siteConfig.url}/logo.png`,
        width: 512,
        height: 512,
      },
      sameAs: Object.values(siteConfig.links),
    },
    datePublished: post.date
      ? new Date(post.date).toISOString()
      : post.date,
    dateModified: post.dateModified
      ? new Date(post.dateModified).toISOString()
      : post.date
        ? new Date(post.date).toISOString()
        : post.date,
    mainEntityOfPage: {"@type":"WebPage","@id": articleUrl,
    },
    wordCount: post.wordCount,
    keywords: post.keywords.join(","),
    inLanguage:"en-US",
    articleSection: post.category,
    isAccessibleForFree: true,
    about: {"@type":"Thing",
      name: post.keywords[0],
    },
    mentions: post.keywords.slice(0, 5).map((kw) => ({"@type":"Thing",
      name: kw,
    })),
    speakable: {"@type":"SpeakableSpecification",
      cssSelector: [".prose h1",".prose h2",".prose > p:first-of-type"],
    },
  };

  // AEO: Speakable schema for voice assistants and answer engines
  const speakableSchema = {"@context":"https://schema.org","@type":"WebPage",
    name: post.title,
    url: articleUrl,
    speakable: {"@type":"SpeakableSpecification",
      cssSelector: ["article h1","article h2","article > .prose > p:first-of-type",".faq-question",".faq-answer",
      ],
    },
  };

  const breadcrumbSchema = {"@context":"https://schema.org","@type":"BreadcrumbList",
    itemListElement: [
      {"@type":"ListItem",
        position: 1,
        name:"Home",
        item: siteConfig.url,
      },
      {"@type":"ListItem",
        position: 2,
        name:"Blog",
        item:`${siteConfig.url}/blog`,
      },
      {"@type":"ListItem",
        position: 3,
        name: post.title,
        item:`${siteConfig.url}/blog/${post.slug}`,
      },
    ],
  };

  const faqSchema = post.faq?.length
    ? {"@context":"https://schema.org","@type":"FAQPage",
        mainEntity: post.faq.map((item) => ({"@type":"Question",
          name: item.question,
          acceptedAnswer: {"@type":"Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  // Video schema if YouTube embeds exist
  const videoSchema =
    youtubeIds.length > 0
      ? {"@context":"https://schema.org","@type":"VideoObject",
          name: post.title,
          description: post.metaDescription,
          thumbnailUrl:`https://img.youtube.com/vi/${youtubeIds[0]}/maxresdefault.jpg`,
          uploadDate: post.date,
          embedUrl:`https://www.youtube.com/embed/${youtubeIds[0]}`,
        }
      : null;

  // AEO: HowTo schema for guide/buyer's guide posts — ranks in AI Overviews & voice search
  // Detect if post is a guide/how-to based on title keywords
  const isGuidePost =
    post.title.toLowerCase().includes("guide") ||
    post.title.toLowerCase().includes("how to") ||
    post.title.toLowerCase().includes("buyer") ||
    post.title.toLowerCase().includes("choose") ||
    post.title.toLowerCase().includes("best") ||
    post.title.toLowerCase().includes("step");

  const howToSchema = isGuidePost
    ? {"@context":"https://schema.org","@type":"HowTo",
        name: post.title,
        description: post.metaDescription,
        image: {"@type":"ImageObject",
          url: articleImage,
          width: 1200,
          height: 630,
        },
        totalTime:`PT${parseInt(post.readTime) || 15}M`,
        estimatedCost: {"@type":"MonetaryAmount",
          currency:"USD",
          value:"0",
        },
        step:
          post.faq?.slice(0, 5).map((item, index) => ({"@type":"HowToStep",
            position: index + 1,
            name: item.question,
            text: item.answer,
            url:`${articleUrl}#faq`,
          })) || [],
      }
    : null;

  // Consolidate all schemas into a single @graph (Google best practice)
  const consolidatedSchema = {"@context":"https://schema.org","@graph": [
      articleSchema,
      breadcrumbSchema,
      speakableSchema,
      ...(faqSchema ? [faqSchema] : []),
      ...(videoSchema ? [videoSchema] : []),
      ...(howToSchema ? [howToSchema] : []),
    ],
  };

  return (
    <>
      {/* Consolidated JSON-LD — single @graph per Google best practice */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(consolidatedSchema),
        }}
      />
      <div className="min-h-screen bg-background">
        {/* Article hero */}
        <div className="mesh-hero border-b border-[var(--border-color)]">
          <div className="page-container max-w-4xl py-6 md:py-8">
            <nav
              aria-label="Breadcrumb"
              className="mb-5 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-card/90 px-3.5 py-1.5 font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
              >
                <FaArrowLeft className="text-[10px]" aria-hidden />
                Blog
              </Link>
              <span aria-hidden className="text-muted-foreground/50">
                /
              </span>
              <span className="line-clamp-1 font-medium text-foreground/80">
                {post.title}
              </span>
            </nav>

            {author ? (
              <ArticleHeader
                title={post.title}
                description={post.excerpt}
                author={author}
                publishedDate={post.date}
                modifiedDate={post.dateModified}
                readingTime={post.readTime}
                category={post.category}
              />
            ) : (
              <div>
                <h1 className="font-heading mb-4 text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                  {post.title}
                </h1>
                <p className="mb-6 text-lg text-muted-foreground md:text-xl">
                  {post.excerpt}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Ad — Top Banner (reserved height) */}
        <div className="ad-slot-shell ad-slot-shell--banner page-container max-w-4xl pt-5">
          <TopBannerAd />
        </div>

        {/* Main Content */}
        <div className="page-container py-8 md:py-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-10">
            {/* Article Column */}
            <div className="lg:col-span-8">
              {/* Featured Image — aspect box reduces CLS */}
              {post.coverImage && (
                <div className="relative mb-7 aspect-[16/9] overflow-hidden rounded-[1.35rem] border border-[var(--border-color)] shadow-[var(--shadow-premium)] md:mb-9">
                  <NextImage
                    src={post.coverImage}
                    alt={post.imageAlt || post.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 720px"
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Article Content */}
              <article className="content-panel overflow-hidden p-5 sm:p-7 md:p-10">
                <TableOfContents headings={headings} />
                <div className="article-prose prose prose-lg max-w-none">
                  {processContent(post.content)}
                </div>
                <InArticleToolCallout category={post.category} />
                <div className="ad-slot-shell ad-slot-shell--inarticle not-prose">
                  <InArticleAd className="not-prose" />
                </div>

                {post.keywords?.length > 0 && (
                  <div className="mt-12 border-t border-border pt-8">
                    <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                      Related topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.keywords.slice(0, 8).map((keyword) => (
                        <span
                          key={keyword}
                          className="rounded-full border border-[var(--border-color)] bg-muted/60 px-3 py-1.5 text-sm font-medium text-muted-foreground"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-10 border-t border-border pt-8">
                  <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Share this article
                  </h3>
                  <ShareButtons
                    url={`${siteConfig.url}/blog/${post.slug}`}
                    title={post.title}
                  />
                </div>
              </article>

              <div className="ad-slot-shell ad-slot-shell--box mt-8">
                <BottomBoxAd />
              </div>

              {post.faq?.length > 0 && (
                <div
                  id="faq"
                  className="content-panel mt-10 scroll-mt-24 p-5 sm:p-7 md:p-10"
                >
                  <h2 className="section-title mb-8 text-2xl">
                    Frequently asked questions
                  </h2>
                  <div className="space-y-6">
                    {post.faq.map((item, index) => (
                      <div
                        key={index}
                        className="border-b border-border pb-6 last:border-0 last:pb-0"
                      >
                        <h3 className="faq-question mb-3 text-lg font-bold text-foreground">
                          {item.question}
                        </h3>
                        <p className="faq-answer leading-relaxed text-muted-foreground">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {relatedPosts.length > 0 && (
                <div className="mt-10">
                  <h2 className="section-title mb-6 text-2xl">
                    Related articles
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="group"
                      >
                        <article className="surface-card surface-card-interactive h-full p-6">
                          <span className="rounded-full border border-primary/15 bg-primary/8 px-2.5 py-1 text-xs font-semibold text-primary">
                            {relatedPost.category}
                          </span>
                          <h3 className="mt-4 line-clamp-2 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                            {relatedPost.title}
                          </h3>
                          <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                            {relatedPost.excerpt}
                          </p>
                          <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
                            Read more
                            <FaChevronRight className="text-xs" aria-hidden />
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:col-span-4 lg:block">
              <div className="sticky top-24">
                <BlogSidebar />
              </div>
            </aside>
          </div>
        </div>

        {/* CTA Section */}
        <section className="border-t border-[var(--border-color)] bg-muted/35 py-14 md:py-16">
          <div className="page-container max-w-4xl">
            <div className="relative overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-[#6d28d9] via-[#7c3aed] to-[#d946ef] p-10 text-center text-white shadow-2xl shadow-violet-500/25 md:p-14">
              <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-3xl" />

              <div className="relative z-10">
                <FaRocket
                  className="mx-auto mb-6 text-4xl text-primary-foreground/80"
                  aria-hidden
                />
                <h2 className="mb-4 font-heading text-3xl font-bold tracking-tight md:text-4xl">
                  Put this guide into practice
                </h2>
                <p className="mx-auto mb-8 max-w-2xl text-lg text-primary-foreground/90">
                  Use ToolNova&apos;s free AI and browser tools—no sign-up
                  required to start.
                </p>
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-primary shadow-lg shadow-black/10 transition-all hover:-translate-y-0.5 hover:bg-white/95"
                >
                  Explore free tools
                  <FaChevronRight aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
