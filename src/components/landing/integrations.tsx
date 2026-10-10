import { ArrowUpRight, Network } from "lucide-react";
import { BrandIcon } from "@/components/landing/brand-icons";
import { PixelBlob } from "@/components/landing/pixel-blob";
import { Column, Pill, Reveal } from "@/components/landing/primitives";
import { SproutVisual } from "@/components/landing/visuals";
import { integrationTiles, integrationsIntro } from "@/data/integrations";
import type { IntegrationTile } from "@/types/landing";

const ACCENT = "#4d8c12";
const COLS = 7;
const ROWS = 5;

export function Integrations() {
  // 7×5 ızgarada orta 3×3 alan başlık kartına ayrılır; kutuları sırayla yerleştir
  const cells: (IntegrationTile | "card" | null)[] = [];
  let k = 0;
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const inCard = row >= 1 && row <= 3 && col >= 2 && col <= 4;
      if (inCard) cells.push(row === 1 && col === 2 ? "card" : null);
      else cells.push(integrationTiles[k++] ?? null);
    }
  }

  return (
    <section id="integrations" className="relative w-full scroll-mt-24 border-b border-line">
      <Column className="overflow-hidden">
        <div className="-mr-px grid grid-cols-4 sm:grid-cols-7">
          {cells.map((cell, i) => {
            if (cell === null) return null;
            if (cell === "card") return <BrainCard key="card" />;
            return <Tile key={i} tile={cell} />;
          })}
        </div>
      </Column>
    </section>
  );
}

function BrainCard() {
  return (
    <div className="relative col-span-4 row-span-3 flex flex-col items-center overflow-hidden border-r border-b border-[#c7e3a1] text-center sm:col-span-3 sm:col-start-3 sm:row-start-2">
      <Reveal className="relative z-10 px-4 pt-6">
        <span
          className="inline-flex h-6 items-center gap-1.5 rounded-md border px-2 text-[12px]"
          style={{ color: ACCENT, borderColor: `${ACCENT}55` }}
        >
          <Network className="size-3" />
          {integrationsIntro.eyebrow}
        </span>
        <h2 className="mt-4 text-[28px] leading-[1.1] tracking-[-0.035em] sm:text-[34px]">
          {integrationsIntro.lead}
          <br />
          <span style={{ color: ACCENT }}>{integrationsIntro.highlight}</span>
        </h2>
        <div className="mt-5 flex justify-center gap-2">
          <Pill
            cta={integrationsIntro.primary}
            variant="accent"
            color={ACCENT}
            icon={<ArrowUpRight className="order-last size-3.5" />}
            className="text-[13px]"
          />
          <Pill cta={integrationsIntro.secondary} variant="light" className="text-[13px]" />
        </div>
      </Reveal>
      <div className="absolute inset-x-0 bottom-0 h-[58%] bg-[radial-gradient(60%_70%_at_50%_100%,rgba(190,240,110,0.45),transparent)]" />
      <SproutVisual className="absolute inset-x-0 bottom-0 h-[58%] w-full" />
    </div>
  );
}

function Tile({ tile }: { tile: IntegrationTile }) {
  if (tile.kind === "blob") {
    return (
      <div className="aspect-square overflow-hidden border-r border-b border-line">
        <PixelBlob palette={tile.palette} seed={tile.seed} />
      </div>
    );
  }
  return (
    <div className="group grid aspect-square place-items-center border-r border-b border-line transition-colors hover:bg-paper">
      <BrandIcon icon={tile.icon} name={tile.name} className="transition-transform duration-300 group-hover:scale-110" />
    </div>
  );
}
