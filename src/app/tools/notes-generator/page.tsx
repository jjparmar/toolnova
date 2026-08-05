import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { getToolRichProps } from '@/lib/tool-rich-props';
import { RelatedTools } from '@/components/RelatedTools';
import NotesGeneratorClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('notes-generator');

export const metadata: Metadata = {
  title: toolMeta?.title || 'Generate Study Notes from Any Topic Free – AI',
  description:
    toolMeta?.description ||
    'Free AI study notes from topics, lectures, or textbook text. Organized for exam prep—no login to start.',
  keywords: toolMeta?.keywords || [
    'generate study notes from any topic free',
    'AI study notes generator for students',
    'make organized notes from text free',
  ],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/notes-generator' },
  openGraph: {
    title: `${toolMeta?.title || 'Generate Study Notes Free'} | ToolNova`,
    description:
      toolMeta?.description ||
      'AI study notes generator free for students. Structured headings & bullets.',
    url: 'https://www.toolnovahub.com/tools/notes-generator',
    type: 'website',
    images: [
      {
        url: 'https://www.toolnovahub.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Notes Generator Free – ToolNova',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${toolMeta?.title || 'Study Notes Generator Free'} | ToolNova`,
    description: 'Generate organized study notes free. No login required to start.',
  },
};

export default function NotesGeneratorPage() {
  const toolData = getToolData('notes-generator');

  if (!toolData) return <NotesGeneratorClient />;

  const rich = getToolRichProps('notes-generator', toolData);

  const toolSchema = getToolSchema(
    toolData.name,
    toolData.description,
    'https://www.toolnovahub.com/tools/notes-generator',
  );

  const howToSchema = getHowToSchema(
    'How to Generate Study Notes from Any Topic Free',
    toolData.description,
    toolData.howItWorks.map((step) => ({
      name: step.title,
      text: step.desc,
      url: `https://www.toolnovahub.com/tools/notes-generator#step-${step.step}`,
    })),
  );

  const faqSchema = getFAQSchema(toolData.faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.toolnovahub.com' },
    { name: 'Tools', url: 'https://www.toolnovahub.com/tools' },
    { name: 'Study Tools', url: 'https://www.toolnovahub.com/tools/study-tools' },
    { name: 'Notes Generator', url: 'https://www.toolnovahub.com/tools/notes-generator' },
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
      <NotesGeneratorClient />
      <ToolRichContent {...rich} />
      <RelatedBlogGuides toolSlug="notes-generator" />
      <RelatedTools currentTool="notes-generator" category="Study" />
    </>
  );
}
