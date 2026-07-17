'use client';

import { useState, useEffect } from 'react';
import { List, ChevronRight } from 'lucide-react';

interface TOCItem {
    id: string;
    text: string;
    level: number;
}

interface TableOfContentsProps {
    content: string;
}

export function TableOfContents({ content }: TableOfContentsProps) {
    const [activeId, setActiveId] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);

    // Parse headings from markdown content
    const headings: TOCItem[] = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
        const h2Match = line.match(/^## (.+)$/);
        const h3Match = line.match(/^### (.+)$/);

        if (h2Match) {
            const text = h2Match[1].replace(/\*\*/g, '').trim();
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            headings.push({ id, text, level: 2 });
        } else if (h3Match) {
            const text = h3Match[1].replace(/\*\*/g, '').trim();
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            headings.push({ id, text, level: 3 });
        }
    });

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -66% 0px' }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length < 3) return null;

    return (
        <>
            {/* Mobile Toggle */}
            <div className="lg:hidden mb-6">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 w-full px-4 py-3 bg-muted/60 rounded-xl text-foreground/80 font-medium hover:bg-muted transition-colors"
                >
                    <List className="h-5 w-5" />
                    Table of Contents
                    <ChevronRight className={`h-4 w-4 ml-auto transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                </button>
                {isOpen && (
                    <nav className="mt-2 p-4 bg-muted/60 rounded-xl">
                        <ul className="space-y-2">
                            {headings.map((heading) => (
                                <li key={heading.id}>
                                    <a
                                        href={`#${heading.id}`}
                                        onClick={() => setIsOpen(false)}
                                        className={`block py-1 text-sm transition-colors hover:text-blue-600 ${heading.level === 3 ? 'pl-4' : ''
                                            } ${activeId === heading.id ? 'text-blue-600 font-medium' : 'text-muted-foreground'}`}
                                    >
                                        {heading.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                )}
            </div>

            {/* Desktop Sticky */}
            <aside className="hidden lg:block sticky top-24 self-start w-64 shrink-0">
                <div className="p-5 bg-muted/60 rounded-2xl border border-border">
                    <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
                        <List className="h-5 w-5 text-slate-500" />
                        <span className="font-semibold text-foreground">In This Article</span>
                    </div>
                    <nav>
                        <ul className="space-y-1">
                            {headings.map((heading) => (
                                <li key={heading.id}>
                                    <a
                                        href={`#${heading.id}`}
                                        className={`block py-1.5 text-sm transition-all hover:text-blue-600 hover:translate-x-1 ${heading.level === 3 ? 'pl-4 text-slate-500' : 'font-medium'
                                            } ${activeId === heading.id ? 'text-blue-600' : 'text-muted-foreground'}`}
                                    >
                                        {heading.text}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </aside>
        </>
    );
}
