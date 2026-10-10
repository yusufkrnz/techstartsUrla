"use client";

import { useEffect, useRef } from "react";

/**
 * Canvas tabanlı dekoratif görseller (kaynaktaki nokta/çizgi animasyonlarının karşılığı).
 * Hepsi görünür olduklarında çalışır, görünmezken durur.
 */
function useCanvasLoop(draw: (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let raf = 0;
    let visible = false;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const frame = (time: number) => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      draw(ctx, width, height, time / 1000);
      if (visible) raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });

    resize();
    io.observe(canvas);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
    };
  }, [draw]);

  return ref;
}

const HELIX_POINTS = 90;

/** During the Call: perspektifli dalga halinde mavi noktalar + dikey ince çizgiler */
function drawHelix(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  for (let i = 0; i < HELIX_POINTS; i++) {
    const p = i / (HELIX_POINTS - 1);
    const angle = p * Math.PI * 2.2 + t * 0.35;
    const depth = (Math.sin(angle) + 1) / 2;
    const x = w * 0.12 + p * w * 0.76;
    const y = h * 0.5 + Math.cos(angle) * h * 0.22 - p * h * 0.08;
    const alpha = 0.25 + depth * 0.65;
    ctx.strokeStyle = `rgba(26,115,232,${alpha * 0.18})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, h);
    ctx.stroke();
    ctx.fillStyle = `rgba(26,115,232,${alpha})`;
    ctx.beginPath();
    ctx.arc(x, y, 1.2 + depth * 1.4, 0, Math.PI * 2);
    ctx.fill();
  }
}

const LINE_COUNT = 28;

/** After the Call: soldan tek noktadan çıkıp sağa yelpaze gibi açılan yeşil çizgiler */
function drawFan(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const startX = w * 0.12;
  const midX = w * 0.42;
  const endX = w * 0.82;
  const cy = h * 0.5;
  for (let i = 0; i < LINE_COUNT; i++) {
    const p = i / (LINE_COUNT - 1) - 0.5;
    const spread = p * h * 0.8;
    const pulse = (Math.sin(t * 1.2 + i * 0.4) + 1) / 2;
    ctx.strokeStyle = `rgba(22,163,74,${0.12 + pulse * 0.35})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(startX, cy);
    ctx.bezierCurveTo(startX + (midX - startX) * 0.5, cy + spread * 0.5, midX - 40, cy + spread * 0.15, midX, cy);
    ctx.bezierCurveTo(midX + 60, cy + spread * 0.1, endX - 120, cy + spread, endX, cy + spread);
    ctx.stroke();
    ctx.fillStyle = `rgba(22,163,74,${0.4 + pulse * 0.6})`;
    ctx.beginPath();
    ctx.arc(endX, cy + spread, 2, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.fillStyle = "rgba(22,163,74,0.9)";
  ctx.beginPath();
  ctx.arc(startX, cy, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

const SPHERE_POINTS = 420;
const GOLDEN = Math.PI * (3 - Math.sqrt(5));

/** Industries: dönen mor nokta küresi */
function drawSphere(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const r = Math.min(w, h * 2) * 0.42;
  const cx = w * 0.55;
  const cy = h * 0.95;
  for (let i = 0; i < SPHERE_POINTS; i++) {
    const y = 1 - (i / (SPHERE_POINTS - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const theta = GOLDEN * i + t * 0.25;
    const x = Math.cos(theta) * rad;
    const z = Math.sin(theta) * rad;
    const depth = (z + 1) / 2;
    ctx.fillStyle = `rgba(124,77,219,${0.15 + depth * 0.7})`;
    ctx.beginPath();
    ctx.arc(cx + x * r, cy - y * r, 0.6 + depth * 1.4, 0, Math.PI * 2);
    ctx.fill();
  }
}

const SPROUT_POINTS = 160;

/** Integrations: alttan büyüyen yeşil nokta bulutu (bitki/beyin) */
function drawSprout(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  for (let i = 0; i < SPROUT_POINTS; i++) {
    const a = (i * 137.5 * Math.PI) / 180;
    const rr = Math.sqrt(i / SPROUT_POINTS);
    const sway = Math.sin(t * 0.8 + i) * 2;
    const x = w / 2 + Math.cos(a) * rr * w * 0.32 + sway;
    const y = h * 0.62 - Math.abs(Math.sin(a)) * rr * h * 0.45 + rr * 6;
    ctx.strokeStyle = "rgba(77,140,18,0.18)";
    ctx.beginPath();
    ctx.moveTo(w / 2, h);
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.fillStyle = `rgba(${90 + rr * 60},${150 + rr * 40},40,${0.5 + rr * 0.4})`;
    ctx.beginPath();
    ctx.arc(x, y, 1.5 + (1 - rr) * 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

export function HelixVisual({ className }: { className?: string }) {
  return <canvas ref={useCanvasLoop(drawHelix)} className={className} aria-hidden />;
}
export function FanVisual({ className }: { className?: string }) {
  return <canvas ref={useCanvasLoop(drawFan)} className={className} aria-hidden />;
}
export function SphereVisual({ className }: { className?: string }) {
  return <canvas ref={useCanvasLoop(drawSphere)} className={className} aria-hidden />;
}
export function SproutVisual({ className }: { className?: string }) {
  return <canvas ref={useCanvasLoop(drawSprout)} className={className} aria-hidden />;
}
