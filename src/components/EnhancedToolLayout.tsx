"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  Copy,
  Download,
  Sparkles,
  Loader2,
  CheckCircle2,
  History,
  Trash2,
  RefreshCw,
  Bookmark,
  Share2,
  ThumbsUp,
  ThumbsDown,
  FileText,
  Settings,
  Wand2,
  ArrowLeft,
  AlertCircle,
  Keyboard,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { useToolShell } from "@/components/ToolShellContext";

interface ToolOption {
  id: string;
  label: string;
  type: "select" | "toggle" | "slider" | "text";
  options?: readonly { value: string; label: string }[];
  defaultValue?: unknown;
  min?: number;
  max?: number;
  step?: number;
}

interface HistoryItem {
  id: string;
  input: string;
  output: string;
  timestamp: Date;
  options?: Record<string, unknown>;
}

interface EnhancedToolLayoutProps {
  toolSlug: string;
  toolName: string;
  placeholder: string;
  promptTemplate?: (input: string, options?: Record<string, unknown>) => string;
  generatePrompt?: (input: string, options?: Record<string, unknown>) => string;
  inputRows?: number;
  toolOptions?: readonly ToolOption[];
  options?: readonly ToolOption[];
  resultLabel?: string;
  generateButtonText?: string;
  customResultRenderer?: (result: string) => ReactNode;
  isNonAITool?: boolean;
  nonAIHandler?: (
    input: string,
    options?: Record<string, unknown>,
  ) => string | Promise<string>;
  maxHistoryItems?: number;
  showAdvancedOptions?: boolean;
  inputLabel?: string;
  supportedFormats?: string[];
  showCopyButton?: boolean;
  showDownloadButton?: boolean;
  showWordCount?: boolean;
  showFeedbackButtons?: boolean;
  systemPrompt?: string;
  /** Show free-tier / privacy note (default: true for AI tools) */
  showFreeTierNote?: boolean;
}

const HISTORY_INPUT_MAX = 8000;
const HISTORY_OUTPUT_MAX = 50000;

export default function EnhancedToolLayout({
  toolSlug,
  toolName,
  placeholder,
  promptTemplate,
  generatePrompt,
  inputRows = 8,
  toolOptions = [],
  options: optionAlias,
  resultLabel = "Result",
  generateButtonText = "Generate",
  customResultRenderer,
  isNonAITool = false,
  nonAIHandler,
  maxHistoryItems = 8,
  showAdvancedOptions = true,
  inputLabel = "Your input",
  showCopyButton = true,
  showDownloadButton = true,
  showWordCount = true,
  showFeedbackButtons = true,
  systemPrompt,
  showFreeTierNote,
}: EnhancedToolLayoutProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<Record<string, unknown>>({});
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [activeTab, setActiveTab] = useState<"input" | "output">("input");
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { nestedInPremiumShell } = useToolShell();
  const resolvedToolOptions = optionAlias ?? toolOptions;
  const resolvedPromptTemplate = promptTemplate ?? generatePrompt;
  const freeNote =
    showFreeTierNote !== undefined ? showFreeTierNote : !isNonAITool;

  useEffect(() => {
    const defaultOptions: Record<string, unknown> = {};
    resolvedToolOptions.forEach((option) => {
      defaultOptions[option.id] = option.defaultValue;
    });
    setOptions(defaultOptions);
  }, [resolvedToolOptions]);

  useEffect(() => {
    const savedHistory = localStorage.getItem(`${toolSlug}-history`);
    if (!savedHistory) return;
    try {
      const parsed = JSON.parse(savedHistory);
      if (!Array.isArray(parsed)) return;
      setHistory(
        parsed.map((item: HistoryItem & { timestamp: string }) => ({
          ...item,
          input: String(item.input ?? ""),
          output: String(item.output ?? ""),
          timestamp: new Date(item.timestamp),
        })),
      );
    } catch {
      // corrupt history — ignore
    }
  }, [toolSlug]);

  useEffect(() => {
    setCharCount(input.length);
    const words = input
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    setWordCount(words.length);
  }, [input]);

  const pushHistory = useCallback(
    (fullInput: string, fullOutput: string, opts: Record<string, unknown>) => {
      const newItem: HistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        input: fullInput.slice(0, HISTORY_INPUT_MAX),
        output: fullOutput.slice(0, HISTORY_OUTPUT_MAX),
        timestamp: new Date(),
        options: { ...opts },
      };
      setHistory((prev) => {
        const updated = [newItem, ...prev].slice(0, maxHistoryItems);
        try {
          localStorage.setItem(`${toolSlug}-history`, JSON.stringify(updated));
        } catch {
          // quota exceeded — keep in memory only
        }
        return updated;
      });
    },
    [maxHistoryItems, toolSlug],
  );

  const handleGenerate = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    setError(null);
    setFeedback(null);
    setActiveTab("output");

    try {
      let result: string;

      if (isNonAITool && nonAIHandler) {
        result = await nonAIHandler(input, options);
      } else {
        if (!resolvedPromptTemplate) {
          throw new Error("No prompt template configured for this tool");
        }

        const prompt = resolvedPromptTemplate(input, options);
        const response = await fetch("/api/ai", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt, systemPrompt, toolSlug }),
        });

        const data = await response.json().catch(() => ({}));
        if (!response.ok) {
          const msg =
            typeof data?.error === "string"
              ? data.error
              : "Generation failed. Please try again.";
          throw new Error(msg);
        }
        if (!data?.result || typeof data.result !== "string") {
          throw new Error("Empty response from AI. Please try again.");
        }
        result = data.result.trim();
        if (!result) {
          throw new Error("Empty response from AI. Please try again.");
        }
      }

      setOutput(result);
      setError(null);

      if (!isNonAITool || toolSlug === "youtube-summarizer") {
        window.dispatchEvent(new Event("ai-usage-updated"));
      }

      pushHistory(input, result, options);
      toast.success("Result ready");
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "An error occurred. Please try again.";
      setError(message);
      setOutput("");
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy — try selecting the text manually");
    }
  }, [output]);

  const handleDownload = useCallback(() => {
    if (!output) return;
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${toolSlug}-result-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Download started");
  }, [output, toolSlug]);

  const handleSaveToHistory = useCallback(() => {
    if (!output || !input.trim()) {
      toast.error("Generate a result first");
      return;
    }
    pushHistory(input, output, options);
    toast.success("Saved to history");
  }, [output, input, options, pushHistory]);

  const loadHistoryItem = useCallback((item: HistoryItem) => {
    setInput(item.input);
    setOutput(item.output || "");
    setError(null);
    setOptions(item.options || {});
    setShowHistory(false);
    setActiveTab(item.output ? "output" : "input");
    toast.success("History item loaded");
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(`${toolSlug}-history`);
    setShowHistory(false);
    toast.success("History cleared");
  }, [toolSlug]);

  const handleReset = useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
    setFeedback(null);
    setActiveTab("input");
    textareaRef.current?.focus();
  }, []);

  const handleShare = useCallback(async () => {
    try {
      if (navigator.share && output) {
        await navigator.share({
          title: `${toolName} · ToolNova`,
          text: output.slice(0, 500),
          url: window.location.href,
        });
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
    } catch {
      // user cancelled share
    }
  }, [output, toolName]);

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      void handleGenerate();
    }
  };

  const outputWordCount = output
    ? output
        .trim()
        .split(/\s+/)
        .filter((w) => w.length > 0).length
    : 0;

  return (
    <div className="w-full relative">
      {/* Soft Glow behind the tool */}
      <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-tr from-primary/10 via-transparent to-cyan-500/10 blur-3xl opacity-50 pointer-events-none" />

      {!nestedInPremiumShell && (
        <button
          type="button"
          onClick={() => router.push("/tools")}
          className="relative z-10 mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-card/60 backdrop-blur-md border border-border/50 hover:bg-muted/50 text-foreground font-semibold text-sm transition-all hover:shadow-glow-sm hover:border-primary/30 group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to All Tools
        </button>
      )}

      {freeNote && (
        <div className="relative z-10 mb-6 rounded-xl border border-primary/20 bg-primary/5 backdrop-blur-md px-5 py-4 text-sm text-foreground/90 shadow-sm flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-primary shrink-0 mt-0.5" />
          <div>
            <strong className="font-semibold text-primary tracking-wide uppercase text-xs">Free to start</strong>
            {" — "}
            no sign-up required. Free daily AI uses included;{" "}
            <button
              type="button"
              onClick={() => router.push("/pricing")}
              className="text-primary font-medium underline underline-offset-4 hover:no-underline hover:text-primary/80 transition-colors"
            >
              Pro unlocks unlimited AI
            </button>
            . Your text is processed for this session and not sold.
          </div>
        </div>
      )}

      <div className="relative z-20 rounded-[2rem] border border-border/60 bg-card/40 backdrop-blur-3xl shadow-premium-lg overflow-hidden flex flex-col group">
        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* Mac-like Browser Chrome Header */}
        <div className="flex items-center justify-between border-b border-border/40 bg-muted/20 px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-1.5">
              <span className="h-3 w-3 rounded-full bg-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.4)]" />
              <span className="h-3 w-3 rounded-full bg-amber-500/80 shadow-[0_0_10px_rgba(245,158,11,0.4)]" />
              <span className="h-3 w-3 rounded-full bg-emerald-500/80 shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
            </div>
            <div className="hidden sm:flex items-center justify-center rounded-md bg-background/50 px-3 py-1 text-xs text-muted-foreground border border-border/30 backdrop-blur-sm shadow-inner">
              toolnova.com/tools/{toolSlug}
            </div>
          </div>
          
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-wider backdrop-blur-md",
                loading
                  ? "bg-amber-500/10 border-amber-500/20 text-amber-500 shadow-glow-sm shadow-amber-500/20"
                  : error
                    ? "bg-red-500/10 border-red-500/20 text-red-500 shadow-glow-sm shadow-red-500/20"
                    : "bg-primary/10 border-primary/20 text-primary shadow-glow-sm shadow-primary/20",
              )}
            >
              <div
                className={cn(
                  "w-2 h-2 rounded-full",
                  loading
                    ? "bg-amber-500 animate-pulse"
                    : error
                      ? "bg-red-500"
                      : "bg-primary",
                )}
              />
              {loading ? "Processing…" : error ? "Error" : "Ready"}
            </div>

            {showWordCount && charCount > 0 && (
              <div className="hidden md:block text-xs text-muted-foreground font-medium truncate bg-background/50 px-3 py-1.5 rounded-full border border-border/30 backdrop-blur-sm">
                {wordCount} words · {charCount.toLocaleString()} chars
              </div>
            )}

            <div className="h-6 w-px bg-border/50 mx-1 hidden sm:block" />
            <div className="flex items-center gap-1">
              {history.length > 0 && (
                <button
                  type="button"
                  onClick={() => setShowHistory(!showHistory)}
                  className={cn(
                    "relative p-2 rounded-xl transition-all",
                    showHistory
                      ? "bg-primary/20 text-primary shadow-glow-sm"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground",
                  )}
                  title="View history"
                  aria-label="View history"
                >
                  <History className="h-4 w-4" />
                  <span className="absolute -top-1 -right-1 min-w-4 h-4 px-0.5 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center shadow-md">
                    {history.length}
                  </span>
                </button>
              )}

              {resolvedToolOptions.length > 0 && showAdvancedOptions && (
                <button
                  type="button"
                  onClick={() => setShowOptions(!showOptions)}
                  className={cn(
                    "p-2 rounded-xl transition-all",
                    showOptions
                      ? "bg-primary/20 text-primary shadow-glow-sm"
                      : "hover:bg-muted text-muted-foreground hover:text-foreground",
                  )}
                  title="Options"
                  aria-label="Toggle options"
                >
                  <Settings className="h-4 w-4" />
                </button>
              )}

              <button
                type="button"
                onClick={handleReset}
                className="p-2 rounded-xl hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                title="Reset"
                aria-label="Reset"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Options */}
        {showOptions && resolvedToolOptions.length > 0 && (
          <div className="p-4 sm:p-6 bg-muted/15 border-b border-border/60">
            <div className="flex items-center gap-2 mb-4">
              <Wand2 className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">
                Options
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resolvedToolOptions.map((option) => (
                <div key={option.id} className="space-y-2">
                  <label className="text-sm font-semibold text-foreground">
                    {option.label}
                  </label>
                  {option.type === "select" && (
                    <select
                      value={String(options[option.id] ?? "")}
                      onChange={(e) =>
                        setOptions({ ...options, [option.id]: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all"
                    >
                      {option.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  )}
                  {option.type === "toggle" && (
                    <button
                      type="button"
                      onClick={() =>
                        setOptions({
                          ...options,
                          [option.id]: !options[option.id],
                        })
                      }
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                        options[option.id] ? "bg-primary" : "bg-muted-foreground/30",
                      )}
                      aria-pressed={!!options[option.id]}
                    >
                      <span
                        className={cn(
                          "inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform",
                          options[option.id] ? "translate-x-6" : "translate-x-1",
                        )}
                      />
                    </button>
                  )}
                  {option.type === "slider" && (
                    <div className="space-y-1">
                      <input
                        type="range"
                        min={option.min}
                        max={option.max}
                        step={option.step}
                        value={Number(
                          options[option.id] ?? option.defaultValue ?? 0,
                        )}
                        onChange={(e) =>
                          setOptions({
                            ...options,
                            [option.id]: parseFloat(e.target.value),
                          })
                        }
                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                      />
                      <div className="text-xs text-muted-foreground font-medium">
                        Value:{" "}
                        {String(options[option.id] ?? option.defaultValue)}
                      </div>
                    </div>
                  )}
                  {option.type === "text" && (
                    <input
                      type="text"
                      value={String(options[option.id] ?? "")}
                      onChange={(e) =>
                        setOptions({ ...options, [option.id]: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History */}
        {showHistory && history.length > 0 && (
          <div className="p-4 sm:p-6 bg-muted/10 border-b border-border/60">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-primary" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wide">
                  Recent history
                </h3>
              </div>
              <button
                type="button"
                onClick={clearHistory}
                className="text-xs text-destructive hover:opacity-80 font-semibold flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" />
                Clear all
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {history.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => loadHistoryItem(item)}
                  className="w-full p-3 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-foreground font-medium truncate">
                        {item.input || "(empty)"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">
                        {item.output
                          ? item.output.slice(0, 80) +
                            (item.output.length > 80 ? "…" : "")
                          : "No output"}
                      </p>
                      <p className="text-[11px] text-muted-foreground/80 mt-1">
                        {item.timestamp.toLocaleString()}
                      </p>
                    </div>
                    <RefreshCw className="h-4 w-4 text-muted-foreground group-hover:text-primary shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex border-b border-border/40 bg-card/50 backdrop-blur-md">
          <button
            type="button"
            onClick={() => setActiveTab("input")}
            className={cn(
              "flex-1 px-4 sm:px-6 py-4 text-sm font-bold transition-all relative overflow-hidden",
              activeTab === "input"
                ? "text-primary bg-primary/5"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
          >
            {inputLabel}
            {activeTab === "input" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("output")}
            className={cn(
              "flex-1 px-4 sm:px-6 py-4 text-sm font-bold transition-all relative overflow-hidden",
              activeTab === "output"
                ? "text-primary bg-primary/5"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
            )}
          >
            {resultLabel}
            {activeTab === "output" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary shadow-[0_0_8px_rgba(var(--primary),0.8)]" />
            )}
          </button>
        </div>

        <div className="p-4 sm:p-6">
          {activeTab === "input" ? (
            <div className="space-y-4">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                rows={inputRows}
                className="w-full px-5 py-5 rounded-2xl border border-border/50 bg-background/50 backdrop-blur-sm text-foreground focus:border-primary/50 focus:ring-4 focus:ring-primary/10 focus:bg-background outline-none placeholder:text-muted-foreground/60 resize-y transition-all leading-relaxed min-h-[280px] sm:min-h-[360px] shadow-inner"
              />

              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                <button
                  type="button"
                  onClick={() => void handleGenerate()}
                  disabled={loading || !input.trim()}
                  className="flex-1 py-4 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-lg shadow-glow-md hover:shadow-glow-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processing…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-6 w-6 group-hover:rotate-12 group-hover:scale-110 transition-transform" />
                      {generateButtonText}
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5 justify-center sm:justify-start">
                <Keyboard className="h-3.5 w-3.5" />
                Press{" "}
                <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px] border border-border">
                  Ctrl
                </kbd>
                +
                <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono text-[10px] border border-border">
                  Enter
                </kbd>{" "}
                to generate
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-16 sm:py-20 space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-muted" />
                    <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                  </div>
                  <p className="text-muted-foreground font-medium">
                    Creating your result…
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Usually a few seconds
                  </p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center py-14 text-center space-y-4 px-4">
                  <div className="w-14 h-14 rounded-2xl bg-red-50 dark:bg-red-950/40 flex items-center justify-center">
                    <AlertCircle className="h-7 w-7 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-foreground font-semibold mb-2">
                      Something went wrong
                    </p>
                    <p className="text-sm text-muted-foreground max-w-md mx-auto">
                      {error}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab("input");
                      setError(null);
                    }}
                    className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90"
                  >
                    Back to input
                  </button>
                </div>
              ) : output ? (
                <>
                  <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-border">
                    {showCopyButton && (
                      <button
                        type="button"
                        onClick={() => void handleCopy()}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold text-sm transition-all"
                      >
                        {copied ? (
                          <>
                            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                            Copied
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            Copy
                          </>
                        )}
                      </button>
                    )}

                    {showDownloadButton && (
                      <button
                        type="button"
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold text-sm transition-all"
                      >
                        <Download className="h-4 w-4" />
                        Download
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={handleSaveToHistory}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold text-sm transition-all"
                    >
                      <Bookmark className="h-4 w-4" />
                      Save
                    </button>

                    <button
                      type="button"
                      onClick={() => void handleShare()}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-semibold text-sm transition-all"
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab("input");
                        textareaRef.current?.focus();
                      }}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-border hover:bg-muted text-foreground font-semibold text-sm transition-all"
                    >
                      <RefreshCw className="h-4 w-4" />
                      Edit input
                    </button>

                    {showWordCount && (
                      <span className="text-xs text-muted-foreground ml-auto font-medium">
                        {outputWordCount} words · {output.length.toLocaleString()}{" "}
                        chars
                      </span>
                    )}

                    {showFeedbackButtons && (
                      <div className="flex items-center gap-1.5 sm:ml-2">
                        <span className="text-xs text-muted-foreground font-medium hidden sm:inline">
                          Helpful?
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setFeedback("up");
                            toast.success("Thanks for the feedback");
                          }}
                          className={cn(
                            "p-2 rounded-lg transition-all",
                            feedback === "up"
                              ? "bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600"
                              : "bg-muted text-muted-foreground hover:text-emerald-600",
                          )}
                          aria-label="Thumbs up"
                        >
                          <ThumbsUp className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFeedback("down");
                            toast.message("Thanks — we’ll keep improving");
                          }}
                          className={cn(
                            "p-2 rounded-lg transition-all",
                            feedback === "down"
                              ? "bg-red-100 dark:bg-red-950/50 text-red-600"
                              : "bg-muted text-muted-foreground hover:text-red-600",
                          )}
                          aria-label="Thumbs down"
                        >
                          <ThumbsDown className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="prose prose-slate dark:prose-invert max-w-none">
                    {customResultRenderer ? (
                      customResultRenderer(output)
                    ) : (
                      <div className="p-5 sm:p-6 rounded-2xl bg-muted/40 border border-border">
                        <ReactMarkdown
                          components={{
                            h1: ({ ...props }) => (
                              <h1
                                className="font-heading text-2xl font-bold text-foreground mb-4 mt-0"
                                {...props}
                              />
                            ),
                            h2: ({ ...props }) => (
                              <h2
                                className="font-heading text-xl font-bold text-foreground mb-3 mt-6"
                                {...props}
                              />
                            ),
                            h3: ({ ...props }) => (
                              <h3
                                className="font-heading text-lg font-semibold text-foreground mb-2 mt-4"
                                {...props}
                              />
                            ),
                            p: ({ ...props }) => (
                              <p
                                className="text-foreground/90 leading-relaxed mb-4"
                                {...props}
                              />
                            ),
                            ul: ({ ...props }) => (
                              <ul
                                className="space-y-2 mb-4 ml-5 list-disc"
                                {...props}
                              />
                            ),
                            ol: ({ ...props }) => (
                              <ol
                                className="space-y-2 mb-4 ml-5 list-decimal"
                                {...props}
                              />
                            ),
                            li: ({ ...props }) => (
                              <li className="text-foreground/90" {...props} />
                            ),
                            strong: ({ ...props }) => (
                              <strong
                                className="font-bold text-foreground"
                                {...props}
                              />
                            ),
                            code: ({ className, children, ...props }) => {
                              const isBlock =
                                typeof className === "string" &&
                                className.includes("language-");
                              if (isBlock) {
                                return (
                                  <code
                                    className="block p-4 rounded-xl bg-slate-900 text-slate-100 text-sm font-mono overflow-x-auto mb-4"
                                    {...props}
                                  >
                                    {children}
                                  </code>
                                );
                              }
                              return (
                                <code
                                  className="px-1.5 py-0.5 rounded bg-muted text-sm font-mono text-foreground"
                                  {...props}
                                >
                                  {children}
                                </code>
                              );
                            },
                            blockquote: ({ ...props }) => (
                              <blockquote
                                className="border-l-4 border-primary/40 pl-4 italic text-muted-foreground my-4"
                                {...props}
                              />
                            ),
                            table: ({ ...props }) => (
                              <div className="overflow-x-auto my-4">
                                <table
                                  className="min-w-full text-sm border border-border"
                                  {...props}
                                />
                              </div>
                            ),
                            th: ({ ...props }) => (
                              <th
                                className="border border-border bg-muted px-3 py-2 text-left font-semibold"
                                {...props}
                              />
                            ),
                            td: ({ ...props }) => (
                              <td
                                className="border border-border px-3 py-2"
                                {...props}
                              />
                            ),
                          }}
                        >
                          {output}
                        </ReactMarkdown>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => void handleGenerate()}
                    disabled={loading || !input.trim()}
                    className="w-full sm:w-auto mt-2 py-3 px-6 rounded-xl border-2 border-primary/30 text-primary font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    Regenerate
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center">
                    <FileText className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-foreground font-medium mb-2">
                      No output yet
                    </p>
                    <p className="text-sm text-muted-foreground mb-4">
                      Enter your input and generate to see results here
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveTab("input")}
                      className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
                    >
                      Go to input
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
