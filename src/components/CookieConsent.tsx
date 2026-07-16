"use client";

import { useState, useEffect } from"react";
import Link from"next/link";
import { Button } from"@/components/ui/button";
import { X } from"lucide-react";

export function CookieConsent() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie_consent");
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie_consent","accepted");
        if (typeof window !=="undefined" && (window as any).gtag) {
            (window as any).gtag("consent","update", {
                ad_storage:"granted",
                ad_user_data:"granted",
                ad_personalization:"granted",
                analytics_storage:"granted",
            });
        }
        window.dispatchEvent(new Event("cookie-consent-changed"));
        setIsVisible(false);
    };

    const declineCookies = () => {
        localStorage.setItem("cookie_consent","declined");
        // Keep Consent Mode defaults (denied) for non-essential ads/analytics
        if (typeof window !=="undefined" && (window as any).gtag) {
            (window as any).gtag("consent","update", {
                ad_storage:"denied",
                ad_user_data:"denied",
                ad_personalization:"denied",
                analytics_storage:"denied",
            });
        }
        window.dispatchEvent(new Event("cookie-consent-changed"));
        setIsVisible(false);
    };

    const dismissConsent = () => {
        // Dismiss = essential only (same as decline for ads/analytics)
        localStorage.setItem("cookie_consent","declined");
        window.dispatchEvent(new Event("cookie-consent-changed"));
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div
            role="dialog"
            aria-labelledby="cookie-consent-title"
            aria-describedby="cookie-consent-desc"
            className="fixed bottom-0 left-0 w-full bg-card/95 backdrop-blur-xl border-t border-border shadow-[0_-10px_40px_hsl(var(--foreground)/0.08)] z-50 p-4 md:p-6 animate-slide-up"
        >
            <div className="container mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6 relative">
                <div className="flex-1">
                    <h3 id="cookie-consent-title" className="font-heading font-bold text-lg mb-1 text-foreground">
                        We value your privacy
                    </h3>
                    <p
                        id="cookie-consent-desc"
                        className="text-sm text-muted-foreground leading-relaxed max-w-2xl"
                    >
                        We use essential cookies to run the site, and optional cookies for
                        analytics and personalized ads. You can accept or decline optional
                        cookies anytime.{""}
                        <Link href="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                        </Link>
                        {" ·"}
                        <Link href="/cookie-policy" className="text-primary hover:underline">
                            Cookie Policy
                        </Link>
                        {" ·"}
                        <Link href="/advertising" className="text-primary hover:underline">
                            Advertising
                        </Link>
                        .
                    </p>
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button
                        variant="outline"
                        onClick={declineCookies}
                        className="flex-1 md:flex-none"
                    >
                        Essential only
                    </Button>
                    <Button
                        onClick={acceptCookies}
                        className="flex-1 md:flex-none px-8"
                    >
                        Accept all
                    </Button>
                </div>
                <button
                    type="button"
                    onClick={dismissConsent}
                    className="absolute top-3 right-3 md:static text-muted-foreground p-2 rounded-lg hover:bg-muted"
                    aria-label="Close cookie notice (essential cookies only)"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </div>
    );
}
