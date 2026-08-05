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
  Pencil,
  X,
  ArrowRight,
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
  {
    href: "/tools/compress-pdf",
    label: "Compress PDF",
    Icon: FileText,
    tone: "from-rose-500 to-orange-500",
  },
  {
    href: "/tools/merge-pdf",
    label: "Merge PDF",
    Icon: Layers,
    tone: "from-violet-500 to-fuchsia-500",
  },
  {
    href: "/tools/homework-solver",
    label: "Homework",
    Icon: GraduationCap,
    tone: "from-indigo-500 to-blue-500",
  },
  {
    href: "/tools/grammar-fix",
    label: "Grammar Fix",
    Icon: Pencil,
    tone: "from-pink-500 to-rose-500",
  },
] as const;

export default function MobileMenu({ onClose, id }: MobileMenuProps) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const loading = status === "loading";
  const pathname = usePathname();
  const panelRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 40);
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
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/50 backdrop-blur-[3px] animate-in fade-in duration-200"
        aria-label="Close menu"
        onClick={onClose}
      />

      <div
        id={id}
        ref={panelRef}
        className="absolute left-0 right-0 top-[4.25rem] flex max-h-[min(88dvh,calc(100dvh-4.25rem))] flex-col overflow-hidden rounded-b-[1.75rem] border-b border-[var(--border-color)] bg-background shadow-[0_24px_48px_-12px_rgba(15,23,42,0.22)] animate-in slide-in-from-top-3 fade-in duration-200"
      >
        {/* Panel chrome */}
        <div className="flex items-center justify-between border-b border-[var(--border-color)] px-4 py-3">
          <div>
            <p id={titleId} className="font-heading text-sm font-bold text-foreground">
              Menu
            </p>
            <p className="text-[11px] font-medium text-muted-foreground">
              Navigate · search · open tools
            </p>
          </div>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-color)] bg-card text-foreground shadow-sm transition-colors hover:bg-muted"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto overscroll-contain p-4 pb-6">
          <div className="mb-4 sm:hidden">
            <GlobalSearch />
          </div>

          <nav aria-label="Mobile primary" className="flex flex-col gap-1">
            {links.map(({ href, label, Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3.5 py-3 text-[15px] font-semibold transition-all",
                  isActive(href)
                    ? "bg-primary/10 text-primary shadow-[inset_0_0_0_1px_rgba(139,92,246,0.2)]"
                    : "text-foreground hover:bg-muted",
                )}
                aria-current={isActive(href) ? "page" : undefined}
              >
                <span
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-xl",
                    isActive(href)
                      ? "bg-primary/15 text-primary"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="flex-1">{label}</span>
                {isActive(href) && (
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                )}
              </Link>
            ))}

            {!loading && !user && (
              <Link
                href="/login"
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl px-3.5 py-3 text-[15px] font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <LogIn className="h-4 w-4" aria-hidden />
                </span>
                Log in
              </Link>
            )}

            {!loading && user && (
              <Link
                href="/dashboard"
                onClick={onClose}
                className="flex items-center gap-3 rounded-2xl px-3.5 py-3 text-[15px] font-semibold text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                  <LayoutDashboard className="h-4 w-4" aria-hidden />
                </span>
                Dashboard
              </Link>
            )}
          </nav>

          <div className="mt-5 rounded-2xl border border-[var(--border-color)] bg-card/80 p-3.5 shadow-sm">
            <div className="mb-3 flex items-center justify-between px-0.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Quick tools
              </p>
              <Link
                href="/tools"
                onClick={onClose}
                className="inline-flex items-center gap-1 text-[11px] font-bold text-primary"
              >
                All
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {quickTools.map(({ href, label, Icon, tone }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={onClose}
                  className="flex items-center gap-2.5 rounded-xl border border-[var(--border-color)] bg-background/80 px-3 py-2.5 text-sm font-semibold text-foreground transition-all hover:border-primary/35 hover:shadow-sm"
                >
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-sm",
                      tone,
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" aria-hidden />
                  </span>
                  <span className="truncate">{label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-4 space-y-3">
            {!loading && !user && (
              <Link href="/signup" onClick={onClose} className="block w-full">
                <span className="btn-premium flex h-12 w-full items-center justify-center gap-2 text-sm font-extrabold">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  Get started free
                </span>
              </Link>
            )}

            <p className="flex items-center justify-center gap-1.5 px-2 text-center text-xs text-muted-foreground">
              <Search className="h-3 w-3" aria-hidden />
              Search with{" "}
              <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                Ctrl
              </kbd>
              +
              <kbd className="rounded-md border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                K
              </kbd>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
