import type { ToolData } from '@/data/tools';
import { getToolLongtail } from '@/data/tool-longtail';

/** Build ToolRichContent props from core tool data + long-tail SEO package. */
export function getToolRichProps(slug: string, toolData: ToolData) {
  const lt = getToolLongtail(slug);

  return {
    title: lt?.displayTitle || toolData.name,
    description: toolData.description,
    steps: toolData.howItWorks,
    benefits: toolData.benefits,
    faq: toolData.faqs,
    quickAnswer: lt?.quickAnswer,
    bestFor: lt?.bestFor,
    notIdealFor: lt?.notIdealFor,
    useCases: lt?.useCases,
    comparison: lt?.comparison,
    expertTips: lt?.expertTips,
    relatedLinks: lt?.relatedLinks,
    longFormSections: lt?.longFormSections,
    lastReviewed: lt?.lastReviewed || 'August 2026',
  };
}
