import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import CoverLetterWriterClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'Cover Letter Writer – Generate Cover Letters Free | ToolNova',
    description: 'Create compelling cover letters for job applications instantly. Free AI-powered cover letter generator.',
    keywords: ['cover letter writer', 'cover letter generator', 'job application', 'professional cover letter', 'AI cover letter'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/cover-letter-writer' },
  openGraph: {
    title: 'AI Cover Letter Writer – Generate Cover Letters Free | ToolNova',
    description: 'Generate job-ready cover letters in seconds with our free AI cover letter writer.',
    url: 'https://www.toolnovahub.com/tools/cover-letter-writer',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Cover Letter Writer – Generate Cover Letters Free | ToolNova',
    description: 'Generate job-ready cover letters in seconds with our free AI cover letter writer.',
  },
};

export default function CoverLetterWriterPage() {
    const toolData = getToolData('cover-letter-writer');

    const toolSchema = getToolSchema(
        toolData?.name || 'cover-letter-writer',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/cover-letter-writer'
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
                            url:`https://www.toolnovahub.com/tools/cover-letter-writer#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <CoverLetterWriterClient />
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
          <Link href="/tools/career-tools" className="underline underline-offset-4">Career tools</Link>
          <Link href="/tools/writing-tools" className="underline underline-offset-4">Writing tools</Link>
          <Link href="/blog" className="underline underline-offset-4">Blog guides</Link>
        </div>
      </section>

            <RelatedTools currentTool="cover-letter-writer" category="Career" />
        </>
    );
}
