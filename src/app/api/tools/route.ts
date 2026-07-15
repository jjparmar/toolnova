import { NextResponse } from "next/server";
import { optimizedToolMetadata } from "@/lib/tool-metadata";
import { siteConfig } from "@/config/site";

// Comprehensive tool categories with descriptions
const TOOL_CATEGORIES = {
  writing: {
    name: "Writing Tools",
    description: "AI-powered writing assistants for content creation, editing, and improvement",
    tools: ["text-summarizer", "paraphraser", "grammar-fix", "essay-writer", "email-writer", "speech-writer", "caption-generator", "story-generator", "paragraph-generator", "text-simplifier", "plagiarism-checker"],
  },
  study: {
    name: "Study Tools",
    description: "Educational tools for students to learn, practice, and prepare for exams",
    tools: ["homework-solver", "notes-generator", "flashcard-maker", "quiz-generator", "mcq-generator", "concept-explainer", "chapter-summary", "doubt-solver", "diagram-explainer", "formula-generator", "timetable-generator", "revision-planner", "goal-planner", "todo-list-generator", "youtube-summarizer"],
  },
  language: {
    name: "Language Tools",
    description: "Tools for vocabulary building and language learning",
    tools: ["vocabulary-builder", "synonym-finder", "antonym-finder", "idioms-phrases", "one-word-substitution"],
  },
  career: {
    name: "Career Tools",
    description: "Professional tools for job search, resume writing, and career development",
    tools: ["resume-bullets", "cover-letter-writer", "interview-generator", "bio-generator", "linkedin-optimizer"],
  },
  "pdf-image": {
    name: "PDF & Image Tools",
    description: "Tools for PDF manipulation and image processing",
    tools: ["merge-pdf", "split-pdf", "image-to-pdf", "image-compressor", "jpg-to-png", "png-to-jpg", "resize-image"],
  },
  utility: {
    name: "Utility Tools",
    description: "Handy utilities for everyday tasks",
    tools: ["word-counter", "character-counter", "case-converter", "age-calculator"],
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") || "full";
  const category = searchParams.get("category");

  // Get all tools with enhanced metadata
  const allTools = Object.values(optimizedToolMetadata).map((tool) => ({
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    url: `${siteConfig.url}/tools/${tool.slug}`,
    keywords: tool.keywords,
    category: getCategoryForTool(tool.slug),
    isFree: true,
    requiresAuth: false,
    platform: "Web Browser",
    features: getToolFeatures(tool.slug),
  }));

  // Filter by category if specified
  const filteredTools = category
    ? allTools.filter((t) => t.category.toLowerCase().includes(category.toLowerCase()))
    : allTools;

  // Minimal format for quick lookups
  if (format === "minimal") {
    return NextResponse.json({
      tools: filteredTools.map((t) => ({
        slug: t.slug,
        name: t.name,
        url: t.url,
      })),
      meta: {
        total: filteredTools.length,
        generated_at: new Date().toISOString(),
      },
    });
  }

  // AI-optimized format with structured data
  if (format === "ai") {
    return NextResponse.json({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "ToolNova AI Tools",
      description: "Complete catalog of free AI-powered tools on ToolNova",
      numberOfItems: filteredTools.length,
      itemListElement: filteredTools.map((tool, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "SoftwareApplication",
          name: tool.name,
          description: tool.description,
          url: tool.url,
          applicationCategory: "EducationalApplication",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        },
      })),
      provider: {
        "@type": "Organization",
        name: "ToolNova",
        url: siteConfig.url,
      },
    });
  }

  // Full format (default)
  return NextResponse.json({
    tools: filteredTools,
    categories: TOOL_CATEGORIES,
    meta: {
      total: filteredTools.length,
      totalCategories: Object.keys(TOOL_CATEGORIES).length,
      generated_at: new Date().toISOString(),
      platform: "ToolNova",
      version: "2.0.0",
      documentation: `${siteConfig.url}/openapi.yaml`,
      website: siteConfig.url,
    },
    organization: {
      name: "ToolNovaHub",
      founded: "2024",
      headquarters: "Singapore",
      serviceArea: "Global",
      pricing: "100% Free",
      signUpRequired: false,
    },
  });
}

// Helper function to get category for a tool
function getCategoryForTool(slug: string): string {
  for (const [key, cat] of Object.entries(TOOL_CATEGORIES)) {
    if (cat.tools.includes(slug)) {
      return cat.name;
    }
  }
  return "Utility Tools";
}

// Helper function to get features for a tool
function getToolFeatures(slug: string): string[] {
  const features: Record<string, string[]> = {
    "text-summarizer": ["Instant summarization", "Multiple length options", "Key points extraction", "Multi-language support"],
    "paraphraser": ["Plagiarism-free output", "Multiple modes", "Context preservation", "Synonym suggestions"],
    "grammar-fix": ["Grammar correction", "Spelling check", "Punctuation fix", "Style improvement"],
    "essay-writer": ["Structured essays", "Topic research", "Citation support", "Multiple formats"],
    "homework-solver": ["Step-by-step solutions", "Multiple subjects", "Detailed explanations", "Instant results"],
    "flashcard-maker": ["Auto-generation", "Multiple formats", "Study modes", "Export options"],
    "quiz-generator": ["Multiple question types", "Customizable difficulty", "Instant creation", "Answer keys"],
    "merge-pdf": ["Multiple PDF support", "Drag & drop reorder", "Fast processing", "No quality loss"],
    "split-pdf": ["Page selection", "Range extraction", "Batch processing", "Instant download"],
    "image-compressor": ["Quality preservation", "Multiple formats", "Batch compression", "Size reduction"],
  };
  return features[slug] || ["Free to use", "No sign-up required", "Instant results", "AI-powered"];
}
