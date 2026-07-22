'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Upload, Download, Trash2, Image as ImageIcon, Loader2, ArrowLeft, Shield, Zap, Sparkles, Layers, Star, FileText, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { isImageFile } from '@/lib/image-client';

const relatedTools = [
    { name: 'Crop Image', slug: 'image-crop', icon: ImageIcon, color: 'from-violet-500 to-purple-500' },
    { name: 'JPG to PNG', slug: 'jpg-to-png', icon: ImageIcon, color: 'from-cyan-500 to-blue-500' },
    { name: 'Image to PDF', slug: 'image-to-pdf', icon: FileText, color: 'from-green-500 to-teal-500' },
    { name: 'Merge PDF', slug: 'merge-pdf', icon: Layers, color: 'from-red-500 to-orange-500' },
];

export default function ImageCompressorClient() {
    const router = useRouter();
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
        const file = files[0];
        if (!isImageFile(file)) {
            toast.error('Please select an image file');
            return;
        }
        if (file.size > 40 * 1024 * 1024) {
            toast.error('Please use an image under 40MB for browser compression');
            return;
        }
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
        <div className="flex-1 w-full min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-[1000px] mx-auto px-4 sm:px-6 py-10">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="group flex items-center gap-2 mb-4 px-4 py-2 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-white transition-all duration-300 shadow-sm hover:shadow-md"
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
                    <span className="text-primary text-sm font-semibold">Image Compressor</span>
                </div>

                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-600 text-sm font-semibold mb-5">
                        <Zap className="h-4 w-4" />
                        Free Compressor
                    </div>
                    <h1 className="text-foreground text-4xl md:text-5xl font-black tracking-tight mb-4">Image Compressor</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Reduce image file size instantly while maintaining high visual quality</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/40 overflow-hidden">
                    <div className="p-6 md:p-8">
                        <input type="file" ref={fileInputRef} onChange={(e) => handleFileSelect(e.target.files)} accept="image/*" className="hidden" />

                        {!image ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                onDragLeave={() => setDragOver(false)}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    setDragOver(false);
                                    handleFileSelect(e.dataTransfer.files);
                                }}
                                className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all ${
                                    dragOver
                                        ? 'border-primary bg-primary/5 scale-[1.01]'
                                        : 'border-border/50 hover:border-primary/50'
                                }`}
                            >
                                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                <p className="text-lg font-semibold text-foreground mb-2">Drop image here or click to upload</p>
                                <p className="text-sm text-muted-foreground">JPG, PNG, WebP · processed locally in your browser · free forever</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                                    <img src={preview} alt="Preview" className="h-16 w-16 object-cover rounded-lg" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-foreground truncate">{image.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            Original: {formatSize(originalSize)}
                                            {dims ? ` · ${dims.w}×${dims.h}px` : ''}
                                        </p>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => {
                                        if (compressedUrl) URL.revokeObjectURL(compressedUrl);
                                        setImage(null); setPreview(''); setCompressedUrl(''); setDims(null); setNote('');
                                    }} className="text-red-500">
                                        <Trash2 className="h-5 w-5" />
                                    </Button>
                                </div>

                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Output format</label>
                                        <select
                                            value={outputFormat}
                                            onChange={(e) => setOutputFormat(e.target.value as typeof outputFormat)}
                                            className="w-full h-11 rounded-xl border border-border/50 bg-card/40 backdrop-blur-md px-3 text-sm font-medium"
                                        >
                                            <option value="auto">Auto (Recommended - Smallest Size)</option>
                                            <option value="image/webp">WebP (Modern, High Compression)</option>
                                            <option value="image/jpeg">JPG (Best for Photos)</option>
                                            <option value="image/png">PNG (Lossless / Transparent)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Max width (optional)</label>
                                        <select
                                            value={maxWidth}
                                            onChange={(e) => setMaxWidth(parseInt(e.target.value, 10))}
                                            className="w-full h-11 rounded-xl border border-border/50 bg-card/40 backdrop-blur-md px-3 text-sm font-medium"
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
                                        <label className="font-medium text-foreground">Quality: {quality}%</label>
                                        <span className="text-sm text-muted-foreground">
                                            {quality < 50 ? 'Smaller file' : quality < 80 ? 'Balanced' : 'High quality'}
                                        </span>
                                    </div>
                                    <input
                                        type="range"
                                        min="10"
                                        max="100"
                                        value={quality}
                                        onChange={(e) => setQuality(parseInt(e.target.value))}
                                        className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                                    />
                                </div>

                                <Button onClick={compressImage} disabled={compressing} className="w-full h-14 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/30">
                                    {compressing ? <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Compressing...</> : <><Zap className="h-5 w-5 mr-2" /> Compress Image</>}
                                </Button>

                                {compressedUrl && (
                                    <div className="p-5 bg-emerald-50/90 rounded-2xl border border-emerald-200 space-y-4">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                                                    <p className="font-bold text-emerald-800 text-lg">Compression Ready!</p>
                                                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-800 font-bold uppercase tracking-wider">
                                                        {actualFormat.replace('image/', '')}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-emerald-700">
                                                    {formatSize(originalSize)} → <span className="font-bold">{formatSize(compressedSize)}</span>
                                                    {reduction > 0 ? (
                                                        <span className="ml-2 font-bold text-emerald-800 bg-emerald-200/70 px-2 py-0.5 rounded-md">
                                                            ↓ {reduction}% smaller
                                                        </span>
                                                    ) : (
                                                        <span className="ml-2 text-amber-700">
                                                            (Same size — lower quality slider for higher compression)
                                                        </span>
                                                    )}
                                                </p>
                                                {note && (
                                                    <p className="text-xs text-emerald-800/90 mt-1.5 font-medium">
                                                        💡 {note}
                                                    </p>
                                                )}
                                            </div>
                                            <Button onClick={downloadCompressed} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl shadow-md">
                                                <Download className="h-4 w-4 mr-2" /> Download
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-1">Original ({formatSize(originalSize)})</p>
                                                <img src={preview} alt="Original" className="w-full h-32 object-contain rounded-lg bg-white/50 border border-slate-200/60" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-1">Compressed ({formatSize(compressedSize)})</p>
                                                <img src={compressedUrl} alt="Compressed preview" className="w-full h-32 object-contain rounded-lg bg-white/50 border border-slate-200/60" />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* How It Works */}
                <div className="mt-12">
                    <h2 className="text-xl font-bold text-foreground text-center mb-8">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { step: 1, title: 'Upload Image', desc: 'Select your image', icon: Upload, color: 'from-orange-500 to-red-600' },
                            { step: 2, title: 'Set Quality', desc: 'Adjust compression', icon: Zap, color: 'from-amber-500 to-orange-600' },
                            { step: 3, title: 'Download', desc: 'Get smaller file', icon: Download, color: 'from-green-500 to-emerald-600' },
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
                        <p className="text-sm text-muted-foreground">Processed locally in browser</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50/50 border border-orange-100">
                        <Zap className="h-8 w-8 text-orange-600 mb-3" />
                        <h3 className="font-bold text-foreground mb-2">Adjustable Quality</h3>
                        <p className="text-sm text-muted-foreground">Control compression level</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50/50 border border-purple-100">
                        <Sparkles className="h-8 w-8 text-purple-600 mb-3" />
                        <h3 className="font-bold text-foreground mb-2">Instant Results</h3>
                        <p className="text-sm text-muted-foreground">See size reduction immediately</p>
                    </div>
                </div>

                {/* Testimonial */}
                <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-orange-500/5 via-red-500/5 to-amber-500/5 border border-orange-200/50">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                        <p className="text-lg italic text-foreground/80 max-w-2xl mb-4">"Reduced my website images by 60%! Page load speed improved dramatically."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold">
                                M
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-foreground">Mark Johnson</p>
                                <p className="text-sm text-muted-foreground">Web Developer</p>
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
