"use client";

import { AnimatePresence, motion } from "motion/react";
import { Apple, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LogoMark, Logo } from "@/components/landing/logo";
import { Pill } from "@/components/landing/primitives";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const MARQUEE_REPEAT = 8;

export function AnnouncementBar() {
  const items = Array.from({ length: MARQUEE_REPEAT }, (_, i) => i);
  return (
    <div className="w-full border-b border-line bg-white">
      <div className="mx-auto h-9 w-[calc(100%-2.5rem)] max-w-[1088px] lg:w-[calc(100%-7rem)] overflow-hidden bg-lime">
        <div className="flex h-full w-max animate-marquee items-center hover:[animation-play-state:paused]">
          {/* Kesintisiz döngü için liste iki kez basılır; key her kopyada benzersiz */}
          {[...items, ...items].map((_, idx) => (
            <a key={idx} href="#" className="flex items-center gap-2 px-4 text-[13px] font-medium whitespace-nowrap text-ink">
              <LogoMark className="size-3.5" />
              {site.announcement}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-white/85 backdrop-blur-md">
      <nav className="mx-auto flex h-[60px] w-[calc(100%-2.5rem)] max-w-[1088px] items-center lg:w-[calc(100%-7rem)]">
        <Logo />
        <ul className="ml-4 hidden items-center md:flex">
          {site.nav.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="rounded-lg px-2 py-1.5 text-[14px] leading-[14px] tracking-[-0.01em] text-black/70 transition-colors hover:bg-black/[0.04] hover:text-black"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="ml-auto hidden items-center gap-1.5 md:flex">
          <a
            href={site.talkToSales.href}
            className="inline-flex h-8 items-center rounded-lg bg-black/[0.06] px-2.5 text-[13px] font-semibold transition-colors hover:bg-black/10"
          >
            {site.talkToSales.label}
          </a>
          <Pill cta={site.download} icon={<Apple className="size-3.5 fill-current" />} className="rounded-lg text-[13px]" />
        </div>
        <button
          type="button"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-auto grid size-9 place-items-center rounded-lg md:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-x-0 top-[60px] bottom-0 bg-white px-4 py-6 md:hidden"
          >
            {site.nav.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block border-b border-line py-4 text-[22px] tracking-[-0.02em]"
              >
                {item.label}
              </a>
            ))}
            <div className="mt-6 flex gap-2">
              <Pill cta={site.download} icon={<Apple className="size-3.5 fill-current" />} />
              <Pill cta={site.talkToSales} variant="light" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/** Sol menünün yapıştığı yükseklik (px) */
const SIDE_NAV_TOP = 180;

/**
 * Sol kenardaki bölüm listesi. <main> boyunca uzanan bir rayın içinde sticky durur:
 * sayfayı takip eder, içerik bitince (footer'dan önce) orada kalır. Yalnızca kolonun
 * solunda yeterli boşluk olan genişliklerde (≥1440px) görünür.
 */
export function SideNav() {
  const navRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const els = site.sideNav.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => el !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Menünün o anki konumunun arkasında koyu bir alan (data-nav-theme="dark") varsa yazılar açık renge döner
  useEffect(() => {
    const markers = Array.from(document.querySelectorAll("[data-nav-theme='dark']"));
    let frame = 0;
    const check = () => {
      frame = 0;
      const nav = navRef.current;
      if (!nav) return;
      const r = nav.getBoundingClientRect();
      const mid = r.top + r.height / 2;
      setOnDark(
        markers.some((m) => {
          const b = m.getBoundingClientRect();
          return b.top <= mid && b.bottom >= mid;
        }),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-y-0 right-[calc(50%+584px)] z-40 hidden min-[1440px]:block">
      <nav
        ref={navRef}
        aria-label="Sections"
        inert={!active}
        style={{ top: SIDE_NAV_TOP }}
        className={cn(
          "sticky flex flex-col items-end gap-2.5 transition-opacity duration-300",
          active ? "pointer-events-auto opacity-100" : "opacity-0",
        )}
      >
        {site.sideNav.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={cn(
              "font-mono text-[12px] leading-3 tracking-[0.12em] whitespace-nowrap uppercase transition-colors duration-300",
              active === s.id
                ? onDark
                  ? "text-white"
                  : "text-ink"
                : onDark
                  ? "text-white/35 hover:text-white/75"
                  : "text-black/25 hover:text-black/60",
            )}
          >
            {s.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
