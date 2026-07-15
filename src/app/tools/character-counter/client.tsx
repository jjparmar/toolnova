"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Copy, Check, Trash2, Hash } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FAQSection } from "@/components/FAQSection";

const PLATFORMS = [
  { name: "X / Twitter post", limit: 280 },
  { name: "Instagram caption", limit: 2200 },
  { name: "LinkedIn post", limit: 3000 },
  { name: "TikTok caption", limit: 2200 },
  { name: "Meta description", limit: 160 },
  { name: "SEO title (approx)", limit: 60 },
  { name: "SMS segment", limit: 160 },
] as const;

function analyze(text: string) {
  const total = text.length;
  const noSpaces = text.replace(/\s+/g, "").length;
  const words = text.trim()
    ? text.trim().split(/\s+/).filter(Boolean).length
    : 0;
  const lines = text.length ? text.split("\n").length : 0;
  return { total, noSpaces, spaces: total - noSpaces, words, lines };
}

export default function CharacterCounterClient() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const stats = useMemo(() => analyze(text), [text]);

  const copyStats = async () => {
    const msg = `Characters: ${stats.total}\nNo spaces: ${stats.noSpaces}\nWords: ${stats.words}\nLines: ${stats.lines}`;
    try {
      await navigator.clipboard.writeText(msg);
      setCopied(true);
      toast.success("Stats copied");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-xs font-semibold">
          <Hash className="h-3.5 w-3.5" />
          Live character count · Free forever
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
          Character Counter
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Count characters with and without spaces, plus social and SEO limits.
          Updates as you type — nothing uploaded.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Characters", value: stats.total },
          { label: "No spaces", value: stats.noSpaces },
          { label: "Words", value: stats.words },
          { label: "Lines", value: stats.lines },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 text-center"
          >
            <div className="text-2xl font-black tabular-nums">{s.value}</div>
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50">
          <span className="text-sm font-semibold">Your text</span>
          <div className="flex gap-2">
            <Button type="button" variant="ghost" size="sm" onClick={copyStats} disabled={!text}>
              {copied ? <Check className="h-4 w-4 mr-1" /> : <Copy className="h-4 w-4 mr-1" />}
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
          placeholder="Paste a caption, bio, meta description, or tweet…"
          className="w-full min-h-[240px] p-5 text-base leading-relaxed bg-transparent outline-none resize-y"
          aria-label="Text for character count"
        />
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
        <h2 className="font-bold text-lg mb-4">Platform limits</h2>
        <ul className="space-y-3">
          {PLATFORMS.map((p) => {
            const over = stats.total > p.limit;
            const pct = Math.min(100, Math.round((stats.total / p.limit) * 100));
            return (
              <li key={p.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">{p.name}</span>
                  <span className={over ? "text-red-600 font-semibold" : "font-medium"}>
                    {stats.total}/{p.limit}
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

      <div className="text-sm">
        <h2 className="font-bold mb-2">Related tools</h2>
        <div className="flex flex-wrap gap-3 text-muted-foreground">
          <Link href="/tools/word-counter" className="underline underline-offset-4 hover:text-primary">
            Word Counter
          </Link>
          <Link href="/tools/case-converter" className="underline underline-offset-4 hover:text-primary">
            Case Converter
          </Link>
          <Link href="/tools/caption-generator" className="underline underline-offset-4 hover:text-primary">
            Caption Generator
          </Link>
        </div>
      </div>

      <FAQSection
        faqs={[
          {
            question: "Are social limits exact?",
            answer:
              "Limits are common published caps. Some platforms count emoji or links differently. Always preview in the app before posting.",
            category: "Usage",
          },
          {
            question: "Is text stored?",
            answer:
              "No. Counting runs in your browser only. Refreshing the page clears the text.",
            category: "Privacy",
          },
        ]}
      />
    </div>
  );
}
