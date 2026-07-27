import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import ChapterSummaryClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'AI Chapter Summary – Summarize Textbook Chapters Free | ToolNova',
    description: 'Turn long textbook chapters into concise, exam-ready summaries. Free AI-powered chapter summarizer for students.',
    keywords: ['chapter summary', 'textbook summary', 'study notes', 'exam revision', 'summarize chapter'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/chapter-summary' },
  openGraph: {
    title: 'AI Chapter Summary – Summarize Chapters Instantly | ToolNova',
    description: 'Get concise chapter summaries with key points and takeaways.',
    url: 'https://www.toolnovahub.com/tools/chapter-summary',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Chapter Summary – Summarize Chapters Instantly | ToolNova',
    description: 'Get concise chapter summaries with key points and takeaways.',
  },
};

export default function ChapterSummaryPage() {
    const toolData = getToolData('chapter-summary');

    const toolSchema = getToolSchema(
        toolData?.name || 'chapter-summary',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/chapter-summary'
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
                            url:`https://www.toolnovahub.com/tools/chapter-summary#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <ChapterSummaryClient />
            {toolData && (
                <ToolRichContent
                    title={toolData.name}
                    description={toolData.description}
                    steps={toolData.howItWorks}
                    benefits={toolData.benefits}
                    faq={toolData.faqs}
                />
            )}

      <RelatedBlogGuides toolSlug="chapter-summary" />


            <RelatedTools currentTool="chapter-summary" category="Study" />
        </>
    );
}
