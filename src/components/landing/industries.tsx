import { Apple, ArrowUpRight } from "lucide-react";
import { Icon } from "@/components/landing/icon";
import { Column, Pill, Reveal } from "@/components/landing/primitives";
import { SphereVisual } from "@/components/landing/visuals";
import { industries, industriesFallback, industriesIntro } from "@/data/industries";
import { site } from "@/data/site";
import { testimonials } from "@/data/testimonials";
import type { Industry } from "@/types/landing";

const ACCENT = "#7c4ddb";

export function Industries() {
  const [compute, voice, insurance, startups, cyber] = industries;
  const t = testimonials.founder;

  return (
    <section id="industries" className="relative w-full scroll-mt-24 border-b border-line">
      <Column>
        <div className="relative flex min-h-[200px] items-start border-b border-line">
          <Reveal className="relative z-10 pt-8">
            <h2
              className="mt-4 border-l-2 pr-16 pl-8 text-[30px] leading-[1.12] tracking-[-0.035em] sm:text-[40px]"
              style={{ borderColor: ACCENT }}
            >
              {industriesIntro.lead}
              <br />
              <span style={{ color: ACCENT }}>{industriesIntro.highlight}</span>
            </h2>
          </Reveal>
          <SphereVisual className="absolute top-0 right-0 hidden h-full w-[48%] sm:block" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3">
          <IndustryCell industry={compute} />
          <IndustryCell industry={voice} />
          <IndustryCell industry={insurance} />

          {/* Kurucu alıntısı iki sütun kaplar */}
          <div className="flex flex-col border-b border-line sm:col-span-2 sm:flex-row lg:border-r">
            <div className="flex flex-1 flex-col justify-between bg-paper p-6">
              <p className="text-[19px] leading-[1.3] tracking-[-0.02em]">{t.quote}</p>
              <p className="mt-6 text-[12px]">
                <span className="font-semibold">{t.name}</span> <span className="text-black/55">{t.role}</span>
              </p>
            </div>
            <div
              className="grid aspect-square place-items-center sm:w-[225px]"
              style={{ background: `linear-gradient(135deg, ${t.tint[0]}, ${t.tint[1]})` }}
            >
              <span className="text-[44px] font-semibold text-white/90">{t.initials}</span>
            </div>
          </div>
          <IndustryCell industry={startups} />

          <IndustryCell industry={cyber} />
          <div className="flex flex-col justify-end border-b border-line p-6 sm:col-span-1 lg:col-span-2">
            <h3 className="font-heading text-[36px] leading-[1.1]">{industriesFallback.title}</h3>
            <p className="mt-2 text-[15px] text-black/55">{industriesFallback.body}</p>
            <div className="mt-4 flex gap-2">
              <Pill cta={site.download} icon={<Apple className="size-3.5 fill-current" />} className="rounded-lg text-[13px]" />
              <Pill cta={site.talkToSales} variant="light" className="rounded-lg text-[13px]" />
            </div>
          </div>
        </div>
      </Column>
    </section>
  );
}

function IndustryCell({ industry }: { industry: Industry }) {
  return (
    <div className="group flex min-h-[230px] flex-col border-b border-line p-6 sm:border-r lg:[&:nth-child(3n)]:border-r-0">
      <Icon name={industry.icon} className="size-4" color={industry.color} />
      <div className="mt-auto pt-10">
        <h3 className="text-[22px] leading-[26px] tracking-[-0.02em]">{industry.name}</h3>
        <p className="mt-3 max-w-[220px] text-[13px] leading-[1.45] text-black/60">{industry.description}</p>
        <div className="mt-3">
          {industry.cta ? (
            <a
              href={industry.cta.href}
              className="inline-flex h-8 items-center gap-1 rounded-[10px] px-2 text-[14px] font-semibold tracking-[-0.025em] text-white transition-[filter] hover:brightness-110"
              style={{ backgroundColor: industry.color }}
            >
              {industry.cta.label}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          ) : (
            <span className="inline-flex h-8 items-center rounded-[10px] border border-line px-2 text-[13px] text-black/55">
              {industriesFallback.comingSoon}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
