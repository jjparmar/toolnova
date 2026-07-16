import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import TextSimplifierClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'Text Simplifier – Simplify Complex Text Free | ToolNova',
    description: 'Simplify complex text into easy-to-understand language. Free AI tool for making content accessible.',
    keywords: ['text simplifier', 'simplify text', 'plain language', 'easy to read', 'simplify content'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/text-simplifier' },
  openGraph: {
    title: 'Text Simplifier – Simplify Complex Text Free | ToolNova',
    description: 'Rewrite complex text into simple, easy-to-read language instantly.',
    url: 'https://www.toolnovahub.com/tools/text-simplifier',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Text Simplifier – Simplify Complex Text Free | ToolNova',
    description: 'Rewrite complex text into simple, easy-to-read language instantly.',
  },
};

export default function TextSimplifierPage() {
    const toolData = getToolData('text-simplifier');

    const toolSchema = getToolSchema(
        toolData?.name || 'text-simplifier',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/text-simplifier'
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
                            url:`https://www.toolnovahub.com/tools/text-simplifier#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <TextSimplifierClient />
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
          <Link href="/tools/utility-tools" className="underline underline-offset-4">Utility tools</Link>
          <Link href="/blog" className="underline underline-offset-4">Blog guides</Link>
        </div>
      </section>

            <RelatedTools currentTool="text-simplifier" category="Language" />
        </>
    );
}
