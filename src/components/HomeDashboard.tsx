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
  Star,
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

      {/* ============================================
          HERO — Cinematic Cosmic
          ============================================ */}
      <section className="relative overflow-hidden bg-hero-premium">

        {/* Background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <div className="absolute -top-32 -right-32 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,hsl(252_90%_65%_/_0.32),transparent_60%)] blur-3xl" />
          <div className="absolute -bottom-40 -left-24 w-[560px] h-[560px] rounded-full bg-[radial-gradient(circle,hsl(198_95%_58%_/_0.25),transparent_60%)] blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[460px] rounded-full bg-[radial-gradient(circle,hsl(278_80%_58%_/_0.14),transparent_65%)] blur-3xl" />
          {/* Grid mesh overlay */}
          <div className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px)',
              backgroundSize: '52px 52px',
              maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 72%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 20%, transparent 72%)',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-[1240px] px-6 py-24 md:py-36">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-10">

            {/* Left — copy */}
            <div className="flex-1 text-center lg:text-left max-w-2xl">

              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] border border-white/[0.14] text-violet-100 text-sm font-semibold mb-8 backdrop-blur-md shadow-[0_0_40px_-12px_rgba(124,92,255,0.55)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-300" />
                </span>
                Free to start · No sign-up required
              </div>

              {/* Headline */}
              <h1 className="font-heading hero-title speakable text-white text-[2.75rem] sm:text-5xl md:text-[3.5rem] lg:text-[4.25rem] font-extrabold leading-[1.04] tracking-tight mb-7">
                The premium AI toolkit for{" "}
                <span className="text-brand-gradient">
                  students &amp; pros
                </span>
              </h1>

              {/* Subheading */}
              <p className="hero-description text-white/70 text-lg md:text-xl max-w-xl leading-relaxed mb-10 mx-auto lg:mx-0">
                Write, study, and ship work faster with{" "}
                <strong className="text-white font-semibold">
                  {TOOL_COUNT_LABEL} polished tools
                </strong>
                {" "}— PDFs, flashcards, grammar, essays, and more. Instant results. Browser privacy where it matters.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/tools/homework-solver">
                  <button
                    type="button"
                    className="btn-premium h-14 px-9 rounded-2xl font-bold text-base flex items-center justify-center gap-2 group w-full sm:w-auto"
                  >
                    Try a tool free
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </Link>
                <Link href="/tools">
                  <Button
                    variant="outline"
                    className="h-14 px-9 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/20 text-white hover:bg-white/[0.12] hover:text-white hover:border-white/30 font-semibold text-base w-full sm:w-auto transition-all"
                  >
                    <Grid2X2 className="h-5 w-5" />
                    Browse all tools
                  </Button>
                </Link>
              </div>

              {/* Social proof strip */}
              <div className="flex items-center gap-3 mt-8 justify-center lg:justify-start">
                <div className="flex -space-x-1.5">
                  {["bg-violet-500", "bg-cyan-500", "bg-rose-500", "bg-amber-500", "bg-emerald-500"].map((c, i) => (
                    <div key={i} className={`h-7 w-7 rounded-full ${c} border-2 border-[#0c0620] flex items-center justify-center`}>
                      <span className="text-[9px] text-white font-bold">U</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-white/60 text-xs font-medium">Loved by 10k+ students</span>
                </div>
              </div>
            </div>

            {/* Right — stat cards */}
            <div className="grid grid-cols-3 lg:grid-cols-1 gap-3 w-full max-w-sm lg:max-w-[200px]">
              {[
                { value: String(TOOL_COUNT), label: "AI Tools", sub: "All free to open", accent: "from-violet-500 to-purple-600" },
                { value: "$0", label: "To start", sub: "No card needed", accent: "from-cyan-500 to-blue-500" },
                { value: "100%", label: "Private PDFs", sub: "In-browser when possible", accent: "from-emerald-500 to-teal-500" },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  className="hero-stat-card"
                  style={{ animationDelay: `${i * 90}ms` }}
                >
                  <div className={`font-heading text-white text-3xl md:text-4xl lg:text-[2.5rem] font-extrabold tracking-tight bg-gradient-to-br ${stat.accent} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-white/85 font-semibold text-sm mt-1.5 leading-snug">
                    {stat.label}
                  </div>
                  <div className="text-white/45 text-xs mt-0.5 leading-snug">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fade to background */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background via-background/70 to-transparent pointer-events-none" />
      </section>

      {/* ============================================
          QUICK ANSWER (AEO)
          ============================================ */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-6 max-w-[1240px]">
          <QuickAnswerBox
            question={aeoContent.quickAnswer.question}
            answer={aeoContent.quickAnswer.answer}
          />
        </div>
      </section>

      {/* ============================================
          FEATURED TOOLS — Bento cards
          ============================================ */}
      <section id="tools" className="py-20 md:py-28 bg-background relative">
        {/* Subtle mesh background */}
        <div className="absolute inset-0 surface-mesh opacity-50 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-[1240px] relative z-10">
          <div className="text-center mb-16">
            <span className="section-label mb-5">
              <Sparkles className="h-3.5 w-3.5" />
              Featured
            </span>
            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-foreground mb-5 tracking-tight mt-4">
              Tools people open first
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto text-lg leading-relaxed">
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
                glow: "shadow-rose-500/20",
              },
              {
                href: "/tools/resize-image",
                icon: ImageIcon,
                title: "Image Resizer",
                desc: "Exact pixels or percent. High-quality scaling without the desktop app.",
                badge: "Trending",
                gradient: "from-violet-500 via-primary to-cyan-500",
                glow: "shadow-violet-500/20",
              },
              {
                href: "/tools/flashcard-maker",
                icon: Library,
                title: "Flashcard Maker",
                desc: "Exam-ready cards from any topic — structured for real study sessions.",
                badge: "Student pick",
                gradient: "from-emerald-500 via-teal-500 to-cyan-500",
                glow: "shadow-emerald-500/20",
              },
            ].map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="card-premium group relative flex flex-col p-8 overflow-hidden"
              >
                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                <div
                  className={`mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${tool.gradient} text-white shadow-xl ${tool.glow} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}
                >
                  <tool.icon className="h-7 w-7" />
                </div>

                <span className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-primary/10 text-primary w-fit mb-4">
                  {tool.badge}
                </span>

                <h3 className="font-heading text-foreground text-xl font-bold mb-3 tracking-tight">
                  {tool.title}
                </h3>
                <p className="text-muted-foreground text-[0.95rem] leading-relaxed flex-1">
                  {tool.desc}
                </p>

                <div className="mt-8 flex items-center gap-2 text-primary font-semibold text-sm pt-5 border-t border-border">
                  Open tool
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/tools">
              <Button
                variant="outline"
                className="h-12 px-8 rounded-2xl border-2 font-bold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
              >
                View all tools <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================
          CATEGORIES
          ============================================ */}
      <section className="py-16 border-y border-border bg-muted/40 relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern-dots opacity-60 pointer-events-none" />
        <div className="container mx-auto px-6 max-w-[1240px] relative z-10">
          <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
            <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-foreground tracking-tight">
              Explore by category
            </h2>
            <Link href="/tools" className="text-primary text-sm font-semibold hover:underline underline-offset-4 flex items-center gap-1">
              See all <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                href: "/tools/writing-tools",
                icon: FileText,
                title: "Writing",
                desc: "Grammar, essays, paraphrasing",
                gradient: "from-violet-500/15 to-purple-500/10",
                activeGradient: "from-violet-500 to-purple-600",
              },
              {
                href: "/tools/study-tools",
                icon: GraduationCap,
                title: "Study",
                desc: "Flashcards, quizzes, notes",
                gradient: "from-cyan-500/15 to-blue-500/10",
                activeGradient: "from-cyan-500 to-blue-600",
              },
              {
                href: "/tools/image-pdf-tools",
                icon: Layers,
                title: "PDF & Image",
                desc: "Merge, compress, convert",
                gradient: "from-rose-500/15 to-orange-500/10",
                activeGradient: "from-rose-500 to-orange-500",
              },
              {
                href: "/tools/career-tools",
                icon: Briefcase,
                title: "Career",
                desc: "Resume, LinkedIn, cover letters",
                gradient: "from-emerald-500/15 to-teal-500/10",
                activeGradient: "from-emerald-500 to-teal-600",
              },
            ].map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="group flex items-center gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/35 hover:shadow-lg hover:shadow-primary/8 transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${cat.gradient} text-primary flex items-center justify-center shrink-0 group-hover:bg-gradient-to-br group-hover:${cat.activeGradient} group-hover:text-white transition-all duration-300 shadow-sm`}>
                  <cat.icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-heading font-bold text-foreground group-hover:text-primary transition-colors text-base">
                    {cat.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-snug">
                    {cat.desc}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          WHY TOOLNOVA
          ============================================ */}
      <section className="py-20 md:py-28 bg-background relative overflow-hidden">
        <div className="absolute inset-0 surface-mesh opacity-55 pointer-events-none" />
        <div className="container mx-auto px-6 max-w-[1240px] relative z-10">

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
            <div className="max-w-lg">
              <span className="section-label mb-5">
                Why ToolNova
              </span>
              <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-foreground leading-[1.08] tracking-tight mt-4">
                Built to feel{" "}
                <span className="text-brand-gradient">premium</span>
                <br />— priced to start free.
              </h2>
            </div>
            <p className="text-muted-foreground max-w-xs text-base leading-relaxed">
              Serious craft, fast interfaces, and honest freemium. No clutter. No account wall on day one.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Lightning fast",
                desc: "Optimized client engines and snappy AI responses so you stay in flow.",
                color: "from-amber-400 to-orange-500",
                glow: "shadow-amber-500/25",
              },
              {
                icon: ShieldCheck,
                title: "Privacy first",
                desc: "PDF & image tools run in the browser when possible. We don't sell your docs.",
                color: "from-primary to-violet-600",
                glow: "shadow-primary/25",
              },
              {
                icon: Sparkles,
                title: "AI that helps",
                desc: "Per-tool system prompts and formats built for usable results — not filler.",
                color: "from-cyan-400 to-blue-500",
                glow: "shadow-cyan-500/25",
              },
            ].map((f) => (
              <div key={f.title} className="card-premium p-8 group">
                <div
                  className={`h-13 w-13 rounded-2xl bg-gradient-to-br ${f.color} text-white flex items-center justify-center mb-6 shadow-lg ${f.glow} group-hover:scale-110 group-hover:shadow-xl transition-all duration-400`}
                  style={{ height: '3.25rem', width: '3.25rem' }}
                >
                  <f.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-3 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[0.95rem]">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================
          TRUST / TRANSPARENCY
          ============================================ */}
      <section className="py-12 border-y border-border bg-muted/25">
        <div className="container mx-auto px-6 max-w-[980px]">
          <div className="card-premium p-6 md:p-8">
            <div className="flex items-start gap-4 mb-5">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Check className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground">
                  How ToolNova stays free
                </h2>
                <p className="text-muted-foreground leading-relaxed mt-1 text-[0.95rem]">
                  Hosting and AI cost money. We keep tools free to start with optional{" "}
                  <Link href="/pricing" className="text-primary hover:underline font-semibold underline-offset-4">
                    ToolNova Pro
                  </Link>{" "}
                  and clearly labeled ads when approved. Details:{" "}
                  <Link href="/advertising" className="text-primary hover:underline font-semibold underline-offset-4">
                    Advertising disclosure
                  </Link>
                  .
                </p>
              </div>
            </div>
            <ul className="grid sm:grid-cols-3 gap-3 text-sm text-muted-foreground">
              {[
                { t: "No account wall", d: "Start any tool without signing up" },
                { t: "Browser privacy", d: "PDF & image tools process locally when possible" },
                { t: "Honest limits", d: "Free daily AI allowance; Pro is optional" },
              ].map((item) => (
                <li
                  key={item.t}
                  className="rounded-xl bg-muted/60 border border-border px-4 py-3.5 hover:border-primary/25 transition-colors"
                >
                  <strong className="text-foreground block mb-1 font-semibold">{item.t}</strong>
                  {item.d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================
          ABOUT / EEAT
          ============================================ */}
      <section className="py-20 md:py-24 bg-background border-y border-border">
        <div className="container mx-auto px-6 max-w-[980px]">
          <div className="mb-14">
            <span className="section-label mb-5">
              About ToolNova
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-foreground leading-tight mb-6 tracking-tight mt-4">
              A unified toolkit for real work
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-border">
            <div className="flex gap-4">
              <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="text-primary h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  Quality commitment
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[0.95rem]">
                  Tested flows, clear outputs, and continuous iteration based on real user feedback.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="h-11 w-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                <Check className="text-primary h-5 w-5" />
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">
                  Strict data privacy
                </h3>
                <p className="text-muted-foreground leading-relaxed text-[0.95rem]">
                  Browser-side processing for PDF/image tools when possible. See our{" "}
                  <Link href="/privacy" className="text-primary hover:underline font-medium underline-offset-4">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-6 max-w-[1240px]">
          <FAQAccordion faqs={aeoContent.faqs} title="Frequently Asked Questions" />
        </div>
      </section>

      <BetweenSectionsAd />

      {/* ============================================
          BOTTOM CTA
          ============================================ */}
      <section className="py-24 md:py-32 relative overflow-hidden bg-hero-premium">
        <div className="absolute inset-0 pointer-events-none select-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full -mr-40 -mt-40 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/18 rounded-full -ml-32 -mb-32 blur-3xl" />
          <div className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
              backgroundSize: '52px 52px',
              maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 75%)',
            }}
          />
        </div>

        <div className="container mx-auto px-6 max-w-[1240px] text-center relative z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] border border-white/[0.14] text-violet-200 text-sm font-semibold mb-8 backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5" />
            No credit card required
          </span>

          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 leading-[1.06] tracking-tight">
            Ready for a sharper{" "}
            <span className="text-brand-gradient">workflow?</span>
          </h2>
          <p className="text-white/65 text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Start with {TOOL_COUNT_LABEL} free tools. No sign-up required.
            PDF/image tools unlimited in-browser; AI includes free daily use.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/tools">
              <button
                type="button"
                className="btn-premium h-14 md:h-16 px-10 md:px-14 rounded-full font-bold text-base md:text-lg inline-flex items-center gap-2.5"
              >
                Get started free
                <ArrowRight className="h-5 w-5" />
              </button>
            </Link>
            <Link href="/pricing">
              <Button
                variant="outline"
                className="h-14 md:h-16 px-10 md:px-12 rounded-full bg-white/[0.06] border border-white/20 text-white hover:bg-white/[0.12] hover:text-white hover:border-white/30 font-semibold text-base transition-all"
              >
                View pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <MultiplexAd />
    </div>
  );
}
