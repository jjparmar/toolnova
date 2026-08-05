import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import VocabularyBuilderClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'Vocabulary Builder – Learn New Words Daily Free',
    description: 'Build your vocabulary with daily word lessons. Free vocabulary builder for students preparing for exams.',
    keywords: ['vocabulary builder', 'learn words', 'word of the day', 'GRE vocabulary', 'SAT words'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/vocabulary-builder' },
  openGraph: {
    title: 'Vocabulary Builder – Improve English Vocabulary Free',
    description: 'Learn better words with meanings, examples, and smart practice support.',
    url: 'https://www.toolnovahub.com/tools/vocabulary-builder',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vocabulary Builder – Improve English Vocabulary Free',
    description: 'Learn better words with meanings, examples, and smart practice support.',
  },
};

export default function VocabularyBuilderPage() {
    const toolData = getToolData('vocabulary-builder');

    const toolSchema = getToolSchema(
        toolData?.name || 'vocabulary-builder',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/vocabulary-builder'
    );

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(toolSchema) }} />
            {toolData && (
                <>
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getHowToSchema(`How to use ${toolData.name}`,
                        toolData.description,
                        toolData.howItWorks.map(step => ({
                            name: step.title,
                            text: step.desc,
                            url:`https://www.toolnovahub.com/tools/vocabulary-builder#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <VocabularyBuilderClient />
            {toolData && (
                <ToolRichContent
                    title={toolData.name}
                    description={toolData.description}
                    steps={toolData.howItWorks}
                    benefits={toolData.benefits}
                    faq={toolData.faqs}
                />
            )}

      <RelatedBlogGuides toolSlug="vocabulary-builder" />


            <RelatedTools currentTool="vocabulary-builder" category="Language" />
        </>
    );
}
