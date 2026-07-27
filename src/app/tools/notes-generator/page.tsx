import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import NotesGeneratorClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
  title: 'AI Notes Generator – Create Study Notes Free | ToolNova',
  description: 'Generate organized study notes instantly with our free AI notes generator. Cornell method, bullet points, outlines and more.',
  keywords: ['AI notes generator', 'study notes maker', 'note taking AI', 'lecture notes'],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/notes-generator' },
  openGraph: {
    title: 'AI Notes Generator – Create Study Notes Free | ToolNova',
    description: 'Generate organized study notes instantly with our free AI notes generator. Cornell method, bullet points, outlines and more.',
    url: 'https://www.toolnovahub.com/tools/notes-generator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Notes Generator – Create Study Notes Free | ToolNova',
    description: 'Generate organized study notes instantly with our free AI notes generator. Cornell method, bullet points, outlines and more.',
  },
};

export default function NotesGeneratorPage() {
    const toolData = getToolData('notes-generator');

    const toolSchema = getToolSchema(
        toolData?.name || 'notes-generator',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/notes-generator'
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
                            url:`https://www.toolnovahub.com/tools/notes-generator#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <NotesGeneratorClient />
            {toolData && (
                <ToolRichContent
                    title={toolData.name}
                    description={toolData.description}
                    steps={toolData.howItWorks}
                    benefits={toolData.benefits}
                    faq={toolData.faqs}
                />
            )}

      <RelatedBlogGuides toolSlug="notes-generator" />


            <RelatedTools currentTool="notes-generator" category="Study" />
        </>
    );
}
