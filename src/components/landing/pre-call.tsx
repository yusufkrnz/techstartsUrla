"use client";

import { motion } from "motion/react";
import { CalendarDays, Check, Circle } from "lucide-react";
import type { ReactNode } from "react";
import { Notch } from "@/components/landing/notch";
import { Column, EASE, Pill, SectionHeading } from "@/components/landing/primitives";
import { preCallBrief, preCallCards, preCallIntro, preCallNotch, preCallPlan } from "@/data/call-stages";

const ACCENT = "#e07a00";
/** Sütunların merdiven gibi kayan dikey ofsetleri (px) */
const STAGGER = ["lg:mt-0", "lg:mt-[56px]", "lg:mt-[112px]"];

export function PreCall() {
  const mocks: ReactNode[] = [<BriefMock key="brief" />, <PlanMock key="plan" />, <NotchMock key="notch" />];

  return (
    <section id="pre-call" className="relative w-full scroll-mt-24 border-b border-line">
      <Column className="pb-10">
        <SectionHeading intro={preCallIntro} color={ACCENT} icon={<CalendarDays className="size-3" />} />

        <div className="mt-10 grid gap-6 px-0 lg:grid-cols-3 lg:gap-0">
          {mocks.map((mock, i) => (
            <motion.div
              key={preCallCards[i].title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: EASE }}
              className={STAGGER[i]}
            >
              <div className="h-[230px] overflow-hidden">{mock}</div>
              <div className="p-4" style={{ backgroundColor: `${ACCENT}14` }}>
                <h3 className="text-[17px] leading-[1.45]">{preCallCards[i].title}</h3>
                <p className="mt-1 text-[15px] leading-[21px] text-black/55">{preCallCards[i].body}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 px-6">
          <Pill cta={preCallIntro.cta} variant="accent" color={ACCENT} />
        </div>
      </Column>
    </section>
  );
}

function BriefMock() {
  return (
    <div className="h-full border-r border-line bg-white p-3 text-[10px]">
      <div className="flex gap-1 text-black/45">
        {preCallBrief.upcoming} · {preCallBrief.duration}
      </div>
      <div className="mt-1 text-[13px] leading-tight font-semibold">
        {preCallBrief.title} <span className="text-black/50">({preCallBrief.attendee})</span>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {preCallBrief.chips.map((c) => (
          <span key={c} className="rounded-full border border-line px-1.5 py-0.5 text-[9px]">
            {c}
          </span>
        ))}
      </div>
      <div className="mt-2 flex gap-1">
        {preCallBrief.tabs.map((t, i) => (
          <span key={t} className={i === 0 ? "rounded-md bg-paper px-2 py-0.5 font-semibold" : "px-2 py-0.5 text-black/45"}>
            {t}
          </span>
        ))}
      </div>
      <ul className="mt-2 space-y-1.5 rounded-[12px] bg-paper p-3">
        {preCallBrief.bullets.map((b) => (
          <li key={b} className="flex gap-1.5 leading-[1.4] text-black/75">
            <span className="mt-[5px] size-1 shrink-0 rounded-full bg-black/40" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  );
}

function PlanMock() {
  return (
    <div className="flex h-full flex-col gap-2 bg-paper/60 p-3 text-[10px]">
      <section className="rounded-[14px] bg-lime p-3 text-black">
        <div className="text-[8px] font-semibold tracking-wider uppercase">{preCallPlan.leadLabel}</div>
        <p className="mt-1 text-[11px] leading-snug font-semibold">{preCallPlan.lead}</p>
      </section>
      <section className="flex-1 rounded-[14px] bg-[#fff3cd] p-3.5 text-[#9b6500]">
        <div className="flex justify-between text-[8px] font-semibold tracking-wider uppercase">
          {preCallPlan.questionsLabel}
          <span className="normal-case">{preCallPlan.openCount}</span>
        </div>
        <ul className="mt-2 space-y-2">
          {preCallPlan.questions.map((q) => (
            <li key={q} className="leading-[1.4]">
              {q}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function NotchMock() {
  return (
    <div className="flex h-full items-start justify-center border-l border-line bg-white pt-4">
      <Notch time={preCallNotch.time} battery={preCallNotch.battery} className="w-[90%] rounded-[18px]">
        <div className="rounded-lg bg-white/[0.06] p-2">
          <div className="text-[8px] font-semibold tracking-wider text-[#c9f25a] uppercase">{preCallNotch.leadLabel}</div>
          <p className="mt-1 text-[10px] leading-snug">{preCallNotch.lead}</p>
        </div>
        <div className="mt-2 rounded-lg border border-[#ffc53d]/30 p-2">
          <div className="text-[10px] font-semibold text-[#ffc53d]">{preCallNotch.questionsLabel}</div>
          <ul className="mt-1.5 space-y-1.5">
            {preCallNotch.questions.map((q) => (
              <li key={q.text} className="flex items-center gap-1.5 text-[9.5px]">
                {q.done ? <Check className="size-3 text-[#ffc53d]" /> : <Circle className="size-3 text-white/40" />}
                <span className={q.done ? "text-white/40 line-through" : "text-white/85"}>{q.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </Notch>
    </div>
  );
}
