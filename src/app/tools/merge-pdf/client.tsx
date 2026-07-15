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
    ArrowUp,
    ArrowDown,
    ArrowLeft,
    Loader2,
    CheckCircle2,
    AlertCircle,
    GripVertical,
    Shield,
    Zap,
    Layers,
    Star
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { PDFDocument } from 'pdf-lib';

interface PDFFile {
    id: string;
    file: File;
    name: string;
    pages: number;
    size: string;
}

const relatedTools = [
    { name: 'Split PDF', slug: 'split-pdf', icon: FileText, color: 'from-blue-500 to-purple-500' },
    { name: 'Reorder PDF', slug: 'reorder-pdf', icon: Layers, color: 'from-indigo-500 to-blue-500' },
    { name: 'Image to PDF', slug: 'image-to-pdf', icon: Layers, color: 'from-green-500 to-teal-500' },
    { name: 'Crop Image', slug: 'image-crop', icon: Layers, color: 'from-violet-500 to-purple-500' },
];

export default function MergePDFClient() {
    const router = useRouter();
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
            // ignoreEncryption: many student PDFs are "secured" but still readable
            const pdfDoc = await PDFDocument.load(arrayBuffer, {
                ignoreEncryption: true,
            });
            const pageCount = pdfDoc.getPageCount();

            return {
                id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
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

        const pdfFiles = Array.from(selectedFiles).filter(f => f.type === 'application/pdf');
        if (pdfFiles.length === 0) {
            toast.error('Please select PDF files only.');
            setLoading(false);
            return;
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
            a.download = `${safeName}.pdf`;
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
        a.download = `${safeName}.pdf`;
        a.click();
    };

    const totalPages = files.reduce((sum, f) => sum + f.pages, 0);
    const totalBytes = files.reduce((sum, f) => sum + f.file.size, 0);
    const totalSizeLabel = formatFileSize(totalBytes);

    return (
        <div className="flex-1 w-full min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0f1419] dark:via-background dark:to-[#0f1419]">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-10">

                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="group flex items-center gap-2 mb-4 px-4 py-2 rounded-xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                    <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Back</span>
                </button>

                {/* Breadcrumbs */}
                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                    <Link href="/" className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors">Home</Link>
                    <span className="text-muted-foreground/50 text-sm">/</span>
                    <Link href="/tools" className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors">Tools</Link>
                    <span className="text-muted-foreground/50 text-sm">/</span>
                    <Link href="/tools/image-pdf-tools" className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors">Image & PDF Tools</Link>
                    <span className="text-muted-foreground/50 text-sm">/</span>
                    <span className="text-primary text-sm font-semibold">Merge PDF</span>
                </div>

                {/* Heading */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-orange-500/10 text-red-600 dark:text-red-400 text-sm font-semibold mb-5">
                        <Sparkles className="h-4 w-4" />
                        Free PDF Tool
                    </div>
                    <h1 className="text-foreground text-4xl md:text-5xl font-black tracking-tight mb-4">Merge PDF Files</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
                        Combine multiple PDF files into one document. Reorder files, then merge — 100% free, no watermarks.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-muted-foreground">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-900">
                            <Shield className="h-3.5 w-3.5" />
                            Processed in your browser
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            No upload to servers
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                            No account required
                        </span>
                    </div>
                </div>

                {/* Main Tool Card */}
                <div className="bg-white/80 dark:bg-[#1a1f2e]/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 overflow-hidden">

                    {/* Upload Area */}
                    <div className="p-6 md:p-8">
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={(e) => handleFileSelect(e.target.files)}
                            accept=".pdf"
                            multiple
                            className="hidden"
                        />

                        <div
                            onClick={() => fileInputRef.current?.click()}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            className={`
                                border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all
                                ${dragOver
                                    ? 'border-primary bg-primary/5 scale-[1.02]'
                                    : 'border-slate-200 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                                }
                            `}
                        >
                            {loading ? (
                                <div className="flex flex-col items-center gap-3">
                                    <Loader2 className="h-12 w-12 text-primary animate-spin" />
                                    <p className="text-muted-foreground">Processing files...</p>
                                </div>
                            ) : (
                                <>
                                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                    <p className="text-lg font-semibold text-foreground mb-2">
                                        Drop PDF files here or click to upload
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        Select 2+ PDFs · reorder with arrows · download one file
                                    </p>
                                    <p className="text-xs text-muted-foreground/80 mt-2">
                                        Tip: large batches work best under ~100MB total device memory
                                    </p>
                                </>
                            )}
                        </div>

                        {/* Files List */}
                        {files.length > 0 && (
                            <div className="mt-6 space-y-3">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-foreground">
                                            {files.length} file{files.length > 1 ? 's' : ''} selected
                                        </span>
                                        <span className="text-xs text-muted-foreground bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">
                                            {totalPages} pages · {totalSizeLabel}
                                        </span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={clearAll}
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                    >
                                        <Trash2 className="h-4 w-4 mr-1" />
                                        Clear All
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    {files.map((file, index) => (
                                        <div
                                            key={file.id}
                                            className="flex items-center gap-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700"
                                        >
                                            <GripVertical className="h-5 w-5 text-muted-foreground" />

                                            <div className="h-10 w-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <FileText className="h-5 w-5 text-red-600 dark:text-red-400" />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-foreground truncate">{file.name}</p>
                                                <p className="text-xs text-muted-foreground">
                                                    {file.pages} page{file.pages > 1 ? 's' : ''} • {file.size}
                                                </p>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => moveFile(index, 'up')}
                                                    disabled={index === 0}
                                                    className="h-8 w-8"
                                                >
                                                    <ArrowUp className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => moveFile(index, 'down')}
                                                    disabled={index === files.length - 1}
                                                    className="h-8 w-8"
                                                >
                                                    <ArrowDown className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => removeFile(file.id)}
                                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Output name + Merge */}
                        <div className="mt-6 space-y-3">
                            {files.length > 0 && (
                                <label className="block text-sm space-y-1">
                                    <span className="font-medium text-foreground">Output filename</span>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="text"
                                            value={outputName}
                                            onChange={(e) => setOutputName(e.target.value)}
                                            className="flex-1 h-11 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-3 text-sm"
                                            placeholder="merged-document"
                                        />
                                        <span className="text-sm text-muted-foreground">.pdf</span>
                                    </div>
                                </label>
                            )}
                            <Button
                                onClick={mergePDFs}
                                disabled={files.length < 2 || merging}
                                className="w-full h-14 bg-gradient-to-r from-red-500 via-orange-500 to-amber-500 hover:from-red-600 hover:via-orange-600 hover:to-amber-600 text-white font-bold rounded-2xl shadow-xl shadow-red-500/30 hover:shadow-2xl hover:shadow-red-500/40 transition-all flex items-center justify-center gap-3 text-base disabled:opacity-50 disabled:cursor-not-allowed group"
                            >
                                {merging ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Merging PDFs...
                                    </>
                                ) : (
                                    <>
                                        <Download className="h-5 w-5 group-hover:scale-110 transition-transform" />
                                        Merge & Download PDF
                                    </>
                                )}
                            </Button>
                            {lastUrl && (
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full h-11 rounded-xl"
                                    onClick={redownload}
                                >
                                    <Download className="h-4 w-4 mr-2" /> Download again
                                </Button>
                            )}
                        </div>

                        {files.length > 0 && files.length < 2 && (
                            <div className="mt-4 flex items-center justify-center gap-2 text-amber-600 dark:text-amber-400">
                                <AlertCircle className="h-4 w-4" />
                                <span className="text-sm">Add at least 2 PDF files to merge</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* How It Works */}
                <div className="mt-12">
                    <h2 className="text-xl font-bold text-foreground text-center mb-8">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { step: 1, title: 'Upload PDFs', desc: 'Drop your PDF files', icon: Upload, color: 'from-red-500 to-orange-600' },
                            { step: 2, title: 'Reorder', desc: 'Arrange the order', icon: GripVertical, color: 'from-orange-500 to-amber-600' },
                            { step: 3, title: 'Download', desc: 'Get merged PDF', icon: Download, color: 'from-amber-500 to-yellow-600' },
                        ].map((item) => (
                            <div key={item.step} className="relative">
                                <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700">
                                    <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                                        <item.icon className="h-7 w-7 text-white" />
                                    </div>
                                    <div className="text-xs font-bold text-muted-foreground mb-1">STEP {item.step}</div>
                                    <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features Section */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/10 border border-green-100 dark:border-green-800/30">
                        <Shield className="h-8 w-8 text-green-600 dark:text-green-400 mb-3" />
                        <h3 className="font-bold text-foreground mb-2">100% Private</h3>
                        <p className="text-sm text-muted-foreground">Files never leave your browser. Complete privacy guaranteed.</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 dark:from-blue-900/20 dark:to-indigo-900/10 border border-blue-100 dark:border-blue-800/30">
                        <Sparkles className="h-8 w-8 text-blue-600 dark:text-blue-400 mb-3" />
                        <h3 className="font-bold text-foreground mb-2">Drag & Reorder</h3>
                        <p className="text-sm text-muted-foreground">Easily rearrange your PDFs before merging.</p>
                    </div>

                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/10 border border-purple-100 dark:border-purple-800/30">
                        <Zap className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-3" />
                        <h3 className="font-bold text-foreground mb-2">Instant Download</h3>
                        <p className="text-sm text-muted-foreground">Get your merged PDF instantly. No waiting.</p>
                    </div>
                </div>

                {/* Testimonial */}
                <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-red-500/5 via-orange-500/5 to-amber-500/5 border border-red-200/50 dark:border-red-800/30">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                        <p className="text-lg italic text-foreground/80 max-w-2xl mb-4">
                            "This PDF merger is incredibly fast and easy to use. I combine reports weekly and this tool saves me so much time!"
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold">
                                J
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-foreground">James Roberts</p>
                                <p className="text-sm text-muted-foreground">Project Manager</p>
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
                                className="group p-4 rounded-xl bg-white/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700 hover:border-primary/50 hover:shadow-lg transition-all text-center"
                            >
                                <div className={`h-10 w-10 mx-auto rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                    <tool.icon className="h-5 w-5 text-white" />
                                </div>
                                <p className="font-medium text-sm text-foreground">{tool.name}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Pro Tips */}
                <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-red-500/5 via-orange-500/5 to-amber-500/5 border border-red-500/10">
                    <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                        <Sparkles className="h-4 w-4 text-red-500" /> Pro Tips
                    </h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                        <li className="flex items-start gap-2"><span className="text-red-500">•</span>Use the arrow buttons to reorder files before merging</li>
                        <li className="flex items-start gap-2"><span className="text-red-500">•</span>All processing happens in your browser – your files stay private</li>
                        <li className="flex items-start gap-2"><span className="text-red-500">•</span>Works with password-protected PDFs if they're already unlocked</li>
                    </ul>
                </div>

            </div>
        </div>
    );
}
