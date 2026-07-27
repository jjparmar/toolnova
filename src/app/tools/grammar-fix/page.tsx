import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { Metadata } from"next";
import {
  getToolSchema,
  getHowToSchema,
  getFAQSchema,
  schemaToJsonLd,
} from"@/lib/schema";
import { getToolData } from"@/data/tools";
import { getOptimizedToolMetadata } from"@/lib/tool-metadata";
import { RelatedTools } from"@/components/RelatedTools";
import GrammarFixClient from"./client";
import { ToolRichContent } from"@/components/ToolRichContent";

const toolMeta = getOptimizedToolMetadata("grammar-fix");

export const metadata: Metadata = {
  title:
    toolMeta?.title ||"AI Grammar Fix – Fix Grammar Errors Free | ToolNova",
  description:
    toolMeta?.description ||"Fix grammar, spelling, and punctuation errors instantly with our free AI grammar checker. Perfect for essays, emails, and documents. Professional results, fast.",
  keywords: toolMeta?.keywords || ["AI grammar fix","grammar checker","spelling correction","punctuation fix","proofreading tool",
  ],
  alternates: { canonical:"https://www.toolnovahub.com/tools/grammar-fix" },
  openGraph: {
    title:
      toolMeta?.title ||"AI Grammar Fix – Fix Grammar Errors Free | ToolNova",
    description:
      toolMeta?.description ||"Fix grammar, spelling, and punctuation errors instantly with our free AI grammar checker.",
    url:"https://www.toolnovahub.com/tools/grammar-fix",
    type:"website",
    images: [
      {
        url:"https://www.toolnovahub.com/og-image.png",
        width: 1200,
        height: 630,
        alt:"AI Grammar Checker – ToolNova",
      },
    ],
  },
  twitter: {
    card:"summary_large_image",
    title:"AI Grammar Fix Free | ToolNova",
    description:"Fix grammar and spelling instantly for essays, emails, and documents.",
  },
};

export default function GrammarFixPage() {
  const toolData = getToolData("grammar-fix");

  if (!toolData) return <GrammarFixClient />;

  const toolSchema = getToolSchema(
    toolData.name,
    toolData.description,"https://www.toolnovahub.com/tools/grammar-fix",
  );

  const howToSchema = getHowToSchema(`How to use ${toolData.name}`,
    toolData.description,
    toolData.howItWorks.map((step) => ({
      name: step.title,
      text: step.desc,
      url:`https://www.toolnovahub.com/tools/grammar-fix#step-${step.step}`,
    })),
  );

  const faqSchema = getFAQSchema(toolData.faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(faqSchema) }}
      />
      <GrammarFixClient />

      <ToolRichContent
        title={toolData.name}
        description={toolData.description}
        steps={toolData.howItWorks}
        benefits={toolData.benefits}
        faq={toolData.faqs}
      />

      <RelatedBlogGuides toolSlug="grammar-fix" />


      <RelatedTools currentTool="grammar-fix" category="Writing" />
    </>
  );
}
