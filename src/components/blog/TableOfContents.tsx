"use client";

import { useEffect, useMemo, useState } from "react";
import { FaList, FaChevronDown, FaChevronUp } from "react-icons/fa";
import type { ArticleHeading } from "@/lib/content-processor";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  headings: ArticleHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  // Collapsed by default on narrow screens to reduce scroll friction
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState<string>("");
  const [mobileBarVisible, setMobileBarVisible] = useState(false);

  const ids = useMemo(
    () => headings.map((h) => h.id).filter(Boolean),
    [headings],
  );

  useEffect(() => {
    // Expand TOC on desktop by default
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsOpen(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!ids.length) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (!elements.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target?.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-20% 0px -65% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  useEffect(() => {
    // Show compact sticky bar after scrolling past the main TOC block
    const onScroll = () => {
      const toc = document.getElementById("article-toc");
      if (!toc) {
        setMobileBarVisible(window.scrollY > 420);
        return;
      }
      const rect = toc.getBoundingClientRect();
      setMobileBarVisible(rect.bottom < 72 && window.innerWidth < 1024);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!headings || headings.length === 0) {
    return null;
  }

  const activeHeading =
    headings.find((h) => h.id === activeId) || headings[0];

  return (
    <>
      {/* Inline TOC (in-article) */}
      <div
        id="article-toc"
        className="my-8 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all sm:p-5"
      >
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex min-w-0 flex-1 items-center gap-2 text-left text-base font-bold text-foreground transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-lg"
            aria-expanded={isOpen}
            aria-controls="article-toc-list"
          >
            <FaList className="shrink-0 text-sm text-primary" aria-hidden />
            <span>On this page</span>
            <span className="truncate text-xs font-normal text-muted-foreground">
              ({headings.length} sections)
            </span>
          </button>
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label={isOpen ? "Collapse table of contents" : "Expand table of contents"}
          >
            {isOpen ? (
              <FaChevronUp className="text-xs" />
            ) : (
              <FaChevronDown className="text-xs" />
            )}
          </button>
        </div>

        {isOpen && (
          <nav
            id="article-toc-list"
            className="mt-4 border-t border-border/60 pt-4"
            aria-label="Table of contents"
          >
            <ul className="max-h-[min(50vh,22rem)] space-y-1 overflow-y-auto overscroll-contain pr-1 text-sm">
              {headings.map((heading, i) => {
                const active = heading.id === activeId;
                return (
                  <li
                    key={`${heading.id}-${i}`}
                    className={cn(
                      "list-none",
                      heading.level === 3 && "ml-3",
                    )}
                  >
                    <a
                      href={`#${heading.id}`}
                      onClick={() => {
                        // Keep TOC open on desktop; collapse on mobile after jump
                        if (window.innerWidth < 1024) setIsOpen(false);
                      }}
                      className={cn(
                        "block rounded-lg px-2.5 py-1.5 font-medium transition-colors",
                        active
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                      aria-current={active ? "location" : undefined}
                    >
                      {heading.text}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>

      {/* Sticky mobile “On this page” bar */}
      {mobileBarVisible && (
        <div className="fixed inset-x-0 top-[68px] z-40 border-b border-border/80 bg-background/95 px-3 py-2 shadow-sm backdrop-blur-md lg:hidden">
          <button
            type="button"
            onClick={() => {
              setIsOpen(true);
              document
                .getElementById("article-toc")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
            className="flex w-full items-center gap-2 rounded-xl border border-border bg-card px-3 py-2 text-left text-sm"
          >
            <FaList className="shrink-0 text-primary" aria-hidden />
            <span className="min-w-0 flex-1 truncate font-semibold text-foreground">
              {activeHeading?.text || "On this page"}
            </span>
            <span className="shrink-0 text-xs text-muted-foreground">
              TOC
            </span>
            <FaChevronDown className="shrink-0 text-xs text-muted-foreground" />
          </button>
        </div>
      )}
    </>
  );
}

export default TableOfContents;
