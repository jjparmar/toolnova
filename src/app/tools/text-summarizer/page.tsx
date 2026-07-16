import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { RelatedTools } from '@/components/RelatedTools';
import TextSummarizerClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('text-summarizer');

export const metadata: Metadata = {
  title: toolMeta?.title || 'AI Text Summarizer – Summarize Any Text Free | ToolNova',
  description: toolMeta?.description || 'Summarize long texts instantly with our free AI text summarizer. Get concise summaries of articles, essays, and documents. Accurate, fast, and secure.',
  keywords: toolMeta?.keywords || ['AI text summarizer', 'summarize text', 'article summarizer', 'summary generator', 'tl;dr generator'],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/text-summarizer' },
  openGraph: {
    title: toolMeta?.title || 'AI Text Summarizer – Summarize Any Text Free | ToolNova',
    description: toolMeta?.description || 'Summarize long texts instantly with our free AI text summarizer.',
    url: 'https://www.toolnovahub.com/tools/text-summarizer',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Text Summarizer Free | ToolNova',
    description: 'Turn long text into concise summaries in seconds.',
  },
};

export default function TextSummarizerPage() {
  const toolData = getToolData('text-summarizer');

  if (!toolData) return <TextSummarizerClient />;

  const toolSchema = getToolSchema(toolData.name, toolData.description, 'https://www.toolnovahub.com/tools/text-summarizer');

  const howToSchema = getHowToSchema(`How to use ${toolData.name}`,
    toolData.description,
    toolData.howItWorks.map(step => ({
      name: step.title,
      text: step.desc,
      url:`https://www.toolnovahub.com/tools/text-summarizer#step-${step.step}`
    }))
  );

  const faqSchema = getFAQSchema(toolData.faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(howToSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(faqSchema) }} />
      <TextSummarizerClient />

      <ToolRichContent
        title={toolData.name}
        description={toolData.description}
        steps={toolData.howItWorks}
        benefits={toolData.benefits}
        faq={toolData.faqs}
      />


      <section className="mx-auto max-w-5xl px-4 py-8">
        <h2 className="text-xl font-semibold mb-3">Related guides and tools</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          <Link href="/tools" className="underline underline-offset-4">All AI tools</Link>
          <Link href="/tools/writing-tools" className="underline underline-offset-4">Writing tools</Link>
          <Link href="/tools/image-pdf-tools" className="underline underline-offset-4">Image & PDF tools</Link>
          <Link href="/blog" className="underline underline-offset-4">Blog guides</Link>
        </div>
      </section>

      <RelatedTools currentTool="text-summarizer" category="Writing" />
    </>
  );
}
