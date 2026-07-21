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
        <section className="relative py-16 md:py-24 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="pointer-events-none absolute top-12 left-1/2 -z-10 h-96 w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-br from-[#FF3B5C]/10 to-[#7C3AED]/10 blur-[120px]" />

            <div className="mx-auto max-w-[1240px] px-6">
                {/* Header */}
                <div className="text-center mb-12">
                    <span className="section-badge mb-4 animate-float">
                        <Sparkles className="h-4 w-4 text-[#FF3B5C]" />
                        {TOOL_COUNT_LABEL} Productivity Tools
                    </span>
                    <h1 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight mt-3">
                        Complete <span className="text-gradient">Tools Library</span>
                    </h1>
                    <p className="text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
                        Every utility below is completely free — fast, private, and instant execution.
                    </p>
                </div>

                {/* Search bar */}
                <div className="max-w-xl mx-auto mb-10 relative group">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tools by keyword (e.g. pdf, homework, resume)..."
                        className="w-full h-14 pl-13 pr-12 rounded-2xl border border-border/80 bg-card text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-4 focus:ring-primary/15 focus:border-primary transition-all shadow-md text-base font-medium"
                        aria-label="Search tools library"
                    />
                    {searchQuery && (
                        <button
                            type="button"
                            onClick={() => setSearchQuery('')}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1 rounded-full bg-muted"
                            aria-label="Clear search"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    )}
                </div>

                {/* Category filter pills */}
                <div className="flex flex-wrap justify-center gap-2.5 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            type="button"
                            onClick={() => setActiveCategory(cat.name)}
                            className={`inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-extrabold transition-all duration-300 ${
                                activeCategory === cat.name
                                    ? 'cat-pill-active scale-105'
                                    : 'bg-card text-muted-foreground hover:text-foreground border border-border/70 hover:border-primary/40 shadow-xs'
                            }`}
                        >
                            {cat.icon && <cat.icon className="h-4 w-4" />}
                            {cat.name}
                            <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                                activeCategory === cat.name
                                    ? 'bg-white/20 text-white'
                                    : 'bg-muted text-muted-foreground'
                            }`}
                            >
                                {cat.count}
                            </span>
                        </button>
                    ))}
                </div>

                {/* Tools grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filtered.map((tool) => (
                        <Link
                            key={tool.href}
                            href={tool.href}
                            className="surface-card group relative flex flex-col rounded-2xl bg-card border border-border/70 p-6 shadow-sm hover:shadow-xl hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden"
                        >
                            {/* Top hover accent */}
                            <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                            {/* Badge */}
                            {tool.badge && (
                                <span className={`absolute top-4 right-4 text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full ${tool.badgeVariant}`}>
                                    {tool.badge}
                                </span>
                            )}

                            {/* Icon */}
                            <div
                                className={`mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.gradient} text-white shadow-lg ${tool.glowColor} group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}
                            >
                                <tool.icon className="h-6 w-6" />
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-extrabold text-foreground mb-2 tracking-tight group-hover:text-primary transition-colors leading-snug">
                                {tool.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                                {tool.description}
                            </p>

                            {/* Footer */}
                            <div className="mt-5 flex items-center text-primary text-xs font-extrabold uppercase tracking-wider pt-4 border-t border-border/60">
                                Open Tool
                                <ChevronRight className="h-4 w-4 ml-1.5 group-hover:translate-x-1.5 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Empty state */}
                {filtered.length === 0 && (
                    <div className="text-center py-20">
                        <div className="h-16 w-16 rounded-2xl bg-muted/80 flex items-center justify-center mx-auto mb-4 border border-border">
                            <Search className="h-7 w-7 text-muted-foreground" />
                        </div>
                        <p className="text-foreground font-bold text-lg mb-1">No tools matched your search</p>
                        <p className="text-muted-foreground text-sm">Try searching for generic terms like "PDF", "essay", or "math".</p>
                        <button
                            type="button"
                            onClick={() => { setSearchQuery(''); setActiveCategory('All Tools'); }}
                            className="mt-5 btn-premium inline-flex items-center gap-2 px-6 py-2.5 text-sm rounded-xl font-bold"
                        >
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}

