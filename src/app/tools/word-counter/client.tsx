"use client";

import { useMemo, useState } from"react";
import Link from"next/link";
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
  ClipboardPaste,
} from"lucide-react";
import { toast } from"sonner";
import { Button } from"@/components/ui/button";
import { FAQSection } from"@/components/FAQSection";
import { toolFAQs } from"@/lib/content-database";
import {
  countParagraphs,
  countSentences,
  countWords,
  graphemeLength,
} from"@/lib/text-utils";

function analyze(text: string) {
  const words = countWords(text);
  const characters = graphemeLength(text);
  const charactersNoSpaces = graphemeLength(text.replace(/\s+/g,""));
  const utf16Length = text.length;
  const sentenceCount = countSentences(text);
  const paragraphCount = countParagraphs(text);
  const lines = text.length ? text.split(/\n/).length : 0;
  const readingTime = Math.max(
    words.length ? 1 : 0,
    Math.ceil(words.length / 200),
  );
  const speakingTime = Math.max(
    words.length ? 1 : 0,
    Math.ceil(words.length / 130),
  );
  const avgWordLen =
    words.length > 0
      ? (charactersNoSpaces / words.length).toFixed(1)
      :"0";
  const safeSentences = Math.max(1, sentenceCount);
  const safeParagraphs = Math.max(1, paragraphCount);

  const stop = new Set("the a an and or but in on at to for of is are was were be been being it this that with as by from your you we they he she i".split("",
    ),
  );
  const freq = new Map<string, number>();
  for (const w of words) {
    const k = w.toLowerCase().replace(/[^a-z0-9'-]/gi,"");
    if (!k || stop.has(k) || k.length < 3) continue;
    freq.set(k, (freq.get(k) || 0) + 1);
  }
  const topWords = [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8);

  const platforms = [
    { name:"X / Twitter", limit: 280 },
    { name:"Instagram caption", limit: 2200 },
    { name:"LinkedIn post", limit: 3000 },
    { name:"Meta description", limit: 160 },
    { name:"Google title ~", limit: 60 },
  ];

  return {
    words: words.length,
    characters,
    charactersNoSpaces,
    utf16Length,
    sentenceCount,
    paragraphCount,
    lines,
    readingTime,
    speakingTime,
    avgWordLen,
    avgSentence: words.length ? (words.length / safeSentences).toFixed(1) :"0",
    avgParagraph: words.length
      ? (words.length / safeParagraphs).toFixed(1)
      :"0",
    topWords,
    platforms,
  };
}

const relatedTools = [
  { name:"Character Counter", slug:"character-counter" },
  { name:"Case Converter", slug:"case-converter" },
  { name:"Text Summarizer", slug:"text-summarizer" },
  { name:"Paraphraser", slug:"paraphraser" },
];

export default function WordCounterClient() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const stats = useMemo(() => analyze(text), [text]);

  const copyStats = async () => {
    const report =`Words: ${stats.words}
Characters (graphemes): ${stats.characters}
Characters (no spaces): ${stats.charactersNoSpaces}
UTF-16 length: ${stats.utf16Length}
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

  const paste = async () => {
    try {
      const t = await navigator.clipboard.readText();
      if (!t) {
        toast.message("Clipboard is empty");
        return;
      }
      setText(t);
      toast.success("Pasted");
    } catch {
      toast.error("Could not read clipboard — use Ctrl+V");
    }
  };

  const statCards = [
    { label:"Words", value: stats.words, icon: FileText, color:"text-primary" },
    {
      label:"Characters",
      value: stats.characters,
      icon: Hash,
      color:"text-teal-600",
    },
    {
      label:"No spaces",
      value: stats.charactersNoSpaces,
      icon: Type,
      color:"text-cyan-600",
    },
    {
      label:"Sentences",
      value: stats.sentenceCount,
      icon: Target,
      color:"text-emerald-600",
    },
    {
      label:"Paragraphs",
      value: stats.paragraphCount,
      icon: BarChart2,
      color:"text-amber-600",
    },
    {
      label:"Read time",
      value:`${stats.readingTime}m`,
      icon: Clock,
      color:"text-rose-600",
    },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-10">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/15">
          <BarChart2 className="h-3.5 w-3.5" />
          100% free · Instant · Private (browser-only)
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
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
            className="rounded-2xl border border-border bg-card p-4 text-center shadow-sm"
          >
            <s.icon className={`h-4 w-4 mx-auto mb-2 ${s.color}`} />
            <div className="text-2xl font-bold tabular-nums text-foreground font-heading">
              {s.value}
            </div>
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-lg shadow-primary/5 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-border bg-muted/40">
          <span className="text-sm font-semibold text-foreground">Your text</span>
          <div className="flex flex-wrap gap-1">
            <Button type="button" variant="ghost" size="sm" onClick={() => void paste()}>
              <ClipboardPaste className="h-4 w-4 mr-1" />
              Paste
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => void copyStats()}
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
          <div className="rounded-2xl border border-border p-6 bg-card">
            <h2 className="font-heading font-bold text-lg mb-4">Writing metrics</h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                Avg. sentence length:{""}
                <strong className="text-foreground">{stats.avgSentence} words</strong>
              </li>
              <li>
                Avg. paragraph length:{""}
                <strong className="text-foreground">{stats.avgParagraph} words</strong>
              </li>
              <li>
                Avg. word length:{""}
                <strong className="text-foreground">{stats.avgWordLen} chars</strong>
              </li>
              <li>
                Speaking time (~130 wpm):{""}
                <strong className="text-foreground">~{stats.speakingTime} min</strong>
              </li>
              <li>
                Lines: <strong className="text-foreground">{stats.lines}</strong>
              </li>
              {stats.utf16Length !== stats.characters && (
                <li className="text-xs pt-1">
                  UTF-16 length (JS .length):{""}
                  <strong className="text-foreground">{stats.utf16Length}</strong>
                  {" ·"}Characters use grapheme clusters when supported (better for emoji).
                </li>
              )}
            </ul>
          </div>

          <div className="rounded-2xl border border-border p-6 bg-card">
            <h2 className="font-heading font-bold text-lg mb-4">Platform limits</h2>
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
                            ?"text-red-600 font-semibold"
                            :"text-foreground font-medium"
                        }
                      >
                        {stats.characters}/{p.limit}
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className={`h-full rounded-full ${over ?"bg-red-500" :"bg-primary"}`}
                        style={{ width:`${pct}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          {stats.topWords.length > 0 && (
            <div className="md:col-span-2 rounded-2xl border border-border p-6 bg-card">
              <h2 className="font-heading font-bold text-lg mb-4">Frequent words</h2>
              <div className="flex flex-wrap gap-2">
                {stats.topWords.map(([w, n]) => (
                  <span
                    key={w}
                    className="px-3 py-1.5 rounded-full bg-muted text-sm font-medium"
                  >
                    {w}{""}
                    <span className="text-muted-foreground">×{n}</span>
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div>
        <h2 className="font-heading font-bold text-lg mb-3">Related tools</h2>
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
              question:"Is the word counter accurate?",
              answer:"Yes. It uses standard whitespace tokenization for words. Character counts prefer grapheme clusters (better for emoji) when your browser supports Intl.Segmenter.",
              category:"Usage",
            },
            {
              question:"Is my text stored?",
              answer:"No. Counting runs entirely in your browser. Nothing is uploaded to ToolNova servers.",
              category:"Privacy",
            },
            {
              question:"What reading speed is used?",
              answer:"About 200 words per minute for reading and 130 for speaking—common adult averages.",
              category:"Features",
            },
          ]
        }
      />
    </div>
  );
}
