'use client';

import { useState } from 'react';
import { FaList, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import type { ArticleHeading } from '@/lib/content-processor';

interface TableOfContentsProps {
  headings: ArticleHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(true);

  if (!headings || headings.length === 0) {
    return null;
  }

  return (
    <div className="my-8 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 text-base font-bold text-foreground hover:text-primary transition-colors focus:outline-none"
          aria-expanded={isOpen}
        >
          <FaList className="text-primary text-sm" />
          <span>Table of Contents</span>
          <span className="ml-2 text-xs text-muted-foreground font-normal">
            ({headings.length} sections)
          </span>
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="p-1 text-muted-foreground hover:text-foreground"
          aria-label={isOpen ? "Collapse Table of Contents" : "Expand Table of Contents"}
        >
          {isOpen ? <FaChevronUp className="text-xs" /> : <FaChevronDown className="text-xs" />}
        </button>
      </div>

      {isOpen && (
        <nav className="mt-4 pt-4 border-t border-border/60">
          <ul className="space-y-2 text-sm">
            {headings.map((heading, i) => (
              <li
                key={`${heading.id}-${i}`}
                className={heading.level === 3 ? 'ml-4 list-none' : 'list-none'}
              >
                <a
                  href={`#${heading.id}`}
                  className="inline-block text-muted-foreground hover:text-primary hover:underline transition-colors font-medium"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export default TableOfContents;
