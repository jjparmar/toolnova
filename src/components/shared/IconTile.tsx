import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

/**
 * IconTile — the standard icon container used across cards & sections.
 * `tone` selects a soft tinted background driven by design tokens,
 * so colors stay consistent in light & dark mode.
 *
 * For tool/category cards that want vivid per-tool gradients,
 * pass `gradient` (e.g. "from-rose-500 to-orange-500") instead of a tone.
 */
const TONES: Record<string, string> = {
  primary: "bg-primary/10 text-primary",
  success: "bg-success/10 text-success",
  warning: "bg-warning/15 text-warning-foreground",
  muted: "bg-muted text-muted-foreground",
};

export function IconTile({
  icon: Icon,
  className,
  tone = "primary",
  gradient,
  size = "md",
}: {
  icon: LucideIcon;
  className?: string;
  tone?: keyof typeof TONES;
  gradient?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizes: Record<string, string> = {
    sm: "h-10 w-10 rounded-xl",
    md: "h-12 w-12 rounded-xl",
    lg: "h-14 w-14 rounded-2xl",
  };
  const iconSizes: Record<string, string> = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-7 w-7",
  };
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-105",
        sizes[size],
        gradient
          ? cn("bg-gradient-to-br text-white shadow-lg", gradient)
          : TONES[tone],
        className
      )}
    >
      <Icon className={iconSizes[size]} />
    </div>
  );
}
