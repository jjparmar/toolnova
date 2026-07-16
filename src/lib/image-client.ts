/**
 * Browser-side image helpers for ToolNova PDF/image tools.
 * High-quality canvas ops, downloads, size labels.
 */

/** Accept image by MIME or common extension. */
export function isImageFile(file: File): boolean {
  if (file.type.startsWith("image/")) return true;
  return /\.(jpe?g|png|webp|gif|bmp|avif|heic|heif)$/i.test(file.name);
}

export function formatBytes(bytes: number): string {
  if (!bytes || bytes <= 0) return"0 B";
  const k = 1024;
  const sizes = ["B","KB","MB","GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return`${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function loadImageFromSrc(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new window.Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Could not load image"));
    img.src = src;
  });
}

export function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Could not read file"));
    reader.readAsDataURL(file);
  });
}

export type DrawOptions = {
  width?: number;
  height?: number;
  /** Source crop in natural pixels */
  sx?: number;
  sy?: number;
  sw?: number;
  sh?: number;
  /** Fill background (needed for JPEG from transparent PNG) */
  fill?: string;
  mime?: string;
  quality?: number; // 0–1 for jpeg/webp
};

/** Draw image to canvas with high-quality smoothing and return a Blob. */
export async function imageToBlob(
  src: string,
  opts: DrawOptions = {},
): Promise<{ blob: Blob; width: number; height: number }> {
  const img = await loadImageFromSrc(src);
  const sx = opts.sx ?? 0;
  const sy = opts.sy ?? 0;
  const sw = opts.sw ?? img.naturalWidth;
  const sh = opts.sh ?? img.naturalHeight;
  const width = Math.max(1, Math.round(opts.width ?? sw));
  const height = Math.max(1, Math.round(opts.height ?? sh));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality ="high";

  const mime = opts.mime ||"image/png";
  if (opts.fill || mime ==="image/jpeg") {
    ctx.fillStyle = opts.fill ||"#ffffff";
    ctx.fillRect(0, 0, width, height);
  }

  ctx.drawImage(img, sx, sy, sw, sh, 0, 0, width, height);

  const quality =
    mime ==="image/png" ? undefined : (opts.quality ?? 0.92);

  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, mime, quality),
  );
  if (!blob) throw new Error("Export failed");
  return { blob, width, height };
}

export function baseName(filename: string): string {
  return filename.replace(/\.[^.]+$/,"") ||"image";
}

export type RotateDeg = 0 | 90 | 180 | 270;

/**
 * Rotate and/or flip an image; returns a new data URL (PNG) and dimensions.
 * rotation is clockwise degrees.
 */
export async function transformImageSrc(
  src: string,
  opts: { rotate?: RotateDeg; flipH?: boolean; flipV?: boolean } = {},
): Promise<{ dataUrl: string; width: number; height: number }> {
  const img = await loadImageFromSrc(src);
  const rotate = opts.rotate ?? 0;
  const flipH = !!opts.flipH;
  const flipV = !!opts.flipV;

  const swap = rotate === 90 || rotate === 270;
  const width = swap ? img.naturalHeight : img.naturalWidth;
  const height = swap ? img.naturalWidth : img.naturalHeight;

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality ="high";
  ctx.translate(width / 2, height / 2);
  ctx.rotate((rotate * Math.PI) / 180);
  ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1);
  ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);

  return {
    dataUrl: canvas.toDataURL("image/png"),
    width,
    height,
  };
}

/** Build a minimal store-only ZIP (no compression) for already-compressed PDFs. */
export async function buildZipBlob(
  files: { name: string; data: Uint8Array }[],
): Promise<Blob> {
  // Prefer jszip when available
  try {
    const JSZip = (await import("jszip")).default;
    const zip = new JSZip();
    for (const f of files) {
      zip.file(f.name, f.data);
    }
    return await zip.generateAsync({ type:"blob" });
  } catch {
    // Fallback: single-file passthrough not possible for multi; throw
    throw new Error("ZIP library failed to load");
  }
}

export function extForMime(mime: string): string {
  if (mime ==="image/jpeg") return"jpg";
  if (mime ==="image/webp") return"webp";
  if (mime ==="image/png") return"png";
  return"bin";
}

/** A4 points at 72 DPI (PDF) */
export const PDF_PAGE = {
  a4: { w: 595.28, h: 841.89 },
  letter: { w: 612, h: 792 },
} as const;

/**
 * Fit image into a page box with optional margin, preserve aspect ratio.
 * Returns draw rect in page coordinates.
 */
export function fitImageInPage(
  imgW: number,
  imgH: number,
  pageW: number,
  pageH: number,
  margin: number,
): { x: number; y: number; width: number; height: number } {
  const maxW = Math.max(1, pageW - margin * 2);
  const maxH = Math.max(1, pageH - margin * 2);
  const scale = Math.min(maxW / imgW, maxH / imgH, 1);
  const width = imgW * scale;
  const height = imgH * scale;
  return {
    x: (pageW - width) / 2,
    y: (pageH - height) / 2,
    width,
    height,
  };
}
