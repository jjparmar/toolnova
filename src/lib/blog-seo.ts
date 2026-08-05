/**
 * Blog topical-authority helpers.
 *
 * ToolNova ranks best when the index is focused on free AI/study/PDF/writing tools.
 * Off-topic SaaS/enterprise review posts dilute that signal and burn crawl budget.
 * Keep them live for users, but do not ask Google to index them as priority content.
 */

import type { BlogPost } from "@/data/blog/types";

/** Categories that do not support ToolNova's core product topic. */
const OFF_TOPIC_CATEGORIES = new Set([
  "Business & Technology",
  "Cloud Computing & IT",
  "Business Software",
  "Business AI",
  "Enterprise Security",
  "Marketing & Business",
]);

/**
 * Explicit slugs that look educational but do not map to our tools
 * (affiliate-style degree/SaaS content, etc.).
 */
const OFF_TOPIC_SLUGS = new Set([
  "best-online-programming-courses-with-certificates",
  "best-lms-for-training-companies-and-corporate-learning",
  "aws-vs-azure-vs-google-cloud-comparison",
  "best-payroll-software-small-business",
  "erp-software-guide-how-to-choose-for-your-business",
  "best-cloud-call-center-software-small-business",
  "virtual-data-room-software-best-options-enterprises",
  "ai-agents-transforming-customer-support-2026",
  "chatgpt-vs-claude-vs-gemini-best-ai-for-business",
  "marketing-automation-software-ultimate-comparison",
  "best-help-desk-software-small-business-2026",
  "ai-hr-software-complete-guide-small-business",
  "top-10-enterprise-vpn-solutions-remote-teams",
  "how-ai-is-transforming-small-business-operations-2026",
  "top-email-marketing-solutions-business-growth",
  "best-online-business-degree-programs-2026",
  "online-mba-programs-guide-working-professionals",
]);

/** Core product categories we want indexed and linked. */
export const CORE_BLOG_CATEGORIES = new Set([
  "AI Tools",
  "Writing & Content",
  "Writing Tips",
  "Education & Study",
  "Study Tips",
  "Productivity",
  "PDF & Productivity",
  "Guides",
  "Career",
  "Content Creation",
]);

export function isIndexableBlogPost(post: Pick<BlogPost, "slug" | "category">): boolean {
  if (OFF_TOPIC_SLUGS.has(post.slug)) return false;
  if (OFF_TOPIC_CATEGORIES.has(post.category)) return false;
  return true;
}

export function filterIndexableBlogPosts<T extends Pick<BlogPost, "slug" | "category">>(
  posts: T[],
): T[] {
  return posts.filter(isIndexableBlogPost);
}
