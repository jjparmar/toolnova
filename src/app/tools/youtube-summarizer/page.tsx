import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { RelatedTools } from '@/components/RelatedTools';
import YoutubeSummarizerClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('youtube-summarizer');

export const metadata: Metadata = {
  title: toolMeta?.title || 'YouTube Video Summarizer – AI Summaries Instantly | ToolNova',
  description: toolMeta?.description || 'Get instant, comprehensive summaries of any YouTube video with our free AI tool. Extract key points and actionable takeaways from long videos.',
  keywords: toolMeta?.keywords || ['YouTube summarizer', 'AI video summary', 'YouTube transcript generator', 'video to text summary'],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/youtube-summarizer' },
  openGraph: {
    title: toolMeta?.title || 'YouTube Video Summarizer | ToolNova',
    description: toolMeta?.description || 'Get instant summaries of any YouTube video.',
    url: 'https://www.toolnovahub.com/tools/youtube-summarizer',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Video Summarizer | ToolNova',
    description: 'Get instant summaries of any YouTube video.',
  },
};

export default function YoutubeSummarizerPage() {
  const toolData = getToolData('youtube-summarizer');

  if (!toolData) return <YoutubeSummarizerClient />;

  const toolSchema = getToolSchema(
    toolData.name,
    toolData.description,
    'https://www.toolnovahub.com/tools/youtube-summarizer'
  );

  const faqSchema = getFAQSchema(toolData.faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.toolnovahub.com' },
    { name: 'Tools', url: 'https://www.toolnovahub.com/tools' },
    { name: 'Study Tools', url: 'https://www.toolnovahub.com/tools/study-tools' },
    { name: toolData.name, url: 'https://www.toolnovahub.com/tools/youtube-summarizer' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(breadcrumbSchema) }} />
      
      <YoutubeSummarizerClient />

      <ToolRichContent
        title={toolData.name}
        description={toolData.description}
        steps={toolData.howItWorks}
        benefits={toolData.benefits}
        faq={toolData.faqs}
      />

      <RelatedBlogGuides toolSlug="youtube-summarizer" />


      <RelatedTools currentTool="youtube-summarizer" category="Study" />
    </>
  );
}
