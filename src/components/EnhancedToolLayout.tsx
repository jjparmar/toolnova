"use client";

import { useState, useEffect, useCallback } from "react";
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
  X,
  ChevronDown,
  Bookmark,
  Share2,
  ThumbsUp,
  ThumbsDown,
  Eye,
  FileText,
  Image as ImageIcon,
  Settings,
  Wand2,
  ArrowLeft,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

interface ToolOption {
  id: string;
  label: string;
  type: "select" | "toggle" | "slider" | "text";
  options?: readonly { value: string; label: string }[];
  defaultValue?: any;
  min?: number;
  max?: number;
  step?: number;
}

interface HistoryItem {
  id: string;
  input: string;
  output: string;
  timestamp: Date;
  options?: Record<string, any>;
}

interface EnhancedToolLayoutProps {
  toolSlug: string;
  toolName: string;
  placeholder: string;
  promptTemplate?: (input: string, options?: Record<string, any>) => string;
  generatePrompt?: (input: string, options?: Record<string, any>) => string;
  inputRows?: number;
  toolOptions?: readonly ToolOption[];
  options?: readonly ToolOption[];
  resultLabel?: string;
  generateButtonText?: string;
  customResultRenderer?: (result: string) => React.ReactNode;
  isNonAITool?: boolean;
  nonAIHandler?: (
    input: string,
    options?: Record<string, any>,
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
}

export default function EnhancedToolLayout({
  toolSlug,
  toolName,
  placeholder,
  promptTemplate,
  generatePrompt,
  inputRows = 6,
  toolOptions = [],
  options: optionAlias,
  resultLabel = "✨ Result",
  generateButtonText = "✨ Generate",
  customResultRenderer,
  isNonAITool = false,
  nonAIHandler,
  maxHistoryItems = 5,
  showAdvancedOptions = true,
  inputLabel = "📝 Your Input",
  supportedFormats = ["text", "markdown"],
  systemPrompt,
}: EnhancedToolLayoutProps) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState<Record<string, any>>({});
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showOptions, setShowOptions] = useState(true);
  const [activeTab, setActiveTab] = useState<"input" | "output">("input");
  const [charCount, setCharCount] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const [feedback, setFeedback] = useState<"up" | "down" | null>(null);
  const router = useRouter();
  const resolvedToolOptions = optionAlias ?? toolOptions;
  const resolvedPromptTemplate = promptTemplate ?? generatePrompt;

  // Initialize options with default values
  useEffect(() => {
    const defaultOptions: Record<string, any> = {};
    resolvedToolOptions.forEach((option) => {
      defaultOptions[option.id] = option.defaultValue;
    });
    setOptions(defaultOptions);
  }, [resolvedToolOptions]);

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem(`${toolSlug}-history`);
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setHistory(
          parsed.map((item: any) => ({
            ...item,
            timestamp: new Date(item.timestamp),
          })),
        );
      } catch (e) {
        console.error("Failed to load history", e);
      }
    }
  }, [toolSlug]);

  // Update character and word count
  useEffect(() => {
    setCharCount(input.length);
    const words = input
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    setWordCount(words.length);
  }, [input]);

  const handleGenerate = async () => {
    if (!input.trim()) return;

    setLoading(true);
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
        result = data.result;
      }

      setOutput(result);

      // Notify usage counter (header) for guest + signed-in free tiers
      if (!isNonAITool) {
        window.dispatchEvent(new Event("ai-usage-updated"));
      }

      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        input: input.substring(0, 100),
        output: result.substring(0, 200),
        timestamp: new Date(),
        options: { ...options },
      };

      const updatedHistory = [newHistoryItem, ...history].slice(
        0,
        maxHistoryItems,
      );
      setHistory(updatedHistory);
      localStorage.setItem(
        `${toolSlug}-history`,
        JSON.stringify(updatedHistory),
      );
    } catch (error) {
      console.error("Error generating result:", error);
      const message =
        error instanceof Error
          ? error.message
          : "An error occurred. Please try again.";
      setOutput(`❌ ${message}`);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = useCallback(async () => {
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
    const blob = new Blob([output], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${toolSlug}-result-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, [output, toolSlug]);

  const handleSave = useCallback(() => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    // You can implement actual save logic here (e.g., to database)
  }, []);

  const loadHistoryItem = useCallback((item: HistoryItem) => {
    setInput(item.input);
    setOptions(item.options || {});
    setShowHistory(false);
    setActiveTab("input");
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(`${toolSlug}-history`);
  }, [toolSlug]);

  const handleReset = useCallback(() => {
    setInput("");
    setOutput("");
    setActiveTab("input");
  }, []);

  const handleShare = useCallback(() => {
    if (navigator.share) {
      navigator.share({
        title: `${toolName} Result`,
        text: output.substring(0, 200),
        url: window.location.href,
      });
    } else {
      // Fallback: copy link
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  }, [output, toolName]);

  return (
    <div className="w-full">
      {/* Back Button */}
      <button
        onClick={() => router.push("/tools")}
        className="mb-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 dark:border-slate-700 dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold text-sm transition-all hover:shadow-md group"
      >
        <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
        Back to All Tools
      </button>

      {/* Honest free-tier note (AdSense trust + UX) */}
      {!isNonAITool && (
        <div className="mb-4 rounded-xl border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/80 dark:bg-indigo-950/30 px-4 py-3 text-sm text-slate-700 dark:text-slate-300">
          <strong className="font-semibold text-indigo-800 dark:text-indigo-300">
            Free to start
          </strong>
          {" — "}
          no sign-up required. Free daily AI uses included;{" "}
          <button
            type="button"
            onClick={() => router.push("/pricing")}
            className="text-indigo-700 dark:text-indigo-300 font-medium underline underline-offset-2 hover:no-underline"
          >
            Pro unlocks unlimited AI
          </button>
          . Your text is processed for this session and not sold.
        </div>
      )}

      {/* Main Tool Card */}
      <div className="relative rounded-3xl border border-slate-200 dark:border-slate-700 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-2xl overflow-hidden">
        {/* Gradient Border Effect */}

        {/* Header Actions */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-800">
              <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
              <span className="text-xs font-bold text-indigo-700 dark:text-indigo-300 uppercase tracking-wide">
                {loading ? "Processing..." : "Ready"}
              </span>
            </div>

            {charCount > 0 && (
              <div className="text-xs text-slate-500 font-medium">
                {wordCount} words · {charCount} chars
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* History Button */}
            {history.length > 0 && (
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="relative p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-all group"
                title="View History"
              >
                <History className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-indigo-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {history.length}
                </span>
              </button>
            )}

            {/* Options Toggle */}
            {resolvedToolOptions.length > 0 && showAdvancedOptions && (
              <button
                onClick={() => setShowOptions(!showOptions)}
                className={`p-2 rounded-xl transition-all ${
                  showOptions
                    ? "bg-indigo-100 text-indigo-600"
                    : "hover:bg-slate-100 text-slate-600"
                }`}
                title="Advanced Options"
              >
                <Settings className="h-4 w-4" />
              </button>
            )}

            {/* Reset Button */}
            <button
              onClick={handleReset}
              className="p-2 rounded-xl hover:bg-slate-100 text-slate-600 transition-all"
              title="Reset All"
            >
              <RefreshCw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Advanced Options Panel */}
        {showOptions && resolvedToolOptions.length > 0 && (
          <div className="p-6 bg-gradient-to-br from-slate-50 to-indigo-50/30 border-b border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <Wand2 className="h-4 w-4 text-indigo-600" />
              <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                Advanced Options
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {resolvedToolOptions.map((option) => (
                <div key={option.id} className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">
                    {option.label}
                  </label>
                  {option.type === "select" && (
                    <select
                      value={options[option.id] || ""}
                      onChange={(e) =>
                        setOptions({ ...options, [option.id]: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
                      onClick={() =>
                        setOptions({
                          ...options,
                          [option.id]: !options[option.id],
                        })
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        options[option.id] ? "bg-indigo-600" : "bg-slate-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          options[option.id] ? "translate-x-6" : "translate-x-1"
                        }`}
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
                        value={options[option.id] || option.defaultValue}
                        onChange={(e) =>
                          setOptions({
                            ...options,
                            [option.id]: parseFloat(e.target.value),
                          })
                        }
                        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                      <div className="text-xs text-slate-500 font-medium">
                        Value: {options[option.id] || option.defaultValue}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History Panel */}
        {showHistory && history.length > 0 && (
          <div className="p-6 bg-slate-50 border-b border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
                  Recent History
                </h3>
              </div>
              <button
                onClick={clearHistory}
                className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
              >
                <Trash2 className="h-3 w-3" />
                Clear All
              </button>
            </div>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => loadHistoryItem(item)}
                  className="w-full p-3 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 hover:shadow-md transition-all text-left group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-slate-700 font-medium truncate">
                        {item.input}
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        {item.timestamp.toLocaleDateString()} at{" "}
                        {item.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                    <RefreshCw className="h-4 w-4 text-slate-400 group-hover:text-indigo-600 flex-shrink-0" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 bg-white">
          <button
            onClick={() => setActiveTab("input")}
            className={`flex-1 px-6 py-4 text-sm font-bold uppercase tracking-wide transition-all relative ${
              activeTab === "input"
                ? "text-indigo-600 bg-indigo-50/50"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            {inputLabel}
            {activeTab === "input" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("output")}
            className={`flex-1 px-6 py-4 text-sm font-bold uppercase tracking-wide transition-all relative ${
              activeTab === "output"
                ? "text-indigo-600 bg-indigo-50/50"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            {resultLabel}
            {activeTab === "output" && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500" />
            )}
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6">
          {activeTab === "input" ? (
            <div className="space-y-4">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                rows={inputRows}
                className="w-full px-6 py-4 rounded-2xl border-2 border-slate-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 outline-none text-slate-700 placeholder-slate-400 bg-white resize-y transition-all font-medium leading-relaxed min-h-[400px]"
              />

              <button
                onClick={handleGenerate}
                disabled={loading || !input.trim()}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 group"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                    {generateButtonText}
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-4 border-slate-200" />
                    <div className="absolute inset-0 w-16 h-16 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
                  </div>
                  <p className="text-slate-600 font-medium animate-pulse">
                    Creating your result...
                  </p>
                </div>
              ) : output ? (
                <>
                  {/* Action Buttons */}
                  <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-slate-200">
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
                    >
                      {copied ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleDownload}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
                    >
                      <Download className="h-4 w-4" />
                      Download
                    </button>

                    <button
                      onClick={handleSave}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
                    >
                      {saved ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          Saved!
                        </>
                      ) : (
                        <>
                          <Bookmark className="h-4 w-4" />
                          Save
                        </>
                      )}
                    </button>

                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-all"
                    >
                      <Share2 className="h-4 w-4" />
                      Share
                    </button>

                    <div className="ml-auto flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">
                        Helpful?
                      </span>
                      <button
                        onClick={() => setFeedback("up")}
                        className={`p-2 rounded-lg transition-all ${
                          feedback === "up"
                            ? "bg-green-100 text-green-600"
                            : "bg-slate-100 text-slate-400 hover:text-green-600"
                        }`}
                      >
                        <ThumbsUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setFeedback("down")}
                        className={`p-2 rounded-lg transition-all ${
                          feedback === "down"
                            ? "bg-red-100 text-red-600"
                            : "bg-slate-100 text-slate-400 hover:text-red-600"
                        }`}
                      >
                        <ThumbsDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Output Content */}
                  <div className="prose prose-slate max-w-none">
                    {customResultRenderer ? (
                      customResultRenderer(output)
                    ) : (
                      <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-indigo-50/30 border border-slate-200">
                        <ReactMarkdown
                          components={{
                            h1: ({ node, ...props }) => (
                              <h1
                                className="text-2xl font-bold text-slate-900 mb-4"
                                {...props}
                              />
                            ),
                            h2: ({ node, ...props }) => (
                              <h2
                                className="text-xl font-bold text-slate-800 mb-3 mt-6"
                                {...props}
                              />
                            ),
                            h3: ({ node, ...props }) => (
                              <h3
                                className="text-lg font-semibold text-slate-700 mb-2 mt-4"
                                {...props}
                              />
                            ),
                            p: ({ node, ...props }) => (
                              <p
                                className="text-slate-700 leading-relaxed mb-4"
                                {...props}
                              />
                            ),
                            ul: ({ node, ...props }) => (
                              <ul className="space-y-2 mb-4 ml-6" {...props} />
                            ),
                            ol: ({ node, ...props }) => (
                              <ol className="space-y-2 mb-4 ml-6" {...props} />
                            ),
                            li: ({ node, ...props }) => (
                              <li className="text-slate-700" {...props} />
                            ),
                            strong: ({ node, ...props }) => (
                              <strong
                                className="font-bold text-slate-900"
                                {...props}
                              />
                            ),
                            code: ({ node, ...props }) => (
                              <code
                                className="px-2 py-1 rounded bg-slate-200 text-sm font-mono text-slate-800"
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
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                    <FileText className="h-8 w-8 text-slate-400" />
                  </div>
                  <div>
                    <p className="text-slate-600 font-medium mb-2">
                      No output yet
                    </p>
                    <p className="text-sm text-slate-500">
                      Enter your input and click generate to see results
                    </p>
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
