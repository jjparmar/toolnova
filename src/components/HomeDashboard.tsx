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
  ChevronRight
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
    gradient: "from-violet-500 to-cyan-500",
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
  { icon: BookOpen, name: "Homework Solver", color: "text-blue-500 bg-blue-500/10" },
  { icon: Pencil, name: "Grammar Checker", color: "text-emerald-500 bg-emerald-500/10" },
  { icon: Merge, name: "Merge PDF", color: "text-rose-500 bg-rose-500/10" },
  { icon: Sparkles, name: "Essay Writer", color: "text-primary bg-primary/10" },
];

const whyUsFeatures = [
  { icon: Zap, title: "Instant Results", desc: "Optimized AI engines so you get high-quality results in seconds." },
  { icon: ShieldCheck, title: "Absolute Privacy", desc: "Local processing for PDFs and images right in your browser." },
  { icon: Sparkles, title: "Smarter Outputs", desc: "Tuned specifically for academic and professional excellence." },
];

export function HomeDashboard() {
  const aeoContent = getHomepageAEO();

  return (
    <div className="w-full">
      {/* ─── Hero ─── Massive Glowing typography & Aurora background */}
      <section className="relative overflow-hidden pt-28 pb-20 md:pt-40 md:pb-32 border-b border-border/40">
        {/* Deep Starlight Aurora */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] rounded-full bg-primary/20 blur-[120px] mix-blend-screen animate-pulse-glow" />
          <div className="absolute top-[10%] right-[-10%] w-[40%] h-[60%] rounded-full bg-cyan-500/15 blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-[-10%] left-[20%] w-[60%] h-[50%] rounded-full bg-violet-600/20 blur-[150px] mix-blend-screen" />
        </div>
        
        <div className="pointer-events-none absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay" />

        <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center">
          <div className="animate-fade-in flex flex-col items-center">
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary shadow-glow-sm backdrop-blur-md">
              <Sparkles className="h-4 w-4" />
              <span>Next-Gen AI Toolkit for Students & Pros</span>
            </div>

            <h1 className="font-heading mx-auto mb-6 max-w-4xl text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-[5rem] leading-[1.05]">
              Work smarter with{" "}
              <span className="text-brand-gradient">AI superpowers.</span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              Instantly merge PDFs, generate flashcards, fix grammar, and write perfect essays. 
              Join thousands using our <span className="text-foreground font-medium">{TOOL_COUNT_LABEL} premium tools</span>—completely free.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link href="/tools/homework-solver" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 w-full sm:w-auto px-8 rounded-full text-base font-semibold shadow-glow-md hover:shadow-glow-lg transition-all duration-300">
                  Try a tool free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/tools" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="h-14 w-full sm:w-auto px-8 rounded-full text-base font-semibold border-border/50 bg-card/30 backdrop-blur-sm hover:bg-muted/50">
                  <Grid2X2 className="mr-2 h-5 w-5" />
                  Browse library
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bento Box Preview & Stats ─── */}
      <section className="relative z-20 -mt-12 md:-mt-20 mb-20 px-6">
        <div className="mx-auto max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main App Window Preview (Spans 2 columns) */}
          <div className="md:col-span-2 rounded-[2rem] border border-border/60 bg-card/40 backdrop-blur-3xl shadow-premium-lg overflow-hidden flex flex-col relative group">
             <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
             
             {/* Mac-like Header */}
             <div className="flex items-center gap-2 border-b border-border/40 bg-muted/20 px-6 py-4">
                <div className="flex gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.4)]" />
                  <span className="h-3 w-3 rounded-full bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.4)]" />
                  <span className="h-3 w-3 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
                </div>
                <div className="mx-auto flex items-center justify-center rounded-md bg-background/50 px-3 py-1 text-xs text-muted-foreground border border-border/30 backdrop-blur-sm">
                  toolnova.com/dashboard
                </div>
             </div>

             {/* App Content */}
             <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
               {previewTools.map((tool) => (
                 <div key={tool.name} className="flex items-center gap-4 rounded-2xl border border-border/40 bg-background/50 p-4 transition-all hover:bg-muted/50 hover:border-primary/30 hover:shadow-glow-sm cursor-pointer">
                   <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${tool.color}`}>
                     <tool.icon className="h-6 w-6" />
                   </div>
                   <div>
                     <p className="font-heading text-base font-bold text-foreground">{tool.name}</p>
                     <p className="text-xs text-muted-foreground font-medium">Ready instantly</p>
                   </div>
                 </div>
               ))}
             </div>
          </div>

          {/* Stats Column */}
          <div className="grid grid-rows-3 gap-6">
            <div className="rounded-[2rem] border border-border/60 bg-card/40 backdrop-blur-3xl p-6 flex flex-col justify-center items-center text-center shadow-premium relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-4xl font-black font-heading text-foreground mb-1">{TOOL_COUNT}+</p>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Premium Tools</p>
            </div>
            <div className="rounded-[2rem] border border-border/60 bg-card/40 backdrop-blur-3xl p-6 flex flex-col justify-center items-center text-center shadow-premium relative overflow-hidden group">
               <div className="absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-4xl font-black font-heading text-emerald-400 mb-1">$0</p>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Forever Free</p>
            </div>
            <div className="rounded-[2rem] border border-border/60 bg-card/40 backdrop-blur-3xl p-6 flex flex-col justify-center items-center text-center shadow-premium relative overflow-hidden group">
               <div className="absolute inset-0 bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <ShieldCheck className="h-10 w-10 text-cyan-400 mb-2" />
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Total Privacy</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust strip ─── */}
      <section className="border-y border-border/40 bg-muted/20 py-6">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 text-sm font-semibold text-muted-foreground">
          {[
            "No account required",
            "Browser-side PDF privacy",
            "Clear free AI limits",
            "Built for real study & work",
          ].map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ─── Featured tools ─── */}
      <section id="tools" className="relative py-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[100px] pointer-events-none" />
        <div className="container relative mx-auto max-w-[1120px] px-6">
          <div className="mb-16 text-center">
             <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Start with these tools</h2>
             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Fast, focused utilities people use every day to get ahead.</p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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

          <div className="mt-14 text-center">
            <Link href="/tools">
              <Button variant="outline" size="lg" className="rounded-full px-8 text-base font-semibold hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300">
                View library <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Bento Why Us & Categories ─── */}
      <section className="border-t border-border/40 bg-muted/10 py-24">
        <div className="container mx-auto max-w-[1120px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             
             {/* Left side: Why ToolNova */}
             <div className="lg:col-span-5 space-y-6">
                <div>
                   <div className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-card/30 px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                     Why ToolNova
                   </div>
                   <h2 className="font-heading text-3xl font-bold mb-8 text-foreground leading-tight">Built for real work,<br/>designed for speed.</h2>
                </div>
                
                {whyUsFeatures.map((f) => (
                  <div key={f.title} className="flex gap-4 p-5 rounded-2xl border border-border/40 bg-card/40 backdrop-blur-sm hover:border-primary/30 transition-colors">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <f.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-bold text-foreground mb-1">{f.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                    </div>
                  </div>
                ))}
             </div>

             {/* Right side: Categories Grid */}
             <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
                  {categories.map((cat, idx) => (
                    <Link key={cat.href} href={cat.href} className={`group relative overflow-hidden rounded-3xl border border-border/40 bg-card p-8 transition-all hover:border-primary/50 hover:shadow-glow-sm flex flex-col justify-between ${idx === 0 || idx === 3 ? 'sm:col-span-2' : ''}`}>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div>
                        <div className="flex items-center justify-between mb-4">
                           <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-muted/50 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                             <cat.icon className="h-6 w-6" />
                           </div>
                           <ChevronRight className="h-6 w-6 text-muted-foreground/30 group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-foreground mb-2">{cat.title}</h3>
                        <p className="text-muted-foreground">{cat.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* ─── Quick Answer Box ─── */}
      <section className="bg-background py-16">
        <div className="container mx-auto max-w-[900px] px-6">
          <QuickAnswerBox
            question={aeoContent.quickAnswer.question}
            answer={aeoContent.quickAnswer.answer}
          />
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="border-y border-border/40 bg-muted/10 py-20">
        <div className="container mx-auto max-w-[900px] px-6">
          <div className="mb-12 text-center">
             <h2 className="font-heading text-3xl font-bold">Frequently Asked Questions</h2>
          </div>
          <FAQAccordion faqs={aeoContent.faqs} />
        </div>
      </section>

      <BetweenSectionsAd />

      {/* ─── CTA — Premium gradient band ─── */}
      <CTASection
        title="Ready to upgrade your workflow?"
        description={`Start with ${TOOL_COUNT_LABEL} premium AI tools instantly. No credit card, no sign-up.`}
        href="/tools"
        buttonText="Get Started Free"
        icon={Sparkles}
      />
      <MultiplexAd />
    </div>
  );
}
