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
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65 transition-colors duration-300">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-3 px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/"
            className="flex items-center gap-2.5 group shrink-0"
            aria-label="ToolNova home"
          >
            <div className="relative h-9 w-9 sm:h-10 sm:w-10 overflow-hidden rounded-xl shadow-md shadow-primary/20 ring-1 ring-primary/15 group-hover:shadow-lg group-hover:shadow-primary/30 group-hover:scale-105 transition-all duration-300">
              <Image
                src="/logo.webp"
                alt=""
                width={40}
                height={40}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <span className="font-heading text-foreground text-lg sm:text-xl font-bold leading-tight tracking-tight">
              Tool<span className="text-primary">Nova</span>
            </span>
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3 lg:gap-5 min-w-0">
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium px-3 py-2 rounded-lg transition-colors",
                  isActive(link.href)
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
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
                  "relative text-sm font-medium px-3 py-2 rounded-lg transition-colors",
                  isActive('/login')
                    ? "text-primary bg-primary/8"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70"
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
              <div className="h-10 w-24 bg-muted rounded-xl animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-2">
                <UsageCounter />
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors bg-muted/60 px-3 py-1.5 rounded-lg border border-border/80"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden lg:inline">Dashboard</span>
                </Link>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="h-9 px-4 rounded-xl text-sm font-medium"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/signup">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 overflow-hidden rounded-xl h-10 px-5 bg-gradient-to-r from-primary to-teal-600 hover:from-primary/90 hover:to-teal-600/90 shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 text-primary-foreground text-sm font-bold"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Get Started</span>
                </button>
              </Link>
            )}

            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center justify-center h-10 w-10 rounded-xl bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
            )}
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
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
