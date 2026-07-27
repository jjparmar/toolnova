import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import ConceptExplainerClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'AI Concept Explainer – Simplify Complex Topics Free | ToolNova',
    description: 'Break down complex concepts into simple explanations with our free AI concept explainer. Perfect for students at any level.',
    keywords: ['concept explainer', 'explain topics simply', 'learning tool', 'study help', 'simplify concepts'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/concept-explainer' },
  openGraph: {
    title: 'AI Concept Explainer – Explain Any Topic Simply | ToolNova',
    description: 'Break down complex topics into simple explanations with examples.',
    url: 'https://www.toolnovahub.com/tools/concept-explainer',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Concept Explainer – Explain Any Topic Simply | ToolNova',
    description: 'Break down complex topics into simple explanations with examples.',
  },
};

export default function ConceptExplainerPage() {
    const toolData = getToolData('concept-explainer');

    const toolSchema = getToolSchema(
        toolData?.name || 'concept-explainer',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/concept-explainer'
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
                            url:`https://www.toolnovahub.com/tools/concept-explainer#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <ConceptExplainerClient />
            {toolData && (
                <ToolRichContent
                    title={toolData.name}
                    description={toolData.description}
                    steps={toolData.howItWorks}
                    benefits={toolData.benefits}
                    faq={toolData.faqs}
                />
            )}

      <RelatedBlogGuides toolSlug="concept-explainer" />


            <RelatedTools currentTool="concept-explainer" category="Study" />
        </>
    );
}
