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
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-[1100px] px-4 pb-10 pt-6 sm:px-6 sm:pb-12 sm:pt-8">
          <button
            type="button"
            onClick={() => router.push("/tools")}
            className="mb-6 inline-flex items-center gap-2 rounded-lg border border-border bg-muted/40 px-3.5 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
          >
            <ArrowLeft className="h-4 w-4" />
            All tools
          </button>

          <div className="text-center">
            <div className="section-kicker mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{badge}</span>
            </div>
            <h1 className="font-heading mx-auto mb-3 max-w-3xl text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-[2.5rem] md:leading-[1.15]">
              {toolName}
            </h1>
            <p className="mx-auto mb-2 max-w-2xl text-base font-medium text-muted-foreground sm:text-lg">
              {tagline}
            </p>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Tool workspace */}
      <div id="tool-input" className="scroll-mt-24 bg-muted/50 py-8 sm:py-10">
        <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
          <ToolShellContext.Provider value={{ nestedInPremiumShell: true }}>
            {children}
          </ToolShellContext.Provider>
        </div>
      </div>

      {subjectCards && subjectCards.length > 0 && (
        <section className="border-t border-border bg-card py-12 sm:py-16">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
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
        <section className="border-t border-border bg-muted py-12 sm:py-16">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
            <div className="mb-8 text-center">
              <h2 className="font-heading mb-2 text-2xl font-extrabold text-foreground sm:text-3xl">
                Built for reliable results
              </h2>
              <p className="mx-auto max-w-xl text-muted-foreground">
                Practical controls, clear output, and fast browser workflows.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {features.map((feature, i) => (
                <div key={i} className="surface-card h-full p-6">
                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent text-primary">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-heading mb-2 text-lg font-bold text-foreground">
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
        <section className="border-t border-border bg-card py-12 sm:py-16">
          <div className="mx-auto max-w-[1000px] px-4 sm:px-6">
            <h2 className="font-heading mb-10 text-center text-2xl font-extrabold text-foreground sm:text-3xl">
              How it works
            </h2>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {howItWorks.map((item) => (
                <div key={item.step} className="text-center">
                  <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/25">
                    <item.icon className="h-7 w-7" />
                    <span className="absolute -right-1.5 -top-1.5 flex h-7 w-7 items-center justify-center rounded-full border-2 border-card bg-accent text-xs font-bold text-primary">
                      {item.step}
                    </span>
                  </div>
                  <h3 className="font-heading mb-1.5 text-lg font-bold text-foreground">
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
        <section className="border-t border-border bg-muted py-12 sm:py-16">
          <div className="mx-auto max-w-[1100px] px-4 sm:px-6">
            <h2 className="font-heading mb-6 text-center text-2xl font-extrabold text-foreground">
              More essential tools
            </h2>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {relatedTools.map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/tools/${tool.slug}`}
                  className="surface-card group flex flex-col items-center p-5 text-center"
                >
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-primary transition-transform group-hover:scale-105">
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
        <section className="bg-primary py-12 text-primary-foreground sm:py-14">
          <div className="mx-auto max-w-[700px] px-4 text-center sm:px-6">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
              <CtaIcon className="h-6 w-6" />
            </div>
            <h3 className="font-heading mb-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
              {ctaTitle}
            </h3>
            {ctaDescription && (
              <p className="mx-auto mb-6 max-w-lg text-sm text-primary-foreground/90 sm:text-base">
                {ctaDescription}
              </p>
            )}
            <a
              href="#tool-input"
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-7 text-base font-bold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white/95"
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
