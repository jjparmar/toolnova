#!/usr/bin/env node
/**
 * Sync/verify the lightweight tool search index (src/data/tool-search-index.ts)
 * against the canonical tools catalog (src/data/tools.ts).
 *
 * The slim index is imported by CLIENT components (homepage search, header
 * global search) so the ~150KB full catalog (howItWorks/benefits/faqs) never
 * ships in the browser bundle. This script keeps the two in sync.
 *
 * Usage:
 *   node scripts/sync-tool-search-index.js          # regenerate the file
 *   node scripts/sync-tool-search-index.js --check   # fail if drifted (CI)
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const TOOLS_PATH = path.join(ROOT, "src", "data", "tools.ts");
const INDEX_PATH = path.join(ROOT, "src", "data", "tool-search-index.ts");

function parseTools() {
  const s = fs.readFileSync(TOOLS_PATH, "utf8");
  const entries = [];
  const keyRe = /(?:=\s*\{|\}\s*,)\s*"([a-z0-9-]+)"\s*:\s*\{/g;
  let m;
  const ranges = [];
  while ((m = keyRe.exec(s)) !== null) {
    ranges.push({ slug: m[1], start: m.index + m[0].length });
  }
  if (!ranges.length) {
    throw new Error("No tool entries parsed from " + TOOLS_PATH);
  }
  const str = (v) => {
    if (v === undefined) return "";
    return v.replace(/\\"/g, '"').replace(/\\n/g, " ");
  };
  for (let i = 0; i < ranges.length; i++) {
    const { slug, start } = ranges[i];
    const end = i + 1 < ranges.length ? ranges[i + 1].start : s.length;
    const block = s.slice(start, end);
    const name = str((/name\s*:\s*"((?:[^"\\]|\\.)*)"/.exec(block) || [])[1]);
    const tagline = str((/tagline\s*:\s*"((?:[^"\\]|\\.)*)"/.exec(block) || [])[1]);
    const description = str((/description\s*:\s*"((?:[^"\\]|\\.)*)"/.exec(block) || [])[1]);
    const category = str((/category\s*:\s*"((?:[^"\\]|\\.)*)"/.exec(block) || [])[1]);
    entries.push({
      slug,
      name,
      description: tagline || description,
      category,
    });
  }
  return entries;
}

function serialize(entries) {
  const count = entries.length;
  const lines = [
    "// GENERATED FILE — DO NOT EDIT BY HAND.",
    "// Run `node scripts/sync-tool-search-index.js` after adding/changing tools in",
    "// src/data/tools.ts. Keeps heavy catalog data out of the client bundle.",
    "",
    "export interface ToolSearchEntry {",
    "  slug: string;",
    "  name: string;",
    "  description: string;",
    "  category: string;",
    "}",
    "",
    `export const toolSearchIndex: ToolSearchEntry[] = [`,
    ...entries.map(
      (e) =>
        `  { slug: ${JSON.stringify(e.slug)}, name: ${JSON.stringify(e.name)}, description: ${JSON.stringify(e.description)}, category: ${JSON.stringify(e.category)} },`
    ),
    `];`,
    "",
    `export const TOOL_COUNT = toolSearchIndex.length;`,
    "",
    `export const TOOL_COUNT_LABEL = \`\${toolSearchIndex.length}+\`;`,
    "",
  ];
  return lines.join("\n");
}

const check = process.argv.includes("--check");
const entries = parseTools();
const generated = serialize(entries);

if (check) {
  const existing = fs.existsSync(INDEX_PATH)
    ? fs.readFileSync(INDEX_PATH, "utf8")
    : "";
  if (existing === generated) {
    console.log(
      `tool-search-index.ts in sync (${entries.length} tools).`
    );
    process.exit(0);
  }
  console.error(
    `DRIFT DETECTED: src/data/tool-search-index.ts is out of sync with src/data/tools.ts.\n` +
      `Run \`node scripts/sync-tool-search-index.js\` to regenerate (${entries.length} tools expected).`
  );
  process.exit(1);
}

fs.writeFileSync(INDEX_PATH, generated, "utf8");
console.log(
  `Regenerated src/data/tool-search-index.ts with ${entries.length} tools.`
);
