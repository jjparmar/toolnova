"use client";

import { useState, useEffect, useRef } from"react";
import { Button } from"@/components/ui/button";
import { Textarea } from"@/components/ui/textarea";
import {
  Sparkles,
  Copy,
  Download,
  RotateCcw,
  Check,
  Zap,
  Clock,
  FileText,
  Share2,
  ChevronDown,
  ChevronUp,
  History,
  Trash2,
  ArrowRight,
  Settings2,
  ArrowLeft,
  Upload,
  Volume2,
  VolumeX,
} from"lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from"@/components/ui/dropdown-menu";
import {
  FaWhatsapp,
  FaTwitter,
  FaFacebook,
  FaTelegram,
  FaLinkedin,
} from"react-icons/fa";
import { toast } from"sonner";
import {
  GenerationHistoryItem,
  saveToHistory,
  getToolHistory,
  clearToolHistory,
} from"@/lib/storage";
import { trackToolUse } from"@/lib/usage-tracker";
import Link from"next/link";
import { useRouter } from"next/navigation";
import { useSession } from"next-auth/react";
import { LogIn } from"lucide-react";
import { AIResultFormatter } from"@/components/AIResultFormatter";
import { TopBannerAd, BottomBoxAd } from"@/components/ads/AdUnit";

// Tool options interface
export interface ToolOption {
  id: string;
  label: string;
  type:"select" |"toggle" |"slider";
  options?: { value: string; label: string }[];
  defaultValue: string | boolean | number;
}

interface ToolLayoutProps {
  title: string;
  description: string;
  placeholder: string;
  promptTemplate:
    | string
    | ((input: string, options?: Record<string, any>) => string);
  systemPrompt?: string;
  inputRows?: number;
  isNonAITool?: boolean;
  nonAIHandler?: (input: string, options?: Record<string, any>) => string;
  toolSlug?: string;
  toolOptions?: ToolOption[];
  resultLabel?: string;
  generateButtonText?: string;
  customResultRenderer?: (result: string) => React.ReactNode;
}

export function ToolLayout({
  title,
  description,
  placeholder,
  promptTemplate,
  systemPrompt,
  inputRows = 8,
  isNonAITool = false,
  nonAIHandler,
  toolSlug,
  toolOptions = [],
  resultLabel ="Generated Result",
  generateButtonText,
  customResultRenderer,
}: ToolLayoutProps) {
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [history, setHistory] = useState<GenerationHistoryItem[]>([]);
  const [processingTime, setProcessingTime] = useState<number>(0);
  const [options, setOptions] = useState<Record<string, any>>({});
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [showShareMenu, setShowShareMenu] = useState<boolean>(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const optionsInitialized = useRef(false);

  // Auth state
  const { data: session, status } = useSession();
  const user = session?.user;
  const authLoading = status ==="loading";
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  // Guests can use AI tools without sign-up (daily free allowance).
  // Sign-in unlocks another free daily allowance + history; Pro is unlimited.

  // Initialize options with defaults - only once on mount
  useEffect(() => {
    if (optionsInitialized.current) return;
    if (toolOptions.length > 0) {
      const defaults: Record<string, any> = {};
      toolOptions.forEach((opt) => {
        defaults[opt.id] = opt.defaultValue;
      });
      setOptions(defaults);
      optionsInitialized.current = true;
    }
  }, [toolOptions]);

  useEffect(() => {
    if (toolSlug) {
      setHistory(getToolHistory(toolSlug));
    }
  }, [toolSlug]);

  // Cleanup speech synthesis on unmount or result change
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [result]);

  // Character and word counts
  const charCount = input.length;
  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;

  const handleOptionChange = (optionId: string, value: any) => {
    setOptions((prev) => ({ ...prev, [optionId]: value }));
  };

  const handleGenerate = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const startTime = Date.now();
    if (toolSlug) trackToolUse(toolSlug);

    try {
      let output ="";
      if (isNonAITool && nonAIHandler) {
        output = nonAIHandler(input, options);
      } else {
        const prompt =
          typeof promptTemplate ==="function"
            ? promptTemplate(input, options)
            : promptTemplate.replace("{input}", input);

        const res = await fetch("/api/ai", {
          method:"POST",
          body: JSON.stringify({ prompt, systemPrompt, toolSlug }),
          headers: {"Content-Type":"application/json" },
        });
        const data = await res.json().catch(() => ({}));

        if (!res.ok || data.error) {
          throw new Error(
            typeof data.error ==="string"
              ? data.error
              :"Generation failed. Please try again.",
          );
        }
        if (!data.result || typeof data.result !=="string") {
          throw new Error("Empty response from AI. Please try again.");
        }
        output = data.result;
      }

      setProcessingTime(Date.now() - startTime);
      setResult(output);

      // Notify the header UsageCounter to refresh
      if (!isNonAITool) {
        window.dispatchEvent(new Event("ai-usage-updated"));
      }

      if (toolSlug) {
        saveToHistory(toolSlug, input, output);
        setHistory(getToolHistory(toolSlug));
      }

      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior:"smooth",
          block:"start",
        });
      }, 100);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          :"Generation failed. Please try again.";
      toast.error(message);
      setResult(`❌ ${message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy — try selecting the text manually");
    }
  };

  const handleDownload = () => {
    const blob = new Blob([result], { type:"text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download =`${toolSlug ||"result"}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded!");
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: title, text: result });
      } catch (err) {}
    } else {
      handleCopy();
    }
  };

  // File upload handler
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const isTextFile = file.type ==="text/plain" || file.name.endsWith(".txt");
    const isImageFile = file.type.startsWith("image/");

    if (isTextFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        setInput(content);
        toast.success(`Loaded content from ${file.name}`);
      };
      reader.readAsText(file);
    } else if (isImageFile) {
      // For images, add the filename as a description placeholder
      setInput(`[Image uploaded: ${file.name}]\n\nDescribe what you see in this image or diagram...`,
      );
      toast.success(`Image"${file.name}" selected. Please describe the image content.`,
      );
    } else {
      toast.error("Please upload a .txt file or an image file");
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value ="";
    }
  };

  // Text-to-speech handler
  const handleSpeak = () => {
    if (!result) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(result);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => {
      setIsSpeaking(false);
      toast.error("Text-to-speech failed");
    };

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  // Social share handlers
  const getShareText = () => {
    const truncated =
      result.length > 250 ? result.substring(0, 250) +"..." : result;
    return`${truncated}\n\n✨ Generated with ToolNova - https://www.toolnovahub.com`;
  };

  const handleSocialShare = (platform: string) => {
    const text = encodeURIComponent(getShareText());
    const url = encodeURIComponent("https://www.toolnovahub.com");

    const shareUrls: Record<string, string> = {
      whatsapp:`https://wa.me/?text=${text}`,
      twitter:`https://twitter.com/intent/tweet?text=${text}`,
      facebook:`https://www.facebook.com/sharer/sharer.php?quote=${text}`,
      telegram:`https://t.me/share/url?url=${url}&text=${text}`,
      linkedin:`https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    const shareUrl = shareUrls[platform];
    if (shareUrl) {
      window.open(shareUrl,"_blank","width=600,height=400");
    }
    setShowShareMenu(false);
  };

  const handleClearHistory = () => {
    if (toolSlug) {
      clearToolHistory(toolSlug);
      setHistory([]);
      toast.success("History cleared!");
    }
  };

  const handleLoadFromHistory = (item: GenerationHistoryItem) => {
    setInput(item.input);
    setResult(item.result);
    setShowHistory(false);
  };

  const buttonText =
    generateButtonText || (isNonAITool ?"Process Now" :"Generate with AI");

  return (
    <div className="flex-1 w-full min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Top Banner Ad */}
        <TopBannerAd />

        {!isNonAITool && (
          <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 px-5 py-3.5 text-sm text-muted-foreground shadow-xs">
            <strong className="text-foreground">Free to start</strong> — no
            sign-up required. Free daily AI uses included;{" "}
            <Link
              href="/pricing"
              className="text-primary font-bold underline underline-offset-4 hover:no-underline"
            >
              Pro unlocks unlimited AI
            </Link>
            . We do not sell your prompts.
          </div>
        )}

        {/* Top Actions */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold rounded-xl"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tools
          </Button>

          {/* Breadcrumbs */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/"
              className="text-muted-foreground text-xs font-semibold hover:text-primary transition-colors"
            >
              Home
            </Link>
            <span className="text-muted-foreground/40 text-xs">/</span>
            <Link
              href="/tools"
              className="text-muted-foreground text-xs font-semibold hover:text-primary transition-colors"
            >
              Tools
            </Link>
            <span className="text-muted-foreground/40 text-xs">/</span>
            <span className="text-primary text-xs font-extrabold">{title}</span>
          </div>
        </div>

        {/* Heading Placeholder - Hidden in new layout since Wrapper handles it */}
        <div className="hidden">
          <h1 className="text-foreground text-4xl md:text-6xl font-black tracking-tight mb-4">
            {title}
          </h1>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Main Tool Content - Immersive Design */}
        <div className="space-y-10 mt-4">
          {/* Options Section */}
          {toolOptions.length > 0 && (
            <div className="surface-card rounded-2xl border border-border overflow-hidden mb-8">
              <button
                onClick={() => setShowOptions(!showOptions)}
                className="w-full px-6 py-4 flex items-center justify-between text-xs font-extrabold text-foreground hover:bg-muted/50 transition-colors uppercase tracking-widest"
              >
                <div className="flex items-center gap-2.5">
                  <Settings2 className="h-4 w-4 text-primary" />
                  Tool Customization
                </div>
                <div className="flex items-center gap-2 text-muted-foreground font-bold">
                  {showOptions ?"Collapse" :"Expand"}
                  {showOptions ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </div>
              </button>

              {showOptions && (
                <div className="px-6 pb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 animate-in fade-in slide-in-from-top-2 duration-300">
                  {toolOptions.map((opt) => (
                    <div key={opt.id} className="flex flex-col gap-2">
                      <label className="text-[10px] font-extrabold text-muted-foreground uppercase tracking-widest leading-none">
                        {opt.label}
                      </label>
                      {opt.type ==="select" && opt.options && (
                        <div className="relative group">
                          <select
                            value={options[opt.id] || opt.defaultValue}
                            onChange={(e) =>
                              handleOptionChange(opt.id, e.target.value)
                            }
                            className="w-full h-11 px-4 pr-10 rounded-xl bg-card border border-border text-foreground text-sm font-bold focus:border-primary focus:ring-4 focus:ring-primary/15 transition-all appearance-none cursor-pointer"
                          >
                            {opt.options.map((o) => (
                              <option key={o.value} value={o.value}>
                                {o.label}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                        </div>
                      )}
                      {opt.type ==="toggle" && (
                        <button
                          onClick={() =>
                            handleOptionChange(opt.id, !options[opt.id])
                          }
                          className={`h-11 px-5 rounded-xl border font-bold text-sm transition-all flex items-center justify-between ${
                            options[opt.id]
                              ?"bg-primary text-white border-primary shadow-md shadow-primary/20"
                              :"bg-card text-muted-foreground border-border hover:border-primary"
                          }`}
                        >
                          {options[opt.id] ?"Enabled" :"Disabled"}
                          <div
                            className={`w-8 h-4 rounded-full relative transition-colors ${options[opt.id] ?"bg-white/20" :"bg-muted"}`}
                          >
                            <div
                              className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all ${options[opt.id] ?"left-4.5" :"left-0.5"}`}
                            ></div>
                          </div>
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Input Area */}
          <div className="surface-card rounded-3xl border border-border/80 bg-card p-6 md:p-10 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 left-0 h-1.5 w-full bg-gradient-to-r from-[#FF3B5C] to-[#7C3AED]"></div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
              <div>
                <label className="text-xl font-extrabold text-foreground flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  Input Data
                </label>
                <div className="mt-1.5 flex items-center gap-3 text-xs font-bold text-muted-foreground uppercase tracking-wider pl-12">
                  <span>{wordCount} words</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/40"></span>
                  <span>{charCount} characters</span>
                </div>
              </div>


              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-border font-bold text-xs h-10 hover:bg-muted/60 :bg-slate-800"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="h-3.5 w-3.5 mr-2" /> Import
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-xl border-border font-bold text-xs h-10 hover:bg-red-50 :bg-red-900/20 hover:text-red-500 hover:border-red-200"
                  onClick={() => setInput("")}
                  disabled={!input}
                >
                  <RotateCcw className="h-3.5 w-3.5 mr-2" /> Reset
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".txt,.jpg,.jpeg,.png,.webp"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>
            </div>

            <div className="relative group">
              {/* Optional soft CTA for guests — tools work without sign-in */}
              {!isNonAITool && !loading && !authLoading && !user && (
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 text-sm">
                  <p className="text-muted-foreground">
                    Free to use without an account. Sign in for more daily uses and saved history.
                  </p>
                  <Button
                    onClick={handleLoginRedirect}
                    variant="outline"
                    size="sm"
                    className="shrink-0 rounded-xl font-semibold"
                  >
                    <LogIn className="h-3.5 w-3.5 mr-1.5" />
                    Sign in free
                  </Button>
                </div>
              )}

              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                className="w-full min-h-[220px] md:min-h-[280px] resize-none p-8 rounded-[1.8rem] bg-muted/60 border-border text-foreground text-lg focus:ring-4 focus:ring-primary/10 focus:border-primary/50 transition-all font-medium placeholder:text-muted-foreground placeholder:font-normal leading-relaxed"
              />
            </div>

            {/* Premium Generate Button */}
            <div className="mt-8">
              <Button
                onClick={handleGenerate}
                disabled={loading || !input.trim()}
                className="btn-premium group flex h-14 w-full items-center justify-center gap-3 rounded-2xl text-lg font-extrabold shadow-xl transition-all disabled:opacity-50 disabled:grayscale"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{isNonAITool ?"Processing..." :"Thinking..."}</span>
                  </div>
                ) : (
                  <>
                    <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center group-hover:rotate-12 transition-transform">
                      {isNonAITool ? (
                        <Zap className="h-5 w-5" />
                      ) : (
                        <Sparkles className="h-5 w-5" />
                      )}
                    </div>
                    {buttonText}
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Result Area */}
          {result && (
            <div
              ref={resultRef}
              className="surface-card mt-16 p-6 sm:p-10 md:p-12 rounded-3xl border border-border bg-card shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-500 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 relative z-10">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                      <Check className="h-5 w-5" />
                    </div>
                    <label className="text-2xl font-extrabold text-foreground">
                      {resultLabel}
                    </label>
                  </div>
                  {processingTime > 0 && (
                    <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider pl-13">
                      Processing complete in{" "}
                      {(processingTime / 1000).toFixed(2)}s
                    </div>
                  )}
                </div>


                <div className="flex gap-3 flex-wrap">
                  <Button
                    variant="outline"
                    size="lg"
                    className="h-12 px-6 gap-3 rounded-[1.2rem] border-border font-black text-sm hover:bg-slate-900 hover:text-white :bg-white :text-foreground transition-all overflow-hidden relative"
                    onClick={handleCopy}
                  >
                    {copied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                    {copied ?"Copied" :"Copy Result"}
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="lg"
                        className="h-12 px-6 gap-3 rounded-[1.2rem] border-border font-black text-sm hover:bg-blue-600 hover:text-white transition-all"
                      >
                        <Share2 className="h-4 w-4" />
                        Export
                        <ChevronDown className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="w-56 p-2 rounded-2xl border-border"
                    >
                      <DropdownMenuItem
                        onClick={handleDownload}
                        className="cursor-pointer rounded-xl h-11 font-bold"
                      >
                        <Download className="h-4 w-4 mr-3 text-blue-500" /> Save
                        as Text (.txt)
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleSpeak}
                        className="cursor-pointer rounded-xl h-11 font-bold"
                      >
                        {isSpeaking ? (
                          <VolumeX className="h-4 w-4 mr-3 text-orange-500" />
                        ) : (
                          <Volume2 className="h-4 w-4 mr-3 text-orange-500" />
                        )}
                        {isSpeaking ?"Stop Dictation" :"Read Out Loud"}
                      </DropdownMenuItem>
                      <div className="h-px bg-muted my-2"></div>
                      <DropdownMenuItem
                        onClick={() => handleSocialShare("whatsapp")}
                        className="cursor-pointer rounded-xl h-11 font-bold"
                      >
                        <FaWhatsapp className="h-4 w-4 mr-3 text-green-500" />{""}
                        WhatsApp
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleSocialShare("twitter")}
                        className="cursor-pointer rounded-xl h-11 font-bold"
                      >
                        <FaTwitter className="h-4 w-4 mr-3 text-blue-400" />{""}
                        Twitter / X
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              <div className="bg-muted/60 rounded-[2rem] p-8 md:p-12 border border-border relative z-10">
                {customResultRenderer ? (
                  customResultRenderer(result)
                ) : isNonAITool ? (
                  <div className="prose prose-slate prose-lg max-w-none">
                    <p className="whitespace-pre-wrap leading-relaxed text-slate-800 text-lg m-0">
                      {result}
                    </p>
                  </div>
                ) : (
                  <AIResultFormatter result={result} />
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom History Link */}
        {history.length > 0 && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-primary transition-colors mx-auto"
            >
              <History className="h-4 w-4" />
              View History ({history.length})
              {showHistory ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </button>

            {showHistory && (
              <div className="mt-4 bg-white rounded-2xl border border-border overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <span className="text-sm font-semibold text-foreground">
                    Recent Generations
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 text-xs text-red-500 hover:text-red-600 hover:bg-red-50 :bg-red-900/20"
                    onClick={handleClearHistory}
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1" /> Clear All
                  </Button>
                </div>
                <div className="max-h-64 overflow-y-auto">
                  {history.slice(0, 5).map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleLoadFromHistory(item)}
                      className="w-full p-4 text-left border-b border-slate-50 last:border-0 hover:bg-muted/60 :bg-slate-800/50 transition-colors"
                    >
                      <div className="text-sm text-foreground font-medium line-clamp-1">
                        {item.input}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {new Date(item.timestamp).toLocaleDateString()}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Box Ad */}
        <BottomBoxAd />

        {/* Pro Tips */}
        <div className="mt-10 rounded-2xl border border-primary/10 bg-primary/5 p-6">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" /> Pro Tips
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>Be specific with your input
              for more accurate results
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>Use the settings panel to
              customize output
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">•</span>Review and personalize the
              generated content
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ToolLayout;
