import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import WordCounterClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
  title: 'Word Counter Free – Count Words & Characters | ToolNova',
  description: 'Free word counter tool. Count words, characters, sentences, and paragraphs instantly. Perfect for essays, assignments, and content writing.',
  keywords: ['word counter', 'character counter', 'word count tool', 'text counter'],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/word-counter' },
  openGraph: {
    title: 'Word Counter – Count Words and Characters Free | ToolNova',
    description: 'Count words, characters, sentences, and reading time instantly.',
    url: 'https://www.toolnovahub.com/tools/word-counter',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Word Counter – Count Words and Characters Free | ToolNova',
    description: 'Count words, characters, sentences, and reading time instantly.',
  },
};

export default function WordCounterPage() {
    const toolData = getToolData('word-counter');

    const toolSchema = getToolSchema(
        toolData?.name || 'word-counter',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/word-counter'
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
                            url:`https://www.toolnovahub.com/tools/word-counter#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <WordCounterClient />
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
          <Link href="/tools/career-tools" className="underline underline-offset-4">Career tools</Link>
          <Link href="/tools/writing-tools" className="underline underline-offset-4">Writing tools</Link>
          <Link href="/blog" className="underline underline-offset-4">Blog guides</Link>
        </div>
      </section>

            <RelatedTools currentTool="word-counter" category="Utility" />
        </>
    );
}
