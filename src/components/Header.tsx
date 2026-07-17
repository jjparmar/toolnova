'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { UsageCounter } from '@/components/UsageCounter';
import { GlobalSearch } from '@/components/GlobalSearch';
import { Menu, X, Sparkles, LayoutDashboard } from 'lucide-react';
import { useState, lazy, Suspense, useEffect } from 'react';
import { useSession, signOut } from"next-auth/react";
import { usePathname } from"next/navigation";
import { cn } from"@/lib/utils";

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
  const loading = status ==="loading";
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl:"/" });
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-40 h-16 w-full border-b border-border/80 bg-card/80 shadow-[0_1px_0_0_hsl(var(--primary)/0.04)] backdrop-blur-xl supports-[backdrop-filter]:bg-card/70">
      <div className="flex h-full items-center justify-between px-4 md:px-8">
        
        {/* Left Area: Hamburger (Mobile), Logo, and Desktop Nav */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border text-foreground transition-colors duration-200 hover:bg-secondary md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
          >
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-primary to-[hsl(var(--primary-deep))] text-sm font-bold text-primary-foreground shadow-sm shadow-primary/25">
              T
            </div>
            <span className="font-heading hidden text-lg font-bold tracking-tight text-foreground sm:block">
              Tool<span className="text-primary">Nova</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="ml-6 hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                  isActive(link.href)
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
                aria-current={isActive(link.href) ?"page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right Area: Search & Auth */}
        <div className="flex items-center justify-end gap-3 min-w-0 flex-1">
          
          {/* Search */}
          <div className="hidden sm:block shrink-0 w-48 lg:w-64">
            <GlobalSearch />
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-2">
            {loading ? (
              <div className="h-9 w-20 bg-muted rounded-md animate-pulse" />
            ) : user ? (
              <>
                <UsageCounter />
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium text-foreground rounded-md border border-border hover:bg-muted transition-colors"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Button onClick={handleSignOut} variant="ghost" size="sm" className="rounded-md">
                  Sign Out
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Link href="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5">
                  Log in
                </Link>
                <Link href="/signup">
                  <Button
                    size="sm"
                    className="font-semibold gap-1.5 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm"
                  >
                    <Sparkles className="h-3.5 w-3.5" />
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-background border-b border-border p-4 shadow-sm">
          <Suspense fallback={null}>
            <MobileMenu onClose={() => setMobileMenuOpen(false)} id="mobile-menu" />
          </Suspense>
        </div>
      )}
    </header>
  );
}
