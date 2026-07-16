"use client";

import { useCallback, useRef, useState } from"react";
import { useRouter } from"next/navigation";
import Link from"next/link";
import {
  Upload,
  Download,
  Trash2,
  Crop,
  ArrowLeft,
  Shield,
  Square,
  Loader2,
  RotateCw,
  FlipHorizontal2,
  FlipVertical2,
} from"lucide-react";
import { toast } from"sonner";
import { Button } from"@/components/ui/button";
import {
  InteractiveCropper,
  type CropRect,
} from"@/components/image/InteractiveCropper";
import {
  isImageFile,
  transformImageSrc,
  type RotateDeg,
} from"@/lib/image-client";

const relatedTools = [
  { name:"Resize Image", slug:"resize-image" },
  { name:"Image Compressor", slug:"image-compressor" },
  { name:"Reorder PDF", slug:"reorder-pdf" },
  { name:"Image to PDF", slug:"image-to-pdf" },
];

const ASPECTS: { id: string; label: string; ratio: number | null; icon?: React.ReactNode }[] = [
  { id:"free", label:"Free", ratio: null },
  { id:"1", label:"1:1", ratio: 1 },
  { id:"4-3", label:"4:3", ratio: 4 / 3 },
  { id:"16-9", label:"16:9", ratio: 16 / 9 },
  { id:"3-2", label:"3:2", ratio: 3 / 2 },
  { id:"9-16", label:"9:16", ratio: 9 / 16 },
];

export default function ImageCropClient() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [nw, setNw] = useState(0);
  const [nh, setNh] = useState(0);
  const [crop, setCrop] = useState<CropRect>({ x: 0, y: 0, w: 100, h: 100 });
  const [aspectId, setAspectId] = useState("free");
  const [outputFormat, setOutputFormat] = useState<"image/png" |"image/jpeg" |"image/webp">("image/png",
  );
  const [resultUrl, setResultUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const aspectRatio =
    ASPECTS.find((a) => a.id === aspectId)?.ratio ?? null;

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
        // Default crop: centered 80%
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
    // Fit largest rectangle of aspect inside image, centered
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
      if (key ==="x") next.x = Math.max(0, Math.min(n, nw - prev.w));
      if (key ==="y") next.y = Math.max(0, Math.min(n, nh - prev.h));
      if (key ==="w") {
        next.w = Math.max(8, Math.min(n, nw - prev.x));
        if (aspectRatio) next.h = Math.round(next.w / aspectRatio);
      }
      if (key ==="h") {
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
      ctx.imageSmoothingQuality ="high";
      if (outputFormat ==="image/jpeg") {
        ctx.fillStyle ="#ffffff";
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
          outputFormat ==="image/png" ? undefined : 0.92,
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
      outputFormat ==="image/jpeg"
        ?"jpg"
        : outputFormat ==="image/webp"
          ?"webp"
          :"png";
    const base = (file?.name ||"image").replace(/\.[^.]+$/,"");
    const a = document.createElement("a");
    a.href = resultUrl;
    a.download =`${base}-cropped-${crop.w}x${crop.h}.${ext}`;
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
    <div className="flex-1 w-full min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-10">
        <button
          type="button"
          onClick={() => router.back()}
          className="group flex items-center gap-2 mb-4 px-4 py-2 rounded-xl bg-background/60 border border-border/50 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </button>

        <div className="flex flex-wrap gap-2 mb-6 justify-center text-sm">
          <Link href="/" className="text-muted-foreground hover:text-primary">
            Home
          </Link>
          <span className="text-muted-foreground/50">/</span>
          <Link href="/tools" className="text-muted-foreground hover:text-primary">
            Tools
          </Link>
          <span className="text-muted-foreground/50">/</span>
          <Link
            href="/tools/image-pdf-tools"
            className="text-muted-foreground hover:text-primary"
          >
            Image & PDF
          </Link>
          <span className="text-muted-foreground/50">/</span>
          <span className="text-primary font-semibold">Crop Image</span>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 text-violet-600 text-sm font-semibold mb-4">
            <Crop className="h-4 w-4" /> Free · Private · Browser-only
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
            Crop Image
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Drag the box to select the exact area you want. Resize handles on
            corners and edges — then download the crop.
          </p>
        </div>

        <div className="bg-white/90 rounded-3xl shadow-2xl border border-border/40 overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">
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
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                  dragOver
                    ?"border-primary bg-primary/5"
                    :"border-border/50 hover:border-primary/50"
                }`}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-lg font-semibold mb-1">
                  Drop image or click to upload
                </p>
                <p className="text-sm text-muted-foreground">
                  Then drag to select the crop region — JPG, PNG, WebP
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="text-sm">
                    <p className="font-semibold truncate max-w-[240px]">
                      {file.name}
                    </p>
                    <p className="text-muted-foreground">
                      Original {nw}×{nh}px · Selection {crop.w}×{crop.h}px
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-red-600"
                    onClick={reset}
                  >
                    <Trash2 className="h-4 w-4 mr-1" /> Remove
                  </Button>
                </div>

                {/* Rotate / flip before crop */}
                <div>
                  <p className="text-sm font-medium mb-2">Rotate &amp; flip</p>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={busy}
                      onClick={() => applyTransform({ rotate: 90 })}
                    >
                      <RotateCw className="h-4 w-4 mr-1" /> 90°
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={busy}
                      onClick={() => applyTransform({ rotate: 180 })}
                    >
                      180°
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={busy}
                      onClick={() => applyTransform({ flipH: true })}
                    >
                      <FlipHorizontal2 className="h-4 w-4 mr-1" /> Flip H
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      disabled={busy}
                      onClick={() => applyTransform({ flipV: true })}
                    >
                      <FlipVertical2 className="h-4 w-4 mr-1" /> Flip V
                    </Button>
                  </div>
                </div>

                {/* Aspect presets */}
                <div>
                  <p className="text-sm font-medium mb-2">Aspect ratio</p>
                  <div className="flex flex-wrap gap-2">
                    {ASPECTS.map((a) => (
                      <button
                        key={a.id}
                        type="button"
                        onClick={() => setAspect(a.id)}
                        className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                          aspectId === a.id
                            ?"bg-primary text-white border-primary"
                            :"bg-slate-50  border-border/50"
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

                {/* Numeric controls */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {(
                    [
                      ["x","X (px)"],
                      ["y","Y (px)"],
                      ["w","Width"],
                      ["h","Height"],
                    ] as const
                  ).map(([key, label]) => (
                    <label key={key} className="text-xs font-medium space-y-1">
                      <span className="text-muted-foreground">{label}</span>
                      <input
                        type="number"
                        value={crop[key]}
                        onChange={(e) => updateField(key, e.target.value)}
                        className="w-full h-10 rounded-xl border border-border/50 bg-card/40 backdrop-blur-md px-3 text-sm"
                      />
                    </label>
                  ))}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <label className="text-sm space-y-1">
                    <span className="font-medium">Output format</span>
                    <select
                      value={outputFormat}
                      onChange={(e) =>
                        setOutputFormat(
                          e.target.value as typeof outputFormat,
                        )
                      }
                      className="w-full h-11 rounded-xl border border-border/50 bg-card/40 backdrop-blur-md px-3"
                    >
                      <option value="image/png">PNG</option>
                      <option value="image/jpeg">JPG</option>
                      <option value="image/webp">WebP</option>
                    </select>
                  </label>
                  <div className="flex items-end gap-2">
                    <Button
                      type="button"
                      className="flex-1 h-11 rounded-xl font-bold"
                      onClick={applyCrop}
                      disabled={busy}
                    >
                      {busy ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <Crop className="h-4 w-4 mr-2" />
                      )}
                      Apply crop
                    </Button>
                  </div>
                </div>

                {resultUrl && (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-semibold text-emerald-800">
                        Cropped preview ({crop.w}×{crop.h})
                      </p>
                      <Button
                        type="button"
                        onClick={download}
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        <Download className="h-4 w-4 mr-2" /> Download
                      </Button>
                    </div>
                    <img
                      src={resultUrl}
                      alt="Cropped result"
                      className="max-h-64 mx-auto object-contain rounded-lg"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className="mt-10 grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: Crop,
              title:"Select any region",
              desc:"Drag the box and use corner handles for precise crops",
            },
            {
              icon: Square,
              title:"Aspect presets",
              desc:"1:1, 16:9, 9:16 and more for social & web",
            },
            {
              icon: Shield,
              title:"100% private",
              desc:"Processed in your browser — images never upload",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border/40 p-5"
            >
              <f.icon className="h-6 w-6 text-primary mb-2" />
              <p className="font-bold text-sm">{f.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm">
          <p className="font-semibold mb-2">Related tools</p>
          <div className="flex flex-wrap gap-3">
            {relatedTools.map((t) => (
              <Link
                key={t.slug}
                href={`/tools/${t.slug}`}
                className="underline underline-offset-4 hover:text-primary"
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
