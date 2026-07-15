import { Metadata } from "next";
import Link from "next/link";
import { ToolsClient } from "./client";
import { siteConfig } from "@/config/site";
import { TOOL_COUNT } from "@/data/tools";

export const metadata: Metadata = {
  title: `All Free AI Tools - ${TOOL_COUNT}+ Writing, Study, PDF & Career Tools | ToolNova`,
  description: `Explore ${TOOL_COUNT}+ free AI-powered tools for study, writing, exam prep, image editing, PDF management, and career development. No sign-up required.`,
  keywords: [
    "free AI tools",
    "online tools",
    "study tools",
    "writing tools",
    "PDF tools",
    "career tools",
    "AI productivity",
    "ToolNova",
    "free online tools 2026",
    "AI tools for students",
    "best free AI tools",
  ],
  alternates: {
    canonical: "https://www.toolnovahub.com/tools",
  },
  openGraph: {
    title: `All Free AI Tools - ${TOOL_COUNT}+ Writing, Study, PDF & Career Tools | ToolNova`,
    description: `Explore ${TOOL_COUNT}+ free AI-powered tools for study, writing, exam prep, image editing, PDF management, and career development.`,
    url: "https://www.toolnovahub.com/tools",
    type: "website",
    images: [
      {
        url: "https://www.toolnovahub.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "ToolNova - All Free AI Tools",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `All Free AI Tools - ${TOOL_COUNT}+ Tools | ToolNova`,
    description: `Explore ${TOOL_COUNT}+ free AI-powered tools. No sign-up required.`,
    images: ["https://www.toolnovahub.com/og-image.png"],
    creator: "@toolnovahub",
  },
};

// Tools catalog ItemList schema — helps AI search engines understand the full tool catalog
function generateToolsPageSchema() {
  const base = siteConfig.url;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${base}/tools#page`,
        name: "Free AI Tools Catalog",
        description: `${TOOL_COUNT}+ free AI-powered tools for students, professionals, and educators. No sign-up required.`,
        url: `${base}/tools`,
        inLanguage: "en-US",
        isPartOf: { "@id": `${base}/#website` },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: base },
            { "@type": "ListItem", position: 2, name: "All Tools", item: `${base}/tools` },
          ],
        },
      },
      {
        "@type": "ItemList",
        name: "All ToolNova Free AI Tools by Category",
        description: `Complete catalog of ${TOOL_COUNT}+ free AI tools organized by category.`,
        url: `${base}/tools`,
        numberOfItems: TOOL_COUNT,
        itemListElement: [
          {
            "@type": "ListItem", position: 1,
            name: "Writing Tools",
            description: "AI writing tools for essays, emails, paraphrasing, grammar, and more",
            url: `${base}/tools/writing-tools`,
            item: { "@type": "ItemList", name: "Writing Tools",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Essay Writer", url: `${base}/tools/essay-writer` },
                { "@type": "ListItem", position: 2, name: "Paraphraser", url: `${base}/tools/paraphraser` },
                { "@type": "ListItem", position: 3, name: "Grammar Fix", url: `${base}/tools/grammar-fix` },
                { "@type": "ListItem", position: 4, name: "Text Summarizer", url: `${base}/tools/text-summarizer` },
                { "@type": "ListItem", position: 5, name: "Email Writer", url: `${base}/tools/email-writer` },
              ]
            },
          },
          {
            "@type": "ListItem", position: 2,
            name: "Study Tools",
            description: "AI study aids: homework solver, flashcard maker, quiz generator, and notes generator",
            url: `${base}/tools/study-tools`,
            item: { "@type": "ItemList", name: "Study Tools",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Homework Solver", url: `${base}/tools/homework-solver` },
                { "@type": "ListItem", position: 2, name: "Flashcard Maker", url: `${base}/tools/flashcard-maker` },
                { "@type": "ListItem", position: 3, name: "Quiz Generator", url: `${base}/tools/quiz-generator` },
                { "@type": "ListItem", position: 4, name: "Notes Generator", url: `${base}/tools/notes-generator` },
              ]
            },
          },
          {
            "@type": "ListItem", position: 3,
            name: "PDF & Image Tools",
            description: "Merge PDFs, split PDFs, resize images, compress images and convert formats online for free",
            url: `${base}/tools/image-pdf-tools`,
            item: { "@type": "ItemList", name: "PDF & Image Tools",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Merge PDF", url: `${base}/tools/merge-pdf` },
                { "@type": "ListItem", position: 2, name: "Split PDF", url: `${base}/tools/split-pdf` },
                { "@type": "ListItem", position: 3, name: "Image Compressor", url: `${base}/tools/image-compressor` },
                { "@type": "ListItem", position: 4, name: "Resize Image", url: `${base}/tools/resize-image` },
              ]
            },
          },
          {
            "@type": "ListItem", position: 4,
            name: "Career Tools",
            description: "Resume bullets, cover letter writer, interview prep, and LinkedIn optimizer",
            url: `${base}/tools/career-tools`,
            item: { "@type": "ItemList", name: "Career Tools",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Resume Bullets", url: `${base}/tools/resume-bullets` },
                { "@type": "ListItem", position: 2, name: "Cover Letter Writer", url: `${base}/tools/cover-letter-writer` },
                { "@type": "ListItem", position: 3, name: "Interview Generator", url: `${base}/tools/interview-generator` },
              ]
            },
          },
        ],
      },
    ],
  };
}

export default function ToolsPage() {
  const toolsSchema = generateToolsPageSchema();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsSchema) }}
      />
      <ToolsClient />

      <section className="mx-auto max-w-[1200px] px-6 mt-12 not-prose">
        <h2 className="text-xl font-bold mb-4">Browse by category</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
          {[
            { href: "/tools/writing-tools", label: "Writing tools", desc: "Essay, grammar, paraphrase, summarize" },
            { href: "/tools/study-tools", label: "Study tools", desc: "Homework, flashcards, quizzes, notes" },
            { href: "/tools/exam-prep-tools", label: "Exam prep", desc: "Vocabulary, synonyms, idioms" },
            { href: "/tools/image-pdf-tools", label: "Image & PDF", desc: "Merge, split, compress, convert" },
            { href: "/tools/career-tools", label: "Career tools", desc: "Resume, LinkedIn, cover letter, interview" },
            { href: "/tools/utility-tools", label: "Utility tools", desc: "Word count, case convert, age calc" },
          ].map((c) => (
            <Link
              key={c.href}
              href={c.href}
              className="rounded-xl border border-slate-200 dark:border-slate-800 p-4 hover:border-primary/40 hover:bg-primary/5 transition-colors"
            >
              <div className="font-semibold text-foreground">{c.label}</div>
              <div className="text-muted-foreground mt-1">{c.desc}</div>
            </Link>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-4">
          Popular guides:{" "}
          <Link href="/blog/merge-pdf-without-losing-formatting" className="underline underline-offset-4 hover:text-primary">Merge PDF guide</Link>
          {" · "}
          <Link href="/blog/homework-solver-best-practices" className="underline underline-offset-4 hover:text-primary">Homework best practices</Link>
          {" · "}
          <Link href="/blog/resume-bullets-that-get-interviews" className="underline underline-offset-4 hover:text-primary">Resume bullets</Link>
          {" · "}
          <Link href="/advertising" className="underline underline-offset-4 hover:text-primary">How we stay free</Link>
        </p>
      </section>
      
      {/* Rich Editorial Content to satisfy Google AdSense High-Quality / Thin Content policies */}
      <section className="mt-20 border-t border-slate-200/60 dark:border-slate-800/60 pt-16 pb-24 max-w-4xl mx-auto prose prose-slate dark:prose-invert prose-lg">
        <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mb-6">
          The Role of AI-Powered Micro-Utilities in Modern Workflows
        </h2>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          In an era characterized by rapid digital acceleration, professionals, students, and content creators are continuously challenged to optimize their daily cognitive outputs. Standard workflows are often fragmented across multiple heavy desktop installations and paid platforms. ToolNova was engineered to eliminate this friction by providing a unified, high-performance library of specialized micro-applications. Accessible directly from any modern web browser without signup or subscription requirements, our utilities cover the full spectrum of writing support, document manipulation, image compression, study planning, and career optimization.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Accelerating Academic and Educational Excellence
        </h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          For students navigating rigorous academic syllabi, cognitive fatigue is a major bottleneck. Our **Study Tools** and **Exam Prep** suites leverage advanced machine learning models to act as personal, context-aware tutors. Whether you are using the Homework Solver to understand step-by-step mathematical proofs, generating active-recall study decks with the Flashcard Maker, or translating dense research materials into simplified outlines, ToolNova acts as an intellectual multiplier. These tools are designed to facilitate active learning and spaced repetition, helping students retain complex information more efficiently.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Optimizing Creative and Professional Writing
        </h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          Writing is a multi-stage process involving ideation, structural layout, syntactic drafting, and meticulous editing. Attempting to execute all of these stages simultaneously is a primary cause of writer's block. ToolNova's **Writing Tools** help writers separate these stages. You can brainstorm story structures, generate focused paragraphs, rewrite awkward phrasing using our contextual Paraphraser, and check final drafts with the AI Grammar Fix. By offloading mechanical syntactic edits to AI, creators can dedicate their full attention to the human elements of their work: voice, logic, and emotional resonance.
        </p>

        <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
          Secure, Local, and Privacy-Centric Document Processing
        </h3>
        <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          Document security is a major concern when using online tools. ToolNova enforces a strict privacy policy. Unlike traditional online converters that upload your files to remote third-party databases, our **PDF & Image Tools** run locally in your browser when possible. For tools that require server-side computation, files are encrypted in transit and permanently deleted from our zero-retention servers immediately after processing. We do not store, analyze, or train models on your private documents.
        </p>

        <p className="text-slate-500 dark:text-slate-400 text-sm mt-8 border-t border-slate-100 dark:border-slate-800/80 pt-6">
          ToolNova is continuously updated to integrate the latest improvements in web technology and machine learning. Explore our catalog above and build your custom, optimized daily workflow.
        </p>
      </section>
    </>
  );
}

