/**
 * ToolSEO Component - Dynamic SEO schemas for tool pages
 * Implements AEO, GEO, and Google Discover optimization
 */

import Script from"next/script";
import { siteConfig, getFullUrl } from"@/config/site";
import {
  generateToolPageSchemas,
  combineSchemas,
  generateFAQSchema,
  generateHowToSchema,
  generateBreadcrumbSchema,
  generateWebPageSchema,
  generateSoftwareApplicationSchema,
  generateProductSchema,
  type FAQItem,
  type HowToStep,
  type BreadcrumbItem,
} from"@/lib/seo-advanced";
import { getToolFAQ } from"@/lib/tool-faq-data";

interface ToolSEOProps {
  toolSlug: string;
  toolName: string;
  toolDescription: string;
  toolCategory: string;
  toolKeywords?: string[];
  customFAQ?: FAQItem[];
  howToSteps?: HowToStep[];
}

/**
 * Generates comprehensive structured data for tool pages
 */
export function ToolSEO({
  toolSlug,
  toolName,
  toolDescription,
  toolCategory,
  toolKeywords = [],
  customFAQ,
  howToSteps,
}: ToolSEOProps) {
  const url = getFullUrl(`/tools/${toolSlug}`);

  // Get FAQ data
  const faqItems = customFAQ || getToolFAQ(toolSlug);

  // Generate all schemas
  const schemas = generateToolPageSchemas(
    toolName,
    toolDescription,
    toolSlug,
    toolCategory,
    faqItems,
    howToSteps
  );

  // Combine schemas into @graph
  const combinedSchema = {"@context":"https://schema.org","@graph": schemas,
  };

  // Generate speakable content for voice search
  const speakableContent =`${toolName} is a free AI-powered tool on ToolNova. ${toolDescription} No sign-up required. Visit ${url} to use it now.`;

  return (
    <>
      {/* Main Schema Script */}
      <Script
        id={`tool-schema-${toolSlug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(combinedSchema),
        }}
      />

      {/* Speakable Specification for Voice Search */}
      <Script
        id={`speakable-schema-${toolSlug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({"@context":"https://schema.org","@type":"SpeakableSpecification",
            cssSelector: [".tool-description",".hero-text",".speakable-content"],
            xpath: ["/html/head/title","/html/head/meta[@name='description']/@content"],
          }),
        }}
      />

      <meta name="tool-category" content={toolCategory} />
      <meta name="tool-slug" content={toolSlug} />
    </>
  );
}

/**
 * Generates FAQ-only schema for simpler use cases
 */
export function ToolFAQSchema({
  toolSlug,
  customFAQ,
}: {
  toolSlug: string;
  customFAQ?: FAQItem[];
}) {
  const faqItems = customFAQ || getToolFAQ(toolSlug);

  if (faqItems.length === 0) return null;

  return (
    <Script
      id={`faq-schema-${toolSlug}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateFAQSchema(faqItems)),
      }}
    />
  );
}

/**
 * Generates HowTo schema for step-by-step guides
 */
export function ToolHowToSchema({
  name,
  description,
  steps,
  toolSlug,
}: {
  name: string;
  description: string;
  steps: HowToStep[];
  toolSlug?: string;
}) {
  return (
    <Script
      id={`howto-schema-${toolSlug || name.toLowerCase().replace(/\s+/g,"-")}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(
          generateHowToSchema(name, description, steps,"PT5M", toolSlug)
        ),
      }}
    />
  );
}

/**
 * Generates breadcrumb schema for navigation
 */
export function ToolBreadcrumbSchema({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(generateBreadcrumbSchema(items)),
      }}
    />
  );
}

/**
 * Generates speakable text content for voice assistants
 * Use this component to wrap content that should be speakable
 */
export function SpeakableContent({
  children,
  className ="",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`speakable-content ${className}`} data-speakable="true">
      {children}
    </div>
  );
}

/**
 * Predefined breadcrumb configurations for common tool paths
 */
export const toolBreadcrumbs = {
  home: (url: string): BreadcrumbItem[] => [
    { name:"Home", url: siteConfig.url },
  ],
  
  tools: (): BreadcrumbItem[] => [
    { name:"Home", url: siteConfig.url },
    { name:"Tools", url:`${siteConfig.url}/tools` },
  ],
  
  tool: (name: string, slug: string): BreadcrumbItem[] => [
    { name:"Home", url: siteConfig.url },
    { name:"Tools", url:`${siteConfig.url}/tools` },
    { name, url: getFullUrl(`/tools/${slug}`) },
  ],
  
  categoryTool: (
    categoryName: string,
    categorySlug: string,
    toolName: string,
    toolSlug: string
  ): BreadcrumbItem[] => [
    { name:"Home", url: siteConfig.url },
    { name:"Tools", url:`${siteConfig.url}/tools` },
    { name: categoryName, url: getFullUrl(`/tools/${categorySlug}`) },
    { name: toolName, url: getFullUrl(`/tools/${toolSlug}`) },
  ],
  
  blog: (): BreadcrumbItem[] => [
    { name:"Home", url: siteConfig.url },
    { name:"Blog", url:`${siteConfig.url}/blog` },
  ],
  
  blogPost: (title: string, slug: string): BreadcrumbItem[] => [
    { name:"Home", url: siteConfig.url },
    { name:"Blog", url:`${siteConfig.url}/blog` },
    { name: title, url: getFullUrl(`/blog/${slug}`) },
  ],
};

/**
 * Default HowTo steps for common tool usage
 */
export const defaultToolHowToSteps: HowToStep[] = [
  {
    name:"Enter Your Content",
    text:"Paste or type your content into the input field above. The tool accepts text, documents, or URLs depending on the tool type.",
  },
  {
    name:"Configure Options",
    text:"Adjust any available options such as output length, style, or format to customize your results.",
  },
  {
    name:"Generate Results",
    text:"Click the 'Generate' button to process your input with AI. Results typically appear within seconds.",
  },
  {
    name:"Copy or Download",
    text:"Use the copy button to copy results to clipboard, or download as a file for offline use.",
  },
];

export default ToolSEO;
