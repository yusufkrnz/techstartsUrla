"use client";

import { motion } from "motion/react";
import { ArrowUpRight, FileCheck2 } from "lucide-react";
import { Icon } from "@/components/landing/icon";
import { Column, SectionHeading } from "@/components/landing/primitives";
import { FanVisual } from "@/components/landing/visuals";
import { afterIntro, afterItems } from "@/data/call-stages";

const ACCENT = "#16a34a";

export function AfterCall() {
  return (
    <section id="after-call" className="relative w-full scroll-mt-24 border-b border-line">
      <Column>
        <SectionHeading intro={afterIntro} color={ACCENT} icon={<FileCheck2 className="size-3" />} />
        <div className="relative h-[180px] bg-gradient-to-b from-white to-[#ecfbf1] sm:h-[250px]">
          <FanVisual className="absolute inset-0 size-full" />
        </div>

        <ul className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
          {afterItems.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="flex h-[62px] items-center gap-2.5 border-b border-line px-6 text-[15px] leading-[21px] sm:border-r sm:[&:nth-child(2n)]:border-r-0 lg:[&:nth-child(2n)]:border-r lg:[&:nth-child(3n)]:border-r-0"
            >
              <Icon name={item.icon} className="size-4 shrink-0" color={ACCENT} />
              {item.label}
            </motion.li>
          ))}
          <li className="border-b border-line">
            <a
              href={afterIntro.cta.href}
              className="flex h-[62px] items-center justify-between px-6 text-[15px] font-semibold text-white transition-[filter] hover:brightness-110"
              style={{ backgroundColor: ACCENT }}
            >
              {afterIntro.cta.label}
              <ArrowUpRight className="size-4" />
            </a>
          </li>
        </ul>
      </Column>
    </section>
  );
}
