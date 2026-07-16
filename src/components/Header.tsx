'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UsageCounter } from '@/components/UsageCounter';
import { GlobalSearch } from '@/components/GlobalSearch';
import { Menu, X, Sparkles, LayoutDashboard } from 'lucide-react';
import { useState, lazy, Suspense, useEffect } from 'react';
import { useSession, signOut } from "next-auth/react";
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
  const pathname = usePathname();

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
    <header className="fixed top-4 left-0 right-0 z-50 px-4 sm:px-6 pointer-events-none">
      <div className="mx-auto flex h-16 max-w-[1120px] items-center justify-between gap-4 px-4 sm:px-6 pointer-events-auto bg-card/60 backdrop-blur-2xl backdrop-saturate-200 border border-border/50 rounded-full shadow-premium-lg">
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="ToolNova home"
        >
          <div className="relative h-9 w-9 overflow-hidden rounded-full shadow-soft ring-1 ring-border/60 transition-all duration-300 group-hover:ring-primary/30 group-hover:shadow-glow-sm">
            <Image
              src="/logo.webp"
              alt=""
              width={36}
              height={36}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <span className="font-heading text-[1.125rem] font-bold tracking-tight text-foreground">
            Tool<span className="text-brand-gradient">Nova</span>
          </span>
        </Link>

        <div className="flex flex-1 items-center justify-end gap-2 sm:gap-4 min-w-0">
          {/* Desktop Nav — Integrated deeply */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                  isActive(link.href)
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
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
                  "px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                  isActive('/login')
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                Login
              </Link>
            )}
          </nav>

          {/* Search */}
          <div className="hidden sm:block shrink-0">
            <GlobalSearch />
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-2">
            {loading ? (
              <div className="h-9 w-20 bg-muted rounded-full animate-pulse" />
            ) : user ? (
              <>
                <UsageCounter />
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-foreground rounded-full border border-border/50 hover:bg-muted hover:border-border transition-all duration-300"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden lg:inline">Dashboard</span>
                </Link>
                <Button onClick={handleSignOut} variant="outline" size="sm" className="rounded-full bg-transparent border-border/50">
                  Sign Out
                </Button>
              </>
            ) : (
              <Link href="/signup">
                <Button
                  size="sm"
                  className="relative overflow-hidden font-semibold gap-1.5 rounded-full bg-primary hover:bg-primary/90 shadow-glow-sm transition-all duration-300 hover:shadow-glow-md"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Get Started
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-border/50 text-foreground hover:bg-muted transition-colors duration-200"
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
        <div className="pointer-events-auto relative mt-2">
          <Suspense fallback={null}>
            <MobileMenu onClose={() => setMobileMenuOpen(false)} id="mobile-menu" />
          </Suspense>
        </div>
      )}
    </header>
  );
}
