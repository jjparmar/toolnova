'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
    Upload,
    Download,
    Trash2,
    FileText,
    ArrowUp,
    ArrowDown,
    Loader2,
    AlertCircle,
    GripVertical,
    Shield,
    Zap,
    Layers,
    Scissors,
} from 'lucide-react';
import { toast } from 'sonner';
import { PDFDocument } from 'pdf-lib';
import { isPdfFile } from '@/lib/pdf-client';
import { PremiumToolWrapper } from '@/components/PremiumToolWrapper';

interface PDFFile {
    id: string;
    file: File;
    name: string;
    pages: number;
    size: string;
}

const shellFeatures = [
    {
        title: '100% browser-private',
        description: 'PDFs are merged on your device. Nothing is uploaded for this tool.',
        icon: Shield,
    },
    {
        title: 'Drag order control',
        description: 'Reorder files with arrows before you merge so page flow is correct.',
        icon: Layers,
    },
    {
        title: 'Instant download',
        description: 'Get one clean PDF in seconds—no watermark and no account required.',
        icon: Zap,
    },
];

const shellHowItWorks = [
    {
        step: 1,
        title: 'Upload PDFs',
        desc: 'Drop two or more PDF files into the workspace.',
        icon: Upload,
        color: 'from-violet-500 to-fuchsia-500',
    },
    {
        step: 2,
        title: 'Reorder',
        desc: 'Arrange files with the up/down controls.',
        icon: GripVertical,
        color: 'from-indigo-500 to-violet-500',
    },
    {
        step: 3,
        title: 'Merge & download',
        desc: 'Export one combined PDF ready for portals or email.',
        icon: Download,
        color: 'from-fuchsia-500 to-pink-500',
    },
];

const shellRelated = [
    { name: 'Split PDF', slug: 'split-pdf', icon: Scissors, color: 'text-blue-500' },
    { name: 'Compress PDF', slug: 'compress-pdf', icon: FileText, color: 'text-rose-500' },
    { name: 'Image to PDF', slug: 'image-to-pdf', icon: Layers, color: 'text-emerald-500' },
    { name: 'Reorder PDF', slug: 'reorder-pdf', icon: Layers, color: 'text-indigo-500' },
];

export default function MergePDFClient() {
    const [files, setFiles] = useState<PDFFile[]>([]);
    const [loading, setLoading] = useState(false);
    const [merging, setMerging] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [outputName, setOutputName] = useState('merged-document');
    const [lastUrl, setLastUrl] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    const processFile = async (file: File): Promise<PDFFile | null> => {
        try {
            const arrayBuffer = await file.arrayBuffer();
            // ignoreEncryption: many student PDFs are"secured" but still readable
            const pdfDoc = await PDFDocument.load(arrayBuffer, {
                ignoreEncryption: true,
            });
            const pageCount = pdfDoc.getPageCount();

            return {
                id:`${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                file,
                name: file.name,
                pages: pageCount,
                size: formatFileSize(file.size)
            };
        } catch (error) {
            toast.error(`Failed to load ${file.name}. Make sure it's a valid PDF.`);
            return null;
        }
    };

    const handleFileSelect = async (selectedFiles: FileList | null) => {
        if (!selectedFiles) return;
        setLoading(true);

        const pdfFiles = Array.from(selectedFiles).filter(isPdfFile);
        if (pdfFiles.length === 0) {
            toast.error('Please select PDF files only.');
            setLoading(false);
            return;
        }
        const skipped = selectedFiles.length - pdfFiles.length;
        if (skipped > 0) {
            toast.message(`Skipped ${skipped} non-PDF file(s)`);
        }

        const processedFiles = await Promise.all(pdfFiles.map(processFile));
        const validFiles = processedFiles.filter((f): f is PDFFile => f !== null);

        setFiles(prev => [...prev, ...validFiles]);
        toast.success(`Added ${validFiles.length} PDF file(s)`);
        setLoading(false);
    };

    const handleDrop = async (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        await handleFileSelect(e.dataTransfer.files);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const removeFile = (id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    };

    const moveFile = (index: number, direction: 'up' | 'down') => {
        const newFiles = [...files];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= files.length) return;

        [newFiles[index], newFiles[targetIndex]] = [newFiles[targetIndex], newFiles[index]];
        setFiles(newFiles);
    };

    const clearAll = () => {
        setFiles([]);
        toast.success('Cleared all files');
    };

    const mergePDFs = async () => {
        if (files.length < 1) {
            toast.error('Please add at least one PDF file.');
            return;
        }
        if (files.length < 2) {
            toast.error('Add at least 2 PDFs to merge (or reorder a single file is not needed).');
            return;
        }

        setMerging(true);
        try {
            if (lastUrl) URL.revokeObjectURL(lastUrl);
            const mergedPdf = await PDFDocument.create();

            for (const pdfFile of files) {
                const arrayBuffer = await pdfFile.file.arrayBuffer();
                const pdf = await PDFDocument.load(arrayBuffer, {
                    ignoreEncryption: true,
                });
                const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
                copiedPages.forEach(page => mergedPdf.addPage(page));
            }

            // useObjectStreams: false improves compatibility with older readers
            const mergedPdfBytes = await mergedPdf.save({ useObjectStreams: false });
            const pdfArrayBuffer = new ArrayBuffer(mergedPdfBytes.byteLength);
            new Uint8Array(pdfArrayBuffer).set(mergedPdfBytes);
            const blob = new Blob([pdfArrayBuffer], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            setLastUrl(url);

            const safeName = (outputName.trim() || 'merged-document').replace(/[^\w\-]+/g, '-');
            const a = document.createElement('a');
            a.href = url;
            a.download =`${safeName}.pdf`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            toast.success(`Merged ${files.length} files · ${mergedPdf.getPageCount()} pages. Download started.`);
        } catch (error) {
            toast.error('Failed to merge PDFs. One file may be corrupted or password-locked.');
            console.error('Merge error:', error);
        } finally {
            setMerging(false);
        }
    };

    const redownload = () => {
        if (!lastUrl) return;
        const safeName = (outputName.trim() || 'merged-document').replace(/[^\w\-]+/g, '-');
        const a = document.createElement('a');
        a.href = lastUrl;
        a.download =`${safeName}.pdf`;
        a.click();
    };

    const totalPages = files.reduce((sum, f) => sum + f.pages, 0);
    const totalBytes = files.reduce((sum, f) => sum + f.file.size, 0);
    const totalSizeLabel = formatFileSize(totalBytes);

    return (
        <PremiumToolWrapper
            toolName="Merge PDF Files Online Free – No Watermark"
            toolSlug="merge-pdf"
            tagline="Combine multiple PDFs in your browser — private & free"
            description="Join multiple PDFs into one file. Drag to reorder, merge free—no watermark, no signup, no server upload."
            badge="Free PDF tool · browser-private"
            category="PDF Tools"
            categorySlug="image-pdf-tools"
            features={shellFeatures}
            howItWorks={shellHowItWorks}
            relatedTools={shellRelated}
            ctaTitle="Ready to merge your PDFs?"
            ctaDescription="Upload two or more files, set the order, and download one clean document."
            ctaButtonText="Start merging"
            ctaIcon={Layers}
        >
            <div className="tool-shell">
                <div className="p-5 sm:p-7 md:p-8">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => handleFileSelect(e.target.files)}
                        accept=".pdf,application/pdf"
                        multiple
                        className="hidden"
                    />

                    <div
                        onClick={() => fileInputRef.current?.click()}
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        className={`cursor-pointer rounded-2xl border-2 border-dashed p-8 text-center transition-all sm:p-10 ${
                            dragOver
                                ? 'scale-[1.01] border-primary bg-primary/5'
                                : 'border-[var(--border-color)] bg-muted/20 hover:border-primary/45 hover:bg-muted/35'
                        }`}
                    >
                        {loading ? (
                            <div className="flex flex-col items-center gap-3">
                                <Loader2 className="h-11 w-11 animate-spin text-primary" />
                                <p className="text-muted-foreground">Processing files…</p>
                            </div>
                        ) : (
                            <>
                                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                    <Upload className="h-7 w-7" />
                                </div>
                                <p className="mb-1.5 text-lg font-semibold text-foreground">
                                    Drop PDF files here or click to upload
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Select 2+ PDFs · reorder with arrows · download one file
                                </p>
                                <p className="mt-2 text-xs text-muted-foreground/80">
                                    Tip: large batches work best under ~100MB total device memory
                                </p>
                            </>
                        )}
                    </div>

                    {files.length > 0 && (
                        <div className="mt-6 space-y-3">
                            <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-sm font-bold text-foreground">
                                        {files.length} file{files.length > 1 ? 's' : ''} selected
                                    </span>
                                    <span className="rounded-full border border-[var(--border-color)] bg-muted/50 px-2.5 py-1 text-xs text-muted-foreground">
                                        {totalPages} pages · {totalSizeLabel}
                                    </span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={clearAll}
                                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                                >
                                    <Trash2 className="mr-1 h-4 w-4" />
                                    Clear all
                                </Button>
                            </div>

                            <div className="space-y-2">
                                {files.map((file, index) => (
                                    <div
                                        key={file.id}
                                        className="flex items-center gap-3 rounded-xl border border-[var(--border-color)] bg-card p-3.5 transition-colors hover:border-primary/30 sm:p-4"
                                    >
                                        <GripVertical className="hidden h-5 w-5 text-muted-foreground sm:block" />
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                            <FileText className="h-5 w-5 text-primary" />
                                        </div>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate font-medium text-foreground">{file.name}</p>
                                            <p className="text-xs text-muted-foreground">
                                                {file.pages} page{file.pages > 1 ? 's' : ''} · {file.size}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-0.5">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => moveFile(index, 'up')}
                                                disabled={index === 0}
                                                className="h-8 w-8"
                                                aria-label="Move up"
                                            >
                                                <ArrowUp className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => moveFile(index, 'down')}
                                                disabled={index === files.length - 1}
                                                className="h-8 w-8"
                                                aria-label="Move down"
                                            >
                                                <ArrowDown className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => removeFile(file.id)}
                                                className="h-8 w-8 text-red-500 hover:bg-red-50 hover:text-red-600"
                                                aria-label="Remove file"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="mt-6 space-y-3">
                        {files.length > 0 && (
                            <label className="block space-y-1.5 text-sm">
                                <span className="font-semibold text-foreground">Output filename</span>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={outputName}
                                        onChange={(e) => setOutputName(e.target.value)}
                                        className="input-surface h-12 flex-1 px-4 text-sm"
                                        placeholder="merged-document"
                                    />
                                    <span className="text-sm text-muted-foreground">.pdf</span>
                                </div>
                            </label>
                        )}
                        <Button
                            onClick={mergePDFs}
                            disabled={files.length < 2 || merging}
                            className="btn-premium h-13 w-full gap-2 text-base font-bold"
                        >
                            {merging ? (
                                <>
                                    <Loader2 className="h-5 w-5 animate-spin" />
                                    Merging PDFs…
                                </>
                            ) : (
                                <>
                                    <Download className="h-5 w-5" />
                                    Merge & download PDF
                                </>
                            )}
                        </Button>
                        {lastUrl && (
                            <Button
                                type="button"
                                variant="outline"
                                className="h-11 w-full rounded-full"
                                onClick={redownload}
                            >
                                <Download className="mr-2 h-4 w-4" /> Download again
                            </Button>
                        )}
                    </div>

                    {files.length > 0 && files.length < 2 && (
                        <div className="mt-4 flex items-center justify-center gap-2 text-amber-700">
                            <AlertCircle className="h-4 w-4" />
                            <span className="text-sm font-medium">Add at least 2 PDF files to merge</span>
                        </div>
                    )}
                </div>
            </div>
        </PremiumToolWrapper>
    );
}
