'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UsageCounter } from '@/components/UsageCounter';
import { GlobalSearch } from '@/components/GlobalSearch';
import { Menu, X, Sparkles, Sun, Moon, LayoutDashboard } from 'lucide-react';
import { useState, lazy, Suspense, useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

// Lazy load the mobile menu to defer Framer Motion bundle
const MobileMenu = lazy(() => import('./MobileMenu'));

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/tools', label: 'Tools' },
  { href: '/blog', label: 'Blog' },
  { href: '/pricing', label: 'Pricing' },
] as const;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status } = useSession();
  const user = session?.user;
  const loading = status === "loading";
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-[#1a1f2e]/80 backdrop-blur-xl border-b border-slate-100 dark:border-slate-800 transition-all duration-300">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="ToolNova home"
          >
            <div className="relative h-9 w-9 sm:h-10 sm:w-10 overflow-hidden rounded-xl shadow-lg shadow-primary/25 group-hover:shadow-xl group-hover:shadow-primary/30 group-hover:scale-105 transition-all duration-300">
              <Image
                src="/logo.webp"
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <span className="text-foreground text-lg sm:text-xl font-bold leading-tight tracking-tight">
              ToolNova
            </span>
          </Link>
        </div>

        {/* Desktop Navigation & Actions */}
        <div className="flex flex-1 items-center justify-end gap-3 lg:gap-6 min-w-0">
          <nav className="hidden md:flex items-center gap-5 lg:gap-7" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium leading-normal transition-colors group",
                  isActive(link.href)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-1 left-0 h-0.5 bg-primary rounded-full transition-all duration-300",
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            ))}

            {!loading && !user && (
              <Link
                href="/login"
                className={cn(
                  "relative text-sm font-medium leading-normal transition-colors group",
                  isActive('/login')
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                Login
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary rounded-full group-hover:w-full transition-all duration-300" />
              </Link>
            )}
          </nav>

          {/* Search — desktop + tablet */}
          <div className="hidden sm:block shrink-0">
            <GlobalSearch />
          </div>

          <div className="hidden md:flex items-center gap-2 lg:gap-3">
            {loading ? (
              <div className="h-10 w-24 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-2 lg:gap-3">
                <UsageCounter />
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-800"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden lg:inline">Dashboard</span>
                </Link>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="h-9 px-4 rounded-xl border-slate-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800 text-sm font-medium"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/signup">
                <button className="flex items-center justify-center gap-2 overflow-hidden rounded-xl h-10 px-5 lg:px-6 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 text-white text-sm font-bold leading-normal">
                  <Sparkles className="h-4 w-4" />
                  <span>Get Started</span>
                </button>
              </Link>
            )}

            {/* Dark Mode Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center justify-center h-10 w-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-colors"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - lazy loaded */}
      {mobileMenuOpen && (
        <Suspense fallback={null}>
          <MobileMenu onClose={() => setMobileMenuOpen(false)} id="mobile-menu" />
        </Suspense>
      )}
    </header>
  );
}
