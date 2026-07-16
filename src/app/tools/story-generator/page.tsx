import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import StoryGeneratorClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
  title: 'AI Story Generator – Create Stories Free | ToolNova',
  description: 'Generate captivating stories in any genre with our free AI story generator. Fantasy, sci-fi, mystery, romance and more.',
  keywords: ['AI story generator', 'story writer', 'creative writing AI', 'fiction generator'],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/story-generator' },
  openGraph: {
    title: 'AI Story Generator – Create Stories Instantly Free | ToolNova',
    description: 'Generate creative stories with prompts, tone, and style instantly.',
    url: 'https://www.toolnovahub.com/tools/story-generator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Story Generator – Create Stories Instantly Free | ToolNova',
    description: 'Generate creative stories with prompts, tone, and style instantly.',
  },
};

export default function StoryGeneratorPage() {
    const toolData = getToolData('story-generator');

    const toolSchema = getToolSchema(
        toolData?.name || 'story-generator',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/story-generator'
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
                            url:`https://www.toolnovahub.com/tools/story-generator#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <StoryGeneratorClient />
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

            <RelatedTools currentTool="story-generator" category="Writing" />
        </>
    );
}
