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
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/85 shadow-[0_1px_0_0_hsl(var(--border)/0.5)] backdrop-blur-xl supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="ToolNova home"
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-lg shadow-sm ring-1 ring-border transition-shadow group-hover:ring-primary/25">
            <Image
              src="/logo.webp"
              alt=""
              width={36}
              height={36}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <span className="font-heading text-[1.125rem] font-semibold tracking-tight text-foreground">
            Tool<span className="text-primary">Nova</span>
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3 min-w-0">
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium px-3 py-2 rounded-lg transition-colors",
                  isActive(link.href)
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
                aria-current={isActive(link.href) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
            {!loading && !user && (
              <Link
                href="/login"
                className={cn(
                  "text-sm font-medium px-3 py-2 rounded-lg transition-colors",
                  isActive('/login')
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                Login
              </Link>
            )}
          </nav>

          <div className="hidden sm:block shrink-0">
            <GlobalSearch />
          </div>

          <div className="hidden md:flex items-center gap-2">
            {loading ? (
              <div className="h-9 w-20 bg-muted rounded-lg animate-pulse" />
            ) : user ? (
              <>
                <UsageCounter />
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-sm font-medium text-foreground px-3 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden lg:inline">Dashboard</span>
                </Link>
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/signup">
                <Button size="sm" className="font-semibold gap-1.5">
                  <Sparkles className="h-3.5 w-3.5" />
                  Get Started
                </Button>
              </Link>
            )}

            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}
          </div>

          <button
            type="button"
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-border text-foreground hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <Suspense fallback={null}>
          <MobileMenu onClose={() => setMobileMenuOpen(false)} id="mobile-menu" />
        </Suspense>
      )}
    </header>
  );
}
