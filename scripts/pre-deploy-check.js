/**
 * Pre-deploy health check for ToolNova (toolnovahub.com)
 * Run: node scripts/pre-deploy-check.js
 * Or:  npm run predeploy
 */
const fs = require("fs");
const path = require("path");

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

function exists(rel) {
  return fs.existsSync(path.join(root, rel));
}

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

console.log("\nToolNova pre-deploy check\n" + "=".repeat(40));

// 1) Critical public assets
console.log("\n[1] Public / SEO assets");
[
  "public/robots.txt",
  "public/ads.txt",
  "public/llms.txt",
  "public/og-image.png",
  "public/logo.webp",
  "public/favicon-32x32.png",
  "public/site.webmanifest",
].forEach((f) => (exists(f) ? ok(f) : fail(`Missing ${f}`)));

// 2) ads.txt publisher
console.log("\n[2] AdSense / ads.txt");
if (exists("public/ads.txt")) {
  const ads = read("public/ads.txt");
  if (ads.includes("pub-1328083083403070")) ok("ads.txt has publisher ID");
  else fail("ads.txt missing expected pub ID");
}
if (exists("src/config/adsense.ts")) {
  const a = read("src/config/adsense.ts");
  if (a.includes("ca-pub-1328083083403070")) ok("adsense.ts publisher matches");
  else warn("adsense.ts publisher may not match ads.txt");
}

// 3) Legal / trust pages
console.log("\n[3] Trust & legal routes");
[
  "src/app/privacy/page.tsx",
  "src/app/terms/page.tsx",
  "src/app/cookie-policy/page.tsx",
  "src/app/advertising/page.tsx",
  "src/app/disclaimer/page.tsx",
  "src/app/refund/page.tsx",
  "src/app/contact/page.tsx",
  "src/app/about/page.tsx",
].forEach((f) => (exists(f) ? ok(f) : fail(`Missing ${f}`)));

// 4) Site config
console.log("\n[4] Site config");
if (exists("src/config/site.ts")) {
  const s = read("src/config/site.ts");
  if (s.includes("https://www.toolnovahub.com")) ok("Canonical www URL set");
  else fail("site.ts missing www.toolnovahub.com");
  if (s.includes("support@toolnovahub.com")) ok("Support email set");
  else warn("Support email missing");
}

// 5) Blog integrity
console.log("\n[5] Blog slugs & covers");
if (exists("src/data/blog/articles.ts")) {
  const s = read("src/data/blog/articles.ts");
  const slugs = [
    ...s.matchAll(/(?:slug|"slug")\s*:\s*["']([^"']+)["']/g),
  ].map((m) => m[1]);
  const counts = {};
  slugs.forEach((x) => (counts[x] = (counts[x] || 0) + 1));
  const dups = Object.entries(counts).filter(([, c]) => c > 1);
  if (dups.length)
    fail("Duplicate blog slugs: " + dups.map(([k]) => k).join(", "));
  else ok(`${Object.keys(counts).length} unique blog posts`);

  // Human-readable dates break consistent lastmod / OG times
  const humanDates = [
    ...s.matchAll(/date(?:Modified)?\s*:\s*["'][A-Za-z]{3} \d/g),
  ];
  if (humanDates.length)
    fail(`${humanDates.length} non-ISO blog date field(s) (use YYYY-MM-DD)`);
  else ok("All blog dates use ISO YYYY-MM-DD");

  // Cover images must exist under public/
  const covers = [
    ...s.matchAll(/coverImage["']?\s*:\s*["']([^"']+)["']/g),
  ].map((m) => m[1]);
  let missingCovers = 0;
  for (const c of [...new Set(covers)]) {
    if (c.startsWith("http")) continue;
    const rel = "public" + (c.startsWith("/") ? c : "/" + c);
    if (!exists(rel)) {
      missingCovers++;
      fail(`Missing cover: ${c}`);
    }
  }
  if (!missingCovers) ok(`${new Set(covers).size} cover image path(s) exist`);

  // Broken internal /tools/ links in articles
  const toolDirs = fs
    .readdirSync(path.join(root, "src/app/tools"), { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
  const toolLinks = [
    ...s.matchAll(/\]\(\/tools\/([a-z0-9-]+)\)/g),
  ].map((m) => m[1]);
  const badTools = [...new Set(toolLinks)].filter((t) => !toolDirs.includes(t));
  if (badTools.length) fail("Broken tool links in blog: " + badTools.join(", "));
  else ok("No broken /tools/ markdown links in articles");

  const blogLinks = [
    ...s.matchAll(/\]\(\/blog\/([a-z0-9-]+)\)/g),
  ].map((m) => m[1]);
  const slugSet = new Set(slugs);
  const badBlogs = [...new Set(blogLinks)].filter((b) => !slugSet.has(b));
  if (badBlogs.length)
    fail("Broken blog links in articles: " + badBlogs.join(", "));
  else ok("No broken /blog/ markdown links in articles");
}

// 6) Env example (don't require secrets in CI)
console.log("\n[6] Environment template");
if (exists(".env.example")) {
  const e = read(".env.example");
  ["OPENAI_API_KEY", "NEXTAUTH_SECRET", "NEXTAUTH_URL"].forEach((k) => {
    if (e.includes(k)) ok(`.env.example documents ${k}`);
    else warn(`.env.example missing ${k}`);
  });
} else warn("No .env.example");

// 7) package scripts
console.log("\n[7] Build scripts");
const pkg = JSON.parse(read("package.json"));
if (pkg.scripts?.build) ok("build script present");
else fail("No build script");
if (pkg.scripts?.start) ok("start script present");
else warn("No start script");

// 8) Misleading claim scan (light)
console.log("\n[8] Policy-sensitive copy (sample)");
const homeAeo = exists("src/lib/global-aeo-content.ts")
  ? read("src/lib/global-aeo-content.ts")
  : "";
if (homeAeo.includes("free daily") || homeAeo.includes("Free daily")) {
  ok("Homepage AEO mentions free daily AI (honest freemium)");
} else warn("Homepage AEO may need freemium honesty review");

// 9) IndexNow key file
console.log("\n[9] IndexNow");
const indexKey = "fdcca368392a42d9916dcffd147d6ebf";
const keyPath = `public/${indexKey}.txt`;
if (exists(keyPath)) {
  const body = read(keyPath).trim();
  if (body === indexKey || body.includes(indexKey)) ok(`IndexNow key file ${keyPath}`);
  else fail(`IndexNow key file content mismatch`);
} else fail(`Missing ${keyPath}`);

// 10) AdSense slot env documentation
console.log("\n[10] AdSense slots (optional until approved)");
const envEx = exists(".env.example") ? read(".env.example") : "";
const slotKeys = [
  "NEXT_PUBLIC_ADSENSE_SLOT_TOOL_TOP",
  "NEXT_PUBLIC_ADSENSE_SLOT_TOOL_INCONTENT",
  "NEXT_PUBLIC_ADSENSE_SLOT_HOME_FOOTER",
];
slotKeys.forEach((k) => {
  if (envEx.includes(k)) ok(`.env.example documents ${k}`);
  else warn(`.env.example missing ${k}`);
});
const configured = slotKeys.filter((k) => {
  const v = process.env[k];
  return v && /^\d+$/.test(v.trim());
});
if (configured.length) ok(`${configured.length} slot env(s) set in current process`);
else ok("No manual slots in env yet (Auto Ads OK)");

// 11) Point to CWV gate (also run via npm run predeploy chain)
console.log("\n[11] CWV / Lighthouse gate");
ok("Run automatically after this script: node scripts/lighthouse-check.js");
ok("Live Lighthouse (optional): npm run lighthouse:live -- --url=https://www.toolnovahub.com");

// Summary
console.log("\n" + "=".repeat(40));
if (failed === 0) {
  console.log(`PASS — ${warned} warning(s). Safe to build & deploy.`);
  console.log(`
Next steps:
  1. npm run build   (or bun run build)
  2. Deploy standalone output
  3. Verify live:
     https://www.toolnovahub.com/robots.txt
     https://www.toolnovahub.com/ads.txt
     https://www.toolnovahub.com/advertising
     https://www.toolnovahub.com/sitemap.xml
  4. Request indexing in Google Search Console
  5. Optional CWV live: npm run lighthouse:live -- --url=https://www.toolnovahub.com
`);
  process.exit(0);
} else {
  console.error(`FAIL — ${failed} error(s), ${warned} warning(s). Fix before deploy.`);
  process.exit(1);
}
