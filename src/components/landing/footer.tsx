import { Bot, Sparkles, Search, Atom, Zap, type LucideIcon } from "lucide-react";
import { Logo } from "@/components/landing/logo";
import { PixelWordmark } from "@/components/landing/pixel-wordmark";
import { footer } from "@/data/integrations";
import { hero } from "@/data/hero";
import { site } from "@/data/site";

const aiIcons: LucideIcon[] = [Bot, Sparkles, Search, Atom, Zap];

export function Footer() {
  return (
    <footer className="relative flex min-h-[calc(100svh-3.5rem)] w-full flex-col overflow-hidden bg-night text-white">
      {/* Üstteki beyaz → turuncu → siyah ışıma */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[320px]"
        style={{ background: "linear-gradient(180deg, #fff 0%, #ffd9b8 12%, #ff7a1a 35%, #c2410c 55%, #3b0a00 80%, #080100 100%)" }}
      />

      <div className="relative mx-auto flex w-[calc(100%-2.5rem)] max-w-[1088px] flex-1 flex-col border-x border-white/10 lg:w-[calc(100%-7rem)]">
        <div className="flex h-[320px] items-end justify-end gap-3 px-6 pb-6">
          <span className="max-w-[110px] text-[10px] leading-tight text-white/70">{footer.askAi}</span>
          {footer.aiTargets.map((name, i) => {
            const I = aiIcons[i];
            return (
              <a
                key={name}
                href="#"
                title={name}
                className="grid size-7 place-items-center rounded-lg border border-white/15 text-white/80 transition-colors hover:bg-white/10"
              >
                <I className="size-3.5" />
              </a>
            );
          })}
        </div>

        <div className="grid gap-10 border-t border-white/10 px-6 pt-8 pb-24 md:grid-cols-[1.6fr_repeat(4,1fr)]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-[240px] text-[13px] leading-[1.45] text-white/70">{footer.tagline}</p>
            <div className="mt-6 text-[9px] tracking-[0.16em] text-white/45 uppercase">{hero.partnersLabel}</div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
              {hero.partners.map((n) => (
                <span key={n} className="text-[14px] font-semibold text-white/80">
                  {n}
                </span>
              ))}
            </div>
          </div>
          {footer.columns.map((col) => (
            <div key={col.title}>
              <div className="text-[10px] tracking-[0.14em] text-white/45 uppercase">{col.title}</div>
              <ul className="mt-3 space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className={l.soon ? "text-[12px] text-white/40" : "text-[12px] text-white/85 transition-colors hover:text-white"}
                    >
                      {l.label}
                      {l.soon && (
                        <span className="ml-1.5 rounded bg-white/10 px-1 py-px text-[8px] tracking-wider uppercase">
                          {footer.soon}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Dev, soluk marka yazısı — harflerin içinde hareketli pikseller; boş alan olursa en alta yaslanır */}
        <PixelWordmark text={site.name} className="mt-auto" />

        <div className="flex flex-col gap-3 border-t border-white/10 px-6 py-4 text-[11px] text-white/55 sm:flex-row sm:justify-between">
          <span>{footer.copyright}</span>
          <div className="flex flex-wrap gap-4">
            {footer.legal.map((l) => (
              <a key={l} href="#" className="transition-colors hover:text-white">
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
