import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import {
  getToolSchema,
  getHowToSchema,
  getFAQSchema,
  schemaToJsonLd,
} from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { getToolRichProps } from '@/lib/tool-rich-props';
import { RelatedTools } from '@/components/RelatedTools';
import CompressPDFClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('compress-pdf');

export const metadata: Metadata = {
  title: toolMeta?.title || 'Compress PDF to 1MB Free Online – No Signup',
  description:
    toolMeta?.description ||
    'Compress PDF online free in your browser. Shrink PDFs for 1MB–5MB portals and email—no watermark, no signup.',
  keywords: toolMeta?.keywords || [
    'compress PDF to 1mb free online',
    'reduce PDF file size free no watermark',
    'shrink PDF for email attachment free',
  ],
  alternates: {
    canonical: 'https://www.toolnovahub.com/tools/compress-pdf',
  },
  openGraph: {
    title: `${toolMeta?.title || 'Compress PDF to 1MB Free Online'} | ToolNova`,
    description:
      toolMeta?.description ||
      'Shrink PDF file size free for portals and email. Private browser tool.',
    url: 'https://www.toolnovahub.com/tools/compress-pdf',
    type: 'website',
    images: [
      {
        url: 'https://www.toolnovahub.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Compress PDF Free Online – ToolNova',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${toolMeta?.title || 'Compress PDF Free Online'} | ToolNova`,
    description: 'Reduce PDF size for portals and email. Private, free, no watermark.',
  },
};

export default function CompressPDFPage() {
  const toolData = getToolData('compress-pdf');

  if (!toolData) return <CompressPDFClient />;

  const rich = getToolRichProps('compress-pdf', toolData);

  const toolSchema = getToolSchema(
    toolData.name,
    toolData.description,
    'https://www.toolnovahub.com/tools/compress-pdf',
  );

  const howToSchema = getHowToSchema(
    'How to Compress PDF Online Free (Hit 1MB Limits)',
    toolData.description,
    toolData.howItWorks.map((step) => ({
      name: step.title,
      text: step.desc,
      url: `https://www.toolnovahub.com/tools/compress-pdf#step-${step.step}`,
    })),
  );

  const faqSchema = getFAQSchema(toolData.faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.toolnovahub.com' },
    { name: 'Tools', url: 'https://www.toolnovahub.com/tools' },
    { name: 'PDF & Image Tools', url: 'https://www.toolnovahub.com/tools/image-pdf-tools' },
    { name: 'Compress PDF', url: 'https://www.toolnovahub.com/tools/compress-pdf' },
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
      <CompressPDFClient />
      <ToolRichContent {...rich} />
      <RelatedBlogGuides toolSlug="compress-pdf" />
      <RelatedTools currentTool="compress-pdf" category="PDF" />
    </>
  );
}
