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
      {/* Cinematic hero */}
      <section className="relative overflow-hidden bg-hero-premium">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-[640px] h-[640px] rounded-full bg-[radial-gradient(circle,hsl(255_90%_65%_/_0.35),transparent_60%)] blur-2xl" />
          <div className="absolute -bottom-32 -left-20 w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,hsl(195_95%_55%_/_0.28),transparent_60%)] blur-2xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-[radial-gradient(circle,hsl(280_80%_55%_/_0.18),transparent_65%)] blur-3xl" />
          <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(to_right,rgba_1px,transparent_1px),linear-gradient(to_bottom,rgba_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_75%)]" />
        </div>

        <div className="relative mx-auto max-w-[1200px] px-6 py-24 md:py-32">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-14">
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 backdrop-blur-md text-violet-100 text-sm font-semibold mb-8 border border-white/15 shadow-[0_0_40px_-10px_rgba(124,92,255,0.5)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
                </span>
                Free to start · No sign-up required
              </div>

              <h1 className="font-heading hero-title speakable text-white text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold leading-[1.05] tracking-tight mb-6">
                The premium AI toolkit for{" "}
                <span className="text-brand-gradient">
                  students &amp; pros
                </span>
              </h1>

              <p className="hero-description text-slate-300/95 text-lg md:text-xl max-w-xl leading-relaxed mb-10 mx-auto lg:mx-0">
                Write, study, and ship work faster with{" "}
                <strong className="text-white font-semibold">
                  {TOOL_COUNT_LABEL} polished tools
                </strong>
                — PDFs, flashcards, grammar, essays, and more. Instant results.
                Browser privacy where it matters.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/tools/homework-solver">
                  <button
                    type="button"
                    className="btn-premium h-14 px-8 rounded-2xl font-bold text-base flex items-center justify-center gap-2 group w-full sm:w-auto"
                  >
                    Try a tool free
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/tools">
                  <Button
                    variant="outline"
                    className="h-14 px-8 rounded-2xl bg-white/5 backdrop-blur-md border-2 border-white/20 text-white hover:bg-white/10 hover:text-white font-semibold text-base w-full sm:w-auto"
                  >
                    <Grid2X2 className="h-5 w-5" />
                    Browse all tools
                  </Button>
                </Link>
              </div>
            </div>

            {/* Floating stat stack */}
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 w-full max-w-md lg:max-w-[220px]">
              {[
                { value: String(TOOL_COUNT), label: "AI Tools", sub: "All free to open" },
                { value: "$0", label: "To start", sub: "No card needed" },
                { value: "100%", label: "Private PDFs", sub: "In-browser when possible" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="relative p-5 rounded-2xl bg-white/[0.06] backdrop-blur-xl border border-white/12 hover:bg-white/[0.1] transition-all hover:-translate-y-0.5"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <div className="font-heading text-white text-3xl md:text-4xl font-extrabold tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-violet-200 font-semibold text-sm mt-1">
                    {stat.label}
                  </div>
                  <div className="text-slate-400 text-xs mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent" />
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <QuickAnswerBox
            question={aeoContent.quickAnswer.question}
            answer={aeoContent.quickAnswer.answer}
          />
        </div>
      </section>

      {/* Featured tools — bento premium cards */}
      <section id="tools" className="py-20 md:py-28 bg-background relative surface-mesh">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <div className="text-center mb-14">
            <span className="inline-flex items-center gap-2 text-primary font-bold tracking-wider uppercase text-xs mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="h-3.5 w-3.5" />
              Featured
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
              Tools people open first
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto text-lg">
              Fast, polished workflows — not cluttered dashboards.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
            {[
              {
                href: "/tools/merge-pdf",
                icon: Merge,
                title: "Merge PDF",
                desc: "Combine PDFs in order, download one clean file — fully in your browser.",
                badge: "Top rated",
                gradient: "from-rose-500 via-red-500 to-orange-500",
              },
              {
                href: "/tools/resize-image",
                icon: ImageIcon,
                title: "Image Resizer",
                desc: "Exact pixels or percent. High-quality scaling without the desktop app.",
                badge: "Trending",
                gradient: "from-violet-500 via-primary to-cyan-500",
              },
              {
                href: "/tools/flashcard-maker",
                icon: Library,
                title: "Flashcard Maker",
                desc: "Exam-ready cards from any topic — structured for real study sessions.",
                badge: "Student pick",
                gradient: "from-emerald-500 via-teal-500 to-cyan-500",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="card-premium group relative flex flex-col p-8"
              >
                <div
                  className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.gradient} text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}
                >
                  <tool.icon className="h-7 w-7" />
                </div>
                <h3 className="font-heading text-foreground text-xl font-bold mb-2 tracking-tight">
                  {tool.title}
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed flex-1">
                  {tool.desc}
                </p>
                <div className="mt-8 flex items-center justify-between pt-5 border-t border-border">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-primary/10 text-primary">
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
                className="h-12 px-8 rounded-2xl border-2 font-bold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
              >
                View all tools <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 border-y border-border bg-muted/30">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground mb-8 tracking-tight">
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
                className="group flex items-start gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all hover:-translate-y-1"
              >
                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary/15 to-cyan-500/10 text-primary flex items-center justify-center shrink-0 group-hover:from-primary group-hover:to-violet-600 group-hover:text-white transition-all shadow-sm">
                  <cat.icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors">
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

      {/* Why */}
      <section className="py-20 md:py-28 bg-background relative overflow-hidden">
        <div className="absolute inset-0 surface-mesh opacity-60 pointer-events-none" />
        <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div className="max-w-xl">
              <span className="inline-block text-primary font-bold tracking-wider uppercase text-xs mb-4 px-3.5 py-1.5 bg-primary/10 rounded-full border border-primary/20">
                Why ToolNova
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-foreground leading-[1.1] tracking-tight">
                Built to feel{" "}
                <span className="text-brand-gradient">premium</span>
                <br />
                — priced to start free.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
              Serious craft, fast interfaces, and honest freemium. No clutter.
              No account wall on day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Lightning fast",
                desc: "Optimized client engines and snappy AI responses so you stay in flow.",
                color: "from-amber-500 to-orange-600",
              },
              {
                icon: ShieldCheck,
                title: "Privacy first",
                desc: "PDF & image tools run in the browser when possible. We don’t sell your docs.",
                color: "from-primary to-violet-600",
              },
              {
                icon: Sparkles,
                title: "AI that helps",
                desc: "Per-tool system prompts and formats built for usable results — not filler.",
                color: "from-cyan-500 to-blue-600",
              },
            ].map((f) => (
              <div key={f.title} className="card-premium p-8 group">
                <div
                  className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${f.color} text-white flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform`}
                >
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                  {f.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-12 border-y border-border bg-muted/25">
        <div className="container mx-auto px-6 max-w-[1000px]">
          <div className="card-premium p-6 md:p-8">
            <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-3">
              How ToolNova stays free
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Hosting and AI cost money. We keep tools free to start with optional{" "}
              <Link href="/pricing" className="text-primary hover:underline font-semibold">
                ToolNova Pro
              </Link>{" "}
              and clearly labeled ads when approved. Details:{" "}
              <Link href="/advertising" className="text-primary hover:underline font-semibold">
                Advertising disclosure
              </Link>
              .
            </p>
            <ul className="grid sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
              {[
                { t: "No account wall", d: "Start any tool without signing up" },
                { t: "Browser privacy", d: "PDF & image tools process locally when possible" },
                { t: "Honest limits", d: "Free daily AI allowance; Pro is optional" },
              ].map((item) => (
                <li
                  key={item.t}
                  className="rounded-2xl bg-muted/60 border border-border px-4 py-3"
                >
                  <strong className="text-foreground block mb-1">{item.t}</strong>
                  {item.d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* About / EEAT */}
      <section className="py-20 md:py-24 bg-background border-y border-border">
        <div className="container mx-auto px-6 max-w-[1000px]">
          <div className="mb-14">
            <span className="inline-block text-primary font-bold tracking-wider uppercase text-xs mb-4 px-3.5 py-1.5 bg-primary/10 rounded-full border border-primary/20">
              About ToolNova
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6 tracking-tight">
              A unified toolkit for real work
            </h2>
            <div className="space-y-5 text-muted-foreground leading-relaxed text-base md:text-lg">
              <p>
                ToolNova removes friction from daily digital tasks — documents,
                images, study systems, and AI writing — in one fast browser hub.
              </p>
              <p>
                Whether you&apos;re merging research PDFs, compressing images, or
                building flashcards, our suite of {TOOL_COUNT_LABEL} tools is built
                to save hours of admin work without desktop software bloat.
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
                Tested flows, clear outputs, and continuous iteration based on
                real user feedback.
              </p>
            </div>
            <div>
              <h3 className="font-heading text-xl font-bold text-foreground mb-3 flex items-center gap-3">
                <Check className="text-primary h-6 w-6 shrink-0" />
                Strict data privacy
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Browser-side processing for PDF/image tools when possible. See our{" "}
                <Link href="/privacy" className="text-primary hover:underline font-medium">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 max-w-[1200px]">
          <FAQAccordion faqs={aeoContent.faqs} title="Frequently Asked Questions" />
        </div>
      </section>

      <BetweenSectionsAd />

      {/* CTA */}
      <section className="py-20 md:py-28 relative overflow-hidden bg-hero-premium">
        <div className="absolute inset-0 opacity-30 surface-mesh" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/25 rounded-full -mr-32 -mt-32 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/20 rounded-full -ml-32 -mb-32 blur-3xl" />
        <div className="container mx-auto px-6 max-w-[1200px] text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
            Ready for a sharper{" "}
            <span className="text-brand-gradient">workflow?</span>
          </h2>
          <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Start with {TOOL_COUNT_LABEL} free tools. No sign-up required.
            PDF/image tools unlimited in-browser; AI includes free daily use.
          </p>
          <Link href="/tools">
            <button
              type="button"
              className="btn-premium h-14 md:h-16 px-10 md:px-12 rounded-full font-bold text-base md:text-lg inline-flex items-center gap-2"
            >
              Get started free
              <ArrowRight className="h-5 w-5" />
            </button>
          </Link>
        </div>
      </section>
      <MultiplexAd />
    </div>
  );
}
