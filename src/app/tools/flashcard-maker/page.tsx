import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { getToolRichProps } from '@/lib/tool-rich-props';
import { RelatedTools } from '@/components/RelatedTools';
import FlashcardMakerClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('flashcard-maker');

export const metadata: Metadata = {
  title: toolMeta?.title || 'Make Flashcards from Notes Automatically Free',
  description:
    toolMeta?.description ||
    'Paste notes or a textbook chapter and auto-generate Q&A flashcards for exam prep. Free—no signup required to start.',
  keywords: toolMeta?.keywords || [
    'make flashcards from notes automatically free',
    'generate flashcards from textbook chapter',
    'free digital flashcard maker no signup',
  ],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/flashcard-maker' },
  openGraph: {
    title: `${toolMeta?.title || 'Make Flashcards from Notes Free'} | ToolNova`,
    description:
      toolMeta?.description ||
      'Generate study flashcards automatically from notes. Perfect for exam prep.',
    url: 'https://www.toolnovahub.com/tools/flashcard-maker',
    type: 'website',
    images: [
      {
        url: 'https://www.toolnovahub.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Flashcard Maker – ToolNova',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${toolMeta?.title || 'Make Flashcards from Notes Free'} | ToolNova`,
    description: 'Auto-generate Q&A flashcards from notes for spaced repetition.',
  },
};

export default function FlashcardMakerPage() {
  const toolData = getToolData('flashcard-maker');

  if (!toolData) return <FlashcardMakerClient />;

  const rich = getToolRichProps('flashcard-maker', toolData);

  const toolSchema = getToolSchema(
    toolData.name,
    toolData.description,
    'https://www.toolnovahub.com/tools/flashcard-maker',
  );

  const howToSchema = getHowToSchema(
    'How to Make Flashcards from Notes Automatically Free',
    toolData.description,
    toolData.howItWorks.map((step) => ({
      name: step.title,
      text: step.desc,
      url: `https://www.toolnovahub.com/tools/flashcard-maker#step-${step.step}`,
    })),
  );

  const faqSchema = getFAQSchema(toolData.faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.toolnovahub.com' },
    { name: 'Tools', url: 'https://www.toolnovahub.com/tools' },
    { name: 'Study Tools', url: 'https://www.toolnovahub.com/tools/study-tools' },
    { name: 'Flashcard Maker', url: 'https://www.toolnovahub.com/tools/flashcard-maker' },
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
      <FlashcardMakerClient />
      <ToolRichContent {...rich} />
      <RelatedBlogGuides toolSlug="flashcard-maker" />
      <RelatedTools currentTool="flashcard-maker" category="Study" />
    </>
  );
}
