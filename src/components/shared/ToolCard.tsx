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
  /** Solid icon bg color class e.g. bg-[#8b5cf6] */
  iconBg?: string;
}

export function ToolCard({
  href,
  title,
  description,
  icon: Icon,
  badge,
  variant = "grid",
  gradient = "from-[#7c3aed] to-[#d946ef]",
  iconBg,
  className,
}: ToolCardProps) {
  if (variant === "related") {
    return (
      <Link
        href={href}
        className={cn(
          "surface-card group flex flex-col items-center p-5 text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/40",
          className
        )}
      >
        <div
          className={cn(
            "tool-icon mb-3 h-12 w-12 rounded-xl bg-gradient-to-br text-white shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3",
            iconBg || gradient
          )}
        >
          <Icon className="h-5.5 w-5.5" strokeWidth={2} />
        </div>
        <p className="font-heading text-sm font-extrabold text-foreground transition-colors group-hover:text-primary">
          {title}
        </p>
        {description && (
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
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
        "surface-card group relative flex flex-col overflow-hidden p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl",
        className
      )}
    >
      {/* Top hover accent bar */}
      <div
        className={cn(
          "absolute left-0 right-0 top-0 h-[3px] bg-gradient-to-r opacity-0 transition-opacity duration-300 group-hover:opacity-100",
          iconBg || gradient
        )}
      />

      {/* Badge */}
      {badge && (
        <span className="absolute right-4 top-4 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-primary border border-primary/20">
          {badge}
        </span>
      )}

      {/* Icon Tile */}
      <div
        className={cn(
          "tool-icon mb-4 flex h-13 w-13 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3",
          iconBg || gradient
        )}
      >
        <Icon className="h-6 w-6" strokeWidth={2} />
      </div>

      {/* Title */}
      <h3 className="font-heading mb-1.5 text-lg font-extrabold leading-snug text-foreground transition-colors group-hover:text-primary">
        {title}
      </h3>

      {/* Description */}
      {description && (
        <p className="flex-1 text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      )}

      {/* CTA Footer */}
      <div className="mt-5 flex items-center gap-1.5 border-t border-[var(--border-color)] pt-4 text-xs font-bold uppercase tracking-wider text-primary">
        <span>Open tool</span>
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
      </div>
    </Link>
  );
}

