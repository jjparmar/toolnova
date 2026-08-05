import { Metadata } from 'next';
import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { generateBreadcrumbSchema } from '@/lib/seo-advanced';
import { getToolData } from '@/data/tools';
import { getOptimizedToolMetadata } from '@/lib/tool-metadata';
import { getToolRichProps } from '@/lib/tool-rich-props';
import { RelatedTools } from '@/components/RelatedTools';
import QuizGeneratorClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

const toolMeta = getOptimizedToolMetadata('quiz-generator');

export const metadata: Metadata = {
  title: toolMeta?.title || 'Create a Quiz from Any Topic Free – AI',
  description:
    toolMeta?.description ||
    'Free AI quiz maker—practice questions from any topic or notes with an answer key. No account needed to start.',
  keywords: toolMeta?.keywords || [
    'create quiz from any topic free',
    'generate quiz questions from text free',
    'free AI quiz maker for teachers',
  ],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/quiz-generator' },
  openGraph: {
    title: `${toolMeta?.title || 'Create a Quiz Free'} | ToolNova`,
    description:
      toolMeta?.description ||
      'Generate practice quizzes free from topics or notes. Answer key included.',
    url: 'https://www.toolnovahub.com/tools/quiz-generator',
    type: 'website',
    images: [
      {
        url: 'https://www.toolnovahub.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Quiz Generator Free – ToolNova',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${toolMeta?.title || 'Quiz Generator Free'} | ToolNova`,
    description: 'Free AI quiz maker for students and teachers. No signup to start.',
  },
};

export default function QuizGeneratorPage() {
  const toolData = getToolData('quiz-generator');

  if (!toolData) return <QuizGeneratorClient />;

  const rich = getToolRichProps('quiz-generator', toolData);

  const toolSchema = getToolSchema(
    toolData.name,
    toolData.description,
    'https://www.toolnovahub.com/tools/quiz-generator',
  );

  const howToSchema = getHowToSchema(
    'How to Create a Quiz from Any Topic Free',
    toolData.description,
    toolData.howItWorks.map((step) => ({
      name: step.title,
      text: step.desc,
      url: `https://www.toolnovahub.com/tools/quiz-generator#step-${step.step}`,
    })),
  );

  const faqSchema = getFAQSchema(toolData.faqs);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.toolnovahub.com' },
    { name: 'Tools', url: 'https://www.toolnovahub.com/tools' },
    { name: 'Study Tools', url: 'https://www.toolnovahub.com/tools/study-tools' },
    { name: 'Quiz Generator', url: 'https://www.toolnovahub.com/tools/quiz-generator' },
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
      <QuizGeneratorClient />
      <ToolRichContent {...rich} />
      <RelatedBlogGuides toolSlug="quiz-generator" />
      <RelatedTools currentTool="quiz-generator" category="Study" />
    </>
  );
}
