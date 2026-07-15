"use client";

import Link from "next/link";
import { Sparkles, Search, Sun, Moon } from "lucide-react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { GlobalSearch } from "@/components/GlobalSearch";

interface MobileMenuProps {
  onClose: () => void;
  id?: string;
}

const links = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export default function MobileMenu({ onClose, id }: MobileMenuProps) {
  const { data: session, status } = useSession();
  const user = session?.user;
  const loading = status === "loading";
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // Escape to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      id={id}
      className="absolute top-full left-0 right-0 bg-white/95 dark:bg-[#1a1f2e]/95 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 shadow-xl md:hidden max-h-[calc(100dvh-4rem)] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
    >
      <div className="flex flex-col p-5 gap-1">
        <div className="mb-3 sm:hidden">
          <GlobalSearch />
        </div>

        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="text-foreground font-medium py-3 px-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            {link.label}
          </Link>
        ))}

        {!loading && !user && (
          <Link
            href="/login"
            onClick={onClose}
            className="text-muted-foreground font-medium py-3 px-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Login
          </Link>
        )}

        {!loading && user && (
          <Link
            href="/dashboard"
            onClick={onClose}
            className="text-muted-foreground font-medium py-3 px-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Dashboard
          </Link>
        )}

        <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
          {mounted && (
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm font-medium text-foreground"
              aria-label="Toggle theme"
            >
              <span className="flex items-center gap-2">
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </span>
            </button>
          )}

          {!loading && !user && (
            <Link href="/signup" onClick={onClose} className="w-full block">
              <button
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white font-bold h-12 rounded-xl shadow-lg shadow-primary/25 transition-all"
              >
                <Sparkles className="h-4 w-4" /> Get Started Free
              </button>
            </Link>
          )}

          <p className="text-xs text-muted-foreground text-center px-2 flex items-center justify-center gap-1.5">
            <Search className="h-3 w-3" />
            Press{" "}
            <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">
              Ctrl
            </kbd>
            +
            <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px]">
              K
            </kbd>{" "}
            to search
          </p>
        </div>
      </div>
    </div>
  );
}
