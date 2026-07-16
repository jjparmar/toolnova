import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import ConceptExplainerClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'AI Concept Explainer – Simplify Complex Topics Free | ToolNova',
    description: 'Break down complex concepts into simple explanations with our free AI concept explainer. Perfect for students at any level.',
    keywords: ['concept explainer', 'explain topics simply', 'learning tool', 'study help', 'simplify concepts'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/concept-explainer' },
  openGraph: {
    title: 'AI Concept Explainer – Explain Any Topic Simply | ToolNova',
    description: 'Break down complex topics into simple explanations with examples.',
    url: 'https://www.toolnovahub.com/tools/concept-explainer',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Concept Explainer – Explain Any Topic Simply | ToolNova',
    description: 'Break down complex topics into simple explanations with examples.',
  },
};

export default function ConceptExplainerPage() {
    const toolData = getToolData('concept-explainer');

    const toolSchema = getToolSchema(
        toolData?.name || 'concept-explainer',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/concept-explainer'
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
                            url:`https://www.toolnovahub.com/tools/concept-explainer#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <ConceptExplainerClient />
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
          <Link href="/tools/study-tools" className="underline underline-offset-4">Study tools</Link>
          <Link href="/tools/writing-tools" className="underline underline-offset-4">Writing tools</Link>
          <Link href="/blog" className="underline underline-offset-4">Blog guides</Link>
        </div>
      </section>

            <RelatedTools currentTool="concept-explainer" category="Study" />
        </>
    );
}
