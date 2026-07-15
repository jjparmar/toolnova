"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  FileText,
  Hash,
  Clock,
  BarChart2,
  Type,
  Target,
  Copy,
  Check,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FAQSection } from "@/components/FAQSection";
import { toolFAQs } from "@/lib/content-database";

function analyze(text: string) {
  const trimmed = text.trim();
  const words = trimmed
    ? trimmed.split(/\s+/).filter((w) => w.length > 0)
    : [];
  const characters = text.length;
  const charactersNoSpaces = text.replace(/\s+/g, "").length;
  const sentenceCount = trimmed
    ? trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0).length
    : 0;
  const paragraphCount = trimmed
    ? trimmed.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length
    : 0;
  const lines = text.length ? text.split(/\n/).length : 0;
  const readingTime = Math.max(words.length ? 1 : 0, Math.ceil(words.length / 200));
  const speakingTime = Math.max(words.length ? 1 : 0, Math.ceil(words.length / 130));
  const avgWordLen =
    words.length > 0
      ? (charactersNoSpaces / words.length).toFixed(1)
      : "0";
  const safeSentences = Math.max(1, sentenceCount);
  const safeParagraphs = Math.max(1, paragraphCount);

  // Top words (simple frequency, stopwords stripped)
  const stop = new Set(
    "the a an and or but in on at to for of is are was were be been being it this that with as by from your you we they he she i".split(
      " ",
    ),
  );
  const freq = new Map<string, number>();
  for (const w of words) {
    const k = w.toLowerCase().replace(/[^a-z0-9'-]/gi, "");
    if (!k || stop.has(k) || k.length < 3) continue;
    freq.set(k, (freq.get(k) || 0) + 1);
  }
  const topWords = [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  // Platform limits
  const platforms = [
    { name: "X / Twitter", limit: 280 },
    { name: "Instagram caption", limit: 2200 },
    { name: "LinkedIn post", limit: 3000 },
    { name: "Meta description", limit: 160 },
    { name: "Google title ~", limit: 60 },
  ];

  return {
    words: words.length,
    characters,
    charactersNoSpaces,
    sentenceCount,
    paragraphCount,
    lines,
    readingTime,
    speakingTime,
    avgWordLen,
    avgSentence: words.length ? (words.length / safeSentences).toFixed(1) : "0",
    avgParagraph: words.length
      ? (words.length / safeParagraphs).toFixed(1)
      : "0",
    topWords,
    platforms,
  };
}

const relatedTools = [
  { name: "Character Counter", slug: "character-counter" },
  { name: "Case Converter", slug: "case-converter" },
  { name: "Text Summarizer", slug: "text-summarizer" },
  { name: "Paraphraser", slug: "paraphraser" },
];

export default function WordCounterClient() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const stats = useMemo(() => analyze(text), [text]);

  const copyStats = async () => {
    const report = `Words: ${stats.words}
Characters: ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
Sentences: ${stats.sentenceCount}
Paragraphs: ${stats.paragraphCount}
Lines: ${stats.lines}
Reading time: ~${stats.readingTime} min
Speaking time: ~${stats.speakingTime} min`;
    try {
      await navigator.clipboard.writeText(report);
      setCopied(true);
      toast.success("Stats copied");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy");
    }
  };

  const statCards = [
    { label: "Words", value: stats.words, icon: FileText, color: "text-blue-600" },
    {
      label: "Characters",
      value: stats.characters,
      icon: Hash,
      color: "text-indigo-600",
    },
    {
      label: "No spaces",
      value: stats.charactersNoSpaces,
      icon: Type,
      color: "text-violet-600",
    },
    {
      label: "Sentences",
      value: stats.sentenceCount,
      icon: Target,
      color: "text-emerald-600",
    },
    {
      label: "Paragraphs",
      value: stats.paragraphCount,
      icon: BarChart2,
      color: "text-orange-600",
    },
    {
      label: "Read time",
      value: `${stats.readingTime}m`,
      icon: Clock,
      color: "text-rose-600",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <BarChart2 className="h-3.5 w-3.5" />
          100% free · Instant · Private (browser-only)
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
          Word Counter
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Live word count, character count, reading time, and writing metrics.
          No sign-up. Nothing is uploaded.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {statCards.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center shadow-sm"
          >
            <s.icon className={`h-4 w-4 mx-auto mb-2 ${s.color}`} />
            <div className="text-2xl font-black tabular-nums text-foreground">
              {s.value}
            </div>
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50">
          <span className="text-sm font-semibold text-foreground">
            Your text
          </span>
          <div className="flex gap-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={copyStats}
              disabled={!text}
            >
              {copied ? (
                <Check className="h-4 w-4 mr-1" />
              ) : (
                <Copy className="h-4 w-4 mr-1" />
              )}
              Copy stats
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setText("")}
              disabled={!text}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your essay, caption, blog post, or script… stats update as you type."
          className="w-full min-h-[280px] md:min-h-[360px] p-5 md:p-6 text-base leading-relaxed bg-transparent outline-none resize-y text-foreground placeholder:text-muted-foreground/60"
          aria-label="Text to count"
        />
      </div>

      {text.trim() && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900">
            <h2 className="font-bold text-lg mb-4">Writing metrics</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                Avg. sentence length:{" "}
                <strong className="text-foreground">
                  {stats.avgSentence} words
                </strong>
              </li>
              <li>
                Avg. paragraph length:{" "}
                <strong className="text-foreground">
                  {stats.avgParagraph} words
                </strong>
              </li>
              <li>
                Avg. word length:{" "}
                <strong className="text-foreground">
                  {stats.avgWordLen} chars
                </strong>
              </li>
              <li>
                Speaking time (~130 wpm):{" "}
                <strong className="text-foreground">
                  ~{stats.speakingTime} min
                </strong>
              </li>
              <li>
                Lines:{" "}
                <strong className="text-foreground">{stats.lines}</strong>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900">
            <h2 className="font-bold text-lg mb-4">Platform limits</h2>
            <ul className="space-y-3">
              {stats.platforms.map((p) => {
                const over = stats.characters > p.limit;
                const pct = Math.min(
                  100,
                  Math.round((stats.characters / p.limit) * 100),
                );
                return (
                  <li key={p.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{p.name}</span>
                      <span
                        className={
                          over
                            ? "text-red-600 font-semibold"
                            : "text-foreground font-medium"
                        }
                      >
                        {stats.characters}/{p.limit}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${over ? "bg-red-500" : "bg-primary"}`}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {stats.topWords.length > 0 && (
            <div className="md:col-span-2 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 bg-white dark:bg-slate-900">
              <h2 className="font-bold text-lg mb-4">Frequent words</h2>
              <div className="flex flex-wrap gap-2">
                {stats.topWords.map(([w, n]) => (
                  <span
                    key={w}
                    className="px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-medium"
                  >
                    {w}{" "}
                    <span className="text-muted-foreground">×{n}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div>
        <h2 className="font-bold text-lg mb-3">Related tools</h2>
        <div className="flex flex-wrap gap-3 text-sm">
          {relatedTools.map((t) => (
            <Link
              key={t.slug}
              href={`/tools/${t.slug}`}
              className="underline underline-offset-4 hover:text-primary"
            >
              {t.name}
            </Link>
          ))}
        </div>
      </div>

      <FAQSection
        faqs={
          toolFAQs["word-counter"] || [
            {
              question: "Is the word counter accurate?",
              answer:
                "Yes. It uses standard whitespace tokenization for words and common sentence punctuation for sentence counts. Results update live as you type.",
              category: "Usage",
            },
            {
              question: "Is my text stored?",
              answer:
                "No. Counting runs entirely in your browser. Nothing is uploaded to ToolNova servers.",
              category: "Privacy",
            },
            {
              question: "What reading speed is used?",
              answer:
                "About 200 words per minute for reading and 130 for speaking—common adult averages.",
              category: "Features",
            },
          ]
        }
      />
    </div>
  );
}
