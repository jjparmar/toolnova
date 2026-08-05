"use client";

import { useRef, useState } from "react";
import {
  Upload,
  Download,
  Trash2,
  ArrowUp,
  ArrowDown,
  Loader2,
  FileText,
  GripVertical,
  Shield,
  RotateCcw,
  Zap,
  Merge,
  Scissors,
  Layers,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PDFDocument } from "pdf-lib";
import {
  downloadBytes,
  isPdfFile,
  renderPdfPageThumbnails,
} from "@/lib/pdf-client";
import { PremiumToolWrapper } from "@/components/PremiumToolWrapper";

type PageItem = {
  /** original 0-based index in source PDF */
  sourceIndex: number;
  thumb: string;
};

const shellFeatures = [
  {
    title: "Drag & drop pages",
    description: "Reorder pages visually with live thumbnails.",
    icon: GripVertical,
  },
  {
    title: "Private browser tool",
    description: "PDF never leaves your device during reorder.",
    icon: Shield,
  },
  {
    title: "Exact page quality",
    description: "Output keeps full page fidelity—no re-rasterize.",
    icon: FileText,
  },
];

const shellHowItWorks = [
  {
    step: 1,
    title: "Upload PDF",
    desc: "Drop a PDF to render page thumbnails.",
    icon: Upload,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    step: 2,
    title: "Reorder",
    desc: "Drag cards or use arrows; reset/reverse anytime.",
    icon: GripVertical,
    color: "from-indigo-500 to-violet-500",
  },
  {
    step: 3,
    title: "Download",
    desc: "Save a new PDF in the order you chose.",
    icon: Download,
    color: "from-fuchsia-500 to-pink-500",
  },
];

const shellRelated = [
  { name: "Merge PDF", slug: "merge-pdf", icon: Merge, color: "text-violet-500" },
  { name: "Split PDF", slug: "split-pdf", icon: Scissors, color: "text-blue-500" },
  { name: "Compress PDF", slug: "compress-pdf", icon: FileText, color: "text-rose-500" },
  { name: "Image to PDF", slug: "image-to-pdf", icon: Layers, color: "text-emerald-500" },
];

export default function ReorderPdfClient() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [pdfBytes, setPdfBytes] = useState<ArrayBuffer | null>(null);
  const [pages, setPages] = useState<PageItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [outputName, setOutputName] = useState("reordered");
  const dragIndex = useRef<number | null>(null);

  const loadFile = async (f: File) => {
    if (!isPdfFile(f)) {
      toast.error("Please select a PDF file");
      return;
    }
    setLoading(true);
    try {
      const buf = await f.arrayBuffer();
      const copy = buf.slice(0);
      setPdfBytes(copy);
      setFile(f);
      setOutputName(
        f.name.replace(/\.pdf$/i, "").replace(/[^\w\-]+/g, "-") + "-reordered",
      );

      toast.message("Rendering page thumbnails…");
      const { pageCount, thumbs } = await renderPdfPageThumbnails(copy.slice(0), {
        maxWidth: 140,
        maxPages: 100,
      });

      const items: PageItem[] = [];
      for (let i = 0; i < pageCount; i++) {
        items.push({
          sourceIndex: i,
          thumb: thumbs[i] || "",
        });
      }
      setPages(items);
      toast.success(`Loaded ${pageCount} page(s) — drag to reorder`);
    } catch (e) {
      console.error(e);
      toast.error(
        "Could not load PDF for previews. File may be encrypted or unsupported.",
      );
      setFile(null);
      setPdfBytes(null);
      setPages([]);
    } finally {
      setLoading(false);
    }
  };

  const move = (index: number, dir: -1 | 1) => {
    setPages((prev) => {
      const next = [...prev];
      const j = index + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[index], next[j]] = [next[j], next[index]];
      return next;
    });
  };

  const resetOrder = () => {
    setPages((prev) =>
      [...prev].sort((a, b) => a.sourceIndex - b.sourceIndex),
    );
    toast.success("Order reset to original");
  };

  const reverseOrder = () => {
    setPages((prev) => [...prev].reverse());
    toast.success("Order reversed");
  };

  const save = async () => {
    if (!pdfBytes || pages.length === 0) return;
    setSaving(true);
    try {
      const src = await PDFDocument.load(pdfBytes.slice(0), {
        ignoreEncryption: true,
      });
      const out = await PDFDocument.create();
      const order = pages.map((p) => p.sourceIndex);
      const copied = await out.copyPages(src, order);
      copied.forEach((p) => out.addPage(p));
      const bytes = await out.save({ useObjectStreams: false });
      const name = (outputName.trim() || "reordered").replace(/[^\w\-]+/g, "-");
      downloadBytes(bytes, `${name}.pdf`, "application/pdf");
      toast.success("Reordered PDF downloaded");
    } catch (e) {
      console.error(e);
      toast.error("Failed to save reordered PDF");
    } finally {
      setSaving(false);
    }
  };

  const clear = () => {
    setFile(null);
    setPdfBytes(null);
    setPages([]);
  };

  const onDragStart = (index: number) => {
    dragIndex.current = index;
  };

  const onDrop = (index: number) => {
    const from = dragIndex.current;
    dragIndex.current = null;
    if (from === null || from === index) return;
    setPages((prev) => {
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(index, 0, item);
      return next;
    });
  };

  return (
    <PremiumToolWrapper
      toolName="Reorder PDF Pages Free"
      toolSlug="reorder-pdf"
      tagline="Drag thumbnails to rearrange — private browser tool"
      description="See each page as a thumbnail, drag to reorder, then download a new PDF. All processing stays in your browser."
      badge="Free PDF tool · browser-private"
      category="PDF Tools"
      categorySlug="image-pdf-tools"
      features={shellFeatures}
      howItWorks={shellHowItWorks}
      relatedTools={shellRelated}
      ctaTitle="Ready to reorder pages?"
      ctaDescription="Upload a PDF, drag pages into place, and download the new order."
      ctaButtonText="Start reordering"
      ctaIcon={GripVertical}
    >
      <div className="tool-shell">
        <div className="space-y-6 p-5 sm:p-7 md:p-8">
          <input
            ref={inputRef}
            type="file"
            accept="application/pdf,.pdf"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && loadFile(e.target.files[0])}
          />

          {!file ? (
            <div
              onClick={() => inputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                const f = e.dataTransfer.files?.[0];
                if (f) void loadFile(f);
              }}
              className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all sm:p-12 ${
                dragOver
                  ? "scale-[1.01] border-primary bg-primary/5"
                  : "border-[var(--border-color)] bg-muted/20 hover:border-primary/45 hover:bg-muted/35"
              }`}
            >
              {loading ? (
                <Loader2 className="mx-auto h-11 w-11 animate-spin text-primary" />
              ) : (
                <>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Upload className="h-7 w-7" />
                  </div>
                  <p className="font-semibold text-foreground">
                    Drop a PDF or click to upload
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Thumbnails load for up to 100 pages
                  </p>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-foreground">
                      {file.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {pages.length} pages · drag cards to reorder
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={resetOrder}
                  >
                    <RotateCcw className="mr-1 h-4 w-4" /> Reset
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={reverseOrder}
                  >
                    Reverse
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                    onClick={clear}
                  >
                    <Trash2 className="mr-1 h-4 w-4" /> Remove
                  </Button>
                </div>
              </div>

              <label className="block max-w-md space-y-1.5 text-sm">
                <span className="font-semibold text-foreground">
                  Output filename
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={outputName}
                    onChange={(e) => setOutputName(e.target.value)}
                    className="input-surface h-12 flex-1 px-4 text-sm"
                  />
                  <span className="text-sm text-muted-foreground">.pdf</span>
                </div>
              </label>

              {loading ? (
                <div className="py-16 text-center text-muted-foreground">
                  <Loader2 className="mx-auto mb-2 h-8 w-8 animate-spin" />
                  Rendering thumbnails…
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                  {pages.map((page, index) => (
                    <div
                      key={`${page.sourceIndex}-${index}`}
                      draggable
                      onDragStart={() => onDragStart(index)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => onDrop(index)}
                      className="relative cursor-grab rounded-xl border border-[var(--border-color)] bg-card p-2 transition-colors hover:border-primary/50 active:cursor-grabbing"
                    >
                      <div className="absolute left-1 top-1 z-10 flex items-center gap-1">
                        <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-black text-primary-foreground shadow-sm">
                          {index + 1}
                        </span>
                        <span className="rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-white shadow-sm backdrop-blur-md">
                          was {page.sourceIndex + 1}
                        </span>
                      </div>
                      <div className="flex aspect-[3/4] items-center justify-center overflow-hidden rounded-lg bg-muted/40">
                        {page.thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={page.thumb}
                            alt={`Page ${page.sourceIndex + 1}`}
                            className="h-full w-full object-contain"
                            draggable={false}
                          />
                        ) : (
                          <FileText className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                      <div className="mt-2 flex justify-center gap-1">
                        <button
                          type="button"
                          className="rounded p-1 transition-colors hover:bg-muted disabled:opacity-30"
                          disabled={index === 0}
                          onClick={() => move(index, -1)}
                          aria-label="Move earlier"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <GripVertical className="mt-1 h-4 w-4 text-muted-foreground" />
                        <button
                          type="button"
                          className="rounded p-1 transition-colors hover:bg-muted disabled:opacity-30"
                          disabled={index === pages.length - 1}
                          onClick={() => move(index, 1)}
                          aria-label="Move later"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <Button
                className="btn-premium h-13 w-full gap-2 text-base font-bold"
                onClick={() => void save()}
                disabled={saving || pages.length === 0}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Saving…
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" /> Download reordered PDF
                  </>
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </PremiumToolWrapper>
  );
}
