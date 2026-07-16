"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Upload,
  Download,
  Trash2,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Loader2,
  FileText,
  GripVertical,
  Shield,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { PDFDocument } from "pdf-lib";
import {
  downloadBytes,
  isPdfFile,
  renderPdfPageThumbnails,
} from "@/lib/pdf-client";

const related = [
  { name: "Merge PDF", href: "/tools/merge-pdf" },
  { name: "Split PDF", href: "/tools/split-pdf" },
  { name: "Image to PDF", href: "/tools/image-to-pdf" },
];

type PageItem = {
  /** original 0-based index in source PDF */
  sourceIndex: number;
  thumb: string;
};

export default function ReorderPdfClient() {
  const router = useRouter();
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
      // Keep a copy — pdf.js may detach the buffer
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
    <div className="flex-1 w-full min-h-screen relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] mix-blend-screen animate-pulse-glow" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] mix-blend-screen" style={{ animationDelay: '1s' }} />
      </div>
      <div className="max-w-[1100px] mx-auto px-4 py-10">
        <button
          type="button"
          onClick={() => router.push("/tools/image-pdf-tools")}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Image & PDF
        </button>

        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-blue-500/10 text-indigo-400 text-sm font-semibold mb-5">
            <GripVertical className="h-4 w-4" /> Free · Private · Thumbnails
          </div>
          <h1 className="text-foreground text-4xl md:text-5xl font-black tracking-tight mb-4">Reorder PDF Pages</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
            See each page as a thumbnail, drag to reorder, then download a new
            PDF. All processing stays in your browser.
          </p>
        </div>

        <div className="bg-card/40 backdrop-blur-3xl rounded-[2rem] shadow-premium-lg border border-border/60 overflow-hidden relative group p-6 md:p-8 space-y-6">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
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
                if (f) loadFile(f);
              }}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all relative z-10 ${
                dragOver
                  ? "border-primary bg-primary/5 scale-[1.02]"
                  : "border-border/60 hover:border-primary/50 hover:bg-muted/30 hover:shadow-glow-sm"
              }`}
            >
              {loading ? (
                <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
              ) : (
                <>
                  <Upload className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
                  <p className="font-semibold">Drop a PDF or click to upload</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Thumbnails load for up to 100 pages
                  </p>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <FileText className="h-8 w-8 text-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="font-semibold truncate">{file.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {pages.length} pages · drag cards to reorder
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" size="sm" onClick={resetOrder} className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
                    <RotateCcw className="h-4 w-4 mr-1" /> Reset
                  </Button>
                  <Button type="button" variant="outline" size="sm" onClick={reverseOrder} className="bg-background/50 border-border/50 hover:border-primary/50 transition-colors">
                    Reverse
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-400 hover:bg-red-950/30"
                    onClick={clear}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Remove
                  </Button>
                </div>
              </div>

              <label className="block text-sm space-y-1 max-w-md relative z-10">
                <span className="font-medium">Output filename</span>
                <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={outputName}
                      onChange={(e) => setOutputName(e.target.value)}
                      className="flex-1 h-12 rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm px-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/40 transition-all"
                    />
                    <span className="text-muted-foreground text-sm">.pdf</span>
                </div>
              </label>

              {loading ? (
                <div className="py-16 text-center text-muted-foreground">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2" />
                  Rendering thumbnails…
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {pages.map((page, index) => (
                    <div
                      key={`${page.sourceIndex}-${index}`}
                      draggable
                      onDragStart={() => onDragStart(index)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => onDrop(index)}
                      className="relative rounded-xl border border-border/40 bg-background/40 backdrop-blur-sm p-2 cursor-grab active:cursor-grabbing hover:border-primary/50 transition-colors z-10"
                    >
                      <div className="absolute top-1 left-1 z-10 flex items-center gap-1">
                        <span className="text-[10px] font-black bg-primary text-primary-foreground px-1.5 py-0.5 rounded shadow-sm">
                          {index + 1}
                        </span>
                        <span className="text-[10px] font-medium bg-black/70 backdrop-blur-md text-white px-1.5 py-0.5 rounded shadow-sm">
                          was {page.sourceIndex + 1}
                        </span>
                      </div>
                      <div className="aspect-[3/4] rounded-lg overflow-hidden bg-background flex items-center justify-center">
                        {page.thumb ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={page.thumb}
                            alt={`Page ${page.sourceIndex + 1}`}
                            className="w-full h-full object-contain"
                            draggable={false}
                          />
                        ) : (
                          <FileText className="h-8 w-8 text-muted-foreground" />
                        )}
                      </div>
                      <div className="flex justify-center gap-1 mt-2">
                        <button
                          type="button"
                          className="p-1 rounded hover:bg-muted disabled:opacity-30 transition-colors"
                          disabled={index === 0}
                          onClick={() => move(index, -1)}
                          aria-label="Move earlier"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>
                        <GripVertical className="h-4 w-4 text-muted-foreground mt-1" />
                        <button
                          type="button"
                          className="p-1 rounded hover:bg-muted disabled:opacity-30 transition-colors"
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
                className="w-full h-14 rounded-2xl font-bold text-base relative z-10 bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow-md hover:shadow-glow-lg transition-all"
                onClick={save}
                disabled={saving || pages.length === 0}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" /> Saving…
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5 mr-2" /> Download reordered PDF
                  </>
                )}
              </Button>
            </>
          )}
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: GripVertical,
              t: "Drag & drop",
              d: "Reorder pages visually with thumbnails",
            },
            {
              icon: Shield,
              t: "Private",
              d: "PDF never leaves your device",
            },
            {
              icon: FileText,
              t: "Exact pages",
              d: "Output keeps full page quality",
            },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl bg-card/40 backdrop-blur-md border border-border/40 p-5 hover:border-primary/30 transition-colors">
              <x.icon className="h-6 w-6 text-primary mb-3" />
              <p className="font-bold text-foreground mb-1">{x.t}</p>
              <p className="text-sm text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          {related.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="underline underline-offset-4 hover:text-primary"
            >
              {r.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
