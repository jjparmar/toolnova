import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { RelatedTools } from '@/components/RelatedTools';
import HomeworkSolverClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('homework-solver');

export const metadata: Metadata = {
    title: toolMeta?.title || 'Solve Homework Step by Step Free – AI Tutor | ToolNova',
    description: toolMeta?.description || 'Get step-by-step explanations for math, science, history, and English homework. Free AI homework solver shows the method, not just the answer. No signup required.',
    keywords: toolMeta?.keywords || ['solve homework step by step free', 'step by step math homework solver free', 'free AI homework help for high school', 'solve math problems with explanation free'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/homework-solver' },
    openGraph: {
        title: toolMeta?.title || 'Solve Homework Step by Step Free – AI Tutor | ToolNova',
        description: toolMeta?.description || 'Get step-by-step explanations for math, science, history, and English homework. Free, no signup.',
        url: 'https://www.toolnovahub.com/tools/homework-solver',
        type: 'website',
        images: [{ url: 'https://www.toolnovahub.com/og-image.png', width: 1200, height: 630, alt: 'AI Homework Solver – ToolNova' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: toolMeta?.title || 'Solve Homework Step by Step Free | ToolNova',
        description: 'Get step-by-step homework solutions for any subject. Free AI tutor.',
    },
};

export default function HomeworkSolverPage() {
    const toolData = getToolData('homework-solver');

    if (!toolData) return <HomeworkSolverClient />;

    const toolSchema = getToolSchema(
        toolData.name,
        toolData.description,
        'https://www.toolnovahub.com/tools/homework-solver'
    );

    const howToSchema = getHowToSchema(`How to Solve Homework Step by Step for Free`,
        toolData.description,
        toolData.howItWorks.map(step => ({
            name: step.title,
            text: step.desc,
            url:`https://www.toolnovahub.com/tools/homework-solver#step-${step.step}`
        }))
    );

    const faqSchema = getFAQSchema(toolData.faqs);

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.toolnovahub.com' },
        { name: 'Tools', url: 'https://www.toolnovahub.com/tools' },
        { name: 'Study Tools', url: 'https://www.toolnovahub.com/tools/study-tools' },
        { name: 'Homework Solver', url: 'https://www.toolnovahub.com/tools/homework-solver' },
    ]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(toolSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(breadcrumbSchema) }} />
            <HomeworkSolverClient />
            <ToolRichContent
                title={toolData.name}
                description={toolData.description}
                steps={toolData.howItWorks}
                benefits={toolData.benefits}
                faq={toolData.faqs}
            />

      <RelatedBlogGuides toolSlug="homework-solver" />


            <RelatedTools currentTool="homework-solver" category="Study" />
        </>
    );
}
