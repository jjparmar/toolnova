import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import DoubtSolverClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'AI Doubt Solver – Get Instant Answers Free',
    description: 'Get instant answers to any academic question with our free AI doubt solver. Perfect for students needing quick, accurate explanations.',
    keywords: ['AI doubt solver', 'ask questions online', 'instant answers', 'study help', 'homework help'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/doubt-solver' },
  openGraph: {
    title: 'AI Doubt Solver – Get Instant Answers Free',
    description: 'Ask any study doubt and get clear step-by-step explanations.',
    url: 'https://www.toolnovahub.com/tools/doubt-solver',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Doubt Solver – Get Instant Answers Free',
    description: 'Ask any study doubt and get clear step-by-step explanations.',
  },
};

export default function DoubtSolverPage() {
    const toolData = getToolData('doubt-solver');

    const toolSchema = getToolSchema(
        toolData?.name || 'doubt-solver',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/doubt-solver'
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
                            url:`https://www.toolnovahub.com/tools/doubt-solver#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <DoubtSolverClient />
            {toolData && (
                <ToolRichContent
                    title={toolData.name}
                    description={toolData.description}
                    steps={toolData.howItWorks}
                    benefits={toolData.benefits}
                    faq={toolData.faqs}
                />
            )}

      <RelatedBlogGuides toolSlug="doubt-solver" />


            <RelatedTools currentTool="doubt-solver" category="Study" />
        </>
    );
}
