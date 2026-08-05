import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { getToolRichProps } from '@/lib/tool-rich-props';
import { RelatedTools } from '@/components/RelatedTools';
import SplitPDFClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('split-pdf');

export const metadata: Metadata = {
  title: toolMeta?.title || 'Split PDF into Separate Pages Free – No Watermark',
  description:
    toolMeta?.description ||
    'Split PDF free online—extract pages or ranges with no watermark and no signup. Private browser tool.',
  keywords: toolMeta?.keywords || [
    'split PDF into separate pages free',
    'extract specific pages from PDF free online',
    'free PDF splitter no watermark',
  ],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/split-pdf' },
  openGraph: {
    title: `${toolMeta?.title || 'Split PDF Free – No Watermark'} | ToolNova`,
    description:
      toolMeta?.description ||
      'Extract PDF pages free in your browser. No watermark, no signup.',
    url: 'https://www.toolnovahub.com/tools/split-pdf',
    type: 'website',
    images: [
      {
        url: 'https://www.toolnovahub.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Split PDF Free Online – ToolNova',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${toolMeta?.title || 'Split PDF Free'} | ToolNova`,
    description: 'Extract and split PDF pages free. Private browser tool.',
  },
};

export default function SplitPDFPage() {
  const toolData = getToolData('split-pdf');

  if (!toolData) return <SplitPDFClient />;

  const rich = getToolRichProps('split-pdf', toolData);

  const toolSchema = getToolSchema(
    toolData.name,
    toolData.description,
    'https://www.toolnovahub.com/tools/split-pdf',
  );

  const howToSchema = getHowToSchema(
    'How to Split a PDF into Separate Pages Free',
    toolData.description,
    toolData.howItWorks.map((step) => ({
      name: step.title,
      text: step.desc,
      url: `https://www.toolnovahub.com/tools/split-pdf#step-${step.step}`,
    })),
  );

  const faqSchema = getFAQSchema(toolData.faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.toolnovahub.com' },
    { name: 'Tools', url: 'https://www.toolnovahub.com/tools' },
    { name: 'PDF & Image Tools', url: 'https://www.toolnovahub.com/tools/image-pdf-tools' },
    { name: 'Split PDF', url: 'https://www.toolnovahub.com/tools/split-pdf' },
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
      <SplitPDFClient />
      <ToolRichContent {...rich} />
      <RelatedBlogGuides toolSlug="split-pdf" />
      <RelatedTools currentTool="split-pdf" category="PDF" />
    </>
  );
}
