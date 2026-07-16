import { Metadata } from 'next';
import Link from 'next/link';
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
            

      <section className="mx-auto max-w-5xl px-4 py-8">
        <h2 className="text-xl font-semibold mb-3">Related guides and tools</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/tools" className="underline underline-offset-4">All AI tools</Link>
          <Link href="/tools/study-tools" className="underline underline-offset-4">Study tools</Link>
          <Link href="/tools/writing-tools" className="underline underline-offset-4">Writing tools</Link>
          <Link href="/blog" className="underline underline-offset-4">Blog guides</Link>
        </div>
      </section>

            <RelatedTools currentTool="chapter-summary" category="Study" />
        </>
    );
}
