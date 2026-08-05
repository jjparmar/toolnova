'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Upload,
  Download,
  Trash2,
  Image as ImageIcon,
  Loader2,
  Shield,
  Zap,
  Layers,
  FileText,
  CheckCircle2,
  Crop,
} from 'lucide-react';
import { toast } from 'sonner';
import {
  isImageFile,
  compressImageFile,
  extForMime,
  baseName,
  downloadBlob,
  formatBytes,
} from '@/lib/image-client';
import JSZip from 'jszip';
import { PremiumToolWrapper } from '@/components/PremiumToolWrapper';

const shellFeatures = [
  {
    title: '100% private',
    description: 'Compression runs fully in your browser—images never leave your device.',
    icon: Shield,
  },
  {
    title: 'Adjustable quality',
    description: 'Control quality, max width, and output format for web or email.',
    icon: Zap,
  },
  {
    title: 'Single or batch',
    description: 'Compress one image or up to 30 at once and download a ZIP.',
    icon: Layers,
  },
];

const shellHowItWorks = [
  {
    step: 1,
    title: 'Upload image(s)',
    desc: 'Drop JPG, PNG, or WebP — single or batch.',
    icon: Upload,
    color: 'from-violet-500 to-fuchsia-500',
  },
  {
    step: 2,
    title: 'Set quality',
    desc: 'Pick format, max width, and quality slider.',
    icon: Zap,
    color: 'from-indigo-500 to-violet-500',
  },
  {
    step: 3,
    title: 'Download',
    desc: 'Save the smaller file or a ZIP of the batch.',
    icon: Download,
    color: 'from-fuchsia-500 to-pink-500',
  },
];

const shellRelated = [
  { name: 'Image to PDF', slug: 'image-to-pdf', icon: FileText, color: 'text-emerald-500' },
  { name: 'Crop Image', slug: 'image-crop', icon: Crop, color: 'text-violet-500' },
  { name: 'Compress PDF', slug: 'compress-pdf', icon: FileText, color: 'text-rose-500' },
  { name: 'JPG to PNG', slug: 'jpg-to-png', icon: ImageIcon, color: 'text-cyan-500' },
];

export default function ImageCompressorClient() {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const [compressing, setCompressing] = useState(false);
    const [quality, setQuality] = useState(75);
    const [maxWidth, setMaxWidth] = useState(0); // 0 = original
    const [outputFormat, setOutputFormat] = useState<'auto' | 'image/jpeg' | 'image/webp' | 'image/png'>('auto');
    const [actualFormat, setActualFormat] = useState<string>('image/jpeg');
    const [originalSize, setOriginalSize] = useState<number>(0);
    const [compressedSize, setCompressedSize] = useState<number>(0);
    const [compressedUrl, setCompressedUrl] = useState<string>('');
    const [dragOver, setDragOver] = useState(false);
    const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
    const [note, setNote] = useState<string>('');
    type BatchItem = { id: string; file: File; status: 'pending' | 'done' | 'error'; originalSize: number; compressedSize?: number; url?: string; mime?: string; error?: string };
    const [batchItems, setBatchItems] = useState<BatchItem[]>([]);
    const [batchMode, setBatchMode] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const handleFileSelect = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        const list = Array.from(files).filter(isImageFile).slice(0, 30);
        if (!list.length) {
            toast.error('Please select image files (JPG, PNG, WebP)');
            return;
        }
        if (list.some((f) => f.size > 40 * 1024 * 1024)) {
            toast.error('Each image must be under 40MB');
            return;
        }
        if (list.length > 1) {
            setBatchMode(true);
            setImage(null);
            setPreview('');
            if (compressedUrl) URL.revokeObjectURL(compressedUrl);
            setCompressedUrl('');
            setBatchItems(list.map((file, i) => ({
                id: `${Date.now()}-${i}`,
                file,
                status: 'pending' as const,
                originalSize: file.size,
            })));
            toast.success(`${list.length} images ready for batch compress`);
            return;
        }
        setBatchMode(false);
        setBatchItems([]);
        const file = list[0];
        setImage(file);
        setOriginalSize(file.size);
        setCompressedUrl('');
        setCompressedSize(0);
        setDims(null);
        setNote('');
        setOutputFormat('auto');

        const reader = new FileReader();
        reader.onload = (e) => {
            const url = e.target?.result as string;
            setPreview(url);
            const probe = new window.Image();
            probe.onload = () => setDims({ w: probe.width, h: probe.height });
            probe.src = url;
        };
        reader.readAsDataURL(file);
    };

    const compressBatch = async () => {
        if (!batchItems.length || compressing) return;
        setCompressing(true);
        const next = [...batchItems];
        for (let i = 0; i < next.length; i++) {
            const item = next[i];
            try {
                const res = await compressImageFile(item.file, {
                    quality,
                    maxWidth,
                    outputFormat,
                });
                if (item.url) URL.revokeObjectURL(item.url);
                next[i] = {
                    ...item,
                    status: 'done',
                    compressedSize: res.blob.size,
                    url: URL.createObjectURL(res.blob),
                    mime: res.mime,
                };
            } catch (e) {
                next[i] = {
                    ...item,
                    status: 'error',
                    error: e instanceof Error ? e.message : 'Failed',
                };
            }
            setBatchItems([...next]);
        }
        setCompressing(false);
        const ok = next.filter((x) => x.status === 'done').length;
        toast.success(`Compressed ${ok}/${next.length} images`);
    };

    const downloadBatchZip = async () => {
        const done = batchItems.filter((x) => x.status === 'done' && x.url);
        if (!done.length) return;
        const zip = new JSZip();
        for (const item of done) {
            const res = await fetch(item.url!);
            const blob = await res.blob();
            const ext = extForMime(item.mime || 'image/jpeg');
            zip.file(`compressed-${baseName(item.file.name)}.${ext}`, blob);
        }
        const out = await zip.generateAsync({ type: 'blob' });
        downloadBlob(out, `compressed-images-${Date.now()}.zip`);
        toast.success('ZIP download started');
    };

    const quantizeCanvas = (ctx: CanvasRenderingContext2D, w: number, h: number, q: number) => {
        if (q >= 98) return;
        try {
            const imageData = ctx.getImageData(0, 0, w, h);
            const data = imageData.data;
            const step = Math.max(2, Math.round(((100 - q) / 100) * 28));
            for (let i = 0; i < data.length; i += 4) {
                data[i] = Math.min(255, Math.round(data[i] / step) * step);
                data[i + 1] = Math.min(255, Math.round(data[i + 1] / step) * step);
                data[i + 2] = Math.min(255, Math.round(data[i + 2] / step) * step);
            }
            ctx.putImageData(imageData, 0, 0);
        } catch {
            // Ignore canvas error if any
        }
    };

    const getCanvasBlob = (canvas: HTMLCanvasElement, mime: string, q: number): Promise<Blob | null> => {
        return new Promise((resolve) => {
            canvas.toBlob((blob) => resolve(blob), mime, mime === 'image/png' ? undefined : q);
        });
    };

    const compressImage = async () => {
        if (!image || !preview) return;
        setCompressing(true);
        setNote('');

        try {
            if (compressedUrl) URL.revokeObjectURL(compressedUrl);

            const img = new window.Image();
            img.onload = async () => {
                let w = img.width;
                let h = img.height;
                if (maxWidth > 0 && w > maxWidth) {
                    h = Math.round((h * maxWidth) / w);
                    w = maxWidth;
                }

                const createCanvas = (fillWhite = false) => {
                    const c = document.createElement('canvas');
                    c.width = w;
                    c.height = h;
                    const ctx = c.getContext('2d');
                    if (ctx) {
                        ctx.imageSmoothingEnabled = true;
                        ctx.imageSmoothingQuality = 'high';
                        if (fillWhite) {
                            ctx.fillStyle = '#ffffff';
                            ctx.fillRect(0, 0, w, h);
                        }
                        ctx.drawImage(img, 0, 0, w, h);
                    }
                    return { canvas: c, ctx };
                };

                let finalBlob: Blob | null = null;
                let usedMime = outputFormat === 'auto' ? 'image/jpeg' : outputFormat;
                let customNote = '';

                if (outputFormat === 'auto') {
                    const { canvas: testCanvas, ctx: testCtx } = createCanvas(false);
                    let hasAlpha = false;
                    if (testCtx) {
                        const data = testCtx.getImageData(0, 0, w, h).data;
                        for (let i = 3; i < data.length; i += 4) {
                            if (data[i] < 255) {
                                hasAlpha = true;
                                break;
                            }
                        }
                    }

                    if (hasAlpha) {
                        usedMime = 'image/webp';
                        finalBlob = await getCanvasBlob(testCanvas, 'image/webp', quality / 100);
                        if (!finalBlob) {
                            if (testCtx) quantizeCanvas(testCtx, w, h, quality);
                            finalBlob = await getCanvasBlob(testCanvas, 'image/png', 1);
                            usedMime = 'image/png';
                        }
                    } else {
                        const webpBlob = await getCanvasBlob(testCanvas, 'image/webp', quality / 100);
                        const { canvas: jpegCanvas } = createCanvas(true);
                        const jpegBlob = await getCanvasBlob(jpegCanvas, 'image/jpeg', quality / 100);

                        if (webpBlob && jpegBlob) {
                            if (webpBlob.size <= jpegBlob.size) {
                                finalBlob = webpBlob;
                                usedMime = 'image/webp';
                            } else {
                                finalBlob = jpegBlob;
                                usedMime = 'image/jpeg';
                            }
                        } else {
                            finalBlob = webpBlob || jpegBlob;
                            usedMime = webpBlob ? 'image/webp' : 'image/jpeg';
                        }
                    }
                } else if (outputFormat === 'image/png') {
                    const { canvas, ctx } = createCanvas(false);
                    if (ctx && quality < 100) {
                        quantizeCanvas(ctx, w, h, quality);
                    }
                    finalBlob = await getCanvasBlob(canvas, 'image/png', 1);
                    usedMime = 'image/png';

                    if (finalBlob && finalBlob.size >= originalSize && maxWidth === 0) {
                        const webpBlob = await getCanvasBlob(canvas, 'image/webp', Math.min(quality, 80) / 100);
                        if (webpBlob && webpBlob.size < originalSize) {
                            finalBlob = webpBlob;
                            usedMime = 'image/webp';
                            customNote = 'Original PNG re-encoding increased size. Automatically converted to WebP for maximum compression.';
                        }
                    }
                } else if (outputFormat === 'image/jpeg') {
                    const { canvas } = createCanvas(true);
                    finalBlob = await getCanvasBlob(canvas, 'image/jpeg', quality / 100);
                    usedMime = 'image/jpeg';
                } else if (outputFormat === 'image/webp') {
                    const { canvas } = createCanvas(false);
                    finalBlob = await getCanvasBlob(canvas, 'image/webp', quality / 100);
                    usedMime = 'image/webp';
                }

                if (finalBlob && finalBlob.size >= originalSize && quality > 40 && usedMime !== 'image/png') {
                    const lowerQ = Math.max(30, quality - 25);
                    const { canvas } = createCanvas(usedMime === 'image/jpeg');
                    const retryBlob = await getCanvasBlob(canvas, usedMime, lowerQ / 100);
                    if (retryBlob && retryBlob.size < finalBlob.size) {
                        finalBlob = retryBlob;
                        if (!customNote) customNote = `Auto-adjusted quality to ${lowerQ}% to guarantee smaller file size.`;
                    }
                }

                if (finalBlob) {
                    setCompressedSize(finalBlob.size);
                    setActualFormat(usedMime);
                    const url = URL.createObjectURL(finalBlob);
                    setCompressedUrl(url);
                    setNote(customNote);
                    const saved = originalSize - finalBlob.size;
                    toast.success(
                        saved > 0
                            ? `Compressed! Saved ${formatSize(saved)} (${Math.round((saved / originalSize) * 100)}% smaller)`
                            : 'Compression complete! Try lowering quality or dimensions for further reduction.',
                    );
                } else {
                    toast.error('Compression failed for this format');
                }
                setCompressing(false);
            };
            img.onerror = () => {
                toast.error('Could not load image');
                setCompressing(false);
            };
            img.src = preview;
        } catch {
            toast.error('Failed to compress image');
            setCompressing(false);
        }
    };

    const downloadCompressed = () => {
        if (!compressedUrl) return;
        const ext =
            actualFormat === 'image/png'
                ? 'png'
                : actualFormat === 'image/webp'
                  ? 'webp'
                  : 'jpg';
        const base = (image?.name || 'image').replace(/\.[^.]+$/, '');
        const a = document.createElement('a');
        a.href = compressedUrl;
        a.download = `compressed-${base}.${ext}`;
        a.click();
    };

    const reduction = originalSize > 0 && compressedSize > 0
        ? Math.round(((originalSize - compressedSize) / originalSize) * 100)
        : 0;

    return (
      <PremiumToolWrapper
        toolName="Compress Images Without Losing Quality Free"
        toolSlug="image-compressor"
        tagline="Shrink JPG, PNG & WebP for web and email — private browser tool"
        description="Reduce image file size free—no watermark, no signup. Files stay on your device. Single image or batch up to 30."
        badge="Free compressor · browser-private"
        category="Image Tools"
        categorySlug="image-pdf-tools"
        features={shellFeatures}
        howItWorks={shellHowItWorks}
        relatedTools={shellRelated}
        ctaTitle="Ready to shrink images?"
        ctaDescription="Upload photos, tune quality, and download smaller files for web, email, or slides."
        ctaButtonText="Start compressing"
        ctaIcon={Zap}
      >
        <div className="tool-shell">
          <div className="p-5 sm:p-7 md:p-8">
            <input
              type="file"
              ref={fileInputRef}
              onChange={(e) => handleFileSelect(e.target.files)}
              accept="image/*"
              multiple
              className="hidden"
            />

            {batchMode && batchItems.length > 0 ? (
              <div className="space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <p className="font-semibold text-foreground">
                    {batchItems.length} images selected
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      batchItems.forEach((b) => b.url && URL.revokeObjectURL(b.url));
                      setBatchItems([]);
                      setBatchMode(false);
                    }}
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="mr-1 h-4 w-4" /> Clear
                  </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Output format</label>
                    <select
                      value={outputFormat}
                      onChange={(e) =>
                        setOutputFormat(e.target.value as typeof outputFormat)
                      }
                      className="input-surface h-11 w-full px-3 text-sm"
                    >
                      <option value="auto">Auto (smallest)</option>
                      <option value="image/webp">WebP</option>
                      <option value="image/jpeg">JPG</option>
                      <option value="image/png">PNG</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Max width</label>
                    <select
                      value={maxWidth}
                      onChange={(e) => setMaxWidth(parseInt(e.target.value, 10))}
                      className="input-surface h-11 w-full px-3 text-sm"
                    >
                      <option value={0}>Original</option>
                      <option value={1920}>1920px</option>
                      <option value={1280}>1280px</option>
                      <option value={800}>800px</option>
                      <option value={400}>400px</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="font-medium">Quality: {quality}%</label>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button
                    onClick={() => void compressBatch()}
                    disabled={compressing}
                    className="btn-premium h-12 flex-1"
                  >
                    {compressing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Compressing batch…
                      </>
                    ) : (
                      <>
                        <Zap className="mr-2 h-4 w-4" /> Compress all
                      </>
                    )}
                  </Button>
                  {batchItems.some((b) => b.status === 'done') && (
                    <Button
                      onClick={() => void downloadBatchZip()}
                      variant="outline"
                      className="h-12 rounded-full font-bold"
                    >
                      <Download className="mr-2 h-4 w-4" /> Download ZIP
                    </Button>
                  )}
                </div>
                <ul className="max-h-80 divide-y divide-border overflow-auto rounded-xl border border-[var(--border-color)] bg-card">
                  {batchItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-3 px-3 py-2.5 text-sm"
                    >
                      <span className="truncate font-medium">{item.file.name}</span>
                      <span className="shrink-0 text-muted-foreground">
                        {item.status === 'pending' && formatBytes(item.originalSize)}
                        {item.status === 'done' && item.compressedSize != null && (
                          <span className="font-semibold text-emerald-700">
                            {formatBytes(item.originalSize)} →{' '}
                            {formatBytes(item.compressedSize)}
                          </span>
                        )}
                        {item.status === 'error' && (
                          <span className="text-red-600">{item.error || 'Error'}</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ) : !image ? (
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
                  handleFileSelect(e.dataTransfer.files);
                }}
                className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all sm:p-10 ${
                  dragOver
                    ? 'scale-[1.01] border-primary bg-primary/5'
                    : 'border-[var(--border-color)] bg-muted/20 hover:border-primary/45 hover:bg-muted/35'
                }`}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Upload className="h-7 w-7" />
                </div>
                <p className="mb-1.5 text-lg font-semibold text-foreground">
                  Drop images here or click to upload
                </p>
                <p className="text-sm text-muted-foreground">
                  JPG, PNG, WebP · single or batch (up to 30) · processed in your browser
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center gap-4 rounded-xl border border-[var(--border-color)] bg-card p-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium text-foreground">{image.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Original: {formatSize(originalSize)}
                      {dims ? ` · ${dims.w}×${dims.h}px` : ''}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (compressedUrl) URL.revokeObjectURL(compressedUrl);
                      setImage(null);
                      setPreview('');
                      setCompressedUrl('');
                      setDims(null);
                      setNote('');
                    }}
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    aria-label="Remove image"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Output format
                    </label>
                    <select
                      value={outputFormat}
                      onChange={(e) =>
                        setOutputFormat(e.target.value as typeof outputFormat)
                      }
                      className="input-surface h-11 w-full px-3 text-sm font-medium"
                    >
                      <option value="auto">Auto (Recommended - Smallest Size)</option>
                      <option value="image/webp">WebP (Modern, High Compression)</option>
                      <option value="image/jpeg">JPG (Best for Photos)</option>
                      <option value="image/png">PNG (Lossless / Transparent)</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Max width (optional)
                    </label>
                    <select
                      value={maxWidth}
                      onChange={(e) => setMaxWidth(parseInt(e.target.value, 10))}
                      className="input-surface h-11 w-full px-3 text-sm font-medium"
                    >
                      <option value={0}>Keep original size</option>
                      <option value={1920}>1920px (Full HD)</option>
                      <option value={1280}>1280px</option>
                      <option value={800}>800px (blog)</option>
                      <option value={400}>400px (thumbnail)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="font-medium text-foreground">
                      Quality: {quality}%
                    </label>
                    <span className="text-sm text-muted-foreground">
                      {quality < 50
                        ? 'Smaller file'
                        : quality < 80
                          ? 'Balanced'
                          : 'High quality'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={quality}
                    onChange={(e) => setQuality(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <Button
                  onClick={compressImage}
                  disabled={compressing}
                  className="btn-premium h-13 w-full gap-2 text-base font-bold"
                >
                  {compressing ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" /> Compressing…
                    </>
                  ) : (
                    <>
                      <Zap className="h-5 w-5" /> Compress image
                    </>
                  )}
                </Button>

                {compressedUrl && (
                  <div className="space-y-4 rounded-2xl border border-emerald-200 bg-emerald-50/90 p-5">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                      <div>
                        <div className="mb-1 flex flex-wrap items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                          <p className="text-lg font-bold text-emerald-800">
                            Compression ready
                          </p>
                          <span className="rounded-full bg-emerald-200 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
                            {actualFormat.replace('image/', '')}
                          </span>
                        </div>
                        <p className="text-sm text-emerald-700">
                          {formatSize(originalSize)} →{' '}
                          <span className="font-bold">{formatSize(compressedSize)}</span>
                          {reduction > 0 ? (
                            <span className="ml-2 rounded-md bg-emerald-200/70 px-2 py-0.5 font-bold text-emerald-800">
                              ↓ {reduction}% smaller
                            </span>
                          ) : (
                            <span className="ml-2 text-amber-700">
                              (Same size — lower quality for more compression)
                            </span>
                          )}
                        </p>
                        {note && (
                          <p className="mt-1.5 text-xs font-medium text-emerald-800/90">
                            💡 {note}
                          </p>
                        )}
                      </div>
                      <Button
                        onClick={downloadCompressed}
                        className="rounded-full bg-emerald-600 px-6 font-bold text-white hover:bg-emerald-700"
                      >
                        <Download className="mr-2 h-4 w-4" /> Download
                      </Button>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <p className="mb-1 text-xs text-muted-foreground">
                          Original ({formatSize(originalSize)})
                        </p>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={preview}
                          alt="Original"
                          className="h-32 w-full rounded-lg border border-[var(--border-color)] bg-card object-contain"
                        />
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-muted-foreground">
                          Compressed ({formatSize(compressedSize)})
                        </p>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={compressedUrl}
                          alt="Compressed preview"
                          className="h-32 w-full rounded-lg border border-[var(--border-color)] bg-card object-contain"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </PremiumToolWrapper>
    );
}
