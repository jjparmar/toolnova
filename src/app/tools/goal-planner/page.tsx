import { Metadata } from 'next';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import GoalPlannerClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'Goal Planner – Break Down Goals Into Steps Free',
    description: 'Create actionable goal plans with milestones and weekly tasks. Free AI goal planning tool.',
    keywords: ['goal planner', 'goal setting', 'action plan', 'SMART goals', 'productivity'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/goal-planner' },
  openGraph: {
    title: 'AI Goal Planner – Plan Goals with Action Steps Free',
    description: 'Turn big goals into actionable milestones and daily tasks.',
    url: 'https://www.toolnovahub.com/tools/goal-planner',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Goal Planner – Plan Goals with Action Steps Free',
    description: 'Turn big goals into actionable milestones and daily tasks.',
  },
};

export default function GoalPlannerPage() {
    const toolData = getToolData('goal-planner');

    const toolSchema = getToolSchema(
        toolData?.name || 'goal-planner',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/goal-planner'
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
                            url:`https://www.toolnovahub.com/tools/goal-planner#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <GoalPlannerClient />
            {toolData && (
                <ToolRichContent
                    title={toolData.name}
                    description={toolData.description}
                    steps={toolData.howItWorks}
                    benefits={toolData.benefits}
                    faq={toolData.faqs}
                />
            )}
            <RelatedTools currentTool="goal-planner" category="Utility" />
        </>
    );
}
