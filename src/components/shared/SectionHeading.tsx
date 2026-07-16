import { cn } from "@/lib/utils";

/**
 * SectionHeading — the standard section title block used site-wide.
 * Replaces the hand-rolled eyebrow + h2 + subtitle markup repeated across pages.
 *
 * - eyebrow: small uppercase primary label above the title
 * - title:   the section H2 (rendered with Plus Jakarta Sans via .font-heading)
 * - subtitle: optional supporting line
 * - align:   "center" (default) or "left"
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
  as: Heading = "h2",
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
  titleClassName?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const centered = align === "center";
  return (
    <div
      className={cn(
        centered ? "mx-auto mb-12 max-w-2xl text-center" : "mb-10 max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "eyebrow mb-3",
            centered && "justify-center"
          )}
        >
          {eyebrow}
        </p>
      )}
      <Heading
        className={cn(
          "font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl",
          titleClassName
        )}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={cn(
            "mt-3 text-base text-muted-foreground md:text-lg",
            centered && "mx-auto max-w-xl"
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
