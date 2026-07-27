import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { RelatedTools } from '@/components/RelatedTools';
import FlashcardMakerClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('flashcard-maker');

export const metadata: Metadata = {
  title: toolMeta?.title || 'Make Flashcards from Notes Automatically Free | ToolNova',
  description: toolMeta?.description || 'Paste your notes or a textbook chapter and instantly generate question-and-answer flashcards. Perfect for spaced repetition and exam prep. Free, no account needed.',
  keywords: toolMeta?.keywords || ['make flashcards from notes automatically free', 'generate flashcards from textbook chapter', 'free digital flashcard maker no signup', 'automatic flashcard generator for exams'],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/flashcard-maker' },
  openGraph: {
    title: toolMeta?.title || 'Make Flashcards from Notes Automatically Free | ToolNova',
    description: toolMeta?.description || 'Paste your notes and instantly generate Q&A flashcards for spaced repetition and exam prep.',
    url: 'https://www.toolnovahub.com/tools/flashcard-maker',
    type: 'website',
    images: [{ url: 'https://www.toolnovahub.com/og-image.png', width: 1200, height: 630, alt: 'Flashcard Maker – ToolNova' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: toolMeta?.title || 'Make Flashcards from Notes Free | ToolNova',
    description: 'Generate study flashcards automatically from notes. Perfect for exam prep.',
  },
};

export default function FlashcardMakerPage() {
    const toolData = getToolData('flashcard-maker');

    if (!toolData) return <FlashcardMakerClient />;

    const toolSchema = getToolSchema(
        toolData.name,
        toolData.description,
        'https://www.toolnovahub.com/tools/flashcard-maker'
    );

    const howToSchema = getHowToSchema(`How to Make Flashcards from Notes Automatically`,
        toolData.description,
        toolData.howItWorks.map(step => ({
            name: step.title,
            text: step.desc,
            url:`https://www.toolnovahub.com/tools/flashcard-maker#step-${step.step}`
        }))
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
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(toolSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(breadcrumbSchema) }} />
            <FlashcardMakerClient />
            <ToolRichContent
                title={toolData.name}
                description={toolData.description}
                steps={toolData.howItWorks}
                benefits={toolData.benefits}
                faq={toolData.faqs}
            />

      <RelatedBlogGuides toolSlug="flashcard-maker" />


            <RelatedTools currentTool="flashcard-maker" category="Study" />
        </>
    );
}
