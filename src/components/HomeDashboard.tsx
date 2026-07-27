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
import { TOOL_COUNT, TOOL_COUNT_LABEL, toolsData } from "@/data/tools";
import { ToolCard } from "@/components/shared";

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

export function HomeDashboard() {
  const aeoContent = getHomepageAEO();
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const allTools = Object.entries(toolsData).map(([slug, tool]) => ({
    slug,
    name: tool.name,
    description: tool.tagline || tool.description,
    category: tool.category,
    url: `/tools/${slug}`,
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
      {/* ─── Hero Section with Ambient Background Glow ─── */}
      <section className="relative overflow-hidden border-b border-border/50 bg-background pt-16 pb-16 md:pt-24 md:pb-24">
        {/* Decorative Ambient Radial Glow Orbs */}
        <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-tr from-[#8b5cf6]/20 via-[#d946ef]/15 to-transparent blur-[120px]" />
        <div className="pointer-events-none absolute top-48 right-10 -z-10 h-72 w-72 rounded-full bg-[#7c3aed]/10 blur-[100px]" />

        <div className="mx-auto max-w-[1240px] px-6 text-center">
          {/* Top Section Badge */}
          <div className="mb-6 flex justify-center">
            <span className="section-badge animate-float">
              <Sparkles className="h-4 w-4 text-[#7c3aed]" />
              {TOOL_COUNT_LABEL} Free AI Tools • No Registration Needed
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="hero-title font-heading mx-auto mb-6 max-w-4xl text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl md:leading-[1.1]">
            Work &amp; Study <span className="text-gradient">Smarter with AI</span> — All in One Hub
          </h1>

          <p className="hero-description mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-xl">
            Merge and compress PDFs, fix grammar, build flashcards, and draft essays in one place.{" "}
            <strong className="font-bold text-foreground">
              {TOOL_COUNT_LABEL} free tools
            </strong>
            — start without an account.
          </p>

          {/* Instant Tool Search Input */}
          <div className="relative mx-auto mb-10 max-w-2xl text-left">
            <div className="group relative flex items-center">
              <Search className="absolute left-5 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" aria-hidden />
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
                className="w-full rounded-2xl border border-[var(--border-color)] bg-card py-4 pl-14 pr-12 text-base font-medium text-foreground shadow-[0_8px_30px_rgba(148,163,184,0.12)] transition-all placeholder:text-muted-foreground/60 focus:border-primary/50 focus:outline-none focus:ring-4 focus:ring-primary/12"
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
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-muted-foreground">
                <span className="text-foreground/70">Popular:</span>
                {["Compress PDF", "Merge PDF", "Homework Solver", "Grammar Checker"].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => setSearchQuery(tag)}
                    className="rounded-lg border border-border/60 bg-card px-2.5 py-1 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
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
              <Button size="lg" className="btn-premium h-14 min-w-[200px] gap-2 px-8 text-base font-extrabold shadow-lg">
                <Grid2X2 className="h-5 w-5" />
                Browse All Tools
              </Button>
            </Link>
            <Link href="/tools/compress-pdf">
              <Button
                variant="outline"
                size="lg"
                className="h-14 min-w-[200px] gap-2 rounded-xl border-border/80 bg-card px-8 text-base font-bold shadow-sm transition-all hover:border-primary/40 hover:bg-muted"
              >
                Compress a PDF free
                <ArrowRight className="h-4 w-4 text-primary" />
              </Button>
            </Link>
          </div>

          {/* Key Metrics Bar */}
          <div className="mt-16 grid grid-cols-2 gap-4 border-t border-border/50 pt-10 sm:grid-cols-4 lg:gap-8">
            {[
              { num: TOOL_COUNT_LABEL, label: "Free tools" },
              { num: "Local", label: "PDF & image privacy" },
              { num: "0", label: "Sign-up to start" },
              { num: "Stream", label: "Live AI results" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-heading text-2xl font-extrabold text-foreground md:text-3xl">
                  <span className="text-gradient">{stat.num}</span>
                </div>
                <div className="mt-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Popular Tools Grid ─── */}
      <section id="tools" className="bg-muted/50 py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-extrabold text-primary border border-primary/20">
                <Flame className="h-3.5 w-3.5" />
                MOST POPULAR
              </div>
              <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
                Featured Tools &amp; Utilities
              </h2>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 text-sm font-extrabold text-primary transition-all hover:underline"
            >
              View all {TOOL_COUNT}+ tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredTools.map((tool) => (
              <ToolCard
                key={tool.href}
                href={tool.href}
                icon={tool.icon}
                title={tool.title}
                description={tool.desc}
                badge={tool.badge}
                gradient={tool.gradient}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Categories Overview Section ─── */}
      <section className="border-y border-border/50 bg-background py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Explore Tools by Category
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Everything you need for academic success, creative writing, and digital file management.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="surface-card group flex flex-col p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-primary transition-transform duration-300 group-hover:scale-110">
                  <cat.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading mb-1.5 text-lg font-bold text-foreground transition-colors group-hover:text-primary">
                  {cat.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{cat.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust & Security Banner ─── */}
      <section className="bg-muted/40 py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] px-6">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
              Built for Speed &amp; Total Privacy
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              ToolNova processes files directly in your web browser whenever possible.
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

      {/* ─── How ToolNova Stays Free ─── */}
      <section className="border-y border-border/50 bg-background py-16">
        <div className="mx-auto max-w-[960px] px-6">
          <div className="rounded-3xl border border-border/80 bg-muted/40 p-8 shadow-sm md:p-10">
            <h2 className="font-heading mb-3 text-2xl font-extrabold text-foreground">
              How ToolNova Stays Free for Everyone
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

      <section className="bg-background py-16">
        <div className="mx-auto max-w-[960px] px-6">
          <QuickAnswerBox
            question={aeoContent.quickAnswer.question}
            answer={aeoContent.quickAnswer.answer}
          />
        </div>
      </section>

      <section className="border-t border-border/50 bg-muted/30 py-16">
        <div className="mx-auto max-w-[960px] px-6">
          <h2 className="font-heading mb-10 text-center text-3xl font-extrabold text-foreground">
            Frequently Asked Questions
          </h2>
          <FAQAccordion faqs={aeoContent.faqs} />
        </div>
      </section>

      <BetweenSectionsAd />

      {/* ─── Ultra-Premium CTA Band ─── */}
      <section className="relative overflow-hidden bg-footer py-16 text-white md:py-24">
        {/* Glow accent */}
        <div className="pointer-events-none absolute -bottom-10 left-1/2 h-64 w-96 -translate-x-1/2 rounded-full bg-primary/30 blur-[100px]" />

        <div className="mx-auto max-w-[960px] px-6 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-white backdrop-blur-xl">
            <Sparkles className="h-7 w-7 text-[#7c3aed]" />
          </div>
          <h2 className="font-heading mb-4 text-3xl font-extrabold tracking-tight md:text-5xl">
            Unlock Unlimited AI Power with Pro
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            Enjoy unlimited daily generations, faster response speeds, and priority access to new features.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/pricing">
              <Button
                size="lg"
                className="btn-premium h-14 min-w-[180px] px-8 text-base font-extrabold shadow-xl"
              >
                Explore Pro Plan
              </Button>
            </Link>
            <Link href="/tools">
              <Button
                size="lg"
                variant="outline"
                className="h-14 min-w-[180px] rounded-xl border-white/20 bg-transparent px-8 text-base font-bold text-white transition-all hover:bg-white/10 hover:text-white"
              >
                Browse Free Tools
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <MultiplexAd />
    </div>
  );
}

