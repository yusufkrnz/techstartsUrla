import type { FooterColumn, IntegrationTile } from "@/types/landing";

export const integrationsIntro = {
  eyebrow: "Integrations",
  lead: "Plugs into",
  highlight: "the tools you already use",
  primary: { label: "Explore integrations", href: "#" },
  secondary: { label: "Talk to sales", href: "#" },
};

const app = (name: string, glyph: string, color: string): IntegrationTile => ({ kind: "app", name, glyph, color });
const blob = (from: string, to: string): IntegrationTile => ({ kind: "blob", from, to });

/**
 * 7 sütun × 5 satır ızgara. Ortadaki 3×3 alan (satır 2-4, sütun 3-5) başlık kartına ayrılır,
 * bu yüzden listede o hücreler yok: toplam 35 - 9 = 26 kutu.
 */
export const integrationTiles: IntegrationTile[] = [
  // satır 1
  app("Zoom", "zoom", "#2d8cff"), app("Salesforce", "SF", "#00a1e0"), app("Meet", "M", "#00ac47"),
  blob("#1d4ed8", "#93c5fd"), app("HubSpot", "H", "#ff7a59"), app("Notion", "N", "#111111"), app("Drive", "D", "#1fa463"),
  // satır 2
  app("Slack", "#", "#e01e5a"), app("Teams", "T", "#5b5fc7"),
  blob("#a3e635", "#14532d"), app("Calendly", "cal", "#111111"),
  // satır 3
  app("Telegram", "✈", "#229ed9"), app("Otter", "ooo", "#6b7280"),
  app("OneDrive", "☁", "#0f78d4"), blob("#7c3aed", "#e9d5ff"),
  // satır 4
  app("Pipedrive", "p", "#1a7f37"), app("Linear", "L", "#111111"),
  app("WhatsApp", "W", "#25d366"), app("Zapier", "⚡", "#5b21b6"),
  // satır 5
  blob("#f97316", "#fff7ed"), app("Contacts", "◉", "#f97316"), app("Loom", "✺", "#7c3aed"),
  app("Evernote", "E", "#00a82d"), app("Gmail", "G", "#ea4335"), blob("#f9a8d4", "#fff1f2"), app("Clay", "C", "#ea580c"),
];

export const footer = {
  tagline: "Live guidance for the conversations that move deals forward.",
  askAi: "Summarise this page with AI",
  aiTargets: ["ChatGPT", "Claude", "Perplexity", "Gemini", "Grok"],
  soon: "Soon",
  copyright: "Sonar © 2026",
  legal: ["Privacy", "Terms", "Cookie settings", "Security", "LinkedIn", "Email"],
  columns: [
    {
      title: "Product",
      links: [
        { label: "Pre-call briefs", href: "#pre-call" },
        { label: "Live assist", href: "#capabilities" },
        { label: "Post-call automation", href: "#after-call" },
        { label: "Sonar Metrics", href: "#metrics" },
        { label: "Integrations", href: "#integrations" },
      ],
    },
    {
      title: "Teams",
      links: [
        { label: "SDRs", href: "#", soon: true },
        { label: "AEs", href: "#", soon: true },
        { label: "Sales Leaders", href: "#" },
        { label: "Founders", href: "#" },
      ],
    },
    {
      title: "Industries",
      links: [
        { label: "Compute & Inference", href: "#" },
        { label: "Voice AI", href: "#", soon: true },
        { label: "Insurance", href: "#" },
        { label: "Startups", href: "#" },
        { label: "Cybersecurity", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Pricing", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Docs", href: "#" },
        { label: "Customers", href: "#", soon: true },
        { label: "About", href: "#" },
        { label: "Contact", href: "#" },
        { label: "Careers", href: "#" },
      ],
    },
  ] satisfies FooterColumn[],
};
