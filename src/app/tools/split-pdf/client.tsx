'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  Upload,
  Download,
  Trash2,
  FileText,
  Loader2,
  CheckCircle2,
  Scissors,
  Shield,
  Zap,
  Layers,
  Merge,
} from 'lucide-react';
import { toast } from 'sonner';
import { PDFDocument } from 'pdf-lib';
import { downloadBytes, isPdfFile, zipPdfFiles } from '@/lib/pdf-client';
import { PremiumToolWrapper } from '@/components/PremiumToolWrapper';

const shellFeatures = [
  {
    title: '100% private',
    description: 'Splitting runs fully in your browser—no server upload.',
    icon: Shield,
  },
  {
    title: 'Flexible extract modes',
    description: 'Split all pages, a continuous range, or pick specific pages.',
    icon: Scissors,
  },
  {
    title: 'Instant download',
    description: 'Get a ZIP of pages or a single extract PDF immediately.',
    icon: Zap,
  },
];

const shellHowItWorks = [
  {
    step: 1,
    title: 'Upload PDF',
    desc: 'Drop a multi-page PDF into the workspace.',
    icon: Upload,
    color: 'from-violet-500 to-fuchsia-500',
  },
  {
    step: 2,
    title: 'Choose mode',
    desc: 'All pages, page range, or hand-picked pages.',
    icon: Scissors,
    color: 'from-indigo-500 to-violet-500',
  },
  {
    step: 3,
    title: 'Download',
    desc: 'Export a ZIP or a single extracted PDF.',
    icon: Download,
    color: 'from-fuchsia-500 to-pink-500',
  },
];

const shellRelated = [
  { name: 'Merge PDF', slug: 'merge-pdf', icon: Merge, color: 'text-violet-500' },
  { name: 'Compress PDF', slug: 'compress-pdf', icon: FileText, color: 'text-rose-500' },
  { name: 'Image to PDF', slug: 'image-to-pdf', icon: Layers, color: 'text-emerald-500' },
  { name: 'Reorder PDF', slug: 'reorder-pdf', icon: Layers, color: 'text-indigo-500' },
];

export default function SplitPDFClient() {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [splitting, setSplitting] = useState(false);
  const [splitMode, setSplitMode] = useState<'all' | 'range' | 'pages'>('all');
  const [rangeStart, setRangeStart] = useState<number>(1);
  const [rangeEnd, setRangeEnd] = useState<number>(1);
  const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
  const [dragOver, setDragOver] = useState(false);
  const [allAsZip, setAllAsZip] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (selectedFiles: FileList | null) => {
    if (!selectedFiles || selectedFiles.length === 0) return;
    const selectedFile = selectedFiles[0];

    if (!isPdfFile(selectedFile)) {
      toast.error('Please select a PDF file.');
      return;
    }

    setLoading(true);
    try {
      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });
      const pages = pdfDoc.getPageCount();

      setFile(selectedFile);
      setPageCount(pages);
      setRangeEnd(pages);
      setSelectedPages(new Set());
      toast.success(`Loaded PDF with ${pages} pages`);
    } catch {
      toast.error("Failed to load PDF. Make sure it's a valid PDF file.");
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    await handleFileSelect(e.dataTransfer.files);
  };

  const downloadPDF = (pdfBytes: Uint8Array, filename: string) => {
    downloadBytes(pdfBytes, filename, 'application/pdf');
  };

  const splitPDF = async () => {
    if (!file) return;
    setSplitting(true);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer, { ignoreEncryption: true });

      if (splitMode === 'all') {
        if (allAsZip) {
          const parts: { name: string; bytes: Uint8Array }[] = [];
          for (let i = 0; i < pageCount; i++) {
            const newPdf = await PDFDocument.create();
            const [page] = await newPdf.copyPages(pdfDoc, [i]);
            newPdf.addPage(page);
            const pdfBytes = await newPdf.save({ useObjectStreams: false });
            parts.push({
              name: `page-${String(i + 1).padStart(3, '0')}.pdf`,
              bytes: pdfBytes,
            });
          }
          const zipBlob = await zipPdfFiles(parts);
          const url = URL.createObjectURL(zipBlob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `${(file.name || 'document').replace(/\.pdf$/i, '')}-pages.zip`;
          a.click();
          setTimeout(() => URL.revokeObjectURL(url), 3000);
          toast.success(`ZIP ready with ${pageCount} page PDFs`);
        } else {
          for (let i = 0; i < pageCount; i++) {
            const newPdf = await PDFDocument.create();
            const [page] = await newPdf.copyPages(pdfDoc, [i]);
            newPdf.addPage(page);
            const pdfBytes = await newPdf.save({ useObjectStreams: false });
            downloadPDF(pdfBytes, `page-${i + 1}.pdf`);
            if (pageCount > 1 && i < pageCount - 1) {
              await new Promise((r) => setTimeout(r, 120));
            }
          }
          toast.success(
            `Split into ${pageCount} downloads. Allow multiple downloads if asked.`,
          );
        }
      } else if (splitMode === 'range') {
        if (rangeStart > rangeEnd) {
          toast.error('Start page must be ≤ end page');
          setSplitting(false);
          return;
        }
        const newPdf = await PDFDocument.create();
        const pageIndices: number[] = [];
        for (let i = rangeStart - 1; i < rangeEnd; i++) {
          pageIndices.push(i);
        }
        const pages = await newPdf.copyPages(pdfDoc, pageIndices);
        pages.forEach((page) => newPdf.addPage(page));

        const pdfBytes = await newPdf.save({ useObjectStreams: false });
        downloadPDF(pdfBytes, `pages-${rangeStart}-to-${rangeEnd}.pdf`);
        toast.success(`Extracted pages ${rangeStart} to ${rangeEnd}!`);
      } else if (splitMode === 'pages') {
        const indices = [...selectedPages].sort((a, b) => a - b);
        if (indices.length === 0) {
          toast.error('Select at least one page');
          setSplitting(false);
          return;
        }
        const newPdf = await PDFDocument.create();
        const pages = await newPdf.copyPages(pdfDoc, indices);
        pages.forEach((page) => newPdf.addPage(page));
        const pdfBytes = await newPdf.save({ useObjectStreams: false });
        const label = indices.map((i) => i + 1).join('-');
        downloadPDF(pdfBytes, `pages-${label}.pdf`);
        toast.success(`Extracted ${indices.length} selected page(s)!`);
      }
    } catch (error) {
      toast.error('Failed to split PDF. Please try again.');
      console.error('Split error:', error);
    } finally {
      setSplitting(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setPageCount(0);
    setSelectedPages(new Set());
  };

  return (
    <PremiumToolWrapper
      toolName="Split PDF into Separate Pages Free"
      toolSlug="split-pdf"
      tagline="Extract pages or ranges online — private browser tool"
      description="Extract specific pages or ranges online—no watermark, no signup. Private browser tool for school portals and email."
      badge="Free PDF tool · browser-private"
      category="PDF Tools"
      categorySlug="image-pdf-tools"
      features={shellFeatures}
      howItWorks={shellHowItWorks}
      relatedTools={shellRelated}
      ctaTitle="Ready to split your PDF?"
      ctaDescription="Upload a file, choose all pages, a range, or pick pages, then download."
      ctaButtonText="Start splitting"
      ctaIcon={Scissors}
    >
      <div className="tool-shell">
        <div className="p-5 sm:p-7 md:p-8">
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => handleFileSelect(e.target.files)}
            accept=".pdf,application/pdf"
            className="hidden"
          />

          {!file ? (
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
                  ? 'scale-[1.01] border-primary bg-primary/5'
                  : 'border-[var(--border-color)] bg-muted/20 hover:border-primary/45 hover:bg-muted/35'
              }`}
            >
              {loading ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="h-11 w-11 animate-spin text-primary" />
                  <p className="text-muted-foreground">Loading PDF…</p>
                </div>
              ) : (
                <>
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Upload className="h-7 w-7" />
                  </div>
                  <p className="mb-1.5 text-lg font-semibold text-foreground">
                    Drop PDF here or click to upload
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Select a PDF file to split into pages or ranges
                  </p>
                </>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4 rounded-xl border border-[var(--border-color)] bg-card p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-foreground">{file.name}</p>
                  <p className="text-sm text-muted-foreground">{pageCount} pages</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearFile}
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  aria-label="Remove file"
                >
                  <Trash2 className="h-5 w-5" />
                </Button>
              </div>

              <div className="space-y-4">
                <p className="font-semibold text-foreground">Split mode</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {(
                    [
                      {
                        id: 'all' as const,
                        title: 'All pages',
                        desc: 'ZIP or multi-download',
                        Icon: Scissors,
                      },
                      {
                        id: 'range' as const,
                        title: 'Page range',
                        desc: 'From–to continuous',
                        Icon: FileText,
                      },
                      {
                        id: 'pages' as const,
                        title: 'Pick pages',
                        desc: 'Select specific pages',
                        Icon: CheckCircle2,
                      },
                    ] as const
                  ).map(({ id, title, desc, Icon }) => (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setSplitMode(id)}
                      className={`rounded-xl border-2 p-4 text-center transition-all ${
                        splitMode === id
                          ? 'border-primary bg-primary/5 ring-1 ring-primary/20'
                          : 'border-[var(--border-color)] hover:border-primary/30'
                      }`}
                    >
                      <Icon className="mx-auto mb-2 h-6 w-6 text-primary" />
                      <p className="font-medium text-foreground">{title}</p>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </button>
                  ))}
                </div>

                {splitMode === 'all' && (
                  <label className="flex cursor-pointer items-start gap-2 rounded-xl border border-[var(--border-color)] bg-muted/30 p-3 text-sm">
                    <input
                      type="checkbox"
                      checked={allAsZip}
                      onChange={(e) => setAllAsZip(e.target.checked)}
                      className="mt-0.5 rounded border-border"
                    />
                    <span>
                      <strong>Download as ZIP</strong>
                      <span className="text-muted-foreground">
                        {' '}
                        (page-001.pdf, page-002.pdf, …) — recommended
                      </span>
                    </span>
                  </label>
                )}

                {splitMode === 'range' && (
                  <div className="flex flex-wrap items-center gap-3 rounded-xl border border-[var(--border-color)] bg-muted/30 p-4">
                    <label className="text-sm font-medium">From page:</label>
                    <input
                      type="number"
                      min={1}
                      max={pageCount}
                      value={rangeStart}
                      onChange={(e) =>
                        setRangeStart(
                          Math.min(
                            Math.max(1, parseInt(e.target.value) || 1),
                            pageCount,
                          ),
                        )
                      }
                      className="input-surface h-10 w-20 px-3 text-sm"
                    />
                    <label className="text-sm font-medium">to:</label>
                    <input
                      type="number"
                      min={rangeStart}
                      max={pageCount}
                      value={rangeEnd}
                      onChange={(e) =>
                        setRangeEnd(
                          Math.min(
                            Math.max(
                              rangeStart,
                              parseInt(e.target.value) || rangeStart,
                            ),
                            pageCount,
                          ),
                        )
                      }
                      className="input-surface h-10 w-20 px-3 text-sm"
                    />
                  </div>
                )}

                {splitMode === 'pages' && (
                  <div className="space-y-3 rounded-xl border border-[var(--border-color)] bg-muted/30 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-sm font-medium">
                        Tap pages to include ({selectedPages.size} selected)
                      </p>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="text-xs font-semibold text-primary hover:text-primary/80"
                          onClick={() =>
                            setSelectedPages(
                              new Set(
                                Array.from({ length: pageCount }, (_, i) => i),
                              ),
                            )
                          }
                        >
                          Select all
                        </button>
                        <button
                          type="button"
                          className="text-xs font-semibold text-muted-foreground hover:text-foreground"
                          onClick={() => setSelectedPages(new Set())}
                        >
                          Clear
                        </button>
                      </div>
                    </div>
                    <div className="custom-scrollbar flex max-h-48 flex-wrap gap-2 overflow-y-auto">
                      {Array.from({ length: pageCount }, (_, i) => {
                        const on = selectedPages.has(i);
                        return (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setSelectedPages((prev) => {
                                const next = new Set(prev);
                                if (next.has(i)) next.delete(i);
                                else next.add(i);
                                return next;
                              });
                            }}
                            className={`h-10 min-w-10 rounded-lg border px-2 text-sm font-bold transition-colors ${
                              on
                                ? 'border-primary bg-primary text-primary-foreground'
                                : 'border-[var(--border-color)] bg-card hover:border-primary/50 hover:bg-muted'
                            }`}
                          >
                            {i + 1}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Selected pages are merged into one PDF in page order.
                    </p>
                  </div>
                )}
              </div>

              <Button
                type="button"
                onClick={splitPDF}
                disabled={
                  splitting ||
                  (splitMode === 'pages' && selectedPages.size === 0)
                }
                className="btn-premium h-13 w-full gap-2 text-base font-bold"
              >
                {splitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Splitting…
                  </>
                ) : (
                  <>
                    <Download className="h-5 w-5" />
                    Split & download
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
