import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToolCardVariant = "featured" | "grid" | "related";

export interface ToolCardProps {
  href: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  badge?: string;
  badgeTone?: "muted" | "primary" | "success" | "warning";
  variant?: ToolCardVariant;
  /** Tailwind gradient classes e.g. from-rose-500 to-orange-500 */
  gradient?: string;
  glowColor?: string;
  tone?: "primary" | "success" | "warning" | "muted";
  className?: string;
  /** Solid icon bg color class e.g. bg-[#E5322D] */
  iconBg?: string;
}

/**
 * iLovePDF-style tool card: white surface, colorful icon tile, clear title + desc.
 */
export function ToolCard({
  href,
  title,
  description,
  icon: Icon,
  badge,
  variant = "grid",
  gradient = "from-primary to-[hsl(var(--primary-deep))]",
  iconBg,
  className,
}: ToolCardProps) {
  if (variant === "related") {
    return (
      <Link
        href={href}
        className={cn(
          "surface-card group flex flex-col items-center p-5 text-center",
          className
        )}
      >
        <div
          className={cn(
            "tool-icon mb-3 bg-gradient-to-br",
            iconBg || gradient
          )}
        >
          <Icon className="h-6 w-6" strokeWidth={1.75} />
        </div>
        <p className="font-heading text-sm font-bold text-foreground group-hover:text-primary transition-colors">
          {title}
        </p>
        {description && (
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
            {description}
          </p>
        )}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "surface-card group relative flex flex-col p-5 sm:p-6",
        className
      )}
    >
      {badge && (
        <span className="absolute right-4 top-4 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary">
          {badge}
        </span>
      )}

      <div
        className={cn(
          "tool-icon mb-4 bg-gradient-to-br transition-transform duration-200 group-hover:scale-105",
          iconBg || gradient
        )}
      >
        <Icon className="h-6 w-6" strokeWidth={1.75} />
      </div>

      <h3 className="font-heading mb-1.5 text-[1.05rem] font-bold leading-snug text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>

      {description && (
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}

      <div className="mt-4 flex items-center gap-1 text-sm font-semibold text-primary">
        Open tool
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
