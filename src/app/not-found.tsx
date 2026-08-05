import Link from"next/link";
import { Metadata } from"next";
import { TOOL_COUNT_LABEL } from"@/data/tools";

export const metadata: Metadata = {
  title:"Page Not Found",
  description:"The page you're looking for doesn't exist. Explore free AI-powered tools for students and professionals at ToolNova.",
  robots: {
    index: false,
    follow: true,
  },
};

const popularTools = [
  { name:"Essay Writer", href:"/tools/essay-writer", emoji:"✍️" },
  { name:"Homework Solver", href:"/tools/homework-solver", emoji:"📚" },
  { name:"Grammar Fix", href:"/tools/grammar-fix", emoji:"✅" },
  { name:"Flashcard Maker", href:"/tools/flashcard-maker", emoji:"🃏" },
  { name:"Merge PDF", href:"/tools/merge-pdf", emoji:"📄" },
  { name:"Paraphraser", href:"/tools/paraphraser", emoji:"🔄" },
];

export default function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-background px-6 py-24">
      <div className="w-full max-w-2xl text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <span className="font-heading select-none text-8xl font-extrabold text-primary md:text-9xl">
            404
          </span>
        </div>

        {/* Heading */}
        <h1 className="font-heading mb-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
          Page not found
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
            className="inline-flex items-center justify-center gap-2 rounded-xl h-12 px-7 bg-primary text-primary-foreground text-sm font-semibold shadow-sm shadow-primary/20 hover:bg-primary/90 hover:shadow-md hover:shadow-primary/25 transition-all duration-300"
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
            className="inline-flex items-center justify-center gap-2 rounded-xl h-12 px-8 bg-card border border-border text-foreground text-sm font-bold shadow-soft hover:bg-muted hover:-translate-y-0.5 transition-all duration-300"
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
        <div className="rounded-xl border border-border bg-muted p-8 text-left">
          <h2 className="font-heading mb-1 text-lg font-extrabold text-foreground">
            Popular tools you might like
          </h2>
          <p className="mb-6 text-sm text-muted-foreground">
            Try one of our most-used free tools:
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {popularTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-premium-sm"
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
          Need help?{""}
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
