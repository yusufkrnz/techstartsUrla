"use client";

import { motion } from "motion/react";
import { Apple, BatteryFull, Mic, MonitorUp, Search, Smile, Users, Video, Wifi, MessageSquare, ShieldCheck } from "lucide-react";
import { Notch, NotchFeed } from "@/components/landing/notch";
import { EASE, Pill } from "@/components/landing/primitives";
import { hero, heroMock, heroNotchFeed } from "@/data/hero";
import { site } from "@/data/site";

const controlIcons = [Mic, Video, Users, MessageSquare, MonitorUp, Smile];

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: EASE },
});

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto w-[calc(100%-2.5rem)] max-w-[1088px] border-x border-line lg:w-[calc(100%-7rem)]">
        <div className="px-4 pt-20 pb-10 text-center sm:pt-[100px]">
          <motion.h1
            {...fade(0)}
            className="font-heading text-[48px] leading-[1.07] tracking-[-0.03em] text-[#1b1b1b] [-webkit-text-stroke:0.6px_#1b1b1b] sm:text-[84px]"
          >
            {hero.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </motion.h1>
          <motion.p {...fade(0.1)} className="mx-auto mt-6 max-w-[780px] text-[17px] leading-[1.35] tracking-[-0.01em] sm:text-[20px]">
            {hero.subtitleBefore} <span className="text-[#5aa800]">{hero.subtitleHighlight}</span> {hero.subtitleAfter}
            <br className="hidden sm:block" /> {hero.subtitleSecondLine}
          </motion.p>
          <motion.div {...fade(0.2)} className="mt-6 flex justify-center gap-2">
            <Pill cta={site.download} icon={<Apple className="size-3.5 fill-current" />} className="rounded-lg text-[13px]" />
            <Pill cta={site.talkToSales} variant="light" className="rounded-lg text-[13px]" />
          </motion.div>
          <motion.div {...fade(0.3)} className="mt-9">
            <div className="text-[10px] font-semibold tracking-[0.16em] text-black/50 uppercase">{hero.partnersLabel}</div>
            <div className="mt-3 flex items-center justify-center gap-6">
              {hero.partners.map((name) => (
                <span key={name} className="text-[15px] font-semibold tracking-[-0.02em] text-black/70">
                  {name}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative">
          {/* Sayfa arka planı: mock'un üst kenarında sarı ışıma, aşağı doğru şeftali → turuncu → kırmızı */}
          <div
            aria-hidden
            className="absolute top-[-200px] bottom-0 left-1/2 -z-10 w-screen -translate-x-1/2"
            style={{
              background:
                "radial-gradient(560px 190px at 50% 200px, #ffd23f 0%, rgba(255,214,77,0.75) 35%, rgba(255,232,160,0) 78%), linear-gradient(180deg, rgba(255,255,255,0) 0px, #fff6ec 200px, #fbc39c 380px, #f08a55 560px, #df5a2a 760px, #b23a10 100%)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: EASE }}
          >
            <DesktopMock />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function DesktopMock() {
  return (
    <div className="relative bg-[linear-gradient(180deg,#f7cfe0_0%,#f0a3bf_25%,#e66a8a_55%,#cf3a52_80%,#b8283c_100%)]">
      {/* macOS menü çubuğu */}
      <div className="flex h-6 items-center gap-4 bg-white/45 px-4 text-[11px] font-medium text-black/80 backdrop-blur-xl">
        <Apple className="size-3 fill-current" />
        <span className="font-semibold">{heroMock.menuBar.app}</span>
        {heroMock.menuBar.items.map((m) => (
          <span key={m} className="hidden sm:inline">
            {m}
          </span>
        ))}
        <span className="ml-auto hidden items-center gap-3 sm:flex">
          <BatteryFull className="size-3.5" />
          <Wifi className="size-3" />
          <Search className="size-3" />
          {heroMock.menuBar.clock}
        </span>
      </div>

      {/* Notch */}
      <div className="absolute top-0 left-1/2 z-10 -translate-x-1/2">
        <Notch time={heroMock.notch.time} battery={heroMock.notch.battery}>
          <NotchFeed messages={heroNotchFeed} />
        </Notch>
      </div>

      {/* Toplantı penceresi */}
      <div className="px-3 pt-14 pb-16 sm:px-0">
        <div className="mx-auto max-w-[614px] overflow-hidden rounded-xl border border-white/10 bg-[#1f1f22] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]">
          <div className="flex h-7 items-center gap-1.5 border-b border-white/5 px-3">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-3 text-[10px] text-white/60">{heroMock.windowTitle}</span>
            <ShieldCheck className="ml-auto size-3 text-[#22c55e]" />
          </div>

          <div className="relative aspect-[16/10] bg-[radial-gradient(80%_70%_at_50%_40%,#4b4b52_0%,#2a2a2e_60%,#1f1f22_100%)]">
            <div className="absolute inset-0 grid place-items-center">
              <span className="grid size-24 place-items-center rounded-full bg-gradient-to-br from-[#a78bfa] to-[#6d28d9] text-2xl font-semibold text-white sm:size-28">
                {heroMock.speaker.initials}
              </span>
            </div>
            <div className="absolute top-2 right-2 w-20 rounded-md border border-white/10 bg-[#2b2b30] p-1.5">
              <span className="mx-auto grid size-6 place-items-center rounded-full bg-[#2563eb] text-[8px] font-semibold text-white">
                {heroMock.self.initials}
              </span>
              <span className="mt-1 block text-[8px] text-white/70">{heroMock.self.name}</span>
            </div>
            <span className="absolute bottom-2 left-2 rounded bg-black/50 px-1.5 py-0.5 text-[9px] text-white">
              {heroMock.speaker.name}
            </span>
            <span className="absolute bottom-2 left-1/2 max-w-[80%] -translate-x-1/2 rounded bg-black/70 px-2 py-1 text-center text-[10px] text-white">
              {heroMock.caption}
            </span>
          </div>

          <div className="flex h-11 items-center justify-between px-4 text-white/70">
            <div className="flex gap-3">
              {heroMock.controls.slice(0, 2).map((c, i) => {
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
              {heroMock.controls.slice(2).map((c, i) => {
                const I = controlIcons[i + 2];
                return (
                  <span key={c} className="flex flex-col items-center gap-0.5 text-[7px]">
                    <I className="size-3" />
                    <span className="hidden sm:inline">{c}</span>
                  </span>
                );
              })}
            </div>
            <span className="rounded bg-[#e5372b] px-2 py-0.5 text-[9px] font-semibold text-white">{heroMock.endLabel}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
