import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Full-width coral CTA band — iLovePDF "Get Premium" energy.
 */
export function CTASection({
  title,
  description,
  href,
  buttonText = "Browse all tools",
  icon: Icon,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  href: string;
  buttonText?: string;
  icon?: LucideIcon;
  className?: string;
}) {
  return (
    <section className={cn("bg-primary py-14 text-primary-foreground md:py-16", className)}>
      <div className="mx-auto max-w-[900px] px-6 text-center">
        {Icon && (
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15">
            <Icon className="h-6 w-6" />
          </div>
        )}
        <h2 className="font-heading mb-3 text-2xl font-extrabold tracking-tight md:text-3xl">
          {title}
        </h2>
        {description && (
          <p className="mx-auto mb-7 max-w-lg text-base text-primary-foreground/90">
            {description}
          </p>
        )}
        <Link
          href={href}
          className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-8 text-base font-bold text-primary shadow-sm transition-all hover:-translate-y-0.5 hover:bg-white/95"
        >
          {buttonText}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
