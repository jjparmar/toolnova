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
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-[#0f1419] dark:via-background dark:to-[#0f1419] text-slate-900 dark:text-slate-100 transition-colors duration-500">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(breadcrumbSchema) }}
      />

      <div className="relative z-10 pt-8">
        <div className="mx-auto max-w-7xl px-6">
          <button
            onClick={() => router.push("/tools")}
            className="mb-8 inline-flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2 text-sm font-semibold text-slate-700 dark:text-slate-200 shadow-sm transition-all hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to All Tools
          </button>
        </div>
      </div>

      <section className="relative z-10 overflow-hidden pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center text-center">
            <div className="mb-10 inline-flex items-center rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 px-4 py-2 shadow-sm">
              <span className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                {badge}
              </span>
            </div>

            <div className="relative mb-8">
              <div className="absolute -inset-x-20 -top-10 bottom-0 bg-gradient-to-r from-indigo-500/15 via-purple-500/15 to-pink-500/15 opacity-60 blur-3xl" />
              <h1 className="relative text-5xl font-black leading-[1.1] tracking-tight md:text-7xl">
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
                  {toolName}
                </span>
              </h1>
            </div>

            <p className="mx-auto mb-4 max-w-4xl text-xl font-medium leading-relaxed text-slate-600 dark:text-slate-300 md:text-2xl">
              {tagline}
            </p>
            <p className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>
        </div>
      </section>

      <div id="tool-input" className="relative">
        <div className="mx-auto max-w-7xl px-4">{children}</div>
      </div>

      {subjectCards && subjectCards.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-5">
            {subjectCards.map((card) => (
              <div key={card.name} className="group relative">
                <div
                  className={`absolute inset-0 ${card.bgGlow} rounded-2xl opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100`}
                />
                <div className="relative cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 text-center transition-all duration-500 hover:-translate-y-2 hover:border-transparent hover:shadow-2xl">
                  <div
                    className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${card.color} shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-6`}
                  >
                    <card.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900 transition-colors group-hover:text-indigo-600">
                    {card.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {features && features.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-black text-slate-900 md:text-5xl">
              Built for reliable results
            </h2>
            <p className="mx-auto max-w-2xl text-slate-500">
              Practical controls, clear output, and fast browser-based workflows.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {features.map((feature, i) => (
              <div key={i} className="group relative h-full">
                <div className="h-full rounded-[2rem] border border-slate-200 bg-white p-10 transition-all hover:-translate-y-1 hover:shadow-xl">
                  <div
                    className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient ?? "from-indigo-500 to-purple-500"} shadow-xl`}
                  >
                    <feature.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="mb-4 text-2xl font-black leading-tight text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-slate-600">
                    {feature.description ?? feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {howItWorks && howItWorks.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="relative overflow-hidden rounded-[3rem] border border-slate-200 bg-white/90 p-8 shadow-sm md:p-16">
            <div className="relative z-10 mb-16 text-center">
              <h2 className="text-4xl font-black text-slate-900">
                Three steps to a result
              </h2>
            </div>
            <div className="relative z-10 grid grid-cols-1 gap-8 md:grid-cols-3">
              {howItWorks.map((item, idx) => (
                <div key={item.step} className="relative text-center">
                  <div
                    className={`relative mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${item.color} shadow-2xl transition-transform duration-500 hover:rotate-3`}
                  >
                    <item.icon className="h-10 w-10 text-white" />
                    <div className="absolute -right-3 -top-3 flex h-10 w-10 items-center justify-center rounded-full border-4 border-slate-200 bg-white text-sm font-black text-slate-900 shadow-lg">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="mb-3 text-xl font-black text-slate-900">
                    {item.title}
                  </h3>
                  <p className="px-4 leading-relaxed text-slate-500">
                    {item.desc}
                  </p>
                  {idx < howItWorks.length - 1 && (
                    <div className="absolute left-[calc(50%+4rem)] top-12 hidden h-px w-[calc(100%-8rem)] bg-gradient-to-r from-slate-200 to-transparent md:block" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedTools && relatedTools.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-black text-slate-900">
              More Essential Tools
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="group rounded-[2rem] border border-slate-200 bg-white p-8 text-center transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 transition-transform group-hover:scale-110">
                  <tool.icon className={`h-7 w-7 ${tool.color}`} />
                </div>
                <p className="font-black text-slate-900 transition-colors group-hover:text-indigo-600">
                  {tool.name}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {ctaTitle && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-12 text-center text-white shadow-2xl md:p-20">
            <div className="relative z-10">
              <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md">
                <CtaIcon className="h-8 w-8" />
              </div>
              <h3 className="mb-6 text-4xl font-black md:text-5xl">
                {ctaTitle}
              </h3>
              {ctaDescription && (
                <p className="mx-auto mb-12 max-w-2xl text-xl text-white/80">
                  {ctaDescription}
                </p>
              )}
              <a
                href="#tool-input"
                className="inline-flex items-center gap-3 rounded-2xl bg-white px-10 py-5 font-black text-indigo-600 shadow-2xl transition-all hover:scale-105"
              >
                {ctaButtonText} <ArrowRight className="h-6 w-6" />
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
    gradient: "from-indigo-500 to-blue-500",
    bgLight: "from-indigo-50 to-blue-50",
  },
  {
    title: "Lightning Fast",
    description:
      "Get results in seconds, not hours. Save time for what matters most.",
    icon: Zap,
    gradient: "from-purple-500 to-pink-500",
    bgLight: "from-purple-50 to-pink-50",
  },
  {
    title: "Free & Private",
    description:
      "No sign-up required. Your data stays completely private and secure.",
    icon: Shield,
    gradient: "from-emerald-500 to-teal-500",
    bgLight: "from-emerald-50 to-teal-50",
  },
];
