import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * CategoryCard — horizontal "explore by category" tile.
 * Icon tile on the left, title + description on the right, arrow on hover.
 */
export function CategoryCard({
  href,
  title,
  description,
  icon: Icon,
  count,
  className,
}: {
  href: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  count?: number | string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "surface-card group flex items-start gap-3 p-4 hover:-translate-y-0.5",
        className
      )}
    >
      <div className="icon-tile shrink-0">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1">
          <h3 className="font-heading font-semibold text-foreground transition-colors group-hover:text-primary">
            {title}
          </h3>
          {typeof count !== "undefined" && (
            <span className="text-xs font-semibold text-muted-foreground">
              {count}
            </span>
          )}
        </div>
        {description && (
          <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:text-primary" />
    </Link>
  );
}
