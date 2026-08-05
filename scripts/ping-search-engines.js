/**
 * Post-build / manual IndexNow submit for ToolNova
 * Usage:
 *   node scripts/ping-search-engines.js
 *   node scripts/ping-search-engines.js --dry-run
 *   npm run ping:indexnow
 */
const https = require("https");
const fs = require("fs");
const path = require("path");

const SITE_URL = "https://www.toolnovahub.com";
const INDEXNOW_KEY = "fdcca368392a42d9916dcffd147d6ebf";
const INDEXNOW_KEY_LOCATION = `${SITE_URL}/${INDEXNOW_KEY}.txt`;
const DRY_RUN = process.argv.includes("--dry-run");
// IndexNow supports large lists; chunk for reliability
const CHUNK_SIZE = 200;

function extractSlugs(filePath, prefix) {
  try {
    const fullPath = path.resolve(__dirname, "..", filePath);
    if (!fs.existsSync(fullPath)) return [];
    const content = fs.readFileSync(fullPath, "utf8");
    const matches = [...content.matchAll(/slug:\s*["']([^"']+)["']/g)];
    const unique = [...new Set(matches.map((m) => m[1]))];
    return unique.map((slug) => `${SITE_URL}/${prefix}/${slug}`);
  } catch (e) {
    console.error(`Error reading ${filePath}:`, e.message);
    return [];
  }
}

function keyFileOk() {
  const p = path.resolve(__dirname, "..", "public", `${INDEXNOW_KEY}.txt`);
  if (!fs.existsSync(p)) return false;
  const body = fs.readFileSync(p, "utf8").trim();
  return body === INDEXNOW_KEY || body.includes(INDEXNOW_KEY);
}

// Keep IndexNow aligned with noindex policy (see src/lib/blog-seo.ts)
const OFF_TOPIC_BLOG_SLUGS = new Set([
  "best-online-programming-courses-with-certificates",
  "best-lms-for-training-companies-and-corporate-learning",
  "aws-vs-azure-vs-google-cloud-comparison",
  "best-payroll-software-small-business",
  "erp-software-guide-how-to-choose-for-your-business",
  "best-cloud-call-center-software-small-business",
  "virtual-data-room-software-best-options-enterprises",
  "ai-agents-transforming-customer-support-2026",
  "chatgpt-vs-claude-vs-gemini-best-ai-for-business",
  "marketing-automation-software-ultimate-comparison",
  "best-help-desk-software-small-business-2026",
  "ai-hr-software-complete-guide-small-business",
  "top-10-enterprise-vpn-solutions-remote-teams",
  "how-ai-is-transforming-small-business-operations-2026",
  "top-email-marketing-solutions-business-growth",
  "best-online-business-degree-programs-2026",
  "online-mba-programs-guide-working-professionals",
]);

// Money pages + new guides — submitted first so crawlers see them sooner
const PRIORITY_PATHS = [
  "",
  "/tools",
  "/blog",
  "/tools/merge-pdf",
  "/tools/compress-pdf",
  "/tools/grammar-fix",
  "/tools/paraphraser",
  "/tools/flashcard-maker",
  "/tools/homework-solver",
  "/tools/essay-writer",
  "/tools/split-pdf",
  "/tools/image-to-pdf",
  "/tools/image-compressor",
  "/tools/text-summarizer",
  "/tools/notes-generator",
  "/tools/quiz-generator",
  "/tools/resume-bullets",
  "/tools/cover-letter-writer",
  "/blog/student-pdf-submission-workflow-portal-limits",
  "/blog/essay-polish-workflow-grammar-paraphrase-summarize",
  "/blog/lecture-notes-to-exam-ready-flashcards-quiz",
  "/blog/job-application-kit-resume-bullets-cover-letter",
  "/sitemap.xml",
];

const toolUrls = extractSlugs("src/data/tools.ts", "tools");
const blogUrls = extractSlugs("src/data/blog/articles.ts", "blog").filter(
  (url) => {
    const slug = url.split("/blog/")[1];
    return slug && !OFF_TOPIC_BLOG_SLUGS.has(slug);
  },
);

const categoryUrls = [
  "writing-tools",
  "study-tools",
  "exam-prep-tools",
  "image-pdf-tools",
  "utility-tools",
  "career-tools",
].map((c) => `${SITE_URL}/tools/${c}`);

const staticUrls = [
  SITE_URL,
  `${SITE_URL}/tools`,
  `${SITE_URL}/blog`,
  `${SITE_URL}/about`,
  `${SITE_URL}/pricing`,
  `${SITE_URL}/contact`,
  `${SITE_URL}/advertising`,
  `${SITE_URL}/editorial-policy`,
  `${SITE_URL}/privacy`,
  `${SITE_URL}/terms`,
  `${SITE_URL}/llms.txt`,
];

const priorityUrls = PRIORITY_PATHS.map((p) =>
  p ? `${SITE_URL}${p}` : SITE_URL,
);

const urlList = [
  ...priorityUrls,
  ...staticUrls,
  ...categoryUrls,
  ...toolUrls,
  ...blogUrls,
].filter((v, i, a) => a.indexOf(v) === i);

const startTime = Date.now();
console.log(`\n🔍 URL Breakdown: ${toolUrls.length} tools, ${blogUrls.length} blogs, ${categoryUrls.length} categories`);
console.log(`📦 Total unique URLs: ${urlList.length}`);
console.log(`🔑 IndexNow key file: ${keyFileOk() ? "OK" : "MISSING — check public/" + INDEXNOW_KEY + ".txt"}`);

if (DRY_RUN) {
  console.log("\n--dry-run: sample URLs:");
  urlList.slice(0, 15).forEach((u) => console.log("  ", u));
  if (urlList.length > 15) console.log(`  ... +${urlList.length - 15} more`);
  process.exit(keyFileOk() ? 0 : 1);
}

if (!keyFileOk()) {
  console.warn("⚠️  IndexNow key file missing or mismatched — submissions may fail.");
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

const chunks = chunk(urlList, CHUNK_SIZE);
const ENGINES = [
  { name: "IndexNow.org", hostname: "api.indexnow.org", path: "/indexnow" },
  { name: "Bing", hostname: "www.bing.com", path: "/indexnow" },
  { name: "Yandex", hostname: "yandex.com", path: "/indexnow" },
];

let softWarnings = 0;
let hardErrors = 0;

function postJson(engine, payload) {
  return new Promise((resolve) => {
    const body = JSON.stringify(payload);
    const options = {
      hostname: engine.hostname,
      path: engine.path,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
      timeout: 20000,
    };

    const req = https.request(options, (res) => {
      res.resume();
      if (res.statusCode === 200 || res.statusCode === 202) {
        console.log(`  ✅ ${engine.name} chunk OK (${res.statusCode})`);
      } else {
        console.warn(`  ⚠️  ${engine.name} status ${res.statusCode} (non-fatal)`);
        softWarnings++;
      }
      resolve();
    });

    req.on("timeout", () => {
      req.destroy();
      console.warn(`  ⚠️  ${engine.name} timeout (non-fatal)`);
      softWarnings++;
      resolve();
    });

    req.on("error", (e) => {
      console.warn(`  ⚠️  ${engine.name}: ${e.message} (non-fatal)`);
      softWarnings++;
      resolve();
    });

    req.write(body);
    req.end();
  });
}

async function run() {
  console.log(`\n🚀 Submitting ${chunks.length} chunk(s) × ${ENGINES.length} engines...\n`);

  for (let i = 0; i < chunks.length; i++) {
    const list = chunks[i];
    console.log(`Chunk ${i + 1}/${chunks.length} (${list.length} URLs)`);
    const payload = {
      host: "www.toolnovahub.com",
      key: INDEXNOW_KEY,
      keyLocation: INDEXNOW_KEY_LOCATION,
      urlList: list,
    };
    await Promise.all(ENGINES.map((engine) => postJson(engine, payload)));
  }

  // Legacy Google sitemap ping (often 404 — informational only)
  await new Promise((resolve) => {
    const googleUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITE_URL + "/sitemap.xml")}`;
    console.log(`\n📡 Google sitemap legacy ping (prefer Search Console)...`);
    https
      .get(googleUrl, (res) => {
        if (res.statusCode === 200) {
          console.log(`  ✅ Google ping ${res.statusCode}`);
        } else {
          console.warn(
            `  ⚠️  Google ping ${res.statusCode} (expected if deprecated)`,
          );
          softWarnings++;
        }
        resolve();
      })
      .on("error", (e) => {
        console.warn(`  ⚠️  Google ping error: ${e.message}`);
        softWarnings++;
        resolve();
      });
  });

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(
    `\n📊 Summary: urls=${urlList.length}, chunks=${chunks.length}, warnings=${softWarnings}, hardErrors=${hardErrors}`,
  );
  console.log(`⏱️  ${elapsed}s`);
  console.log(
    "\nTip: After deploy, also submit sitemap in Google Search Console + Bing Webmaster.",
  );
  // Never fail production build for external network noise
  process.exit(hardErrors > 0 ? 1 : 0);
}

run().catch((e) => {
  console.error(e);
  // Non-fatal for postbuild
  process.exit(0);
});
