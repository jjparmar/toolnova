import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import StoryGeneratorClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
  title: 'AI Story Generator – Create Stories Free',
  description: 'Generate captivating stories in any genre with our free AI story generator. Fantasy, sci-fi, mystery, romance and more.',
  keywords: ['AI story generator', 'story writer', 'creative writing AI', 'fiction generator'],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/story-generator' },
  openGraph: {
    title: 'AI Story Generator – Create Stories Instantly Free',
    description: 'Generate creative stories with prompts, tone, and style instantly.',
    url: 'https://www.toolnovahub.com/tools/story-generator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Story Generator – Create Stories Instantly Free',
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

      <RelatedBlogGuides toolSlug="story-generator" />


            <RelatedTools currentTool="story-generator" category="Writing" />
        </>
    );
}
