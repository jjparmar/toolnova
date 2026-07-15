"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Copy, Check, Trash2, Type } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FAQSection } from "@/components/FAQSection";

function convertAll(input: string) {
  const uppercase = input.toUpperCase();
  const lowercase = input.toLowerCase();
  const titleCase = input
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
  const sentenceCase = input
    .toLowerCase()
    .replace(/(^\w|\.\s+\w)/g, (char) => char.toUpperCase());
  const camelCase = input
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[A-Z]/, (char) => char.toLowerCase());
  const pascalCase = input
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[a-z]/, (char) => char.toUpperCase());
  const snakeCase = input
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  const kebabCase = input
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const constantCase = snakeCase.toUpperCase();
  const alternatingCase = input
    .split("")
    .map((char, i) => (i % 2 === 0 ? char.toLowerCase() : char.toUpperCase()))
    .join("");
  const inverseCase = input
    .split("")
    .map((char) =>
      char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase(),
    )
    .join("");

  return [
    { id: "upper", label: "UPPERCASE", value: uppercase },
    { id: "lower", label: "lowercase", value: lowercase },
    { id: "title", label: "Title Case", value: titleCase },
    { id: "sentence", label: "Sentence case", value: sentenceCase },
    { id: "camel", label: "camelCase", value: camelCase },
    { id: "pascal", label: "PascalCase", value: pascalCase },
    { id: "snake", label: "snake_case", value: snakeCase },
    { id: "kebab", label: "kebab-case", value: kebabCase },
    { id: "constant", label: "CONSTANT_CASE", value: constantCase },
    { id: "alt", label: "aLtErNaTiNg", value: alternatingCase },
    { id: "inverse", label: "iNVERSE cASE", value: inverseCase },
  ];
}

export default function CaseConverterClient() {
  const [text, setText] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const results = useMemo(() => (text ? convertAll(text) : []), [text]);

  const copy = async (id: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(id);
      toast.success("Copied");
      setTimeout(() => setCopiedId(null), 1500);
    } catch {
      toast.error("Could not copy");
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 text-xs font-semibold">
          <Type className="h-3.5 w-3.5" />
          Free · Instant · 100% browser-side
        </div>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight">
          Case Converter
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Convert text to UPPERCASE, Title Case, camelCase, snake_case, kebab-case,
          and more — live as you type. No sign-up.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-800/50">
          <span className="text-sm font-semibold">Your text</span>
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
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste any text… all cases update instantly."
          className="w-full min-h-[160px] p-5 text-base leading-relaxed bg-transparent outline-none resize-y"
          aria-label="Text to convert"
        />
      </div>

      {results.length > 0 && (
        <div className="grid sm:grid-cols-2 gap-4">
          {results.map((r) => (
            <div
              key={r.id}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 flex flex-col gap-2"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                  {r.label}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => copy(r.id, r.value)}
                  className="h-8"
                >
                  {copiedId === r.id ? (
                    <Check className="h-3.5 w-3.5" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </Button>
              </div>
              <p className="text-sm font-medium break-words whitespace-pre-wrap text-foreground min-h-[2.5rem]">
                {r.value || "—"}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="text-sm">
        <h2 className="font-bold mb-2">Related tools</h2>
        <div className="flex flex-wrap gap-3 text-muted-foreground">
          <Link href="/tools/word-counter" className="underline underline-offset-4 hover:text-primary">
            Word Counter
          </Link>
          <Link href="/tools/character-counter" className="underline underline-offset-4 hover:text-primary">
            Character Counter
          </Link>
          <Link href="/tools/text-simplifier" className="underline underline-offset-4 hover:text-primary">
            Text Simplifier
          </Link>
        </div>
      </div>

      <FAQSection
        faqs={[
          {
            question: "Does case conversion upload my text?",
            answer:
              "No. Conversion runs entirely in your browser. Nothing is sent to ToolNova servers.",
            category: "Privacy",
          },
          {
            question: "Which case should I use for code?",
            answer:
              "JavaScript often uses camelCase for variables and PascalCase for components. Python prefers snake_case. URLs and CSS often use kebab-case.",
            category: "Usage",
          },
          {
            question: "Is Title Case perfect for every language?",
            answer:
              "Title Case rules vary by style guide and language. Review output for small words (a, of, the) if you follow a strict house style.",
            category: "Usage",
          },
        ]}
      />
    </div>
  );
}
