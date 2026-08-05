import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { RelatedTools } from '@/components/RelatedTools';
import PlagiarismCheckerClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('plagiarism-checker');

export const metadata: Metadata = {
  title: toolMeta?.title || 'AI Writing Detector – Spot AI Patterns Free',
  description: toolMeta?.description || 'Estimate AI-like writing patterns and get humanization tips. Educational coach only — not a legal plagiarism database verdict. Free daily AI use.',
  keywords: toolMeta?.keywords || ['AI writing detector', 'AI content detector', 'detect AI writing patterns', 'humanize AI text', 'AI footprint scanner'],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/plagiarism-checker' },
  openGraph: {
    title: toolMeta?.title || 'AI Writing Detector',
    description: toolMeta?.description || 'Estimate AI-like writing patterns and improve originality with practical tips.',
    url: 'https://www.toolnovahub.com/tools/plagiarism-checker',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Writing Detector',
    description: 'Estimate AI-like writing patterns and get humanization tips.',
  },
};

export default function PlagiarismCheckerPage() {
  const toolData = getToolData('plagiarism-checker');

  if (!toolData) return <PlagiarismCheckerClient />;

  const toolSchema = getToolSchema(
    toolData.name,
    toolData.description,
    'https://www.toolnovahub.com/tools/plagiarism-checker'
  );

  const faqSchema = getFAQSchema(toolData.faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.toolnovahub.com' },
    { name: 'Tools', url: 'https://www.toolnovahub.com/tools' },
    { name: 'Writing Tools', url: 'https://www.toolnovahub.com/tools/writing-tools' },
    { name: toolData.name, url: 'https://www.toolnovahub.com/tools/plagiarism-checker' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(breadcrumbSchema) }} />
      
      <PlagiarismCheckerClient />

      <ToolRichContent
        title={toolData.name}
        description={toolData.description}
        steps={toolData.howItWorks}
        benefits={toolData.benefits}
        faq={toolData.faqs}
      />

      <RelatedBlogGuides toolSlug="plagiarism-checker" />


      <RelatedTools currentTool="plagiarism-checker" category="Writing" />
    </>
  );
}
