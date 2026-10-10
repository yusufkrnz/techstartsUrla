"use client";

import { motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { NotchMessage } from "@/types/landing";

const toneText: Record<NotchMessage["tone"], string> = {
  lime: "text-[#c9f25a]",
  amber: "text-[#ffc53d]",
  plain: "text-white/80",
};

/** Kapalı notch boyutu — kaynakta da 220×32 */
const COLLAPSED = { width: 220, height: 32 };
const NOTCH_SPRING = { type: "spring", stiffness: 320, damping: 32, mass: 0.9 } as const;

function NotchHeader({ time, battery }: { time: string; battery: string }) {
  return (
    <div className="flex h-8 w-full shrink-0 items-center justify-between px-4">
      <div className="flex items-center gap-1 pb-0.5">
        <span className="text-[10px] font-medium tracking-tight text-white tabular-nums">{time}</span>
        <span className="inline-flex size-1 animate-pulse rounded-full bg-lime-500" />
      </div>
      <div className="mr-1 mb-1 flex items-center">
        <span className="mr-px w-7 text-[10px] font-medium tracking-tight text-white tabular-nums">{battery}</span>
        <span className="h-1.5 w-8 rounded-full bg-[linear-gradient(90deg,#84cc16,#facc15,#ef4444)]" />
      </div>
    </div>
  );
}

/** Üst köşelerdeki içbükey "omuz" — notch'u MacBook çentiği gibi ekranın üst kenarına bağlar */
function Shoulder({ side }: { side: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 14 14"
      aria-hidden
      className={cn("absolute top-0 size-3.5", side === "left" ? "right-full" : "left-full")}
    >
      <path d={side === "left" ? "M0 0 Q14 0 14 14 L14 0 Z" : "M14 0 Q0 0 0 14 L0 0 Z"} fill="black" />
    </svg>
  );
}

type NotchProps = {
  time: string;
  battery: string;
  /** Kapalıyken yalnızca saat/pil satırı görünür */
  open?: boolean;
  /** Açık genişlik (px) */
  width?: number;
  children?: ReactNode;
};

/**
 * Ekranın üst kenarından sarkan canlı notch. Genişlik/yükseklik gerçekten animasyonlanır
 * (transform değil), böylece omuzlar kenarlara yapışık kalır.
 */
export function Notch({ time, battery, open = true, width = 260, children }: NotchProps) {
  return (
    <div className="relative mx-auto w-fit">
      <Shoulder side="left" />
      <Shoulder side="right" />
      <motion.div
        initial={false}
        animate={open ? { width, height: "auto" } : COLLAPSED}
        transition={NOTCH_SPRING}
        className="relative overflow-hidden rounded-b-[20px] bg-black text-white shadow-[0_16px_50px_rgba(0,0,0,0.4)] select-none"
      >
        <NotchHeader time={time} battery={battery} />
        {/* İçerik sabit genişlikte: notch büyürken metin yeniden akmasın */}
        <motion.div
          initial={false}
          animate={{ opacity: open ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="px-4 pb-4"
          style={{ width }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function NotchCard({ message }: { message: NotchMessage }) {
  return (
    <div className="rounded-lg bg-white/[0.06] px-2.5 py-2">
      <div className={cn("text-[8.5px] font-semibold tracking-wider uppercase", toneText[message.tone])}>{message.label}</div>
      <p className="mt-1 text-[10.5px] leading-[1.45] text-white/90">{message.text}</p>
    </div>
  );
}

const CLOSED_MS = 900;
const EXPAND_MS = 380;
const WORD_MS = 70;
const HOLD_MS = 2600;

/** Hero notch'u: kapalı → açıl → kelime kelime yaz → bekle → kapan → sıradaki mesaj */
export function NotchFeed({
  time,
  battery,
  messages,
  width,
}: {
  time: string;
  battery: string;
  messages: NotchMessage[];
  width?: number;
}) {
  const [open, setOpen] = useState(false);
  const [cycle, setCycle] = useState(-1);
  const [words, setWords] = useState(0);
  const current = messages[Math.max(cycle, 0) % messages.length];
  const total = current.text.split(" ").length;

  useEffect(() => {
    let delay = HOLD_MS;
    let step = () => setOpen(false);
    if (!open) {
      delay = CLOSED_MS;
      step = () => {
        setCycle((c) => c + 1);
        setWords(0);
        setOpen(true);
      };
    } else if (words < total) {
      delay = words === 0 ? EXPAND_MS : WORD_MS;
      step = () => setWords((w) => w + 1);
    }
    const id = setTimeout(step, delay);
    return () => clearTimeout(id);
  }, [open, words, total]);

  return (
    <Notch time={time} battery={battery} open={open} width={width}>
      <div className={cn("text-[8.5px] font-semibold tracking-wider uppercase", toneText[current.tone])}>
        {current.label}
      </div>
      <p className="mt-1 text-[11px] leading-[1.5] text-white/40">
        {current.text.split(" ").map((w, i) => (
          <span key={i} className={cn("transition-colors duration-300", i < words && "text-white/90")}>
            {w}{" "}
          </span>
        ))}
      </p>
    </Notch>
  );
}
