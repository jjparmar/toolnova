/**
 * Patch metadata for expanded Jul-15 posts + recompute word counts from content.
 */
const fs = require("fs");
const path = require("path");

const ARTICLES = path.join(__dirname, "..", "src", "data", "blog", "articles.ts");
let src = fs.readFileSync(ARTICLES, "utf8");

const META = {
  "homework-solver-best-practices": {
    dateModified: "2026-07-27",
    metaDescription:
      "Use AI homework solvers the right way—step-by-step learning, not copy-paste. Ethical workflow, flashcards, quizzes, and study habits that raise real understanding.",
    coverImage: "/images/blog/prepare-finals-ai-flashcards.png",
    imageAlt: "Student using an AI homework solver as a tutor, not a copy tool",
  },
  "compress-images-for-web-speed": {
    dateModified: "2026-07-27",
    metaDescription:
      "Reduce image file size without wrecking quality. Resize first, compress photos, pick JPG/PNG wisely, and protect Core Web Vitals.",
    coverImage: "/images/blog/summarization-before-after-2026.png",
    imageAlt: "Before and after image compression for faster web pages",
  },
  "summarize-long-articles-fast": {
    dateModified: "2026-07-27",
    metaDescription:
      "Summarize research papers, news, and long reads in minutes without losing claims or evidence—using a human skim plus AI workflow.",
    coverImage: "/images/blog/ai-document-summarizer-2026.png",
    imageAlt: "Workflow for summarizing long articles with AI tools",
  },
  "grammar-checker-vs-human-editing": {
    dateModified: "2026-07-27",
    metaDescription:
      "Compare AI grammar checkers and human editing. A practical workflow for essays and professional writing that balances speed and judgment.",
    coverImage: "/images/blog/free-grammar-checker-tools-students-cover.png",
    imageAlt: "AI grammar checker versus human editing workflow",
  },
  "resume-bullets-that-get-interviews": {
    dateModified: "2026-07-27",
    metaDescription:
      "Write resume bullet points that show impact, not duties. Action + Metric + Result formula with examples and free AI resume tools.",
    coverImage: "/images/blog/content-creation-workflow-2026.png",
    imageAlt: "Resume bullet formula with measurable impact examples",
  },
  "ai-writing-workflow-students": {
    dateModified: "2026-07-27",
    metaDescription:
      "Ethical AI writing workflow for students: outline, draft in your voice, polish grammar, and check originality without crossing integrity lines.",
    coverImage: "/images/blog/ai-writing-tools-creators-2026.png",
    imageAlt: "Ethical AI writing workflow for students",
  },
  "jpg-png-pdf-workflow-guide": {
    dateModified: "2026-07-27",
    metaDescription:
      "Learn when to use JPG, PNG, or PDF—and a free workflow to convert, compress, merge, and submit clean documents without portal rejections.",
    coverImage: "/images/blog/pdf-tools-ultimate-guide-2026.png",
    imageAlt: "JPG vs PNG vs PDF format workflow diagram",
  },
  "build-exam-revision-system-30-minutes": {
    dateModified: "2026-07-27",
    metaDescription:
      "Build a complete exam revision system in 30 minutes: topic list, plan, timetable, flashcards, and self-tests using free AI study tools.",
    coverImage: "/images/blog/flashcards-vs-notes-retention.png",
    imageAlt: "30-minute exam revision system with flashcards and timetable",
  },
  "linkedin-headline-about-formula": {
    dateModified: "2026-07-27",
    metaDescription:
      "Write a LinkedIn headline and About section that explain who you help and with what proof—formulas, examples, and free optimizer tools.",
    coverImage: "/images/blog/content-creation-workflow-2026.png",
    imageAlt: "LinkedIn headline and About section formula for recruiters",
  },
};

function wordCount(text) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[#>*_`|-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

function readTime(words) {
  return `${Math.max(5, Math.ceil(words / 220))} min read`;
}

function patchField(block, key, value, isNumber = false) {
  const re = new RegExp(`(${key}\\s*:\\s*)([^,\\n]+)`);
  if (!re.test(block)) {
    console.warn(" missing field", key);
    return block;
  }
  if (isNumber) {
    return block.replace(re, `$1${value}`);
  }
  // string field may use "..." or '...'
  return block.replace(
    new RegExp(`(${key}\\s*:\\s*)(["'])([^"']*)\\2`),
    `$1$2${value.replace(/"/g, '\\"')}$2`
  );
}

for (const [slug, meta] of Object.entries(META)) {
  const startRe = new RegExp(
    `(\\{[\\s\\n]*slug\\s*:\\s*["']${slug}["'])`
  );
  const start = src.search(new RegExp(`slug\\s*:\\s*["']${slug}["']`));
  if (start < 0) {
    console.warn("slug not found", slug);
    continue;
  }
  // find object start
  let objStart = src.lastIndexOf("{", start);
  // find content:\` ... \`
  const contentKey = src.indexOf("content:", start);
  const tick = src.indexOf("`", contentKey);
  if (tick < 0) {
    console.warn("no content tick", slug);
    continue;
  }
  // find closing tick before faq
  let i = tick + 1;
  let closed = -1;
  while (i < src.length) {
    if (src[i] === "\\" ) {
      i += 2;
      continue;
    }
    if (src[i] === "`") {
      closed = i;
      break;
    }
    i++;
  }
  if (closed < 0) {
    console.warn("unclosed content", slug);
    continue;
  }
  const content = src.slice(tick + 1, closed);
  const words = wordCount(content);
  const rt = readTime(words);

  // meta region is from objStart to contentKey
  let head = src.slice(objStart, contentKey);
  head = patchField(head, "dateModified", meta.dateModified);
  head = patchField(head, "readTime", rt);
  head = patchField(head, "wordCount", words, true);
  head = patchField(head, "metaDescription", meta.metaDescription);
  head = patchField(head, "coverImage", meta.coverImage);
  head = patchField(head, "imageAlt", meta.imageAlt);

  src = src.slice(0, objStart) + head + src.slice(contentKey);
  console.log(`meta OK ${slug}: ${words} words, ${rt}`);
}

fs.writeFileSync(ARTICLES, src);
console.log("done");
