import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { blogPosts } from '@/data/blog';
import { getAuthor } from '@/data/authors';
import { getArticleSchema, schemaToJsonLd } from '@/lib/schema';
import { ArticleHeader } from '@/components/blog/ArticleHeader';

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) return {};

    return {
        title: post.title,
        description: post.metaDescription,
        keywords: post.keywords,
        openGraph: {
            title: post.title,
            description: post.metaDescription,
            images: [post.coverImage],
            type: 'article',
            publishedTime: new Date(post.date).toISOString(),
            modifiedTime: post.dateModified ? new Date(post.dateModified).toISOString() : undefined,
            authors: [post.author],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.metaDescription,
            images: [post.coverImage],
        },
    };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) notFound();

    // Get author data
    const author = post.authorSlug ? getAuthor(post.authorSlug) : undefined;

    // Generate Article schema for GEO
    const articleSchema = getArticleSchema(
        post.title,
        post.metaDescription,`https://www.toolnovahub.com/blog/${post.slug}`,
        new Date(post.date).toISOString(),
        post.dateModified ? new Date(post.dateModified).toISOString() : new Date(post.date).toISOString(),
        post.author,
        author?.profileUrl,
        author?.role,
        post.coverImage,
        post.wordCount
    );

    return (
        <>
            {/* Article Schema for GEO */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: schemaToJsonLd(articleSchema) }}
            />

            <article className="container mx-auto px-4 py-12 max-w-4xl">
                {/* GEO-Optimized Article Header */}
                {author && (
                    <ArticleHeader
                        title={post.title}
                        description={post.excerpt}
                        author={author}
                        publishedDate={post.date}
                        modifiedDate={post.dateModified}
                        readingTime={parseInt(post.readTime)}
                        category={post.category}
                    />
                )}

                {/* Article Content */}
                <div className="prose prose-lg max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {/* FAQ Section */}
                {post.faq && post.faq.length > 0 && (
                    <div className="mt-16 p-8 bg-slate-50 rounded-2xl">
                        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {post.faq.map((item, index) => (
                                <div key={index}>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">
                                        {item.question}
                                    </h3>
                                    <p className="text-muted-foreground">{item.answer}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </article>
        </>
    );
}
