"use client";

import { motion } from "motion/react";
import { Apple } from "lucide-react";
import { MacMenuBar, MeetingWindow } from "@/components/landing/mac-mock";
import { NotchFeed } from "@/components/landing/notch";
import { EASE, Pill } from "@/components/landing/primitives";
import { hero, heroMock, heroNotchFeed } from "@/data/hero";
import { site } from "@/data/site";

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
      <MacMenuBar menu={heroMock.menuBar} />

      {/* Notch */}
      <div className="absolute top-0 left-1/2 z-20 -translate-x-1/2">
        <NotchFeed time={heroMock.notch.time} battery={heroMock.notch.battery} messages={heroNotchFeed} width={260} />
      </div>

      {/* Toplantı penceresi */}
      <div className="px-3 pt-14 pb-16 sm:px-0">
        <MeetingWindow meeting={heroMock.meeting} caption={heroMock.caption} className="mx-auto max-w-[614px]" />
      </div>
    </div>
  );
}
