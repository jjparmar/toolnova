'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sparkles, Upload, Download, Trash2, Image as ImageIcon, Loader2, CheckCircle2, FileText, ArrowLeft, Shield, Zap, Layers, Star } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { PDFDocument } from 'pdf-lib';
import { isImageFile } from '@/lib/image-client';

interface ImageFile {
    id: string;
    file: File;
    name: string;
    preview: string;
}

const relatedTools = [
    { name: 'Merge PDF', slug: 'merge-pdf', icon: Layers, color: 'from-red-500 to-orange-500' },
    { name: 'Split PDF', slug: 'split-pdf', icon: FileText, color: 'from-blue-500 to-purple-500' },
    { name: 'Image Compressor', slug: 'image-compressor', icon: Zap, color: 'from-orange-500 to-red-500' },
    { name: 'JPG to PNG', slug: 'jpg-to-png', icon: ImageIcon, color: 'from-cyan-500 to-blue-500' },
];

export default function ImageToPDFClient() {
    const router = useRouter();
    const [images, setImages] = useState<ImageFile[]>([]);
    const [loading, setLoading] = useState(false);
    const [converting, setConverting] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    /** original = one page per image at pixel size; a4/letter = fit on page */
    const [pageMode, setPageMode] = useState<'original' | 'a4' | 'letter'>('original');
    const [margin, setMargin] = useState(36); // PDF points (~0.5")
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
                id:`${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                file,
                name: file.name,
                preview: URL.createObjectURL(file),
            }))
        );

        setImages(prev => [...prev, ...newImages]);
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
                    const jpgBytes = Uint8Array.from(atob(base64), c => c.charCodeAt(0));
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
                        pageMode === 'a4'
                            ? { w: 595.28, h: 841.89 }
                            : { w: 612, h: 792 };
                    // Auto-orient: landscape if image is wider
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
            a.download =`images-to-pdf-${images.length}p-${Date.now()}.pdf`;
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

    return (
        <div className="flex-1 w-full min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-10">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="group flex items-center gap-2 mb-4 px-4 py-2 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-white :bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                    <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors">Back</span>
                </button>

                <div className="flex flex-wrap gap-2 mb-6 justify-center">
                    <Link href="/" className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors">Home</Link>
                    <span className="text-muted-foreground/50 text-sm">/</span>
                    <Link href="/tools" className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors">Tools</Link>
                    <span className="text-muted-foreground/50 text-sm">/</span>
                    <Link href="/tools/image-pdf-tools" className="text-muted-foreground text-sm font-medium hover:text-primary transition-colors">Image & PDF Tools</Link>
                    <span className="text-muted-foreground/50 text-sm">/</span>
                    <span className="text-primary text-sm font-semibold">Image to PDF</span>
                </div>

                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-green-500/10 to-blue-500/10 text-green-600 text-sm font-semibold mb-5">
                        <ImageIcon className="h-4 w-4" />
                        Free Converter
                    </div>
                    <h1 className="text-foreground text-4xl md:text-5xl font-black tracking-tight mb-4">Image to PDF</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Convert JPG, PNG images to PDF instantly</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/40 overflow-hidden">
                    <div className="p-6 md:p-8">
                        <input type="file" ref={fileInputRef} onChange={(e) => handleFileSelect(e.target.files)} accept="image/*" multiple className="hidden" />

                        <div
                            onClick={() => fileInputRef.current?.click()}
                            onDrop={handleDrop}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${dragOver ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/50'}`}
                        >
                            {loading ? (
                                <Loader2 className="h-12 w-12 mx-auto text-primary animate-spin" />
                            ) : (
                                <>
                                    <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                    <p className="text-lg font-semibold text-foreground mb-2">Drop images here or click to upload</p>
                                    <p className="text-sm text-muted-foreground">Supports JPG, PNG, and other image formats</p>
                                </>
                            )}
                        </div>

                        {images.length > 0 && (
                            <div className="mt-6 space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold text-foreground">{images.length} image(s) selected</span>
                                    <Button type="button" variant="ghost" size="sm" onClick={clearAllImages} className="text-red-500">
                                        <Trash2 className="h-4 w-4 mr-1" /> Clear
                                    </Button>
                                </div>

                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                                    {images.map((img, index) => (
                                        <div key={img.id} className="relative group">
                                            <img src={img.preview} alt={img.name} className="w-full h-20 object-cover rounded-lg" />
                                            <span className="absolute bottom-1 left-1 text-[10px] font-bold bg-black/60 text-white px-1.5 py-0.5 rounded">
                                                {index + 1}
                                            </span>
                                            <div className="absolute top-1 left-1 flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <button
                                                    type="button"
                                                    onClick={() => moveImage(index, -1)}
                                                    className="bg-white/90 text-muted-foreground rounded px-1 text-xs font-bold disabled:opacity-30"
                                                    disabled={index === 0}
                                                    title="Move earlier"
                                                >
                                                    ↑
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => moveImage(index, 1)}
                                                    className="bg-white/90 text-muted-foreground rounded px-1 text-xs font-bold disabled:opacity-30"
                                                    disabled={index === images.length - 1}
                                                    title="Move later"
                                                >
                                                    ↓
                                                </button>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeImage(img.id)}
                                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Trash2 className="h-3 w-3" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Hover a thumbnail to reorder pages (↑ ↓) before converting.
                                </p>

                                <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-xl bg-muted/50 border border-slate-100">
                                    <label className="text-sm space-y-1 block">
                                        <span className="font-medium">Page size</span>
                                        <select
                                            value={pageMode}
                                            onChange={(e) => setPageMode(e.target.value as typeof pageMode)}
                                            className="w-full h-11 rounded-xl border border-border/50 bg-card/40 backdrop-blur-md px-3"
                                        >
                                            <option value="original">Original (1 image = 1 page, full size)</option>
                                            <option value="a4">Fit on A4</option>
                                            <option value="letter">Fit on US Letter</option>
                                        </select>
                                    </label>
                                    <label className="text-sm space-y-1 block">
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
                                    <label className="text-sm space-y-1 block sm:col-span-2">
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

                                <Button onClick={convertToPDF} disabled={converting} className="w-full h-14 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-2xl shadow-xl shadow-green-500/30">
                                    {converting ? <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Converting...</> : <><Download className="h-5 w-5 mr-2" /> Convert to PDF</>}
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
                            { step: 1, title: 'Upload Images', desc: 'Drop JPG/PNG files', icon: Upload, color: 'from-green-500 to-teal-600' },
                            { step: 2, title: 'Convert', desc: 'Click convert button', icon: Sparkles, color: 'from-blue-500 to-indigo-600' },
                            { step: 3, title: 'Download', desc: 'Get your PDF', icon: Download, color: 'from-purple-500 to-pink-600' },
                        ].map((item) => (
                            <div key={item.step} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/50 border border-slate-100">
                                <div className={`h-14 w-14 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-4 shadow-lg`}>
                                    <item.icon className="h-7 w-7 text-white" />
                                </div>
                                <div className="text-xs font-bold text-muted-foreground mb-1">STEP {item.step}</div>
                                <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Features */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50/50 border border-green-100">
                        <Shield className="h-8 w-8 text-green-600 mb-3" />
                        <h3 className="font-bold text-foreground mb-2">100% Private</h3>
                        <p className="text-sm text-muted-foreground">Processed locally in your browser</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50/50 border border-blue-100">
                        <ImageIcon className="h-8 w-8 text-blue-600 mb-3" />
                        <h3 className="font-bold text-foreground mb-2">Multiple Images</h3>
                        <p className="text-sm text-muted-foreground">Combine multiple images into one PDF</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50/50 border border-purple-100">
                        <FileText className="h-8 w-8 text-purple-600 mb-3" />
                        <h3 className="font-bold text-foreground mb-2">High Quality</h3>
                        <p className="text-sm text-muted-foreground">Maintains original image quality</p>
                    </div>
                </div>

                {/* Testimonial */}
                <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-green-500/5 via-blue-500/5 to-teal-500/5 border border-green-200/50">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                        <p className="text-lg italic text-foreground/80 max-w-2xl mb-4">"Perfect for creating photo albums! Simple, fast, and the quality is excellent."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center text-white font-bold">
                                L
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-foreground">Lisa Thompson</p>
                                <p className="text-sm text-muted-foreground">Photographer</p>
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
                                className="group p-4 rounded-xl bg-white/50 border border-slate-100  hover:border-primary/50 hover:shadow-lg transition-all text-center"
                            >
                                <div className={`h-10 w-10 mx-auto rounded-xl bg-gradient-to-br ${tool.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                                    <tool.icon className="h-5 w-5 text-white" />
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
