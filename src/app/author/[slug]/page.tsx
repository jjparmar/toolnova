import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getAuthor, getAllAuthors } from '@/data/authors';
import { getPostsByAuthor } from '@/data/blog';
import { schemaToJsonLd } from '@/lib/schema';

interface AuthorPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const authors = getAllAuthors();
    return authors.map((author) => ({
        slug: author.slug,
    }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
    const { slug } = await params;
    const author = getAuthor(slug);

    if (!author) {
        return {
            title: 'Author Not Found',
        };
    }

    return {
        title:`${author.name}`,
        description: author.bio,
    };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
    const { slug } = await params;
    const author = getAuthor(slug);

    if (!author) {
        notFound();
    }

    const posts = getPostsByAuthor(author.name);

    // Schema.org ProfilePage
    const profileSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        mainEntity: {
            '@type': 'Organization',
            name: author.name,
            description: author.bio,
            url: 'https://www.toolnovahub.com/author/editorial-team',
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: schemaToJsonLd(profileSchema) }}
            />
            <div className="container mx-auto px-6 py-24 max-w-5xl">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row gap-10 items-center md:items-start mb-20">
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full bg-muted flex items-center justify-center text-4xl md:text-6xl font-bold text-muted-foreground overflow-hidden relative shadow-xl">
                        {author.image.length <= 2 ? (
                            author.image
                        ) : (
                            <Image
                                src={author.image}
                                alt={author.name}
                                fill
                                className="object-cover"
                            />
                        )}
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4">
                            {author.name}
                        </h1>
                        <p className="text-xl text-primary font-medium mb-6">
                            {author.role}
                        </p>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-8">
                            {author.bio}
                        </p>
                    </div>
                </div>

                {/* Specialties */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold text-foreground mb-6">Areas of Expertise</h2>
                    <div className="flex flex-wrap gap-3">
                        {author.specialties.map((specialty, i) => (
                            <span key={i} className="px-5 py-2 rounded-full bg-primary/5 text-primary font-medium border border-primary/15">
                                {specialty}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Articles */}
                <div>
                    <h2 className="text-2xl font-bold text-foreground mb-8 border-b border-[var(--border-color)] pb-4">
                        Latest Articles by {author.name}
                    </h2>
                    {posts.length > 0 ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {posts.map((post) => (
                                <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                                    <article className="h-full flex flex-col bg-card rounded-2xl border border-[var(--border-color)] overflow-hidden hover:shadow-lg transition-all duration-300">
                                        <div className="aspect-video bg-muted relative overflow-hidden">
                                            {post.coverImage && (
                                                <Image
                                                    src={post.coverImage}
                                                    alt={post.imageAlt}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            )}
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col">
                                            <div className="text-xs font-bold text-primary mb-3 uppercase tracking-wider">
                                                {post.category}
                                            </div>
                                            <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                                {post.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                                                {post.excerpt}
                                            </p>
                                            <div className="text-sm text-muted-foreground font-medium mt-auto">
                                                {post.date} • {post.readTime}
                                            </div>
                                        </div>
                                    </article>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <p className="text-muted-foreground italic">No articles found for this author yet.</p>
                    )}
                </div>
            </div>
        </>
    );
}
