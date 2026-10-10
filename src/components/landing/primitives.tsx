"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { Cta, SectionIntro } from "@/types/landing";

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Sayfanın ortasındaki 1088px kolon — kenar çizgileri tüm sayfa boyunca devam eder */
export function Column({ className, children }: { className?: string; children?: ReactNode }) {
  return <div className={cn("relative mx-auto w-[calc(100%-2.5rem)] max-w-[1088px] border-x border-line lg:w-[calc(100%-7rem)]", className)}>{children}</div>;
}

/** Bölümler arası 240px boşluk; üst/alt çizgiler tam genişlikte */
export function Spacer({ className }: { className?: string }) {
  return (
    <section aria-hidden className={cn("relative w-full border-b border-line", className)}>
      <Column className="h-[120px] sm:h-[240px]" />
    </section>
  );
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

type PillProps = { cta: Cta; variant?: "dark" | "light" | "accent"; color?: string; icon?: ReactNode; className?: string };

export function Pill({ cta, variant = "dark", color, icon, className }: PillProps) {
  return (
    <a
      href={cta.href}
      style={variant === "accent" ? { backgroundColor: color } : undefined}
      className={cn(
        "inline-flex h-8 items-center gap-1.5 rounded-[10px] px-3 text-[14px] leading-5 font-semibold tracking-[-0.01em] transition-[filter,background-color] duration-200",
        variant === "dark" && "bg-ink text-white hover:bg-black",
        variant === "light" && "border border-black/[0.08] bg-white text-ink hover:bg-paper",
        variant === "accent" && "text-white hover:brightness-110",
        className,
      )}
    >
      {icon}
      {cta.label}
    </a>
  );
}

/** Bölüm başlığı: renkli eyebrow etiketi + solunda renkli çizgi olan büyük başlık */
export function SectionHeading({
  intro,
  color,
  icon,
  dark,
}: {
  intro: Pick<SectionIntro, "eyebrow" | "lead" | "highlight">;
  color: string;
  icon: ReactNode;
  dark?: boolean;
}) {
  return (
    <Reveal className="pt-8">
      <span
        className="ml-6 inline-flex h-6 items-center gap-1.5 rounded-md border px-2 text-[12px] font-medium"
        style={{ color, borderColor: `${color}55`, backgroundColor: `${color}0d` }}
      >
        {icon}
        {intro.eyebrow}
      </span>
      <h2
        className={cn(
          "mt-4 border-l-2 pr-16 pl-8 text-[30px] leading-[1.12] tracking-[-0.035em] text-balance sm:text-[40px]",
          dark ? "text-white" : "text-ink",
        )}
        style={{ borderColor: color }}
      >
        {intro.lead} <span style={{ color }}>{intro.highlight}</span>
      </h2>
    </Reveal>
  );
}
