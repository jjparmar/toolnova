/**
 * Lighthouse / CWV quality gates for ToolNova
 *
 * Modes:
 *   node scripts/lighthouse-check.js
 *     Static CWV regression checks (always runs, no Chrome required)
 *
 *   node scripts/lighthouse-check.js --live --url=https://www.toolnovahub.com
 *     Optional: run Lighthouse CLI if installed (`npm i -D lighthouse`)
 *
 * Thresholds (static + documented for live):
 *   Accessibility ≥ 0.90
 *   SEO ≥ 0.90
 *   CLS ≤ 0.15
 *   LCP ≤ 3.5s (warn)
 */
const fs = require("fs");
const path = require("path");
const { spawnSync } = require("child_process");

const root = path.join(__dirname, "..");
let failed = 0;
let warned = 0;

function ok(msg) {
  console.log("  ✓", msg);
}
function fail(msg) {
  console.error("  ✗", msg);
  failed++;
}
function warn(msg) {
  console.warn("  !", msg);
  warned++;
}

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}
function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

console.log("\nToolNova Lighthouse / CWV gates\n" + "=".repeat(40));

// ── Static CWV pattern checks (fast, offline) ─────────────────────────
console.log("\n[1] Accessibility anchors");
const layout = exists("src/app/layout.tsx") ? read("src/app/layout.tsx") : "";
const header = exists("src/components/Header.tsx")
  ? read("src/components/Header.tsx")
  : "";
const skip = exists("src/components/SkipLinks.tsx")
  ? read("src/components/SkipLinks.tsx")
  : "";

if (layout.includes('id="main-content"')) ok('main#main-content present');
else fail('Missing id="main-content" on <main>');

if (header.includes('id="navigation"')) ok("header #navigation present");
else fail('Missing id="navigation"');

if (header.includes('id="search"')) ok("header #search present");
else fail('Missing id="search"');

if (skip.includes("#main-content") && skip.includes("#navigation"))
  ok("Skip links target main landmarks");
else fail("Skip links missing expected targets");

console.log("\n[2] CLS / image sizing patterns");
const blogPage = exists("src/app/blog/page.tsx")
  ? read("src/app/blog/page.tsx")
  : "";
const blogSlug = exists("src/app/blog/[slug]/page.tsx")
  ? read("src/app/blog/[slug]/page.tsx")
  : "";
const blogGrid = exists("src/components/blog/BlogGridWithFilters.tsx")
  ? read("src/components/blog/BlogGridWithFilters.tsx")
  : "";
const globals = exists("src/app/globals.css") ? read("src/app/globals.css") : "";

if (blogSlug.includes("aspect-[16/9]") || blogSlug.includes("aspect-[16/9]"))
  ok("Blog article cover uses reserved aspect ratio");
else if (blogSlug.includes("fill") && blogSlug.includes("sizes="))
  ok("Blog article cover uses fill + sizes");
else warn("Blog article cover may lack reserved aspect / sizes");

if (blogGrid.includes("sizes=") && blogGrid.includes("aspect-"))
  ok("Blog grid cards use sizes + aspect ratio");
else warn("Blog grid cards missing sizes/aspect");

if (blogPage.includes("sizes=") || blogPage.includes("priority"))
  ok("Blog listing featured image optimized");
else warn("Blog listing featured image may need sizes/priority");

if (globals.includes("ad-slot-shell") || globals.includes("min-height"))
  ok("Ad slot CSS shells present (CLS reserve)");
else warn("Ad slot min-height shells not found");

console.log("\n[3] Font payload discipline");
if (
  (layout.includes("Manrope") ||
    layout.includes("Sora") ||
    layout.includes("Outfit") ||
    layout.includes("Inter")) &&
  (layout.includes('weight: ["400"') ||
    layout.includes("weight: [\"400\"") ||
    layout.includes('weight: ["500"') ||
    layout.includes("weight: [\"500\""))
)
  ok("Primary font weights trimmed for LCP");
else warn("Primary font may still preload too many weights");

if (layout.includes("Geist_Mono") && layout.includes("preload: false"))
  ok("Mono font not preloaded");
else warn("Mono font preload setting unclear");

console.log("\n[4] Reduced motion");
if (globals.includes("prefers-reduced-motion"))
  ok("prefers-reduced-motion respected");
else fail("Missing prefers-reduced-motion rules");

console.log("\n[5] Mobile nav / TOC quality");
const mobile = exists("src/components/MobileMenu.tsx")
  ? read("src/components/MobileMenu.tsx")
  : "";
const toc = exists("src/components/blog/TableOfContents.tsx")
  ? read("src/components/blog/TableOfContents.tsx")
  : "";

if (mobile.includes("aria-modal") && mobile.includes("Escape"))
  ok("Mobile menu: modal + Escape close");
else fail("Mobile menu missing a11y basics");

if (mobile.includes("Quick tools") || mobile.includes("quickTools"))
  ok("Mobile menu includes quick tools");
else warn("Mobile menu missing quick tools shortcuts");

if (toc.includes("IntersectionObserver") && toc.includes("mobileBarVisible"))
  ok("Blog TOC: active section + sticky mobile bar");
else warn("Blog TOC missing sticky mobile / active tracking");

console.log("\n[6] Budget config present");
if (exists("lighthouserc.json")) ok("lighthouserc.json present for LHCI");
else warn("lighthouserc.json missing");

// ── Optional live Lighthouse ──────────────────────────────────────────
const live = process.argv.includes("--live");
const urlArg = process.argv.find((a) => a.startsWith("--url="));
const url = urlArg
  ? urlArg.slice("--url=".length)
  : process.env.LIGHTHOUSE_URL || "";

if (live) {
  console.log("\n[7] Live Lighthouse");
  if (!url) {
    fail("--live requires --url=https://… or LIGHTHOUSE_URL");
  } else {
    // Prefer local lighthouse binary
    const lhBin = path.join(root, "node_modules", ".bin", "lighthouse");
    const hasLh = fs.existsSync(lhBin) || fs.existsSync(lhBin + ".cmd");
    if (!hasLh) {
      warn(
        "lighthouse not installed. Run: npm i -D lighthouse  then re-run with --live",
      );
    } else {
      const outDir = path.join(root, ".lighthouseci");
      fs.mkdirSync(outDir, { recursive: true });
      const reportPath = path.join(outDir, "report.json");
      console.log("  Running Lighthouse against", url);
      const res = spawnSync(
        process.platform === "win32" ? lhBin + ".cmd" : lhBin,
        [
          url,
          "--quiet",
          "--chrome-flags=--headless --no-sandbox",
          "--only-categories=performance,accessibility,best-practices,seo",
          "--output=json",
          `--output-path=${reportPath}`,
        ],
        { encoding: "utf8", shell: process.platform === "win32" },
      );
      if (res.status !== 0) {
        fail("Lighthouse process failed: " + (res.stderr || res.stdout || "").slice(0, 400));
      } else if (!fs.existsSync(reportPath)) {
        fail("Lighthouse report not written");
      } else {
        const report = JSON.parse(fs.readFileSync(reportPath, "utf8"));
        const cats = report.categories || {};
        const audits = report.audits || {};
        const score = (id) =>
          cats[id] ? Math.round(cats[id].score * 100) : null;
        const num = (id) =>
          audits[id]?.numericValue != null
            ? Math.round(audits[id].numericValue)
            : null;

        const a11y = score("accessibility");
        const seo = score("seo");
        const perf = score("performance");
        const bp = score("best-practices");
        const lcp = num("largest-contentful-paint");
        const cls = audits["cumulative-layout-shift"]?.numericValue;

        console.log(
          `  Scores — Perf ${perf} · A11y ${a11y} · BP ${bp} · SEO ${seo}`,
        );
        if (lcp != null) console.log(`  LCP ${lcp}ms · CLS ${cls}`);

        if (a11y != null && a11y < 90) fail(`Accessibility ${a11y} < 90`);
        else if (a11y != null) ok(`Accessibility ${a11y} ≥ 90`);

        if (seo != null && seo < 90) fail(`SEO ${seo} < 90`);
        else if (seo != null) ok(`SEO ${seo} ≥ 90`);

        if (perf != null && perf < 75) warn(`Performance ${perf} < 75`);
        else if (perf != null) ok(`Performance ${perf} ≥ 75 (warn threshold)`);

        if (cls != null && cls > 0.15) fail(`CLS ${cls} > 0.15`);
        else if (cls != null) ok(`CLS ${cls} ≤ 0.15`);

        if (lcp != null && lcp > 3500) warn(`LCP ${lcp}ms > 3500ms`);
        else if (lcp != null) ok(`LCP ${lcp}ms ≤ 3500ms`);
      }
    }
  }
} else {
  console.log(
    "\n(tip) Live scores: npm i -D lighthouse && npm run lighthouse:live -- --url=https://www.toolnovahub.com",
  );
}

console.log("\n" + "=".repeat(40));
if (failed === 0) {
  console.log(`PASS — ${warned} warning(s).`);
  process.exit(0);
}
console.error(`FAIL — ${failed} error(s), ${warned} warning(s).`);
process.exit(1);
