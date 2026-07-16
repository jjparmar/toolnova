import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import JPGtoPNGClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'JPG to PNG Converter – Convert JPEG to PNG Free | ToolNova',
    description: 'Convert JPG/JPEG images to PNG format instantly. Free, lossless conversion with transparency support.',
    keywords: ['jpg to png', 'jpeg to png', 'convert jpg to png', 'image converter', 'png converter'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/jpg-to-png' },
  openGraph: {
    title: 'JPG to PNG Converter – Convert JPEG to PNG Free | ToolNova',
    description: 'Convert JPG/JPEG images to PNG format instantly. Free, lossless conversion with transparency support.',
    url: 'https://www.toolnovahub.com/tools/jpg-to-png',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'JPG to PNG Converter – Convert JPEG to PNG Free | ToolNova',
    description: 'Convert JPG/JPEG images to PNG format instantly. Free, lossless conversion with transparency support.',
  },
};

export default function JPGtoPNGPage() {
    const toolData = getToolData('jpg-to-png');

    const toolSchema = getToolSchema(
        toolData?.name || 'jpg-to-png',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/jpg-to-png'
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
                            url:`https://www.toolnovahub.com/tools/jpg-to-png#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <JPGtoPNGClient />
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
          <Link href="/tools/study-tools" className="underline underline-offset-4">Study tools</Link>
          <Link href="/tools/image-pdf-tools" className="underline underline-offset-4">Image & PDF tools</Link>
          <Link href="/blog" className="underline underline-offset-4">Blog guides</Link>
        </div>
      </section>

            <RelatedTools currentTool="jpg-to-png" category="Image" />
        </>
    );
}
