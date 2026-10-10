import type { Cta } from "@/types/landing";
import { BRAND } from "@/data/brand";

// Genel metinler — marka adının kendisi src/data/brand.ts içinde.
export const site = {
  name: BRAND,
  metaTitle: `${BRAND} | The AI that listens on every sales call`,
  metaDescription: `${BRAND} listens to your sales calls and surfaces the right answer, objection handler and next step — live, before, during and after every meeting.`,
  announcement: `New: ${BRAND} now listens in Zoom, Google Meet and Microsoft Teams`,
  nav: [
    { label: "Product", href: "#pre-call" },
    { label: "Teams", href: "#capabilities" },
    { label: "Industries", href: "#industries" },
    { label: "Resources", href: "#integrations" },
    { label: "Pricing", href: "#" },
  ] satisfies Cta[],
  talkToSales: { label: "Talk to sales", href: "#" } satisfies Cta,
  download: { label: "Download", href: "#" } satisfies Cta,
  /** Sol taraftaki sabit bölüm navigasyonu (scroll-spy) */
  sideNav: [
    { id: "pre-call", label: "Pre-call" },
    { id: "capabilities", label: "In-call" },
    { id: "after-call", label: "After-call" },
    { id: "industries", label: "Industries" },
    { id: "metrics", label: "Metrics" },
    { id: "integrations", label: "Integrations" },
  ],
};
