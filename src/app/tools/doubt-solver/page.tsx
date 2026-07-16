import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import DoubtSolverClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
    title: 'AI Doubt Solver – Get Instant Answers Free | ToolNova',
    description: 'Get instant answers to any academic question with our free AI doubt solver. Perfect for students needing quick, accurate explanations.',
    keywords: ['AI doubt solver', 'ask questions online', 'instant answers', 'study help', 'homework help'],
    alternates: { canonical: 'https://www.toolnovahub.com/tools/doubt-solver' },
  openGraph: {
    title: 'AI Doubt Solver – Get Instant Answers Free | ToolNova',
    description: 'Ask any study doubt and get clear step-by-step explanations.',
    url: 'https://www.toolnovahub.com/tools/doubt-solver',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Doubt Solver – Get Instant Answers Free | ToolNova',
    description: 'Ask any study doubt and get clear step-by-step explanations.',
  },
};

export default function DoubtSolverPage() {
    const toolData = getToolData('doubt-solver');

    const toolSchema = getToolSchema(
        toolData?.name || 'doubt-solver',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/doubt-solver'
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
                            url:`https://www.toolnovahub.com/tools/doubt-solver#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <DoubtSolverClient />
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
          <Link href="/tools/study-tools" className="underline underline-offset-4">Study tools</Link>
          <Link href="/tools/writing-tools" className="underline underline-offset-4">Writing tools</Link>
          <Link href="/blog" className="underline underline-offset-4">Blog guides</Link>
        </div>
      </section>

            <RelatedTools currentTool="doubt-solver" category="Study" />
        </>
    );
}
