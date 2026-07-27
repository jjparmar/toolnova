/**
 * Fix misleading "completely free / unlimited" FAQ answers in AI tool clients.
 * Browser-only tools (PDF/image/counters) are left alone.
 */
const fs = require("fs");
const path = require("path");

const toolsDir = path.join(__dirname, "..", "src", "app", "tools");
const HONEST =
  "Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access.";

const LOCAL_UNLIMITED = new Set([
  "merge-pdf",
  "split-pdf",
  "reorder-pdf",
  "image-to-pdf",
  "image-compressor",
  "image-crop",
  "resize-image",
  "jpg-to-png",
  "png-to-jpg",
  "word-counter",
  "character-counter",
  "case-converter",
  "age-calculator",
]);

let filesChanged = 0;
let answersFixed = 0;

function fixFile(filePath, slug) {
  if (LOCAL_UNLIMITED.has(slug)) return;
  let s = fs.readFileSync(filePath, "utf8");
  const original = s;

  // FAQ answer:"Yes! The X is completely free... unlimited..."
  // Support both answer:"..." and answer: "..."
  s = s.replace(
    /answer\s*:\s*"([^"]*)"/g,
    (full, answer) => {
      if (!/free|unlimited|no (?:hidden )?fees|no limits|premium tiers/i.test(answer)) {
        return full;
      }
      // Skip browser-local honest claims if somehow present
      if (/browser|local|no upload|watermark/i.test(answer) && !/AI|generation|essay|solver|writer|generator/i.test(answer)) {
        return full;
      }
      if (
        /completely free|100% free|unlimited|no daily limits|no limits|without any cost|no hidden fees|no premium tiers required/i.test(
          answer
        )
      ) {
        answersFixed++;
        return `answer:"${HONEST}"`;
      }
      return full;
    }
  );

  // Also fix question/answer pairs using single-quoted strings if any
  s = s.replace(
    /answer\s*:\s*'([^']*)'/g,
    (full, answer) => {
      if (
        /completely free|100% free|unlimited|no daily limits|without any cost/i.test(
          answer
        )
      ) {
        answersFixed++;
        return `answer:'${HONEST.replace(/'/g, "\\'")}'`;
      }
      return full;
    }
  );

  if (s !== original) {
    fs.writeFileSync(filePath, s);
    filesChanged++;
    console.log("fixed", slug);
  }
}

for (const dir of fs.readdirSync(toolsDir, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  const client = path.join(toolsDir, dir.name, "client.tsx");
  if (!fs.existsSync(client)) continue;
  fixFile(client, dir.name);
}

// tools.ts data FAQs
const toolsData = path.join(__dirname, "..", "src", "data", "tools.ts");
if (fs.existsSync(toolsData)) {
  let s = fs.readFileSync(toolsData, "utf8");
  const before = s;
  s = s.replace(
    /answer:\s*"Yes[^"]*(?:unlimited|completely free|100% free|no limits)[^"]*"/gi,
    (m) => {
      if (!/free|unlimited|limit/i.test(m)) return m;
      answersFixed++;
      return `answer:"${HONEST}"`;
    }
  );
  if (s !== before) {
    fs.writeFileSync(toolsData, s);
    filesChanged++;
    console.log("fixed tools.ts FAQs");
  }
}

console.log({ filesChanged, answersFixed });
