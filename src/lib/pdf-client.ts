/**
 * Browser-side PDF helpers: thumbnails (pdf.js) + ZIP (jszip).
 */

export async function loadPdfJs() {
  const pdfjs = await import("pdfjs-dist");
  // Prefer same-version worker from jsDelivr
  const version = (pdfjs as { version?: string }).version || "5.4.296";
  pdfjs.GlobalWorkerOptions.workerSrc = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${version}/build/pdf.worker.min.mjs`;
  return pdfjs;
}

export async function renderPdfPageThumbnails(
  data: ArrayBuffer,
  options?: { maxWidth?: number; maxPages?: number },
): Promise<{ pageCount: number; thumbs: string[] }> {
  const maxWidth = options?.maxWidth ?? 160;
  const maxPages = options?.maxPages ?? 80;
  const pdfjs = await loadPdfJs();
  const loadingTask = pdfjs.getDocument({ data: new Uint8Array(data) });
  const pdf = await loadingTask.promise;
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
    type: "blob",
    compression: "DEFLATE",
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
