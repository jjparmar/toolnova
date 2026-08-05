'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Upload,
  Download,
  Maximize2,
  Loader2,
  Shield,
  Sparkles,
  Image as ImageIcon,
  FileText,
  RotateCw,
  FlipHorizontal2,
  Crop,
  Zap,
} from 'lucide-react';
import { toast } from 'sonner';
import { isImageFile, transformImageSrc } from '@/lib/image-client';
import { PremiumToolWrapper } from '@/components/PremiumToolWrapper';

const SIZE_PRESETS = [
  { label: 'Instagram square', w: 1080, h: 1080 },
  { label: 'Story 9:16', w: 1080, h: 1920 },
  { label: 'YouTube thumb', w: 1280, h: 720 },
  { label: 'HD 1920', w: 1920, h: 1080 },
  { label: 'Avatar 400', w: 400, h: 400 },
  { label: '50%', w: 0, h: 0, pct: 50 },
  { label: '25%', w: 0, h: 0, pct: 25 },
] as const;

const shellFeatures = [
  {
    title: '100% private',
    description: 'Processed locally in your browser — no uploads.',
    icon: Shield,
  },
  {
    title: 'Exact dimensions',
    description: 'Resize to specific pixel sizes or percentage presets.',
    icon: Maximize2,
  },
  {
    title: 'High quality',
    description: 'Smooth scaling with optional rotate and flip.',
    icon: Sparkles,
  },
];

const shellHowItWorks = [
  {
    step: 1,
    title: 'Upload image',
    desc: 'Drop a JPG, PNG, or WebP file.',
    icon: Upload,
    color: 'from-violet-500 to-fuchsia-500',
  },
  {
    step: 2,
    title: 'Set dimensions',
    desc: 'Use presets or enter width & height.',
    icon: Maximize2,
    color: 'from-indigo-500 to-violet-500',
  },
  {
    step: 3,
    title: 'Download',
    desc: 'Get the resized file in original format.',
    icon: Download,
    color: 'from-fuchsia-500 to-pink-500',
  },
];

const shellRelated = [
  { name: 'Crop Image', slug: 'image-crop', icon: Crop, color: 'text-violet-500' },
  { name: 'Image Compressor', slug: 'image-compressor', icon: Zap, color: 'text-amber-500' },
  { name: 'JPG to PNG', slug: 'jpg-to-png', icon: ImageIcon, color: 'text-cyan-500' },
  { name: 'Image to PDF', slug: 'image-to-pdf', icon: FileText, color: 'text-emerald-500' },
];

export default function ResizeImageClient() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [resizing, setResizing] = useState(false);
  const [originalWidth, setOriginalWidth] = useState<number>(0);
  const [originalHeight, setOriginalHeight] = useState<number>(0);
  const [targetWidth, setTargetWidth] = useState<number>(0);
  const [targetHeight, setTargetHeight] = useState<number>(0);
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
  const [resizedUrl, setResizedUrl] = useState<string>('');
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const file = files[0];
    if (!isImageFile(file)) {
      toast.error('Please select an image file');
      return;
    }
    if (resizedUrl) URL.revokeObjectURL(resizedUrl);
    setImage(file);
    setResizedUrl('');
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      const img = new window.Image();
      img.onload = () => {
        setOriginalWidth(img.naturalWidth || img.width);
        setOriginalHeight(img.naturalHeight || img.height);
        setTargetWidth(img.naturalWidth || img.width);
        setTargetHeight(img.naturalHeight || img.height);
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const handleWidthChange = (val: string) => {
    const w = parseInt(val) || 0;
    setTargetWidth(w);
    if (maintainAspectRatio && originalWidth > 0 && originalHeight > 0) {
      setTargetHeight(Math.round((w / originalWidth) * originalHeight));
    }
  };

  const handleHeightChange = (val: string) => {
    const h = parseInt(val) || 0;
    setTargetHeight(h);
    if (maintainAspectRatio && originalWidth > 0 && originalHeight > 0) {
      setTargetWidth(Math.round((h / originalHeight) * originalWidth));
    }
  };

  const resizeImage = async () => {
    if (!image || targetWidth <= 0 || targetHeight <= 0) {
      toast.error('Invalid dimensions');
      return;
    }
    setResizing(true);

    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new window.Image();

      img.onload = () => {
        const maxDim = 12000;
        if (targetWidth > maxDim || targetHeight > maxDim) {
          toast.error(`Max dimension is ${maxDim}px per side`);
          setResizing(false);
          return;
        }
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        if (ctx) {
          ctx.imageSmoothingEnabled = true;
          ctx.imageSmoothingQuality = 'high';
          if (
            (image.type || '').includes('jpeg') ||
            (image.type || '').includes('jpg')
          ) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, targetWidth, targetHeight);
          }
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
        }

        const mime =
          image.type === 'image/png' || image.type === 'image/webp'
            ? image.type
            : 'image/jpeg';
        canvas.toBlob(
          (blob) => {
            if (blob) {
              if (resizedUrl) URL.revokeObjectURL(resizedUrl);
              const url = URL.createObjectURL(blob);
              setResizedUrl(url);
              toast.success(`Resized to ${targetWidth}×${targetHeight}!`);
            }
            setResizing(false);
          },
          mime,
          mime === 'image/jpeg' ? 0.95 : undefined,
        );
      };
      img.src = preview;
    } catch {
      toast.error('Failed to resize image');
      setResizing(false);
    }
  };

  const downloadResized = () => {
    if (!resizedUrl) return;
    const base = (image?.name || 'image').replace(/\.[^.]+$/, '');
    const ext =
      image?.type === 'image/png'
        ? 'png'
        : image?.type === 'image/webp'
          ? 'webp'
          : 'jpg';
    const a = document.createElement('a');
    a.href = resizedUrl;
    a.download = `resized-${targetWidth}x${targetHeight}-${base}.${ext}`;
    a.click();
  };

  const clear = () => {
    if (resizedUrl) URL.revokeObjectURL(resizedUrl);
    setImage(null);
    setPreview('');
    setResizedUrl('');
  };

  return (
    <PremiumToolWrapper
      toolName="Resize Image Free Online"
      toolSlug="resize-image"
      tagline="Exact pixel dimensions instantly — private browser tool"
      description="Resize images to exact pixel dimensions or percentage presets. Free, no signup, processed in your browser."
      badge="Free image resizer · browser-private"
      category="Image Tools"
      categorySlug="image-pdf-tools"
      features={shellFeatures}
      howItWorks={shellHowItWorks}
      relatedTools={shellRelated}
      ctaTitle="Ready to resize?"
      ctaDescription="Upload an image, set width and height, and download the result."
      ctaButtonText="Start resizing"
      ctaIcon={Maximize2}
    >
      <div className="tool-shell">
        <div className="p-5 sm:p-7 md:p-8">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileSelect(e.target.files)}
            accept="image/*"
            className="hidden"
          />

          {!image ? (
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
              className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
                dragOver
                  ? 'border-primary bg-primary/5'
                  : 'border-[var(--border-color)] bg-muted/20 hover:border-primary/45 hover:bg-muted/35'
              }`}
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Upload className="h-7 w-7" />
              </div>
              <p className="mb-1.5 text-lg font-semibold text-foreground">
                Drop image here or click to upload
              </p>
              <p className="text-sm text-muted-foreground">
                JPG, PNG, WebP supported
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="truncate font-semibold text-lg text-foreground">
                  {image.name}
                </h3>
                <button
                  type="button"
                  onClick={clear}
                  className="text-sm font-medium text-red-500 hover:text-red-600"
                >
                  Remove
                </button>
              </div>

              <div className="flex max-h-[300px] justify-center overflow-hidden rounded-xl border border-[var(--border-color)] bg-muted/40 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={preview}
                  alt="Preview"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    try {
                      const { dataUrl, width, height } = await transformImageSrc(
                        preview,
                        { rotate: 90 },
                      );
                      setPreview(dataUrl);
                      setOriginalWidth(width);
                      setOriginalHeight(height);
                      setTargetWidth(width);
                      setTargetHeight(height);
                      setResizedUrl('');
                      toast.success('Rotated 90°');
                    } catch {
                      toast.error('Rotate failed');
                    }
                  }}
                >
                  <RotateCw className="mr-1 h-4 w-4" /> Rotate 90°
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    try {
                      const { dataUrl, width, height } = await transformImageSrc(
                        preview,
                        { flipH: true },
                      );
                      setPreview(dataUrl);
                      setOriginalWidth(width);
                      setOriginalHeight(height);
                      setResizedUrl('');
                      toast.success('Flipped horizontally');
                    } catch {
                      toast.error('Flip failed');
                    }
                  }}
                >
                  <FlipHorizontal2 className="mr-1 h-4 w-4" /> Flip H
                </Button>
                <Link href="/tools/image-crop" className="inline-flex">
                  <Button type="button" variant="outline" size="sm">
                    Crop region →
                  </Button>
                </Link>
              </div>

              <div>
                <p className="mb-2 text-sm font-medium text-muted-foreground">
                  Quick size presets
                </p>
                <div className="flex flex-wrap gap-2">
                  {SIZE_PRESETS.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      onClick={() => {
                        if ('pct' in p && p.pct) {
                          const w = Math.max(
                            1,
                            Math.round((originalWidth * p.pct) / 100),
                          );
                          const h = Math.max(
                            1,
                            Math.round((originalHeight * p.pct) / 100),
                          );
                          setTargetWidth(w);
                          setTargetHeight(h);
                        } else {
                          setTargetWidth(p.w);
                          setTargetHeight(p.h);
                        }
                      }}
                      className="rounded-full border border-[var(--border-color)] bg-card px-3 py-1.5 text-xs font-bold hover:border-primary/50"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  Need to cut a region first?{' '}
                  <Link
                    href="/tools/image-crop"
                    className="font-medium text-primary underline underline-offset-2"
                  >
                    Open Crop Image
                  </Link>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Width (px)
                  </label>
                  <input
                    type="number"
                    value={targetWidth}
                    onChange={(e) => handleWidthChange(e.target.value)}
                    className="input-surface w-full p-3 outline-none transition-all focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">
                    Height (px)
                  </label>
                  <input
                    type="number"
                    value={targetHeight}
                    onChange={(e) => handleHeightChange(e.target.value)}
                    className="input-surface w-full p-3 outline-none transition-all focus:ring-2 focus:ring-primary/30"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="maintainAspect"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                  className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                />
                <label
                  htmlFor="maintainAspect"
                  className="cursor-pointer text-sm font-medium"
                >
                  Maintain aspect ratio
                </label>
              </div>

              <p className="text-sm text-muted-foreground">
                Original: {originalWidth}×{originalHeight} px → Target:{' '}
                {targetWidth}×{targetHeight} px
              </p>

              <Button
                type="button"
                onClick={() => void resizeImage()}
                disabled={resizing}
                className="btn-premium h-13 w-full gap-2 text-base font-bold"
              >
                {resizing ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Resizing…
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-5 w-5" /> Resize image
                  </>
                )}
              </Button>

              {resizedUrl && (
                <div className="space-y-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-bold text-emerald-700">
                        Resized successfully
                      </p>
                      <p className="text-sm text-emerald-600">
                        {targetWidth}×{targetHeight} px
                      </p>
                    </div>
                    <Button
                      onClick={downloadResized}
                      className="rounded-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={resizedUrl}
                    alt="Resized preview"
                    className="mx-auto max-h-48 rounded-lg object-contain"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </PremiumToolWrapper>
  );
}
