/* eslint-disable @next/next/google-font-preconnect */
import type { Metadata } from"next";
import { Outfit, Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import { CookieConsent } from"@/components/CookieConsent";
import { ConsentedScripts } from"@/components/ConsentedScripts";
import Script from"next/script";
import"./globals.css";
import"./accessibility.css";
import { Toaster } from"@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { SkipLinks } from "@/components/SkipLinks";
import { FeedbackWidgetLazy } from"@/components/FeedbackWidgetLazy";
import { VitalsInitializer } from"@/components/VitalsInitializer";
import { Header } from"@/components/Header";
import { Footer } from"@/components/Footer";
import { siteConfig } from"@/config/site";
import { adsenseConfig } from"@/config/adsense";
import { Providers } from"@/components/Providers";
import { TOOL_COUNT_LABEL } from"@/data/tools";

/** Body — Outfit (matches YouTube Tools Hub) */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "arial"],
});

/** Headings — Plus Jakarta Sans */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800"],
  preload: true,
  adjustFontFallback: true,
  fallback: ["system-ui", "arial"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.toolnovahub.com"),
  title: {
    default:`${TOOL_COUNT_LABEL} Free AI Tools for Students – No Signup | ToolNova`,
    template:"%s | ToolNova",
  },
  description:"Free AI tools for students & professionals. Merge PDFs, make flashcards, fix grammar, write essays, solve homework — all in one place. No account needed. Try now!",
  keywords: ["free AI tools for students no signup","solve homework step by step free","make flashcards from notes free","fix grammar in essay free","merge PDF online free no watermark","paraphrase essay without plagiarism free","summarize article free online","free essay writer for high school","AI study tools for college students","free quiz generator from notes","compress image without quality loss free","free AI writing tools no login","ToolNova",
  ],
  authors: [{ name:"ToolNova Team", url:"https://www.toolnovahub.com" }],
  creator:"ToolNova",
  publisher:"ToolNova",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: [
      { url:"/logo.png", type:"image/png" },
      { url:"/favicon-16x16.png", sizes:"16x16", type:"image/png" },
      { url:"/favicon-32x32.png", sizes:"32x32", type:"image/png" },
    ],
    apple: [
      { url:"/apple-touch-icon.png", sizes:"180x180", type:"image/png" },
    ],
  },
  manifest:"/site.webmanifest",
  openGraph: {
    type:"website",
    locale:"en_US",
    url:"https://www.toolnovahub.com",
    siteName:"ToolNova",
    title:`${TOOL_COUNT_LABEL} Free AI Tools for Students – No Signup | ToolNova`,
    description:"Free AI tools for students & professionals. Merge PDFs, make flashcards, fix grammar, write essays, solve homework — all in one place. No account needed.",
    images: [
      {
        url:"/og-image.png",
        width: 1200,
        height: 630,
        alt:"ToolNova - Free AI Tools Hub",
        type:"image/png",
      },
      {
        url:"/logo.png",
        width: 512,
        height: 512,
        alt:"ToolNova Logo",
        type:"image/png",
      },
    ],
  },
  twitter: {
    card:"summary_large_image",
    title:`${TOOL_COUNT_LABEL} Free AI Tools for Students – No Signup | ToolNova`,
    description:"Free AI tools for students & professionals. Merge PDFs, make flashcards, fix grammar, write essays, solve homework — no account needed!",
    images: ["/og-image.png"],
    creator:"@toolnovahub",
    site:"@toolnovahub",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,"max-video-preview": -1,"max-image-preview":"large","max-snippet": -1,
    },
  },
  verification: {
    other: {"msvalidate.01": siteConfig.verification.bing,"yandex-verification": siteConfig.verification.yandex,
    },
    google: siteConfig.verification.google,
  },
  alternates: {
    // Single-locale English site — only real language variants (avoid fake hreflang)
    canonical:"https://www.toolnovahub.com",
    languages: {
      en:"https://www.toolnovahub.com","x-default":"https://www.toolnovahub.com",
    },
  },
  category:"Productivity",
  other: {
    language: "English",
    "content-language": "en",
    "theme-color": "#8b5cf6",
    "msapplication-TileColor": "#8b5cf6",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "mobile-web-app-capable": "yes",
    // AI / GEO discovery signals (concise, non-spammy)"ai-indexing":"allowed",
    citation:"ToolNova — Free AI Tools for Students and Professionals. https://www.toolnovahub.com","dc.title":"ToolNova — Free AI Productivity Tools","dc.publisher":"ToolNova","dc.language":"en","dc.type":"InteractiveResource",
  },
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Consent Mode v2 Default State (Required for AdSense in EU/EEA) */}
        <Script id="google-consent-mode" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500
            });
            gtag('set', 'ads_data_redaction', true);`}
        </Script>

        {/* AdSense meta + lazy script for verification / AdsBot (Auto Ads init after consent) */}
        <meta name="google-adsense-account" content={adsenseConfig.publisherId} />
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseConfig.publisherId}`}
          crossOrigin="anonymous"
          strategy="lazyOnload"
        />

        {/* RSS Feed autodiscovery */}
        <link
          rel="alternate"
          type="application/rss+xml"
          title="ToolNova Blog RSS Feed"
          href="https://www.toolnovahub.com/feed.xml"
        />

        {/* Prefetch third-parties (avoid preconnect to ads — protects LCP) */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />

        {/* Preconnect only critical font origin */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />

        {/* Theme Color — required for Google Discover & PWA */}
        <meta name="theme-color" content="#8b5cf6" />
        <meta name="msapplication-TileColor" content="#8b5cf6" />


        {/* NOTE: Page-level JSON-LD schemas are injected by each page component.
            No global schema here to avoid duplicate JSON-LD across all pages. */}
      </head>
      <body
        className={`${outfit.variable} ${jakarta.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground`}
      >
        <Providers>
          <VitalsInitializer />
          <SkipLinks />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main id="main-content" className="site-main flex-1" tabIndex={-1}>
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
          <SonnerToaster position="top-center" richColors closeButton />
          <FeedbackWidgetLazy />
        </Providers>
        <CookieConsent />
        {/* GA & AdSense loaded only after cookie consent */}
        <ConsentedScripts />
      </body>
    </html>
  );
}
