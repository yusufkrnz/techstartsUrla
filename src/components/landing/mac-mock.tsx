"use client";

import { AnimatePresence, motion } from "motion/react";
import {
  Apple,
  BatteryFull,
  MessageSquare,
  Mic,
  MonitorUp,
  Search,
  ShieldCheck,
  Smile,
  Users,
  Video,
  Wifi,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { MeetingMock, MenuBarMock } from "@/types/landing";

const controlIcons: LucideIcon[] = [Mic, Video, Users, MessageSquare, MonitorUp, Smile];

/** macOS menü çubuğu — yarı saydam, arkadaki duvar kâğıdını gösterir */
export function MacMenuBar({ menu }: { menu: MenuBarMock }) {
  return (
    <div className="relative z-10 flex h-6 items-center gap-4 bg-white/45 px-4 text-[11px] font-medium text-black/80 backdrop-blur-xl">
      <Apple className="size-3 fill-current" />
      <span className="font-semibold">{menu.app}</span>
      {menu.items.map((m) => (
        <span key={m} className="hidden sm:inline">
          {m}
        </span>
      ))}
      <span className="ml-auto hidden items-center gap-3 sm:flex">
        <BatteryFull className="size-3.5" />
        <Wifi className="size-3" />
        <Search className="size-3" />
        {menu.clock}
      </span>
    </div>
  );
}

type MeetingWindowProps = {
  meeting: MeetingMock;
  /** Altyazı; değişince yumuşakça geçer */
  caption: string;
  /** Dar alanlar için daha basık video ve küçük avatar */
  compact?: boolean;
  className?: string;
};

/** Video görüşme penceresi: konuşan kişi, kendi küçük karen, altyazı ve kontroller */
export function MeetingWindow({ meeting, caption, compact, className }: MeetingWindowProps) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-[#1f1f22] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]",
        className,
      )}
    >
      <div className="flex h-7 items-center gap-1.5 border-b border-white/5 px-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 truncate text-[10px] text-white/60">{meeting.windowTitle}</span>
        <ShieldCheck className="ml-auto size-3 shrink-0 text-[#22c55e]" />
      </div>

      <div
        className={cn(
          "relative bg-[radial-gradient(80%_70%_at_50%_40%,#4b4b52_0%,#2a2a2e_60%,#1f1f22_100%)]",
          compact ? "aspect-[16/8]" : "aspect-[16/10]",
        )}
      >
        <div className="absolute inset-0 grid place-items-center">
          <span
            className={cn(
              "grid place-items-center rounded-full bg-gradient-to-br from-[#a78bfa] to-[#6d28d9] font-semibold text-white",
              compact ? "size-14 text-lg sm:size-20 sm:text-xl" : "size-24 text-2xl sm:size-28",
            )}
          >
            {meeting.speaker.initials}
          </span>
        </div>
        <div className="absolute top-2 right-2 w-20 rounded-md border border-white/10 bg-[#2b2b30] p-1.5">
          <span className="mx-auto grid size-6 place-items-center rounded-full bg-[#2563eb] text-[8px] font-semibold text-white">
            {meeting.self.initials}
          </span>
          <span className="mt-1 block text-[8px] text-white/70">{meeting.self.name}</span>
        </div>
        <span className="absolute bottom-2 left-2 rounded bg-black/50 px-1.5 py-0.5 text-[9px] text-white">
          {meeting.speaker.name}
        </span>
        <AnimatePresence mode="wait">
          <motion.span
            key={caption}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-2 left-1/2 w-max max-w-[78%] -translate-x-1/2 rounded bg-black/70 px-2 py-1 text-center text-[10px] text-white"
          >
            {caption}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="flex h-11 items-center justify-between px-4 text-white/70">
        <div className="flex gap-3">
          {meeting.controls.slice(0, 2).map((c, i) => {
            const I = controlIcons[i];
            return (
              <span key={c} className="hidden flex-col items-center gap-0.5 text-[7px] sm:flex">
                <I className="size-3" />
                {c}
              </span>
            );
          })}
        </div>
        <div className="flex gap-4">
          {meeting.controls.slice(2).map((c, i) => {
            const I = controlIcons[i + 2];
            return (
              <span key={c} className="flex flex-col items-center gap-0.5 text-[7px]">
                <I className="size-3" />
                <span className="hidden sm:inline">{c}</span>
              </span>
            );
          })}
        </div>
        <span className="rounded bg-[#e5372b] px-2 py-0.5 text-[9px] font-semibold text-white">{meeting.endLabel}</span>
      </div>
    </div>
  );
}
