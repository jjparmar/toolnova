"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import {
  Upload,
  Download,
  Trash2,
  FileText,
  Loader2,
  Shield,
  Zap,
  Layers,
  CheckCircle2,
  AlertCircle,
  Merge,
  Scissors,
  Image as ImageIcon,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { isPdfFile } from "@/lib/pdf-client";
import {
  compressPdfBytes,
  PDF_COMPRESS_PRESETS,
  type PdfCompressPreset,
} from "@/lib/pdf-compress";
import { PremiumToolWrapper } from "@/components/PremiumToolWrapper";

function formatSize(bytes: number): string {
  if (bytes <= 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.min(
    sizes.length - 1,
    Math.floor(Math.log(bytes) / Math.log(k)),
  );
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

const shellFeatures = [
  {
    title: "Private by design",
    description: "Compression runs with pdf.js + pdf-lib in your browser—no server upload.",
    icon: Shield,
  },
  {
    title: "Portal-ready sizes",
    description: "Target common email and form caps (1–5MB) with simple presets.",
    icon: Zap,
  },
  {
    title: "Works with scans",
    description: "Best gains on photo-heavy and scanned PDFs students submit often.",
    icon: Layers,
  },
];

const shellHowItWorks = [
  {
    step: 1,
    title: "Upload PDF",
    desc: "Drop a PDF under 80MB (up to 120 pages).",
    icon: Upload,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    step: 2,
    title: "Pick a preset",
    desc: "High quality, Balanced, or Smallest for hard 1MB caps.",
    icon: Zap,
    color: "from-indigo-500 to-violet-500",
  },
  {
    step: 3,
    title: "Download",
    desc: "Save the compressed file and check the new size.",
    icon: Download,
    color: "from-fuchsia-500 to-pink-500",
  },
];

const shellRelated = [
  { name: "Merge PDF", slug: "merge-pdf", icon: Merge, color: "text-violet-500" },
  { name: "Split PDF", slug: "split-pdf", icon: Scissors, color: "text-blue-500" },
  { name: "Image Compressor", slug: "image-compressor", icon: ImageIcon, color: "text-emerald-500" },
  { name: "Image to PDF", slug: "image-to-pdf", icon: Layers, color: "text-amber-500" },
];

export default function CompressPDFClient() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [preset, setPreset] = useState<PdfCompressPreset>("balanced");
  const [compressing, setCompressing] = useState(false);
  const [progress, setProgress] = useState("");
  const [resultUrl, setResultUrl] = useState("");
  const [resultSize, setResultSize] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [dragOver, setDragOver] = useState(false);

  const clearResult = useCallback(() => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl("");
    setResultSize(0);
    setPageCount(0);
    setProgress("");
  }, [resultUrl]);

  const acceptFile = useCallback(
    (f: File | null) => {
      if (!f) return;
      if (!isPdfFile(f)) {
        toast.error("Please choose a PDF file");
        return;
      }
      if (f.size > 80 * 1024 * 1024) {
        toast.error("Please use a PDF under 80MB for browser compression");
        return;
      }
      clearResult();
      setFile(f);
      setOriginalSize(f.size);
    },
    [clearResult],
  );

  const onFiles = (list: FileList | null) => {
    if (!list?.length) return;
    acceptFile(list[0]);
  };

  const compress = async () => {
    if (!file || compressing) return;
    setCompressing(true);
    clearResult();
    try {
      const data = await file.arrayBuffer();
      const { bytes, pageCount: pages } = await compressPdfBytes(
        data,
        preset,
        (page, total) => setProgress(`Compressing page ${page} of ${total}…`),
      );
      const copy = new Uint8Array(bytes.byteLength);
      copy.set(bytes);
      const blob = new Blob([copy], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setResultSize(blob.size);
      setPageCount(pages);
      const saved = originalSize - blob.size;
      if (saved > 0) {
        toast.success(
          `Compressed! Saved ${formatSize(saved)} (${Math.round((saved / originalSize) * 100)}% smaller)`,
        );
      } else {
        toast.message(
          "Compression finished. Try Smallest preset or split heavy pages if size is still high.",
        );
      }
    } catch (e) {
      toast.error(
        e instanceof Error ? e.message : "Failed to compress this PDF",
      );
    } finally {
      setCompressing(false);
      setProgress("");
    }
  };

  const download = () => {
    if (!resultUrl) return;
    const base = (file?.name || "document").replace(/\.pdf$/i, "");
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${base}-compressed.pdf`;
    a.click();
  };

  const reset = () => {
    clearResult();
    setFile(null);
    setOriginalSize(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  const reduction =
    originalSize > 0 && resultSize > 0
      ? Math.round(((originalSize - resultSize) / originalSize) * 100)
      : 0;

  return (
    <PremiumToolWrapper
      toolName="Compress PDF to 1MB Free Online"
      toolSlug="compress-pdf"
      tagline="Shrink PDFs for email and portals — private browser tool"
      description="Shrink PDFs for email and university portals—no watermark, no signup. Files never leave your device."
      badge="Free PDF tool · browser-private"
      category="PDF Tools"
      categorySlug="image-pdf-tools"
      features={shellFeatures}
      howItWorks={shellHowItWorks}
      relatedTools={shellRelated}
      ctaTitle="Need a smaller PDF?"
      ctaDescription="Upload a file, pick Balanced or Smallest, and download a portal-ready PDF."
      ctaButtonText="Compress now"
      ctaIcon={Zap}
    >
      <div className="tool-shell">
        <div className="p-5 sm:p-7 md:p-8">
          <div className="mb-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center text-sm text-muted-foreground">
            <Link
              href="/tools/merge-pdf"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Merge PDFs first
            </Link>
            <span aria-hidden>·</span>
            <Link
              href="/tools/image-compressor"
              className="font-semibold text-primary underline-offset-4 hover:underline"
            >
              Compress images
            </Link>
          </div>

          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              onFiles(e.dataTransfer.files);
            }}
            onClick={() => inputRef.current?.click()}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all sm:p-10 ${
              dragOver
                ? "border-primary bg-primary/5"
                : "border-[var(--border-color)] bg-muted/20 hover:border-primary/45 hover:bg-muted/35"
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept="application/pdf,.pdf"
              className="hidden"
              onChange={(e) => onFiles(e.target.files)}
            />
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Upload className="h-7 w-7" />
            </div>
            <p className="font-semibold text-foreground">
              Drop a PDF here or click to browse
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Up to 80MB · max 120 pages per file
            </p>
          </div>

          {file && (
            <div className="mt-6 space-y-5 rounded-2xl border border-[var(--border-color)] bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-foreground">
                      {file.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Original size: {formatSize(originalSize)}
                    </p>
                  </div>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={reset}>
                  <Trash2 className="mr-1.5 h-4 w-4" />
                  Remove
                </Button>
              </div>

              <div>
                <p className="mb-2 text-sm font-semibold text-foreground">
                  Compression preset
                </p>
                <div className="grid gap-2 sm:grid-cols-3">
                  {(Object.keys(PDF_COMPRESS_PRESETS) as PdfCompressPreset[]).map(
                    (key) => {
                      const p = PDF_COMPRESS_PRESETS[key];
                      const active = preset === key;
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => setPreset(key)}
                          className={`rounded-xl border p-3 text-left transition ${
                            active
                              ? "border-primary bg-primary/5 ring-1 ring-primary/30"
                              : "border-[var(--border-color)] hover:border-primary/30"
                          }`}
                        >
                          <div className="text-sm font-bold text-foreground">
                            {p.label}
                          </div>
                          <div className="mt-0.5 text-xs text-muted-foreground">
                            {p.hint}
                          </div>
                        </button>
                      );
                    },
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  className="btn-premium h-12 flex-1"
                  disabled={compressing}
                  onClick={() => void compress()}
                >
                  {compressing ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {progress || "Compressing…"}
                    </>
                  ) : (
                    <>
                      <Zap className="mr-2 h-4 w-4" />
                      Compress PDF
                    </>
                  )}
                </Button>
                {resultUrl && (
                  <Button
                    type="button"
                    variant="outline"
                    className="h-12 rounded-full"
                    onClick={download}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                )}
              </div>

              {resultUrl && (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/90 p-4">
                  <div className="mb-2 flex items-center gap-2 font-semibold text-emerald-800">
                    <CheckCircle2 className="h-5 w-5" />
                    Ready to download
                  </div>
                  <div className="grid gap-2 text-sm text-emerald-900 sm:grid-cols-3">
                    <div>
                      <span className="text-emerald-700/80">Pages:</span> {pageCount}
                    </div>
                    <div>
                      <span className="text-emerald-700/80">New size:</span>{" "}
                      {formatSize(resultSize)}
                    </div>
                    <div>
                      <span className="text-emerald-700/80">Change:</span>{" "}
                      {reduction > 0
                        ? `−${reduction}%`
                        : reduction < 0
                          ? `+${Math.abs(reduction)}%`
                          : "0%"}
                    </div>
                  </div>
                  {resultSize > 1024 * 1024 && (
                    <p className="mt-2 flex items-start gap-1.5 text-xs text-amber-800">
                      <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                      Still over 1MB. Try Smallest, or{" "}
                      <Link
                        href="/tools/split-pdf"
                        className="font-medium underline"
                      >
                        split
                      </Link>{" "}
                      image-heavy pages first.
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PremiumToolWrapper>
  );
}
