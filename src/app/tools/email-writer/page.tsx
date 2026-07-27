import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import EmailWriterClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
  title: 'AI Email Writer – Write Professional Emails Free | ToolNova',
  description: 'Write professional emails instantly with our free AI email writer. Perfect for business, job applications, and personal correspondence.',
  keywords: ['AI email writer', 'email generator', 'professional email writer', 'business email'],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/email-writer' },
  openGraph: {
    title: 'AI Email Writer – Generate Professional Emails Free | ToolNova',
    description: 'Write professional emails instantly with AI for work, school, and business.',
    url: 'https://www.toolnovahub.com/tools/email-writer',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Email Writer – Generate Professional Emails Free | ToolNova',
    description: 'Write professional emails instantly with AI for work, school, and business.',
  },
};

export default function EmailWriterPage() {
    const toolData = getToolData('email-writer');

    const toolSchema = getToolSchema(
        toolData?.name || 'email-writer',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/email-writer'
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
                            url:`https://www.toolnovahub.com/tools/email-writer#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <EmailWriterClient />
            {toolData && (
                <ToolRichContent
                    title={toolData.name}
                    description={toolData.description}
                    steps={toolData.howItWorks}
                    benefits={toolData.benefits}
                    faq={toolData.faqs}
                />
            )}

      <RelatedBlogGuides toolSlug="email-writer" />


            <RelatedTools currentTool="email-writer" category="Writing" />
        </>
    );
}
