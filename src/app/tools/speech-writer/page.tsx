import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import SpeechWriterClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
  title: 'AI Speech Writer – Write Speeches Free | ToolNova',
  description: 'Write compelling speeches for any occasion with our free AI speech writer. Wedding, graduation, business and more.',
  keywords: ['AI speech writer', 'speech generator', 'wedding speech', 'graduation speech'],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/speech-writer' },
  openGraph: {
    title: 'AI Speech Writer – Create Speeches Instantly Free | ToolNova',
    description: 'Generate structured speeches for presentations, events, and public speaking.',
    url: 'https://www.toolnovahub.com/tools/speech-writer',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Speech Writer – Create Speeches Instantly Free | ToolNova',
    description: 'Generate structured speeches for presentations, events, and public speaking.',
  },
};

export default function SpeechWriterPage() {
    const toolData = getToolData('speech-writer');

    const toolSchema = getToolSchema(
        toolData?.name || 'speech-writer',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/speech-writer'
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
                            url:`https://www.toolnovahub.com/tools/speech-writer#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <SpeechWriterClient />
            {toolData && (
                <ToolRichContent
                    title={toolData.name}
                    description={toolData.description}
                    steps={toolData.howItWorks}
                    benefits={toolData.benefits}
                    faq={toolData.faqs}
                />
            )}

      <RelatedBlogGuides toolSlug="speech-writer" />


            <RelatedTools currentTool="speech-writer" category="Writing" />
        </>
    );
}
