const fs = require("fs");
const path = require("path");
const toolsDir = path.join(__dirname, "..", "src", "app", "tools");

let removed = 0;
for (const dir of fs.readdirSync(toolsDir, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue;
  const page = path.join(toolsDir, dir.name, "page.tsx");
  if (!fs.existsSync(page)) continue;
  let s = fs.readFileSync(page, "utf8");
  if (!/import Link from ['"]next\/link['"]/.test(s)) continue;

  // usages of <Link or Link. (not RelatedBlogGuides)
  const withoutImport = s.replace(/import Link from ['"]next\/link['"];?\r?\n?/, "");
  const usesLink =
    /<Link[\s>]/.test(withoutImport) ||
    /from ['"]next\/link['"]/.test(withoutImport);

  if (!usesLink) {
    s = s.replace(/import Link from ['"]next\/link['"];?\r?\n?/, "");
    fs.writeFileSync(page, s);
    removed++;
    console.log("removed unused Link import:", dir.name);
  }
}
console.log({ removed });
