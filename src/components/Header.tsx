'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { UsageCounter } from '@/components/UsageCounter';
import { GlobalSearch } from '@/components/GlobalSearch';
import { Menu, X, LayoutDashboard, Sparkles } from 'lucide-react';
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
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();
  const user = session?.user;
  const loading = status === 'loading';
  const pathname = usePathname();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMenuOpen]);

  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={cn(
        'glass-premium sticky top-0 z-50 w-full border-b transition-all duration-300',
        scrolled
          ? 'border-[var(--border-color)] shadow-[0_8px_30px_-18px_rgba(124,58,237,0.35)]'
          : 'border-transparent'
      )}
    >
      <div className="page-container flex h-[4.25rem] items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3 sm:gap-6">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border-color)] bg-card/80 text-foreground transition-colors hover:bg-muted md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="group flex shrink-0 items-center gap-2.5">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-[#7c3aed] to-[#d946ef] text-sm font-extrabold text-white shadow-lg shadow-violet-500/30 transition-transform duration-300 group-hover:scale-105"
              aria-hidden="true"
            >
              T
            </div>
            <div className="flex items-center gap-2">
              <span className="font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl">
                Tool<span className="text-gradient">Nova</span>
              </span>
              <span className="hidden rounded-full border border-primary/15 bg-primary/8 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary sm:inline-block">
                AI
              </span>
            </div>
          </Link>

          <nav
            id="navigation"
            className="hidden items-center gap-0.5 rounded-full border border-[var(--border-color)] bg-card/60 p-1 shadow-sm md:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'nav-pill',
                  isActive(link.href) && 'is-active'
                )}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2 sm:gap-3">
          <div id="search" className="hidden w-44 shrink-0 sm:block lg:w-60">
            <GlobalSearch />
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {loading ? (
              <div className="h-10 w-20 animate-pulse rounded-full bg-muted" />
            ) : user ? (
              <>
                <UsageCounter />
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-card px-3.5 py-2 text-sm font-semibold text-foreground transition-all hover:border-primary/30 hover:bg-muted"
                >
                  <LayoutDashboard className="h-4 w-4 text-primary" />
                  <span className="hidden lg:inline">Dashboard</span>
                </Link>
                <Button onClick={handleSignOut} variant="outline" size="sm" className="rounded-full font-semibold">
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
                >
                  Log in
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="btn-premium rounded-full px-5 font-bold">
                    <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>
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
