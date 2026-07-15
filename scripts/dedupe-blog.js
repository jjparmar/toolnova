/**
 * 1) Drop duplicate blog slugs (keep first)
 * 2) Append missing SEO posts
 */
const fs = require("fs");
const path = require("path");

const file = path.join(__dirname, "..", "src", "data", "blog", "articles.ts");
const s = fs.readFileSync(file, "utf8");

const marker = "export const blogPosts: BlogPost[] = [";
const start = s.indexOf(marker);
if (start < 0) throw new Error("blogPosts not found");
const after = start + marker.length;

// Find array close `];` that sits before EDITORIAL_AUTHOR or getAllBlogPosts
const closeMatch = s.slice(after).match(/\n\];\s*\n/);
if (!closeMatch) throw new Error("array close not found");
const closeAbs = after + closeMatch.index;
const postsRegion = s.slice(after, closeAbs);
const tail = s.slice(closeAbs); // starts with \n];

// Parse top-level objects in the array
const posts = [];
let i = 0;
while (i < postsRegion.length) {
  while (i < postsRegion.length && /[\s,]/.test(postsRegion[i])) i++;
  if (i >= postsRegion.length) break;
  if (postsRegion[i] !== "{") {
    i++;
    continue;
  }
  let depth = 0;
  const abs = i;
  for (; i < postsRegion.length; i++) {
    if (postsRegion[i] === "{") depth++;
    else if (postsRegion[i] === "}") {
      depth--;
      if (depth === 0) {
        i++;
        break;
      }
    }
  }
  const block = postsRegion.slice(abs, i).trim();
  const slugM = block.match(/slug:\s*"([^"]+)"/);
  if (slugM) posts.push({ slug: slugM[1], block });
}

console.log("parsed", posts.length);
const seen = new Set();
const unique = [];
for (const p of posts) {
  if (seen.has(p.slug)) {
    console.log("drop", p.slug);
    continue;
  }
  seen.add(p.slug);
  unique.push(p);
}

const additions = makeAdditions(seen);
const all = unique.concat(additions);
console.log("unique", unique.length, "added", additions.length, "total", all.length);

const body = all.map((p) => p.block).join(",\n    ");
const out = s.slice(0, after) + "\n    " + body + "\n" + tail.replace(/^\n?/, "\n");
// tail already includes ];
// Fix if we doubled ];
const finalOut = s.slice(0, after) + "\n    " + body + tail;

fs.writeFileSync(file, finalOut);
console.log("wrote", file);

function makeAdditions(existing) {
  const defs = getDefs();
  const out = [];
  for (const d of defs) {
    if (existing.has(d.slug)) continue;
    out.push({ slug: d.slug, block: toBlock(d) });
    console.log("add", d.slug);
  }
  return out;
}

function toBlock(d) {
  const wordCount = d.body.split(/\s+/).filter(Boolean).length;
  const readMin = Math.max(5, Math.round(wordCount / 200));
  const faq = d.faq
    .map(
      (f) => `            {
                question: ${JSON.stringify(f.question)},
                answer: ${JSON.stringify(f.answer)}
            }`,
    )
    .join(",\n");
  return `{
        slug: ${JSON.stringify(d.slug)},
        title: ${JSON.stringify(d.title)},
        excerpt: ${JSON.stringify(d.excerpt)},
        date: "Jul 15, 2026",
        dateModified: "Jul 15, 2026",
        category: ${JSON.stringify(d.category)},
        author: "ToolNova Editorial Team",
        authorSlug: "editorial-team",
        authorRole: "Editorial Team",
        readTime: "${readMin} min read",
        wordCount: ${wordCount},
        metaDescription: ${JSON.stringify(d.excerpt.slice(0, 155))},
        keywords: ${JSON.stringify(d.keywords)},
        coverImage: "/og-image.png",
        imageAlt: ${JSON.stringify(d.title)},
        content: ${JSON.stringify("\n" + d.body + "\n")},
        faq: [
${faq}
        ]
    }`;
}

function getDefs() {
  return [
    {
      slug: "homework-solver-best-practices",
      title: "Homework Solver Best Practices: Learn Faster, Don’t Just Copy",
      category: "Study Tips",
      excerpt:
        "Use AI homework solvers the right way—step-by-step learning, not copy-paste. A practical workflow for students who want better grades and real understanding.",
      keywords: [
        "homework solver best practices",
        "AI homework help ethically",
        "how to use homework solver",
        "step by step homework help free",
      ],
      body: `Homework solvers are powerful when used as **tutors**, not as answer vending machines. The goal is to understand the method so you can solve the next problem alone.

> **Quick answer:** Try the problem first, then use [Homework Solver](/tools/homework-solver) for step-by-step reasoning, convert mistakes into [flashcards](/tools/flashcard-maker), and self-test with a [quiz generator](/tools/quiz-generator).

## The right way to use a homework solver

1. **Attempt for 5–10 minutes** without help
2. **Ask for steps and “why”**, not only the final answer
3. **Request a second method** when possible
4. **Close the tool and re-solve** a similar problem
5. **Capture errors** as flashcards the same day

## A study workflow that works

| Step | Action | Tool |
|------|--------|------|
| 1 | Attempt | Pen & paper |
| 2 | Guided explanation | [Homework Solver](/tools/homework-solver) |
| 3 | Memory | [Flashcard Maker](/tools/flashcard-maker) |
| 4 | Recall test | [Quiz Generator](/tools/quiz-generator) |

## Mistakes to avoid

- Copying the final answer without understanding
- Skipping unit checks in science/math
- Never practicing a similar problem
- Ignoring your school’s academic integrity policy

## Final takeaway

Use [Homework Solver](/tools/homework-solver) like a patient tutor: demand reasoning, practice retrieval, and keep integrity first.`,
      faq: [
        {
          question: "Is using an AI homework solver cheating?",
          answer:
            "Policies vary. Using it to understand steps is different from submitting AI output as your own. Follow your school rules and always show your own work when required.",
        },
        {
          question: "What is the best workflow with a homework solver?",
          answer:
            "Try first, then request step-by-step explanations, create flashcards from mistakes, and quiz yourself later for long-term retention.",
        },
      ],
    },
    {
      slug: "compress-images-for-web-speed",
      title: "Compress Images for Web Speed Without Visible Quality Loss",
      category: "PDF & Productivity",
      excerpt:
        "Large images slow pages and hurt SEO. Learn a practical compression workflow that cuts file size while keeping photos and graphics sharp.",
      keywords: [
        "compress images for web",
        "image compressor free online",
        "reduce image size without quality loss",
        "web performance images",
      ],
      body: `Large images are one of the fastest ways to wreck page speed. Compression is a high-ROI fix for Core Web Vitals, bounce rate, and SEO.

> **Quick answer:** Use [Image Compressor](/tools/image-compressor) at 60–80% quality for photos, resize oversized dimensions with [Resize Image](/tools/resize-image), and choose JPG vs PNG wisely.

## Why compression affects rankings

Slow LCP often comes from hero images. Faster pages improve engagement and competitiveness in search.

## Practical workflow

1. Keep originals archived
2. Resize to the real display size first
3. Compress with quality slider
4. Spot-check at 100% zoom
5. Deploy and re-test page speed

Tools: [Image Compressor](/tools/image-compressor) · [Resize Image](/tools/resize-image) · [JPG to PNG](/tools/jpg-to-png) · [PNG to JPG](/tools/png-to-jpg)

## Format guidance

| Content | Prefer | Why |
|---------|--------|-----|
| Photos | JPG / WebP | Smaller size |
| UI + transparency | PNG | Sharp edges, alpha |
| Screenshots of text | PNG | Avoid blurry glyphs |

## Final takeaway

Faster pages start with smaller images. Make [Image Compressor](/tools/image-compressor) part of your publish checklist.`,
      faq: [
        {
          question: "What quality setting should I use?",
          answer:
            "For most web photos, 60–80% quality is a strong starting point. Inspect critical images at full size before publishing.",
        },
        {
          question: "Should I resize before compressing?",
          answer:
            "Yes. Serving a 4000px image in a 800px slot wastes bandwidth. Resize first, then compress.",
        },
      ],
    },
    {
      slug: "summarize-long-articles-fast",
      title: "How to Summarize Long Articles Fast (Without Losing the Point)",
      category: "Writing Tips",
      excerpt:
        "A practical system to summarize research papers, news, and study readings in minutes—plus free AI tools that keep key arguments intact.",
      keywords: [
        "summarize long articles free",
        "AI text summarizer",
        "how to summarize research paper",
        "article summary tool",
      ],
      body: `You do not need to read every word to extract value—but you do need a system that preserves **claims, evidence, and conclusions**.

> **Quick answer:** Skim structure first, then use [Text Summarizer](/tools/text-summarizer) for a concise pass, and convert key points into [Notes](/tools/notes-generator) for long-term retention.

## 5-minute human skim

1. Read title, abstract/intro, headings, conclusion
2. Highlight thesis + 3 supporting points
3. Note definitions and numbers

## AI-assisted summary workflow

1. Paste clean text (remove nav junk)
2. Choose brief vs detailed summary length
3. Fact-check names, numbers, and quotes
4. Rewrite in your own words for notes

Primary tool: [Text Summarizer](/tools/text-summarizer). Related: [Chapter Summary](/tools/chapter-summary) · [Notes Generator](/tools/notes-generator)

## Final takeaway

Speed comes from structure + a good [summarizer](/tools/text-summarizer), not from skipping verification.`,
      faq: [
        {
          question: "Is an AI summary enough for research?",
          answer:
            "Use it as a first pass. For citations and exams, verify claims in the original source.",
        },
        {
          question: "What length works best?",
          answer:
            "Start with a medium summary, then expand sections that matter for your assignment or decision.",
        },
      ],
    },
    {
      slug: "grammar-checker-vs-human-editing",
      title: "Grammar Checker vs Human Editing: When to Use Each",
      category: "Writing Tips",
      excerpt:
        "AI grammar tools catch mechanical errors fast. Human editors catch meaning, audience, and voice. Learn when to use each for better writing.",
      keywords: [
        "grammar checker vs human editor",
        "when to use AI grammar checker",
        "proofreading workflow students",
        "free grammar fix online",
      ],
      body: `Grammar checkers and human editors solve different problems. The best writers use **both**.

> **Quick answer:** Run [Grammar Fix](/tools/grammar-fix) for mechanics, then do a human pass for clarity, logic, and tone. Use [Paraphraser](/tools/paraphraser) only when you need structural rewrites you still own and understand.

## What grammar checkers win at

- Spelling and punctuation
- Subject–verb agreement
- Speed on long drafts

## What humans still win at

- Argument quality
- Audience fit
- Originality of ideas
- Domain-specific style

## Recommended workflow

1. Draft freely
2. Fix mechanics with [Grammar Fix](/tools/grammar-fix)
3. Simplify dense parts with [Text Simplifier](/tools/text-simplifier)
4. Human read aloud for flow
5. Final fact check

## Final takeaway

Treat AI as a **copy editor**, not a ghostwriter—and your grades (and credibility) improve.`,
      faq: [
        {
          question: "Is a grammar checker enough before submitting?",
          answer:
            "For short emails, often yes. For essays and reports, add a human read for logic, citations, and voice.",
        },
        {
          question: "Should I accept every AI suggestion?",
          answer:
            "No. Review each change. Some suggestions can alter meaning or make tone unnatural.",
        },
      ],
    },
    {
      slug: "resume-bullets-that-get-interviews",
      title: "Resume Bullets That Get Interviews: Formula + Examples",
      category: "Career",
      excerpt:
        "Write resume bullet points that show impact, not duties. Use a proven formula and free AI tools to turn job tasks into interview-winning lines.",
      keywords: [
        "resume bullet points examples",
        "how to write resume bullets",
        "achievement resume bullets",
        "AI resume bullet generator",
      ],
      body: `Recruiters skim. Your bullets must show **impact** in under two seconds.

> **Quick answer:** Use **Action + Task + Metric + Result**. Draft faster with [Resume Bullets](/tools/resume-bullets), then tailor a [cover letter](/tools/cover-letter-writer) and [LinkedIn](/tools/linkedin-optimizer) profile.

## The impact formula

**Verb + what you did + how + measurable result**

Weak: "Responsible for social media"
Strong: "Grew Instagram engagement 42% in 6 months by launching a weekly Reel series"

## Workflow

1. List raw tasks from each role
2. Add numbers (%, $, time, volume)
3. Generate polished variants with [Resume Bullets](/tools/resume-bullets)
4. Match keywords from the job description
5. Align LinkedIn with [LinkedIn Optimizer](/tools/linkedin-optimizer)

## Final takeaway

Duties describe a job. **Results** get interviews. Start with [Resume Bullets](/tools/resume-bullets).`,
      faq: [
        {
          question: "How many bullets per role?",
          answer:
            "Typically 3–6 strong bullets for recent roles. Fewer high-impact lines beat long duty lists.",
        },
        {
          question: "What if I have no metrics?",
          answer:
            "Estimate carefully (team size, frequency, scope) or use qualitative outcomes—then quantify next time you work.",
        },
      ],
    },
    {
      slug: "ai-writing-workflow-students",
      title: "An Ethical AI Writing Workflow for Students (2026)",
      category: "Study Tips",
      excerpt:
        "A step-by-step AI writing workflow for students that improves quality without crossing academic integrity lines—outlines, edits, and checks.",
      keywords: [
        "AI writing workflow students",
        "ethical AI for essays",
        "student AI writing tools",
        "how to use AI for homework ethically",
      ],
      body: `AI can help you write better **if** you stay in control of ideas, structure, and final voice.

> **Quick answer:** Brainstorm and outline with AI, draft yourself, polish with [Grammar Fix](/tools/grammar-fix), and scan AI-like patterns with the [AI Writing Detector](/tools/plagiarism-checker). Never submit unedited AI prose as your own.

## Recommended pipeline

1. Clarify the prompt — rubric, length, citation style
2. Outline — thesis + section claims (AI optional)
3. Draft in your words
4. Mechanics — [Grammar Fix](/tools/grammar-fix)
5. Clarity — [Paraphraser](/tools/paraphraser) for awkward sentences you still understand
6. Originality pass — [AI Writing Detector](/tools/plagiarism-checker) as a coach, not a courtroom
7. Citations — verify every source

## What not to do

- Generate a full essay and submit unchanged
- Paraphrase sources without citation
- Invent references

## Final takeaway

AI is a **study assistant**. You remain the author. That is how you learn—and stay policy-safe.`,
      faq: [
        {
          question: "Can I use AI for outlines?",
          answer:
            "Often yes, if your school allows AI assistance. You should still write and own the final analysis. Check the syllabus.",
        },
        {
          question: "Is the AI Writing Detector a plagiarism database?",
          answer:
            "No. It estimates AI-like writing patterns and offers humanization tips. It is not a legal verdict or Turnitin replacement.",
        },
      ],
    },
    {
      slug: "jpg-png-pdf-workflow-guide",
      title: "JPG, PNG, and PDF: The Right Format Workflow for Students & Pros",
      category: "PDF & Productivity",
      excerpt:
        "Stop guessing formats. Learn when to use JPG, PNG, and PDF—and the free ToolNova workflow to convert, combine, and submit clean documents.",
      keywords: [
        "jpg vs png vs pdf",
        "convert images to pdf free",
        "image format workflow",
        "merge images into pdf",
      ],
      body: `Wrong formats cause blurry screenshots, huge email attachments, and rejected portal uploads. Use a simple decision tree.

> **Quick answer:** Photos → JPG · UI/transparency → PNG · multi-page documents → PDF. Convert with ToolNova, then [merge](/tools/merge-pdf) if needed.

## Decision tree

1. Need **transparency**? → PNG
2. **Photo** for web/email? → JPG (compress first)
3. Multiple pages / print / submit? → PDF

## Common workflow: assignment with photos + text

1. Compress photos ([Image Compressor](/tools/image-compressor))
2. Convert images ([Image to PDF](/tools/image-to-pdf))
3. Merge with written PDF ([Merge PDF](/tools/merge-pdf))

## Tools

- [JPG to PNG](/tools/jpg-to-png)
- [PNG to JPG](/tools/png-to-jpg)
- [Image to PDF](/tools/image-to-pdf)
- [Merge PDF](/tools/merge-pdf)

## Final takeaway

Format choice is a quality decision. Use the smallest format that preserves what matters—then package as PDF for submission.`,
      faq: [
        {
          question: "Is PNG always better quality?",
          answer:
            "PNG is lossless for graphics, but file sizes are larger. For photos, JPG is usually better for web delivery.",
        },
        {
          question: "Can I merge JPG files into one PDF?",
          answer:
            "Yes—convert with Image to PDF, then merge if you have multiple PDFs.",
        },
      ],
    },
    {
      slug: "build-exam-revision-system-30-minutes",
      title: "Build an Exam Revision System in 30 Minutes",
      category: "Study Tips",
      excerpt:
        "Create a complete exam revision system in half an hour: plan, schedule, flashcards, and self-tests using free AI study tools.",
      keywords: [
        "exam revision system",
        "how to revise for exams fast",
        "study timetable generator",
        "flashcard revision plan",
      ],
      body: `You do not need a perfect system—you need a **startable** one. Thirty minutes is enough to build a revision loop you can repeat daily.

> **Quick answer:** List topics → build a plan with [Revision Planner](/tools/revision-planner) → schedule with [Timetable Generator](/tools/timetable-generator) → make [flashcards](/tools/flashcard-maker) → self-test with [Quiz Generator](/tools/quiz-generator).

## Minute-by-minute plan

| Time | Task |
|------|------|
| 0–5 | List exam topics + weak areas |
| 5–12 | Generate a revision plan |
| 12–18 | Build a weekly timetable |
| 18–25 | Create flashcards for top 10 weak points |
| 25–30 | Generate a short quiz |

## Daily loop (after setup)

1. 25 min active recall (flashcards/quiz)
2. 10 min review mistakes
3. 5 min update weak-topic list

## Final takeaway

Systems beat motivation. Build yours once with ToolNova study tools, then execute daily.`,
      faq: [
        {
          question: "How many subjects can I plan at once?",
          answer:
            "Start with one exam date and 5–10 topics. Expand after the first weekly review.",
        },
        {
          question: "What if I only have one week left?",
          answer:
            "Prioritize weak, high-weight topics. Use quizzes daily and keep flashcards short.",
        },
      ],
    },
    {
      slug: "linkedin-headline-about-formula",
      title: "LinkedIn Headline + About Formula That Attracts Recruiters",
      category: "Career",
      excerpt:
        "Write a LinkedIn headline and About section that explains who you help, how, and with what proof—using a simple formula and free optimizer tools.",
      keywords: [
        "linkedin headline formula",
        "linkedin about section examples",
        "optimize linkedin profile free",
        "linkedin summary for students",
      ],
      body: `Your LinkedIn headline is a billboard. Your About section is the landing page.

> **Quick answer:** Headline = **Role | Niche | Proof/Outcome**. About = story + skills + proof + CTA. Draft faster with [LinkedIn Optimizer](/tools/linkedin-optimizer) and [Bio Generator](/tools/bio-generator).

## Headline formula

\`[Role] | [Who you help] | [Outcome or specialty]\`

Example: "CS Student | Building full-stack apps | Open to internships"

## About section structure

1. Hook (who you are)
2. What you do / study
3. 2–3 proof points
4. Tools/skills
5. Soft CTA (open to roles, collab, etc.)

## Workflow

1. Paste current About into [LinkedIn Optimizer](/tools/linkedin-optimizer)
2. Align bullets with [Resume Bullets](/tools/resume-bullets)
3. Keep keywords from target job posts

## Final takeaway

Clarity beats buzzwords. Optimize, then personalize—so it still sounds like you.`,
      faq: [
        {
          question: "How long should a LinkedIn About be?",
          answer:
            "Aim for 1,200–2,000 characters of scannable paragraphs or short bullets—not a wall of text.",
        },
        {
          question: "Should students put GPA in the headline?",
          answer:
            "Usually no. Put academic highlights in About or Experience/Education instead.",
        },
      ],
    },
  ];
}
