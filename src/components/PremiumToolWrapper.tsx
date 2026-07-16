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

export function PremiumToolWrapper({
  children,
  toolName,
  toolSlug,
  tagline,
  description,
  badge = "AI-Powered",
  subjectCards,
  features,
  howItWorks,
  relatedTools,
  ctaTitle,
  ctaDescription,
  ctaButtonText = "Start Now",
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
    <div className="page-shell min-h-screen text-foreground transition-colors duration-300">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(breadcrumbSchema) }}
      />

      <div className="relative z-10 pt-6 sm:pt-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <button
            type="button"
            onClick={() => router.push("/tools")}
            className="surface-glass mb-6 inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold text-foreground shadow-premium-sm transition-all hover:border-primary/25 hover:bg-card"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Tools
          </button>
        </div>
      </div>

      <section className="page-hero relative z-10 overflow-hidden pb-12 pt-4 sm:pb-16 sm:pt-7">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex flex-col items-center text-center">
            <div className="section-kicker mb-5">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{badge}</span>
            </div>

            <div className="relative mb-4">
              <h1 className="font-heading text-3xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-4xl md:text-5xl">
                {toolName}
              </h1>
            </div>

            <p className="mx-auto mb-3 max-w-3xl text-lg sm:text-xl font-medium leading-relaxed text-muted-foreground">
              {tagline}
            </p>
            <p className="mx-auto mb-8 max-w-2xl text-sm sm:text-base leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </section>

      <div id="tool-input" className="relative scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ToolShellContext.Provider value={{ nestedInPremiumShell: true }}>
            {children}
          </ToolShellContext.Provider>
        </div>
      </div>

      {subjectCards && subjectCards.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-5">
            {subjectCards.map((card) => (
              <div key={card.name} className="group relative">
                <div
                  className={`absolute inset-0 ${card.bgGlow} rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="surface-card relative p-4 text-center sm:p-5">
                  <div
                    className={`mx-auto mb-3 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} shadow-md transition-transform duration-300 group-hover:scale-105`}
                  >
                    <card.icon className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-foreground text-sm sm:text-base group-hover:text-primary transition-colors">
                    {card.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {features && features.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="mb-12 text-center">
            <h2 className="font-heading mb-3 text-3xl font-semibold text-foreground sm:text-4xl">
              Built for reliable results
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Practical controls, clear output, and fast browser-based workflows.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {features.map((feature, i) => (
              <div
                key={i}
                className="surface-card h-full p-7 sm:p-8"
              >
                <div
                  className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary"
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="font-heading mb-3 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {feature.description ?? feature.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {howItWorks && howItWorks.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="content-panel relative overflow-hidden p-7 sm:p-12">
            <div className="mb-12 text-center">
              <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
                Three steps to a result
              </h2>
            </div>
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {howItWorks.map((item) => (
                <div key={item.step} className="relative text-center">
                  <div
                    className={`relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-lg`}
                  >
                    <item.icon className="h-9 w-9 text-white" />
                    <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-card text-xs font-bold text-foreground shadow">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="font-heading mb-2 text-lg font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="px-2 leading-relaxed text-muted-foreground text-sm sm:text-base">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedTools && relatedTools.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="mb-10 text-center">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground">
              More essential tools
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="surface-card group p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-muted transition-transform group-hover:scale-105">
                  <tool.icon className={`h-6 w-6 ${tool.color}`} />
                </div>
                <p className="font-heading font-bold text-foreground transition-colors group-hover:text-primary text-sm sm:text-base">
                  {tool.name}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {ctaTitle && (
        <section className="mx-auto max-w-6xl px-4 sm:px-6 py-16 sm:py-20">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-primary p-10 text-center text-primary-foreground shadow-premium-lg sm:p-14">
            <div className="relative z-10">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-white/15">
                <CtaIcon className="h-6 w-6" />
              </div>
              <h3 className="font-heading mb-3 text-2xl sm:text-3xl font-semibold tracking-tight">
                {ctaTitle}
              </h3>
              {ctaDescription && (
                <p className="mx-auto mb-7 max-w-xl text-base text-primary-foreground/85">
                  {ctaDescription}
                </p>
              )}
              <a
                href="#tool-input"
                className="inline-flex items-center gap-2 rounded-lg bg-white text-primary px-6 py-3 font-semibold shadow-sm hover:bg-white/95 transition-colors"
              >
                {ctaButtonText} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
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
      "Advanced AI technology delivers accurate, high-quality results every time.",
    icon: Brain,
    gradient: "from-primary to-teal-600",
    bgLight: "from-teal-50 to-emerald-50",
  },
  {
    title: "Lightning Fast",
    description:
      "Get results in seconds, not hours. Save time for what matters most.",
    icon: Zap,
    gradient: "from-amber-500 to-orange-600",
    bgLight: "from-amber-50 to-orange-50",
  },
  {
    title: "Free & Private",
    description:
      "No sign-up required. Your data stays completely private and secure.",
    icon: Shield,
    gradient: "from-emerald-500 to-teal-600",
    bgLight: "from-emerald-50 to-teal-50",
  },
];
