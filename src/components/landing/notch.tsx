"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { NotchMessage } from "@/types/landing";

const toneText: Record<NotchMessage["tone"], string> = {
  lime: "text-[#c9f25a]",
  amber: "text-[#ffc53d]",
  plain: "text-white/80",
};

/** Ekranın tepesindeki siyah "notch" — uygulamanın canlı öneri paneli */
export function Notch({
  time,
  battery,
  className,
  children,
}: {
  time: string;
  battery: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("w-[248px] rounded-b-[22px] bg-black px-3 pt-2 pb-3 text-white shadow-2xl", className)}>
      <div className="flex items-center justify-between text-[9px] font-semibold">
        <span className="flex items-center gap-1">
          {time}
          <span className="size-1 rounded-full bg-[#22c55e]" />
        </span>
        <span className="flex items-center gap-1.5">
          {battery}
          <span className="h-1.5 w-6 rounded-full bg-gradient-to-r from-[#22c55e] via-[#facc15] to-[#ef4444]" />
        </span>
      </div>
      <div className="mt-2">{children}</div>
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

const WORD_MS = 70;
const HOLD_MS = 2600;

/** Mesajları kelime kelime yazıp sırayla döndürür */
export function NotchFeed({ messages }: { messages: NotchMessage[] }) {
  const [index, setIndex] = useState(0);
  const [words, setWords] = useState(0);
  const current = messages[index];
  const total = current.text.split(" ").length;

  useEffect(() => {
    const done = words >= total;
    const id = setTimeout(
      () => {
        if (done) {
          setIndex((i) => (i + 1) % messages.length);
          setWords(0);
        } else {
          setWords((w) => w + 1);
        }
      },
      done ? HOLD_MS : WORD_MS,
    );
    return () => clearTimeout(id);
  }, [words, total, messages.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={index}
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(4px)" }}
        transition={{ duration: 0.3 }}
        className="min-h-[76px]"
      >
        <div className={cn("text-[8.5px] font-semibold tracking-wider uppercase", toneText[current.tone])}>{current.label}</div>
        <p className="mt-1 text-[11px] leading-[1.5] text-white/45">
          {current.text.split(" ").map((w, i) => (
            <span key={i} className={cn("transition-colors duration-300", i < words && "text-white/90")}>
              {w}{" "}
            </span>
          ))}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
