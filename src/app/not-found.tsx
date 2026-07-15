import Link from "next/link";
import { Metadata } from "next";
import { TOOL_COUNT_LABEL } from "@/data/tools";

export const metadata: Metadata = {
  title: "Page Not Found | ToolNova",
  description:
    "The page you're looking for doesn't exist. Explore free AI-powered tools for students and professionals at ToolNova.",
  robots: {
    index: false,
    follow: true,
  },
};

const popularTools = [
  { name: "Essay Writer", href: "/tools/essay-writer", emoji: "✍️" },
  { name: "Homework Solver", href: "/tools/homework-solver", emoji: "📚" },
  { name: "Grammar Fix", href: "/tools/grammar-fix", emoji: "✅" },
  { name: "Flashcard Maker", href: "/tools/flashcard-maker", emoji: "🃏" },
  { name: "Merge PDF", href: "/tools/merge-pdf", emoji: "📄" },
  { name: "Paraphraser", href: "/tools/paraphraser", emoji: "🔄" },
];

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-background px-6 py-24">
      <div className="max-w-2xl w-full text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <span className="font-heading text-8xl md:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-teal-500 to-cyan-600 select-none">
            404
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 tracking-tight">
          Page Not Found
        </h1>
        <p className="text-muted-foreground text-lg mb-10 max-w-md mx-auto leading-relaxed">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved or no longer exists. Explore {TOOL_COUNT_LABEL} free
          AI tools instead.
        </p>

        {/* Primary Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl h-12 px-8 bg-gradient-to-r from-primary to-teal-600 text-white text-sm font-bold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Go Home
          </Link>
          <Link
            href="/tools"
            className="inline-flex items-center justify-center gap-2 rounded-xl h-12 px-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-foreground text-sm font-bold shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 hover:-translate-y-0.5 transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
            Browse All Tools
          </Link>
        </div>

        {/* Popular Tools Section */}
        <div className="text-left bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-100 dark:border-slate-800 p-8">
          <h2 className="text-lg font-bold text-foreground mb-1">
            Popular Tools You Might Like
          </h2>
          <p className="text-sm text-muted-foreground mb-6">
            Try one of our most-used free AI tools:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {popularTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-slate-950 border border-slate-100 dark:border-slate-800 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <span className="text-xl" role="img" aria-hidden="true">
                  {tool.emoji}
                </span>
                <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                  {tool.name}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-auto text-muted-foreground group-hover:text-primary transition-colors"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Link>
            ))}
          </div>
        </div>

        {/* Help Text */}
        <p className="text-sm text-muted-foreground mt-8">
          Need help?{" "}
          <Link
            href="/contact"
            className="text-primary hover:underline font-medium"
          >
            Contact our support team
          </Link>
        </p>
      </div>
    </div>
  );
}
