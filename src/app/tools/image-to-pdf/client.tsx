'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Upload,
  Download,
  Trash2,
  Image as ImageIcon,
  Loader2,
  FileText,
  Shield,
  Zap,
  Layers,
  Merge,
  Scissors,
} from 'lucide-react';
import { toast } from 'sonner';
import { PDFDocument } from 'pdf-lib';
import { isImageFile } from '@/lib/image-client';
import { PremiumToolWrapper } from '@/components/PremiumToolWrapper';

interface ImageFile {
  id: string;
  file: File;
  name: string;
  preview: string;
}

const shellFeatures = [
  {
    title: '100% private',
    description: 'Images convert to PDF in your browser—nothing uploaded.',
    icon: Shield,
  },
  {
    title: 'Multi-image combine',
    description: 'Order photos/scans, then export one multi-page PDF.',
    icon: Layers,
  },
  {
    title: 'High quality output',
    description: 'Embeds images cleanly with optional A4 / Letter fit.',
    icon: Zap,
  },
];

const shellHowItWorks = [
  {
    step: 1,
    title: 'Upload images',
    desc: 'Drop JPG, PNG, WebP, and more.',
    icon: Upload,
    color: 'from-violet-500 to-fuchsia-500',
  },
  {
    step: 2,
    title: 'Reorder & options',
    desc: 'Set page order, size, and quality.',
    icon: Layers,
    color: 'from-indigo-500 to-violet-500',
  },
  {
    step: 3,
    title: 'Download PDF',
    desc: 'Get one clean PDF—no watermark.',
    icon: Download,
    color: 'from-fuchsia-500 to-pink-500',
  },
];

const shellRelated = [
  { name: 'Merge PDF', slug: 'merge-pdf', icon: Merge, color: 'text-violet-500' },
  { name: 'Split PDF', slug: 'split-pdf', icon: Scissors, color: 'text-blue-500' },
  { name: 'Image Compressor', slug: 'image-compressor', icon: Zap, color: 'text-amber-500' },
  { name: 'Compress PDF', slug: 'compress-pdf', icon: FileText, color: 'text-rose-500' },
];

export default function ImageToPDFClient() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [converting, setConverting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [pageMode, setPageMode] = useState<'original' | 'a4' | 'letter'>('original');
  const [margin, setMargin] = useState(36);
  const [jpegQuality, setJpegQuality] = useState(0.92);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (selectedFiles: FileList | null) => {
    if (!selectedFiles) return;
    setLoading(true);

    const imageFiles = Array.from(selectedFiles).filter(isImageFile);
    if (imageFiles.length === 0) {
      toast.error('Please select image files (JPG, PNG, WebP, etc.)');
      setLoading(false);
      return;
    }

    const newImages: ImageFile[] = await Promise.all(
      imageFiles.map(async (file) => ({
        id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        file,
        name: file.name,
        preview: URL.createObjectURL(file),
      })),
    );

    setImages((prev) => [...prev, ...newImages]);
    toast.success(`Added ${newImages.length} image(s)`);
    setLoading(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    await handleFileSelect(e.dataTransfer.files);
  };

  const removeImage = (id: string) => {
    setImages((prev) => {
      const target = prev.find((img) => img.id === id);
      if (target?.preview?.startsWith('blob:')) {
        URL.revokeObjectURL(target.preview);
      }
      return prev.filter((img) => img.id !== id);
    });
  };

  const clearAllImages = () => {
    setImages((prev) => {
      prev.forEach((img) => {
        if (img.preview?.startsWith('blob:')) URL.revokeObjectURL(img.preview);
      });
      return [];
    });
    toast.success('Cleared all images');
  };

  const moveImage = (index: number, dir: -1 | 1) => {
    setImages((prev) => {
      const next = [...prev];
      const j = index + dir;
      if (j < 0 || j >= next.length) return prev;
      [next[index], next[j]] = [next[j], next[index]];
      return next;
    });
  };

  const convertToJpegDataUrl = (file: File, quality: number): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0);
          }
          resolve(canvas.toDataURL('image/jpeg', quality));
        };
        img.onerror = reject;
        img.src = e.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const convertToPDF = async () => {
    if (images.length === 0) return;
    setConverting(true);

    try {
      const pdfDoc = await PDFDocument.create();
      for (const img of images) {
        const imgBytes = await img.file.arrayBuffer();
        let embeddedImg;

        if (img.file.type === 'image/png') {
          embeddedImg = await pdfDoc.embedPng(imgBytes);
        } else if (img.file.type === 'image/jpeg' || img.file.type === 'image/jpg') {
          embeddedImg = await pdfDoc.embedJpg(imgBytes);
        } else {
          const dataUrl = await convertToJpegDataUrl(img.file, jpegQuality);
          const base64 = dataUrl.split(',')[1];
          const jpgBytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
          embeddedImg = await pdfDoc.embedJpg(jpgBytes);
        }

        const imgW = embeddedImg.width;
        const imgH = embeddedImg.height;

        if (pageMode === 'original') {
          const page = pdfDoc.addPage([imgW, imgH]);
          page.drawImage(embeddedImg, {
            x: 0,
            y: 0,
            width: imgW,
            height: imgH,
          });
        } else {
          const box =
            pageMode === 'a4' ? { w: 595.28, h: 841.89 } : { w: 612, h: 792 };
          let pageW = box.w;
          let pageH = box.h;
          if (imgW > imgH && pageW < pageH) {
            pageW = box.h;
            pageH = box.w;
          }
          const maxW = Math.max(1, pageW - margin * 2);
          const maxH = Math.max(1, pageH - margin * 2);
          const scale = Math.min(maxW / imgW, maxH / imgH);
          const drawW = imgW * scale;
          const drawH = imgH * scale;
          const page = pdfDoc.addPage([pageW, pageH]);
          page.drawImage(embeddedImg, {
            x: (pageW - drawW) / 2,
            y: (pageH - drawH) / 2,
            width: drawW,
            height: drawH,
          });
        }
      }

      const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
      const pdfArrayBuffer = new ArrayBuffer(pdfBytes.byteLength);
      new Uint8Array(pdfArrayBuffer).set(pdfBytes);
      const blob = new Blob([pdfArrayBuffer], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `images-to-pdf-${images.length}p-${Date.now()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 2500);

      toast.success(`PDF created with ${images.length} page(s)!`);
    } catch (error) {
      toast.error('Failed to create PDF. Try JPG/PNG images (avoid exotic formats).');
      console.error('Convert error:', error);
    } finally {
      setConverting(false);
    }
  };

  return (
    <PremiumToolWrapper
      toolName="Convert Images to PDF Free – No Watermark"
      toolSlug="image-to-pdf"
      tagline="JPG, PNG & more into one PDF — private browser convert"
      description="Combine multiple images free—no signup, no watermark. Perfect for homework scans, forms, and portfolios."
      badge="Free converter · browser-private"
      category="PDF Tools"
      categorySlug="image-pdf-tools"
      features={shellFeatures}
      howItWorks={shellHowItWorks}
      relatedTools={shellRelated}
      ctaTitle="Ready to make a PDF?"
      ctaDescription="Upload images, set the order, and download one clean document."
      ctaButtonText="Start converting"
      ctaIcon={ImageIcon}
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

          <div
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleDrop}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all sm:p-10 ${
              dragOver
                ? 'border-primary bg-primary/5'
                : 'border-[var(--border-color)] bg-muted/20 hover:border-primary/45 hover:bg-muted/35'
            }`}
          >
            {loading ? (
              <Loader2 className="mx-auto h-11 w-11 animate-spin text-primary" />
            ) : (
              <>
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Upload className="h-7 w-7" />
                </div>
                <p className="mb-1.5 text-lg font-semibold text-foreground">
                  Drop images here or click to upload
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports JPG, PNG, WebP, and other image formats
                </p>
              </>
            )}
          </div>

          {images.length > 0 && (
            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="font-bold text-foreground">
                  {images.length} image{images.length > 1 ? 's' : ''} selected
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearAllImages}
                  className="text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <Trash2 className="mr-1 h-4 w-4" /> Clear
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
                {images.map((img, index) => (
                  <div key={img.id} className="group relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.preview}
                      alt={img.name}
                      className="h-20 w-full rounded-lg border border-[var(--border-color)] object-cover"
                    />
                    <span className="absolute bottom-1 left-1 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">
                      {index + 1}
                    </span>
                    <div className="absolute left-1 top-1 flex flex-col gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => moveImage(index, -1)}
                        className="rounded bg-white/90 px-1 text-xs font-bold text-muted-foreground disabled:opacity-30"
                        disabled={index === 0}
                        title="Move earlier"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        onClick={() => moveImage(index, 1)}
                        className="rounded bg-white/90 px-1 text-xs font-bold text-muted-foreground disabled:opacity-30"
                        disabled={index === images.length - 1}
                        title="Move later"
                      >
                        ↓
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeImage(img.id)}
                      className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label={`Remove ${img.name}`}
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">
                Hover a thumbnail to reorder pages (↑ ↓) before converting.
              </p>

              <div className="grid gap-4 rounded-xl border border-[var(--border-color)] bg-muted/30 p-4 sm:grid-cols-2">
                <label className="block space-y-1 text-sm">
                  <span className="font-medium">Page size</span>
                  <select
                    value={pageMode}
                    onChange={(e) =>
                      setPageMode(e.target.value as typeof pageMode)
                    }
                    className="input-surface h-11 w-full px-3"
                  >
                    <option value="original">
                      Original (1 image = 1 page, full size)
                    </option>
                    <option value="a4">Fit on A4</option>
                    <option value="letter">Fit on US Letter</option>
                  </select>
                </label>
                <label className="block space-y-1 text-sm">
                  <span className="font-medium">
                    Margin (when fitting page): {margin} pt
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={72}
                    value={margin}
                    disabled={pageMode === 'original'}
                    onChange={(e) => setMargin(parseInt(e.target.value, 10))}
                    className="w-full"
                  />
                </label>
                <label className="block space-y-1 text-sm sm:col-span-2">
                  <span className="font-medium">
                    Quality for non-JPG/PNG sources: {Math.round(jpegQuality * 100)}%
                  </span>
                  <input
                    type="range"
                    min={0.5}
                    max={1}
                    step={0.01}
                    value={jpegQuality}
                    onChange={(e) => setJpegQuality(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </label>
              </div>

              <Button
                onClick={convertToPDF}
                disabled={converting}
                className="btn-premium h-13 w-full gap-2 text-base font-bold"
              >
                {converting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" /> Converting…
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" /> Convert to PDF
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </PremiumToolWrapper>
  );
}
