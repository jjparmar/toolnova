/**
 * Maps tool slugs → related blog guide links for internal linking / SEO.
 * Keep destinations as real published slugs only.
 */
export type RelatedGuide = { href: string; label: string };

const DEFAULT_GUIDES: RelatedGuide[] = [
  { href: "/blog", label: "All blog guides" },
];

const BY_TOOL: Record<string, RelatedGuide[]> = {
  "homework-solver": [
    { href: "/blog/lecture-notes-to-exam-ready-flashcards-quiz", label: "Lecture notes to exam-ready workflow" },
    { href: "/blog/homework-solver-best-practices", label: "Homework solver best practices" },
    { href: "/blog/build-exam-revision-system-30-minutes", label: "30-minute exam revision system" },
    { href: "/blog/ai-writing-workflow-students", label: "Ethical AI writing for students" },
  ],
  "flashcard-maker": [
    { href: "/blog/lecture-notes-to-exam-ready-flashcards-quiz", label: "Notes → flashcards → quiz" },
    { href: "/blog/flashcards-vs-notes-for-retention", label: "Flashcards vs notes for retention" },
    { href: "/blog/build-exam-revision-system-30-minutes", label: "Exam revision system" },
    { href: "/blog/how-ai-flashcards-double-retention", label: "AI flashcards for retention" },
  ],
  "quiz-generator": [
    { href: "/blog/lecture-notes-to-exam-ready-flashcards-quiz", label: "Notes → flashcards → quiz" },
    { href: "/blog/build-exam-revision-system-30-minutes", label: "Exam revision system" },
    { href: "/blog/homework-solver-best-practices", label: "Homework solver best practices" },
  ],
  "mcq-generator": [
    { href: "/blog/lecture-notes-to-exam-ready-flashcards-quiz", label: "Notes → flashcards → quiz" },
    { href: "/blog/build-exam-revision-system-30-minutes", label: "Exam revision system" },
  ],
  "grammar-fix": [
    { href: "/blog/essay-polish-workflow-grammar-paraphrase-summarize", label: "Essay polish workflow" },
    { href: "/blog/grammar-checker-vs-human-editing", label: "Grammar checker vs human editing" },
    { href: "/blog/free-grammar-checker-tools-students-2026", label: "Best free grammar checkers 2026" },
    { href: "/blog/ai-writing-workflow-students", label: "Ethical AI writing workflow" },
  ],
  paraphraser: [
    { href: "/blog/essay-polish-workflow-grammar-paraphrase-summarize", label: "Essay polish workflow" },
    { href: "/blog/paraphrasing-vs-rewriting-for-assignments", label: "Paraphrasing vs rewriting" },
    { href: "/blog/paraphrasing-tools-guide-2026", label: "Paraphrasing tools guide" },
    { href: "/blog/ai-writing-workflow-students", label: "Ethical AI writing workflow" },
  ],
  "text-summarizer": [
    { href: "/blog/essay-polish-workflow-grammar-paraphrase-summarize", label: "Essay polish workflow" },
    { href: "/blog/summarize-long-articles-fast", label: "Summarize long articles fast" },
    { href: "/blog/how-to-summarize-long-documents-ai", label: "Summarize long documents with AI" },
  ],
  "chapter-summary": [
    { href: "/blog/summarize-long-articles-fast", label: "Summarize long articles fast" },
  ],
  "notes-generator": [
    { href: "/blog/lecture-notes-to-exam-ready-flashcards-quiz", label: "Notes → flashcards → quiz" },
    { href: "/blog/flashcards-vs-notes-for-retention", label: "Flashcards vs notes" },
    { href: "/blog/summarize-long-articles-fast", label: "Summarize long articles" },
  ],
  "essay-writer": [
    { href: "/blog/essay-polish-workflow-grammar-paraphrase-summarize", label: "Essay polish workflow" },
    { href: "/blog/ai-writing-workflow-students", label: "Ethical AI writing for students" },
    { href: "/blog/grammar-checker-vs-human-editing", label: "Grammar vs human editing" },
  ],
  "resume-bullets": [
    { href: "/blog/job-application-kit-resume-bullets-cover-letter", label: "Job application kit" },
    { href: "/blog/resume-bullets-that-get-interviews", label: "Resume bullets that get interviews" },
    { href: "/blog/linkedin-headline-about-formula", label: "LinkedIn headline + About formula" },
  ],
  "linkedin-optimizer": [
    { href: "/blog/job-application-kit-resume-bullets-cover-letter", label: "Job application kit" },
    { href: "/blog/linkedin-headline-about-formula", label: "LinkedIn headline + About formula" },
    { href: "/blog/resume-bullets-that-get-interviews", label: "Resume bullets that get interviews" },
  ],
  "cover-letter-writer": [
    { href: "/blog/job-application-kit-resume-bullets-cover-letter", label: "Job application kit" },
    { href: "/blog/resume-bullets-that-get-interviews", label: "Resume bullets that get interviews" },
  ],
  "image-compressor": [
    { href: "/blog/student-pdf-submission-workflow-portal-limits", label: "Student PDF submission workflow" },
    { href: "/blog/compress-images-for-web-speed", label: "Compress images for web speed" },
    { href: "/blog/how-to-compress-a-pdf-to-1mb-online", label: "Compress a PDF to 1MB" },
    { href: "/blog/jpg-png-pdf-workflow-guide", label: "JPG / PNG / PDF workflow" },
  ],
  "resize-image": [
    { href: "/blog/compress-images-for-web-speed", label: "Compress images for web speed" },
    { href: "/blog/jpg-png-pdf-workflow-guide", label: "JPG / PNG / PDF workflow" },
  ],
  "image-to-pdf": [
    { href: "/blog/student-pdf-submission-workflow-portal-limits", label: "Student PDF submission workflow" },
    { href: "/blog/jpg-png-pdf-workflow-guide", label: "JPG / PNG / PDF workflow" },
    { href: "/blog/how-to-compress-a-pdf-to-1mb-online", label: "Compress a PDF to 1MB" },
  ],
  "merge-pdf": [
    { href: "/blog/student-pdf-submission-workflow-portal-limits", label: "Student PDF submission workflow" },
    { href: "/blog/how-to-merge-pdf-files-online-free-guide", label: "Merge PDF free guide" },
    { href: "/blog/merge-pdf-without-losing-formatting", label: "Merge without losing formatting" },
    { href: "/blog/how-to-compress-a-pdf-to-1mb-online", label: "Compress a PDF to 1MB" },
  ],
  "compress-pdf": [
    { href: "/blog/student-pdf-submission-workflow-portal-limits", label: "Student PDF submission workflow" },
    { href: "/blog/how-to-compress-a-pdf-to-1mb-online", label: "How to compress a PDF to 1MB" },
    { href: "/blog/free-online-pdf-tools-ultimate-guide", label: "Free online PDF tools guide" },
    { href: "/blog/compress-images-for-web-speed", label: "Compress images for web speed" },
  ],
  "split-pdf": [
    { href: "/blog/student-pdf-submission-workflow-portal-limits", label: "Student PDF submission workflow" },
    { href: "/blog/how-to-compress-a-pdf-to-1mb-online", label: "Compress a PDF to 1MB" },
    { href: "/blog/free-online-pdf-tools-ultimate-guide", label: "Free online PDF tools guide" },
  ],
  "jpg-to-png": [
    { href: "/blog/jpg-png-pdf-workflow-guide", label: "JPG / PNG / PDF workflow" },
  ],
  "png-to-jpg": [
    { href: "/blog/jpg-png-pdf-workflow-guide", label: "JPG / PNG / PDF workflow" },
  ],
  "revision-planner": [
    { href: "/blog/build-exam-revision-system-30-minutes", label: "30-minute exam revision system" },
  ],
  "timetable-generator": [
    { href: "/blog/build-exam-revision-system-30-minutes", label: "30-minute exam revision system" },
  ],
  "plagiarism-checker": [
    { href: "/blog/ai-writing-workflow-students", label: "Ethical AI writing workflow" },
    { href: "/blog/grammar-checker-vs-human-editing", label: "Grammar vs human editing" },
  ],
  "text-simplifier": [
    { href: "/blog/summarize-long-articles-fast", label: "Summarize long articles" },
    { href: "/blog/ai-writing-workflow-students", label: "Ethical AI writing workflow" },
  ],
};

export function getRelatedGuidesForTool(toolSlug: string): RelatedGuide[] {
  const specific = BY_TOOL[toolSlug] || [];
  const seen = new Set(specific.map((g) => g.href));
  const extras = DEFAULT_GUIDES.filter((g) => !seen.has(g.href));
  return [...specific, ...extras];
}
