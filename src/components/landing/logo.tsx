import { site } from "@/data/site";
import { cn } from "@/lib/utils";

// Logo doğrudan public/logo/qullaq.svg dosyasından gelir; CSS mask ile bulunduğu yerin
// yazı rengini alır (navbar'da siyah, footer'da beyaz). GitHub Pages alt yolu için base path eklenir.
const logoUrl = `url(${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/logo/qullaq.svg)`;

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn("inline-block size-[22px] shrink-0 bg-current", className)}
      style={{
        maskImage: logoUrl,
        WebkitMaskImage: logoUrl,
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    />
  );
}

export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <a
      href="#"
      className={cn(
        "flex items-center gap-1.5 text-[19px] font-semibold tracking-[-0.03em]",
        light ? "text-white" : "text-ink",
        className,
      )}
    >
      <LogoMark />
      {site.name}
    </a>
  );
}
