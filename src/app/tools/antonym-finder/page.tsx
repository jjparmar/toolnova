import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import AntonymFinderClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'Antonym Finder – Find Opposite Words Free',
    description: 'Find antonyms (opposite words) for any word. Free antonym finder for students, writers, and vocabulary building.',
    keywords: ['antonym finder', 'opposite words', 'vocabulary', 'word opposites', 'thesaurus'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/antonym-finder' },
  openGraph: {
    title: 'Antonym Finder – Find Opposite Words Instantly Free',
    description: 'Find accurate antonyms quickly for essays, assignments, and vocabulary building.',
    url: 'https://www.toolnovahub.com/tools/antonym-finder',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antonym Finder – Find Opposite Words Instantly Free',
    description: 'Find accurate antonyms quickly for essays, assignments, and vocabulary building.',
  },
};

export default function AntonymFinderPage() {
    const toolData = getToolData('antonym-finder');

    const toolSchema = getToolSchema(
        toolData?.name || 'antonym-finder',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/antonym-finder'
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
                            url:`https://www.toolnovahub.com/tools/antonym-finder#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <AntonymFinderClient />
            {toolData && (
                <ToolRichContent
                    title={toolData.name}
                    description={toolData.description}
                    steps={toolData.howItWorks}
                    benefits={toolData.benefits}
                    faq={toolData.faqs}
                />
            )}

      <RelatedBlogGuides toolSlug="antonym-finder" />


            <RelatedTools currentTool="antonym-finder" category="Language" />
        </>
    );
}
