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
import { ThemeToggle } from '@/components/ThemeToggle';

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

  // Lock body scroll when mobile menu open
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
        'sticky top-0 z-50 h-[68px] w-full border-b bg-background/80 backdrop-blur-xl transition-all duration-300',
        scrolled
          ? 'border-border/80 shadow-sm shadow-black/5'
          : 'border-border/50'
      )}
    >
      <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex items-center gap-3 sm:gap-8">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-card text-foreground transition-colors hover:bg-muted md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="group flex shrink-0 items-center gap-2.5" aria-label="ToolNova home">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF3B5C] to-[#7C3AED] text-base font-extrabold text-white shadow-md shadow-primary/25 transition-transform duration-300 group-hover:scale-105">
              T
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-heading text-xl font-extrabold tracking-tight text-foreground">
                Tool<span className="text-gradient">Nova</span>
              </span>
              <span className="hidden rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-extrabold text-primary border border-primary/20 sm:inline-block">
                AI HUB
              </span>
            </div>
          </Link>

          <nav
            id="navigation"
            className="hidden items-center gap-1 md:flex"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'relative rounded-xl px-4 py-2 text-sm font-bold transition-all duration-200',
                  isActive(link.href)
                    ? 'bg-primary/10 text-primary font-extrabold'
                    : 'text-muted-foreground hover:bg-muted/70 hover:text-foreground'
                )}
                aria-current={isActive(link.href) ? 'page' : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex min-w-0 flex-1 items-center justify-end gap-2.5 sm:gap-3.5">
          <div id="search" className="hidden w-48 shrink-0 sm:block lg:w-64">
            <GlobalSearch />
          </div>

          <ThemeToggle />

          <div className="hidden items-center gap-2.5 md:flex">
            {loading ? (
              <div className="h-10 w-20 animate-pulse rounded-xl bg-muted" />
            ) : user ? (
              <>
                <UsageCounter />
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 rounded-xl border border-border/80 bg-card px-3.5 py-2 text-sm font-bold text-foreground transition-all hover:bg-muted hover:border-primary/30"
                >
                  <LayoutDashboard className="h-4 w-4 text-primary" />
                  <span className="hidden lg:inline">Dashboard</span>
                </Link>
                <Button onClick={handleSignOut} variant="outline" size="sm" className="rounded-xl font-bold">
                  Sign out
                </Button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3.5 py-2 text-sm font-bold text-muted-foreground transition-colors hover:text-foreground"
                >
                  Log in
                </Link>
                <Link href="/signup">
                  <Button size="sm" className="btn-premium px-5 rounded-xl font-extrabold shadow-md">
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

