const fs = require("fs");
const s = fs.readFileSync("src/data/blog/articles.ts", "utf8");
const slugs = [...s.matchAll(/slug:\s*"([^"]+)"/g)].map((m) => m[1]);
const counts = {};
slugs.forEach((x) => (counts[x] = (counts[x] || 0) + 1));
const dups = Object.entries(counts).filter(([, c]) => c > 1);
console.log("total", slugs.length, "unique", Object.keys(counts).length);
console.log("dups", dups);
const needed = [
  "merge-pdf-without-losing-formatting",
  "paraphrasing-vs-rewriting-for-assignments",
  "flashcards-vs-notes-for-retention",
  "grammar-checker-vs-human-editing",
  "summarize-long-articles-fast",
  "homework-solver-best-practices",
  "build-exam-revision-system-30-minutes",
  "resume-bullets-that-get-interviews",
  "linkedin-headline-about-formula",
  "compress-images-for-web-speed",
  "jpg-png-pdf-workflow-guide",
  "ai-writing-workflow-students",
];
needed.forEach((slug) => console.log(slug, counts[slug] ? "YES" : "MISSING"));
