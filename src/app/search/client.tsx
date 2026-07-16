'use client';

import { useState, useMemo, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, ArrowRight, FileText, BookOpen, SearchX } from 'lucide-react';

interface ToolResult {
    slug: string;
    name: string;
    tagline: string;
    description: string;
    category: string;
}

interface BlogResult {
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    readTime: string;
}

export function SearchClient({
    tools,
    blogPosts,
    initialQuery,
}: {
    tools: ToolResult[];
    blogPosts: BlogResult[];
    initialQuery: string;
}) {
    return (
        <Suspense fallback={<SearchSkeleton />}>
            <SearchContent
                tools={tools}
                blogPosts={blogPosts}
                initialQuery={initialQuery}
            />
        </Suspense>
    );
}

function SearchContent({
    tools,
    blogPosts,
    initialQuery,
}: {
    tools: ToolResult[];
    blogPosts: BlogResult[];
    initialQuery: string;
}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [query, setQuery] = useState(
        searchParams.get('q') || initialQuery || ''
    );

    // Keep the URL in sync with the query (sharable, crawlable).
    useEffect(() => {
        const t = setTimeout(() => {
            const q = query.trim();
            const params = new URLSearchParams();
            if (q) params.set('q', q);
            const qs = params.toString();
            router.replace(qs ?`/search?${qs}` : '/search', { scroll: false });
        }, 300);
        return () => clearTimeout(t);
    }, [query, router]);

    const { toolMatches, blogMatches } = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return { toolMatches: [], blogMatches: [] };

        const toolMatches = tools
            .filter((t) => {
                return (
                    t.name.toLowerCase().includes(q) ||
                    t.description.toLowerCase().includes(q) ||
                    t.tagline.toLowerCase().includes(q) ||
                    t.category.toLowerCase().includes(q) ||
                    t.slug.replace(/-/g, ' ').toLowerCase().includes(q)
                );
            })
            .slice(0, 12);

        const blogMatches = blogPosts
            .filter((p) => {
                return (
                    p.title.toLowerCase().includes(q) ||
                    p.excerpt.toLowerCase().includes(q) ||
                    p.category.toLowerCase().includes(q)
                );
            })
            .slice(0, 8);

        return { toolMatches, blogMatches };
    }, [query, tools, blogPosts]);

    const hasQuery = query.trim().length > 0;
    const noResults = hasQuery && toolMatches.length === 0 && blogMatches.length === 0;

    // Popular searches shown when there's no query.
    const popularTools = tools.slice(0, 6);

    return (
        <div className="min-h-screen bg-[#f8f9fb]">
            {/* Search Header */}
            <section className="bg-gradient-to-br from-primary via-blue-600 to-indigo-700 py-16">
                <div className="container mx-auto px-6 max-w-3xl text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
                        Search ToolNova
                    </h1>
                    <p className="text-blue-100 text-lg mb-8">
                        Find the right AI tool or guide for your task.
                    </p>
                    <div className="relative">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                        <input
                            type="search"
                            autoFocus
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search tools, guides, and topics..."
                            aria-label="Search ToolNova"
                            className="w-full h-16 pl-16 pr-6 rounded-2xl bg-white text-foreground text-lg shadow-2xl outline-none focus:ring-4 focus:ring-white/30"
                        />
                    </div>
                    <p className="text-blue-200/80 text-xs mt-4">
                        {tools.length} AI tools · {blogPosts.length} guides available
                    </p>
                </div>
            </section>

            {/* Results */}
            <section className="py-12">
                <div className="container mx-auto px-6 max-w-5xl">
                    {!hasQuery && (
                        <div>
                            <h2 className="text-2xl font-bold text-foreground mb-6">
                                Popular tools to get you started
                            </h2>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {popularTools.map((tool) => (
                                    <Link
                                        key={tool.slug}
                                        href={`/tools/${tool.slug}`}
                                        className="group block bg-white rounded-xl p-5 border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                <FileText className="h-5 w-5 text-primary" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                    {tool.name}
                                                </h3>
                                                <p className="text-sm text-muted-foreground line-clamp-2">
                                                    {tool.tagline}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {noResults && (
                        <div className="text-center py-20">
                            <SearchX className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold text-foreground mb-2">
                                No results for &ldquo;{query}&rdquo;
                            </h2>
                            <p className="text-muted-foreground mb-8">
                                Try a different keyword, or browse all tools.
                            </p>
                            <Link
                                href="/tools"
                                className="inline-flex items-center gap-2 h-12 px-8 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors"
                            >
                                Browse all tools
                                <ArrowRight className="h-4 w-4" />
                            </Link>
                        </div>
                    )}

                    {hasQuery && toolMatches.length > 0 && (
                        <div className="mb-12">
                            <h2 className="text-xl font-bold text-foreground mb-4">
                                Tools ({toolMatches.length})
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {toolMatches.map((tool) => (
                                    <Link
                                        key={tool.slug}
                                        href={`/tools/${tool.slug}`}
                                        className="group block bg-white rounded-xl p-5 border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-start gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                                    <FileText className="h-5 w-5 text-primary" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                        {tool.name}
                                                    </h3>
                                                    <span className="inline-block text-xs text-primary bg-primary/10 px-2 py-0.5 rounded mt-1">
                                                        {tool.category}
                                                    </span>
                                                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                                                        {tool.tagline}
                                                    </p>
                                                </div>
                                            </div>
                                            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}

                    {hasQuery && blogMatches.length > 0 && (
                        <div>
                            <h2 className="text-xl font-bold text-foreground mb-4">
                                Guides &amp; Articles ({blogMatches.length})
                            </h2>
                            <div className="grid gap-4">
                                {blogMatches.map((post) => (
                                    <Link
                                        key={post.slug}
                                        href={`/blog/${post.slug}`}
                                        className="group block bg-white rounded-xl p-5 border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-start gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                                                    <BookOpen className="h-5 w-5 text-emerald-600" />
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                                        {post.title}
                                                    </h3>
                                                    <span className="inline-block text-xs text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded mt-1">
                                                        {post.category}
                                                    </span>
                                                    <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
                                                        {post.excerpt}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground mt-2">
                                                        {post.readTime} read
                                                    </p>
                                                </div>
                                            </div>
                                            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

function SearchSkeleton() {
    return (
        <div className="min-h-screen bg-[#f8f9fb]">
            <div className="h-64 bg-gradient-to-br from-primary via-blue-600 to-indigo-700" />
            <div className="container mx-auto px-6 max-w-5xl py-12">
                <div className="h-8 w-48 bg-muted rounded animate-pulse mb-6" />
                <div className="grid sm:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <div
                            key={i}
                            className="h-24 bg-white rounded-xl animate-pulse"
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
