import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import CaptionGeneratorClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
  title: 'AI Caption Generator – Create Social Media Captions Free | ToolNova',
  description: 'Generate engaging captions for Instagram, TikTok, Twitter and more with our free AI caption generator. Includes hashtags and emojis.',
  keywords: ['AI caption generator', 'Instagram caption generator', 'TikTok captions', 'social media captions'],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/caption-generator' },
  openGraph: {
    title: 'AI Caption Generator – Create Social Captions Free | ToolNova',
    description: 'Generate engaging captions for Instagram, LinkedIn, and more in seconds.',
    url: 'https://www.toolnovahub.com/tools/caption-generator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Caption Generator – Create Social Captions Free | ToolNova',
    description: 'Generate engaging captions for Instagram, LinkedIn, and more in seconds.',
  },
};

export default function CaptionGeneratorPage() {
    const toolData = getToolData('caption-generator');

    const toolSchema = getToolSchema(
        toolData?.name || 'caption-generator',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/caption-generator'
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
                            url:`https://www.toolnovahub.com/tools/caption-generator#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <CaptionGeneratorClient />
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

            <RelatedTools currentTool="caption-generator" category="Writing" />
        </>
    );
}
