/**
 * Normalize AI-tool free-tier FAQ answers so marketing copy matches product limits.
 * Local/browser tools (PDF, image, counters) keep unlimited wording.
 */
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "src", "data", "tools.ts");
let s = fs.readFileSync(file, "utf8");

const FREE_AI =
  "Yes. Free daily AI use is included without sign-up. Create a free account for more daily uses, or upgrade to Pro for unlimited AI access.";

// AI-backed tools where "unlimited free" is misleading
const aiSlugs = new Set([
  "text-summarizer",
  "paraphraser",
  "grammar-fix",
  "essay-writer",
  "bio-generator",
  "caption-generator",
  "email-writer",
  "speech-writer",
  "paragraph-generator",
  "story-generator",
  "cover-letter-writer",
  "flashcard-maker",
  "notes-generator",
  "mcq-generator",
  "quiz-generator",
  "homework-solver",
  "doubt-solver",
  "concept-explainer",
  "chapter-summary",
  "revision-planner",
  "timetable-generator",
  "synonym-finder",
  "antonym-finder",
  "one-word-substitution",
  "idioms-phrases",
  "vocabulary-builder",
  "text-simplifier",
  "linkedin-optimizer",
  "resume-bullets",
  "interview-generator",
  "goal-planner",
  "todo-list-generator",
  "formula-generator",
  "diagram-explainer",
  "plagiarism-checker",
  "youtube-summarizer",
]);

// Split file by tool entries: "slug-name": {
const parts = s.split(/(?=^\s{4}"[a-z0-9-]+":\s*\{)/m);
let changed = 0;

const freeAnswerPatterns = [
  /answer:\s*"Yes[^"]*(?:unlimited|no limits|100% free|as much as you need)[^"]*"/gi,
  /answer:\s*"ToolNova's paraphraser is 100% free\.[^"]*"/gi,
  /answer:\s*"Yes, ToolNova's Essay Writer is free to use\.[^"]*"/gi,
  /answer:\s*"Yes, the AI Bio Generator is completely free[^"]*"/gi,
  /answer:\s*"Yes, the paragraph generator is completely free[^"]*"/gi,
];

const out = parts.map((part) => {
  const slugMatch = part.match(/^\s{4}"([a-z0-9-]+)":\s*\{/);
  if (!slugMatch) return part;
  const slug = slugMatch[1];
  if (!aiSlugs.has(slug)) return part;

  let next = part;
  for (const re of freeAnswerPatterns) {
    next = next.replace(re, (m) => {
      // Only rewrite answers that are clearly about free/pricing
      if (!/free|unlimited|limit|paywall|subscription|sign-?up/i.test(m)) {
        return m;
      }
      changed++;
      return `answer: "${FREE_AI}"`;
    });
  }
  return next;
});

s = out.join("");

// Display name honesty for plagiarism tool
s = s.replace(
  'name: "AI Plagiarism Checker"',
  'name: "AI Writing Detector"',
);

fs.writeFileSync(file, s);
console.log("Updated free-tier FAQ answers:", changed);
console.log("File written:", file);
