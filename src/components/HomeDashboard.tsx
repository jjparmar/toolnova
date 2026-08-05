"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Merge,
  Image as ImageIcon,
  Library,
  Zap,
  ShieldCheck,
  Sparkles,
  Grid2X2,
  FileText,
  GraduationCap,
  Briefcase,
  Layers,
  BookOpen,
  Pencil,
  Lock,
  Search,
  CheckCircle2,
  Flame,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickAnswerBox } from "@/components/aeo/QuickAnswerBox";
import { FAQAccordion } from "@/components/aeo/FAQAccordion";
import { getHomepageAEO } from "@/lib/global-aeo-content";
import { MultiplexAd, BetweenSectionsAd } from "@/components/ads/AdUnit";
import { TOOL_COUNT, TOOL_COUNT_LABEL, toolSearchIndex } from "@/data/tool-search-index";
import { ToolCard } from "@/components/shared";
import type { BlogPost } from "@/data/blog/types";

/** Multi-color gradient tool tiles */
const featuredTools = [
  {
    href: "/tools/merge-pdf",
    icon: Merge,
    title: "Merge PDF",
    desc: "Combine PDFs in your browser — zero file upload needed.",
    badge: "Popular",
    gradient: "from-[#7c3aed] to-[#d946ef]",
  },
  {
    href: "/tools/compress-pdf",
    icon: FileText,
    title: "Compress PDF",
    desc: "Shrink PDFs for email and upload portals. Private browser tool.",
    badge: "New",
    gradient: "from-[#F43F5E] to-[#7c3aed]",
  },
  {
    href: "/tools/image-compressor",
    icon: ImageIcon,
    title: "Compress Image",
    desc: "Batch-compress images for web speed without leaving your device.",
    gradient: "from-[#10B981] to-[#059669]",
  },
  {
    href: "/tools/homework-solver",
    icon: BookOpen,
    title: "Homework Solver",
    desc: "Step-by-step explanations so you learn the method, not just answers.",
    badge: "AI Powered",
    gradient: "from-[#6366F1] to-[#4F46E5]",
  },
  {
    href: "/tools/grammar-fix",
    icon: Pencil,
    title: "Grammar Checker",
    desc: "Fix grammar, spelling, and clarity while keeping your voice.",
    gradient: "from-[#EC4899] to-[#DB2777]",
  },
  {
    href: "/tools/flashcard-maker",
    icon: Library,
    title: "Flashcard Maker",
    desc: "Turn notes into study cards for faster exam revision.",
    gradient: "from-[#14B8A6] to-[#0D9488]",
  },
  {
    href: "/tools/essay-writer",
    icon: FileText,
    title: "Essay Writer",
    desc: "Draft structured essays with clear intros, body, and conclusions.",
    gradient: "from-[#8B5CF6] to-[#7C3AED]",
  },
  {
    href: "/tools/split-pdf",
    icon: Layers,
    title: "Split PDF",
    desc: "Extract page ranges or break large PDFs into smaller files.",
    gradient: "from-[#F59E0B] to-[#D97706]",
  },
];

const categories = [
  { href: "/tools/writing-tools", icon: FileText, title: "Writing & Editing", desc: "Grammar check, essay drafting, paraphrasing" },
  { href: "/tools/study-tools", icon: GraduationCap, title: "Study & Exam Prep", desc: "AI flashcard generator, homework helper, summary" },
  { href: "/tools/image-pdf-tools", icon: Layers, title: "PDF & Media Tools", desc: "Merge, compress, split & image resize" },
  { href: "/tools/career-tools", icon: Briefcase, title: "Career & Business", desc: "Resume bullet generator, cover letter writer" },
];

const trustItems = [
  { icon: Lock, title: "Private where it matters", desc: "PDF & image tools process files in your browser—nothing uploaded for those tools." },
  { icon: Zap, title: "Fast by design", desc: "Local tools run instantly; AI tools stream results as they generate." },
  { icon: ShieldCheck, title: "Start free, no account", desc: "Use tools immediately. Free daily AI included; Pro unlocks unlimited AI." },
];

export function HomeDashboard({ recentPosts = [] }: { recentPosts?: BlogPost[] }) {
  const aeoContent = getHomepageAEO();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const allTools = toolSearchIndex.map((tool) => ({
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    category: tool.category,
    url: `/tools/${tool.slug}`,
  }));

  const filteredTools = searchQuery.trim()
    ? allTools.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.category.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 6)
    : [];

  return (
    <div className="w-full">
      {/* ─── Hero ─── */}
      <section className="mesh-hero border-b border-[var(--border-color)] pt-14 pb-16 md:pt-20 md:pb-24">
        <div className="page-container text-center">
          <div className="mb-6 flex justify-center">
            <span className="section-badge">
              <Sparkles className="h-3.5 w-3.5" />
              {TOOL_COUNT_LABEL} free AI tools · no signup
            </span>
          </div>

          <h1 className="hero-title font-heading mx-auto mb-5 max-w-4xl 3xl:max-w-6xl text-[2.15rem] font-bold tracking-tight text-foreground sm:text-5xl md:text-[3.4rem] 2xl:text-[4.5rem] 3xl:text-[5.5rem] md:leading-[1.08]">
            Work &amp; study <span className="text-gradient">smarter with AI</span>
            <span className="mt-1 block text-foreground/85">— all in one modern hub</span>
          </h1>

          <p className="hero-description mx-auto mb-9 max-w-2xl 3xl:max-w-4xl text-base leading-relaxed text-muted-foreground md:text-lg 2xl:text-xl 3xl:text-2xl">
            Merge and compress PDFs, fix grammar, build flashcards, and draft essays in one place.{" "}
            <strong className="font-semibold text-foreground">
              {TOOL_COUNT_LABEL} free tools
            </strong>
            — start without an account.
          </p>

          {/* Instant Tool Search Input */}
          <div className="relative mx-auto mb-9 max-w-2xl 3xl:max-w-4xl text-left">
            <div className="group relative flex items-center">
              <div className="absolute -inset-1 rounded-[1.5rem] bg-gradient-to-r from-primary/40 via-fuchsia-500/40 to-primary/40 opacity-0 blur-lg transition-opacity duration-500 group-focus-within:opacity-100" aria-hidden="true" />
              <Search className="absolute left-5 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary z-10" aria-hidden />
              <label htmlFor="home-tool-search" className="sr-only">
                Search tools
              </label>
              <input
                id="home-tool-search"
                type="search"
                autoComplete="off"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${TOOL_COUNT_LABEL} tools (e.g. compress pdf, homework solver)…`}
                className="input-surface relative z-10 w-full rounded-[1.15rem] border py-4 3xl:py-6 pl-14 3xl:pl-16 pr-12 text-base 3xl:text-xl font-medium text-foreground shadow-[var(--shadow-premium-lg)] placeholder:text-muted-foreground/55 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 rounded-full bg-muted p-1.5 text-xs text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Search Tag Hints */}
            {!searchQuery && (
              <div className="mt-3.5 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-muted-foreground">
                <span className="text-foreground/65">Popular:</span>
                {["Compress PDF", "Merge PDF", "Homework Solver", "Grammar Checker"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="rounded-full border border-[var(--border-color)] bg-card/90 px-3 py-1.5 text-muted-foreground shadow-sm transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            )}

            {/* Dropdown Suggestions */}
            {filteredTools.length > 0 && (
              <div
                role="listbox"
                aria-label="Search results"
                className="absolute left-0 right-0 top-full z-30 mt-3 overflow-hidden rounded-2xl border border-[var(--border-color)] bg-card shadow-[0_16px_40px_rgba(15,23,42,0.12)] backdrop-blur-xl"
              >
                {filteredTools.map((t) => (
                  <Link
                    key={t.slug}
                    href={t.url}
                    role="option"
                    onClick={() => setSearchQuery("")}
                    className="flex items-center justify-between px-5 py-3.5 text-sm transition-colors hover:bg-muted/80"
                  >
                    <div className="min-w-0">
                      <span className="font-bold text-foreground">{t.name}</span>
                      <p className="line-clamp-1 text-xs text-muted-foreground">{t.description}</p>
                    </div>
                    <span className="ml-3 shrink-0 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-extrabold text-primary border border-primary/20">
                      {t.category}
                    </span>
                  </Link>
                ))}
              </div>
            )}
            {searchQuery.trim() && filteredTools.length === 0 && (
              <div className="absolute left-0 right-0 top-full z-30 mt-3 rounded-2xl border border-[var(--border-color)] bg-card px-5 py-4 text-sm text-muted-foreground shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
                No tools matched “{searchQuery}”. Try “pdf”, “grammar”, or{" "}
                <Link href="/tools" className="font-semibold text-primary underline underline-offset-2">
                  browse all tools
                </Link>
                .
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/tools">
              <Button size="lg" className="btn-premium h-13 3xl:h-16 3xl:text-xl min-w-[200px] 3xl:min-w-[260px] gap-2 px-8 3xl:px-10 text-base font-bold">
                <Grid2X2 className="h-5 w-5 3xl:h-6 3xl:w-6" />
                Browse all tools
              </Button>
            </Link>
            <Link href="/tools/compress-pdf">
              <Button
                variant="outline"
                size="lg"
                className="h-13 3xl:h-16 3xl:text-xl min-w-[200px] 3xl:min-w-[260px] gap-2 rounded-full border-[var(--border-color)] bg-card/90 px-8 3xl:px-10 text-base font-semibold shadow-sm"
              >
                Compress a PDF free
                <ArrowRight className="h-4 w-4 3xl:h-5 3xl:w-5 text-primary" />
              </Button>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {[
              { num: TOOL_COUNT_LABEL, label: "Free tools" },
              { num: "Local", label: "PDF & image privacy" },
              { num: "0", label: "Sign-up to start" },
              { num: "Stream", label: "Live AI results" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="surface-card-quiet px-3 py-4 text-center sm:px-4"
              >
                <div className="font-heading text-xl font-bold text-foreground md:text-2xl">
                  <span className="text-gradient">{stat.num}</span>
                </div>
                <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Popular Tools Grid ─── */}
      <section id="tools" className="section-pad bg-muted/35">
        <div className="page-container">
          <div className="section-header flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="section-kicker mb-3">
                <Flame className="h-3.5 w-3.5" />
                Most popular
              </div>
              <h2 className="section-title">Featured tools</h2>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:underline"
            >
              View all {TOOL_COUNT}+ tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {featuredTools.map((tool, idx) => (
              <div 
                key={tool.href} 
                className={(idx === 0 || idx === 1 || idx === 6 || idx === 7) ? "sm:col-span-2" : "col-span-1"}
              >
                <ToolCard
                  href={tool.href}
                  icon={tool.icon}
                  title={tool.title}
                  description={tool.desc}
                  badge={tool.badge}
                  gradient={tool.gradient}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Categories ─── */}
      <section className="section-pad border-y border-[var(--border-color)]">
        <div className="page-container">
          <div className="section-header mx-auto max-w-2xl text-center">
            <div className="section-kicker mb-3 justify-center">Browse by goal</div>
            <h2 className="section-title">Explore tools by category</h2>
            <p className="section-lead mx-auto">
              Everything you need for study, writing, files, and career workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {categories.map((cat) => (
              <div key={cat.href} className="group relative h-full">
                <div className="absolute -inset-0.5 -z-10 rounded-[1.45rem] bg-gradient-to-r from-primary/40 via-fuchsia-500/40 to-primary/40 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-30 dark:group-hover:opacity-20" />
                <Link
                  href={cat.href}
                  className="surface-card surface-card-interactive relative flex h-full flex-col p-6 overflow-hidden"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary ring-1 ring-primary/10 transition-transform duration-300 group-hover:scale-105 shadow-sm">
                    <cat.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading mb-1.5 text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {cat.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{cat.desc}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Latest Blog Posts ─── */}
      {recentPosts && recentPosts.length > 0 && (
        <section className="section-pad bg-background">
          <div className="page-container">
            <div className="section-header flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="section-kicker mb-3">Productivity guides</div>
                <h2 className="section-title">Latest from the blog</h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-all hover:underline"
              >
                Read all articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              {recentPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[var(--border-color)] bg-card transition-all hover:shadow-[var(--shadow-premium)]"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-muted">
                    <img 
                      src={post.coverImage} 
                      alt={post.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="mb-3 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-primary">
                      {post.category}
                    </div>
                    <h3 className="mb-2 line-clamp-2 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 flex-1 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs font-semibold text-muted-foreground">
                      <span>{post.readTime}</span>
                      <span className="flex items-center gap-1 transition-colors group-hover:text-primary">
                        Read more <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── Trust ─── */}
      <section className="section-pad bg-muted/35">
        <div className="page-container">
          <div className="mb-12 text-center">
            <div className="section-kicker mb-3 justify-center">Why ToolNova</div>
            <h2 className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Built for speed &amp; privacy
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Files stay in your browser whenever possible. AI streams as it writes.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {trustItems.map((item) => (
              <div
                key={item.title}
                className="surface-card flex flex-col items-center p-8 text-center"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8b5cf6]/15 to-[#d946ef]/10 text-primary border border-primary/20">
                  <item.icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading mb-2 text-xl font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Free model ─── */}
      <section className="section-pad border-y border-[var(--border-color)]">
        <div className="page-container max-w-4xl">
          <div className="content-panel p-8 md:p-10">
            <h2 className="font-heading mb-3 text-2xl font-bold text-foreground">
              How ToolNova stays free
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground md:text-base">
              We believe quality productivity software should be accessible to all students and researchers. We offer optional{" "}
              <Link href="/pricing" className="font-bold text-primary hover:underline">
                ToolNova Pro
              </Link>{" "}
              for unlimited heavy AI queries, alongside non-intrusive ad sponsorships.
            </p>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { t: "No Account Barriers", d: "Open & run tools instantly" },
                { t: "Client-Side Privacy", d: "Local PDF/image file operations" },
                { t: "Transparent Limits", d: "Free daily AI usage for all users" },
              ].map((item) => (
                <div
                  key={item.t}
                  className="surface-card-quiet flex items-start gap-3 p-4"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <strong className="block text-sm font-bold text-foreground">{item.t}</strong>
                    <span className="text-xs text-muted-foreground">{item.d}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="page-container max-w-4xl">
          <QuickAnswerBox
            question={aeoContent.quickAnswer.question}
            answer={aeoContent.quickAnswer.answer}
          />
        </div>
      </section>

      <section className="section-pad border-t border-[var(--border-color)] bg-muted/30">
        <div className="page-container max-w-4xl">
          <h2 className="font-heading mb-10 text-center text-3xl font-bold text-foreground">
            Frequently asked questions
          </h2>
          <FAQAccordion faqs={aeoContent.faqs} />
        </div>
      </section>

      <BetweenSectionsAd />

      <section className="relative overflow-hidden bg-footer py-16 text-white md:py-24">
        <div className="pointer-events-none absolute -bottom-10 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-primary/30 blur-[100px]" />
        <div className="pointer-events-none absolute top-0 right-0 h-48 w-48 rounded-full bg-fuchsia-500/20 blur-[80px]" />

        <div className="page-container max-w-3xl text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white backdrop-blur-xl">
            <Sparkles className="h-7 w-7 text-[#c4b5fd]" />
          </div>
          <h2 className="font-heading mb-4 text-3xl font-bold tracking-tight md:text-5xl">
            Unlock unlimited AI with Pro
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
            Unlimited daily generations, faster responses, and priority access to new tools.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link href="/pricing">
              <Button size="lg" className="btn-premium h-13 min-w-[180px] px-8 text-base font-bold">
                Explore Pro
              </Button>
            </Link>
            <Link href="/tools">
              <Button
                size="lg"
                variant="outline"
                className="h-13 min-w-[180px] rounded-full border-white/20 bg-transparent px-8 text-base font-semibold text-white hover:bg-white/10 hover:text-white"
              >
                Browse free tools
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <MultiplexAd />
    </div>
  );
}

