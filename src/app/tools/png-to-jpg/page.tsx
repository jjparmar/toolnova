import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import PNGtoJPGClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'PNG to JPG Converter – Convert PNG to JPEG Free',
    description: 'Convert PNG images to JPG format with adjustable quality. Free, fast image format conversion.',
    keywords: ['png to jpg', 'png to jpeg', 'convert png to jpg', 'image converter', 'jpg converter'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/png-to-jpg' },
  openGraph: {
    title: 'PNG to JPG Converter – Convert PNG to JPEG Free',
    description: 'Convert PNG images to JPG format with adjustable quality. Free, fast image format conversion.',
    url: 'https://www.toolnovahub.com/tools/png-to-jpg',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PNG to JPG Converter – Convert PNG to JPEG Free',
    description: 'Convert PNG images to JPG format with adjustable quality. Free, fast image format conversion.',
  },
};

export default function PNGtoJPGPage() {
    const toolData = getToolData('png-to-jpg');

    const toolSchema = getToolSchema(
        toolData?.name || 'png-to-jpg',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/png-to-jpg'
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
                            url:`https://www.toolnovahub.com/tools/png-to-jpg#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <PNGtoJPGClient />
            {toolData && (
                <ToolRichContent
                    title={toolData.name}
                    description={toolData.description}
                    steps={toolData.howItWorks}
                    benefits={toolData.benefits}
                    faq={toolData.faqs}
                />
            )}

      <RelatedBlogGuides toolSlug="png-to-jpg" />


            <RelatedTools currentTool="png-to-jpg" category="Image" />
        </>
    );
}
