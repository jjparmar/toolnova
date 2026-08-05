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
    description: "Browser-only — images never upload to a server.",
    icon: Shield,
  },
  {
    title: "Transparency handled",
    description: "Pick a fill color for clear PNG backgrounds.",
    icon: ImageIcon,
  },
  {
    title: "Quality slider",
    description: "Balance JPG size vs clarity for web and email.",
    icon: Zap,
  },
];

const shellHowItWorks = [
  {
    step: 1,
    title: "Upload images",
    desc: "PNG, WebP, or JPG — batch supported.",
    icon: Upload,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    step: 2,
    title: "Set quality & background",
    desc: "Tune JPG quality and fill color for transparency.",
    icon: Sparkles,
    color: "from-indigo-500 to-violet-500",
  },
  {
    step: 3,
    title: "Convert & download",
    desc: "Export smaller JPGs ready for web or portals.",
    icon: Download,
    color: "from-fuchsia-500 to-pink-500",
  },
];

const shellRelated = [
  { name: "JPG to PNG", slug: "jpg-to-png", icon: ImageIcon, color: "text-cyan-500" },
  { name: "Image Compressor", slug: "image-compressor", icon: Zap, color: "text-amber-500" },
  { name: "Crop Image", slug: "image-crop", icon: Crop, color: "text-violet-500" },
  { name: "Image to PDF", slug: "image-to-pdf", icon: Layers, color: "text-emerald-500" },
];

export default function PNGtoJPGClient() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [quality, setQuality] = useState(90);
  const [bg, setBg] = useState("#ffffff");
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
      mime: "image/jpeg",
      quality: quality / 100,
      fill: bg,
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
      for (const item of items) out.push(await convertOne(item));
      setItems(out);
      toast.success(`Converted ${out.length} image(s) to JPG`);
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
    const blob = await (await fetch(url)).blob();
    downloadBlob(blob, `${baseName(item.file.name)}.jpg`);
  };

  const clear = () => {
    items.forEach((i) => i.resultUrl && URL.revokeObjectURL(i.resultUrl));
    setItems([]);
  };

  return (
    <PremiumToolWrapper
      toolName="PNG to JPG Converter Free"
      toolSlug="png-to-jpg"
      tagline="Convert PNG/WebP to JPG with quality control — private browser tool"
      description="Convert PNG/WebP to JPG with quality control and background color for transparency. Batch support · no signup."
      badge="Free converter · browser-private"
      category="Image Tools"
      categorySlug="image-pdf-tools"
      features={shellFeatures}
      howItWorks={shellHowItWorks}
      relatedTools={shellRelated}
      ctaTitle="Ready to convert to JPG?"
      ctaDescription="Upload images, set quality, and download smaller JPGs for web and email."
      ctaButtonText="Start converting"
      ctaIcon={ImageIcon}
    >
      <div className="tool-shell">
        <div className="space-y-6 p-5 sm:p-7 md:p-8">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => void addFiles(e.target.files)}
          />
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
              PNG, WebP, JPG · batch OK
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block space-y-2 text-sm">
              <span className="font-medium">JPG quality: {quality}%</span>
              <input
                type="range"
                min={40}
                max={100}
                value={quality}
                onChange={(e) => setQuality(parseInt(e.target.value, 10))}
                className="w-full"
              />
              <span className="text-xs text-muted-foreground">
                Higher = larger file, better quality
              </span>
            </label>
            <label className="block space-y-2 text-sm">
              <span className="font-medium">Background (for transparent PNG)</span>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={bg}
                  onChange={(e) => setBg(e.target.value)}
                  className="h-11 w-16 cursor-pointer rounded-lg border"
                />
                <input
                  type="text"
                  value={bg}
                  onChange={(e) => setBg(e.target.value)}
                  className="input-surface h-11 flex-1 px-3 font-mono text-sm"
                />
              </div>
            </label>
          </div>

          {items.length > 0 && (
            <>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-bold">{items.length} file(s)</p>
                <div className="flex gap-2">
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
                    Convert all
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
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs text-muted-foreground">JPG result</p>
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
                          JPG · {formatBytes(item.resultSize)}
                          {item.file.size
                            ? ` (${Math.round(
                                (1 - item.resultSize / item.file.size) * 100,
                              )}% vs original)`
                            : ""}
                        </p>
                      )}
                    </div>
                    <Button onClick={() => void downloadOne(item)} disabled={busy}>
                      <Download className="mr-1 h-4 w-4" /> JPG
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
