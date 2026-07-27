'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Upload, Download, Maximize2, Loader2, ArrowLeft, Shield, Sparkles, Star, ImageIcon, FileText, Layers, RefreshCw, RotateCw, FlipHorizontal2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';
import { isImageFile, transformImageSrc } from '@/lib/image-client';

const relatedTools = [
    { name: 'Crop Image', slug: 'image-crop', icon: Maximize2, color: 'from-violet-500 to-purple-500' },
    { name: 'Image Compressor', slug: 'image-compressor', icon: RefreshCw, color: 'from-orange-500 to-red-500' },
    { name: 'JPG to PNG', slug: 'jpg-to-png', icon: ImageIcon, color: 'from-cyan-500 to-blue-500' },
    { name: 'Image to PDF', slug: 'image-to-pdf', icon: FileText, color: 'from-green-500 to-teal-500' },
];

const SIZE_PRESETS = [
    { label: 'Instagram square', w: 1080, h: 1080 },
    { label: 'Story 9:16', w: 1080, h: 1920 },
    { label: 'YouTube thumb', w: 1280, h: 720 },
    { label: 'HD 1920', w: 1920, h: 1080 },
    { label: 'Avatar 400', w: 400, h: 400 },
    { label: '50%', w: 0, h: 0, pct: 50 },
    { label: '25%', w: 0, h: 0, pct: 25 },
] as const;

export default function ResizeImageClient() {
    const router = useRouter();
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>('');
    const [resizing, setResizing] = useState(false);
    
    const [originalWidth, setOriginalWidth] = useState<number>(0);
    const [originalHeight, setOriginalHeight] = useState<number>(0);
    const [targetWidth, setTargetWidth] = useState<number>(0);
    const [targetHeight, setTargetHeight] = useState<number>(0);
    const [maintainAspectRatio, setMaintainAspectRatio] = useState(true);
    
    const [resizedUrl, setResizedUrl] = useState<string>('');
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
            
            // Read dimensions
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
                    // White fill for formats that don't support transparency well when upscaling from empty
                    if ((image.type || '').includes('jpeg') || (image.type || '').includes('jpg')) {
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
        } catch (error) {
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
        a.download =`resized-${targetWidth}x${targetHeight}-${base}.${ext}`;
        a.click();
    };

    return (
        <div className="flex-1 w-full min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
            {/* Animated Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
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
                    <span className="text-primary text-sm font-semibold">Image Resizer</span>
                </div>

                <div className="text-center mb-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-cyan-500/10 text-blue-600 text-sm font-semibold mb-5">
                        <Maximize2 className="h-4 w-4" />
                        Free Image Resizer
                    </div>
                    <h1 className="text-foreground text-4xl md:text-5xl font-black tracking-tight mb-4">Image Resizer</h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Resize images to exact pixel dimensions instantly in your browser.</p>
                </div>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-border/40 overflow-hidden">
                    <div className="p-6 md:p-8">
                        <input type="file" ref={fileInputRef} onChange={(e) => handleFileSelect(e.target.files)} accept="image/*" className="hidden" />

                        {!image ? (
                            <div
                                onClick={() => fileInputRef.current?.click()}
                                onDragOver={(e) => { e.preventDefault(); }}
                                onDrop={(e) => {
                                    e.preventDefault();
                                    handleFileSelect(e.dataTransfer.files);
                                }}
                                className="border-2 border-dashed border-border/50 rounded-2xl p-10 text-center cursor-pointer hover:border-primary/50 transition-all"
                            >
                                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                <p className="text-lg font-semibold text-foreground mb-2">Drop image here or click to upload</p>
                                <p className="text-sm text-muted-foreground">JPG, PNG, WebP supported</p>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-lg">{image.name}</h3>
                                    <button 
                                        type="button"
                                        onClick={() => {
                                            if (resizedUrl) URL.revokeObjectURL(resizedUrl);
                                            setImage(null);
                                            setPreview('');
                                            setResizedUrl('');
                                        }}
                                        className="text-sm text-red-500 hover:text-red-600 font-medium"
                                    >
                                        Remove
                                    </button>
                                </div>
                                
                                <div className="bg-muted/50 rounded-xl p-4 flex justify-center max-h-[300px] overflow-hidden border border-border/50">
                                    <img src={preview} alt="Preview" className="object-contain w-full h-full" />
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={async () => {
                                            try {
                                                const { dataUrl, width, height } = await transformImageSrc(preview, { rotate: 90 });
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
                                        <RotateCw className="h-4 w-4 mr-1" /> Rotate 90°
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={async () => {
                                            try {
                                                const { dataUrl, width, height } = await transformImageSrc(preview, { flipH: true });
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
                                        <FlipHorizontal2 className="h-4 w-4 mr-1" /> Flip H
                                    </Button>
                                    <Link href="/tools/image-crop" className="inline-flex">
                                        <Button type="button" variant="outline" size="sm">
                                            Crop region →
                                        </Button>
                                    </Link>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-muted-foreground mb-2">Quick size presets</p>
                                    <div className="flex flex-wrap gap-2">
                                        {SIZE_PRESETS.map((p) => (
                                            <button
                                                key={p.label}
                                                type="button"
                                                onClick={() => {
                                                    // Percentage presets scale original; fixed presets use exact W×H
                                                    if ('pct' in p && p.pct) {
                                                        const w = Math.max(1, Math.round((originalWidth * p.pct) / 100));
                                                        const h = Math.max(1, Math.round((originalHeight * p.pct) / 100));
                                                        setTargetWidth(w);
                                                        setTargetHeight(h);
                                                    } else {
                                                        setTargetWidth(p.w);
                                                        setTargetHeight(p.h);
                                                    }
                                                }}
                                                className="px-3 py-1.5 rounded-full text-xs font-bold border border-border/50 bg-slate-50  hover:border-primary/50"
                                            >
                                                {p.label}
                                            </button>
                                        ))}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Need to cut a region first?{""}
                                        <Link href="/tools/image-crop" className="text-primary font-medium underline underline-offset-2">
                                            Open Crop Image
                                        </Link>
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Width (px)</label>
                                        <input 
                                            type="number" 
                                            value={targetWidth} 
                                            onChange={(e) => handleWidthChange(e.target.value)}
                                            className="w-full p-3 rounded-xl border border-border/50 bg-card/40 backdrop-blur-md focus:ring-2 focus:ring-primary outline-none transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-muted-foreground">Height (px)</label>
                                        <input 
                                            type="number" 
                                            value={targetHeight} 
                                            onChange={(e) => handleHeightChange(e.target.value)}
                                            className="w-full p-3 rounded-xl border border-border/50 bg-card/40 backdrop-blur-md focus:ring-2 focus:ring-primary outline-none transition-all"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    <input 
                                        type="checkbox" 
                                        id="maintainAspect" 
                                        checked={maintainAspectRatio}
                                        onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                                        className="w-4 h-4 text-primary rounded border-slate-300 focus:ring-primary"
                                    />
                                    <label htmlFor="maintainAspect" className="text-sm font-medium cursor-pointer">
                                        Maintain aspect ratio
                                    </label>
                                </div>

                                <p className="text-sm text-muted-foreground">Original: {originalWidth}×{originalHeight} px → Target: {targetWidth}×{targetHeight} px</p>

                                <Button type="button" onClick={resizeImage} disabled={resizing} className="w-full h-14 bg-gradient-to-r from-primary to-teal-600 text-primary-foreground font-bold rounded-2xl shadow-xl shadow-primary/25">
                                    {resizing ? <><Loader2 className="h-5 w-5 animate-spin mr-2" /> Resizing...</> : <><Maximize2 className="h-5 w-5 mr-2" /> Resize Image</>}
                                </Button>

                                {resizedUrl && (
                                    <div className="p-4 bg-green-50 rounded-xl border border-green-200 space-y-3">
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <div>
                                                <p className="font-bold text-green-700">Resized successfully</p>
                                                <p className="text-sm text-green-600">
                                                    {targetWidth}×{targetHeight} px
                                                </p>
                                            </div>
                                            <Button onClick={downloadResized} className="bg-green-600 hover:bg-green-700">
                                                <Download className="h-4 w-4 mr-2" /> Download
                                            </Button>
                                        </div>
                                        <img src={resizedUrl} alt="Resized preview" className="max-h-48 mx-auto object-contain rounded-lg" />
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
                            { step: 1, title: 'Upload Image', desc: 'Select your image', icon: Upload, color: 'from-blue-500 to-cyan-600' },
                            { step: 2, title: 'Set Dimensions', desc: 'Enter width & height', icon: Maximize2, color: 'from-indigo-500 to-purple-600' },
                            { step: 3, title: 'Download', desc: 'Get resized file', icon: Download, color: 'from-green-500 to-emerald-600' },
                        ].map((item) => (
                            <div key={item.step} className="flex flex-col items-center text-center p-6 rounded-2xl bg-card/70 border border-[var(--border-color)]">
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
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50/50 border border-blue-100">
                        <Maximize2 className="h-8 w-8 text-blue-600 mb-3" />
                        <h3 className="font-bold text-foreground mb-2">Exact Dimensions</h3>
                        <p className="text-sm text-muted-foreground">Resize to specific pixel sizes</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50/50 border border-purple-100">
                        <Sparkles className="h-8 w-8 text-purple-600 mb-3" />
                        <h3 className="font-bold text-foreground mb-2">High Quality</h3>
                        <p className="text-sm text-muted-foreground">Maintains optimal image fidelity</p>
                    </div>
                </div>

                {/* Testimonial */}
                <div className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-teal-500/5 border border-blue-200/50">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                            ))}
                        </div>
                        <p className="text-lg italic text-foreground/80 max-w-2xl mb-4">"Perfect tool for resizing social media banners to exact dimensions without losing quality. Love that it's completely browser-based."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                                S
                            </div>
                            <div className="text-left">
                                <p className="font-semibold text-foreground">Sarah Parker</p>
                                <p className="text-sm text-muted-foreground">Digital Marketer</p>
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
                                className="group p-4 rounded-xl bg-card/70 border border-[var(--border-color)]  hover:border-primary/50 hover:shadow-lg transition-all text-center"
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
