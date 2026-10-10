"use client";

import { motion } from "motion/react";
import { ArrowUpRight, BarChart3, FileText, Video } from "lucide-react";
import { Column, Reveal, SectionHeading } from "@/components/landing/primitives";
import {
  metricsAsk,
  metricsCall,
  metricsFeatures,
  metricsGroups,
  metricsIntro,
  metricsTimeline,
  metricsTranscript,
  metricsTranscriptTabs,
} from "@/data/metrics";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";
import type { MetricGroup, TimelineDot } from "@/types/landing";

const ACCENT = "#ff6a13";
const BG = "#240000";

const kpiTone: Record<string, string> = { amber: "text-[#ffc53d]", green: "text-[#4ade80]", plain: "text-white" };
const rowTone = { good: "text-[#4ade80]", bad: "text-[#f87171]", plain: "text-white/80" } as const;
const badgeTone: Record<MetricGroup["badgeTone"], string> = {
  pink: "bg-[#f472b6] text-black",
  green: "bg-[#a3e635] text-black",
  blue: "bg-[#60a5fa] text-black",
};
const dotColor: Record<TimelineDot["kind"] | "speaking" | "listening", string> = {
  objection: "#ef4444",
  insight: "#22c55e",
  next: "#22d3ee",
  question: "#a855f7",
  button: "#60a5fa",
  speaking: "#3b82f6",
  listening: "#a16207",
};

/** Beyazdan koyu bordoya (veya tersi) yumuşak geçiş şeridi */
export function MetricsFade({ reverse }: { reverse?: boolean }) {
  return (
    <section aria-hidden className="relative w-full" style={{ background: `linear-gradient(${reverse ? "0deg" : "180deg"}, #fff 0%, ${BG} 100%)` }}>
      <Column className="h-[120px] border-white/10 sm:h-[240px]" />
    </section>
  );
}

export function Metrics() {
  return (
    <section id="metrics" className="relative w-full scroll-mt-24 text-white" style={{ backgroundColor: BG }}>
      <Column className="border-white/10 pb-0">
        <SectionHeading intro={metricsIntro} color={ACCENT} icon={<BarChart3 className="size-3" />} dark />

        <Reveal className="relative mx-3 mt-10 sm:mx-6">
          <a
            href={site.talkToSales.href}
            className="absolute -top-4 left-1/2 z-10 -translate-x-1/2 rounded-[10px] px-3 py-1.5 text-[13px] font-semibold text-white shadow-lg"
            style={{ backgroundColor: ACCENT }}
          >
            {site.talkToSales.label}
          </a>
          <div className="grid gap-2 rounded-2xl border border-white/10 bg-[#140303] p-2 lg:grid-cols-[1fr_0.75fr_1.15fr]">
            <CallPanel />
            <TranscriptPanel />
            <TimelinePanel />
          </div>
        </Reveal>

        <div className="mt-10 grid border-t border-white/10 sm:grid-cols-2">
          {metricsFeatures.map((f, i) => (
            <div key={f.title} className={cn("border-b border-white/10 p-6", i % 2 === 0 && "sm:border-r")}>
              <h3 className="text-[22px] leading-[26px] tracking-[-0.02em]">{f.title}</h3>
              <p className="mt-2 text-[13px] leading-[1.5] text-white/60">{f.body}</p>
            </div>
          ))}
          <a
            href={metricsIntro.cta.href}
            className="flex items-center justify-between border-b border-white/10 p-6 text-[15px] font-semibold transition-[filter] hover:brightness-110"
            style={{ backgroundColor: ACCENT }}
          >
            {metricsIntro.cta.label}
            <ArrowUpRight className="size-4" />
          </a>
        </div>
      </Column>
    </section>
  );
}

function CallPanel() {
  return (
    <div className="rounded-xl bg-[#1d0606] p-4 text-[11px]">
      <div className="text-white/45">{metricsCall.date}</div>
      <div className="mt-1 text-[13px] font-semibold">{metricsCall.title}</div>
      <p className="mt-1 line-clamp-2 text-white/55">{metricsCall.summary}</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        {metricsCall.meta.map((m) => (
          <div key={m.label} className="min-w-0">
            <div className="text-[8px] tracking-wider text-white/40 uppercase">{m.label}</div>
            <div className="truncate">{m.value}</div>
          </div>
        ))}
      </div>
      <div className="mt-3 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-white/10">
        {metricsCall.kpis.map((k) => (
          <div key={k.label} className="bg-[#1d0606] p-2.5">
            <div className="text-white/45">{k.label}</div>
            <div className={cn("mt-1 text-[18px] font-semibold", kpiTone[k.tone])}>{k.value}</div>
          </div>
        ))}
      </div>
      {metricsGroups.map((g) => (
        <div key={g.badge} className="mt-3">
          <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-semibold", badgeTone[g.badgeTone])}>{g.badge}</span>
          <ul className="mt-1.5">
            {g.rows.map((r) => (
              <li key={r.label} className="flex justify-between border-b border-white/5 py-1.5">
                <span className="text-white/75">{r.label}</span>
                <span className={rowTone[r.tone ?? "plain"]}>{r.value}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function TranscriptPanel() {
  return (
    <div className="flex flex-col rounded-xl bg-[#1d0606] p-3 text-[10.5px]">
      <div className="flex gap-1">
        {metricsTranscriptTabs.map((tab, i) => (
          <span key={tab} className={cn("flex items-center gap-1 rounded-md px-2 py-1", i === 0 ? "bg-white/10" : "text-white/45")}>
            {i === 0 ? <FileText className="size-3" /> : <Video className="size-3" />}
            {tab}
          </span>
        ))}
      </div>
      <div className="mt-3 flex flex-1 flex-col gap-2">
        {metricsTranscript.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={cn(
              "max-w-[85%] rounded-xl px-2.5 py-1.5 leading-[1.4]",
              line.speaker === "you" ? "self-end bg-[#3b82f6] text-white" : "self-start bg-white/10 text-white/85",
            )}
          >
            {line.text}
          </motion.p>
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between rounded-lg bg-white/5 px-2.5 py-2 text-white/45">
        {metricsAsk.placeholder}
        <span className="rounded bg-white/10 px-1 text-[9px]">{metricsAsk.shortcut}</span>
      </div>
    </div>
  );
}

function TimelinePanel() {
  const { lanes, ticks, dots, legend } = metricsTimeline;
  return (
    <div className="flex flex-col rounded-xl bg-[#1d0606] p-3 text-[9px] text-white/50">
      <div className="relative flex flex-1 gap-2">
        <div className="flex flex-col justify-between pt-6">
          {ticks.map((t) => (
            <span key={t} className="font-mono">
              {t}
            </span>
          ))}
        </div>
        <div className="relative grid flex-1" style={{ gridTemplateColumns: `repeat(${lanes.length}, 1fr)` }}>
          {lanes.map((lane, li) => (
            <div key={lane} className="relative flex flex-col items-center border-l border-white/10">
              <span className="h-6 font-mono text-[8px] tracking-wider uppercase [writing-mode:vertical-rl]">{lane}</span>
              <div className="relative w-full flex-1">
                {li === 1 && (
                  <motion.div
                    className="absolute left-1/2 w-1.5 -translate-x-1/2 rounded-sm bg-gradient-to-b from-[#3b82f6] via-[#a16207] to-[#3b82f6]"
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.4 }}
                  />
                )}
                {dots
                  .filter((d) => d.lane === li)
                  .map((d, di) => (
                    <motion.span
                      key={di}
                      className="absolute left-1/2 size-2 -translate-x-1/2 rounded-full ring-2 ring-[#1d0606]"
                      style={{ top: `${d.at * 100}%`, backgroundColor: dotColor[d.kind] }}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + d.at }}
                    />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-1.5 border-t border-white/10 pt-2">
        {legend.map((l) => (
          <span key={l.label} className="flex items-center gap-1 font-mono text-[8px] uppercase">
            <span className="size-1.5 rounded-full" style={{ backgroundColor: dotColor[l.kind as keyof typeof dotColor] }} />
            {l.label}
          </span>
        ))}
      </div>
    </div>
  );
}
