import type { FooterColumn, IntegrationTile } from "@/types/landing";
import { BRAND } from "@/data/brand";

export const integrationsIntro = {
  eyebrow: "Integrations",
  lead: "Plugs into",
  highlight: "the tools you already use",
  primary: { label: "Explore integrations", href: "#" },
  secondary: { label: "Talk to sales", href: "#" },
};

const app = (name: string, icon: string): IntegrationTile => ({ kind: "app", name, icon });
const blob = (palette: string[], seed: number): IntegrationTile => ({ kind: "blob", palette, seed });

/** Piksel bulut paletleri: zemin rengi → çekirdek rengi */
const blobPalettes = {
  blue: ["#ffffff", "#c7d4fb", "#5d82ee", "#2350e0", "#1235c8"],
  green: ["#ffffff", "#eef06a", "#b5d93a", "#4f9a2e", "#1d4a1a"],
  purple: ["#ffffff", "#ddc8fb", "#a575f2", "#7c3aed", "#5b16c9"],
  orange: ["#ff6714", "#ff8c4d", "#ffc39c", "#fff3ea", "#ffffff"],
  pink: ["#ffffff", "#e9c4f2", "#d59ae6", "#f4b7c5", "#fff1ef"],
};

/**
 * 7 sütun × 5 satır ızgara. Ortadaki 3×3 alan (satır 2-4, sütun 3-5) başlık kartına ayrılır,
 * bu yüzden listede o hücreler yok: toplam 35 - 9 = 26 kutu.
 */
export const integrationTiles: IntegrationTile[] = [
  // satır 1
  app("Zoom", "zoom"), app("Gmail", "gmail"), app("Google Meet", "googlemeet"),
  blob(blobPalettes.blue, 11), app("HubSpot", "hubspot"), app("Notion", "notion"), app("Google Drive", "googledrive"),
  // satır 2
  app("Google Calendar", "googlecalendar"), app("Linear", "linear"),
  blob(blobPalettes.green, 23), app("Cal.com", "caldotcom"),
  // satır 3
  app("Telegram", "telegram"), app("Odoo", "odoo"),
  app("Dropbox", "dropbox"), blob(blobPalettes.purple, 37),
  // satır 4
  app("Airtable", "airtable"), app("Jira", "jira"),
  app("WhatsApp", "whatsapp"), app("Zapier", "zapier"),
  // satır 5
  blob(blobPalettes.orange, 41), app("Calendly", "calendly"), app("Loom", "loom"),
  app("Evernote", "evernote"), app("Asana", "asana"), blob(blobPalettes.pink, 53), app("Zendesk", "zendesk"),
];

export const footer = {
  tagline: "An extra ear on every call — live guidance for the conversations that move deals forward.",
  askAi: "Summarise this page with AI",
  aiTargets: ["ChatGPT", "Claude", "Perplexity", "Gemini", "Grok"],
  soon: "Soon",
  copyright: `${BRAND} © 2026`,
  legal: ["Privacy", "Terms", "Cookie settings", "Security", "LinkedIn", "Email"],
  columns: [
    {
      title: "Product",
      links: [
        { label: "Pre-call briefs", href: "#pre-call" },
        { label: "Live assist", href: "#capabilities" },
        { label: "Post-call automation", href: "#after-call" },
        { label: `${BRAND} Metrics`, href: "#metrics" },
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
