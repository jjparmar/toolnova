import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { Metadata } from 'next';
import {
  getToolSchema,
  getHowToSchema,
  getFAQSchema,
  schemaToJsonLd,
} from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { getToolRichProps } from '@/lib/tool-rich-props';
import { RelatedTools } from '@/components/RelatedTools';
import GrammarFixClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('grammar-fix');

export const metadata: Metadata = {
  title: toolMeta?.title || 'Fix Grammar Mistakes in Essays Free – No Signup',
  description:
    toolMeta?.description ||
    'Free AI grammar checker for essays, emails & ESL writing. Fix spelling, punctuation & clarity—no account needed.',
  keywords: toolMeta?.keywords || [
    'fix grammar mistakes in essay free',
    'free AI grammar checker no signup',
    'proofread my essay free online',
  ],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/grammar-fix' },
  openGraph: {
    title: `${toolMeta?.title || 'Fix Grammar Mistakes in Essays Free'} | ToolNova`,
    description:
      toolMeta?.description ||
      'Fix grammar, spelling, and punctuation free—no signup required.',
    url: 'https://www.toolnovahub.com/tools/grammar-fix',
    type: 'website',
    images: [
      {
        url: 'https://www.toolnovahub.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AI Grammar Checker – ToolNova',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${toolMeta?.title || 'Fix Grammar Mistakes Free'} | ToolNova`,
    description: 'Proofread essays and emails free with AI grammar checking.',
  },
};

export default function GrammarFixPage() {
  const toolData = getToolData('grammar-fix');

  if (!toolData) return <GrammarFixClient />;

  const rich = getToolRichProps('grammar-fix', toolData);

  const toolSchema = getToolSchema(
    toolData.name,
    toolData.description,
    'https://www.toolnovahub.com/tools/grammar-fix',
  );

  const howToSchema = getHowToSchema(
    'How to Fix Grammar Mistakes in Essays Free',
    toolData.description,
    toolData.howItWorks.map((step) => ({
      name: step.title,
      text: step.desc,
      url: `https://www.toolnovahub.com/tools/grammar-fix#step-${step.step}`,
    })),
  );

  const faqSchema = getFAQSchema(toolData.faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.toolnovahub.com' },
    { name: 'Tools', url: 'https://www.toolnovahub.com/tools' },
    { name: 'Writing Tools', url: 'https://www.toolnovahub.com/tools/writing-tools' },
    { name: 'Grammar Fix', url: 'https://www.toolnovahub.com/tools/grammar-fix' },
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
      <GrammarFixClient />
      <ToolRichContent {...rich} />
      <RelatedBlogGuides toolSlug="grammar-fix" />
      <RelatedTools currentTool="grammar-fix" category="Writing" />
    </>
  );
}
