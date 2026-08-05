import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { getToolRichProps } from '@/lib/tool-rich-props';
import { RelatedTools } from '@/components/RelatedTools';
import MergePDFClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('merge-pdf');

export const metadata: Metadata = {
  title: toolMeta?.title || 'Merge PDF Files Online Free – No Watermark',
  description:
    toolMeta?.description ||
    'Merge PDF files online free—no watermark, no signup. Drag to reorder, combine multiple PDFs in your browser, download one file.',
  keywords: toolMeta?.keywords || [
    'merge PDF files online free no watermark',
    'join multiple PDF into one free online',
    'combine PDF files without watermark free',
  ],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/merge-pdf' },
  openGraph: {
    title: `${toolMeta?.title || 'Merge PDF Files Online Free – No Watermark'} | ToolNova`,
    description:
      toolMeta?.description ||
      'Merge PDF files online free—no watermark, no signup. Private browser merge.',
    url: 'https://www.toolnovahub.com/tools/merge-pdf',
    type: 'website',
    images: [
      {
        url: 'https://www.toolnovahub.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Merge PDF Free Online – ToolNova',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${toolMeta?.title || 'Merge PDF Files Online Free'} | ToolNova`,
    description: 'Combine multiple PDFs free—no watermark, no signup, private browser tool.',
  },
};

export default function MergePDFPage() {
  const toolData = getToolData('merge-pdf');

  if (!toolData) return <MergePDFClient />;

  const rich = getToolRichProps('merge-pdf', toolData);

  const toolSchema = getToolSchema(
    toolData.name,
    toolData.description,
    'https://www.toolnovahub.com/tools/merge-pdf',
  );

  const howToSchema = getHowToSchema(
    'How to Merge PDF Files Online Free (No Watermark)',
    toolData.description,
    toolData.howItWorks.map((step) => ({
      name: step.title,
      text: step.desc,
      url: `https://www.toolnovahub.com/tools/merge-pdf#step-${step.step}`,
    })),
  );

  const faqSchema = getFAQSchema(toolData.faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.toolnovahub.com' },
    { name: 'Tools', url: 'https://www.toolnovahub.com/tools' },
    { name: 'PDF & Image Tools', url: 'https://www.toolnovahub.com/tools/image-pdf-tools' },
    { name: 'Merge PDF', url: 'https://www.toolnovahub.com/tools/merge-pdf' },
  ]);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(breadcrumbSchema) }}
      />
      <MergePDFClient />
      <ToolRichContent {...rich} />
      <RelatedBlogGuides toolSlug="merge-pdf" />
      <RelatedTools currentTool="merge-pdf" category="PDF" />
    </>
  );
}
