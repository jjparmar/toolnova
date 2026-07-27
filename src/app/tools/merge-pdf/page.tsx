import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { RelatedTools } from '@/components/RelatedTools';
import MergePDFClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('merge-pdf');

export const metadata: Metadata = {
    title: toolMeta?.title || 'Merge PDF Files Online Free – No Watermark | ToolNova',
    description: toolMeta?.description || 'Combine multiple PDF files into one document in seconds. No watermarks, no file size limits, no signup. Drag, drop, and download your merged PDF instantly.',
    keywords: toolMeta?.keywords || ['merge PDF files online free no watermark', 'combine PDF files without watermark free', 'join multiple PDF free online', 'free PDF merger no signup'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/merge-pdf' },
    openGraph: {
        title: toolMeta?.title || 'Merge PDF Files Online Free – No Watermark | ToolNova',
        description: toolMeta?.description || 'Combine multiple PDF files into one document in seconds. No watermarks, no file size limits, no signup.',
        url: 'https://www.toolnovahub.com/tools/merge-pdf',
        type: 'website',
        images: [{ url: 'https://www.toolnovahub.com/og-image.png', width: 1200, height: 630, alt: 'Merge PDF Free Online – ToolNova' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: toolMeta?.title || 'Merge PDF Files Free – No Watermark | ToolNova',
        description: 'Combine multiple PDFs instantly. No watermarks, no signup required.',
    },
};

export default function MergePDFPage() {
    const toolData = getToolData('merge-pdf');

    if (!toolData) return <MergePDFClient />;

    const toolSchema = getToolSchema(
        toolData.name,
        toolData.description,
        'https://www.toolnovahub.com/tools/merge-pdf'
    );

    const howToSchema = getHowToSchema(`How to Merge PDF Files Online Free`,
        toolData.description,
        toolData.howItWorks.map(step => ({
            name: step.title,
            text: step.desc,
            url:`https://www.toolnovahub.com/tools/merge-pdf#step-${step.step}`
        }))
    );

    const faqSchema = getFAQSchema(toolData.faqs);

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.toolnovahub.com' },
        { name: 'Tools', url: 'https://www.toolnovahub.com/tools' },
        { name: 'PDF & Image Tools', url: 'https://www.toolnovahub.com/tools/image-pdf-tools' },
        { name: 'Merge PDF', url: 'https://www.toolnovahub.com/tools/merge-pdf' },
    ]);

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(toolSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(breadcrumbSchema) }} />
            <MergePDFClient />
            <ToolRichContent
                title={toolData.name}
                description={toolData.description}
                steps={toolData.howItWorks}
                benefits={toolData.benefits}
                faq={toolData.faqs}
            />

      <RelatedBlogGuides toolSlug="merge-pdf" />


            <RelatedTools currentTool="merge-pdf" category="PDF" />
        </>
    );
}
