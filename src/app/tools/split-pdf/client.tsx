'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    Sparkles,
    Upload,
    Download,
    Trash2,
    FileText,
    Loader2,
    CheckCircle2,
    Scissors,
    ArrowLeft,
    Shield,
    Zap,
    Layers,
    Star
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { PDFDocument } from 'pdf-lib';
import { downloadBytes, isPdfFile, zipPdfFiles } from '@/lib/pdf-client';

const relatedTools = [
    { name: 'Merge PDF', slug: 'merge-pdf', icon: Layers, color: 'from-red-500 to-orange-500' },
    { name: 'Reorder PDF', slug: 'reorder-pdf', icon: Layers, color: 'from-indigo-500 to-blue-500' },
    { name: 'Image to PDF', slug: 'image-to-pdf', icon: FileText, color: 'from-green-500 to-teal-500' },
    { name: 'Crop Image', slug: 'image-crop', icon: Layers, color: 'from-violet-500 to-purple-500' },
];

export default function SplitPDFClient() {
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [pageCount, setPageCount] = useState<number>(0);
    const [loading, setLoading] = useState(false);
    const [splitting, setSplitting] = useState(false);
    const [splitMode, setSplitMode] = useState<'all' | 'range' | 'pages'>('all');
    const [rangeStart, setRangeStart] = useState<number>(1);
    const [rangeEnd, setRangeEnd] = useState<number>(1);
    const [selectedPages, setSelectedPages] = useState<Set<number>>(new Set());
    const [dragOver, setDragOver] = useState(false);
    /** When splitting all pages: zip (recommended) or many separate downloads */
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
        } catch (error) {
            toast.error('Failed to load PDF. Make sure it\'s a valid PDF file.');
        } finally {
            setLoading(false);
        }
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        await handleFileSelect(e.dataTransfer.files);
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
                            name:`page-${String(i + 1).padStart(3, '0')}.pdf`,
                            bytes: pdfBytes,
                        });
                    }
                    const zipBlob = await zipPdfFiles(parts);
                    const url = URL.createObjectURL(zipBlob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download =`${(file.name || 'document').replace(/\.pdf$/i, '')}-pages.zip`;
                    a.click();
                    setTimeout(() => URL.revokeObjectURL(url), 3000);
                    toast.success(`ZIP ready with ${pageCount} page PDFs`);
                } else {
                    for (let i = 0; i < pageCount; i++) {
                        const newPdf = await PDFDocument.create();
                        const [page] = await newPdf.copyPages(pdfDoc, [i]);
                        newPdf.addPage(page);
                        const pdfBytes = await newPdf.save({ useObjectStreams: false });
                        downloadPDF(pdfBytes,`page-${i + 1}.pdf`);
                        if (pageCount > 1 && i < pageCount - 1) {
                            await new Promise((r) => setTimeout(r, 120));
                        }
                    }
                    toast.success(`Split into ${pageCount} downloads. Allow multiple downloads if asked.`);
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
                pages.forEach(page => newPdf.addPage(page));

                const pdfBytes = await newPdf.save({ useObjectStreams: false });
                downloadPDF(pdfBytes,`pages-${rangeStart}-to-${rangeEnd}.pdf`);
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
                downloadPDF(pdfBytes,`pages-${label}.pdf`);
                toast.success(`Extracted ${indices.length} selected page(s)!`);
            }
        } catch (error) {
            toast.error('Failed to split PDF. Please try again.');
            console.error('Split error:', error);
        } finally {
            setSplitting(false);
        }
    };

    const downloadPDF = (pdfBytes: Uint8Array, filename: string) => {
        downloadBytes(pdfBytes, filename, 'application/pdf');
    };

    const clearFile = () => {
        setFile(null);
        setPageCount(0);
        setSelectedPages(new Set());
    };

    return (
        <div className="flex-1 w-full min-h-screen relative">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px] mix-blend-screen animate-pulse-glow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-blue-500/10 blur-[120px] mix-blend-screen" style={{ animationDelay: '1s' }} />
            </div>

            <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-10">
                {/* Back Button */}
                <button
                    type="button"
                    onClick={() => router.push('/tools/image-pdf-tools')}
                    className="group flex items-center gap-2 mb-4 px-4 py-2 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-muted transition-all shadow-sm"
                >
                    <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Back to Image & PDF</span>
                </button>

                {/* Breadcrumbs */}
                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                    <Link href="/" className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors">Home</Link>
                    <span className="text-muted-foreground/50 text-sm">/</span>
                    <Link href="/tools" className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors">Tools</Link>
                    <span className="text-muted-foreground/50 text-sm">/</span>
                    <Link href="/tools/image-pdf-tools" className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors">Image & PDF Tools</Link>
                    <span className="text-muted-foreground/50 text-sm">/</span>
                    <span className="text-primary text-sm font-semibold">Split PDF</span>
                </div>

                {/* Heading */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-600 text-sm font-semibold mb-5">
                        <Scissors className="h-4 w-4" />
                        Free PDF Tool
                    </div>
                    <h1 className="text-foreground text-4xl md:text-5xl font-black tracking-tight mb-4">Split PDF Pages</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        Extract specific pages or split your PDF into individual files
                    </p>
                </div>

                {/* Main Tool Card */}
                <div className="bg-card/40 backdrop-blur-3xl rounded-[2rem] shadow-premium-lg border border-border/60 overflow-hidden relative group">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <div className="p-6 md:p-8">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => handleFileSelect(e.target.files)}
                            accept=".pdf"
                            className="hidden"
                        />

                        {!file ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDrop={handleDrop}
                                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${dragOver ? 'border-primary bg-primary/5 scale-[1.02]' : 'border-border/60 hover:border-primary/50 hover:bg-muted/30 hover:shadow-glow-sm'}`}
                            >
                                {loading ? (
                                    <div className="flex flex-col items-center gap-3">
                                        <Loader2 className="h-12 w-12 text-primary animate-spin" />
                                        <p className="text-muted-foreground">Loading PDF...</p>
                                    </div>
                                ) : (
                                    <>
                                        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                        <p className="text-lg font-semibold text-foreground mb-2">Drop PDF here or click to upload</p>
                                        <p className="text-sm text-muted-foreground">Select a PDF file to split</p>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {/* File Info */}
                                <div className="flex items-center gap-4 p-4 bg-background/40 backdrop-blur-sm border border-border/40 rounded-xl">
                                    <FileText className="h-10 w-10 text-blue-600" />
                                    <div className="flex-1">
                                        <p className="font-medium text-foreground">{file.name}</p>
                                        <p className="text-sm text-muted-foreground">{pageCount} pages</p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={clearFile} className="text-red-500">
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </div>

                                {/* Split Options */}
                                <div className="space-y-4">
                                    <p className="font-semibold text-foreground">Split Mode:</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setSplitMode('all')}
                                            className={`p-4 rounded-xl border-2 transition-all ${splitMode === 'all' ? 'border-primary bg-primary/5 shadow-glow-sm' : 'border-border/40 hover:border-primary/30'}`}
                                        >
                                            <Scissors className="h-6 w-6 mx-auto mb-2 text-primary" />
                                            <p className="font-medium">All pages</p>
                                            <p className="text-xs text-muted-foreground">ZIP or multi-download</p>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSplitMode('range')}
                                            className={`p-4 rounded-xl border-2 transition-all ${splitMode === 'range' ? 'border-primary bg-primary/5 shadow-glow-sm' : 'border-border/40 hover:border-primary/30'}`}
                                        >
                                            <FileText className="h-6 w-6 mx-auto mb-2 text-primary" />
                                            <p className="font-medium">Page range</p>
                                            <p className="text-xs text-muted-foreground">From–to continuous</p>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setSplitMode('pages')}
                                            className={`p-4 rounded-xl border-2 transition-all ${splitMode === 'pages' ? 'border-primary bg-primary/5 shadow-glow-sm' : 'border-border/40 hover:border-primary/30'}`}
                                        >
                                            <CheckCircle2 className="h-6 w-6 mx-auto mb-2 text-primary" />
                                            <p className="font-medium">Pick pages</p>
                                            <p className="text-xs text-muted-foreground">Select specific pages</p>
                                        </button>
                                    </div>

                                    {splitMode === 'all' && (
                                        <label className="flex items-center gap-2 p-3 rounded-xl bg-background/40 border border-border/40 text-sm cursor-pointer">
                                            <input
                                                type="checkbox"
                                                checked={allAsZip}
                                                onChange={(e) => setAllAsZip(e.target.checked)}
                                                className="rounded border-border bg-background"
                                            />
                                            <span>
                                                <strong>Download as ZIP</strong>
                                                <span className="text-muted-foreground">
                                                    {""}
                                                    (one archive with page-001.pdf, page-002.pdf, …) — recommended
                                                </span>
                                            </span>
                                        </label>
                                    )}

                                    {splitMode === 'range' && (
                                        <div className="flex flex-wrap items-center gap-4 p-4 bg-background/40 border border-border/40 rounded-xl">
                                            <label className="text-sm font-medium">From page:</label>
                                            <input
                                                type="number"
                                                min={1}
                                                max={pageCount}
                                                value={rangeStart}
                                                onChange={(e) => setRangeStart(Math.min(Math.max(1, parseInt(e.target.value) || 1), pageCount))}
                                                className="w-20 px-3 py-2 rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-1 focus:ring-primary/40"
                                            />
                                            <label className="text-sm font-medium">to:</label>
                                            <input
                                                type="number"
                                                min={rangeStart}
                                                max={pageCount}
                                                value={rangeEnd}
                                                onChange={(e) => setRangeEnd(Math.min(Math.max(rangeStart, parseInt(e.target.value) || rangeStart), pageCount))}
                                                className="w-20 px-3 py-2 rounded-lg border border-border/50 bg-background/50 focus:outline-none focus:ring-1 focus:ring-primary/40"
                                            />
                                        </div>
                                    )}

                                    {splitMode === 'pages' && (
                                        <div className="p-4 bg-background/40 border border-border/40 rounded-xl space-y-3">
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
                                            <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto custom-scrollbar">
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
                                                            className={`h-10 min-w-10 px-2 rounded-lg border text-sm font-bold transition-colors ${
                                                                on
                                                                    ? 'bg-primary text-primary-foreground border-primary'
                                                                    : 'bg-background/50 border-border/50 hover:border-primary/50 hover:bg-muted'
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
                                    className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-2xl shadow-glow-md hover:shadow-glow-lg transition-all group"
                                >
                                    {splitting ? <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Splitting...</> : <><Download className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" /> Split & Download</>}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* How It Works */}
                <div className="mt-12">
                    <h2 className="text-xl font-bold text-foreground text-center mb-8">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { step: 1, title: 'Upload PDF', desc: 'Drop your PDF file', icon: Upload, color: 'from-blue-500 to-indigo-500' },
                            { step: 2, title: 'Choose Mode', desc: 'Split all or range', icon: Scissors, color: 'from-purple-500 to-pink-500' },
                            { step: 3, title: 'Download', desc: 'Get split files', icon: Download, color: 'from-cyan-500 to-blue-500' },
                        ].map((item) => (
                            <div key={item.step} className="flex flex-col items-center text-center p-6 rounded-2xl bg-card/40 backdrop-blur-md border border-border/40 hover:border-primary/30 hover:shadow-glow-sm transition-all group">
                                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <item.icon className="h-7 w-7 text-white" />
                                </div>
                                <div className="text-xs font-bold text-muted-foreground mb-1 uppercase tracking-wider">Step {item.step}</div>
                                <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-card/40 backdrop-blur-md border border-border/40 hover:border-emerald-500/30 transition-colors">
                        <Shield className="h-8 w-8 text-emerald-500 mb-3" />
                        <h3 className="font-bold text-foreground mb-2">100% Private</h3>
                        <p className="text-sm text-muted-foreground">Files processed locally in your browser</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-card/40 backdrop-blur-md border border-border/40 hover:border-blue-500/30 transition-colors">
                        <Scissors className="h-8 w-8 text-blue-500 mb-3" />
                        <h3 className="font-bold text-foreground mb-2">Extract Pages</h3>
                        <p className="text-sm text-muted-foreground">Select specific page ranges to extract</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-card/40 backdrop-blur-md border border-border/40 hover:border-violet-500/30 transition-colors">
                        <Zap className="h-8 w-8 text-violet-500 mb-3" />
                        <h3 className="font-bold text-foreground mb-2">Instant Download</h3>
                        <p className="text-sm text-muted-foreground">Get your split PDFs immediately</p>
                    </div>
                </div>

                {/* Testimonial */}
                <div className="mt-12 p-8 rounded-[2rem] bg-card/30 backdrop-blur-md border border-border/40 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex flex-col items-center text-center">
                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                        <p className="text-lg italic text-foreground/80 max-w-2xl mb-4">"Perfect for extracting chapters from eBooks. Super fast and no watermarks!"
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                                S
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-foreground">Sarah Mitchell</p>
                                <p className="text-sm text-muted-foreground">Student</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Tools */}
                <div className="mt-12">
                    <h2 className="text-xl font-bold text-foreground text-center mb-6">Related Tools</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {relatedTools.map((tool) => (
                            <Link
                                key={tool.slug}
                                href={`/tools/${tool.slug}`}
                                className="group p-4 rounded-[1.5rem] bg-card/40 backdrop-blur-md border border-border/40 hover:border-primary/40 hover:shadow-glow-sm transition-all text-center"
                            >
                                <div className={`h-12 w-12 mx-auto rounded-2xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                                    <tool.icon className="h-6 w-6 text-white" />
                                </div>
                                <p className="font-medium text-sm text-foreground">{tool.name}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
