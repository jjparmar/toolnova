/**
 * AdSense Configuration
 * Publisher ID matches public/ads.txt and layout meta/script client.
 *
 * Setup after AdSense approval:
 * 1. Create Display ad units in AdSense (names below)
 * 2. Copy each numeric slot ID into .env (digits only, no ca-pub-)
 * 3. Redeploy so NEXT_PUBLIC_* vars are baked into the client bundle
 * 4. Auto Ads still work if slots are empty
 */

const DEFAULT_PUBLISHER_ID ="ca-pub-1328083083403070";

function resolvePublisherId(): string {
  const fromEnv = process.env.NEXT_PUBLIC_ADSENSE_ID?.trim();
  if (fromEnv && !fromEnv.includes("XXXXXXXX") && fromEnv.startsWith("ca-pub-")) {
    return fromEnv;
  }
  return DEFAULT_PUBLISHER_ID;
}

/** Digits-only slot IDs from AdSense unit settings */
function slot(envKey: string): string {
  const v = process.env[envKey]?.trim() ||"";
  return /^\d+$/.test(v) ? v :"";
}

export const adsenseConfig = {
  publisherId: resolvePublisherId(),
  enabled: !resolvePublisherId().includes("XXXXXXXX"),

  /**
   * Manual units — empty string = don't render (Auto Ads can still fill).
   * Env var names match .env.example
   */
  adUnits: {
    homeHero: slot("NEXT_PUBLIC_ADSENSE_SLOT_HOME_HERO"),
    homeFooter: slot("NEXT_PUBLIC_ADSENSE_SLOT_HOME_FOOTER"),

    toolTopBanner: slot("NEXT_PUBLIC_ADSENSE_SLOT_TOOL_TOP"),
    toolSidebar: slot("NEXT_PUBLIC_ADSENSE_SLOT_TOOL_SIDEBAR"),
    toolInContent: slot("NEXT_PUBLIC_ADSENSE_SLOT_TOOL_INCONTENT"),
    toolBottomBox: slot("NEXT_PUBLIC_ADSENSE_SLOT_TOOL_BOTTOM"),

    blogSidebar: slot("NEXT_PUBLIC_ADSENSE_SLOT_BLOG_SIDEBAR"),
    blogInContent: slot("NEXT_PUBLIC_ADSENSE_SLOT_BLOG_INCONTENT"),
    blogBottomBox: slot("NEXT_PUBLIC_ADSENSE_SLOT_BLOG_BOTTOM"),

    mobileAnchor: slot("NEXT_PUBLIC_ADSENSE_SLOT_MOBILE_ANCHOR"),
    mobileInFeed: slot("NEXT_PUBLIC_ADSENSE_SLOT_MOBILE_INFEED"),
  },

  formats: {
    displayBanner: {
      desktop:"728x90",
      mobile:"320x50",
    },
    rectangle:"300x250",
    largeRectangle:"336x280",
    skyscraper:"160x600",
    wideSkyscraper:"300x600",
    leaderboard:"728x90",
    mobileLeaderboard:"320x50",
  },

  testMode: process.env.NEXT_PUBLIC_ADSENSE_TEST ==="true",

  density: {
    homepage:"medium",
    toolPages:"medium",
    blogPages:"medium",
  },

  autoAds: {
    enabled: process.env.NEXT_PUBLIC_ADSENSE_AUTO_ADS !=="false",
    anchorAds: true,
    inPageAds: true,
    matchedContent: true,
  },

  policy: {
    labelAds: true,
    minContentBeforeFirstAd: true,
    noEmptyPlaceholders: true,
  },
};

/** How many manual slots are configured (for health checks / dashboard). */
export function countConfiguredAdSlots(): number {
  return Object.values(adsenseConfig.adUnits).filter((s) => /^\d+$/.test(s))
    .length;
}

export function listConfiguredAdSlots(): string[] {
  return Object.entries(adsenseConfig.adUnits)
    .filter(([, id]) => /^\d+$/.test(id))
    .map(([name]) => name);
}

export function getAdsenseScriptUrl(): string {
  return`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseConfig.publisherId}`;
}

export function hasAdConsent(): boolean {
  if (typeof window ==="undefined") return false;
  try {
    return localStorage.getItem("cookie_consent") ==="accepted";
  } catch {
    return false;
  }
}

/**
 * Manual ad units only after consent (+ real pub + not hidden in dev).
 */
export function shouldShowAds(): boolean {
  if (!adsenseConfig.enabled) return false;
  if (typeof window ==="undefined") return false;

  if (process.env.NODE_ENV ==="development" && !adsenseConfig.testMode) {
    return false;
  }

  if (!hasAdConsent()) return false;

  return true;
}

/**
 * Initialize AdSense Auto Ads once after consent.
 */
export function initializeAutoAds(): void {
  if (!adsenseConfig.autoAds.enabled || !shouldShowAds()) return;

  try {
    const w = window as Window & { __tnAutoAdsInit?: boolean };
    if (w.__tnAutoAdsInit) return;
    w.__tnAutoAdsInit = true;

    (window.adsbygoogle = window.adsbygoogle || []).push({
      google_ad_client: adsenseConfig.publisherId,
      enable_page_level_ads: true,
      overlays: { bottom: adsenseConfig.autoAds.anchorAds },
    });
  } catch (error) {
    console.error("Failed to initialize Auto Ads:", error);
  }
}

declare global {
  interface Window {
    adsbygoogle: any[];
    __tnAutoAdsInit?: boolean;
  }
}
