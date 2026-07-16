import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import BioGeneratorClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'AI Bio Generator – Create Catchy Social Media Bios Free | ToolNova',
    description: 'Generate catchy bios for Instagram, Twitter, LinkedIn, and more. Free AI bio generator for all social media platforms.',
    keywords: ['bio generator', 'Instagram bio', 'Twitter bio', 'LinkedIn bio', 'social media bio'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/bio-generator' },
  openGraph: {
    title: 'AI Bio Generator – Create Social Media Bios Free | ToolNova',
    description: 'Generate professional and catchy bios for social profiles instantly.',
    url: 'https://www.toolnovahub.com/tools/bio-generator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Bio Generator – Create Social Media Bios Free | ToolNova',
    description: 'Generate professional and catchy bios for social profiles instantly.',
  },
};

export default function BioGeneratorPage() {
    const toolData = getToolData('bio-generator');

    const toolSchema = getToolSchema(
        toolData?.name || 'bio-generator',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/bio-generator'
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
                            url:`https://www.toolnovahub.com/tools/bio-generator#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <BioGeneratorClient />
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

            <RelatedTools currentTool="bio-generator" category="Writing" />
        </>
    );
}
