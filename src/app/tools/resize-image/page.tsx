import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import ResizeImageClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'Image Resizer – Resize Images Free Online | ToolNova',
    description: 'Resize JPG, PNG, and WebP images to exact dimensions. Fast, free, and private image resizer in your browser.',
    keywords: ['image resizer', 'resize image', 'change image size', 'resize picture', 'image dimensions'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/resize-image' },
  openGraph: {
    title: 'Image Resizer – Resize Images Free Online | ToolNova',
    description: 'Resize JPG, PNG, and WebP images to exact dimensions. Fast, free, and private image resizer in your browser.',
    url: 'https://www.toolnovahub.com/tools/resize-image',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Resizer – Resize Images Free Online | ToolNova',
    description: 'Resize JPG, PNG, and WebP images to exact dimensions. Fast, free, and private image resizer in your browser.',
  },
};

export default function ResizeImagePage() {
    const toolData = getToolData('resize-image');

    const toolSchema = getToolSchema(
        toolData?.name || 'Image Resizer',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/resize-image'
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
                            url:`https://www.toolnovahub.com/tools/resize-image#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <ResizeImageClient />
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
          <Link href="/tools/image-pdf-tools" className="underline underline-offset-4">Image & PDF tools</Link>
          <Link href="/tools/image-compressor" className="underline underline-offset-4">Image Compressor</Link>
          <Link href="/blog" className="underline underline-offset-4">Blog guides</Link>
        </div>
      </section>

            <RelatedTools currentTool="resize-image" category="Image" />
        </>
    );
}
