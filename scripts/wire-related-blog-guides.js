const fs = require("fs");
const path = require("path");

const toolsDir = path.join(__dirname, "..", "src", "app", "tools");
const dirs = fs
  .readdirSync(toolsDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

let patched = 0;
let skipped = 0;

for (const slug of dirs) {
  if (slug === "[slug]" || slug.endsWith("-tools")) {
    skipped++;
    continue;
  }
  const page = path.join(toolsDir, slug, "page.tsx");
  if (!fs.existsSync(page)) {
    skipped++;
    continue;
  }
  let s = fs.readFileSync(page, "utf8");
  if (!s.includes("Related guides and tools")) {
    skipped++;
    continue;
  }
  if (s.includes("RelatedBlogGuides")) {
    skipped++;
    continue;
  }

  if (s.includes('from "next/link"') || s.includes("from 'next/link'")) {
    s = s.replace(
      /import Link from ["']next\/link["'];?/,
      (m) =>
        `${m}\nimport { RelatedBlogGuides } from '@/components/RelatedBlogGuides';`
    );
  } else {
    s =
      `import { RelatedBlogGuides } from '@/components/RelatedBlogGuides';\n` +
      s;
  }

  const re =
    /\s*<section className="mx-auto max-w-5xl px-4 py-8">[\s\S]*?Related guides and tools[\s\S]*?<\/section>/;
  if (!re.test(s)) {
    console.log("no section match", slug);
    skipped++;
    continue;
  }
  s = s.replace(
    re,
    `\n\n      <RelatedBlogGuides toolSlug="${slug}" />\n`
  );
  fs.writeFileSync(page, s);
  patched++;
  console.log("patched", slug);
}

console.log({ patched, skipped });
