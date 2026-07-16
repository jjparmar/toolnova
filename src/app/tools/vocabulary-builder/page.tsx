import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import VocabularyBuilderClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'Vocabulary Builder – Learn New Words Daily Free | ToolNova',
    description: 'Build your vocabulary with daily word lessons. Free vocabulary builder for students preparing for exams.',
    keywords: ['vocabulary builder', 'learn words', 'word of the day', 'GRE vocabulary', 'SAT words'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/vocabulary-builder' },
  openGraph: {
    title: 'Vocabulary Builder – Improve English Vocabulary Free | ToolNova',
    description: 'Learn better words with meanings, examples, and smart practice support.',
    url: 'https://www.toolnovahub.com/tools/vocabulary-builder',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vocabulary Builder – Improve English Vocabulary Free | ToolNova',
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
            

      <section className="mx-auto max-w-5xl px-4 py-8">
        <h2 className="text-xl font-semibold mb-3">Related guides and tools</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/tools" className="underline underline-offset-4">All AI tools</Link>
          <Link href="/tools/writing-tools" className="underline underline-offset-4">Writing tools</Link>
          <Link href="/tools/study-tools" className="underline underline-offset-4">Study tools</Link>
          <Link href="/blog" className="underline underline-offset-4">Blog guides</Link>
        </div>
      </section>

            <RelatedTools currentTool="vocabulary-builder" category="Language" />
        </>
    );
}
