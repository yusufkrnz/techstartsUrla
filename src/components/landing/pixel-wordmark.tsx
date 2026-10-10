"use client";

import { useEffect, useRef } from "react";
import { fbm, hash2 } from "@/lib/noise";

const FRAME_MS = 1000 / 30;
/** Eskiz yazının opaklığı — öncekiyle aynı (text-white/[0.04]) */
const SKETCH_ALPHA = 0.04;
/** Harf içindeki turuncu parıltının en yüksek opaklığı */
const GLOW_ALPHA = 0.22;
const SPARK_ALPHA = 0.35;

/**
 * Footer'daki dev marka yazısı: soluk eskiz yazı aynen kalır, harflerin içinde
 * gürültüyle akan pikseller ve ara ara yanıp sönen kıvılcımlar çizilir.
 * DOM'daki yazı şeffaftır, yalnızca boyutu/yerleşimi belirler.
 */
export function PixelWordmark({ text }: { text: string }) {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const box = boxRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!box || !canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let cell = 6;
    let cols = 0;
    let rows = 0;
    let font = "";
    let baseline = 0;
    let mask = new Uint8Array(0);
    let raf = 0;
    let last = -Infinity;
    let visible = false;
    let disposed = false;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.font = font;
      ctx.textAlign = "center";
      ctx.fillStyle = `rgba(255,255,255,${SKETCH_ALPHA})`;
      ctx.fillText(text, width / 2, baseline);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          if (!mask[y * cols + x]) continue;
          const n = fbm(x * 0.07 + t * 0.22, y * 0.07 - t * 0.12, 7);
          const glow = Math.min(1, Math.max(0, (n - 0.48) / 0.3)) * GLOW_ALPHA;
          const spark = hash2(x, y, Math.floor(t * 3)) > 0.993;
          const alpha = spark ? SPARK_ALPHA : glow;
          if (alpha < 0.012) continue;
          ctx.fillStyle = spark ? `rgba(255,236,210,${alpha})` : `rgba(255,128,48,${alpha})`;
          ctx.fillRect(x * cell, y * cell, cell - 1, cell - 1);
        }
      }
    };

    // Yazıyı hücre çözünürlüğünde çizip hangi hücrelerin harf içinde kaldığını çıkarır
    const layout = async () => {
      const cs = getComputedStyle(box);
      const size = parseFloat(cs.fontSize);
      font = `400 ${size}px ${cs.fontFamily}`;
      await document.fonts.load(font, text);
      if (disposed) return;

      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // DOM'daki satırla aynı taban çizgisi: satır yüksekliği içinde ortalanmış font kutusu
      ctx.font = font;
      const metrics = ctx.measureText(text);
      let lineHeight = parseFloat(cs.lineHeight);
      if (!lineHeight || lineHeight < size * 0.5) lineHeight = (lineHeight || 1) * size;
      const ascent = metrics.fontBoundingBoxAscent;
      baseline = (lineHeight - (ascent + metrics.fontBoundingBoxDescent)) / 2 + ascent;

      cell = Math.max(4, Math.round(size / 45));
      cols = Math.ceil(width / cell);
      rows = Math.ceil(height / cell);
      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d");
      if (!octx) return;
      octx.scale(1 / cell, 1 / cell);
      octx.font = font;
      octx.textAlign = "center";
      octx.fillStyle = "#fff";
      octx.fillText(text, width / 2, baseline);
      const data = octx.getImageData(0, 0, cols, rows).data;
      mask = new Uint8Array(cols * rows);
      for (let i = 0; i < mask.length; i++) mask[i] = data[i * 4 + 3] > 90 ? 1 : 0;

      draw(performance.now() / 1000);
    };

    const loop = (now: number) => {
      if (now - last >= FRAME_MS) {
        last = now;
        draw(now / 1000);
      }
      if (visible) raf = requestAnimationFrame(loop);
    };

    void layout();
    const ro = new ResizeObserver(() => void layout());
    ro.observe(box);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !reduceMotion;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [text]);

  return (
    <div
      ref={boxRef}
      aria-hidden
      className="pointer-events-none relative -mb-[0.32em] text-center font-heading text-[26vw] leading-none text-transparent select-none lg:text-[300px]"
    >
      {text}
      <canvas ref={canvasRef} className="absolute inset-x-0 top-0 h-[130%] w-full" />
    </div>
  );
}
