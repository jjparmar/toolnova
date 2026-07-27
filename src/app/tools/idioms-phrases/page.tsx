import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import IdiomsPhrasesClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'Idioms & Phrases Tool – Learn English Expressions Free | ToolNova',
    description: 'Learn common idioms and phrases with meanings and examples. Free tool for English language learning and exam preparation.',
    keywords: ['idioms and phrases', 'English idioms', 'common phrases', 'language learning', 'English expressions'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/idioms-phrases' },
  openGraph: {
    title: 'Idioms and Phrases Generator – Learn Usage Examples Free | ToolNova',
    description: 'Discover idioms, meanings, and usage examples to improve fluency and writing.',
    url: 'https://www.toolnovahub.com/tools/idioms-phrases',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Idioms and Phrases Generator – Learn Usage Examples Free | ToolNova',
    description: 'Discover idioms, meanings, and usage examples to improve fluency and writing.',
  },
};

export default function IdiomsPhrasesPage() {
    const toolData = getToolData('idioms-phrases');

    const toolSchema = getToolSchema(
        toolData?.name || 'idioms-phrases',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/idioms-phrases'
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
                            url:`https://www.toolnovahub.com/tools/idioms-phrases#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <IdiomsPhrasesClient />
            {toolData && (
                <ToolRichContent
                    title={toolData.name}
                    description={toolData.description}
                    steps={toolData.howItWorks}
                    benefits={toolData.benefits}
                    faq={toolData.faqs}
                />
            )}

      <RelatedBlogGuides toolSlug="idioms-phrases" />


            <RelatedTools currentTool="idioms-phrases" category="Language" />
        </>
    );
}
