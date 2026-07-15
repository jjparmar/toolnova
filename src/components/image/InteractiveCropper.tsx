"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
} from "react";

export type CropRect = { x: number; y: number; w: number; h: number };

type Props = {
  src: string;
  naturalWidth: number;
  naturalHeight: number;
  value: CropRect;
  onChange: (rect: CropRect) => void;
  aspectRatio?: number | null; // null = free
  className?: string;
};

type DragMode =
  | "move"
  | "n"
  | "s"
  | "e"
  | "w"
  | "ne"
  | "nw"
  | "se"
  | "sw"
  | null;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

/**
 * Interactive crop overlay: drag to move, corner/edge handles to resize.
 * Coordinates are in natural image pixels.
 */
export function InteractiveCropper({
  src,
  naturalWidth,
  naturalHeight,
  value,
  onChange,
  aspectRatio = null,
  className = "",
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [display, setDisplay] = useState({ w: 0, h: 0, left: 0, top: 0 });
  const drag = useRef<{
    mode: DragMode;
    startX: number;
    startY: number;
    startRect: CropRect;
  } | null>(null);

  const measure = useCallback(() => {
    const img = imgRef.current;
    const box = containerRef.current;
    if (!img || !box) return;
    const br = img.getBoundingClientRect();
    const cr = box.getBoundingClientRect();
    setDisplay({
      w: br.width,
      h: br.height,
      left: br.left - cr.left,
      top: br.top - cr.top,
    });
  }, []);

  useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [measure, src, naturalWidth, naturalHeight]);

  const scaleX = display.w > 0 ? naturalWidth / display.w : 1;
  const scaleY = display.h > 0 ? naturalHeight / display.h : 1;

  const toDisplay = (r: CropRect) => ({
    left: display.left + r.x / scaleX,
    top: display.top + r.y / scaleY,
    width: r.w / scaleX,
    height: r.h / scaleY,
  });

  const applyAspect = (rect: CropRect, mode: DragMode): CropRect => {
    if (!aspectRatio || aspectRatio <= 0) return rect;
    let { x, y, w, h } = rect;
    // Keep width, derive height from aspect (except pure height edge drags)
    if (mode === "n" || mode === "s") {
      w = Math.round(h * aspectRatio);
    } else {
      h = Math.round(w / aspectRatio);
    }
    // Keep inside bounds
    if (x + w > naturalWidth) {
      w = naturalWidth - x;
      h = Math.round(w / aspectRatio);
    }
    if (y + h > naturalHeight) {
      h = naturalHeight - y;
      w = Math.round(h * aspectRatio);
    }
    w = Math.max(8, w);
    h = Math.max(8, h);
    return { x, y, w, h };
  };

  const onPointerDown = (
    e: ReactPointerEvent,
    mode: DragMode,
  ) => {
    e.preventDefault();
    e.stopPropagation();
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    drag.current = {
      mode,
      startX: e.clientX,
      startY: e.clientY,
      startRect: { ...value },
    };
  };

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!drag.current || !drag.current.mode) return;
      const { mode, startX, startY, startRect } = drag.current;
      const dx = (e.clientX - startX) * scaleX;
      const dy = (e.clientY - startY) * scaleY;
      let { x, y, w, h } = startRect;

      if (mode === "move") {
        x = clamp(Math.round(startRect.x + dx), 0, naturalWidth - w);
        y = clamp(Math.round(startRect.y + dy), 0, naturalHeight - h);
      } else {
        if (mode.includes("e")) {
          w = clamp(Math.round(startRect.w + dx), 8, naturalWidth - x);
        }
        if (mode.includes("s")) {
          h = clamp(Math.round(startRect.h + dy), 8, naturalHeight - y);
        }
        if (mode.includes("w")) {
          const nw = clamp(
            Math.round(startRect.w - dx),
            8,
            startRect.x + startRect.w,
          );
          x = startRect.x + startRect.w - nw;
          w = nw;
          x = clamp(x, 0, naturalWidth - 8);
        }
        if (mode.includes("n")) {
          const nh = clamp(
            Math.round(startRect.h - dy),
            8,
            startRect.y + startRect.h,
          );
          y = startRect.y + startRect.h - nh;
          h = nh;
          y = clamp(y, 0, naturalHeight - 8);
        }
      }

      let next = { x, y, w, h };
      next = applyAspect(next, mode);
      // Final clamp
      next.w = clamp(next.w, 8, naturalWidth - next.x);
      next.h = clamp(next.h, 8, naturalHeight - next.y);
      next.x = clamp(next.x, 0, naturalWidth - next.w);
      next.y = clamp(next.y, 0, naturalHeight - next.h);
      onChange(next);
    };

    const onUp = () => {
      drag.current = null;
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [scaleX, scaleY, naturalWidth, naturalHeight, onChange, aspectRatio]);

  const box = toDisplay(value);
  const handles: { mode: DragMode; style: CSSProperties; cursor: string }[] =
    [
      { mode: "nw", style: { left: -6, top: -6 }, cursor: "nwse-resize" },
      { mode: "ne", style: { right: -6, top: -6 }, cursor: "nesw-resize" },
      { mode: "sw", style: { left: -6, bottom: -6 }, cursor: "nesw-resize" },
      { mode: "se", style: { right: -6, bottom: -6 }, cursor: "nwse-resize" },
      {
        mode: "n",
        style: { left: "50%", top: -6, transform: "translateX(-50%)" },
        cursor: "ns-resize",
      },
      {
        mode: "s",
        style: { left: "50%", bottom: -6, transform: "translateX(-50%)" },
        cursor: "ns-resize",
      },
      {
        mode: "w",
        style: { top: "50%", left: -6, transform: "translateY(-50%)" },
        cursor: "ew-resize",
      },
      {
        mode: "e",
        style: { top: "50%", right: -6, transform: "translateY(-50%)" },
        cursor: "ew-resize",
      },
    ];

  return (
    <div
      ref={containerRef}
      className={`relative w-full select-none touch-none bg-slate-100 dark:bg-slate-900 rounded-xl overflow-hidden flex items-center justify-center min-h-[240px] ${className}`}
    >
      <img
        ref={imgRef}
        src={src}
        alt="Crop preview"
        className="max-w-full max-h-[420px] object-contain"
        draggable={false}
        onLoad={measure}
      />

      {display.w > 0 && (
        <>
          {/* Dim outside crop */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              boxShadow: `inset ${box.left}px ${box.top}px 0 0 rgba(0,0,0,0.45),
                inset ${box.left + box.width - display.w - display.left}px ${box.top}px 0 0 rgba(0,0,0,0.45)`,
            }}
          />
          {/* Simpler overlay: 4 dark regions */}
          <div
            className="absolute bg-black/50 pointer-events-none"
            style={{
              left: display.left,
              top: display.top,
              width: display.w,
              height: Math.max(0, box.top - display.top),
            }}
          />
          <div
            className="absolute bg-black/50 pointer-events-none"
            style={{
              left: display.left,
              top: box.top + box.height,
              width: display.w,
              height: Math.max(
                0,
                display.top + display.h - (box.top + box.height),
              ),
            }}
          />
          <div
            className="absolute bg-black/50 pointer-events-none"
            style={{
              left: display.left,
              top: box.top,
              width: Math.max(0, box.left - display.left),
              height: box.height,
            }}
          />
          <div
            className="absolute bg-black/50 pointer-events-none"
            style={{
              left: box.left + box.width,
              top: box.top,
              width: Math.max(
                0,
                display.left + display.w - (box.left + box.width),
              ),
              height: box.height,
            }}
          />

          {/* Selection box */}
          <div
            className="absolute border-2 border-primary shadow-[0_0_0_1px_rgba(255,255,255,0.5)]"
            style={{
              left: box.left,
              top: box.top,
              width: box.width,
              height: box.height,
              cursor: "move",
            }}
            onPointerDown={(e) => onPointerDown(e, "move")}
          >
            {/* Rule of thirds guides */}
            <div className="absolute inset-0 pointer-events-none opacity-40">
              <div className="absolute left-1/3 top-0 bottom-0 w-px bg-white" />
              <div className="absolute left-2/3 top-0 bottom-0 w-px bg-white" />
              <div className="absolute top-1/3 left-0 right-0 h-px bg-white" />
              <div className="absolute top-2/3 left-0 right-0 h-px bg-white" />
            </div>
            {handles.map((h) => (
              <div
                key={h.mode as string}
                className="absolute w-3.5 h-3.5 bg-white border-2 border-primary rounded-sm shadow"
                style={{ ...h.style, cursor: h.cursor }}
                onPointerDown={(e) => onPointerDown(e, h.mode)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
