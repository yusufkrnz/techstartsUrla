import { Ear } from "lucide-react";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/** Marka işareti: kulak ("Qulaq" = kulak) — gerçek logo gelince burası değişir */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("grid size-5 place-items-center rounded-full bg-lime", className)}>
      <Ear className="size-3 text-ink" strokeWidth={2.4} aria-hidden />
    </span>
  );
}

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <a href="#" className={cn("flex items-center gap-1.5 text-[19px] font-semibold tracking-[-0.03em]", light ? "text-white" : "text-ink", className)}>
      <LogoMark />
      {site.name}
    </a>
  );
}
