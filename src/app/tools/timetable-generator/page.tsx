import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import TimetableGeneratorClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'Timetable Generator – Create Study Schedule Free | ToolNova',
    description: 'Generate a structured weekly timetable for study or work. Free AI-powered schedule maker.',
    keywords: ['timetable generator', 'study schedule', 'weekly planner', 'schedule maker', 'time management'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/timetable-generator' },
  openGraph: {
    title: 'AI Timetable Generator – Build Study Schedules Free | ToolNova',
    description: 'Create personalized weekly study timetables in minutes.',
    url: 'https://www.toolnovahub.com/tools/timetable-generator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Timetable Generator – Build Study Schedules Free | ToolNova',
    description: 'Create personalized weekly study timetables in minutes.',
  },
};

export default function TimetableGeneratorPage() {
    const toolData = getToolData('timetable-generator');

    const toolSchema = getToolSchema(
        toolData?.name || 'timetable-generator',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/timetable-generator'
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
                            url:`https://www.toolnovahub.com/tools/timetable-generator#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <TimetableGeneratorClient />
            {toolData && (
                <ToolRichContent
                    title={toolData.name}
                    description={toolData.description}
                    steps={toolData.howItWorks}
                    benefits={toolData.benefits}
                    faq={toolData.faqs}
                />
            )}
            <RelatedTools currentTool="timetable-generator" category="Study" />
        </>
    );
}
