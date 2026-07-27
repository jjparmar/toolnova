"use client";

import { useCallback, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
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
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { isPdfFile } from "@/lib/pdf-client";
import {
  compressPdfBytes,
  PDF_COMPRESS_PRESETS,
  type PdfCompressPreset,
} from "@/lib/pdf-compress";

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

const related = [
  { name: "Merge PDF", slug: "merge-pdf" },
  { name: "Split PDF", slug: "split-pdf" },
  { name: "Image Compressor", slug: "image-compressor" },
  { name: "Image to PDF", slug: "image-to-pdf" },
];

export default function CompressPDFClient() {
  const router = useRouter();
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

  const clearResult = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setResultUrl("");
    setResultSize(0);
    setPageCount(0);
    setProgress("");
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [resultUrl],
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
      // Copy into a fresh Uint8Array so BlobPart typing is happy across TS targets
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
    <div className="flex-1 w-full min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-[920px] mx-auto px-4 sm:px-6 py-10">
        <button
          type="button"
          onClick={() => router.push("/tools/image-pdf-tools")}
          className="group mb-6 inline-flex items-center gap-2 rounded-xl border border-border/50 bg-background/60 px-4 py-2 text-sm font-medium shadow-sm transition hover:border-primary/40"
        >
          <ArrowLeft className="h-4 w-4" />
          Image & PDF tools
        </button>

        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-primary">
            <Shield className="h-3.5 w-3.5" />
            100% browser-private
          </div>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Compress PDF
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
            Shrink PDFs for email and upload portals. Files never leave your
            device.{" "}
            <Link
              href="/blog/how-to-compress-a-pdf-to-1mb-online"
              className="font-medium text-primary underline underline-offset-4"
            >
              Full 1MB guide
            </Link>
          </p>
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
          className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition ${
            dragOver
              ? "border-primary bg-primary/5"
              : "border-border bg-card hover:border-primary/40"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={(e) => onFiles(e.target.files)}
          />
          <Upload className="mx-auto mb-3 h-10 w-10 text-primary" />
          <p className="font-semibold text-foreground">
            Drop a PDF here or click to browse
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Up to 80MB · max 120 pages per file
          </p>
        </div>

        {file && (
          <div className="mt-6 space-y-5 rounded-2xl border border-border bg-card p-5 shadow-sm">
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
                {(
                  Object.keys(PDF_COMPRESS_PRESETS) as PdfCompressPreset[]
                ).map((key) => {
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
                          : "border-border hover:border-primary/30"
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
                })}
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="button"
                className="flex-1"
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
                <Button type="button" variant="secondary" onClick={download}>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              )}
            </div>

            {resultUrl && (
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4">
                <div className="mb-2 flex items-center gap-2 font-semibold text-emerald-800">
                  <CheckCircle2 className="h-5 w-5" />
                  Ready to download
                </div>
                <div className="grid gap-2 text-sm text-emerald-900 sm:grid-cols-3">
                  <div>
                    <span className="text-emerald-700/80">Pages:</span>{" "}
                    {pageCount}
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
                      className="underline font-medium"
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

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: Shield,
              title: "Private",
              text: "No server upload — pdf.js + pdf-lib in your browser",
            },
            {
              icon: Zap,
              title: "Portal-ready",
              text: "Target email & form size caps (1–5MB)",
            },
            {
              icon: Layers,
              title: "Works with scans",
              text: "Best gains on photo-heavy / scanned PDFs",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-xl border border-border bg-card p-4"
            >
              <c.icon className="mb-2 h-5 w-5 text-primary" />
              <div className="font-semibold text-foreground">{c.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="mb-3 text-lg font-bold text-foreground">
            Related tools
          </h2>
          <div className="flex flex-wrap gap-2">
            {related.map((t) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium hover:border-primary/40 hover:text-primary"
              >
                {t.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
