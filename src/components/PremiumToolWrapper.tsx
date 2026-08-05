"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Brain,
  LucideIcon,
  Shield,
  Sparkles,
  Zap,
} from "lucide-react";
import { getBreadcrumbSchema, schemaToJsonLd } from "@/lib/schema";
import { ToolShellContext } from "@/components/ToolShellContext";
import { Button } from "@/components/ui/button";

interface RelatedTool {
  name: string;
  slug: string;
  icon: LucideIcon;
  color: string;
}

interface SubjectCard {
  name: string;
  icon: LucideIcon;
  color: string;
  bgGlow: string;
}

interface FeatureCard {
  title: string;
  description?: string;
  desc?: string;
  icon: LucideIcon;
  gradient?: string;
  bgLight?: string;
}

interface PremiumToolWrapperProps {
  children: ReactNode;
  toolName: string;
  toolSlug: string;
  tagline: string;
  description: string;
  badge?: string;
  category?: string;
  categorySlug?: string;
  subjectCards?: SubjectCard[];
  features?: FeatureCard[];
  howItWorks?: {
    step: number;
    title: string;
    desc: string;
    icon: LucideIcon;
    color: string;
  }[];
  relatedTools?: RelatedTool[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaIcon?: LucideIcon;
}

/** Shared tool-page shell — matches homepage / iLovePDF product language */
export function PremiumToolWrapper({
  children,
  toolName,
  toolSlug,
  tagline,
  description,
  badge = "Free tool",
  subjectCards,
  features,
  howItWorks,
  relatedTools,
  ctaTitle,
  ctaDescription,
  ctaButtonText = "Start now",
  ctaIcon: CtaIcon = Sparkles,
}: PremiumToolWrapperProps) {
  const router = useRouter();

  const breadcrumbs = [
    { name: "Home", url: "https://www.toolnovahub.com" },
    { name: "Tools", url: "https://www.toolnovahub.com/tools" },
    { name: toolName, url: `https://www.toolnovahub.com/tools/${toolSlug}` },
  ];

  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(breadcrumbSchema) }}
      />

      {/* Hero band */}
      <section className="mesh-hero border-b border-[var(--border-color)]">
        <div className="page-container pb-10 pt-6 sm:pb-12 sm:pt-8">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
          >
            <button
              type="button"
              onClick={() => router.push("/tools")}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-card/90 px-3.5 py-1.5 font-semibold text-foreground shadow-sm transition-colors hover:bg-muted"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              All tools
            </button>
            <span aria-hidden className="text-muted-foreground/50">
              /
            </span>
            <span className="truncate font-medium text-foreground/80">{toolName}</span>
          </nav>

          <div className="mx-auto max-w-3xl text-center">
            <div className="section-kicker mb-4 justify-center">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{badge}</span>
            </div>
            <h1 className="font-heading mb-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-[2.65rem] md:leading-[1.12]">
              {toolName}
            </h1>
            <p className="mb-3 text-base font-semibold text-foreground/80 sm:text-lg">
              {tagline}
            </p>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-[0.98rem]">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Tool workspace — primary interaction zone */}
      <div id="tool-input" className="tool-workspace scroll-mt-24 py-8 sm:py-11">
        <div className="page-container">
          <ToolShellContext.Provider value={{ nestedInPremiumShell: true }}>
            <div className="mx-auto max-w-5xl">{children}</div>
          </ToolShellContext.Provider>
        </div>
      </div>

      {subjectCards && subjectCards.length > 0 && (
        <section className="section-pad border-t border-[var(--border-color)]">
          <div className="page-container">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-5">
              {subjectCards.map((card) => (
                <div
                  key={card.name}
                  className="surface-card flex flex-col items-center p-4 text-center sm:p-5"
                >
                  <div
                    className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${card.color} text-white shadow-sm`}
                  >
                    <card.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-heading text-sm font-bold text-foreground sm:text-base">
                    {card.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {features && features.length > 0 && (
        <section className="section-pad border-t border-[var(--border-color)] bg-muted/35">
          <div className="page-container">
            <div className="section-header mx-auto max-w-2xl text-center">
              <h2 className="section-title">Built for reliable results</h2>
              <p className="section-lead mx-auto">
                Practical controls, clear output, and fast browser workflows.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
              {features.map((feature, i) => (
                <div key={i} className="surface-card h-full p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary ring-1 ring-primary/10">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading mb-2 text-lg font-bold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {feature.description ?? feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {howItWorks && howItWorks.length > 0 && (
        <section className="section-pad border-t border-[var(--border-color)]">
          <div className="page-container max-w-4xl">
            <h2 className="section-title mb-10 text-center">How it works</h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
              {howItWorks.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#d946ef] text-white shadow-lg shadow-violet-500/30">
                    <item.icon className="h-7 w-7" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-white text-xs font-bold text-primary shadow-sm">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-heading mb-1.5 text-lg font-bold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedTools && relatedTools.length > 0 && (
        <section className="section-pad border-t border-[var(--border-color)] bg-muted/35">
          <div className="page-container">
            <h2 className="section-title mb-8 text-center">More essential tools</h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="surface-card surface-card-interactive group flex flex-col items-center p-5 text-center"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary ring-1 ring-primary/10 transition-transform group-hover:scale-105">
                    <tool.icon className={`h-6 w-6 ${tool.color}`} />
                  </div>
                  <p className="font-heading text-sm font-bold text-foreground group-hover:text-primary sm:text-base">
                    {tool.name}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {ctaTitle && (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#6d28d9] via-[#7c3aed] to-[#d946ef] py-14 text-primary-foreground sm:py-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                "radial-gradient(circle at 20% 20%, rgba(255,255,255,0.25), transparent 40%), radial-gradient(circle at 80% 80%, rgba(255,255,255,0.12), transparent 35%)",
            }}
          />
          <div className="page-container relative max-w-2xl text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
              <CtaIcon className="h-6 w-6" />
            </div>
            <h3 className="font-heading mb-2 text-2xl font-bold tracking-tight sm:text-3xl">
              {ctaTitle}
            </h3>
            {ctaDescription && (
              <p className="mx-auto mb-7 max-w-lg text-sm text-primary-foreground/90 sm:text-base">
                {ctaDescription}
              </p>
            )}
            <a
              href="#tool-input"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 text-base font-bold text-primary shadow-xl shadow-black/15 transition-all hover:-translate-y-0.5 hover:bg-white/95"
            >
              {ctaButtonText} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      )}
    </div>
  );
}

export const defaultFeatures: FeatureCard[] = [
  {
    title: "AI-Powered",
    description:
      "Advanced AI delivers clear, high-quality results for study and work.",
    icon: Brain,
    gradient: "from-primary to-[hsl(var(--primary-deep))]",
  },
  {
    title: "Lightning Fast",
    description: "Get results in seconds so you can stay focused on the task.",
    icon: Zap,
    gradient: "from-amber-500 to-orange-600",
  },
  {
    title: "Free & Private",
    description:
      "No sign-up required to start. Your data stays private and secure.",
    icon: Shield,
    gradient: "from-emerald-500 to-teal-600",
  },
];
