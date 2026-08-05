import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { getToolRichProps } from '@/lib/tool-rich-props';
import { RelatedTools } from '@/components/RelatedTools';
import ResumeBulletsClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('resume-bullets');

export const metadata: Metadata = {
  title: toolMeta?.title || 'Generate Resume Bullet Points Free – AI',
  description:
    toolMeta?.description ||
    'Free AI resume bullets—turn duties into action-verb achievements. No signup to start. Always use real metrics.',
  keywords: toolMeta?.keywords || [
    'generate resume bullet points free',
    'AI resume bullet point generator',
    'free ATS-friendly resume bullet generator',
  ],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/resume-bullets' },
  openGraph: {
    title: `${toolMeta?.title || 'Resume Bullet Points Free'} | ToolNova`,
    description:
      toolMeta?.description ||
      'Generate ATS-friendly resume achievements free with action verbs and results.',
    url: 'https://www.toolnovahub.com/tools/resume-bullets',
    type: 'website',
    images: [
      {
        url: 'https://www.toolnovahub.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Resume Bullets Free – ToolNova',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${toolMeta?.title || 'Resume Bullets Free'} | ToolNova`,
    description: 'Free AI resume bullet generator. Action + result format.',
  },
};

export default function ResumeBulletsPage() {
  const toolData = getToolData('resume-bullets');

  if (!toolData) return <ResumeBulletsClient />;

  const rich = getToolRichProps('resume-bullets', toolData);

  const toolSchema = getToolSchema(
    toolData.name,
    toolData.description,
    'https://www.toolnovahub.com/tools/resume-bullets',
  );

  const howToSchema = getHowToSchema(
    'How to Generate Resume Bullet Points Free with AI',
    toolData.description,
    toolData.howItWorks.map((step) => ({
      name: step.title,
      text: step.desc,
      url: `https://www.toolnovahub.com/tools/resume-bullets#step-${step.step}`,
    })),
  );

  const faqSchema = getFAQSchema(toolData.faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.toolnovahub.com' },
    { name: 'Tools', url: 'https://www.toolnovahub.com/tools' },
    { name: 'Career Tools', url: 'https://www.toolnovahub.com/tools/career-tools' },
    { name: 'Resume Bullets', url: 'https://www.toolnovahub.com/tools/resume-bullets' },
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
      <ResumeBulletsClient />
      <ToolRichContent {...rich} />
      <RelatedBlogGuides toolSlug="resume-bullets" />
      <RelatedTools currentTool="resume-bullets" category="Career" />
    </>
  );
}
