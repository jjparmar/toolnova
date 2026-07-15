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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickAnswerBox } from "@/components/aeo/QuickAnswerBox";
import { FAQAccordion } from "@/components/aeo/FAQAccordion";
import { getHomepageAEO } from "@/lib/global-aeo-content";
import { MultiplexAd, BetweenSectionsAd } from "@/components/ads/AdUnit";
import { TOOL_COUNT, TOOL_COUNT_LABEL } from "@/data/tools";

export function HomeDashboard() {
  const aeoContent = getHomepageAEO();

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-[560px] h-[560px] bg-primary/20 rounded-full -mr-40 -mt-40 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[420px] h-[420px] bg-cyan-500/15 rounded-full -ml-32 -mb-32 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-teal-400/10 rounded-full blur-3xl" />
          <div className="absolute inset-0 bg-pattern-dots opacity-30" />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-6 py-20 md:py-28">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-teal-100 text-sm font-medium mb-8 border border-white/10">
                <Sparkles className="h-4 w-4 text-teal-300" />
                Free to start · No sign-up required
              </div>
              <h1 className="font-heading hero-title speakable text-white text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
                Free AI Tools for{" "}
                <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 via-emerald-200 to-cyan-200">
                  Students &amp; Professionals
                </span>
              </h1>
              <p className="hero-description text-slate-300 text-lg md:text-xl max-w-xl leading-relaxed mb-10">
                A professional suite of{" "}
                <strong className="text-white font-semibold">
                  free AI writing, study, and productivity tools
                </strong>
                . Merge PDFs, generate flashcards, fix grammar, and write essays
                instantly. Free to start — no account needed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link href="/tools/homework-solver">
                  <Button className="h-14 px-8 rounded-xl bg-white text-slate-900 hover:bg-teal-50 font-bold text-base shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
                    Try a tool free
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/tools">
                  <Button
                    variant="outline"
                    className="h-14 px-8 rounded-xl bg-white/5 backdrop-blur-sm border-2 border-white/20 text-white hover:bg-white/10 hover:text-white font-semibold text-base transition-all hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <Grid2X2 className="h-5 w-5" />
                    Browse all tools
                  </Button>
                </Link>
              </div>
            </div>

            {/* Stats */}
            <div className="flex md:flex-col gap-4 md:gap-4 w-full md:w-auto justify-center">
              {[
                { value: String(TOOL_COUNT), label: "AI Tools" },
                { value: "$0", label: "Free to Start" },
                {
                  value: null as string | null,
                  label: "Private & Secure",
                  icon: true,
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="text-center md:text-right p-5 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors min-w-[120px]"
                >
                  <div className="text-white text-3xl md:text-4xl font-bold font-heading flex items-center justify-center md:justify-end gap-1">
                    {stat.icon ? (
                      <ShieldCheck className="h-8 w-8 text-teal-300" />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-teal-200/80 text-sm font-medium mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Soft edge into page */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Quick Answer */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <QuickAnswerBox
            question={aeoContent.quickAnswer.question}
            answer={aeoContent.quickAnswer.answer}
          />
        </div>
      </section>

      {/* Featured Tools */}
      <section id="tools" className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="text-center mb-14">
            <span className="inline-block text-primary font-bold tracking-wider uppercase text-xs mb-3 px-3.5 py-1.5 bg-primary/10 rounded-full border border-primary/15">
              Featured Tools
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              Most Popular Tools
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Jump straight into our most frequently used utilities — optimized
              for speed and ease of use.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                href: "/tools/merge-pdf",
                icon: Merge,
                title: "Merge PDF",
                desc: "Combine multiple PDF files into a single, organized document instantly.",
                badge: "Top Rated",
                gradient: "from-rose-500 to-red-600",
                badgeClass:
                  "text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40",
                glow: "from-rose-100/80 dark:from-rose-900/20",
              },
              {
                href: "/tools/resize-image",
                icon: ImageIcon,
                title: "Image Resizer",
                desc: "Change image dimensions by percentage or exact pixels without quality loss.",
                badge: "Trending",
                gradient: "from-violet-500 to-purple-600",
                badgeClass:
                  "text-violet-700 dark:text-violet-300 bg-violet-50 dark:bg-violet-950/40",
                glow: "from-violet-100/80 dark:from-violet-900/20",
              },
              {
                href: "/tools/flashcard-maker",
                icon: Library,
                title: "Flashcard Maker",
                desc: "Create digital study sets to memorize efficiently. Perfect for exam prep.",
                badge: "Student Pick",
                gradient: "from-teal-500 to-emerald-600",
                badgeClass:
                  "text-teal-700 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/40",
                glow: "from-teal-100/80 dark:from-teal-900/20",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group relative flex flex-col justify-between rounded-2xl bg-card p-8 shadow-sm border border-border hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1.5 transition-all duration-400"
              >
                <div
                  className={`absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl ${tool.glow} to-transparent rounded-bl-full rounded-tr-2xl`}
                />
                <div className="relative">
                  <div
                    className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.gradient} text-white shadow-lg group-hover:scale-110 group-hover:rotate-2 transition-all duration-400`}
                  >
                    <tool.icon className="h-7 w-7" />
                  </div>
                  <h3 className="font-heading text-foreground text-xl font-bold mb-2">
                    {tool.title}
                  </h3>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {tool.desc}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between pt-5 border-t border-border">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full ${tool.badgeClass}`}
                  >
                    {tool.badge}
                  </span>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/tools">
              <Button
                variant="outline"
                className="h-12 px-8 rounded-xl border-2 font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                View All Tools <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories hub */}
      <section className="py-14 bg-muted/40 border-y border-border">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-8">
            Explore by category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                href: "/tools/writing-tools",
                icon: FileText,
                title: "Writing",
                desc: "Grammar, essays, paraphrasing",
              },
              {
                href: "/tools/study-tools",
                icon: GraduationCap,
                title: "Study",
                desc: "Flashcards, quizzes, notes",
              },
              {
                href: "/tools/image-pdf-tools",
                icon: Layers,
                title: "PDF & Image",
                desc: "Merge, compress, convert",
              },
              {
                href: "/tools/career-tools",
                icon: Briefcase,
                title: "Career",
                desc: "Resume, LinkedIn, cover letters",
              },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="h-11 w-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <cat.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <span className="inline-block text-primary font-bold tracking-wider uppercase text-xs mb-4 px-3.5 py-1.5 bg-primary/10 rounded-full border border-primary/15">
                Why Choose Us
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground leading-tight">
                Built for productivity,
                <br /> designed for{" "}
                <span className="text-primary">you</span>.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
              Cutting-edge tech with a clean, fast interface — so your study and
              work flow never slows down.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Process documents and images in seconds. Optimized engines mean you never wait for a download.",
                color: "from-amber-500 to-orange-600",
              },
              {
                icon: ShieldCheck,
                title: "Privacy First",
                desc: "PDF and image tools process in your browser when possible. We do not sell your documents.",
                color: "from-teal-500 to-emerald-600",
              },
              {
                icon: Sparkles,
                title: "AI-Powered",
                desc: "Smarter summaries, better writing help, and clearer flashcards powered by modern AI.",
                color: "from-cyan-500 to-blue-600",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="group flex flex-col items-start p-8 rounded-2xl bg-card border border-border hover:border-primary/25 hover:shadow-lg transition-all duration-300"
              >
                <div
                  className={`h-12 w-12 rounded-xl bg-gradient-to-br ${f.color} text-white flex items-center justify-center mb-5 shadow-md group-hover:scale-110 transition-transform duration-300`}
                >
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / funding */}
      <section className="py-12 bg-muted/30 border-y border-border">
        <div className="container mx-auto px-6 max-w-[1000px]">
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3">
              How ToolNova stays free
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Hosting and AI infrastructure cost money. We keep tools free to
              start by offering optional{" "}
              <Link
                href="/pricing"
                className="text-primary hover:underline font-medium"
              >
                ToolNova Pro
              </Link>{" "}
              for unlimited AI, and by showing clearly labeled display ads when
              approved. Ads never control our editorial standards. Details:{" "}
              <Link
                href="/advertising"
                className="text-primary hover:underline font-medium"
              >
                Advertising disclosure
              </Link>
              .
            </p>
            <ul className="grid sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
              {[
                {
                  t: "No account wall",
                  d: "Start any tool without signing up",
                },
                {
                  t: "Browser privacy",
                  d: "PDF & image tools process locally when possible",
                },
                {
                  t: "Honest limits",
                  d: "Free daily AI allowance; Pro is optional",
                },
              ].map((item) => (
                <li
                  key={item.t}
                  className="rounded-xl bg-muted/50 border border-border px-4 py-3"
                >
                  <strong className="text-foreground block mb-1">
                    {item.t}
                  </strong>
                  {item.d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* About / E-E-A-T */}
      <section className="py-20 md:py-24 bg-background border-y border-border">
        <div className="container mx-auto px-6 max-w-[1000px]">
          <div className="mb-14">
            <span className="inline-block text-primary font-bold tracking-wider uppercase text-xs mb-4 px-3.5 py-1.5 bg-primary/10 rounded-full border border-primary/15">
              About ToolNova
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight mb-6">
              Empowering digital workflows for students and professionals
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
              <p>
                At ToolNova, our mission is simple: eliminate friction from your
                daily digital tasks. We built a unified, high-performance toolkit
                accessible from your browser — document management, image
                optimization, and AI-accelerated study workflows in one place.
              </p>
              <p>
                Whether you are a student organizing research PDFs, a marketer
                needing fast image compression, or an educator generating
                flashcards, our suite of {TOOL_COUNT_LABEL} specialized tools is
                engineered to save hours of administrative labor.
              </p>
              <p>
                We iterate based on global user feedback and modern web
                technology so every tool stays fast, accurate, and more capable
                than fragmented alternatives.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-12 border-t border-border">
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3 flex items-center gap-3">
                <ShieldCheck className="text-primary h-6 w-6 shrink-0" />
                Quality commitment
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Enterprise-minded reliability for every user. Heavily tested
                systems designed to execute your request correctly — without
                desktop software bloat.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3 flex items-center gap-3">
                <Check className="text-primary h-6 w-6 shrink-0" />
                Strict data privacy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Trust is foundational. Browser-side processing for PDF and image
                tools where possible; we do not sell your documents. See our{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>{" "}
                for details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <FAQAccordion
            faqs={aeoContent.faqs}
            title="Frequently Asked Questions"
          />
        </div>
      </section>

      <BetweenSectionsAd />

      {/* CTA */}
      <section className="py-20 md:py-24 relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-teal-950">
        <div className="absolute inset-0 bg-pattern-dots opacity-40" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/15 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full -ml-32 -mb-32 blur-3xl" />
        <div className="container mx-auto px-6 max-w-[1200px] text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to upgrade your{" "}
            <br className="hidden sm:block" />
            workflow?
          </h2>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Start using {TOOL_COUNT_LABEL} free tools to write better, study
            smarter, and get more done — no sign-up required. PDF/image tools
            run unlimited in your browser; AI tools include free daily use.
          </p>
          <Link href="/tools">
            <Button className="h-14 md:h-16 px-10 md:px-12 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base md:text-lg shadow-2xl shadow-primary/20 hover:scale-[1.03] transition-all">
              Get Started for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
      <MultiplexAd />
    </div>
  );
}
