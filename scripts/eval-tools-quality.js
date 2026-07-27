/**
 * Golden-prompt eval suite for ToolNova AI tools.
 *
 * Modes:
 *   node scripts/eval-tools-quality.js              # offline structure checks only
 *   node scripts/eval-tools-quality.js --live       # hit /api/ai (needs OPENAI_API_KEY + server or direct runAI)
 *   node scripts/eval-tools-quality.js --live --url http://localhost:3000
 *
 * Offline mode validates prompt templates exist and prompts are non-trivial.
 * Live mode scores responses for min length and required section markers.
 */
const fs = require("fs");
const path = require("path");

const LIVE = process.argv.includes("--live");
const urlArg = process.argv.indexOf("--url");
const BASE_URL =
  urlArg >= 0 && process.argv[urlArg + 1]
    ? process.argv[urlArg + 1].replace(/\/$/, "")
    : process.env.EVAL_BASE_URL || "http://localhost:3000";

/** @type {{ slug: string; input: string; minChars: number; mustInclude?: RegExp[] }[]} */
const CASES = [
  {
    slug: "text-summarizer",
    input:
      "Artificial intelligence is transforming education by personalizing learning paths, automating grading feedback, and helping teachers identify struggling students earlier. Critics worry about privacy, bias, and over-reliance on automated scores. Successful schools combine AI tools with human mentorship rather than replacing teachers.",
    minChars: 120,
    mustInclude: [/./],
  },
  {
    slug: "grammar-fix",
    input: "She don't like going to the library because there books is often missing pages.",
    minChars: 40,
  },
  {
    slug: "paraphraser",
    input:
      "Students should review their notes every evening to improve long-term retention of complex material.",
    minChars: 40,
  },
  {
    slug: "homework-solver",
    input: "Solve for x: 2x + 5 = 17. Show steps.",
    minChars: 80,
    mustInclude: [/x\s*=\s*6|6/i],
  },
  {
    slug: "resume-bullets",
    input:
      "Software intern at a campus lab. Built a Python script that cleaned survey CSV files. Helped teammates debug Flask APIs. No revenue metrics available.",
    minChars: 100,
  },
  {
    slug: "flashcard-maker",
    input: "Topic: Photosynthesis. Create 5 flashcards covering chloroplast, chlorophyll, light reaction, dark reaction, and glucose.",
    minChars: 150,
    mustInclude: [/card|front|back|question|answer/i],
  },
  {
    slug: "email-writer",
    input:
      "Write a polite email to my professor asking for a 3-day extension on the history essay because I was sick with a fever. Tone: respectful.",
    minChars: 120,
    mustInclude: [/subject/i],
  },
];

function toolsDirHasClient(slug) {
  return fs.existsSync(
    path.join(__dirname, "..", "src/app/tools", slug, "client.tsx"),
  );
}

function offlineChecks() {
  console.log("\n=== Offline tool structure ===\n");
  let fail = 0;
  for (const c of CASES) {
    const ok = toolsDirHasClient(c.slug);
    console.log(ok ? "✓" : "✗", c.slug, ok ? "client present" : "MISSING client");
    if (!ok) fail++;
  }

  // Compress PDF + batch compressor presence
  const extras = [
    "src/app/tools/compress-pdf/client.tsx",
    "src/lib/pdf-compress.ts",
    "src/lib/image-client.ts",
  ];
  for (const rel of extras) {
    const ok = fs.existsSync(path.join(__dirname, "..", rel));
    console.log(ok ? "✓" : "✗", rel);
    if (!ok) fail++;
  }

  // Stream export exists
  const ai = fs.readFileSync(
    path.join(__dirname, "..", "src/lib/ai.ts"),
    "utf8",
  );
  const hasStream = ai.includes("runAIStream");
  console.log(hasStream ? "✓" : "✗", "runAIStream export");
  if (!hasStream) fail++;

  return fail;
}

async function liveChecks() {
  console.log(`\n=== Live AI eval against ${BASE_URL} ===\n`);
  let fail = 0;
  for (const c of CASES) {
    process.stdout.write(`→ ${c.slug} … `);
    try {
      const res = await fetch(`${BASE_URL}/api/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          toolSlug: c.slug,
          prompt: c.input,
          stream: false,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        console.log("FAIL", data.error || res.status);
        fail++;
        continue;
      }
      const text = String(data.result || "");
      const longEnough = text.length >= c.minChars;
      const markersOk = (c.mustInclude || []).every((re) => re.test(text));
      if (longEnough && markersOk) {
        console.log(`OK (${text.length} chars)`);
      } else {
        console.log(
          `WEAK len=${text.length} need>=${c.minChars} markers=${markersOk}`,
        );
        fail++;
      }
    } catch (e) {
      console.log("ERROR", e instanceof Error ? e.message : e);
      fail++;
    }
  }
  return fail;
}

(async () => {
  let failed = offlineChecks();
  if (LIVE) {
    failed += await liveChecks();
  } else {
    console.log("\n(tip) Run with --live to score real model outputs\n");
  }
  console.log(failed === 0 ? "\nPASS\n" : `\nFAIL (${failed})\n`);
  process.exit(failed === 0 ? 0 : 1);
})();
