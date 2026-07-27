"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaCalendar, FaClock, FaChevronRight, FaSearch } from "react-icons/fa";
import type { BlogPost } from "@/data/blog";
import { formatDisplayDate, formatReadTime } from "@/lib/format";

interface BlogGridWithFiltersProps {
  posts: BlogPost[];
  categories: string[];
}

export function BlogGridWithFilters({
  posts,
  categories,
}: BlogGridWithFiltersProps) {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [query, setQuery] = useState("");

  const filterTabs = useMemo(
    () => ["All", ...categories.slice(0, 8)],
    [categories],
  );

  const filteredPosts = useMemo(() => {
    const q = query.toLowerCase().trim();
    return posts.filter((p) => {
      const catOk =
        activeCategory === "All" ||
        p.category?.toLowerCase() === activeCategory.toLowerCase();
      if (!catOk) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        p.excerpt?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p.keywords?.some((k) => k.toLowerCase().includes(q))
      );
    });
  }, [posts, activeCategory, query]);

  return (
    <div>
      {/* Search + filters */}
      <div className="mb-8 space-y-4">
        <div className="relative max-w-md">
          <FaSearch
            className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <label htmlFor="blog-search" className="sr-only">
            Search articles
          </label>
          <input
            id="blog-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides…"
            className="w-full rounded-xl border border-border bg-card py-2.5 pl-10 pr-3 text-sm font-medium text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div
          className="flex flex-wrap items-center gap-2"
          role="tablist"
          aria-label="Filter by category"
        >
          {filterTabs.map((cat) => {
            const isActive =
              activeCategory.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <p className="text-sm text-muted-foreground">
          Showing{" "}
          <span className="font-semibold text-foreground">
            {filteredPosts.length}
          </span>{" "}
          article{filteredPosts.length === 1 ? "" : "s"}
          {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
          {query ? ` for “${query}”` : ""}
        </p>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-border bg-card px-6 py-14 text-center">
          <p className="mb-2 font-heading text-lg font-bold text-foreground">
            No articles found
          </p>
          <p className="mb-5 text-sm text-muted-foreground">
            Try another keyword or clear filters.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveCategory("All");
            }}
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group h-full"
            >
              <article className="surface-card flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/30">
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  {post.coverImage ? (
                    <Image
                      src={post.coverImage}
                      alt={post.imageAlt || post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      // First few cards may be LCP-adjacent on desktop grids
                      priority={index < 2}
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-sky-500/10" />
                  )}
                  <span className="absolute left-3 top-3 rounded-full border border-border/60 bg-card/95 px-2.5 py-1 text-xs font-semibold text-primary shadow-sm backdrop-blur">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 md:p-6">
                  <h3 className="font-heading mb-2 line-clamp-2 text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-primary md:text-xl">
                    {post.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 flex-grow text-sm leading-relaxed text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <FaCalendar className="text-primary/70" aria-hidden />
                      {formatDisplayDate(post.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaClock className="text-primary/70" aria-hidden />
                      {formatReadTime(post.readTime)}
                    </span>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-sm font-semibold text-primary transition-all group-hover:gap-2">
                    Read article
                    <FaChevronRight className="text-xs" aria-hidden />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default BlogGridWithFilters;
