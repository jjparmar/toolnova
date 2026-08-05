import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { getToolRichProps } from '@/lib/tool-rich-props';
import { RelatedTools } from '@/components/RelatedTools';
import ImageToPDFClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('image-to-pdf');

export const metadata: Metadata = {
  title: toolMeta?.title || 'Convert Images to PDF Free Online – No Watermark',
  description:
    toolMeta?.description ||
    'Convert JPG/PNG to PDF free—combine multiple images into one file. No watermark, no signup. Private browser converter.',
  keywords: toolMeta?.keywords || [
    'convert images to PDF free no watermark',
    'JPG PNG to PDF converter free online',
    'combine multiple images into one PDF free',
  ],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/image-to-pdf' },
  openGraph: {
    title: `${toolMeta?.title || 'Convert Images to PDF Free'} | ToolNova`,
    description:
      toolMeta?.description ||
      'JPG/PNG to PDF free—no watermark, combine multiple images.',
    url: 'https://www.toolnovahub.com/tools/image-to-pdf',
    type: 'website',
    images: [
      {
        url: 'https://www.toolnovahub.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Image to PDF Free – ToolNova',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${toolMeta?.title || 'Image to PDF Free'} | ToolNova`,
    description: 'Convert photos and scans to PDF free. No watermark.',
  },
};

export default function ImageToPDFPage() {
  const toolData = getToolData('image-to-pdf');

  if (!toolData) return <ImageToPDFClient />;

  const rich = getToolRichProps('image-to-pdf', toolData);

  const toolSchema = getToolSchema(
    toolData.name,
    toolData.description,
    'https://www.toolnovahub.com/tools/image-to-pdf',
  );

  const howToSchema = getHowToSchema(
    'How to Convert Images to PDF Free Online (No Watermark)',
    toolData.description,
    toolData.howItWorks.map((step) => ({
      name: step.title,
      text: step.desc,
      url: `https://www.toolnovahub.com/tools/image-to-pdf#step-${step.step}`,
    })),
  );

  const faqSchema = getFAQSchema(toolData.faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.toolnovahub.com' },
    { name: 'Tools', url: 'https://www.toolnovahub.com/tools' },
    { name: 'PDF & Image Tools', url: 'https://www.toolnovahub.com/tools/image-pdf-tools' },
    { name: 'Image to PDF', url: 'https://www.toolnovahub.com/tools/image-to-pdf' },
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
      <ImageToPDFClient />
      <ToolRichContent {...rich} />
      <RelatedBlogGuides toolSlug="image-to-pdf" />
      <RelatedTools currentTool="image-to-pdf" category="PDF" />
    </>
  );
}
