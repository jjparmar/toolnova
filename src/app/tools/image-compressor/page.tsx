import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { getToolRichProps } from '@/lib/tool-rich-props';
import { RelatedTools } from '@/components/RelatedTools';
import ImageCompressorClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('image-compressor');

export const metadata: Metadata = {
  title: toolMeta?.title || 'Compress Images Without Losing Quality Free',
  description:
    toolMeta?.description ||
    'Compress JPG, PNG & WebP free in your browser—no watermark, no signup. Shrink photos for web, email, and slides.',
  keywords: toolMeta?.keywords || [
    'compress image without losing quality free',
    'reduce image file size online free no watermark',
    'free image compressor for email attachment',
  ],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/image-compressor' },
  openGraph: {
    title: `${toolMeta?.title || 'Compress Images Free'} | ToolNova`,
    description:
      toolMeta?.description ||
      'Reduce image size free without obvious quality loss. Private browser tool.',
    url: 'https://www.toolnovahub.com/tools/image-compressor',
    type: 'website',
    images: [
      {
        url: 'https://www.toolnovahub.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Image Compressor Free – ToolNova',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${toolMeta?.title || 'Compress Images Free'} | ToolNova`,
    description: 'Free image compressor—no watermark, no signup, private.',
  },
};

export default function ImageCompressorPage() {
  const toolData = getToolData('image-compressor');

  if (!toolData) return <ImageCompressorClient />;

  const rich = getToolRichProps('image-compressor', toolData);

  const toolSchema = getToolSchema(
    toolData.name,
    toolData.description,
    'https://www.toolnovahub.com/tools/image-compressor',
  );

  const howToSchema = getHowToSchema(
    'How to Compress Images Without Losing Quality Free',
    toolData.description,
    toolData.howItWorks.map((step) => ({
      name: step.title,
      text: step.desc,
      url: `https://www.toolnovahub.com/tools/image-compressor#step-${step.step}`,
    })),
  );

  const faqSchema = getFAQSchema(toolData.faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.toolnovahub.com' },
    { name: 'Tools', url: 'https://www.toolnovahub.com/tools' },
    { name: 'PDF & Image Tools', url: 'https://www.toolnovahub.com/tools/image-pdf-tools' },
    { name: 'Image Compressor', url: 'https://www.toolnovahub.com/tools/image-compressor' },
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
      <ImageCompressorClient />
      <ToolRichContent {...rich} />
      <RelatedBlogGuides toolSlug="image-compressor" />
      <RelatedTools currentTool="image-compressor" category="Image" />
    </>
  );
}
