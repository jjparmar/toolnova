import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import FormulaGeneratorClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'AI Formula Generator – Math & Science Formulas Free | ToolNova',
    description: 'Get essential formulas for math, physics, chemistry and more. Free AI-powered formula generator for students and professionals.',
    keywords: ['formula generator', 'math formulas', 'physics formulas', 'chemistry formulas', 'study formulas'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/formula-generator' },
  openGraph: {
    title: 'AI Formula Generator – Generate Math & Science Formulas Free | ToolNova',
    description: 'Generate formulas and equation references instantly for study and exams.',
    url: 'https://www.toolnovahub.com/tools/formula-generator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Formula Generator – Generate Math & Science Formulas Free | ToolNova',
    description: 'Generate formulas and equation references instantly for study and exams.',
  },
};

export default function FormulaGeneratorPage() {
    const toolData = getToolData('formula-generator');

    const toolSchema = getToolSchema(
        toolData?.name || 'formula-generator',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/formula-generator'
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
                            url:`https://www.toolnovahub.com/tools/formula-generator#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <FormulaGeneratorClient />
            {toolData && (
                <ToolRichContent
                    title={toolData.name}
                    description={toolData.description}
                    steps={toolData.howItWorks}
                    benefits={toolData.benefits}
                    faq={toolData.faqs}
                />
            )}
            <RelatedTools currentTool="formula-generator" category="Utility" />
        </>
    );
}
