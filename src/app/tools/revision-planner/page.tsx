import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import RevisionPlannerClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'AI Revision Planner – Create Study Schedule Free | ToolNova',
    description: 'Create a personalized study schedule for exam preparation. Free AI revision planner with day-by-day planning.',
    keywords: ['revision planner', 'study schedule', 'exam preparation', 'study plan', 'revision timetable'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/revision-planner' },
  openGraph: {
    title: 'AI Revision Planner – Create Study Revision Plans Free | ToolNova',
    description: 'Build smart revision timetables for exams in minutes.',
    url: 'https://www.toolnovahub.com/tools/revision-planner',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Revision Planner – Create Study Revision Plans Free | ToolNova',
    description: 'Build smart revision timetables for exams in minutes.',
  },
};

export default function RevisionPlannerPage() {
    const toolData = getToolData('revision-planner');

    const toolSchema = getToolSchema(
        toolData?.name || 'revision-planner',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/revision-planner'
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
                            url:`https://www.toolnovahub.com/tools/revision-planner#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <RevisionPlannerClient />
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

            <RelatedTools currentTool="revision-planner" category="Study" />
        </>
    );
}
