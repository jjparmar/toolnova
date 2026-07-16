import { cn } from "@/lib/utils";

/**
 * Pill — small pill-shaped label.
 * Used for eyebrows, badges ("Popular", "New"), and meta tags.
 */
export function Pill({
  children,
  className,
  tone = "muted",
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "muted" | "primary" | "success" | "warning" | "outline";
  size?: "sm" | "md";
}) {
  const tones: Record<string, string> = {
    muted:
      "bg-muted text-muted-foreground",
    primary:
      "bg-primary/10 text-primary",
    success:
      "bg-success/10 text-success",
    warning:
      "bg-warning/15 text-warning-foreground",
    outline:
      "border border-border text-muted-foreground",
  };
  const sizes: Record<string, string> = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full font-semibold uppercase tracking-wide",
        tones[tone],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
