"use client";

import { useEffect, useRef } from "react";
import { hash2 } from "@/lib/noise";

type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;

/**
 * Canvas tabanlı dekoratif görseller (kaynaktaki canvas animasyonlarının karşılığı).
 * Yalnızca ekrandayken çizer; "azaltılmış hareket" tercihinde tek sabit kare gösterir.
 */
function useCanvasLoop(draw: DrawFn) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let size = { w: 0, h: 0 };
    let raf = 0;
    let visible = false;

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      size = { w: width, h: height };
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const render = (t: number) => {
      ctx.clearRect(0, 0, size.w, size.h);
      draw(ctx, size.w, size.h, t);
    };
    const frame = (now: number) => {
      render(now / 1000);
      if (visible) raf = requestAnimationFrame(frame);
    };

    resize();
    render(0);
    const ro = new ResizeObserver(() => {
      resize();
      render(performance.now() / 1000);
    });
    ro.observe(canvas);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => ro.disconnect();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    });
    io.observe(canvas);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
    };
  }, [draw]);

  return ref;
}

const TAU = Math.PI * 2;

function dot(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, fill: string) {
  ctx.fillStyle = fill;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  ctx.fill();
}

function cubic(a: number, b: number, c: number, d: number, u: number) {
  const v = 1 - u;
  return v * v * v * a + 3 * v * v * u * b + 3 * v * u * u * c + u * u * u * d;
}

/* ---------- During the Call: perspektifli mavi nokta dalgası + dikey perde çizgileri ---------- */

const HELIX_POINTS = 90;

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
    dot(ctx, x, y, 1.2 + depth * 1.4, `rgba(26,115,232,${alpha})`);
  }
}

/* ---------- After the Call: mercek → tek nokta → sağa açılan yelpaze, üzerinde akan veri ---------- */

const LENS_LINES = 26;
const FAN_LINES = 26;
const PARTICLES = 12;
const PARTICLE_PERIOD = 3.6;
const FAN_DOT_COLORS = ["#cfe9b4", "#a3d48f", "#5f9e5a", "#2f5d3a"];

type FanLayout = { x0: number; xc: number; xe: number; cy: number; spread: number };

function fanLayout(w: number, h: number): FanLayout {
  return { x0: w * 0.134, xc: w * 0.478, xe: w * 0.865, cy: h * 0.54, spread: h * 0.27 };
}

/** Mercek çizgisinin kontrol ofseti — çizgiler hafifçe nefes alır */
function lensOffset(i: number, spread: number, t: number) {
  const k = i / (LENS_LINES - 1) - 0.5;
  return ((k * 2 * spread) / 0.75) * (1 + Math.sin(t * 0.9 + i * 0.55) * 0.08);
}

function fanEnd(j: number, w: number, h: number, xe: number, t: number) {
  return {
    x: xe + (hash2(j, 7) - 0.5) * w * 0.016,
    y: h * (0.03 + (0.92 * j) / (FAN_LINES - 1)) + Math.sin(t * 0.6 + j) * 1.5,
  };
}

function lensPoint(i: number, u: number, L: FanLayout, t: number) {
  const off = lensOffset(i, L.spread, t);
  const x1 = L.x0 + (L.xc - L.x0) * 0.25;
  const x2 = L.x0 + (L.xc - L.x0) * 0.75;
  return { x: cubic(L.x0, x1, x2, L.xc, u), y: cubic(L.cy, L.cy + off, L.cy + off, L.cy, u) };
}

function fanPoint(j: number, u: number, L: FanLayout, w: number, h: number, t: number) {
  const e = fanEnd(j, w, h, L.xe, t);
  const x1 = L.xc + (e.x - L.xc) * 0.45;
  const x2 = L.xc + (e.x - L.xc) * 0.62;
  return { x: cubic(L.xc, x1, x2, e.x, u), y: cubic(L.cy, L.cy, e.y, e.y, u) };
}

function drawFan(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const L = fanLayout(w, h);
  ctx.lineWidth = 1;

  for (let i = 0; i < LENS_LINES; i++) {
    const off = lensOffset(i, L.spread, t);
    const edge = Math.abs(i / (LENS_LINES - 1) - 0.5) * 2;
    ctx.strokeStyle = `rgba(46,94,58,${0.5 - edge * 0.25})`;
    ctx.beginPath();
    ctx.moveTo(L.x0, L.cy);
    ctx.bezierCurveTo(L.x0 + (L.xc - L.x0) * 0.25, L.cy + off, L.x0 + (L.xc - L.x0) * 0.75, L.cy + off, L.xc, L.cy);
    ctx.stroke();
  }

  const fade = ctx.createLinearGradient(L.xc, 0, L.xe, 0);
  fade.addColorStop(0, "rgba(120,180,110,0.04)");
  fade.addColorStop(1, "rgba(80,140,85,0.55)");
  ctx.strokeStyle = fade;
  for (let j = 0; j < FAN_LINES; j++) {
    const e = fanEnd(j, w, h, L.xe, t);
    ctx.beginPath();
    ctx.moveTo(L.xc, L.cy);
    ctx.bezierCurveTo(L.xc + (e.x - L.xc) * 0.45, L.cy, L.xc + (e.x - L.xc) * 0.62, e.y, e.x, e.y);
    ctx.stroke();
  }

  // Parçacıklar soldan sağa akar; vardıkları uç nokta kısa süre parlar
  const glow = new Array<number>(FAN_LINES).fill(0);
  for (let p = 0; p < PARTICLES; p++) {
    const period = PARTICLE_PERIOD * (0.85 + hash2(p, 3) * 0.3);
    const phase = t / period + p / PARTICLES;
    const cycle = Math.floor(phase);
    const u = phase - cycle;
    const lens = Math.floor(hash2(p, cycle, 1) * LENS_LINES);
    const fan = Math.floor(hash2(p, cycle, 2) * FAN_LINES);
    const arrivedAt = Math.floor(hash2(p, cycle - 1, 2) * FAN_LINES);
    if (u < 0.12) glow[arrivedAt] = Math.max(glow[arrivedAt], 1 - u / 0.12);
    const pt = u < 0.5 ? lensPoint(lens, u * 2, L, t) : fanPoint(fan, (u - 0.5) * 2, L, w, h, t);
    dot(ctx, pt.x, pt.y, 5, "rgba(34,160,80,0.16)");
    dot(ctx, pt.x, pt.y, 1.8, "rgba(22,120,60,0.95)");
  }

  for (let j = 0; j < FAN_LINES; j++) {
    const e = fanEnd(j, w, h, L.xe, t);
    if (glow[j] > 0) dot(ctx, e.x, e.y, 2.6 + 5 * glow[j], `rgba(34,197,94,${0.35 * glow[j]})`);
    dot(ctx, e.x, e.y, 2.6, FAN_DOT_COLORS[Math.floor(hash2(j, 5) * FAN_DOT_COLORS.length)]);
  }
  dot(ctx, L.x0, L.cy, 3, "#2f5d3a");
}

/* ---------- Industries: meridyenleri boyunca dönen mor nokta küresi ---------- */

const MERIDIANS = 30;
const PARALLEL_STEPS = 28;
const DRIFTERS = 40;
const SPHERE_TILT = 0.35;

function drawSphere(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const r = Math.min(w * 0.36, h * 1.1);
  const cx = w * 0.62;
  const cy = h * 0.42;
  const rot = t * 0.18;
  const cosT = Math.cos(SPHERE_TILT);
  const sinT = Math.sin(SPHERE_TILT);

  for (let m = 0; m < MERIDIANS; m++) {
    const lon = (m / MERIDIANS) * TAU + rot;
    for (let s = 1; s < PARALLEL_STEPS; s++) {
      const lat = -Math.PI / 2 + (s / PARALLEL_STEPS) * Math.PI;
      const x = Math.cos(lat) * Math.sin(lon);
      const y = Math.sin(lat);
      const z = Math.cos(lat) * Math.cos(lon);
      const y2 = y * cosT - z * sinT;
      const depth = (y * sinT + z * cosT + 1) / 2;
      dot(ctx, cx + x * r, cy + y2 * r, 0.5 + depth * 1.3, `rgba(124,77,219,${0.06 + depth * 0.7})`);
    }
  }

  // Küreden kopup süzülen parçacıklar
  for (let p = 0; p < DRIFTERS; p++) {
    const life = 4 + hash2(p, 1) * 3;
    const phase = (t / life + hash2(p, 2)) % 1;
    const a = hash2(p, 3) * TAU;
    const dist = r * (1.02 + phase * 0.5);
    dot(ctx, cx + Math.cos(a) * dist, cy + Math.sin(a) * dist, 1.1, `rgba(124,77,219,${(1 - phase) * 0.45})`);
  }
}

/* ---------- Integrations: alttan açılan karahindiba ışınları ---------- */

const RAYS = 170;
const SPROUT_DARK = [63, 107, 37];
const SPROUT_LIGHT = [181, 221, 110];

function drawSprout(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const cx = w / 2;
  const cy = h + 4;
  const R = Math.min(w * 0.4, h * 0.92);
  ctx.lineWidth = 0.8;

  for (let i = 0; i < RAYS; i++) {
    const r1 = hash2(i, 1);
    const r2 = hash2(i, 2);
    const r3 = hash2(i, 3);
    const angle = Math.PI * (1.04 + 0.92 * (i / (RAYS - 1))) + (r1 - 0.5) * 0.04 + Math.sin(t * 0.7 + i * 0.37) * 0.02;
    const len = R * (0.3 + 0.7 * Math.sqrt(r2)) * (1 + Math.sin(t * 1.1 + r2 * TAU) * 0.025);
    const ex = cx + Math.cos(angle) * len * 1.3;
    const ey = cy + Math.sin(angle) * len;

    ctx.strokeStyle = `rgba(86,130,45,${0.12 + r3 * 0.18})`;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(ex, ey);
    ctx.stroke();

    // Merkeze yakın noktalar büyük ve koyu, uzaktakiler küçük ve açık
    const far = Math.min(1, len / R);
    const mix = (k: number) => Math.round(SPROUT_DARK[k] + (SPROUT_LIGHT[k] - SPROUT_DARK[k]) * far);
    const color = `rgba(${mix(0)},${mix(1)},${mix(2)},0.85)`;
    dot(ctx, ex, ey, 1 + (1 - far) * 2.6 + r3 * 0.8, color);
    if (r3 > 0.55) dot(ctx, cx + (ex - cx) * 0.6, cy + (ey - cy) * 0.6, 1.1, color);
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
