import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/** Geçici marka işareti — gerçek logo gelince burası değişir */
export function LogoMark({ className }: { className?: string }) {
  return (
    <span className={cn("grid size-5 place-items-center rounded-full bg-lime", className)}>
      <svg viewBox="0 0 16 16" className="size-3" fill="none" aria-hidden>
        <path d="M3 9.5c1.6-4 4-5.5 10-6-1 5.5-3.5 8.6-8.5 9.5" stroke="#1b1b1b" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
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
