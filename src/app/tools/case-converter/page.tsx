import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import CaseConverterClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
  title: 'Case Converter Free – Change Text Case Online | ToolNova',
  description: 'Free case converter. Convert text to UPPERCASE, lowercase, Title Case, Sentence case, and more. Instant conversion.',
  keywords: ['case converter', 'text case changer', 'uppercase converter', 'lowercase converter'],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/case-converter' },
  openGraph: {
    title: 'Case Converter – Change Text Case Instantly Free | ToolNova',
    description: 'Convert text to uppercase, lowercase, title case, and sentence case instantly.',
    url: 'https://www.toolnovahub.com/tools/case-converter',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Case Converter – Change Text Case Instantly Free | ToolNova',
    description: 'Convert text to uppercase, lowercase, title case, and sentence case instantly.',
  },
};

export default function CaseConverterPage() {
    const toolData = getToolData('case-converter');

    const toolSchema = getToolSchema(
        toolData?.name || 'case-converter',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/case-converter'
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
                            url:`https://www.toolnovahub.com/tools/case-converter#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <CaseConverterClient />
            {toolData && (
                <ToolRichContent
                    title={toolData.name}
                    description={toolData.description}
                    steps={toolData.howItWorks}
                    benefits={toolData.benefits}
                    faq={toolData.faqs}
                />
            )}

      <RelatedBlogGuides toolSlug="case-converter" />


            <RelatedTools currentTool="case-converter" category="Utility" />
        </>
    );
}
