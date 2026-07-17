'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Sparkles, PenLine, BookOpen, Calculator } from 'lucide-react';
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import { toolsData } from '@/data/tools';

const categoryIcons: Record<string, 'sparkles' | 'pen' | 'book' | 'calculator'> = {
    'AI Study Tools': 'sparkles',
    'Writing Tools': 'pen',
    'Creative Tools': 'book',
    'Utility Tools': 'calculator',
    'PDF Tools': 'book',
    'Image Tools': 'book',
    'Career Tools': 'pen',
    'Study Tools': 'sparkles',
    'Exam Prep': 'sparkles',
};

const iconMap = {
    sparkles: Sparkles,
    pen: PenLine,
    book: BookOpen,
    calculator: Calculator,
};

export function GlobalSearch() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const tools = Object.entries(toolsData).map(([slug, tool]) => ({
        name: tool.name,
        href:`/tools/${slug}`,
        description: tool.tagline || tool.description,
        category: tool.category,
        icon: categoryIcons[tool.category] || 'sparkles',
    }));

    const groupedTools = tools.reduce((acc, tool) => {
        if (!acc[tool.category]) {
            acc[tool.category] = [];
        }
        acc[tool.category].push(tool);
        return acc;
    }, {} as Record<string, typeof tools>);

    return (
        <>
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label="Search tools (Ctrl+K)"
                className="flex w-full items-center justify-between gap-2 rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 sm:w-auto sm:justify-start sm:px-3.5"
            >
                <span className="flex items-center gap-2">
                    <Search className="h-4 w-4 shrink-0" />
                    <span className="truncate">Search tools...</span>
                </span>
                <kbd className="hidden lg:inline-flex h-5 select-none items-center gap-1 rounded-full border border-border/60 bg-background px-2 font-mono text-[10px] font-medium text-muted-foreground shrink-0">
                    Ctrl+K
                </kbd>
            </button>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Search for tools..." />
                <CommandList>
                    <CommandEmpty>No tools found.</CommandEmpty>
                    {Object.entries(groupedTools).map(([category, categoryTools]) => (
                        <CommandGroup key={category} heading={category}>
                            {categoryTools.map((tool) => {
                                const Icon = iconMap[tool.icon];
                                return (
                                    <CommandItem
                                        key={tool.href}
                                        value={`${tool.name} ${tool.description} ${tool.category}`}
                                        onSelect={() => {
                                            router.push(tool.href);
                                            setOpen(false);
                                        }}
                                        className="cursor-pointer"
                                    >
                                        <Icon className="mr-2 h-4 w-4 text-primary" />
                                        <div className="flex flex-col">
                                            <span className="font-medium">{tool.name}</span>
                                            <span className="text-xs text-muted-foreground">{tool.description}</span>
                                        </div>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    ))}
                </CommandList>
            </CommandDialog>
        </>
    );
}