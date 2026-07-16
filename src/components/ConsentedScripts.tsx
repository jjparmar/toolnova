"use client";

import Script from"next/script";
import { useEffect, useState } from"react";
import { siteConfig } from"@/config/site";
import { initializeAutoAds, shouldShowAds } from"@/config/adsense";

/**
 * Loads GA + AdSense after cookie consent (Consent Mode v2).
 * Layout keeps google-adsense-account meta for publisher verification.
 * Ad script uses lazyOnload when possible to protect LCP/INP.
 */
export function ConsentedScripts() {
  const [consented, setConsented] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie_consent");
    if (consent ==="accepted") {
      setConsented(true);
      grantConsent();
      tryInitAds();
    }
  }, []);

  useEffect(() => {
    const handler = () => {
      const consent = localStorage.getItem("cookie_consent");
      if (consent ==="accepted") {
        setConsented(true);
        grantConsent();
        tryInitAds();
      }
    };
    window.addEventListener("cookie-consent-changed", handler);
    return () => window.removeEventListener("cookie-consent-changed", handler);
  }, []);

  function grantConsent() {
    if (typeof window !=="undefined" && (window as any).gtag) {
      (window as any).gtag("consent","update", {
        ad_storage:"granted",
        ad_user_data:"granted",
        ad_personalization:"granted",
        analytics_storage:"granted",
      });
    }
  }

  function tryInitAds() {
    // Retry a few times — adsbygoogle.js is lazyOnload
    let n = 0;
    const tick = () => {
      try {
        if (shouldShowAds()) initializeAutoAds();
      } catch {
        /* ignore */
      }
      n += 1;
      if (n < 10 && !(window as Window & { __tnAutoAdsInit?: boolean }).__tnAutoAdsInit) {
        window.setTimeout(tick, 500);
      }
    };
    tick();
  }

  if (!consented) return null;

  return (
    <>
      {/* Google Analytics — after consent only */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${siteConfig.googleAnalyticsId}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${siteConfig.googleAnalyticsId}', {
            anonymize_ip: true,
            send_page_view: true
          });`}
      </Script>
    </>
  );
}
