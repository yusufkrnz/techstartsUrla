"use client";

import { useEffect, useRef } from "react";
import { fbm } from "@/lib/noise";

/** Kaynakta da 36×36 canvas, CSS ile pikselli büyütülüyor */
const SIZE = 36;
const FRAME_MS = 1000 / 14;
/** 4×4 Bayer matrisi — renk seviyeleri arasında kumlu (dithered) geçiş */
const BAYER4 = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * Kendi içinde akan piksel bulutu: domain-warp'lı gürültü alanı, palete göre seviyelere
 * bölünüp Bayer dithering ile boyanır. Yalnızca görünürken ~14 fps çizer.
 */
export function PixelBlob({ palette, seed }: { palette: string[]; seed: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const colors = palette.map(hexToRgb);
    const levels = colors.length - 1;
    const image = ctx.createImageData(SIZE, SIZE);

    const draw = (t: number) => {
      const data = image.data;
      for (let y = 0; y < SIZE; y++) {
        for (let x = 0; x < SIZE; x++) {
          const nx = x / SIZE;
          const ny = y / SIZE;
          const warpX = fbm(nx * 2.2 + t * 0.07, ny * 2.2, seed + 1);
          const warpY = fbm(nx * 2.2, ny * 2.2 - t * 0.06, seed + 2);
          let v = fbm(nx * 2.4 + warpX * 1.6, ny * 2.4 + warpY * 1.6 + t * 0.03, seed);
          // Merkeze doğru yoğunlaşsın, kenarlar açık kalsın
          v = v * 1.25 + (0.45 - Math.hypot(nx - 0.5, ny - 0.5)) * 0.9 - 0.2;
          v = Math.min(1, Math.max(0, v));
          const level = v * levels;
          const base = Math.floor(level);
          const index = Math.min(levels, base + (level - base > BAYER4[(y & 3) * 4 + (x & 3)] ? 1 : 0));
          const [r, g, b] = colors[index];
          const i = (y * SIZE + x) * 4;
          data[i] = r;
          data[i + 1] = g;
          data[i + 2] = b;
          data[i + 3] = 255;
        }
      }
      ctx.putImageData(image, 0, 0);
    };

    // İlk kare hemen — görünür olmadan önce de boş kalmasın
    draw(seed);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let last = -Infinity;
    let visible = false;
    const loop = (now: number) => {
      if (now - last >= FRAME_MS) {
        last = now;
        draw(seed + now / 1000);
      }
      if (visible) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [palette, seed]);

  return <canvas ref={ref} width={SIZE} height={SIZE} className="size-full [image-rendering:pixelated]" aria-hidden />;
}
