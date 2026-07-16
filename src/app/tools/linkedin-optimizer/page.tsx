import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import LinkedInOptimizerClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'LinkedIn Profile Optimizer – Boost Your Profile Free | ToolNova',
    description: 'Optimize your LinkedIn profile for recruiters and SEO. Free AI-powered LinkedIn headline, about section, and experience optimizer.',
    keywords: ['linkedin optimizer', 'linkedin profile optimization', 'linkedin headline generator', 'linkedin SEO', 'recruiter visibility', 'AI linkedin tool'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/linkedin-optimizer' },
  openGraph: {
    title: 'LinkedIn Optimizer – Improve LinkedIn Profile Free | ToolNova',
    description: 'Optimize your LinkedIn headline, summary, and profile content with AI.',
    url: 'https://www.toolnovahub.com/tools/linkedin-optimizer',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'LinkedIn Optimizer – Improve LinkedIn Profile Free | ToolNova',
    description: 'Optimize your LinkedIn headline, summary, and profile content with AI.',
  },
};

export default function LinkedInOptimizerPage() {
    const toolData = getToolData('linkedin-optimizer');

    const toolSchema = getToolSchema(
        toolData?.name || 'linkedin-optimizer',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/linkedin-optimizer'
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
                            url:`https://www.toolnovahub.com/tools/linkedin-optimizer#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <LinkedInOptimizerClient />
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
          <Link href="/tools/career-tools" className="underline underline-offset-4">Career tools</Link>
          <Link href="/tools/writing-tools" className="underline underline-offset-4">Writing tools</Link>
          <Link href="/blog" className="underline underline-offset-4">Blog guides</Link>
        </div>
      </section>

            <RelatedTools currentTool="linkedin-optimizer" category="Career" />
        </>
    );
}
