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
} from"@/lib/content-processor";
import BlogSidebar from"@/components/blog/BlogSidebar";
import { ArticleHeader } from"@/components/blog/ArticleHeader";
import { siteConfig } from"@/config/site";
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
      title:"Post Not Found | ToolNova Blog",
    };
  }

  const canonicalUrl =`${siteConfig.url}/blog/${post.slug}`;
  const ogImage = post.coverImage
    ?`${siteConfig.url}${post.coverImage}`
    :`${siteConfig.url}/og-image.png`;

  return {
    title: post.title,
    description: post.metaDescription,
    keywords: post.keywords,
    authors: [{ name:"ToolNova Editorial Team" }],
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,"max-snippet": -1,"max-image-preview":"large","max-video-preview": -1,
      },
    },
    openGraph: {
      title: post.title,
      description: post.metaDescription,
      type:"article",
      publishedTime: post.date,
      modifiedTime: post.dateModified || post.date,
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
        post.keywords?.slice(0, 10).join(",") || post.category ||"","article:published_time": post.date
        ? new Date(post.date).toISOString()
        :"","article:modified_time": post.dateModified
        ? new Date(post.dateModified).toISOString()
        : post.date
          ? new Date(post.date).toISOString()
          :"","article:author":"ToolNova Editorial Team","article:section": post.category ||"Education","article:tag": post.keywords?.slice(0, 5).join(",") ||"","og:locale":"en_US","og:updated_time": post.dateModified
        ? new Date(post.dateModified).toISOString()
        : post.date
          ? new Date(post.date).toISOString()
          :"",
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
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
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
      <div className="min-h-screen bg-slate-50">
        {/* Header with Back Link */}
        <div className="py-6 bg-white border-b border-border/40">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-slate-500 hover:text-primary text-sm font-medium transition-colors"
            >
              <FaArrowLeft className="text-xs" />
              Back to Blog
            </Link>
          </div>
        </div>

        {/* GEO-Optimized Article Header */}
        <div className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {author ? (
              <ArticleHeader
                title={post.title}
                description={post.excerpt}
                author={author}
                publishedDate={post.date}
                modifiedDate={post.dateModified}
                readingTime={parseInt(post.readTime)}
                category={post.category}
              />
            ) : (
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                  {post.title}
                </h1>
                <p className="text-xl text-muted-foreground mb-6">
                  {post.excerpt}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Ad — Top Banner */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <TopBannerAd />
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Article Column */}
            <div className="lg:col-span-2">
              {/* Featured Image */}
              {post.coverImage && (
                <div className="mb-10 relative rounded-2xl overflow-hidden shadow-xl shadow-primary/10">
                  <NextImage
                    src={post.coverImage}
                    alt={post.imageAlt || post.title}
                    width={800}
                    height={450}
                    className="w-full h-auto object-cover"
                    priority
                  />
                </div>
              )}

              {/* Article Content */}
              <article className="bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100">
                <div className="prose prose-lg prose-slate max-w-none">
                  {processContent(post.content)}
                </div>
                {/* Ad — In Article */}
                <InArticleAd className="not-prose" />

                {/* Keywords/Tags */}
                {post.keywords?.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-border/40">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                      Related Topics
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.keywords.slice(0, 8).map((keyword) => (
                        <span
                          key={keyword}
                          className="px-3 py-1.5 rounded-full bg-muted text-muted-foreground text-sm font-medium hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share Buttons */}
                <div className="mt-10 pt-8 border-t border-border/40">
                  <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">
                    Share this article
                  </h3>
                  <ShareButtons
                    url={`${siteConfig.url}/blog/${post.slug}`}
                    title={post.title}
                  />
                </div>
              </article>
              {/* Ad — Bottom Box */}
              <BottomBoxAd />

              {/* FAQ Section */}
              {post.faq?.length > 0 && (
                <div className="mt-12 bg-white rounded-2xl p-6 md:p-10 shadow-sm border border-slate-100">
                  <h2 className="text-2xl font-bold text-foreground mb-8">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {post.faq.map((item, index) => (
                      <div
                        key={index}
                        className="border-b border-slate-100 pb-6 last:border-0 last:pb-0"
                      >
                        <h3 className="text-lg font-bold text-foreground mb-3">
                          {item.question}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-bold text-foreground mb-8">
                    Related Articles
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.slug}
                        href={`/blog/${relatedPost.slug}`}
                        className="group"
                      >
                        <article className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                          <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                            {relatedPost.category}
                          </span>
                          <h3 className="text-lg font-bold text-foreground mt-4 group-hover:text-primary transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                          <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium">
                            Read more
                            <FaChevronRight className="text-xs" />
                          </div>
                        </article>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="hidden lg:block lg:col-span-1">
              <BlogSidebar />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-primary to-blue-700 rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden shadow-2xl shadow-primary/25">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <FaRocket className="text-4xl mb-6 mx-auto text-primary-foreground/70" />
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Level Up?
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-8 max-w-2xl mx-auto">
                  Try our free AI-powered tools and start saving time today. No
                  sign-up required.
                </p>
                <Link
                  href="/tools"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-bold text-lg hover:bg-primary/5 transition-colors shadow-lg shadow-black/10"
                >
                  Explore Free Tools
                  <FaChevronRight />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
