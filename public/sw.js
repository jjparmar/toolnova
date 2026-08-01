// ToolNova Service Worker
// Network-first for HTML/navigations so deploys never serve stale chunk hashes.
// Cache-first only for versioned static assets.

const CACHE_NAME = "toolnova-static-v2";
const STATIC_ASSETS = [
  "/logo.png",
  "/logo.webp",
  "/favicon-32x32.png",
  "/favicon-16x16.png",
  "/apple-touch-icon.png",
  "/site.webmanifest",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
      .catch(() => self.skipWaiting()),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((names) =>
        Promise.all(
          names.map((name) => {
            if (name !== CACHE_NAME) return caches.delete(name);
          }),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

function isNavigationRequest(request) {
  if (request.mode === "navigate") return true;
  const accept = request.headers.get("accept") || "";
  return accept.includes("text/html");
}

function isCacheableStatic(url) {
  // Next.js hashed bundles + long-lived public assets only
  if (url.pathname.startsWith("/_next/static/")) return true;
  if (/\.(?:png|jpg|jpeg|webp|avif|gif|ico|svg|woff2?|ttf|eot)$/i.test(url.pathname)) {
    return true;
  }
  return STATIC_ASSETS.includes(url.pathname);
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }

  // Never intercept API or cross-origin
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith("/api/")) return;

  // HTML / navigations: always prefer network (avoids post-deploy white screens)
  if (isNavigationRequest(request)) {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => networkResponse)
        .catch(async () => {
          const cached = await caches.match(request);
          if (cached) return cached;
          // Minimal offline fallback
          return new Response(
            "<!doctype html><title>Offline</title><body style='font-family:system-ui;padding:2rem'><h1>You're offline</h1><p>Reconnect to use ToolNova tools.</p></body>",
            { headers: { "Content-Type": "text/html; charset=utf-8" } },
          );
        }),
    );
    return;
  }

  // Versioned static assets: stale-while-revalidate
  if (isCacheableStatic(url)) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const networkFetch = fetch(request)
          .then((networkResponse) => {
            if (
              networkResponse &&
              networkResponse.status === 200 &&
              networkResponse.type === "basic"
            ) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);

        return cachedResponse || networkFetch;
      }),
    );
  }
});
