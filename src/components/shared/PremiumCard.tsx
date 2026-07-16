import { cn } from "@/lib/utils";

/**
 * PremiumCard — the canonical elevated surface card.
 * Token-driven (works in light + dark), hover-lift, consistent radius.
 * Use for feature cards, info cards, why-us, etc.
 *
 * Pass `interactive={false}` to disable the hover effect (e.g. static info).
 */
export function PremiumCard({
  children,
  className,
  interactive = true,
  as: Component = "div",
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  as?: React.ElementType;
}) {
  return (
    <Component
      className={cn(
        interactive ? "surface-card" : "surface-card-quiet",
        interactive && "group",
        "p-6",
        className
      )}
    >
      {children}
    </Component>
  );
}
