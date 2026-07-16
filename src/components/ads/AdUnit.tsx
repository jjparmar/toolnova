"use client";

import { useEffect, useRef } from"react";
import { adsenseConfig, shouldShowAds } from"@/config/adsense";

export interface AdUnitProps {
  slot: string;
  format?:"auto" |"rectangle" |"vertical" |"horizontal";
  fullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reusable AdSense Ad Unit Component
 * - Only renders when a real numeric slot is configured
 * - Requires cookie consent (shouldShowAds)
 * - Avoids empty placeholders that harm UX / policy
 */
export function AdUnit({
  slot,
  format ="auto",
  fullWidthResponsive = true,
  className ="",
  style = {},
}: AdUnitProps) {
  const pushed = useRef(false);
  const showAds = shouldShowAds();
  const validSlot = /^\d+$/.test(slot);

  useEffect(() => {
    if (!showAds || !validSlot || pushed.current) return;

    // Wait until adsbygoogle script is present (lazy-loaded after consent)
    let attempts = 0;
    const tryPush = () => {
      try {
        if (typeof window ==="undefined") return;
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        pushed.current = true;
      } catch (error) {
        attempts += 1;
        if (attempts < 8) {
          window.setTimeout(tryPush, 400);
        } else {
          console.error("AdSense error:", error);
        }
      }
    };
    tryPush();
  }, [showAds, validSlot]);

  if (!showAds || !validSlot) {
    return null;
  }

  return (
    <div
      className={`adsense-container overflow-hidden rounded-xl ${className}`}
      style={style}
    >
      <ins
        className="adsbygoogle"
        style={{ display:"block", ...style }}
        data-ad-client={adsenseConfig.publisherId}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={fullWidthResponsive.toString()}
      />
    </div>
  );
}

function AdLabel({ className ="" }: { className?: string }) {
  return (
    <p
      className={`text-[10px] uppercase tracking-wider text-muted-foreground/70 text-center mb-1.5 ${className}`}
    >
      Advertisement
    </p>
  );
}

/** Only wrap children when ads can actually show (slot + consent). */
function maybeAd(
  slot: string,
  node: React.ReactNode,
): React.ReactNode {
  if (!shouldShowAds() || !/^\d+$/.test(slot)) return null;
  return node;
}

/**
 * In-Article Ad Unit (Native format)
 */
export function InArticleAd({ className ="" }: { className?: string }) {
  return (
    maybeAd(
      adsenseConfig.adUnits.toolInContent,
      <div className={`my-8 ${className}`}>
        <AdLabel />
        <AdUnit
          slot={adsenseConfig.adUnits.toolInContent}
          format="auto"
          fullWidthResponsive={true}
          className="max-w-3xl mx-auto"
        />
      </div>,
    ) ?? null
  );
}

/**
 * Sidebar Ad Unit (Sticky on desktop)
 */
export function SidebarAd({ className ="" }: { className?: string }) {
  return (
    maybeAd(
      adsenseConfig.adUnits.toolSidebar,
      <div className={`sticky top-20 ${className}`}>
        <AdLabel />
        <AdUnit
          slot={adsenseConfig.adUnits.toolSidebar}
          format="vertical"
          fullWidthResponsive={false}
          style={{ minHeight:"600px", minWidth:"300px" }}
        />
      </div>,
    ) ?? null
  );
}

/**
 * Top Banner Ad (Above the fold)
 */
export function TopBannerAd({ className ="" }: { className?: string }) {
  const desktopSlot = adsenseConfig.adUnits.toolTopBanner;
  const mobileSlot = adsenseConfig.adUnits.mobileInFeed;
  const canDesktop = shouldShowAds() && /^\d+$/.test(desktopSlot);
  const canMobile = shouldShowAds() && /^\d+$/.test(mobileSlot);

  if (!canDesktop && !canMobile) return null;

  return (
    <div className={`my-4 ${className}`}>
      <AdLabel />
      {canDesktop && (
        <div className="hidden md:block">
          <AdUnit
            slot={desktopSlot}
            format="horizontal"
            fullWidthResponsive={true}
            style={{ minHeight:"90px" }}
          />
        </div>
      )}
      {canMobile && (
        <div className="md:hidden">
          <AdUnit
            slot={mobileSlot}
            format="auto"
            fullWidthResponsive={true}
            style={{ minHeight:"50px" }}
          />
        </div>
      )}
    </div>
  );
}

/**
 * Bottom Box Ad (After content)
 */
export function BottomBoxAd({ className ="" }: { className?: string }) {
  return (
    maybeAd(
      adsenseConfig.adUnits.toolBottomBox,
      <div className={`my-8 ${className}`}>
        <AdLabel />
        <AdUnit
          slot={adsenseConfig.adUnits.toolBottomBox}
          format="rectangle"
          fullWidthResponsive={true}
          style={{ minHeight:"250px" }}
          className="max-w-md mx-auto"
        />
      </div>,
    ) ?? null
  );
}

/**
 * Multiplex Ad (Footer recommendations)
 */
export function MultiplexAd({ className ="" }: { className?: string }) {
  return (
    maybeAd(
      adsenseConfig.adUnits.homeFooter,
      <div className={`my-8 ${className}`}>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70 text-center mb-1.5">
          Recommended
        </p>
        <AdUnit
          slot={adsenseConfig.adUnits.homeFooter}
          format="auto"
          fullWidthResponsive={true}
          style={{ minHeight:"300px" }}
        />
      </div>,
    ) ?? null
  );
}

/**
 * Between Sections Ad — no empty “ad” placeholders (policy + UX).
 * Renders only when a real slot + consent exist; otherwise null
 * (Auto Ads can still fill page-level inventory).
 */
export function BetweenSectionsAd({ className ="" }: { className?: string }) {
  const slot = adsenseConfig.adUnits.toolInContent;
  if (!shouldShowAds() || !/^\d+$/.test(slot)) return null;

  return (
    <div className={`w-full my-10 ${className}`}>
      <AdLabel />
      <AdUnit slot={slot} format="auto" fullWidthResponsive={true} />
    </div>
  );
}

/**
 * Mobile Anchor Ad (Sticky bottom on mobile)
 */
export function MobileAnchorAd() {
  return (
    maybeAd(
      adsenseConfig.adUnits.mobileAnchor,
      <div className="md:hidden">
        <AdUnit
          slot={adsenseConfig.adUnits.mobileAnchor}
          format="auto"
          fullWidthResponsive={true}
        />
      </div>,
    ) ?? null
  );
}
