import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { getToolRichProps } from '@/lib/tool-rich-props';
import { RelatedTools } from '@/components/RelatedTools';
import ParaphraserClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('paraphraser');

export const metadata: Metadata = {
  title: toolMeta?.title || 'Paraphrase Essay Without Changing Meaning Free',
  description:
    toolMeta?.description ||
    'Free paraphrasing tool—no login. Rewrite essays and paragraphs without changing meaning. Standard, Fluency & Creative modes.',
  keywords: toolMeta?.keywords || [
    'paraphrase essay without changing meaning free',
    'free paraphrasing tool no login',
    'paraphrase paragraph online free',
  ],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/paraphraser' },
  openGraph: {
    title: `${toolMeta?.title || 'Paraphrase Essay Free'} | ToolNova`,
    description:
      toolMeta?.description ||
      'Paraphrase paragraphs online free without changing meaning. No login required.',
    url: 'https://www.toolnovahub.com/tools/paraphraser',
    type: 'website',
    images: [
      {
        url: 'https://www.toolnovahub.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Free Paraphrasing Tool – ToolNova',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${toolMeta?.title || 'Paraphrase Essay Free'} | ToolNova`,
    description: 'Rewrite text while keeping meaning. Free paraphraser, no login wall.',
  },
};

export default function ParaphraserPage() {
  const toolData = getToolData('paraphraser');

  if (!toolData) return <ParaphraserClient />;

  const rich = getToolRichProps('paraphraser', toolData);

  const toolSchema = getToolSchema(
    toolData.name,
    toolData.description,
    'https://www.toolnovahub.com/tools/paraphraser',
  );

  const howToSchema = getHowToSchema(
    'How to Paraphrase an Essay Without Changing Meaning',
    toolData.description,
    toolData.howItWorks.map((step) => ({
      name: step.title,
      text: step.desc,
      url: `https://www.toolnovahub.com/tools/paraphraser#step-${step.step}`,
    })),
  );

  const faqSchema = getFAQSchema(toolData.faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.toolnovahub.com' },
    { name: 'Tools', url: 'https://www.toolnovahub.com/tools' },
    { name: 'Writing Tools', url: 'https://www.toolnovahub.com/tools/writing-tools' },
    { name: 'Paraphraser', url: 'https://www.toolnovahub.com/tools/paraphraser' },
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: schemaToJsonLd(breadcrumbSchema) }}
      />
      <ParaphraserClient />
      <ToolRichContent {...rich} />
      <RelatedBlogGuides toolSlug="paraphraser" />
      <RelatedTools currentTool="paraphraser" category="Writing" />
    </>
  );
}
