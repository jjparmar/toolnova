'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Upload, Download, Trash2, Image as ImageIcon, Loader2, ArrowLeft, Shield, Zap, Sparkles, Layers, Star, FileText } from 'lucide-react';
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
    const [outputFormat, setOutputFormat] = useState<'image/jpeg' | 'image/webp' | 'image/png'>('image/jpeg');
    const [originalSize, setOriginalSize] = useState<number>(0);
    const [compressedSize, setCompressedSize] = useState<number>(0);
    const [compressedUrl, setCompressedUrl] = useState<string>('');
    const [dragOver, setDragOver] = useState(false);
    const [dims, setDims] = useState<{ w: number; h: number } | null>(null);
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
        if (file.type === 'image/png') setOutputFormat('image/png');
        else if (file.type === 'image/webp') setOutputFormat('image/webp');
        else setOutputFormat('image/jpeg');
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

    const compressImage = async () => {
        if (!image || !preview) return;
        setCompressing(true);

        try {
            if (compressedUrl) URL.revokeObjectURL(compressedUrl);
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new window.Image();

            img.onload = () => {
                let w = img.width;
                let h = img.height;
                if (maxWidth > 0 && w > maxWidth) {
                    h = Math.round((h * maxWidth) / w);
                    w = maxWidth;
                }
                canvas.width = w;
                canvas.height = h;
                if (ctx) {
                    ctx.imageSmoothingEnabled = true;
                    ctx.imageSmoothingQuality = 'high';
                    if (outputFormat === 'image/jpeg') {
                        ctx.fillStyle = '#ffffff';
                        ctx.fillRect(0, 0, w, h);
                    }
                    ctx.drawImage(img, 0, 0, w, h);
                }

                const mime = outputFormat;
                const q = mime === 'image/png' ? undefined : quality / 100;
                canvas.toBlob(
                    (blob) => {
                        if (blob) {
                            setCompressedSize(blob.size);
                            const url = URL.createObjectURL(blob);
                            setCompressedUrl(url);
                            const saved = originalSize - blob.size;
                            toast.success(
                                saved > 0
                                    ? `Compressed! Saved ${formatSize(saved)}`
                                    : 'Done — try lower quality or max width for smaller files',
                            );
                        } else {
                            toast.error('Compression failed for this format');
                        }
                        setCompressing(false);
                    },
                    mime,
                    q,
                );
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
            outputFormat === 'image/png'
                ? 'png'
                : outputFormat === 'image/webp'
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
        <div className="flex-1 w-full min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0f1419] dark:via-background dark:to-[#0f1419]">
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
                    className="group flex items-center gap-2 mb-4 px-4 py-2 rounded-xl bg-background/60 backdrop-blur-sm border border-border/50 hover:border-primary/50 hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-md"
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/10 to-red-500/10 text-orange-600 dark:text-orange-400 text-sm font-semibold mb-5">
                        <Zap className="h-4 w-4" />
                        Free Compressor
                    </div>
                    <h1 className="text-foreground text-4xl md:text-5xl font-black tracking-tight mb-4">Image Compressor</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Reduce image file size while maintaining quality</p>
                </div>

                <div className="bg-white/80 dark:bg-[#1a1f2e]/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/40 overflow-hidden">
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
                                <p className="text-sm text-muted-foreground">JPG, PNG, WebP · processed in your browser · free forever</p>
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
                                        setImage(null); setPreview(''); setCompressedUrl(''); setDims(null);
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
                                            className="w-full h-11 rounded-xl border border-border/50 bg-card/40 backdrop-blur-md px-3 text-sm"
                                        >
                                            <option value="image/jpeg">JPG (best for photos)</option>
                                            <option value="image/webp">WebP (smaller, modern)</option>
                                            <option value="image/png">PNG (lossless / transparency)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Max width (optional)</label>
                                        <select
                                            value={maxWidth}
                                            onChange={(e) => setMaxWidth(parseInt(e.target.value, 10))}
                                            className="w-full h-11 rounded-xl border border-border/50 bg-card/40 backdrop-blur-md px-3 text-sm"
                                        >
                                            <option value={0}>Keep original size</option>
                                            <option value={1920}>1920px (Full HD)</option>
                                            <option value={1280}>1280px</option>
                                            <option value={800}>800px (blog)</option>
                                            <option value={400}>400px (thumbnail)</option>
                                        </select>
                                    </div>
                                </div>

                                {outputFormat !== 'image/png' && (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <label className="font-medium text-foreground">Quality: {quality}%</label>
                                            <span className="text-sm text-muted-foreground">{quality < 50 ? 'Smaller file' : quality < 80 ? 'Balanced' : 'High quality'}</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="10"
                                            max="100"
                                            value={quality}
                                            onChange={(e) => setQuality(parseInt(e.target.value))}
                                            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer "
                                        />
                                    </div>
                                )}

                                <Button onClick={compressImage} disabled={compressing} className="w-full h-14 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-2xl shadow-xl shadow-orange-500/30">
                                    {compressing ? <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Compressing...</> : <><Zap className="h-5 w-5 mr-2" /> Compress Image</>}
                                </Button>

                                {compressedUrl && (
                                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 space-y-3">
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                            <div>
                                                <p className="font-bold text-green-700 dark:text-green-400">Ready to download</p>
                                                <p className="text-sm text-green-600 dark:text-green-500">
                                                    {formatSize(originalSize)} → {formatSize(compressedSize)}
                                                    {reduction > 0 ? ` (${reduction}% smaller)` : reduction < 0 ? ' (larger — try JPG/WebP or lower quality)' : ''}
                                                </p>
                                            </div>
                                            <Button onClick={downloadCompressed} className="bg-green-600 hover:bg-green-700">
                                                <Download className="h-4 w-4 mr-2" /> Download
                                            </Button>
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-1">Original</p>
                                                <img src={preview} alt="Original" className="w-full h-28 object-contain rounded-lg bg-white/50" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-1">Compressed</p>
                                                <img src={compressedUrl} alt="Compressed preview" className="w-full h-28 object-contain rounded-lg bg-white/50" />
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
                            <div key={item.step} className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/50 dark:bg-muted/50 border border-slate-100 ">
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
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-emerald-50/50 dark:from-green-900/20 dark:to-emerald-900/10 border border-green-100 dark:border-green-800/30">
                        <Shield className="h-8 w-8 text-green-600 mb-3" />
                        <h3 className="font-bold text-foreground mb-2">100% Private</h3>
                        <p className="text-sm text-muted-foreground">Processed locally in browser</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50/50 dark:from-orange-900/20 dark:to-amber-900/10 border border-orange-100 dark:border-orange-800/30">
                        <Zap className="h-8 w-8 text-orange-600 mb-3" />
                        <h3 className="font-bold text-foreground mb-2">Adjustable Quality</h3>
                        <p className="text-sm text-muted-foreground">Control compression level</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50/50 dark:from-purple-900/20 dark:to-pink-900/10 border border-purple-100 dark:border-purple-800/30">
                        <Sparkles className="h-8 w-8 text-purple-600 mb-3" />
                        <h3 className="font-bold text-foreground mb-2">Instant Results</h3>
                        <p className="text-sm text-muted-foreground">See size reduction immediately</p>
                    </div>
                </div>

                {/* Testimonial */}
                <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-orange-500/5 via-red-500/5 to-amber-500/5 border border-orange-200/50 dark:border-orange-800/30">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                        <p className="text-lg italic text-foreground/80 max-w-2xl mb-4">
                            "Reduced my website images by 60%! Page load speed improved dramatically."
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
                                className="group p-4 rounded-xl bg-white/50 dark:bg-muted/50 border border-slate-100  hover:border-primary/50 hover:shadow-lg transition-all text-center"
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
