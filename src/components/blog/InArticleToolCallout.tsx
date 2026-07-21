'use client';

import Link from 'next/link';
import { FaRocket, FaArrowRight } from 'react-icons/fa';

interface InArticleToolCalloutProps {
  category?: string;
  toolSlug?: string;
}

const toolPrompts: Record<string, { title: string; desc: string; toolName: string; href: string }> = {
  'Writing': {
    title: 'Need help rewriting or polishing your text?',
    desc: 'Use ToolNova’s 100% free Paraphraser & Grammar Checker. No signup required.',
    toolName: 'Try Free Writing Tools',
    href: '/tools/writing-tools',
  },
  'Study': {
    title: 'Stuck on homework or exam prep?',
    desc: 'Solve homework step-by-step and create study flashcards in seconds.',
    toolName: 'Try AI Study Tools',
    href: '/tools/study-tools',
  },
  'PDF & Image': {
    title: 'Working with PDFs or image files?',
    desc: 'Merge PDFs, split documents, compress images, and convert formats in your browser.',
    toolName: 'Explore PDF & Image Tools',
    href: '/tools/image-pdf-tools',
  },
  'Career': {
    title: 'Applying for jobs or updating your resume?',
    desc: 'Generate powerful resume bullets, cover letters, and LinkedIn summaries with AI.',
    toolName: 'Try Career Tools',
    href: '/tools/career-tools',
  },
};

export function InArticleToolCallout({ category }: InArticleToolCalloutProps) {
  const config = toolPrompts[category || 'Writing'] || toolPrompts['Writing'];

  return (
    <div className="my-10 overflow-hidden rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-6 border border-primary/20 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="rounded-xl bg-primary text-primary-foreground p-3 shadow-md">
            <FaRocket className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-foreground text-base sm:text-lg">
              {config.title}
            </h4>
            <p className="text-muted-foreground text-sm mt-0.5">
              {config.desc}
            </p>
          </div>
        </div>
        <Link
          href={config.href}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-md transition-all hover:bg-primary/90 hover:gap-3"
        >
          {config.toolName}
          <FaArrowRight className="text-xs" />
        </Link>
      </div>
    </div>
  );
}

export default InArticleToolCallout;
