import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import ImageToPDFClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'Image to PDF Converter – Convert JPG, PNG to PDF Free | ToolNova',
    description: 'Convert images to PDF instantly. Support for JPG, PNG and multiple image formats. Free, private, no upload needed.',
    keywords: ['image to pdf', 'jpg to pdf', 'png to pdf', 'convert image to pdf', 'photo to pdf'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/image-to-pdf' },
    openGraph: {
        title: 'Image to PDF Converter – Convert JPG, PNG to PDF Free | ToolNova',
        description: 'Convert images to PDF instantly. Support for JPG, PNG and multiple image formats.',
        url: 'https://www.toolnovahub.com/tools/image-to-pdf',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Image to PDF Converter Free | ToolNova',
        description: 'Convert JPG and PNG to PDF instantly in your browser.',
    },
};

export default function ImageToPDFPage() {
    const toolData = getToolData('image-to-pdf');

    const toolSchema = getToolSchema(
        toolData?.name || 'image-to-pdf',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/image-to-pdf'
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
                            url:`https://www.toolnovahub.com/tools/image-to-pdf#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <ImageToPDFClient />
            {toolData && (
                <ToolRichContent
                    title={toolData.name}
                    description={toolData.description}
                    steps={toolData.howItWorks}
                    benefits={toolData.benefits}
                    faq={toolData.faqs}
                />
            )}

      <RelatedBlogGuides toolSlug="image-to-pdf" />


            <RelatedTools currentTool="image-to-pdf" category="PDF" />
        </>
    );
}
