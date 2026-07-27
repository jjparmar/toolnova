import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
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

      <RelatedBlogGuides toolSlug="mcq-generator" />


            <RelatedTools currentTool="mcq-generator" category="Study" />
        </>
    );
}
