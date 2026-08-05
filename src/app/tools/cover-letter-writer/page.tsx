import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { getToolRichProps } from '@/lib/tool-rich-props';
import { RelatedTools } from '@/components/RelatedTools';
import CoverLetterWriterClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('cover-letter-writer');

export const metadata: Metadata = {
  title: toolMeta?.title || 'Write a Cover Letter for Any Job Free – AI',
  description:
    toolMeta?.description ||
    'Free AI cover letter writer—no login to start. Paste the job & your background, get a tailored draft, then personalize.',
  keywords: toolMeta?.keywords || [
    'write cover letter for any job free',
    'AI cover letter generator no signup',
    'free cover letter writer for job application',
  ],
  alternates: {
    canonical: 'https://www.toolnovahub.com/tools/cover-letter-writer',
  },
  openGraph: {
    title: `${toolMeta?.title || 'Cover Letter Writer Free'} | ToolNova`,
    description:
      toolMeta?.description ||
      'Write a personalized cover letter free for any job. Edit before you apply.',
    url: 'https://www.toolnovahub.com/tools/cover-letter-writer',
    type: 'website',
    images: [
      {
        url: 'https://www.toolnovahub.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Cover Letter Writer Free – ToolNova',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${toolMeta?.title || 'Cover Letter Free'} | ToolNova`,
    description: 'Free AI cover letter generator. Tailor, personalize, apply.',
  },
};

export default function CoverLetterWriterPage() {
  const toolData = getToolData('cover-letter-writer');

  if (!toolData) return <CoverLetterWriterClient />;

  const rich = getToolRichProps('cover-letter-writer', toolData);

  const toolSchema = getToolSchema(
    toolData.name,
    toolData.description,
    'https://www.toolnovahub.com/tools/cover-letter-writer',
  );

  const howToSchema = getHowToSchema(
    'How to Write a Cover Letter for Any Job Free with AI',
    toolData.description,
    toolData.howItWorks.map((step) => ({
      name: step.title,
      text: step.desc,
      url: `https://www.toolnovahub.com/tools/cover-letter-writer#step-${step.step}`,
    })),
  );

  const faqSchema = getFAQSchema(toolData.faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.toolnovahub.com' },
    { name: 'Tools', url: 'https://www.toolnovahub.com/tools' },
    { name: 'Career Tools', url: 'https://www.toolnovahub.com/tools/career-tools' },
    {
      name: 'Cover Letter Writer',
      url: 'https://www.toolnovahub.com/tools/cover-letter-writer',
    },
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
      <CoverLetterWriterClient />
      <ToolRichContent {...rich} />
      <RelatedBlogGuides toolSlug="cover-letter-writer" />
      <RelatedTools currentTool="cover-letter-writer" category="Career" />
    </>
  );
}
