"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Search, type LucideIcon } from "lucide-react";
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
}

const DEFAULT_COLORS = [
  "from-[#E5322D] to-[#c42824]",
  "from-[#0ea5e9] to-[#0284c7]",
  "from-[#1a9c4a] to-[#15803d]",
  "from-[#8b5cf6] to-[#7c3aed]",
  "from-[#f59e0b] to-[#d97706]",
  "from-[#ec4899] to-[#db2777]",
  "from-[#14b8a6] to-[#0d9488]",
  "from-[#6366f1] to-[#4f46e5]",
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
}: CategoryToolsHubProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = tools.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
          <div className="input-surface flex items-center rounded-xl">
            <Search className="ml-4 h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tools in this category…"
              className="flex-1 border-none bg-transparent px-3 py-3.5 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
            />
          </div>
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
                    gradient
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
              <h3 className="font-heading mb-1.5 text-lg font-bold text-foreground group-hover:text-primary">
                {tool.name}
              </h3>
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
        <p className="py-16 text-center text-muted-foreground">
          No tools match your search.
        </p>
      )}
    </div>
  );
}
