import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import SynonymFinderClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'Synonym Finder – Find Similar Words Free | ToolNova',
    description: 'Find synonyms for any word to enhance your vocabulary and writing. Free synonym finder for students and writers.',
    keywords: ['synonym finder', 'similar words', 'thesaurus', 'vocabulary', 'word alternatives'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/synonym-finder' },
  openGraph: {
    title: 'Synonym Finder – Find Similar Words Instantly Free | ToolNova',
    description: 'Find synonyms for any word instantly to improve writing clarity and variety.',
    url: 'https://www.toolnovahub.com/tools/synonym-finder',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Synonym Finder – Find Similar Words Instantly Free | ToolNova',
    description: 'Find synonyms for any word instantly to improve writing clarity and variety.',
  },
};

export default function SynonymFinderPage() {
    const toolData = getToolData('synonym-finder');

    const toolSchema = getToolSchema(
        toolData?.name || 'synonym-finder',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/synonym-finder'
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
                            url:`https://www.toolnovahub.com/tools/synonym-finder#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <SynonymFinderClient />
            {toolData && (
                <ToolRichContent
                    title={toolData.name}
                    description={toolData.description}
                    steps={toolData.howItWorks}
                    benefits={toolData.benefits}
                    faq={toolData.faqs}
                />
            )}

      <RelatedBlogGuides toolSlug="synonym-finder" />


            <RelatedTools currentTool="synonym-finder" category="Language" />
        </>
    );
}
