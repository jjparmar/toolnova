"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Copy, Check, Trash2, Hash, ClipboardPaste } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FAQSection } from "@/components/FAQSection";
import { countWords, graphemeLength } from "@/lib/text-utils";

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
  const total = graphemeLength(text);
  const noSpaces = graphemeLength(text.replace(/\s+/g, ""));
  const words = countWords(text).length;
  const lines = text.length ? text.split("\n").length : 0;
  const utf16 = text.length;
  return { total, noSpaces, spaces: Math.max(0, total - noSpaces), words, lines, utf16 };
}

export default function CharacterCounterClient() {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const stats = useMemo(() => analyze(text), [text]);

  const copyStats = async () => {
    const msg = `Characters: ${stats.total}\nNo spaces: ${stats.noSpaces}\nWords: ${stats.words}\nLines: ${stats.lines}\nUTF-16 length: ${stats.utf16}`;
    try {
      await navigator.clipboard.writeText(msg);
      setCopied(true);
      toast.success("Stats copied");
      setTimeout(() => setCopied(false), 1500);
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

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold border border-primary/15">
          <Hash className="h-3.5 w-3.5" />
          Live character count · Free forever
        </div>
        <h1 className="font-heading text-3xl md:text-4xl font-bold tracking-tight">
          Character Counter
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Count characters with and without spaces, plus social and SEO limits.
          Updates as you type — nothing uploaded. Emoji-friendly when supported.
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
            className="rounded-2xl border border-border bg-card p-4 text-center"
          >
            <div className="font-heading text-2xl font-bold tabular-nums">{s.value}</div>
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground font-semibold mt-1">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-border bg-card shadow-lg shadow-primary/5 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-border bg-muted/40">
          <span className="text-sm font-semibold">Your text</span>
          <div className="flex gap-1">
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

      <div className="rounded-2xl border border-border bg-card p-6">
        <h2 className="font-heading font-bold text-lg mb-4">Platform limits</h2>
        <ul className="space-y-3">
          {PLATFORMS.map((p) => {
            const over = stats.total > p.limit;
            const remaining = p.limit - stats.total;
            const pct = Math.min(100, Math.round((stats.total / p.limit) * 100));
            return (
              <li key={p.name}>
                <div className="flex justify-between text-sm mb-1 gap-2">
                  <span className="text-muted-foreground">{p.name}</span>
                  <span
                    className={
                      over
                        ? "text-red-600 font-semibold shrink-0"
                        : "font-medium shrink-0"
                    }
                  >
                    {stats.total}/{p.limit}
                    {!over && remaining <= 40 && remaining >= 0 && (
                      <span className="text-muted-foreground font-normal ml-1">
                        ({remaining} left)
                      </span>
                    )}
                    {over && (
                      <span className="ml-1">
                        (+{stats.total - p.limit})
                      </span>
                    )}
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full rounded-full ${over ? "bg-red-500" : pct > 90 ? "bg-amber-500" : "bg-primary"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        <p className="text-xs text-muted-foreground mt-4">
          Counts use grapheme clusters when available (better for emoji). Platforms
          may still count links or emoji differently — always preview before posting.
        </p>
      </div>

      <div className="text-sm">
        <h2 className="font-heading font-bold mb-2">Related tools</h2>
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
          {
            question: "How are emoji counted?",
            answer:
              "When your browser supports Intl.Segmenter, each emoji/grapheme cluster counts as 1 character. Otherwise we fall back to Unicode code points.",
            category: "Features",
          },
        ]}
      />
    </div>
  );
}
