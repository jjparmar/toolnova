import Link from "next/link";
import {
  getRelatedGuidesForTool,
  type RelatedGuide,
} from "@/lib/related-blog-guides";

type Props = {
  toolSlug: string;
  /** Extra guides to prepend (e.g. category hubs) */
  extras?: RelatedGuide[];
  className?: string;
};

/**
 * Internal-link block for tool pages — helps Google discover blog URLs
 * and routes users to deeper guides.
 */
export function RelatedBlogGuides({ toolSlug, extras = [], className }: Props) {
  const guides = [...extras, ...getRelatedGuidesForTool(toolSlug)];
  // de-dupe by href
  const seen = new Set<string>();
  const unique = guides.filter((g) => {
    if (seen.has(g.href)) return false;
    seen.add(g.href);
    return true;
  });

  if (unique.length === 0) return null;

  return (
    <section className={className ?? "mx-auto max-w-5xl px-4 py-8"}>
      <h2 className="text-xl font-semibold mb-3">Related guides and tools</h2>
      <div className="flex flex-wrap gap-3 text-sm">
        <Link href="/tools" className="underline underline-offset-4">
          All AI tools
        </Link>
        {unique.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="underline underline-offset-4"
          >
            {g.label}
          </Link>
        ))}
      </div>
    </section>
  );
}
