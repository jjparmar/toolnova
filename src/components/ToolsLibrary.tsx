'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import {
    Search,
    FileText,
    Image as ImageIcon,
    School,
    ArrowRight,
    Merge,
    Scaling,
    Library,
    Pencil,
    Briefcase,
    Sparkles,
    Zap,
    ChevronRight,
    Shrink,
    Type,
    Youtube,
    ShieldAlert,
    X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { TOOL_COUNT, TOOL_COUNT_LABEL } from '@/data/tools';

/** Real tools only — no dead links to unreleased features. */
export function ToolsLibrary() {
    const [activeCategory, setActiveCategory] = useState('All Tools');
    const [searchQuery, setSearchQuery] = useState('');

    const tools = useMemo(
        () => [
            {
                title: 'Merge PDF',
                description: 'Combine multiple PDF files into a single document instantly.',
                icon: Merge,
                gradient: 'from-rose-500 to-orange-500',
                glowColor: 'shadow-rose-500/20',
                category: 'PDF & Image',
                href: '/tools/merge-pdf',
                badge: 'Top Rated',
                badgeVariant: 'bg-rose-500/10 text-rose-600 border border-rose-500/20',
            },
            {
                title: 'Split PDF',
                description: 'Extract pages or split large PDFs in your browser.',
                icon: FileText,
                gradient: 'from-orange-500 to-amber-500',
                glowColor: 'shadow-orange-500/20',
                category: 'PDF & Image',
                href: '/tools/split-pdf',
            },
            {
                title: 'Image Compressor',
                description: 'Reduce image file size while keeping visual quality.',
                icon: Shrink,
                gradient: 'from-amber-500 to-yellow-500',
                glowColor: 'shadow-amber-500/20',
                category: 'PDF & Image',
                href: '/tools/image-compressor',
                badge: 'Popular',
                badgeVariant: 'bg-amber-500/10 text-amber-600 border border-amber-500/20',
            },
            {
                title: 'Image Resizer',
                description: 'Change dimensions by pixels or percentage without quality loss.',
                icon: Scaling,
                gradient: 'from-violet-500 to-purple-600',
                glowColor: 'shadow-violet-500/20',
                category: 'PDF & Image',
                href: '/tools/resize-image',
                badge: 'Trending',
                badgeVariant: 'bg-violet-500/10 text-violet-600 border border-violet-500/20',
            },
            {
                title: 'Flashcard Maker',
                description: 'Create digital study sets to memorize efficiently.',
                icon: Library,
                gradient: 'from-teal-500 to-cyan-500',
                glowColor: 'shadow-teal-500/20',
                category: 'Study',
                href: '/tools/flashcard-maker',
                badge: 'Student Pick',
                badgeVariant: 'bg-teal-500/10 text-teal-600 border border-teal-500/20',
            },
            {
                title: 'Homework Solver',
                description: 'Step-by-step solutions for math, science, and more.',
                icon: School,
                gradient: 'from-blue-500 to-indigo-600',
                glowColor: 'shadow-blue-500/20',
                category: 'Study',
                href: '/tools/homework-solver',
                badge: 'Popular',
                badgeVariant: 'bg-blue-500/10 text-blue-600 border border-blue-500/20',
            },
            {
                title: 'YouTube Summarizer',
                description: 'Paste a video URL and get a structured AI summary.',
                icon: Youtube,
                gradient: 'from-red-500 to-rose-600',
                glowColor: 'shadow-red-500/20',
                category: 'Study',
                href: '/tools/youtube-summarizer',
                badge: 'New',
                badgeVariant: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20',
            },
            {
                title: 'Essay Writer',
                description: 'Generate structured essays with clear introductions and conclusions.',
                icon: Pencil,
                gradient: 'from-violet-500 to-purple-600',
                glowColor: 'shadow-violet-500/20',
                category: 'Writing',
                href: '/tools/essay-writer',
            },
            {
                title: 'Grammar Fix',
                description: 'Fix grammar, spelling, and clarity with AI proofreading.',
                icon: Type,
                gradient: 'from-emerald-500 to-green-600',
                glowColor: 'shadow-emerald-500/20',
                category: 'Writing',
                href: '/tools/grammar-fix',
            },
            {
                title: 'AI Plagiarism Checker',
                description: 'Spot AI-writing patterns and get humanization tips.',
                icon: ShieldAlert,
                gradient: 'from-indigo-500 to-blue-600',
                glowColor: 'shadow-indigo-500/20',
                category: 'Writing',
                href: '/tools/plagiarism-checker',
                badge: 'New',
                badgeVariant: 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20',
            },
            {
                title: 'Cover Letter Writer',
                description: 'Tailored cover letters for job applications.',
                icon: Briefcase,
                gradient: 'from-amber-500 to-orange-500',
                glowColor: 'shadow-amber-500/20',
                category: 'Career',
                href: '/tools/cover-letter-writer',
            },
            {
                title: 'Resume Bullets',
                description: 'Impact-focused resume bullets with action verbs.',
                icon: Zap,
                gradient: 'from-cyan-500 to-blue-600',
                glowColor: 'shadow-cyan-500/20',
                category: 'Career',
                href: '/tools/resume-bullets',
            },
        ],
        []
    );

    const categories = useMemo(() => {
        const counts: Record<string, number> = { 'All Tools': tools.length };
        tools.forEach((t) => {
            counts[t.category] = (counts[t.category] || 0) + 1;
        });
        return [
            { name: 'All Tools', icon: Sparkles, count: counts['All Tools'] },
            { name: 'PDF & Image', icon: ImageIcon, count: counts['PDF & Image'] || 0 },
            { name: 'Study', icon: School, count: counts['Study'] || 0 },
            { name: 'Writing', icon: Pencil, count: counts['Writing'] || 0 },
            { name: 'Career', icon: Briefcase, count: counts['Career'] || 0 },
        ];
    }, [tools]);

    const filtered = tools.filter((tool) => {
        const matchesCategory =
            activeCategory === 'All Tools' || tool.category === activeCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
            !q ||
            tool.title.toLowerCase().includes(q) ||
            tool.description.toLowerCase().includes(q);
        return matchesCategory && matchesSearch;
    });

    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto max-w-[1240px] px-6">

                {/* Header */}
                <div className="text-center mb-12">
                    <span className="section-label mb-5">
                        <Sparkles className="h-3.5 w-3.5" />
                        {TOOL_COUNT_LABEL} tools
                    </span>
                    <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground mb-4 tracking-tight mt-4">
                        Tools library
                    </h2>
                    <p className="text-muted-foreground max-w-lg mx-auto text-base md:text-lg">
                        Every link below is live — {TOOL_COUNT} free tools for writing, study, PDF, and career work.
                    </p>
                </div>

                {/* Search bar */}
                <div className="max-w-lg mx-auto mb-8 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-muted-foreground group-focus-within:text-primary transition-colors" style={{ height: '1.1rem', width: '1.1rem' }} />
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tools…"
                        className="w-full h-13 pl-12 pr-12 rounded-2xl border border-border/60 bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40 transition-all shadow-soft text-[0.95rem]"
                        style={{ height: '3.25rem' }}
                        aria-label="Search tools library"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Category filter pills */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            type="button"
                            onClick={() => setActiveCategory(cat.name)}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                                activeCategory === cat.name
                                    ? 'bg-primary text-white shadow-lg shadow-primary/25 scale-105'
                                    : 'bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-muted border border-border/60'
                            }`}
                        >
                            {cat.icon && <cat.icon className="h-3.5 w-3.5" />}
                            {cat.name}
                            <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                                activeCategory === cat.name
                                    ? 'bg-white/20 text-white'
                                    : 'bg-foreground/8 text-muted-foreground'
                            }`}
                            style={{ background: activeCategory === cat.name ? 'rgba(255,255,255,0.2)' : undefined }}
                            >
                                {cat.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Tools grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map((tool) => (
                        <Link
                            key={tool.href}
                            href={tool.href}
                            className="group relative flex flex-col rounded-2xl bg-card border border-border/60 p-6 shadow-premium-sm hover:shadow-premium hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                        >
                            {/* Top hover accent */}
                            <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                            {/* Badge */}
                            {tool.badge && (
                                <span className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${tool.badgeVariant}`}>
                                    {tool.badge}
                                </span>
                            )}

                            {/* Icon */}
                            <div
                                className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.gradient} text-white shadow-lg ${tool.glowColor} group-hover:scale-110 group-hover:rotate-3 transition-all duration-400`}
                            >
                                <tool.icon className="h-5.5 w-5.5" style={{ height: '1.375rem', width: '1.375rem' }} />
                            </div>

                            {/* Content */}
                            <h3 className="text-base font-bold text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors leading-snug">
                                {tool.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                                {tool.description}
                            </p>

                            {/* Footer */}
                            <div className="mt-5 flex items-center text-primary text-sm font-semibold pt-4 border-t border-border/60">
                                Open tool
                                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1.5 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <div className="text-center py-16">
                        <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-4">
                            <Search className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <p className="text-muted-foreground font-medium mb-2">No tools found</p>
                        <p className="text-muted-foreground/70 text-sm">Try another keyword or browse all tools.</p>
                        <button
                            type="button"
                            onClick={() => { setSearchQuery(''); setActiveCategory('All Tools'); }}
                            className="mt-4 text-primary text-sm font-semibold hover:underline underline-offset-4"
                        >
                            Clear filters
                        </button>
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link href="/tools">
                        <Button className="h-14 px-8 rounded-full font-bold gap-2 shadow-[0_0_20px_-5px_rgba(var(--primary),0.4)] hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.6)] hover:-translate-y-0.5 transition-all duration-300">
                            View all {TOOL_COUNT_LABEL} tools
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
