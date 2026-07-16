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
          "surface-card group flex flex-col items-center p-6 text-center hover:-translate-y-1.5",
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
  const isGrid = variant === "grid";
  return (
    <Link
      href={href}
      className={cn(
        "surface-card group relative flex flex-col overflow-hidden p-6 hover:-translate-y-1.5",
        className
      )}
    >
      {/* Top hover accent bar */}
      {gradient && (
        <div
          className={cn(
            "absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100",
            gradient
          )}
        />
      )}

      {/* Badge */}
      {badge && (
        <Pill
          tone={badgeTone}
          size="sm"
          className="absolute right-4 top-4 shadow-sm bg-background border border-border"
        >
          {badge}
        </Pill>
      )}

      {/* Icon tile */}
      <IconTile
        icon={Icon}
        size="md"
        gradient={gradient}
        tone={tone}
        className={cn(
          "mb-5 transition-shadow",
          glowColor && `group-hover:${glowColor} group-hover:shadow-lg`
        )}
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
      <div className="mt-5 flex items-center gap-1 pt-4 text-sm font-semibold text-primary/80 group-hover:text-primary transition-colors border-t border-border/40">
        Open tool
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
