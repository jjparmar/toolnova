import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconTile } from "./IconTile";
import { Pill } from "./Pill";

/**
 * ToolCard — the single, shared tool-card component for the whole site.
 * Replaces the 3+ hand-rolled card variants (HomeDashboard, ToolsLibrary,
 * RelatedTools, PremiumToolWrapper).
 *
 * Variants:
 *  - "featured": homepage featured row — soft tinted icon tile, badge, footer link
 *  - "grid":     tools library grid   — vivid gradient icon tile, badge, top accent bar
 *  - "related":  compact, centered icon + name (related-tools strip)
 *
 * Props:
 *  - href, title, description, icon
 *  - badge?:        short label ("Popular", "New") — shown as a Pill
 *  - badgeTone?:    color tone for the badge
 *  - gradient?:     tailwind gradient for the icon tile, e.g. "from-rose-500 to-orange-500"
 *                   (used by "grid"; "featured" defaults to a soft tint via `tone`)
 *  - tone?:         soft tint color for the "featured" icon tile
 *  - glowColor?:    tailwind shadow color class for the gradient tile, e.g. "shadow-rose-500/20"
 */
export type ToolCardVariant = "featured" | "grid" | "related";

export interface ToolCardProps {
  href: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  badge?: string;
  badgeTone?: "muted" | "primary" | "success" | "warning";
  variant?: ToolCardVariant;
  gradient?: string;
  glowColor?: string;
  tone?: "primary" | "success" | "warning" | "muted";
  className?: string;
}

export function ToolCard({
  href,
  title,
  description,
  icon: Icon,
  badge,
  badgeTone = "muted",
  variant = "grid",
  gradient,
  glowColor,
  tone = "primary",
  className,
}: ToolCardProps) {
  /* ---------- related: compact centered card ---------- */
  if (variant === "related") {
    return (
      <Link
        href={href}
        className={cn(
          "surface-card group flex flex-col items-center p-6 text-center",
          className
        )}
      >
        <IconTile
          icon={Icon}
          size="md"
          gradient={gradient}
          tone={tone}
          className="mb-4"
        />
        <p className="font-heading text-sm font-bold text-foreground transition-colors group-hover:text-primary sm:text-base">
          {title}
        </p>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </Link>
    );
  }

  /* ---------- featured + grid: full card with footer ---------- */
  const isGrid = variant === "grid";
  return (
    <Link
      href={href}
      className={cn(
        "surface-card group relative flex flex-col overflow-hidden p-6",
        isGrid && "hover:-translate-y-1.5",
        className
      )}
    >
      {/* Top hover accent bar (grid variant, vivid) */}
      {isGrid && gradient && (
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            gradient
          )}
        />
      )}

      {/* Badge */}
      {badge && (
        <Pill
          tone={badgeTone}
          size="sm"
          className={cn("absolute right-4 top-4", isGrid && "shadow-sm")}
        >
          {badge}
        </Pill>
      )}

      {/* Icon tile — gradient if provided (grid + featured with gradient), otherwise soft tone */}
      <IconTile
        icon={Icon}
        size="md"
        gradient={gradient}
        tone={!gradient ? tone : undefined}
        className={cn(
          "mb-5",
          glowColor && "shadow-lg",
          glowColor
        )}
      />

      {/* Title */}
      <h3 className="mb-2 font-heading text-base font-bold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}

      {/* Footer link */}
      <div className="mt-5 flex items-center gap-1 border-t border-border/60 pt-4 text-sm font-semibold text-primary">
        Open tool
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1.5" />
      </div>
    </Link>
  );
}
