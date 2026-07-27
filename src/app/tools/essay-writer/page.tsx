import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { RelatedTools } from '@/components/RelatedTools';
import EssayWriterClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('essay-writer');

export const metadata: Metadata = {
  title: toolMeta?.title || 'Write a Free Essay Online – AI Essay Generator | ToolNova',
  description: toolMeta?.description || 'Generate a well-structured essay with intro, body paragraphs, and conclusion in seconds. Perfect for high school and college students. Free AI essay writer, no login required.',
  keywords: toolMeta?.keywords || ['write essay online free for students', 'free AI essay generator for high school', 'AI essay writer no login', 'write my essay free online'],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/essay-writer' },
  openGraph: {
    title: toolMeta?.title || 'Write a Free Essay Online – AI Essay Generator | ToolNova',
    description: toolMeta?.description || 'Generate a well-structured essay in seconds. Free AI essay writer, no login required.',
    url: 'https://www.toolnovahub.com/tools/essay-writer',
    type: 'website',
    images: [{ url: 'https://www.toolnovahub.com/og-image.png', width: 1200, height: 630, alt: 'AI Essay Writer – ToolNova' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: toolMeta?.title || 'Write a Free Essay Online | ToolNova',
    description: 'Generate structured essays instantly with intro, body, and conclusion.',
  },
};

export default function EssayWriterPage() {
  const toolData = getToolData('essay-writer');

  if (!toolData) return <EssayWriterClient />;

  const toolSchema = getToolSchema(
    toolData.name,
    toolData.description,
    'https://www.toolnovahub.com/tools/essay-writer'
  );

  const howToSchema = getHowToSchema(`How to Write a Free Essay Online with AI`,
    toolData.description,
    toolData.howItWorks.map((step) => ({
      name: step.title,
      text: step.desc,
      url:`https://www.toolnovahub.com/tools/essay-writer#step-${step.step}`,
    }))
  );

  const faqSchema = getFAQSchema(toolData.faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.toolnovahub.com' },
    { name: 'Tools', url: 'https://www.toolnovahub.com/tools' },
    { name: 'Writing Tools', url: 'https://www.toolnovahub.com/tools/writing-tools' },
    { name: toolData.name, url: 'https://www.toolnovahub.com/tools/essay-writer' },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(breadcrumbSchema) }} />
      <EssayWriterClient />

      <ToolRichContent
        title={toolData.name}
        description={toolData.description}
        steps={toolData.howItWorks}
        benefits={toolData.benefits}
        faq={toolData.faqs}
      />

      <RelatedBlogGuides toolSlug="essay-writer" />


      <RelatedTools currentTool="essay-writer" category="Writing" />
    </>
  );
}
