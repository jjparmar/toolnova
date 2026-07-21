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
  Check,
  FileText,
  GraduationCap,
  Briefcase,
  Layers,
  BookOpen,
  Pencil,
  Lock,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickAnswerBox } from "@/components/aeo/QuickAnswerBox";
import { FAQAccordion } from "@/components/aeo/FAQAccordion";
import { getHomepageAEO } from "@/lib/global-aeo-content";
import { MultiplexAd, BetweenSectionsAd } from "@/components/ads/AdUnit";
import { TOOL_COUNT, TOOL_COUNT_LABEL, toolsData } from "@/data/tools";
import { ToolCard } from "@/components/shared";

/** iLovePDF-style multi-color tool tiles */
const featuredTools = [
  {
    href: "/tools/merge-pdf",
    icon: Merge,
    title: "Merge PDF",
    desc: "Combine PDFs in the order you want — private, in your browser.",
    badge: "Popular",
    gradient: "from-[#E5322D] to-[#c42824]",
  },
  {
    href: "/tools/split-pdf",
    icon: Layers,
    title: "Split PDF",
    desc: "Separate pages or extract a range into new PDF files.",
    gradient: "from-[#F4A100] to-[#e08e00]",
  },
  {
    href: "/tools/image-compressor",
    icon: ImageIcon,
    title: "Compress Image",
    desc: "Shrink image size while keeping quality high.",
    gradient: "from-[#1a9c4a] to-[#15803d]",
  },
  {
    href: "/tools/resize-image",
    icon: ImageIcon,
    title: "Resize Image",
    desc: "Resize by pixels or percent without quality loss.",
    gradient: "from-[#0ea5e9] to-[#0284c7]",
  },
  {
    href: "/tools/homework-solver",
    icon: BookOpen,
    title: "Homework Solver",
    desc: "Step-by-step solutions that teach, not just answer.",
    badge: "AI",
    gradient: "from-[#6366f1] to-[#4f46e5]",
  },
  {
    href: "/tools/grammar-fix",
    icon: Pencil,
    title: "Grammar Checker",
    desc: "Fix grammar, spelling, and clarity in seconds.",
    gradient: "from-[#ec4899] to-[#db2777]",
  },
  {
    href: "/tools/flashcard-maker",
    icon: Library,
    title: "Flashcard Maker",
    desc: "Create study cards from any topic for exam prep.",
    gradient: "from-[#14b8a6] to-[#0d9488]",
  },
  {
    href: "/tools/essay-writer",
    icon: FileText,
    title: "Essay Writer",
    desc: "Structure and draft essays with clear arguments.",
    gradient: "from-[#8b5cf6] to-[#7c3aed]",
  },
];

const categories = [
  { href: "/tools/writing-tools", icon: FileText, title: "Writing", desc: "Grammar, essays, paraphrase" },
  { href: "/tools/study-tools", icon: GraduationCap, title: "Study", desc: "Flashcards, quizzes, notes" },
  { href: "/tools/image-pdf-tools", icon: Layers, title: "PDF & Image", desc: "Merge, compress, convert" },
  { href: "/tools/career-tools", icon: Briefcase, title: "Career", desc: "Resume, LinkedIn, letters" },
];

const trustItems = [
  { icon: Lock, title: "Private by design", desc: "PDF & image tools run in your browser when possible." },
  { icon: Zap, title: "Fast results", desc: "Get useful output in seconds — no installs." },
  { icon: ShieldCheck, title: "Free to start", desc: "Open tools without an account. Honest limits." },
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
      {/* ─── Hero (iLovePDF-style: bold claim + short pitch) ─── */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-[1100px] px-6 pb-10 pt-14 text-center md:pb-14 md:pt-20">
          <h1 className="font-heading mx-auto mb-4 max-w-3xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-[2.75rem] md:leading-[1.15]">
            Every tool you need to work smarter — in one place
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Free AI tools for students and professionals. Merge PDFs, fix grammar,
            make flashcards, write essays — all at your fingertips.{" "}
            <strong className="font-semibold text-foreground">
              {TOOL_COUNT_LABEL} tools
            </strong>
            , easy to use.
          </p>

          {/* Instant Tool Search Bar */}
          <div className="relative mx-auto mb-8 max-w-xl text-left">
            <div className="relative flex items-center">
              <Search className="absolute left-4 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 47+ free tools (e.g. merge pdf, homework, paraphraser)..."
                className="w-full rounded-2xl border border-border bg-background py-3.5 pl-11 pr-10 text-sm font-medium text-foreground shadow-sm transition-all placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/10"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 rounded-full p-1 text-xs text-muted-foreground hover:bg-muted"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Dropdown Suggestions */}
            {filteredTools.length > 0 && (
              <div className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
                {filteredTools.map((t) => (
                  <Link
                    key={t.slug}
                    href={t.url}
                    onClick={() => setSearchQuery("")}
                    className="flex items-center justify-between px-4 py-3 text-sm transition-colors hover:bg-muted"
                  >
                    <div>
                      <span className="font-semibold text-foreground">{t.name}</span>
                      <p className="line-clamp-1 text-xs text-muted-foreground">{t.description}</p>
                    </div>
                    <span className="ml-3 shrink-0 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                      {t.category}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/tools">
              <Button size="lg" className="h-12 min-w-[180px] gap-2 px-8 font-bold">
                <Grid2X2 className="h-5 w-5" />
                Browse all tools
              </Button>
            </Link>
            <Link href="/tools/homework-solver">
              <Button
                variant="outline"
                size="lg"
                className="h-12 min-w-[180px] gap-2 px-8 font-bold"
              >
                Try AI free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Featured tools grid ─── */}
      <section id="tools" className="bg-muted py-12 md:py-16">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="mb-1 text-sm font-bold uppercase tracking-wide text-primary">
                Popular tools
              </p>
              <h2 className="font-heading text-2xl font-extrabold text-foreground md:text-3xl">
                Start with these
              </h2>
            </div>
            <Link
              href="/tools"
              className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
            >
              View all {TOOL_COUNT}+ tools
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* ─── Categories ─── */}
      <section className="border-y border-border bg-card py-12 md:py-16">
        <div className="mx-auto max-w-[1100px] px-6">
          <h2 className="font-heading mb-6 text-2xl font-extrabold text-foreground">
            Explore by category
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-premium-sm"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
                  <cat.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground group-hover:text-primary">
                    {cat.title}
                  </h3>
                  <p className="mt-0.5 text-sm text-muted-foreground">{cat.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Trust (like iLovePDF security strip) ─── */}
      <section className="bg-muted py-12 md:py-16">
        <div className="mx-auto max-w-[1100px] px-6">
          <div className="mb-8 text-center">
            <h2 className="font-heading text-2xl font-extrabold text-foreground md:text-3xl">
              The toolkit trusted by students &amp; pros
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-muted-foreground">
              ToolNova helps you edit files and use AI productively while keeping
              workflows simple and private.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {trustItems.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-border bg-card p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading mb-1 text-lg font-bold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why free ─── */}
      <section className="border-y border-border bg-card py-12">
        <div className="mx-auto max-w-[900px] px-6">
          <div className="rounded-2xl border border-border bg-muted/50 p-6 md:p-8">
            <h2 className="font-heading mb-2 text-xl font-extrabold text-foreground">
              How ToolNova stays free
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Optional{" "}
              <Link href="/pricing" className="font-semibold text-primary hover:underline">
                ToolNova Pro
              </Link>{" "}
              for unlimited AI, and clearly labeled ads when approved. See our{" "}
              <Link href="/advertising" className="font-semibold text-primary hover:underline">
                advertising disclosure
              </Link>
              .
            </p>
            <ul className="grid gap-3 sm:grid-cols-3">
              {[
                { t: "No account wall", d: "Open tools without signing up" },
                { t: "Browser privacy", d: "Local PDF/image processing when possible" },
                { t: "Honest limits", d: "Free daily AI; Pro is optional" },
              ].map((item) => (
                <li
                  key={item.t}
                  className="flex items-start gap-2 rounded-xl border border-border bg-card px-4 py-3"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <div>
                    <strong className="block text-sm text-foreground">{item.t}</strong>
                    <span className="text-xs text-muted-foreground">{item.d}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-card py-12">
        <div className="mx-auto max-w-[900px] px-6">
          <QuickAnswerBox
            question={aeoContent.quickAnswer.question}
            answer={aeoContent.quickAnswer.answer}
          />
        </div>
      </section>

      <section className="border-t border-border bg-muted py-14">
        <div className="mx-auto max-w-[900px] px-6">
          <h2 className="font-heading mb-8 text-center text-2xl font-extrabold text-foreground">
            Frequently asked questions
          </h2>
          <FAQAccordion faqs={aeoContent.faqs} />
        </div>
      </section>

      <BetweenSectionsAd />

      {/* ─── Premium CTA band (iLovePDF red band energy) ─── */}
      <section className="bg-primary py-14 text-primary-foreground md:py-16">
        <div className="mx-auto max-w-[900px] px-6 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="font-heading mb-3 text-2xl font-extrabold md:text-3xl">
            Get more with ToolNova Pro
          </h2>
          <p className="mx-auto mb-7 max-w-lg text-base text-primary-foreground/90">
            Unlimited AI generations, higher quality models, and an ad-free
            experience — or keep using free tools forever.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/pricing">
              <Button
                size="lg"
                className="h-12 min-w-[160px] bg-white font-bold text-primary hover:bg-white/95"
              >
                See Premium
              </Button>
            </Link>
            <Link href="/tools">
              <Button
                size="lg"
                variant="outline"
                className="h-12 min-w-[160px] border-white/40 bg-transparent font-bold text-white hover:bg-white/10 hover:text-white"
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
