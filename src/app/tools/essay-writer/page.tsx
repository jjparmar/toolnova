import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { getToolRichProps } from '@/lib/tool-rich-props';
import { RelatedTools } from '@/components/RelatedTools';
import EssayWriterClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('essay-writer');

export const metadata: Metadata = {
  title: toolMeta?.title || 'Write a Free Essay Online – AI Essay Generator',
  description:
    toolMeta?.description ||
    'Free AI essay writer for students—no login to start. Structured draft with intro, body, conclusion. Rewrite in your voice and cite real sources.',
  keywords: toolMeta?.keywords || [
    'write essay online free for students',
    'free AI essay generator for high school',
    'AI essay writer no login',
  ],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/essay-writer' },
  openGraph: {
    title: `${toolMeta?.title || 'Write a Free Essay Online'} | ToolNova`,
    description:
      toolMeta?.description ||
      'Generate a structured essay draft free, then personalize and cite sources.',
    url: 'https://www.toolnovahub.com/tools/essay-writer',
    type: 'website',
    images: [
      {
        url: 'https://www.toolnovahub.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Essay Writer – ToolNova',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${toolMeta?.title || 'Write a Free Essay Online'} | ToolNova`,
    description: 'Free AI essay generator for students. Draft, rewrite, cite.',
  },
};

export default function EssayWriterPage() {
  const toolData = getToolData('essay-writer');

  if (!toolData) return <EssayWriterClient />;

  const rich = getToolRichProps('essay-writer', toolData);

  const toolSchema = getToolSchema(
    toolData.name,
    toolData.description,
    'https://www.toolnovahub.com/tools/essay-writer',
  );

  const howToSchema = getHowToSchema(
    'How to Write a Free Essay Online with AI (Ethically)',
    toolData.description,
    toolData.howItWorks.map((step) => ({
      name: step.title,
      text: step.desc,
      url: `https://www.toolnovahub.com/tools/essay-writer#step-${step.step}`,
    })),
  );

  const faqSchema = getFAQSchema(toolData.faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.toolnovahub.com' },
    { name: 'Tools', url: 'https://www.toolnovahub.com/tools' },
    { name: 'Writing Tools', url: 'https://www.toolnovahub.com/tools/writing-tools' },
    { name: 'Essay Writer', url: 'https://www.toolnovahub.com/tools/essay-writer' },
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
      <EssayWriterClient />
      <ToolRichContent {...rich} />
      <RelatedBlogGuides toolSlug="essay-writer" />
      <RelatedTools currentTool="essay-writer" category="Writing" />
    </>
  );
}
