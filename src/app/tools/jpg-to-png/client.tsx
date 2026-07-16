"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Upload,
  Download,
  Trash2,
  Image as ImageIcon,
  Loader2,
  ArrowLeft,
  Shield,
  Zap,
  Sparkles,
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

const related = [
  { name: "PNG to JPG", href: "/tools/png-to-jpg" },
  { name: "Crop Image", href: "/tools/image-crop" },
  { name: "Image Compressor", href: "/tools/image-compressor" },
  { name: "Image to PDF", href: "/tools/image-to-pdf" },
];

type Item = {
  id: string;
  file: File;
  preview: string;
  resultUrl?: string;
  resultSize?: number;
  dims?: { w: number; h: number };
};

export default function JPGtoPNGClient() {
  const router = useRouter();
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
    let size = item.resultSize;
    if (!url) {
      const updated = await convertOne(item);
      url = updated.resultUrl!;
      size = updated.resultSize;
      setItems((prev) =>
        prev.map((p) => (p.id === item.id ? updated : p)),
      );
    }
    const res = await fetch(url);
    const blob = await res.blob();
    downloadBlob(blob, `${baseName(item.file.name)}.png`);
    void size;
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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-[#0f1419] dark:to-background">
      <div className="max-w-[1000px] mx-auto px-4 py-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black mb-2">JPG to PNG Converter</h1>
          <p className="text-muted-foreground">
            Convert images to PNG with full quality. Batch support · private browser processing.
          </p>
        </div>

        <div className="rounded-3xl border border-border/40 bg-card/40 backdrop-blur-md p-6 md:p-8 shadow-xl space-y-6">
          <input
            ref={inputRef}
            type="file"
            accept="image/*,.jpg,.jpeg,.png,.webp"
            multiple
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
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
              addFiles(e.dataTransfer.files);
            }}
            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer ${
              dragOver ? "border-primary bg-primary/5" : "border-border/50"
            }`}
          >
            <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
            <p className="font-semibold">Drop images or click to upload</p>
            <p className="text-sm text-muted-foreground mt-1">
              JPG, PNG, WebP · multiple files OK
            </p>
          </div>

          {items.length > 0 && (
            <>
              <div className="flex flex-wrap gap-2 justify-between items-center">
                <p className="font-bold text-sm">{items.length} file(s)</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" onClick={clear} className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-1" /> Clear
                  </Button>
                  <Button size="sm" onClick={convertAll} disabled={busy}>
                    {busy ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-1" />
                    ) : (
                      <Sparkles className="h-4 w-4 mr-1" />
                    )}
                    Convert all to PNG
                  </Button>
                  <Button size="sm" variant="secondary" onClick={downloadAll} disabled={busy}>
                    <Download className="h-4 w-4 mr-1" /> Download all
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-border/40 p-4 grid md:grid-cols-[1fr_1fr_auto] gap-4 items-center"
                  >
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Original</p>
                      <img
                        src={item.preview}
                        alt=""
                        className="h-28 w-full object-contain rounded-lg bg-slate-50 "
                      />
                      <p className="text-xs mt-1 truncate">
                        {item.file.name} · {formatBytes(item.file.size)}
                        {item.dims ? ` · ${item.dims.w}×${item.dims.h}` : ""}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">PNG result</p>
                      {item.resultUrl ? (
                        <img
                          src={item.resultUrl}
                          alt=""
                          className="h-28 w-full object-contain rounded-lg bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiI+PHJlY3Qgd2lkdGg9IjgiIGhlaWdodD0iOCIgZmlsbD0iI2VlZSIvPjxyZWN0IHg9IjgiIHk9IjgiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNlZWUiLz48L3N2Zz4=')] bg-slate-50 "
                        />
                      ) : (
                        <div className="h-28 rounded-lg bg-slate-50  flex items-center justify-center text-xs text-muted-foreground">
                          Convert to preview
                        </div>
                      )}
                      {item.resultSize != null && (
                        <p className="text-xs mt-1 text-emerald-600">
                          PNG · {formatBytes(item.resultSize)}
                        </p>
                      )}
                    </div>
                    <Button
                      type="button"
                      onClick={() => downloadOne(item)}
                      disabled={busy}
                      className="w-full md:w-auto"
                    >
                      <Download className="h-4 w-4 mr-1" /> PNG
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {[
            { icon: Shield, t: "Private", d: "Never leaves your browser" },
            { icon: ImageIcon, t: "Full quality", d: "Lossless PNG export" },
            { icon: Zap, t: "Batch ready", d: "Convert many images at once" },
          ].map((x) => (
            <div key={x.t} className="rounded-2xl border p-4">
              <x.icon className="h-5 w-5 text-primary mb-2" />
              <p className="font-bold text-sm">{x.t}</p>
              <p className="text-xs text-muted-foreground">{x.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3 text-sm">
          {related.map((r) => (
            <Link key={r.href} href={r.href} className="underline underline-offset-4 hover:text-primary">
              {r.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
