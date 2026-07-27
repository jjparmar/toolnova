/**
 * Browser-side PDF compression via render-to-JPEG + rebuild.
 * Trade-off: pages become raster images (good for scans; text may soft on extreme settings).
 */
import { loadPdfJs } from "@/lib/pdf-client";

export type PdfCompressPreset = "high" | "balanced" | "smallest";

export const PDF_COMPRESS_PRESETS: Record<
  PdfCompressPreset,
  { label: string; scale: number; jpegQuality: number; hint: string }
> = {
  high: {
    label: "High quality",
    scale: 1.35,
    jpegQuality: 0.82,
    hint: "Best readability — moderate size cut",
  },
  balanced: {
    label: "Balanced",
    scale: 1.0,
    jpegQuality: 0.65,
    hint: "Good for email & most portals",
  },
  smallest: {
    label: "Smallest file",
    scale: 0.72,
    jpegQuality: 0.42,
    hint: "Max shrink — use when under a hard 1MB cap",
  },
};

function canvasToJpegBytes(
  canvas: HTMLCanvasElement,
  quality: number,
): Promise<Uint8Array> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      async (blob) => {
        if (!blob) {
          reject(new Error("Failed to encode page image"));
          return;
        }
        const buf = await blob.arrayBuffer();
        resolve(new Uint8Array(buf));
      },
      "image/jpeg",
      quality,
    );
  });
}

export async function compressPdfBytes(
  data: ArrayBuffer,
  preset: PdfCompressPreset = "balanced",
  onProgress?: (page: number, total: number) => void,
): Promise<{ bytes: Uint8Array; pageCount: number }> {
  const cfg = PDF_COMPRESS_PRESETS[preset] || PDF_COMPRESS_PRESETS.balanced;
  const pdfjs = await loadPdfJs();
  const { PDFDocument } = await import("pdf-lib");

  const tryLoad = async () => {
    const task = pdfjs.getDocument({
      data: new Uint8Array(data),
      stopAtErrors: false,
    });
    return task.promise;
  };

  let pdf: Awaited<ReturnType<typeof tryLoad>>;
  try {
    pdf = await tryLoad();
  } catch {
    const fallback = (pdfjs as { __workerFallback?: string }).__workerFallback;
    if (fallback && pdfjs.GlobalWorkerOptions.workerSrc !== fallback) {
      pdfjs.GlobalWorkerOptions.workerSrc = fallback;
      pdf = await tryLoad();
    } else {
      throw new Error("Could not open this PDF for compression");
    }
  }

  const pageCount = pdf.numPages;
  if (pageCount < 1) throw new Error("PDF has no pages");
  if (pageCount > 120) {
    throw new Error(
      "This PDF has too many pages for browser compression (max 120). Split it first, then compress sections.",
    );
  }

  const out = await PDFDocument.create();

  for (let i = 1; i <= pageCount; i++) {
    onProgress?.(i, pageCount);
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale: cfg.scale });
    const canvas = document.createElement("canvas");
    const w = Math.max(1, Math.ceil(viewport.width));
    const h = Math.max(1, Math.ceil(viewport.height));
    // Guard extreme memory
    if (w * h > 25_000_000) {
      throw new Error(
        `Page ${i} is too large to compress in-browser. Try Smallest preset or split the PDF.`,
      );
    }
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas not supported in this browser");

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    const renderTask = page.render({
      canvasContext: ctx,
      canvas,
      viewport,
    } as Parameters<typeof page.render>[0]);
    await renderTask.promise;

    const jpeg = await canvasToJpegBytes(canvas, cfg.jpegQuality);
    const image = await out.embedJpg(jpeg);
    const pdfPage = out.addPage([image.width, image.height]);
    pdfPage.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }

  const bytes = await out.save({ useObjectStreams: true });
  return { bytes, pageCount };
}
