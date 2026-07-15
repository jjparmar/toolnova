/**
 * SEO Metadata utilities for optimal search engine and social media performance
 */

import { Metadata } from "next";
import { siteConfig, getFullUrl } from "@/config/site";
import { TOOL_COUNT_LABEL } from "@/data/tools";

interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  twitterCard?: "summary" | "summary_large_image";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  category?: string;
}

const BASE_URL = siteConfig.url;
const DEFAULT_OG_IMAGE = siteConfig.ogImage;
const SITE_NAME = siteConfig.name;

/**
 * Generate comprehensive metadata for a page
 */
export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = "website",
    twitterCard = "summary_large_image",
    publishedTime,
    modifiedTime,
    author,
    category,
  } = config;

  // Root layout uses template "%s | ToolNova" — pass bare title to avoid double suffix
  const bareTitle = title
    .replace(new RegExp(`\\s*[|–-]\\s*${SITE_NAME}\\s*$`, "i"), "")
    .trim();
  const socialTitle = bareTitle.includes(SITE_NAME)
    ? bareTitle
    : `${bareTitle} | ${SITE_NAME}`;
  const url = canonical || BASE_URL;

  return {
    title: bareTitle,
    description,
    keywords: keywords.length ? keywords : undefined,
    authors: author ? [{ name: author }] : undefined,
    category,

    // Canonical URL
    alternates: {
      canonical: url,
      languages: {
        en: url,
        "x-default": url,
      },
    },

    // Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
      title: socialTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: bareTitle,
        },
      ],
      locale: "en_US",
      type: ogType,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },

    // Twitter Card
    twitter: {
      card: twitterCard,
      title: socialTitle,
      description,
      images: [ogImage],
      creator: siteConfig.twitterHandle,
    },

    // Robots
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    // Verification tags — pulled from siteConfig to avoid overwriting root layout
    verification: {
      google: siteConfig.verification.google,
      other: {
        "msvalidate.01": siteConfig.verification.bing,
        "yandex-verification": siteConfig.verification.yandex,
      },
    },
  };
}

/**
 * Tool page metadata template
 */
export function generateToolMetadata(
  toolName: string,
  description: string,
  toolSlug: string,
  keywords: string[],
): Metadata {
  return generateMetadata({
    title: `${toolName} Free Online – No Signup Required`,
    description: `${description}. Free, fast, and accurate. No account or signup required. Try it instantly in your browser.`,
    keywords: [
      ...keywords,
      `free ${toolName.toLowerCase()} no signup`,
      `${toolName.toLowerCase()} online free`,
      "free online tool no login",
      "AI tool for students",
      "free study tool",
      "ToolNova",
    ],
    canonical: getFullUrl(`/tools/${toolSlug}`),
    ogImage: DEFAULT_OG_IMAGE,
    category: "Education",
  });
}

/**
 * Blog post metadata template
 */
export function generateBlogMetadata(
  title: string,
  description: string,
  slug: string,
  keywords: string[],
  publishedDate: string,
  modifiedDate: string,
  author: string = "ToolNova Team",
  category: string = "Education",
): Metadata {
  return generateMetadata({
    title,
    description,
    keywords,
    canonical: getFullUrl(`/blog/${slug}`),
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "article",
    publishedTime: publishedDate,
    modifiedTime: modifiedDate,
    author,
    category,
  });
}

/**
 * Homepage metadata
 */
export function getHomepageMetadata(): Metadata {
  return generateMetadata({
    title: `${TOOL_COUNT_LABEL} Free AI Tools for Students – No Signup`,
    description:
      "Free AI tools for students & professionals. Merge PDFs, make flashcards, fix grammar, write essays, solve homework — all in one place. No account needed. Try now!",
    keywords: [
      "free AI tools for students no signup",
      "solve homework step by step free",
      "make flashcards from notes free",
      "fix grammar in essay free",
      "merge PDF online free no watermark",
      "paraphrase essay without plagiarism free",
      "summarize article free online",
      "free essay writer for high school",
      "AI study tools for college students",
      "free quiz generator from notes",
      "compress image without quality loss free",
      "free AI writing tools no login",
      "ToolNova",
    ],
    canonical: BASE_URL,
    ogImage: DEFAULT_OG_IMAGE,
  });
}

/**
 * Generate JSON-LD script tag content
 */
export function generateJSONLD(schema: object): string {
  return JSON.stringify(schema);
}

/**
 * Common keywords for different tool categories
 */
export const KEYWORD_SETS = {
  aiStudy: [
    "AI study tools",
    "homework solver",
    "study helper",
    "AI tutor",
    "exam prep",
    "study notes",
  ],
  writing: [
    "AI writing",
    "essay writer",
    "paraphraser",
    "grammar checker",
    "content writer",
    "AI editor",
  ],
  creative: [
    "AI story generator",
    "creative writing",
    "content generator",
    "AI creativity",
  ],
  utility: [
    "text tools",
    "word counter",
    "case converter",
    "text utilities",
    "online tools",
  ],
};

/**
 * High-value, high-CPC keywords for SEO targeting
 */
export const HIGH_VALUE_KEYWORDS = [
  // Education (High CPC: $5-15)
  "online tutoring",
  "homework help",
  "test prep",
  "study guide",
  "essay writing service",

  // AI/Technology (High CPC: $10-30)
  "AI essay writer",
  "AI homework solver",
  "AI study assistant",
  "machine learning tools",

  // Student Tools (Medium-High CPC: $3-8)
  "free essay writer",
  "plagiarism free paraphraser",
  "grammar checker free",
  "citation generator",
  "note taking app",
];
