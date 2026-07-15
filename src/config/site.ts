// Site configuration for ToolNova - Single source of truth for all SEO/branding constants
// Note: exact tool count lives in @/data/tools (TOOL_COUNT / TOOL_COUNT_LABEL).

export const siteConfig = {
  // Core identity
  name: "ToolNova",
  tagline: "The Smartest Way to Study & Create",
  description:
    "Access free AI-powered tools for students and professionals. Merge PDFs, create flashcards, fix grammar, write essays, solve homework. No sign-up required.",

  // Canonical domain - THE single source of truth for all URLs
  url: "https://www.toolnovahub.com",
  domain: "toolnovahub.com",

  // Assets
  ogImage: "https://www.toolnovahub.com/og-image.png",
  logo: "https://www.toolnovahub.com/logo.png",
  logoAlt: "ToolNova - Free AI Tools Hub",

  // Social profiles (used in schema.org sameAs and footer links)
  links: {
    twitter: "https://twitter.com/toolnovahub",
    github: "https://github.com/toolnovahub",
    linkedin: "https://linkedin.com/company/toolnovahub",
  },

  // Social handles
  twitterHandle: "@toolnovahub",

  // Contact
  author: {
    name: "ToolNova Team",
    email: "support@toolnovahub.com",
    url: "https://www.toolnovahub.com/about",
  },

  // Location (for LocalBusiness schema if needed)
  location: {
    name: "ToolNova Inc.",
    region: "Singapore",
  },

  // SEO defaults
  locale: "en_US",
  language: "en",
  category: "Productivity",
  applicationCategory: "EducationalApplication",

  // Default keywords (shared across pages)
  keywords: [
    "AI tools",
    "free AI tools",
    "AI writing assistant",
    "AI study tools",
    "productivity tools",
    "text summarizer",
    "paraphraser",
    "grammar checker",
    "essay writer",
    "homework solver",
    "flashcard maker",
    "PDF tools",
    "ToolNova",
  ],

  // Analytics
  googleAnalyticsId: "G-58TZZZDYJ7",

  // Verification codes
  verification: {
    google: "google299d0fa42c6b8fbb",
    bing: "0FEE172B08E59C4D96EC21C37F806047",
    yandex: "0b721ef630b02011",
  },
} as const;

// Helper to build full URLs from paths
export function getFullUrl(path: string = ""): string {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteConfig.url}${cleanPath === "/" ? "" : cleanPath}`;
}

// Helper to build canonical URL for a tool
export function getToolUrl(slug: string): string {
  return getFullUrl(`/tools/${slug}`);
}

// Helper to build canonical URL for a blog post
export function getBlogUrl(slug: string): string {
  return getFullUrl(`/blog/${slug}`);
}

export type SiteConfig = typeof siteConfig;
