"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search, X, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CategoryToolItem {
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  badge?: string;
}

interface CategoryToolsHubProps {
  title: string;
  description: string;
  kicker: string;
  tools: CategoryToolItem[];
  iconColors?: string[];
  /** Optional related guides under the grid */
  relatedGuides?: { href: string; label: string }[];
}

const DEFAULT_COLORS = [
  "from-[#7c3aed] to-[#d946ef]",
  "from-[#8b5cf6] to-[#6366f1]",
  "from-[#e40014] to-[#7c3aed]",
  "from-[#0ea5e9] to-[#0284c7]",
  "from-[#10b981] to-[#059669]",
  "from-[#f59e0b] to-[#d97706]",
  "from-[#ec4899] to-[#db2777]",
  "from-[#14b8a6] to-[#0d9488]",
];

/**
 * Shared category library UI — matches homepage / tools library language.
 */
export function CategoryToolsHub({
  title,
  description,
  kicker,
  tools,
  iconColors = DEFAULT_COLORS,
  relatedGuides = [],
}: CategoryToolsHubProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return tools;
    return tools.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.slug.includes(q),
    );
  }, [tools, searchQuery]);

  return (
    <div className="w-full">
      <section className="mb-10 border-b border-border bg-card pb-10 text-center">
        <div className="section-kicker mb-4">{kicker}</div>
        <h1 className="font-heading mb-3 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          {title}
        </h1>
        <p className="mx-auto mb-6 max-w-2xl text-base text-muted-foreground md:text-lg">
          {description}
        </p>
        <div className="mx-auto max-w-xl">
          <label htmlFor="category-tool-search" className="sr-only">
            Search tools in this category
          </label>
          <div className="input-surface flex items-center rounded-xl">
            <Search
              className="ml-4 h-5 w-5 shrink-0 text-muted-foreground"
              aria-hidden
            />
            <input
              id="category-tool-search"
              type="search"
              autoComplete="off"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools in this category…"
              className="flex-1 border-none bg-transparent px-3 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mr-2 rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {filtered.length} of {tools.length} tools
            {searchQuery ? ` matching “${searchQuery}”` : ""}
          </p>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool, i) => {
          const Icon = tool.icon;
          const gradient = iconColors[i % iconColors.length];
          return (
            <Link
              key={tool.slug}
              href={`/tools/${tool.slug}`}
              className="surface-card group flex flex-col p-5"
            >
              <div className="mb-4 flex items-start justify-between">
                <div
                  className={cn(
                    "tool-icon bg-gradient-to-br transition-transform group-hover:scale-105",
                    gradient,
                  )}
                >
                  <Icon className="h-6 w-6" strokeWidth={1.75} />
                </div>
                {tool.badge && (
                  <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
                    {tool.badge}
                  </span>
                )}
              </div>
              <h2 className="font-heading mb-1.5 text-lg font-bold text-foreground group-hover:text-primary">
                {tool.name}
              </h2>
              <p className="mb-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {tool.description}
              </p>
              <div className="flex items-center gap-1 text-sm font-bold text-primary">
                Open tool
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="content-panel px-6 py-14 text-center">
          <p className="mb-2 font-heading text-lg font-bold text-foreground">
            No tools match your search
          </p>
          <p className="mb-5 text-sm text-muted-foreground">
            Try a shorter keyword, or clear the filter.
          </p>
          <button
            type="button"
            onClick={() => setSearchQuery("")}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
          >
            Clear search
          </button>
        </div>
      )}

      {relatedGuides.length > 0 && (
        <div className="mt-12 border-t border-border pt-8">
          <h2 className="font-heading mb-4 text-center text-xl font-extrabold text-foreground">
            Related guides
          </h2>
          <div className="flex flex-wrap justify-center gap-2">
            {relatedGuides.map((g) => (
              <Link
                key={g.href}
                href={g.href}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                {g.label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
        >
          Browse all tools
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
