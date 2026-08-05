import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { getToolRichProps } from '@/lib/tool-rich-props';
import { RelatedTools } from '@/components/RelatedTools';
import TextSummarizerClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('text-summarizer');

export const metadata: Metadata = {
  title: toolMeta?.title || 'Summarize Any Article or Essay Free – No Signup',
  description:
    toolMeta?.description ||
    'Free text summarizer—no signup. Paste an article or essay and get brief, medium, or detailed summaries.',
  keywords: toolMeta?.keywords || [
    'summarize article free',
    'text summarizer no signup',
    'how to summarize an essay online free',
  ],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/text-summarizer' },
  openGraph: {
    title: `${toolMeta?.title || 'Summarize Any Article Free'} | ToolNova`,
    description:
      toolMeta?.description ||
      'Summarize long text free—brief, medium, or detailed. No signup.',
    url: 'https://www.toolnovahub.com/tools/text-summarizer',
    type: 'website',
    images: [
      {
        url: 'https://www.toolnovahub.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Text Summarizer Free – ToolNova',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${toolMeta?.title || 'Summarize Articles Free'} | ToolNova`,
    description: 'Free article summarizer for students. No signup required.',
  },
};

export default function TextSummarizerPage() {
  const toolData = getToolData('text-summarizer');

  if (!toolData) return <TextSummarizerClient />;

  const rich = getToolRichProps('text-summarizer', toolData);

  const toolSchema = getToolSchema(
    toolData.name,
    toolData.description,
    'https://www.toolnovahub.com/tools/text-summarizer',
  );

  const howToSchema = getHowToSchema(
    'How to Summarize Any Article Free Online',
    toolData.description,
    toolData.howItWorks.map((step) => ({
      name: step.title,
      text: step.desc,
      url: `https://www.toolnovahub.com/tools/text-summarizer#step-${step.step}`,
    })),
  );

  const faqSchema = getFAQSchema(toolData.faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.toolnovahub.com' },
    { name: 'Tools', url: 'https://www.toolnovahub.com/tools' },
    { name: 'Writing Tools', url: 'https://www.toolnovahub.com/tools/writing-tools' },
    { name: 'Text Summarizer', url: 'https://www.toolnovahub.com/tools/text-summarizer' },
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
      <TextSummarizerClient />
      <ToolRichContent {...rich} />
      <RelatedBlogGuides toolSlug="text-summarizer" />
      <RelatedTools currentTool="text-summarizer" category="Writing" />
    </>
  );
}
