"use client";

import { AnimatePresence, motion } from "motion/react";
import { Globe, ListTodo, MessageSquareQuote, Search, Zap, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { MacMenuBar, MeetingWindow } from "@/components/landing/mac-mock";
import { Notch, NotchCard } from "@/components/landing/notch";
import { Column, Pill, SectionHeading } from "@/components/landing/primitives";
import { HelixVisual } from "@/components/landing/visuals";
import { liveIntro, liveMeeting, liveTabDuration, liveTabs } from "@/data/call-stages";
import { cn } from "@/lib/utils";

const ACCENT = "#1a73e8";
const tabIcons: LucideIcon[] = [MessageSquareQuote, Globe, Search, Zap];

export function LiveCall() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tab = liveTabs[active];

  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => setActive((i) => (i + 1) % liveTabs.length), liveTabDuration);
    return () => clearTimeout(id);
  }, [active, paused]);

  return (
    <section id="capabilities" className="relative w-full scroll-mt-24 border-b border-line">
      <Column>
        <SectionHeading intro={liveIntro} color={ACCENT} icon={<ListTodo className="size-3" />} />
        <div className="relative h-[180px] bg-gradient-to-b from-white to-[#eef4ff] sm:h-[250px]">
          <HelixVisual className="absolute inset-0 size-full" />
        </div>

        <div
          className="grid border-t border-line lg:grid-cols-3"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="flex flex-col border-line lg:border-r">
            <div role="tablist">
              {liveTabs.map((t, i) => {
                const Icon = tabIcons[i];
                const isActive = i === active;
                return (
                  <button
                    key={t.id}
                    role="tab"
                    type="button"
                    aria-selected={isActive}
                    onClick={() => setActive(i)}
                    className={cn(
                      "relative flex h-12 w-full items-center gap-2.5 border-b border-line px-4 text-left text-[15px] transition-colors",
                      isActive ? "bg-[#e8f0fe] text-ink" : "text-black/40 hover:text-black/70",
                    )}
                  >
                    <Icon className="size-3.5" />
                    {t.title}
                    {isActive && !paused && (
                      <motion.span
                        key={t.id}
                        className="absolute bottom-0 left-0 h-[2px]"
                        style={{ backgroundColor: ACCENT }}
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: liveTabDuration / 1000, ease: "linear" }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
            <div className="mt-auto p-3 pt-10">
              <Pill cta={liveIntro.cta} variant="accent" color={ACCENT} />
            </div>
          </div>

          {/* Gerçek ekran mock'u: duvar kâğıdı + menü çubuğu + omuzlu notch + toplantı penceresi */}
          <div className="relative h-[380px] overflow-hidden bg-[linear-gradient(180deg,#a9d8f5_0%,#2f7fd6_45%,#0b3a8a_75%,#04122e_100%)] sm:h-[427px] lg:col-span-2">
            <MacMenuBar menu={liveMeeting.menuBar} />
            <div className="absolute top-0 left-1/2 z-20 -translate-x-1/2">
              <Notch time={liveMeeting.time} battery={liveMeeting.battery} width={300}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={tab.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35 }}
                    className="space-y-1.5 overflow-hidden"
                  >
                    {tab.notch.map((m) => (
                      <NotchCard key={m.label} message={m} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </Notch>
            </div>
            <MeetingWindow
              meeting={liveMeeting.meeting}
              caption={tab.caption}
              compact
              className="absolute bottom-5 left-1/2 w-[88%] max-w-[560px] -translate-x-1/2"
            />
          </div>
        </div>
      </Column>
    </section>
  );
}
