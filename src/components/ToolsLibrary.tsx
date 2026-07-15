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
                gradient: 'from-red-500 to-rose-600',
                category: 'PDF & Image',
                href: '/tools/merge-pdf',
                badge: 'Top Rated',
                badgeColor: 'bg-red-500',
            },
            {
                title: 'Split PDF',
                description: 'Extract pages or split large PDFs in your browser.',
                icon: FileText,
                gradient: 'from-orange-500 to-amber-600',
                category: 'PDF & Image',
                href: '/tools/split-pdf',
            },
            {
                title: 'Image Compressor',
                description: 'Reduce image file size while keeping visual quality.',
                icon: Shrink,
                gradient: 'from-amber-500 to-yellow-600',
                category: 'PDF & Image',
                href: '/tools/image-compressor',
                badge: 'Popular',
                badgeColor: 'bg-amber-500',
            },
            {
                title: 'Image Resizer',
                description: 'Change dimensions by pixels or percentage without quality loss.',
                icon: Scaling,
                gradient: 'from-purple-500 to-violet-600',
                category: 'PDF & Image',
                href: '/tools/resize-image',
                badge: 'Trending',
                badgeColor: 'bg-purple-500',
            },
            {
                title: 'Flashcard Maker',
                description: 'Create digital study sets to memorize efficiently.',
                icon: Library,
                gradient: 'from-teal-500 to-cyan-600',
                category: 'Study',
                href: '/tools/flashcard-maker',
                badge: 'Student Pick',
                badgeColor: 'bg-teal-500',
            },
            {
                title: 'Homework Solver',
                description: 'Step-by-step solutions for math, science, and more.',
                icon: School,
                gradient: 'from-blue-500 to-indigo-600',
                category: 'Study',
                href: '/tools/homework-solver',
                badge: 'Popular',
                badgeColor: 'bg-blue-500',
            },
            {
                title: 'YouTube Summarizer',
                description: 'Paste a video URL and get a structured AI summary.',
                icon: Youtube,
                gradient: 'from-red-500 to-rose-600',
                category: 'Study',
                href: '/tools/youtube-summarizer',
                badge: 'New',
                badgeColor: 'bg-green-500',
            },
            {
                title: 'Essay Writer',
                description: 'Generate structured essays with clear introductions and conclusions.',
                icon: Pencil,
                gradient: 'from-violet-500 to-purple-600',
                category: 'Writing',
                href: '/tools/essay-writer',
            },
            {
                title: 'Grammar Fix',
                description: 'Fix grammar, spelling, and clarity with AI proofreading.',
                icon: Type,
                gradient: 'from-emerald-500 to-green-600',
                category: 'Writing',
                href: '/tools/grammar-fix',
            },
            {
                title: 'AI Plagiarism Checker',
                description: 'Spot AI-writing patterns and get humanization tips.',
                icon: ShieldAlert,
                gradient: 'from-indigo-500 to-blue-600',
                category: 'Writing',
                href: '/tools/plagiarism-checker',
                badge: 'New',
                badgeColor: 'bg-indigo-500',
            },
            {
                title: 'Cover Letter Writer',
                description: 'Tailored cover letters for job applications.',
                icon: Briefcase,
                gradient: 'from-amber-500 to-orange-600',
                category: 'Career',
                href: '/tools/cover-letter-writer',
            },
            {
                title: 'Resume Bullets',
                description: 'Impact-focused resume bullets with action verbs.',
                icon: Zap,
                gradient: 'from-cyan-500 to-blue-600',
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
            { name: 'All Tools', icon: null, count: counts['All Tools'] },
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
            <div className="mx-auto max-w-[1200px] px-6">
                <div className="text-center mb-10">
                    <span className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-sm mb-3 px-4 py-1.5 bg-primary/10 rounded-full">
                        <Sparkles className="h-4 w-4" />
                        {TOOL_COUNT_LABEL} tools
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
                        Tools library
                    </h2>
                    <p className="text-muted-foreground max-w-xl mx-auto">
                        Every link below is live — {TOOL_COUNT} free tools for writing, study, PDF,
                        and career work.
                    </p>
                </div>

                <div className="max-w-xl mx-auto mb-8 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input
                        type="search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search tools..."
                        className="w-full h-12 pl-11 pr-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                        aria-label="Search tools library"
                    />
                </div>

                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {categories.map((cat) => (
                        <button
                            key={cat.name}
                            type="button"
                            onClick={() => setActiveCategory(cat.name)}
                            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                                activeCategory === cat.name
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-muted/60 text-muted-foreground hover:text-foreground'
                            }`}
                        >
                            {cat.icon && <cat.icon className="h-4 w-4" />}
                            {cat.name}
                            <span className="opacity-70 text-xs">({cat.count})</span>
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {filtered.map((tool) => (
                        <Link
                            key={tool.href}
                            href={tool.href}
                            className="group relative flex flex-col rounded-2xl bg-card border border-border p-6 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300"
                        >
                            {tool.badge && (
                                <span
                                    className={`absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wide text-white px-2 py-0.5 rounded-full ${tool.badgeColor}`}
                                >
                                    {tool.badge}
                                </span>
                            )}
                            <div
                                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${tool.gradient} text-white shadow-lg group-hover:scale-110 transition-transform`}
                            >
                                <tool.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                {tool.title}
                            </h3>
                            <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                                {tool.description}
                            </p>
                            <div className="mt-4 flex items-center text-primary text-sm font-semibold">
                                Open tool
                                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <p className="text-center text-muted-foreground py-12">
                        No tools match your search. Try another keyword.
                    </p>
                )}

                <div className="text-center mt-12">
                    <Link href="/tools">
                        <Button className="h-12 px-8 rounded-xl font-semibold gap-2">
                            View all {TOOL_COUNT_LABEL} tools
                            <ArrowRight className="h-4 w-4" />
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
