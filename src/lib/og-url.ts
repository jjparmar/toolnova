import { siteConfig } from"@/config/site";

/**
 * Generate the dynamic OG image URL for a tool page.
 *
 * Points to the /api/og route which renders a branded 1200×630 image
 * on the fly using Next.js ImageResponse.
 *
 * @example
 *   getToolOGImageUrl("Grammar Checker","Fix grammar errors instantly.","Writing");
 *   // =>"https://www.toolnovahub.com/api/og?title=Grammar+Checker&description=Fix+grammar+errors+instantly.&category=Writing"
 */
export function getToolOGImageUrl(
  title: string,
  description?: string,
  category?: string,
): string {
  const params = new URLSearchParams({ title });
  if (description) params.set("description", description);
  if (category) params.set("category", category);
  return`${siteConfig.url}/api/og?${params.toString()}`;
}
