import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { IconTile } from "./IconTile";
import { Pill } from "./Pill";

export type ToolCardVariant = "featured" | "grid" | "related";

export interface ToolCardProps {
  href: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  badge?: string;
  badgeTone?: "muted" | "primary" | "success" | "warning";
  variant?: ToolCardVariant;
  gradient?: string; // Kept for API compatibility, but ignored by new clean styles
  glowColor?: string; // Kept for API compatibility
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
          tone={tone}
          className="mb-4"
        />
        <p className="font-heading text-sm font-semibold text-foreground transition-colors group-hover:text-primary sm:text-base">
          {title}
        </p>
        {description && (
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        )}
      </Link>
    );
  }

  /* ---------- featured + grid: full card with footer ---------- */
  return (
    <Link
      href={href}
      className={cn(
        "surface-card group relative flex flex-col overflow-hidden p-6 hover:bg-muted/30",
        className
      )}
    >
      {/* Badge */}
      {badge && (
        <Pill
          tone={badgeTone}
          size="sm"
          className="absolute right-4 top-4 shadow-sm bg-background"
        >
          {badge}
        </Pill>
      )}

      {/* Icon tile */}
      <IconTile
        icon={Icon}
        size="md"
        tone={tone}
        className="mb-5"
      />

      {/* Title */}
      <h3 className="mb-2 font-heading text-base font-semibold leading-snug tracking-tight text-foreground transition-colors group-hover:text-primary">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}

      {/* Footer link */}
      <div className="mt-5 flex items-center gap-1 pt-4 text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors">
        Open tool
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
