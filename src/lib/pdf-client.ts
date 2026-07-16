/**
 * Browser-side PDF helpers: thumbnails (pdf.js) + ZIP (jszip).
 */

/** Accept PDF by MIME or extension (some OSes leave type empty). */
export function isPdfFile(file: File): boolean {
  if (file.type ==="application/pdf") return true;
  return /\.pdf$/i.test(file.name);
}

export async function loadPdfJs() {
  const pdfjs = await import("pdfjs-dist");
  // Pin worker to installed major.line — package requires Node 20-friendly 4.x
  const version = (pdfjs as { version?: string }).version ||"4.10.38";
  // Primary CDN + fallback (blocked CDNs break reorder thumbnails)
  const primary =`https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
  const fallback =`https://unpkg.com/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
  if (!pdfjs.GlobalWorkerOptions.workerSrc) {
    pdfjs.GlobalWorkerOptions.workerSrc = primary;
  }
  // Expose fallback for callers that retry
  (pdfjs as { __workerFallback?: string }).__workerFallback = fallback;
  return pdfjs;
}

export async function renderPdfPageThumbnails(
  data: ArrayBuffer,
  options?: { maxWidth?: number; maxPages?: number },
): Promise<{ pageCount: number; thumbs: string[] }> {
  const maxWidth = options?.maxWidth ?? 160;
  const maxPages = options?.maxPages ?? 80;
  const pdfjs = await loadPdfJs();

  const tryLoad = async () => {
    const loadingTask = pdfjs.getDocument({
      data: new Uint8Array(data),
      // Improve robustness for slightly damaged student PDFs
      stopAtErrors: false,
    });
    return loadingTask.promise;
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
      throw new Error("Could not render PDF previews (worker or file error)");
    }
  }
  const pageCount = pdf.numPages;
  const limit = Math.min(pageCount, maxPages);
  const thumbs: string[] = [];

  for (let i = 1; i <= limit; i++) {
    try {
      const page = await pdf.getPage(i);
      const unscaled = page.getViewport({ scale: 1 });
      const scale = maxWidth / unscaled.width;
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement("canvas");
      canvas.width = Math.ceil(viewport.width);
      canvas.height = Math.ceil(viewport.height);
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        thumbs.push("");
        continue;
      }
      const task = page.render({
        canvasContext: ctx,
        canvas,
        viewport,
      } as Parameters<typeof page.render>[0]);
      await task.promise;
      thumbs.push(canvas.toDataURL("image/jpeg", 0.72));
    } catch {
      thumbs.push("");
    }
  }

  while (thumbs.length < pageCount && thumbs.length < maxPages) {
    thumbs.push("");
  }

  return { pageCount, thumbs };
}

export async function zipPdfFiles(
  files: { name: string; bytes: Uint8Array }[],
): Promise<Blob> {
  const JSZip = (await import("jszip")).default;
  const zip = new JSZip();
  for (const f of files) {
    zip.file(f.name, f.bytes);
  }
  return zip.generateAsync({
    type:"blob",
    compression:"DEFLATE",
    compressionOptions: { level: 6 },
  });
}

export function downloadBytes(bytes: Uint8Array, filename: string, mime: string) {
  const copy = new Uint8Array(bytes.byteLength);
  copy.set(bytes);
  const blob = new Blob([copy.buffer], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2500);
}
