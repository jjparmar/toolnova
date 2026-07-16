"use client";

import Link from "next/link";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickAnswerBox } from "@/components/aeo/QuickAnswerBox";
import { FAQAccordion } from "@/components/aeo/FAQAccordion";
import { getHomepageAEO } from "@/lib/global-aeo-content";
import { MultiplexAd, BetweenSectionsAd } from "@/components/ads/AdUnit";
import { TOOL_COUNT, TOOL_COUNT_LABEL } from "@/data/tools";
import {
  SectionHeading,
  ToolCard,
  CategoryCard,
  CTASection,
  PremiumCard,
  StatTile,
} from "@/components/shared";

const featuredTools = [
  {
    href: "/tools/merge-pdf",
    icon: Merge,
    title: "Merge PDF",
    desc: "Combine PDFs in order and download one file — private, in-browser.",
    badge: "Top pick",
    badgeTone: "primary" as const,
    gradient: "from-rose-500 to-orange-500",
    glowColor: "shadow-rose-500/20",
  },
  {
    href: "/tools/resize-image",
    icon: ImageIcon,
    title: "Image Resizer",
    desc: "Resize by pixels or percent without quality loss.",
    badge: "Popular",
    badgeTone: "muted" as const,
    gradient: "from-violet-500 to-purple-600",
    glowColor: "shadow-violet-500/20",
  },
  {
    href: "/tools/flashcard-maker",
    icon: Library,
    title: "Flashcard Maker",
    desc: "Create study cards from any topic for exam prep.",
    badge: "Students",
    badgeTone: "muted" as const,
    gradient: "from-teal-500 to-cyan-500",
    glowColor: "shadow-teal-500/20",
  },
];

const categories = [
  { href: "/tools/writing-tools", icon: FileText, title: "Writing", desc: "Grammar, essays, paraphrase" },
  { href: "/tools/study-tools", icon: GraduationCap, title: "Study", desc: "Flashcards, quizzes, notes" },
  { href: "/tools/image-pdf-tools", icon: Layers, title: "PDF & Image", desc: "Merge, compress, convert" },
  { href: "/tools/career-tools", icon: Briefcase, title: "Career", desc: "Resume, LinkedIn, letters" },
];

const previewTools = [
  { icon: BookOpen, name: "Homework Solver", color: "text-blue-600 bg-blue-50 dark:bg-blue-950/40" },
  { icon: Pencil, name: "Grammar Checker", color: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40" },
  { icon: Merge, name: "Merge PDF", color: "text-red-600 bg-red-50 dark:bg-red-950/40" },
  { icon: Sparkles, name: "Essay Writer", color: "text-primary bg-primary/10" },
];

const whyUsFeatures = [
  { icon: Zap, title: "Fast", desc: "Optimized tools so you get results in seconds, not minutes." },
  { icon: ShieldCheck, title: "Private", desc: "PDF and image tools process in your browser when possible." },
  { icon: Sparkles, title: "Useful AI", desc: "Clear outputs designed for study, writing, and career work." },
];

export function HomeDashboard() {
  const aeoContent = getHomepageAEO();

  return (
    <div className="w-full">
      {/* Hero — premium split layout with colorful mesh */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-mesh">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.12] bg-pattern-dots"
        />
        <div className="relative mx-auto max-w-[1120px] px-6 py-14 md:py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-sm font-semibold text-primary shadow-glow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-50" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                Free to start · No sign-up required
              </div>

              <h1 className="font-heading speakable text-4xl font-semibold leading-[1.12] tracking-tight text-foreground sm:text-5xl md:text-[3.15rem] mb-5">
                Free AI tools for{" "}
                <span className="text-brand-gradient">students &amp; professionals</span>
              </h1>

              <p className="hero-description mx-auto mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl lg:mx-0">
                Write better, study smarter, and get more done with{" "}
                <strong className="font-semibold text-foreground">
                  {TOOL_COUNT_LABEL} tools
                </strong>
                . Merge PDFs, make flashcards, fix grammar, write essays — all in
                your browser.
              </p>

              <div className="mb-10 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                <Link href="/tools/homework-solver">
                  <Button size="lg" className="h-12 w-full gap-2 px-7 text-base sm:w-auto">
                    Try a tool free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/tools">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 w-full gap-2 px-7 text-base sm:w-auto"
                  >
                    <Grid2X2 className="h-4 w-4" />
                    Browse all tools
                  </Button>
                </Link>
              </div>

              <div className="mx-auto grid max-w-md grid-cols-3 gap-3 lg:mx-0">
                <StatTile value={String(TOOL_COUNT)} label="Tools" />
                <StatTile value="$0" label="To start" />
                <StatTile value="Private" label="Browser PDFs" />
              </div>
            </div>

            {/* Product preview card with colorful glows */}
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <div className="absolute -inset-10 rounded-full bg-gradient-to-tr from-primary/30 via-chart-2/20 to-chart-3/15 blur-3xl opacity-80 animate-pulse-slow" />
              <div className="surface-card-quiet relative overflow-hidden rounded-2xl shadow-premium-lg border border-border/80 backdrop-blur-sm">
                <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-3">
                  <div className="flex gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
                  </div>
                  <span className="ml-2 text-xs font-medium text-muted-foreground">
                    toolnovahub.com/tools
                  </span>
                </div>
                <div className="space-y-3 p-5">
                  <div className="mb-1 flex items-center justify-between">
                    <p className="font-heading text-sm font-semibold text-foreground">
                      Quick open
                    </p>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      Free
                    </span>
                  </div>
                  {previewTools.map((tool) => (
                    <div
                      key={tool.name}
                      className="flex items-center gap-3 rounded-xl border border-border bg-background px-3.5 py-3 transition-colors hover:border-primary/25"
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${tool.color}`}
                      >
                        <tool.icon className="h-5 w-5" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-foreground">
                          {tool.name}
                        </p>
                        <p className="text-xs text-muted-foreground">Ready in seconds</p>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                    </div>
                  ))}
                  <Link
                    href="/tools"
                    className="mt-1 flex items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:opacity-95"
                  >
                    Open tools library
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-4 text-sm text-muted-foreground">
          {[
            "No account wall",
            "Browser-side PDF privacy",
            "Clear free AI limits",
            "Built for real study & work",
          ].map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* Quick Answer Box */}
      <section className="bg-background py-12">
        <div className="container mx-auto max-w-[1120px] px-6">
          <QuickAnswerBox
            question={aeoContent.quickAnswer.question}
            answer={aeoContent.quickAnswer.answer}
          />
        </div>
      </section>

      {/* Featured tools */}
      <section id="tools" className="bg-background py-16 md:py-20">
        <div className="container mx-auto max-w-[1120px] px-6">
          <SectionHeading
            eyebrow="Popular"
            title="Start with these tools"
            subtitle="Fast, focused utilities people use every day."
          />

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {featuredTools.map((tool) => (
              <ToolCard
                key={tool.href}
                variant="featured"
                href={tool.href}
                icon={tool.icon}
                title={tool.title}
                description={tool.desc}
                badge={tool.badge}
                badgeTone={tool.badgeTone}
                gradient={tool.gradient}
                glowColor={tool.glowColor}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/tools">
              <Button variant="outline" className="gap-2 font-semibold">
                View all tools <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-band py-14">
        <div className="container mx-auto max-w-[1120px] px-6">
          <h2 className="font-heading mb-6 text-2xl font-semibold tracking-tight text-foreground">
            Explore by category
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <CategoryCard
                key={cat.href}
                href={cat.href}
                icon={cat.icon}
                title={cat.title}
                description={cat.desc}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why ToolNova */}
      <section className="bg-background py-16 md:py-20">
        <div className="container mx-auto max-w-[1120px] px-6">
          <SectionHeading
            eyebrow="Why ToolNova"
            title="Built for real work — free to start"
            align="left"
          />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {whyUsFeatures.map((f) => (
              <PremiumCard key={f.title}>
                <div className="icon-tile mb-4">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-heading mb-2 text-lg font-semibold text-foreground">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {f.desc}
                </p>
              </PremiumCard>
            ))}
          </div>
        </div>
      </section>

      {/* Trust — How ToolNova stays free */}
      <section className="section-band py-12">
        <div className="container mx-auto max-w-[900px] px-6">
          <PremiumCard interactive={false} className="p-6 md:p-8">
            <h2 className="font-heading mb-2 text-xl font-semibold text-foreground">
              How ToolNova stays free
            </h2>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Optional{" "}
              <Link href="/pricing" className="font-medium text-primary hover:underline">
                ToolNova Pro
              </Link>{" "}
              for unlimited AI, and clearly labeled ads when approved. See our{" "}
              <Link href="/advertising" className="font-medium text-primary hover:underline">
                advertising disclosure
              </Link>
              .
            </p>
            <ul className="grid gap-3 text-sm sm:grid-cols-3">
              {[
                { t: "No account wall", d: "Open tools without signing up" },
                { t: "Browser privacy", d: "Local PDF/image processing when possible" },
                { t: "Honest limits", d: "Free daily AI; Pro is optional" },
              ].map((item) => (
                <li
                  key={item.t}
                  className="rounded-xl border border-border bg-muted/50 px-4 py-3"
                >
                  <strong className="mb-0.5 block text-sm text-foreground">
                    {item.t}
                  </strong>
                  <span className="text-xs text-muted-foreground">{item.d}</span>
                </li>
              ))}
            </ul>
          </PremiumCard>
        </div>
      </section>

      {/* About */}
      <section className="bg-background py-16 md:py-20">
        <div className="container mx-auto max-w-[900px] px-6">
          <p className="mb-2 text-sm font-semibold text-primary">About</p>
          <h2 className="font-heading mb-5 text-3xl font-semibold tracking-tight text-foreground">
            One place for study, writing, and files
          </h2>
          <div className="space-y-4 leading-relaxed text-muted-foreground">
            <p>
              ToolNova is a browser toolkit for students and professionals —
              documents, images, study systems, and AI writing helpers without
              desktop software.
            </p>
            <p>
              Our suite of {TOOL_COUNT_LABEL} tools is built to save time on
              everyday tasks like merging PDFs, compressing images, and preparing
              for exams.
            </p>
          </div>
          <div className="mt-10 grid gap-6 border-t border-border pt-8 sm:grid-cols-2">
            <div>
              <h3 className="font-heading mb-2 flex items-center gap-2 font-semibold text-foreground">
                <ShieldCheck className="h-5 w-5 text-primary" />
                Quality
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Clear outputs and practical controls, improved from real user
                feedback.
              </p>
            </div>
            <div>
              <h3 className="font-heading mb-2 flex items-center gap-2 font-semibold text-foreground">
                <Check className="h-5 w-5 text-primary" />
                Privacy
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Browser-side PDF/image processing when possible. Read our{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-band py-14">
        <div className="container mx-auto max-w-[1120px] px-6">
          <FAQAccordion faqs={aeoContent.faqs} title="Frequently asked questions" />
        </div>
      </section>

      <BetweenSectionsAd />

      {/* CTA — premium gradient band */}
      <CTASection
        title="Ready to get more done?"
        description={`Start with ${TOOL_COUNT_LABEL} free tools. No sign-up required.`}
        href="/tools"
        buttonText="Browse all tools"
        icon={Sparkles}
      />
      <MultiplexAd />
    </div>
  );
}
