"use client";

import Link from"next/link";
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
} from"lucide-react";
import { Button } from"@/components/ui/button";
import { QuickAnswerBox } from"@/components/aeo/QuickAnswerBox";
import { FAQAccordion } from"@/components/aeo/FAQAccordion";
import { getHomepageAEO } from"@/lib/global-aeo-content";
import { MultiplexAd, BetweenSectionsAd } from"@/components/ads/AdUnit";
import { TOOL_COUNT, TOOL_COUNT_LABEL } from"@/data/tools";
import {
  SectionHeading,
  ToolCard,
  CategoryCard,
  CTASection,
  PremiumCard,
  StatTile,
} from"@/components/shared";

const featuredTools = [
  {
    href:"/tools/merge-pdf",
    icon: Merge,
    title:"Merge PDF",
    desc:"Combine PDFs in order and download one file — private, in-browser.",
    badge:"Top pick",
    badgeTone:"primary" as const,
    gradient:"from-rose-500 to-orange-500",
    glowColor:"shadow-rose-500/20",
  },
  {
    href:"/tools/resize-image",
    icon: ImageIcon,
    title:"Image Resizer",
    desc:"Resize by pixels or percent without quality loss.",
    badge:"Popular",
    badgeTone:"muted" as const,
    gradient:"from-violet-500 to-cyan-500",
    glowColor:"shadow-violet-500/20",
  },
  {
    href:"/tools/flashcard-maker",
    icon: Library,
    title:"Flashcard Maker",
    desc:"Create study cards from any topic for exam prep.",
    badge:"Students",
    badgeTone:"muted" as const,
    gradient:"from-teal-500 to-cyan-500",
    glowColor:"shadow-teal-500/20",
  },
];

const categories = [
  { href:"/tools/writing-tools", icon: FileText, title:"Writing", desc:"Grammar, essays, paraphrase" },
  { href:"/tools/study-tools", icon: GraduationCap, title:"Study", desc:"Flashcards, quizzes, notes" },
  { href:"/tools/image-pdf-tools", icon: Layers, title:"PDF & Image", desc:"Merge, compress, convert" },
  { href:"/tools/career-tools", icon: Briefcase, title:"Career", desc:"Resume, LinkedIn, letters" },
];

const previewTools = [
  { icon: BookOpen, name:"Homework Solver", color:"text-blue-500 bg-blue-500/10" },
  { icon: Pencil, name:"Grammar Checker", color:"text-emerald-500 bg-emerald-500/10" },
  { icon: Merge, name:"Merge PDF", color:"text-rose-500 bg-rose-500/10" },
  { icon: Sparkles, name:"Essay Writer", color:"text-primary bg-primary/10" },
];

const whyUsFeatures = [
  { icon: Zap, title:"Instant Results", desc:"Optimized AI engines so you get high-quality results in seconds." },
  { icon: ShieldCheck, title:"Absolute Privacy", desc:"Local processing for PDFs and images right in your browser." },
  { icon: Sparkles, title:"Smarter Outputs", desc:"Tuned specifically for academic and professional excellence." },
];

export function HomeDashboard() {
  const aeoContent = getHomepageAEO();

  return (
    <div className="w-full">
      {/* ─── Hero ─── Vibrant Premium Hero */}
      <section className="relative overflow-hidden pt-24 pb-20 md:pt-36 md:pb-32 border-b border-border/40 bg-background">
        {/* Soft Electric Blue Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center">
          <div className="animate-fade-in flex flex-col items-center">
            <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-muted/50 px-5 py-2 text-sm font-semibold text-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              <span>Next-Gen AI Toolkit for Students & Pros</span>
            </div>

            <h1 className="font-heading mx-auto mb-6 max-w-4xl text-5xl font-extrabold tracking-tight text-foreground sm:text-6xl md:text-7xl leading-[1.1]">
              Work smarter with{""}
              <span className="bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent">AI superpowers.</span>
            </h1>

            <p className="mx-auto mb-10 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed">
              Instantly merge PDFs, generate flashcards, fix grammar, and write perfect essays. 
              Join thousands using our <span className="text-foreground font-medium">{TOOL_COUNT_LABEL} premium tools</span>—completely free.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Link href="/tools/homework-solver" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 w-full sm:w-auto px-8 rounded-full text-base font-semibold shadow-[0_0_20px_-5px_rgba(var(--primary),0.4)] hover:shadow-[0_0_30px_-5px_rgba(var(--primary),0.6)] hover:-translate-y-0.5 transition-all duration-300">
                  Try a tool free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/tools" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="h-14 w-full sm:w-auto px-8 rounded-full text-base font-semibold transition-all hover:bg-muted border-border hover:border-primary/30">
                  <Grid2X2 className="mr-2 h-5 w-5 text-muted-foreground" />
                  Browse library
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bento Box Preview & Stats ─── */}
      <section className="relative z-20 -mt-10 md:-mt-16 mb-24 px-6">
        <div className="mx-auto max-w-[1000px] grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main App Window Preview (Spans 2 columns) */}
          <div className="md:col-span-2 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xl shadow-premium overflow-hidden flex flex-col relative group transition-all duration-500 hover:shadow-premium-lg">
             {/* Simple Header */}
             <div className="flex items-center gap-2 border-b border-border/40 bg-muted/40 px-6 py-4">
                <div className="flex gap-1.5 mr-2">
                  <div className="h-3 w-3 rounded-full bg-border" />
                  <div className="h-3 w-3 rounded-full bg-border" />
                  <div className="h-3 w-3 rounded-full bg-border" />
                </div>
                <div className="mx-auto flex items-center justify-center rounded-md bg-background px-4 py-1.5 text-xs text-muted-foreground border border-border/50 font-mono shadow-sm">
                  toolnova.com/dashboard
                </div>
             </div>

             {/* App Content */}
             <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-background">
               {previewTools.map((tool) => (
                 <div key={tool.name} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/50 cursor-pointer">
                   <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-md ${tool.color}`}>
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
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-center items-center text-center shadow-premium-sm transition-all hover:-translate-y-1 hover:shadow-premium group">
              <p className="text-4xl font-black font-heading text-foreground mb-1 group-hover:scale-110 transition-transform">{TOOL_COUNT}+</p>
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Premium Tools</p>
            </div>
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 flex flex-col justify-center items-center text-center shadow-premium-sm transition-all hover:-translate-y-1 hover:shadow-premium group relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className="text-4xl font-black font-heading text-primary mb-1 relative z-10 group-hover:scale-110 transition-transform">$0</p>
              <p className="text-xs font-bold text-primary/80 uppercase tracking-widest relative z-10">Forever Free</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-center items-center text-center shadow-premium-sm transition-all hover:-translate-y-1 hover:shadow-premium group">
              <ShieldCheck className="h-10 w-10 text-primary mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Total Privacy</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Trust strip ─── */}
      <section className="border-y border-border/40 bg-muted/20 py-6">
        <div className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 text-sm font-semibold text-muted-foreground">
          {["No account required","Browser-side PDF privacy","Clear free AI limits","Built for real study & work",
          ].map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ─── Featured tools ─── */}
      <section id="tools" className="relative py-24 bg-background">
        <div className="container relative mx-auto max-w-[1120px] px-6">
          <div className="mb-16 text-center">
             <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4 text-foreground">Start with these tools</h2>
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
      <section className="border-t border-border bg-muted/30 py-24">
        <div className="container mx-auto max-w-[1120px] px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
             
             {/* Left side: Why ToolNova */}
             <div className="lg:col-span-5 space-y-6">
                <div>
                   <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground shadow-sm">
                     Why ToolNova
                   </div>
                   <h2 className="font-heading text-3xl font-bold mb-8 text-foreground leading-tight">Built for real work,<br/>designed for speed.</h2>
                </div>
                
                {whyUsFeatures.map((f) => (
                  <div key={f.title} className="flex gap-4 p-5 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors shadow-sm">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
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
                    <Link key={cat.href} href={cat.href} className={`group relative overflow-hidden rounded-xl border border-border bg-card p-8 transition-all hover:border-primary/50 shadow-sm flex flex-col justify-between ${idx === 0 || idx === 3 ? 'sm:col-span-2' : ''}`}>
                      <div>
                        <div className="flex items-center justify-between mb-4">
                           <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
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
