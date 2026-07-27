import { Metadata } from "next";
import { RelatedBlogGuides } from "@/components/RelatedBlogGuides";
import {
  getToolSchema,
  getHowToSchema,
  getFAQSchema,
  schemaToJsonLd,
} from "@/lib/schema";
import { getToolData } from "@/data/tools";
import { RelatedTools } from "@/components/RelatedTools";
import CompressPDFClient from "./client";
import { ToolRichContent } from "@/components/ToolRichContent";

export const metadata: Metadata = {
  title: "Compress PDF Online Free – Shrink PDF Size | ToolNova",
  description:
    "Compress PDF files free in your browser. Reduce file size for email and upload portals—no watermark, no signup, files stay private.",
  keywords: [
    "compress pdf",
    "compress pdf to 1mb",
    "reduce pdf file size free",
    "online pdf compressor",
    "shrink pdf online",
  ],
  alternates: {
    canonical: "https://www.toolnovahub.com/tools/compress-pdf",
  },
  openGraph: {
    title: "Compress PDF Online Free | ToolNova",
    description:
      "Shrink PDF file size in your browser. Free, private, no watermark.",
    url: "https://www.toolnovahub.com/tools/compress-pdf",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Compress PDF Free Online | ToolNova",
    description: "Reduce PDF size for portals and email. Private browser tool.",
  },
};

export default function CompressPDFPage() {
  const toolData = getToolData("compress-pdf");

  const toolSchema = getToolSchema(
    toolData?.name || "Compress PDF",
    toolData?.description || "",
    "https://www.toolnovahub.com/tools/compress-pdf",
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(toolSchema) }}
      />
      {toolData && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: schemaToJsonLd(
                getHowToSchema(
                  `How to use ${toolData.name}`,
                  toolData.description,
                  toolData.howItWorks.map((step) => ({
                    name: step.title,
                    text: step.desc,
                    url: `https://www.toolnovahub.com/tools/compress-pdf#step-${step.step}`,
                  })),
                ),
              ),
            }}
          />
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: schemaToJsonLd(getFAQSchema(toolData.faqs)),
            }}
          />
        </>
      )}
      <CompressPDFClient />
      {toolData && (
        <ToolRichContent
          title={toolData.name}
          description={toolData.description}
          steps={toolData.howItWorks}
          benefits={toolData.benefits}
          faq={toolData.faqs}
        />
      )}
      <RelatedBlogGuides toolSlug="compress-pdf" />
      <RelatedTools currentTool="compress-pdf" category="PDF" />
    </>
  );
}
