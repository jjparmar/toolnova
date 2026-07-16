import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

/**
 * IconTile — the standard icon container used across cards & sections.
 * Clean, minimalist aesthetic for the premium UI.
 */
const TONES: Record<string, string> = {
  primary: "bg-primary/10 text-primary border-primary/20",
  success: "bg-success/10 text-success border-success/20",
  warning: "bg-warning/10 text-warning-foreground border-warning/20",
  muted: "bg-muted text-foreground border-border",
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
    sm: "h-10 w-10 rounded-[0.5rem]",
    md: "h-12 w-12 rounded-[0.6rem]",
    lg: "h-14 w-14 rounded-xl",
  };
  const iconSizes: Record<string, string> = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-7 w-7",
  };
  
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center transition-all duration-300 group-hover:scale-110",
        sizes[size],
        gradient
          ? cn("bg-gradient-to-br text-white shadow-md shadow-primary/20 border-0", gradient)
          : cn("border border-border", TONES[tone]),
        className
      )}
    >
      <Icon className={iconSizes[size]} />
    </div>
  );
}
