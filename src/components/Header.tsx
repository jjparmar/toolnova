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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-border/60 bg-background/80 backdrop-blur-2xl shadow-sm shadow-foreground/[0.04]"
          : "border-b border-transparent bg-background/60 backdrop-blur-xl"
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6">

        {/* Logo */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            aria-label="ToolNova home"
          >
            <div className="relative h-9 w-9 overflow-hidden rounded-xl shadow-md shadow-primary/25 ring-1 ring-primary/20 group-hover:shadow-primary/40 group-hover:ring-primary/35 group-hover:scale-105 transition-all duration-300">
              <Image
                src="/logo.webp"
                alt=""
                width={36}
                height={36}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <span className="font-heading text-[1.15rem] font-extrabold leading-none tracking-tight text-foreground">
              Tool<span className="text-brand-gradient">Nova</span>
            </span>
          </Link>
        </div>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          <nav
            className="flex items-center gap-0.5 px-1.5 py-1.5 rounded-2xl bg-muted/70 border border-border/70 shadow-sm"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-sm font-semibold px-4 py-1.5 rounded-xl transition-all duration-200",
                  isActive(link.href)
                    ? "nav-pill-active"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/80"
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
                  "relative text-sm font-semibold px-4 py-1.5 rounded-xl transition-all duration-200",
                  isActive('/login')
                    ? "nav-pill-active"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/80"
                )}
              >
                Login
              </Link>
            )}
          </nav>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:block">
            <GlobalSearch />
          </div>

          <div className="hidden md:flex items-center gap-2">
            {loading ? (
              <div className="h-9 w-24 bg-muted rounded-xl animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-2">
                <UsageCounter />
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors bg-muted/70 hover:bg-muted px-3 py-2 rounded-xl border border-border/70"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden lg:inline">Dashboard</span>
                </Link>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="h-9 px-4 rounded-xl text-sm font-semibold border-border/70"
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/signup">
                <button
                  type="button"
                  className="btn-premium flex items-center justify-center gap-1.5 overflow-hidden rounded-xl h-9 px-5 text-sm font-bold"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>Get Started</span>
                </button>
              </Link>
            )}

            {mounted && (
              <button
                type="button"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="flex items-center justify-center h-9 w-9 rounded-xl bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors border border-border/60"
                aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}
          </div>

          <button
            type="button"
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors rounded-xl hover:bg-muted border border-transparent hover:border-border/60"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
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
