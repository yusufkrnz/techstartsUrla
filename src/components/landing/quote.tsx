import { Column } from "@/components/landing/primitives";
import type { Testimonial } from "@/types/landing";

/** Bölümler arasındaki tam genişlik alıntı şeridi: solda metin, sağda kare portre */
export function QuoteStrip({ t, accent }: { t: Testimonial; accent: string }) {
  return (
    <section className="relative w-full scroll-mt-24 border-b border-line">
      <Column className="flex flex-col sm:h-[196px] sm:flex-row">
        <div className="flex flex-1 flex-col justify-between bg-paper p-6">
          <p className="max-w-[640px] text-[19px] leading-[1.3] tracking-[-0.02em] sm:text-[24px]">{t.quote}</p>
          <div className="mt-6 flex items-end justify-between">
            <p className="text-[12px] leading-[15px]">
              <span className="font-semibold">{t.name}</span> <span className="text-black/55">{t.role}</span>
            </p>
            <span className="flex gap-1">
              <span className="h-1 w-3 rounded-full" style={{ backgroundColor: accent }} />
              <span className="h-1 w-3 rounded-full bg-ink" />
            </span>
          </div>
        </div>
        {/* Portre yer tutucu — gerçek fotoğraf gelince <Image> ile değiştir */}
        <div
          className="grid aspect-square place-items-center sm:h-full"
          style={{ background: `linear-gradient(135deg, ${t.tint[0]}, ${t.tint[1]})` }}
        >
          <span className="text-[44px] font-semibold tracking-[-0.04em] text-white/90">{t.initials}</span>
        </div>
      </Column>
    </section>
  );
}
