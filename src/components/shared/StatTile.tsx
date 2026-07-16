import { cn } from"@/lib/utils";

/**
 * StatTile — the small stat card used in hero strips
 * (e.g."49 Tools","$0 To start","Private").
 */
export function StatTile({
  value,
  label,
  className,
}: {
  value: React.ReactNode;
  label: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("rounded-2xl border border-border bg-card/90 px-3 py-3.5 shadow-premium-sm backdrop-blur-sm",
        className
      )}
    >
      <div className="font-heading text-xl font-semibold text-foreground sm:text-2xl">
        {value}
      </div>
      <div className="mt-0.5 text-xs text-muted-foreground sm:text-sm">
        {label}
      </div>
    </div>
  );
}
