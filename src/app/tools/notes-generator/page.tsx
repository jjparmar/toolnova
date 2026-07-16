import { Metadata } from 'next';
import Link from 'next/link';
import { getToolSchema, getHowToSchema, getFAQSchema, schemaToJsonLd } from '@/lib/schema';
import { getToolData } from '@/data/tools';
import { RelatedTools } from '@/components/RelatedTools';
import NotesGeneratorClient from './client';
import { ToolRichContent } from '@/components/ToolRichContent';

export const metadata: Metadata = {
  title: 'AI Notes Generator – Create Study Notes Free | ToolNova',
  description: 'Generate organized study notes instantly with our free AI notes generator. Cornell method, bullet points, outlines and more.',
  keywords: ['AI notes generator', 'study notes maker', 'note taking AI', 'lecture notes'],
  alternates: { canonical: 'https://www.toolnovahub.com/tools/notes-generator' },
  openGraph: {
    title: 'AI Notes Generator – Create Study Notes Free | ToolNova',
    description: 'Generate organized study notes instantly with our free AI notes generator. Cornell method, bullet points, outlines and more.',
    url: 'https://www.toolnovahub.com/tools/notes-generator',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Notes Generator – Create Study Notes Free | ToolNova',
    description: 'Generate organized study notes instantly with our free AI notes generator. Cornell method, bullet points, outlines and more.',
  },
};

export default function NotesGeneratorPage() {
    const toolData = getToolData('notes-generator');

    const toolSchema = getToolSchema(
        toolData?.name || 'notes-generator',
        toolData?.description || '',
        'https://www.toolnovahub.com/tools/notes-generator'
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
                            url:`https://www.toolnovahub.com/tools/notes-generator#step-${step.step}`
                        }))
                    )) }} />
                    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaToJsonLd(getFAQSchema(toolData.faqs)) }} />
                </>
            )}
            <NotesGeneratorClient />
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
          <Link href="/tools/image-pdf-tools" className="underline underline-offset-4">Image & PDF tools</Link>
          <Link href="/blog" className="underline underline-offset-4">Blog guides</Link>
        </div>
      </section>

            <RelatedTools currentTool="notes-generator" category="Study" />
        </>
    );
}
