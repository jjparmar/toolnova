"use client";

import { useCallback, useRef, useState } from "react";
import {
  Upload,
  Download,
  Trash2,
  Crop,
  Shield,
  Square,
  Loader2,
  RotateCw,
  FlipHorizontal2,
  FlipVertical2,
  Zap,
  Image as ImageIcon,
  Maximize2,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  InteractiveCropper,
  type CropRect,
} from "@/components/image/InteractiveCropper";
import {
  isImageFile,
  transformImageSrc,
  type RotateDeg,
} from "@/lib/image-client";
import { PremiumToolWrapper } from "@/components/PremiumToolWrapper";

const ASPECTS: { id: string; label: string; ratio: number | null }[] = [
  { id: "free", label: "Free", ratio: null },
  { id: "1", label: "1:1", ratio: 1 },
  { id: "4-3", label: "4:3", ratio: 4 / 3 },
  { id: "16-9", label: "16:9", ratio: 16 / 9 },
  { id: "3-2", label: "3:2", ratio: 3 / 2 },
  { id: "9-16", label: "9:16", ratio: 9 / 16 },
];

const shellFeatures = [
  {
    title: "Select any region",
    description: "Drag the box and use corner handles for precise crops.",
    icon: Crop,
  },
  {
    title: "Aspect presets",
    description: "1:1, 16:9, 9:16 and more for social & web.",
    icon: Square,
  },
  {
    title: "100% private",
    description: "Processed in your browser — images never upload.",
    icon: Shield,
  },
];

const shellHowItWorks = [
  {
    step: 1,
    title: "Upload image",
    desc: "Drop a JPG, PNG, or WebP file.",
    icon: Upload,
    color: "from-violet-500 to-fuchsia-500",
  },
  {
    step: 2,
    title: "Select crop",
    desc: "Drag the region, set aspect, rotate/flip if needed.",
    icon: Crop,
    color: "from-indigo-500 to-violet-500",
  },
  {
    step: 3,
    title: "Download",
    desc: "Export PNG, JPG, or WebP of the cropped area.",
    icon: Download,
    color: "from-fuchsia-500 to-pink-500",
  },
];

const shellRelated = [
  { name: "Resize Image", slug: "resize-image", icon: Maximize2, color: "text-blue-500" },
  { name: "Image Compressor", slug: "image-compressor", icon: Zap, color: "text-amber-500" },
  { name: "JPG to PNG", slug: "jpg-to-png", icon: ImageIcon, color: "text-cyan-500" },
  { name: "Image to PDF", slug: "image-to-pdf", icon: ImageIcon, color: "text-emerald-500" },
];

export default function ImageCropClient() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [nw, setNw] = useState(0);
  const [nh, setNh] = useState(0);
  const [crop, setCrop] = useState<CropRect>({ x: 0, y: 0, w: 100, h: 100 });
  const [aspectId, setAspectId] = useState("free");
  const [outputFormat, setOutputFormat] = useState<
    "image/png" | "image/jpeg" | "image/webp"
  >("image/png");
  const [resultUrl, setResultUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const aspectRatio = ASPECTS.find((a) => a.id === aspectId)?.ratio ?? null;

  const applyTransform = async (opts: {
    rotate?: RotateDeg;
    flipH?: boolean;
    flipV?: boolean;
  }) => {
    if (!preview) return;
    setBusy(true);
    try {
      const { dataUrl, width, height } = await transformImageSrc(preview, opts);
      setPreview(dataUrl);
      setNw(width);
      setNh(height);
      setResultUrl("");
      const w = Math.round(width * 0.8);
      const h = Math.round(height * 0.8);
      setCrop({
        x: Math.round((width - w) / 2),
        y: Math.round((height - h) / 2),
        w,
        h,
      });
      setAspectId("free");
      toast.success("Image updated — adjust crop if needed");
    } catch {
      toast.error("Transform failed");
    } finally {
      setBusy(false);
    }
  };

  const loadFile = (f: File) => {
    if (!isImageFile(f)) {
      toast.error("Please choose an image file");
      return;
    }
    if (f.size > 40 * 1024 * 1024) {
      toast.error("Please use an image under 40MB");
      return;
    }
    setFile(f);
    setResultUrl("");
    const reader = new FileReader();
    reader.onload = () => {
      const url = reader.result as string;
      setPreview(url);
      const img = new window.Image();
      img.onload = () => {
        setNw(img.width);
        setNh(img.height);
        const w = Math.round(img.width * 0.8);
        const h = Math.round(img.height * 0.8);
        setCrop({
          x: Math.round((img.width - w) / 2),
          y: Math.round((img.height - h) / 2),
          w,
          h,
        });
        setAspectId("free");
      };
      img.src = url;
    };
    reader.readAsDataURL(f);
  };

  const handleFiles = (list: FileList | null) => {
    if (list?.[0]) loadFile(list[0]);
  };

  const setAspect = (id: string) => {
    setAspectId(id);
    const ratio = ASPECTS.find((a) => a.id === id)?.ratio ?? null;
    if (!ratio || nw <= 0) return;
    let w = nw;
    let h = Math.round(w / ratio);
    if (h > nh) {
      h = nh;
      w = Math.round(h * ratio);
    }
    setCrop({
      x: Math.round((nw - w) / 2),
      y: Math.round((nh - h) / 2),
      w: Math.max(8, w),
      h: Math.max(8, h),
    });
  };

  const updateField = (key: keyof CropRect, raw: string) => {
    const n = parseInt(raw, 10);
    if (Number.isNaN(n)) return;
    setCrop((prev) => {
      const next = { ...prev, [key]: n };
      if (key === "x") next.x = Math.max(0, Math.min(n, nw - prev.w));
      if (key === "y") next.y = Math.max(0, Math.min(n, nh - prev.h));
      if (key === "w") {
        next.w = Math.max(8, Math.min(n, nw - prev.x));
        if (aspectRatio) next.h = Math.round(next.w / aspectRatio);
      }
      if (key === "h") {
        next.h = Math.max(8, Math.min(n, nh - prev.y));
        if (aspectRatio) next.w = Math.round(next.h * aspectRatio);
      }
      next.w = Math.min(next.w, nw - next.x);
      next.h = Math.min(next.h, nh - next.y);
      return next;
    });
  };

  const applyCrop = useCallback(async () => {
    if (!preview || crop.w < 1 || crop.h < 1) return;
    setBusy(true);
    try {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
      const img = new window.Image();
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("load failed"));
        img.src = preview;
      });
      const canvas = document.createElement("canvas");
      canvas.width = crop.w;
      canvas.height = crop.h;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("canvas");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      if (outputFormat === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, crop.w, crop.h);
      }
      ctx.drawImage(
        img,
        crop.x,
        crop.y,
        crop.w,
        crop.h,
        0,
        0,
        crop.w,
        crop.h,
      );
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(
          resolve,
          outputFormat,
          outputFormat === "image/png" ? undefined : 0.92,
        ),
      );
      if (!blob) throw new Error("export failed");
      setResultUrl(URL.createObjectURL(blob));
      toast.success(`Cropped to ${crop.w}×${crop.h}px`);
    } catch {
      toast.error("Could not crop image");
    } finally {
      setBusy(false);
    }
  }, [preview, crop, outputFormat, resultUrl]);

  const download = () => {
    if (!resultUrl) return;
    const ext =
      outputFormat === "image/jpeg"
        ? "jpg"
        : outputFormat === "image/webp"
          ? "webp"
          : "png";
    const base = (file?.name || "image").replace(/\.[^.]+$/, "");
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download = `${base}-cropped-${crop.w}x${crop.h}.${ext}`;
    a.click();
  };

  const reset = () => {
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setFile(null);
    setPreview("");
    setResultUrl("");
    setNw(0);
    setNh(0);
  };

  return (
    <PremiumToolWrapper
      toolName="Crop Image Free Online"
      toolSlug="image-crop"
      tagline="Drag to select the exact area — private browser tool"
      description="Drag the box to select the exact area you want. Resize handles on corners and edges — then download the crop. Free, no signup."
      badge="Free · private · browser-only"
      category="Image Tools"
      categorySlug="image-pdf-tools"
      features={shellFeatures}
      howItWorks={shellHowItWorks}
      relatedTools={shellRelated}
      ctaTitle="Ready to crop?"
      ctaDescription="Upload an image, select the region, and download PNG, JPG, or WebP."
      ctaButtonText="Start cropping"
      ctaIcon={Crop}
    >
      <div className="tool-shell">
        <div className="space-y-6 p-5 sm:p-7 md:p-8">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          {!file ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragOver(false);
                handleFiles(e.dataTransfer.files);
              }}
              className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all sm:p-12 ${
                dragOver
                  ? "border-primary bg-primary/5"
                  : "border-[var(--border-color)] bg-muted/20 hover:border-primary/45 hover:bg-muted/35"
              }`}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Upload className="h-7 w-7" />
              </div>
              <p className="mb-1 text-lg font-semibold text-foreground">
                Drop image or click to upload
              </p>
              <p className="text-sm text-muted-foreground">
                Then drag to select the crop region — JPG, PNG, WebP
              </p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm">
                  <p className="max-w-[240px] truncate font-semibold text-foreground">
                    {file.name}
                  </p>
                  <p className="text-muted-foreground">
                    Original {nw}×{nh}px · Selection {crop.w}×{crop.h}px
                  </p>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={reset}
                >
                  <Trash2 className="mr-1 h-4 w-4" /> Remove
                </Button>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">Rotate &amp; flip</p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={busy}
                    onClick={() => void applyTransform({ rotate: 90 })}
                  >
                    <RotateCw className="mr-1 h-4 w-4" /> 90°
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={busy}
                    onClick={() => void applyTransform({ rotate: 180 })}
                  >
                    180°
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={busy}
                    onClick={() => void applyTransform({ flipH: true })}
                  >
                    <FlipHorizontal2 className="mr-1 h-4 w-4" /> Flip H
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    disabled={busy}
                    onClick={() => void applyTransform({ flipV: true })}
                  >
                    <FlipVertical2 className="mr-1 h-4 w-4" /> Flip V
                  </Button>
                </div>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium">Aspect ratio</p>
                <div className="flex flex-wrap gap-2">
                  {ASPECTS.map((a) => (
                    <button
                      key={a.id}
                      type="button"
                      onClick={() => setAspect(a.id)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-bold transition-colors ${
                        aspectId === a.id
                          ? "border-primary bg-primary text-white"
                          : "border-[var(--border-color)] bg-card hover:border-primary/40"
                      }`}
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>

              <InteractiveCropper
                src={preview}
                naturalWidth={nw}
                naturalHeight={nh}
                value={crop}
                onChange={setCrop}
                aspectRatio={aspectRatio}
              />

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {(
                  [
                    ["x", "X (px)"],
                    ["y", "Y (px)"],
                    ["w", "Width"],
                    ["h", "Height"],
                  ] as const
                ).map(([key, label]) => (
                  <label key={key} className="space-y-1 text-xs font-medium">
                    <span className="text-muted-foreground">{label}</span>
                    <input
                      type="number"
                      value={crop[key]}
                      onChange={(e) => updateField(key, e.target.value)}
                      className="input-surface h-10 w-full px-3 text-sm"
                    />
                  </label>
                ))}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-1 text-sm">
                  <span className="font-medium">Output format</span>
                  <select
                    value={outputFormat}
                    onChange={(e) =>
                      setOutputFormat(e.target.value as typeof outputFormat)
                    }
                    className="input-surface h-11 w-full px-3"
                  >
                    <option value="image/png">PNG</option>
                    <option value="image/jpeg">JPG</option>
                    <option value="image/webp">WebP</option>
                  </select>
                </label>
                <div className="flex items-end">
                  <Button
                    type="button"
                    className="btn-premium h-11 w-full font-bold"
                    onClick={() => void applyCrop()}
                    disabled={busy}
                  >
                    {busy ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <Crop className="mr-2 h-4 w-4" />
                    )}
                    Apply crop
                  </Button>
                </div>
              </div>

              {resultUrl && (
                <div className="space-y-3 rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className="font-semibold text-emerald-800">
                      Cropped preview ({crop.w}×{crop.h})
                    </p>
                    <Button
                      type="button"
                      onClick={download}
                      className="rounded-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resultUrl}
                    alt="Cropped result"
                    className="mx-auto max-h-64 rounded-lg object-contain"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </PremiumToolWrapper>
  );
}
