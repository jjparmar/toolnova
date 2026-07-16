import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import DiagramExplainerClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'AI Diagram Explainer – Understand Visual Concepts Free | ToolNova',
    description: 'Get detailed explanations of complex diagrams and visual concepts. Perfect for biology, chemistry, physics, and more.',
    keywords: ['diagram explainer', 'explain diagrams', 'visual learning', 'biology diagrams', 'science diagrams'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/diagram-explainer' },
  openGraph: {
    title: 'AI Diagram Explainer – Understand Diagrams Instantly | ToolNova',
    description: 'Explain charts, biology diagrams, and visual concepts in simple language.',
    url: 'https://www.toolnovahub.com/tools/diagram-explainer',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Diagram Explainer – Understand Diagrams Instantly | ToolNova',
    description: 'Explain charts, biology diagrams, and visual concepts in simple language.',
  },
};

export default function DiagramExplainerPage() {
    const toolData = getToolData('diagram-explainer');

    const toolSchema = getToolSchema(
        toolData?.name || 'diagram-explainer',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/diagram-explainer'
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
                            url:`https://www.toolnovahub.com/tools/diagram-explainer#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <DiagramExplainerClient />
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

            <RelatedTools currentTool="diagram-explainer" category="Study" />
        </>
    );
}
