import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import CaseConverterClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
  title: 'Case Converter Free – Change Text Case Online | ToolNova',
  description: 'Free case converter. Convert text to UPPERCASE, lowercase, Title Case, Sentence case, and more. Instant conversion.',
  keywords: ['case converter', 'text case changer', 'uppercase converter', 'lowercase converter'],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/case-converter' },
  openGraph: {
    title: 'Case Converter – Change Text Case Instantly Free | ToolNova',
    description: 'Convert text to uppercase, lowercase, title case, and sentence case instantly.',
    url: 'https://www.toolnovahub.com/tools/case-converter',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Converter – Change Text Case Instantly Free | ToolNova',
    description: 'Convert text to uppercase, lowercase, title case, and sentence case instantly.',
  },
};

export default function CaseConverterPage() {
    const toolData = getToolData('case-converter');

    const toolSchema = getToolSchema(
        toolData?.name || 'case-converter',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/case-converter'
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
                            url:`https://www.toolnovahub.com/tools/case-converter#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <CaseConverterClient />
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

            <RelatedTools currentTool="case-converter" category="Utility" />
        </>
    );
}
