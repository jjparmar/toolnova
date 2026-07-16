import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import InterviewGeneratorClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'Interview Question Generator – Practice Interview Questions Free | ToolNova',
    description: 'Generate interview questions for any role with sample answers. Free AI tool for interview preparation.',
    keywords: ['interview questions', 'interview prep', 'practice interview', 'job interview', 'interview generator'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/interview-generator' },
  openGraph: {
    title: 'AI Interview Questions Generator – Practice Interviews Free | ToolNova',
    description: 'Generate interview questions and sample answers instantly for better job prep.',
    url: 'https://www.toolnovahub.com/tools/interview-generator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Interview Questions Generator – Practice Interviews Free | ToolNova',
    description: 'Generate interview questions and sample answers instantly for better job prep.',
  },
};

export default function InterviewGeneratorPage() {
    const toolData = getToolData('interview-generator');

    const toolSchema = getToolSchema(
        toolData?.name || 'interview-generator',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/interview-generator'
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
                            url:`https://www.toolnovahub.com/tools/interview-generator#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <InterviewGeneratorClient />
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

            <RelatedTools currentTool="interview-generator" category="Career" />
        </>
    );
}
