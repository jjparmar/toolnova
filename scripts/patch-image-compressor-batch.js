const fs = require("fs");
const path = require("path");
const p = path.join(__dirname, "..", "src/app/tools/image-compressor/client.tsx");
let s = fs.readFileSync(p, "utf8");

if (!s.includes("jszip") && !s.includes("JSZip")) {
  s = s.replace(
    "import { isImageFile } from '@/lib/image-client';",
    `import { isImageFile, compressImageFile, extForMime, baseName, downloadBlob, formatBytes } from '@/lib/image-client';
import JSZip from 'jszip';`
  );
}

s = s.replace(
  'accept="image/*" className="hidden"',
  'accept="image/*" multiple className="hidden"'
);
s = s.replace(
  "Drop image here or click to upload",
  "Drop images here or click to upload"
);
s = s.replace(
  "JPG, PNG, WebP · processed locally in your browser · free forever",
  "JPG, PNG, WebP · single or batch (up to 30) · processed in your browser"
);

if (!s.includes("batchItems")) {
  s = s.replace(
    "const [note, setNote] = useState<string>('');",
    `const [note, setNote] = useState<string>('');
    type BatchItem = { id: string; file: File; status: 'pending' | 'done' | 'error'; originalSize: number; compressedSize?: number; url?: string; mime?: string; error?: string };
    const [batchItems, setBatchItems] = useState<BatchItem[]>([]);
    const [batchMode, setBatchMode] = useState(false);`
  );
}

const oldHandleStart = "const handleFileSelect = (files: FileList | null) => {";
const oldHandleEnd = "reader.readAsDataURL(file);\n    };";

const start = s.indexOf(oldHandleStart);
const end = s.indexOf(oldHandleEnd, start);
if (start < 0 || end < 0) {
  console.error("Could not locate handleFileSelect block");
  process.exit(1);
}
const endPos = end + oldHandleEnd.length;

const newHandle = `const handleFileSelect = (files: FileList | null) => {
        if (!files || files.length === 0) return;
        const list = Array.from(files).filter(isImageFile).slice(0, 30);
        if (!list.length) {
            toast.error('Please select image files (JPG, PNG, WebP)');
            return;
        }
        if (list.some((f) => f.size > 40 * 1024 * 1024)) {
            toast.error('Each image must be under 40MB');
            return;
        }
        if (list.length > 1) {
            setBatchMode(true);
            setImage(null);
            setPreview('');
            if (compressedUrl) URL.revokeObjectURL(compressedUrl);
            setCompressedUrl('');
            setBatchItems(list.map((file, i) => ({
                id: \`\${Date.now()}-\${i}\`,
                file,
                status: 'pending' as const,
                originalSize: file.size,
            })));
            toast.success(\`\${list.length} images ready for batch compress\`);
            return;
        }
        setBatchMode(false);
        setBatchItems([]);
        const file = list[0];
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

    const compressBatch = async () => {
        if (!batchItems.length || compressing) return;
        setCompressing(true);
        const next = [...batchItems];
        for (let i = 0; i < next.length; i++) {
            const item = next[i];
            try {
                const res = await compressImageFile(item.file, {
                    quality,
                    maxWidth,
                    outputFormat,
                });
                if (item.url) URL.revokeObjectURL(item.url);
                next[i] = {
                    ...item,
                    status: 'done',
                    compressedSize: res.blob.size,
                    url: URL.createObjectURL(res.blob),
                    mime: res.mime,
                };
            } catch (e) {
                next[i] = {
                    ...item,
                    status: 'error',
                    error: e instanceof Error ? e.message : 'Failed',
                };
            }
            setBatchItems([...next]);
        }
        setCompressing(false);
        const ok = next.filter((x) => x.status === 'done').length;
        toast.success(\`Compressed \${ok}/\${next.length} images\`);
    };

    const downloadBatchZip = async () => {
        const done = batchItems.filter((x) => x.status === 'done' && x.url);
        if (!done.length) return;
        const zip = new JSZip();
        for (const item of done) {
            const res = await fetch(item.url!);
            const blob = await res.blob();
            const ext = extForMime(item.mime || 'image/jpeg');
            zip.file(\`compressed-\${baseName(item.file.name)}.\${ext}\`, blob);
        }
        const out = await zip.generateAsync({ type: 'blob' });
        downloadBlob(out, \`compressed-images-\${Date.now()}.zip\`);
        toast.success('ZIP download started');
    };`;

s = s.slice(0, start) + newHandle + s.slice(endPos);

if (!s.includes("batchMode && batchItems")) {
  s = s.replace(
    "{!image ? (",
    `{batchMode && batchItems.length > 0 ? (
                            <div className="space-y-5">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <p className="font-semibold text-foreground">{batchItems.length} images selected</p>
                                    <Button variant="ghost" size="sm" onClick={() => {
                                        batchItems.forEach((b) => b.url && URL.revokeObjectURL(b.url));
                                        setBatchItems([]);
                                        setBatchMode(false);
                                    }} className="text-red-500"><Trash2 className="h-4 w-4 mr-1" /> Clear</Button>
                                </div>
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Output format</label>
                                        <select value={outputFormat} onChange={(e) => setOutputFormat(e.target.value as typeof outputFormat)} className="w-full h-11 rounded-xl border border-border/50 px-3 text-sm">
                                            <option value="auto">Auto (smallest)</option>
                                            <option value="image/webp">WebP</option>
                                            <option value="image/jpeg">JPG</option>
                                            <option value="image/png">PNG</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Max width</label>
                                        <select value={maxWidth} onChange={(e) => setMaxWidth(parseInt(e.target.value, 10))} className="w-full h-11 rounded-xl border border-border/50 px-3 text-sm">
                                            <option value={0}>Original</option>
                                            <option value={1920}>1920px</option>
                                            <option value={1280}>1280px</option>
                                            <option value={800}>800px</option>
                                            <option value={400}>400px</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="font-medium">Quality: {quality}%</label>
                                    <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(parseInt(e.target.value))} className="w-full" />
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button onClick={() => void compressBatch()} disabled={compressing} className="flex-1 h-12 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold">
                                        {compressing ? <><Loader2 className="h-4 w-4 animate-spin mr-2" /> Compressing batch…</> : <><Zap className="h-4 w-4 mr-2" /> Compress all</>}
                                    </Button>
                                    {batchItems.some((b) => b.status === 'done') && (
                                        <Button onClick={() => void downloadBatchZip()} variant="secondary" className="h-12 font-bold">
                                            <Download className="h-4 w-4 mr-2" /> Download ZIP
                                        </Button>
                                    )}
                                </div>
                                <ul className="divide-y divide-border rounded-xl border border-border max-h-80 overflow-auto">
                                    {batchItems.map((item) => (
                                        <li key={item.id} className="flex items-center justify-between gap-3 px-3 py-2 text-sm">
                                            <span className="truncate font-medium">{item.file.name}</span>
                                            <span className="shrink-0 text-muted-foreground">
                                                {item.status === 'pending' && formatBytes(item.originalSize)}
                                                {item.status === 'done' && item.compressedSize != null && (
                                                    <span className="text-emerald-700 font-semibold">{formatBytes(item.originalSize)} → {formatBytes(item.compressedSize)}</span>
                                                )}
                                                {item.status === 'error' && <span className="text-red-600">{item.error || 'Error'}</span>}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ) : !image ? (`
  );
}

fs.writeFileSync(p, s);
console.log("patched image-compressor batch OK");
