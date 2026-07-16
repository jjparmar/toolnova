import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import OneWordSubstitutionClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'One Word Substitution – Replace Phrases with Single Words | ToolNova',
    description: 'Find one word substitutions for phrases. Essential for competitive exams like SSC, Bank, and UPSC.',
    keywords: ['one word substitution', 'competitive exams', 'SSC vocabulary', 'English for exams', 'word meanings'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/one-word-substitution' },
  openGraph: {
    title: 'One Word Substitution Tool – Find Precise Terms Free | ToolNova',
    description: 'Convert long phrases into one precise word for concise and powerful writing.',
    url: 'https://www.toolnovahub.com/tools/one-word-substitution',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'One Word Substitution Tool – Find Precise Terms Free | ToolNova',
    description: 'Convert long phrases into one precise word for concise and powerful writing.',
  },
};

export default function OneWordSubstitutionPage() {
    const toolData = getToolData('one-word-substitution');

    const toolSchema = getToolSchema(
        toolData?.name || 'one-word-substitution',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/one-word-substitution'
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
                            url:`https://www.toolnovahub.com/tools/one-word-substitution#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <OneWordSubstitutionClient />
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

            <RelatedTools currentTool="one-word-substitution" category="Language" />
        </>
    );
}
