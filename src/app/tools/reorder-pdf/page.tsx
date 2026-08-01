import { Metadata } from"next";
import Link from"next/link";
import {
  getToolSchema,
  getHowToSchema,
  getFAQSchema,
  schemaToJsonLd,
} from"@/lib/schema";
import { generateBreadcrumbSchema } from"@/lib/seo-advanced";
import { getOptimizedToolMetadata } from"@/lib/tool-metadata";
import { RelatedTools } from"@/components/RelatedTools";
import { ToolRichContent } from"@/components/ToolRichContent";
import ReorderPdfClient from"./client";

const toolMeta = getOptimizedToolMetadata("reorder-pdf");

const faqs = [
  {
    question:"How do I reorder pages in a PDF free?",
    answer:"Upload your PDF, wait for thumbnails, drag pages into the order you want (or use arrows), then download the reordered file. Everything runs in your browser.",
  },
  {
    question:"Is page quality reduced?",
    answer:"No. Thumbnails are only for preview. The downloaded PDF copies original page objects via pdf-lib without re-rendering content.",
  },
  {
    question:"Is my PDF uploaded?",
    answer:"No. Reordering is 100% client-side for privacy.",
  },
];

const steps = [
  {
    step: 1,
    title:"Upload PDF",
    desc:"Drop a PDF to load page thumbnails.",
  },
  {
    step: 2,
    title:"Reorder",
    desc:"Drag cards or use up/down controls until the sequence is right.",
  },
  {
    step: 3,
    title:"Download",
    desc:"Save a new PDF with pages in your chosen order.",
  },
];

const benefits = [
  {
    title:"Visual thumbnails",
    desc:"See each page before you rearrange.",
  },
  {
    title:"Drag and drop",
    desc:"Intuitive reordering with keyboard-friendly arrow buttons too.",
  },
  {
    title:"Private",
    desc:"Files never leave your device.",
  },
  {
    title:"Free",
    desc:"No account, no watermarks.",
  },
];

export const metadata: Metadata = {
  title: toolMeta?.title || "Reorder PDF Pages Free – Drag Thumbnails Online | ToolNova",
  description: toolMeta?.description || "Reorder PDF pages free with visual thumbnails. Drag and drop pages, reverse or reset order, download instantly. Private browser tool — no signup.",
  keywords: toolMeta?.keywords || ["reorder pdf pages free","rearrange pdf online","drag drop pdf pages","pdf page order changer",
  ],
  alternates: { canonical:"https://www.toolnovahub.com/tools/reorder-pdf" },
  openGraph: {
    title: toolMeta?.title || "Reorder PDF Pages Free | ToolNova",
    description:"Drag thumbnail pages to rearrange your PDF. Free and private.",
    url:"https://www.toolnovahub.com/tools/reorder-pdf",
    type:"website",
  },
};

export default function ReorderPdfPage() {
  const description ="Free online PDF page reorder tool with thumbnails. Drag pages into any order and download — processed privately in your browser.";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaToJsonLd(
            getToolSchema("Reorder PDF Pages",
              description,"https://www.toolnovahub.com/tools/reorder-pdf",
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaToJsonLd(
            getHowToSchema("How to reorder PDF pages online free",
              description,
              steps.map((s) => ({
                name: s.title,
                text: s.desc,
                url:`https://www.toolnovahub.com/tools/reorder-pdf#step-${s.step}`,
              })),
            ),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(faqs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: schemaToJsonLd(
            generateBreadcrumbSchema([
              { name:"Home", url:"https://www.toolnovahub.com" },
              { name:"Tools", url:"https://www.toolnovahub.com/tools" },
              {
                name:"Image & PDF Tools",
                url:"https://www.toolnovahub.com/tools/image-pdf-tools",
              },
              {
                name:"Reorder PDF",
                url:"https://www.toolnovahub.com/tools/reorder-pdf",
              },
            ]),
          ),
        }}
      />
      <ReorderPdfClient />
      <ToolRichContent
        title="Reorder PDF Pages"
        description={description}
        steps={steps}
        benefits={benefits}
        faq={faqs}
      />
      <section className="mx-auto max-w-5xl px-4 py-8 text-sm flex flex-wrap gap-3">
        <Link href="/tools/merge-pdf" className="underline underline-offset-4">
          Merge PDF
        </Link>
        <Link href="/tools/split-pdf" className="underline underline-offset-4">
          Split PDF
        </Link>
        <Link href="/tools/image-pdf-tools" className="underline underline-offset-4">
          All image & PDF tools
        </Link>
      </section>
      <RelatedTools currentTool="reorder-pdf" category="PDF" />
    </>
  );
}
