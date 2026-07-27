import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import ImageCompressorClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'Image Compressor – Reduce Image Size Free Online | ToolNova',
    description: 'Compress images without losing quality. Reduce JPG, PNG file size instantly. Free, private, and fast.',
    keywords: ['image compressor', 'compress image', 'reduce image size', 'image optimizer', 'compress jpg png'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/image-compressor' },
  openGraph: {
    title: 'Image Compressor – Reduce Image Size Free Online | ToolNova',
    description: 'Compress images without losing quality. Reduce JPG, PNG file size instantly. Free, private, and fast.',
    url: 'https://www.toolnovahub.com/tools/image-compressor',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Compressor – Reduce Image Size Free Online | ToolNova',
    description: 'Compress images without losing quality. Reduce JPG, PNG file size instantly. Free, private, and fast.',
  },
};

export default function ImageCompressorPage() {
    const toolData = getToolData('image-compressor');

    const toolSchema = getToolSchema(
        toolData?.name || 'image-compressor',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/image-compressor'
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
                            url:`https://www.toolnovahub.com/tools/image-compressor#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <ImageCompressorClient />
            {toolData && (
                <ToolRichContent
                    title={toolData.name}
                    description={toolData.description}
                    steps={toolData.howItWorks}
                    benefits={toolData.benefits}
                    faq={toolData.faqs}
                />
            )}

      <RelatedBlogGuides toolSlug="image-compressor" />


            <RelatedTools currentTool="image-compressor" category="Image" />
        </>
    );
}
