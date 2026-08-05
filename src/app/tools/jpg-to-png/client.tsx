"use client";

import { useRef, useState } from "react";
import {
  Upload,
  Download,
  Trash2,
  Image as ImageIcon,
  Loader2,
  Shield,
  Zap,
  Sparkles,
  Layers,
  Crop,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  baseName,
  downloadBlob,
  formatBytes,
  imageToBlob,
  isImageFile,
  readFileAsDataURL,
} from "@/lib/image-client";
import { PremiumToolWrapper } from "@/components/PremiumToolWrapper";

type Item = {
  id: string;
  file: File;
  preview: string;
  resultUrl?: string;
  resultSize?: number;
  dims?: { w: number; h: number };
};

const shellFeatures = [
  {
    title: "Private conversion",
    description: "Never leaves your browser — no upload required.",
    icon: Shield,
  },
  {
    title: "Full quality PNG",
    description: "Lossless PNG export for graphics and screenshots.",
    icon: ImageIcon,
  },
  {
    title: "Batch ready",
    description: "Convert many images at once and download each PNG.",
    icon: Zap,
  },
];

const shellHowItWorks = [
  {
    step: 1,
    title: "Upload images",
    desc: "Drop JPG, PNG, or WebP files (batch OK).",
    icon: Upload,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    step: 2,
    title: "Convert",
    desc: "One click converts all selected images to PNG.",
    icon: Sparkles,
    color: "from-indigo-500 to-violet-500",
  },
  {
    step: 3,
    title: "Download",
    desc: "Save individual PNGs or download all.",
    icon: Download,
    color: "from-fuchsia-500 to-pink-500",
  },
];

const shellRelated = [
  { name: "PNG to JPG", slug: "png-to-jpg", icon: ImageIcon, color: "text-cyan-500" },
  { name: "Image Compressor", slug: "image-compressor", icon: Zap, color: "text-amber-500" },
  { name: "Crop Image", slug: "image-crop", icon: Crop, color: "text-violet-500" },
  { name: "Image to PDF", slug: "image-to-pdf", icon: Layers, color: "text-emerald-500" },
];

export default function JPGtoPNGClient() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = async (list: FileList | null) => {
    if (!list?.length) return;
    const files = Array.from(list).filter(isImageFile);
    if (!files.length) {
      toast.error("Please select image files");
      return;
    }
    const next: Item[] = [];
    for (const file of files) {
      try {
        const preview = await readFileAsDataURL(file);
        const img = new window.Image();
        await new Promise<void>((res, rej) => {
          img.onload = () => res();
          img.onerror = () => rej();
          img.src = preview;
        });
        next.push({
          id: `${Date.now()}-${Math.random()}`,
          file,
          preview,
          dims: { w: img.naturalWidth, h: img.naturalHeight },
        });
      } catch {
        toast.error(`Could not load ${file.name}`);
      }
    }
    setItems((prev) => [...prev, ...next]);
    toast.success(`Added ${next.length} image(s)`);
  };

  const convertOne = async (item: Item): Promise<Item> => {
    const { blob, width, height } = await imageToBlob(item.preview, {
      mime: "image/png",
    });
    if (item.resultUrl) URL.revokeObjectURL(item.resultUrl);
    return {
      ...item,
      resultUrl: URL.createObjectURL(blob),
      resultSize: blob.size,
      dims: { w: width, h: height },
    };
  };

  const convertAll = async () => {
    if (!items.length) return;
    setBusy(true);
    try {
      const out: Item[] = [];
      for (const item of items) {
        out.push(await convertOne(item));
      }
      setItems(out);
      toast.success(`Converted ${out.length} image(s) to PNG`);
    } catch {
      toast.error("Conversion failed");
    } finally {
      setBusy(false);
    }
  };

  const downloadOne = async (item: Item) => {
    let url = item.resultUrl;
    if (!url) {
      const updated = await convertOne(item);
      url = updated.resultUrl!;
      setItems((prev) => prev.map((p) => (p.id === item.id ? updated : p)));
    }
    const res = await fetch(url);
    const blob = await res.blob();
    downloadBlob(blob, `${baseName(item.file.name)}.png`);
  };

  const downloadAll = async () => {
    setBusy(true);
    try {
      for (const item of items) {
        await downloadOne(item);
      }
    } finally {
      setBusy(false);
    }
  };

  const clear = () => {
    items.forEach((i) => i.resultUrl && URL.revokeObjectURL(i.resultUrl));
    setItems([]);
  };

  return (
    <PremiumToolWrapper
      toolName="JPG to PNG Converter Free"
      toolSlug="jpg-to-png"
      tagline="Convert images to PNG with full quality — private browser tool"
      description="Convert images to PNG with full quality. Batch support · private browser processing · no signup."
      badge="Free converter · browser-private"
      category="Image Tools"
      categorySlug="image-pdf-tools"
      features={shellFeatures}
      howItWorks={shellHowItWorks}
      relatedTools={shellRelated}
      ctaTitle="Ready to convert to PNG?"
      ctaDescription="Upload images, convert in one click, and download lossless PNGs."
      ctaButtonText="Start converting"
      ctaIcon={ImageIcon}
    >
      <div className="tool-shell">
        <div className="space-y-6 p-5 sm:p-7 md:p-8">
          <input
            ref={inputRef}
            type="file"
            accept="image/*,.jpg,.jpeg,.png,.webp"
            multiple
            className="hidden"
            onChange={(e) => void addFiles(e.target.files)}
          />
          <div
            role="button"
            tabIndex={0}
            onClick={() => inputRef.current?.click()}
            onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              void addFiles(e.dataTransfer.files);
            }}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
              dragOver
                ? "border-primary bg-primary/5"
                : "border-[var(--border-color)] bg-muted/20 hover:border-primary/45 hover:bg-muted/35"
            }`}
          >
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Upload className="h-6 w-6" />
            </div>
            <p className="font-semibold text-foreground">Drop images or click to upload</p>
            <p className="mt-1 text-sm text-muted-foreground">
              JPG, PNG, WebP · multiple files OK
            </p>
          </div>

          {items.length > 0 && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-bold text-foreground">
                  {items.length} file(s)
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clear}
                    className="text-red-600"
                  >
                    <Trash2 className="mr-1 h-4 w-4" /> Clear
                  </Button>
                  <Button size="sm" onClick={() => void convertAll()} disabled={busy}>
                    {busy ? (
                      <Loader2 className="mr-1 h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="mr-1 h-4 w-4" />
                    )}
                    Convert all to PNG
                  </Button>
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => void downloadAll()}
                    disabled={busy}
                  >
                    <Download className="mr-1 h-4 w-4" /> Download all
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="grid items-center gap-4 rounded-2xl border border-[var(--border-color)] bg-card p-4 md:grid-cols-[1fr_1fr_auto]"
                  >
                    <div>
                      <p className="mb-1 text-xs text-muted-foreground">Original</p>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={item.preview}
                        alt=""
                        className="h-28 w-full rounded-lg bg-muted/40 object-contain"
                      />
                      <p className="mt-1 truncate text-xs">
                        {item.file.name} · {formatBytes(item.file.size)}
                        {item.dims ? ` · ${item.dims.w}×${item.dims.h}` : ""}
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-muted-foreground">PNG result</p>
                      {item.resultUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.resultUrl}
                          alt=""
                          className="h-28 w-full rounded-lg bg-muted/40 object-contain"
                        />
                      ) : (
                        <div className="flex h-28 items-center justify-center rounded-lg bg-muted/40 text-xs text-muted-foreground">
                          Convert to preview
                        </div>
                      )}
                      {item.resultSize != null && (
                        <p className="mt-1 text-xs text-emerald-600">
                          PNG · {formatBytes(item.resultSize)}
                        </p>
                      )}
                    </div>
                    <Button
                      type="button"
                      onClick={() => void downloadOne(item)}
                      disabled={busy}
                      className="w-full md:w-auto"
                    >
                      <Download className="mr-1 h-4 w-4" /> PNG
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </PremiumToolWrapper>
  );
}
