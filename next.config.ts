import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // Enable compression
  compress: true,

  // Slightly cleaner responses / fewer bytes
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  // TypeScript configuration
  typescript: {
    // ignoreBuildErrors: false (catch TS errors) //
  },

  // React configuration
  reactStrictMode: true,

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 86400,
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compiler optimizations
  compiler: {
    // Remove console.logs in production
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn"],
          }
        : false,
  },

  // Security + Performance + Caching Headers
  async headers() {
    return [
      // Cache static assets aggressively (images, fonts, etc.)
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2|ttf|eot)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Cache JS/CSS bundles
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      // Global security and performance headers for all routes
      {
        source: "/:path*",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://pagead2.googlesyndication.com https://partner.googleadservices.com https://tpc.googlesyndication.com https://adservice.google.com https://www.googletagmanager.com https://www.google-analytics.com https://googleads.g.doubleclick.net https://www.gstatic.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://fundingchoicesmessages.google.com https://cdn.jsdelivr.net",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob: https: http:",
              "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://pagead2.googlesyndication.com https://adservice.google.com https://googleads.g.doubleclick.net https://accounts.google.com https://oauth2.googleapis.com https://www.google.com https://ep1.adtrafficquality.google https://ep2.adtrafficquality.google https://fundingchoicesmessages.google.com https://csi.gstatic.com https://api.openai.com",
              "frame-src 'self' https://googleads.g.doubleclick.net https://tpc.googlesyndication.com https://www.google.com https://pagead2.googlesyndication.com https://fundingchoicesmessages.google.com https://accounts.google.com",
              "worker-src 'self' blob: https://cdn.jsdelivr.net https://unpkg.com",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self' https://accounts.google.com",
              "upgrade-insecure-requests",
            ].join("; "),
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "X-Robots-Tag",
            value:
              "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
          },
        ],
      },
      // HTML documents must revalidate quickly after deploys.
      // Long browser max-age causes Application errors: cached HTML points at
      // deleted /_next/static chunk hashes after a new build is deployed.
      {
        source: "/blog/:slug*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/tools/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
      // Vary: Accept-Encoding for proper proxy caching
      {
        source: "/:path*",
        headers: [
          {
            key: "Vary",
            value: "Accept-Encoding",
          },
        ],
      },
      // API routes: noindex (they should not be indexed by search engines)
      {
        source: "/api/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
          {
            key: "Cache-Control",
            value: "no-store, no-cache, must-revalidate",
          },
        ],
      },
    ];
  },

  // Experimental features for performance
  experimental: {
    optimizeCss: true, // Optimize CSS delivery (requires critters)
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "react-icons",
      "@radix-ui/react-accordion",
      "@radix-ui/react-alert-dialog",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "@radix-ui/react-tooltip",
    ],
  },
};

export default nextConfig;
