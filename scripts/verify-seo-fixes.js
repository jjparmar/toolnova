const fs = require("fs");
const path = require("path");

const s = fs.readFileSync(
  path.join(__dirname, "..", "src", "data", "blog", "articles.ts"),
  "utf8"
);
const slugs = [...s.matchAll(/["']?slug["']?\s*:\s*["']([^"']+)["']/g)].map((m) => m[1]);
const blogSet = new Set(slugs);
let failed = 0;

const needed = [
  "flashcards-vs-notes-for-retention",
  "how-ai-flashcards-double-retention",
  "free-grammar-checker-tools-students-2026",
  "paraphrasing-vs-rewriting-for-assignments",
  "paraphrasing-tools-guide-2026",
  "how-to-summarize-long-documents-ai",
  "how-to-merge-pdf-files-online-free-guide",
  "merge-pdf-without-losing-formatting",
  "free-online-pdf-tools-ultimate-guide",
  "how-to-compress-a-pdf-to-1mb-online",
  "homework-solver-best-practices",
];
console.log("=== required slugs ===");
for (const n of needed) {
  const exists = blogSet.has(n);
  console.log(exists ? "OK" : "MISSING", n);
  if (!exists) failed++;
}

const thin = [
  "homework-solver-best-practices",
  "compress-images-for-web-speed",
  "summarize-long-articles-fast",
  "grammar-checker-vs-human-editing",
  "resume-bullets-that-get-interviews",
  "ai-writing-workflow-students",
  "jpg-png-pdf-workflow-guide",
  "build-exam-revision-system-30-minutes",
  "linkedin-headline-about-formula",
];
console.log("\n=== thin post meta ===");
for (const slug of thin) {
  const re = new RegExp(
    `["']?slug["']?\\s*:\\s*["']${slug}["'][\\s\\S]{0,4000}?["']?wordCount["']?\\s*:\\s*(\\d+)[\\s\\S]{0,800}?["']?coverImage["']?\\s*:\\s*["']([^"']+)["']`
  );
  const m = s.match(re);
  console.log(slug, m ? `wc=${m[1]} cover=${m[2]}` : "PARSE FAIL");
  if (!m) failed++;
}

const human = [
  ...s.matchAll(/date(?:Modified)?\s*:\s*["']([A-Za-z]{3} )/g),
];
console.log("\nhuman dates left:", human.length);

const md = [...s.matchAll(/\]\(\/blog\/([a-z0-9-]+)\)/g)].map((m) => m[1]);
const broken = [...new Set(md)].filter((x) => !blogSet.has(x));
console.log("broken md blog links:", broken);
failed += broken.length;

// related-blog-guides destinations
const guides = fs.readFileSync(
  path.join(__dirname, "..", "src", "lib", "related-blog-guides.ts"),
  "utf8"
);
const hrefs = [...guides.matchAll(/href:\s*["']([^"']+)["']/g)].map(
  (m) => m[1]
);
console.log("\n=== related guide hrefs ===");
for (const h of hrefs) {
  if (h === "/blog") continue;
  const slug = h.replace("/blog/", "");
  const exists = blogSet.has(slug);
  console.log(exists ? "OK" : "MISSING", h);
  if (!exists) failed++;
}

// homework-solver page
const hs = fs.readFileSync(
  path.join(__dirname, "..", "src", "app", "tools", "homework-solver", "page.tsx"),
  "utf8"
);
console.log("\nhomework page has RelatedBlogGuides:", hs.includes("RelatedBlogGuides"));
if (!hs.includes("RelatedBlogGuides")) failed++;

if (failed) {
  console.error(`\nFAIL: ${failed} SEO integrity issue(s) found.`);
  process.exitCode = 1;
} else {
  console.log("\nPASS: SEO integrity checks passed.");
}
