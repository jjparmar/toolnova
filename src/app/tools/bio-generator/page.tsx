import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import BioGeneratorClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'AI Bio Generator – Create Catchy Social Media Bios Free',
    description: 'Generate catchy bios for Instagram, Twitter, LinkedIn, and more. Free AI bio generator for all social media platforms.',
    keywords: ['bio generator', 'Instagram bio', 'Twitter bio', 'LinkedIn bio', 'social media bio'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/bio-generator' },
  openGraph: {
    title: 'AI Bio Generator – Create Social Media Bios Free',
    description: 'Generate professional and catchy bios for social profiles instantly.',
    url: 'https://www.toolnovahub.com/tools/bio-generator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Bio Generator – Create Social Media Bios Free',
    description: 'Generate professional and catchy bios for social profiles instantly.',
  },
};

export default function BioGeneratorPage() {
    const toolData = getToolData('bio-generator');

    const toolSchema = getToolSchema(
        toolData?.name || 'bio-generator',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/bio-generator'
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
                            url:`https://www.toolnovahub.com/tools/bio-generator#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <BioGeneratorClient />
            {toolData && (
                <ToolRichContent
                    title={toolData.name}
                    description={toolData.description}
                    steps={toolData.howItWorks}
                    benefits={toolData.benefits}
                    faq={toolData.faqs}
                />
            )}

      <RelatedBlogGuides toolSlug="bio-generator" />


            <RelatedTools currentTool="bio-generator" category="Writing" />
        </>
    );
}
