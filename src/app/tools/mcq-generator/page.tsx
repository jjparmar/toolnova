import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import MCQGeneratorClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
  title: 'AI MCQ Generator – Create Multiple Choice Questions Free | ToolNova',
  description: 'Generate multiple choice questions instantly with our free AI MCQ generator. Perfect for teachers, students, and exam prep.',
  keywords: ['AI MCQ generator', 'multiple choice generator', 'quiz question maker', 'test generator'],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/mcq-generator' },
  openGraph: {
    title: 'AI MCQ Generator – Create Multiple Choice Questions Free | ToolNova',
    description: 'Generate MCQs instantly from any topic for exams and practice.',
    url: 'https://www.toolnovahub.com/tools/mcq-generator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI MCQ Generator – Create Multiple Choice Questions Free | ToolNova',
    description: 'Generate MCQs instantly from any topic for exams and practice.',
  },
};

export default function MCQGeneratorPage() {
    const toolData = getToolData('mcq-generator');

    const toolSchema = getToolSchema(
        toolData?.name || 'mcq-generator',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/mcq-generator'
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
                            url:`https://www.toolnovahub.com/tools/mcq-generator#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <MCQGeneratorClient />
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

            <RelatedTools currentTool="mcq-generator" category="Study" />
        </>
    );
}
