import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import AntonymFinderClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'Antonym Finder – Find Opposite Words Free | ToolNova',
    description: 'Find antonyms (opposite words) for any word. Free antonym finder for students, writers, and vocabulary building.',
    keywords: ['antonym finder', 'opposite words', 'vocabulary', 'word opposites', 'thesaurus'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/antonym-finder' },
  openGraph: {
    title: 'Antonym Finder – Find Opposite Words Instantly Free | ToolNova',
    description: 'Find accurate antonyms quickly for essays, assignments, and vocabulary building.',
    url: 'https://www.toolnovahub.com/tools/antonym-finder',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Antonym Finder – Find Opposite Words Instantly Free | ToolNova',
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
            

      <section className="mx-auto max-w-5xl px-4 py-8">
        <h2 className="text-xl font-semibold mb-3">Related guides and tools</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/tools" className="underline underline-offset-4">All AI tools</Link>
          <Link href="/tools/writing-tools" className="underline underline-offset-4">Writing tools</Link>
          <Link href="/tools/study-tools" className="underline underline-offset-4">Study tools</Link>
          <Link href="/blog" className="underline underline-offset-4">Blog guides</Link>
        </div>
      </section>

            <RelatedTools currentTool="antonym-finder" category="Language" />
        </>
    );
}
