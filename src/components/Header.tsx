'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UsageCounter } from '@/components/UsageCounter';
import { GlobalSearch } from '@/components/GlobalSearch';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { useState, lazy, Suspense, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

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
  const loading = status === 'loading';
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 h-[64px] w-full border-b border-border bg-card">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-6">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-muted md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="ToolNova home">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-extrabold text-primary-foreground shadow-sm">
              T
            </div>
            <span className="font-heading text-lg font-extrabold tracking-tight text-foreground">
              Tool<span className="text-primary">Nova</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors',
                  isActive(link.href)
                    ? 'text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
          <div className="hidden w-44 shrink-0 sm:block lg:w-56">
            <GlobalSearch />
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {loading ? (
              <div className="h-9 w-20 animate-pulse rounded-lg bg-muted" />
            ) : user ? (
              <>
                <UsageCounter />
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  <span className="hidden lg:inline">Dashboard</span>
                </Link>
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  Log in
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="font-bold">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="absolute left-0 right-0 top-16 border-b border-border bg-card p-4 shadow-premium md:hidden">
          <Suspense fallback={null}>
            <MobileMenu onClose={() => setMobileMenuOpen(false)} id="mobile-menu" />
          </Suspense>
        </div>
      )}
    </header>
  );
}
