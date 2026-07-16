import Link from"next/link";
import { ArrowRight } from"lucide-react";
import type { LucideIcon } from"lucide-react";
import { cn } from"@/lib/utils";

/**
 * CTASection — the full-width call-to-action band that closes most pages.
 * Uses the brand gradient + soft glow instead of a flat bg-primary block,
 * ending pages with the same depth the hero opens them with.
 *
 * Renders as a server-safe component (no client hooks).
 */
export function CTASection({
  title,
  description,
  href,
  buttonText ="Browse all tools",
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
    <section className={cn("py-16 md:py-20", className)}>
      <div className="mx-auto max-w-[1120px] px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-brand px-6 py-14 text-center text-primary-foreground shadow-premium-lg md:px-12 md:py-16">
          {/* Decorative glow — clean, no pulsing blobs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-white/8 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-pattern-dots opacity-[0.06]"
          />

          <div className="relative z-10">
            {Icon && (
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-sm">
                <Icon className="h-6 w-6" />
              </div>
            )}
            <h2 className="font-heading mx-auto mb-4 max-w-2xl text-3xl font-bold tracking-tight md:text-4xl">
              {title}
            </h2>
            {description && (
              <p className="mx-auto mb-8 max-w-xl text-lg text-primary-foreground/80">
                {description}
              </p>
            )}
            <Link
              href={href}
              className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-8 font-semibold text-primary shadow-lg shadow-black/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/15"
            >
              {buttonText}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
