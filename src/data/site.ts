import type { Cta } from "@/types/landing";

// Marka adı ve genel metinler — markayı değiştirmek için yalnızca burayı düzenle.
export const site = {
  name: "Sonar",
  metaTitle: "Sonar | Live AI copilot for sales calls",
  metaDescription:
    "Sonar is a live AI copilot for sales calls. Answer hard questions, handle objections and know your next move — before, during and after every meeting.",
  announcement: "New: live answers now work in Zoom, Google Meet and Microsoft Teams",
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
