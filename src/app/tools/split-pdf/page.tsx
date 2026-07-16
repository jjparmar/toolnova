import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import SplitPDFClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'Split PDF – Extract Pages Free Online | ToolNova',
    description: 'Split PDF files into individual pages or extract specific page ranges. Free, private, and instant.',
    keywords: ['split pdf', 'extract pdf pages', 'pdf splitter', 'separate pdf pages', 'pdf page extractor'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/split-pdf' },
    openGraph: {
        title: 'Split PDF – Extract Pages Free Online | ToolNova',
        description: 'Split PDF files into individual pages or extract specific page ranges. Free, private, and instant.',
        url: 'https://www.toolnovahub.com/tools/split-pdf',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Split PDF Free Online | ToolNova',
        description: 'Extract and split PDF pages instantly. Free and secure.',
    },
};

export default function SplitPDFPage() {
    const toolData = getToolData('split-pdf');

    const toolSchema = getToolSchema(
        toolData?.name || 'split-pdf',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/split-pdf'
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
                            url:`https://www.toolnovahub.com/tools/split-pdf#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <SplitPDFClient />
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
          <Link href="/tools/image-pdf-tools" className="underline underline-offset-4">Image & PDF tools</Link>
          <Link href="/blog" className="underline underline-offset-4">Blog guides</Link>
        </div>
      </section>

            <RelatedTools currentTool="split-pdf" category="PDF" />
        </>
    );
}
