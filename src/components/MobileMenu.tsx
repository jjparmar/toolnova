"use client";

import Link from "next/link";
import {
  Sparkles,
  Search,
  Home,
  Wrench,
  BookOpen,
  Tag,
  Info,
  Mail,
  LayoutDashboard,
  LogIn,
  FileText,
  GraduationCap,
  Layers,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useId, useRef } from "react";
import { GlobalSearch } from "@/components/GlobalSearch";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MobileMenuProps {
  onClose: () => void;
  id?: string;
}

const links = [
  { href: "/", label: "Home", Icon: Home },
  { href: "/tools", label: "All tools", Icon: Wrench },
  { href: "/blog", label: "Blog", Icon: BookOpen },
  { href: "/pricing", label: "Pricing", Icon: Tag },
  { href: "/about", label: "About", Icon: Info },
  { href: "/contact", label: "Contact", Icon: Mail },
] as const;

const quickTools = [
  { href: "/tools/compress-pdf", label: "Compress PDF", Icon: FileText },
  { href: "/tools/homework-solver", label: "Homework Solver", Icon: GraduationCap },
  { href: "/tools/merge-pdf", label: "Merge PDF", Icon: Layers },
  { href: "/tools/grammar-fix", label: "Grammar Fix", Icon: Sparkles },
] as const;

export default function MobileMenu({ onClose, id }: MobileMenuProps) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const loading = status === "loading";
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Close on route already handled by Header; Escape + focus trap basics
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    // Focus first interactive element
    const t = window.setTimeout(() => {
      const first = panelRef.current?.querySelector<HTMLElement>(
        "a, button, input",
      );
      first?.focus();
    }, 50);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [onClose]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <div
      className="fixed inset-0 z-[60] md:hidden"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px] animate-in fade-in duration-200"
        aria-label="Close menu"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        id={id}
        ref={panelRef}
        className="absolute left-0 right-0 top-[68px] max-h-[min(85dvh,calc(100dvh-68px))] overflow-y-auto overscroll-contain rounded-b-2xl border-b border-border bg-background shadow-2xl animate-in slide-in-from-top-2 fade-in duration-200"
      >
        <div className="flex flex-col gap-1 p-4 pb-6">
          <p id={titleId} className="sr-only">
            Mobile navigation
          </p>

          {/* Search (phones only; tablet header already has search) */}
          <div className="mb-3 sm:hidden">
            <GlobalSearch />
          </div>

          <nav aria-label="Mobile primary" className="flex flex-col gap-0.5">
            {links.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-xl px-3.5 py-3 text-[15px] font-semibold transition-colors",
                  isActive(href)
                    ? "bg-primary/10 text-primary"
                    : "text-foreground hover:bg-muted",
                )}
                aria-current={isActive(href) ? "page" : undefined}
              >
                <Icon className="h-4.5 w-4.5 shrink-0 opacity-80" aria-hidden />
                {label}
              </Link>
            ))}

            {!loading && !user && (
              <Link
                href="/login"
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-[15px] font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <LogIn className="h-4.5 w-4.5 shrink-0" aria-hidden />
                Log in
              </Link>
            )}

            {!loading && user && (
              <Link
                href="/dashboard"
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-3.5 py-3 text-[15px] font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <LayoutDashboard className="h-4.5 w-4.5 shrink-0" aria-hidden />
                Dashboard
              </Link>
            )}
          </nav>

          {/* Quick tools */}
          <div className="mt-4 border-t border-border pt-4">
            <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              Quick tools
            </p>
            <div className="grid grid-cols-2 gap-2">
              {quickTools.map(({ href, label, Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="flex items-center gap-2 rounded-xl border border-border bg-card px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:border-primary/35 hover:bg-muted/60"
                >
                  <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden />
                  <span className="truncate">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-3 border-t border-border pt-4">
            {!loading && !user && (
              <Link href="/signup" onClick={onClose} className="block w-full">
                <span className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-extrabold text-primary-foreground shadow-md shadow-primary/25">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  Get started free
                </span>
              </Link>
            )}

            <p className="flex items-center justify-center gap-1.5 px-2 text-center text-xs text-muted-foreground">
              <Search className="h-3 w-3" aria-hidden />
              Press{" "}
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                Ctrl
              </kbd>
              +
              <kbd className="rounded bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                K
              </kbd>{" "}
              to search
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
