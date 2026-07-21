'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaCalendar, FaClock, FaChevronRight } from 'react-icons/fa';
import type { BlogPost } from '@/data/blog';

interface BlogGridWithFiltersProps {
  posts: BlogPost[];
  categories: string[];
}

export function BlogGridWithFilters({ posts, categories }: BlogGridWithFiltersProps) {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredPosts = activeCategory === 'All'
    ? posts
    : posts.filter((p) => p.category?.toLowerCase() === activeCategory.toLowerCase());

  const filterTabs = ['All', ...categories.slice(0, 6)];

  return (
    <div>
      {/* Category Filter Tabs */}
      <div className="mb-8 flex flex-wrap items-center gap-2">
        {filterTabs.map((cat) => {
          const isActive = activeCategory.toLowerCase() === cat.toLowerCase();
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                isActive
                  ? 'bg-primary text-primary-foreground shadow-md shadow-primary/20'
                  : 'bg-card border border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid */}
      {filteredPosts.length === 0 ? (
        <p className="text-muted-foreground py-8">No articles found in this category.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group h-full"
            >
              <article className="surface-card h-full p-6 flex flex-col transition-all duration-300 hover:border-primary/30 hover:-translate-y-1">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {post.category}
                  </span>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                  <span className="text-muted-foreground text-xs flex items-center gap-1.5">
                    <FaCalendar className="text-primary/70" />
                    {post.date}
                  </span>
                  <span className="text-muted-foreground text-xs flex items-center gap-1.5">
                    <FaClock className="text-primary/70" />
                    {post.readTime}
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  Read article
                  <FaChevronRight className="text-xs" />
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
