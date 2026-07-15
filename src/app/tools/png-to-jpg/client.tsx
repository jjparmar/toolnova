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
  readFileAsDataURL,
} from "@/lib/image-client";

const related = [
  { name: "JPG to PNG", href: "/tools/jpg-to-png" },
  { name: "Crop Image", href: "/tools/image-crop" },
  { name: "Image Compressor", href: "/tools/image-compressor" },
  { name: "Resize Image", href: "/tools/resize-image" },
];

type Item = {
  id: string;
  file: File;
  preview: string;
  resultUrl?: string;
  resultSize?: number;
  dims?: { w: number; h: number };
};

export default function PNGtoJPGClient() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [quality, setQuality] = useState(90);
  const [bg, setBg] = useState("#ffffff");
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const addFiles = async (list: FileList | null) => {
    if (!list?.length) return;
    const files = Array.from(list).filter((f) => f.type.startsWith("image/"));
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
          <h1 className="text-4xl font-black mb-2">PNG to JPG Converter</h1>
          <p className="text-muted-foreground">
            Convert PNG/WebP to JPG with quality control and background color for transparency.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:p-8 shadow-xl space-y-6">
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => addFiles(e.target.files)}
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
              addFiles(e.dataTransfer.files);
            }}
            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer ${
              dragOver ? "border-primary bg-primary/5" : "border-slate-200 dark:border-slate-700"
            }`}
          >
            <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
            <p className="font-semibold">Drop images or click to upload</p>
            <p className="text-sm text-muted-foreground mt-1">PNG, WebP, JPG · batch OK</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <label className="text-sm space-y-2 block">
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
            <label className="text-sm space-y-2 block">
              <span className="font-medium">Background (for transparent PNG)</span>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={bg}
                  onChange={(e) => setBg(e.target.value)}
                  className="h-11 w-16 rounded-lg border cursor-pointer"
                />
                <input
                  type="text"
                  value={bg}
                  onChange={(e) => setBg(e.target.value)}
                  className="flex-1 h-11 rounded-xl border px-3 font-mono text-sm"
                />
              </div>
            </label>
          </div>

          {items.length > 0 && (
            <>
              <div className="flex flex-wrap gap-2 justify-between">
                <p className="font-bold text-sm">{items.length} file(s)</p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={clear} className="text-red-600">
                    <Trash2 className="h-4 w-4 mr-1" /> Clear
                  </Button>
                  <Button size="sm" onClick={convertAll} disabled={busy}>
                    {busy ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-1" />
                    ) : (
                      <Sparkles className="h-4 w-4 mr-1" />
                    )}
                    Convert all
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl border p-4 grid md:grid-cols-[1fr_1fr_auto] gap-4 items-center"
                  >
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Original</p>
                      <img
                        src={item.preview}
                        alt=""
                        className="h-28 w-full object-contain rounded-lg bg-slate-50 dark:bg-slate-800"
                      />
                      <p className="text-xs mt-1 truncate">
                        {item.file.name} · {formatBytes(item.file.size)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">JPG result</p>
                      {item.resultUrl ? (
                        <img
                          src={item.resultUrl}
                          alt=""
                          className="h-28 w-full object-contain rounded-lg bg-slate-50 dark:bg-slate-800"
                        />
                      ) : (
                        <div className="h-28 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-xs text-muted-foreground">
                          Convert to preview
                        </div>
                      )}
                      {item.resultSize != null && (
                        <p className="text-xs mt-1 text-emerald-600">
                          JPG · {formatBytes(item.resultSize)} (
                          {item.file.size
                            ? `${Math.round((1 - item.resultSize / item.file.size) * 100)}% vs original`
                            : ""}
                          )
                        </p>
                      )}
                    </div>
                    <Button onClick={() => downloadOne(item)} disabled={busy}>
                      <Download className="h-4 w-4 mr-1" /> JPG
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {[
            { icon: Shield, t: "Private", d: "Browser-only conversion" },
            { icon: ImageIcon, t: "Transparency handled", d: "Pick fill color for clear PNGs" },
            { icon: Zap, t: "Quality slider", d: "Balance size vs clarity" },
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
