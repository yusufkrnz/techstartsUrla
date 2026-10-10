export type Cta = { label: string; href: string };

export type SectionIntro = {
  eyebrow: string;
  lead: string;
  highlight: string;
  cta: Cta;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
  /** Avatar arka planı için iki renk */
  tint: [string, string];
};

export type CallLine = { speaker: "them" | "you"; name: string; text: string };

export type NotchMessage = { label: string; text: string; tone: "lime" | "amber" | "plain" };

export type PreCallCard = { title: string; body: string };

/** caption: karşı tarafın o an söylediği cümle — notch bu cümleye cevap verir */
export type LiveTab = { id: string; title: string; caption: string; notch: NotchMessage[] };

export type MenuBarMock = { app: string; items: string[]; clock: string };
export type Person = { name: string; initials: string };
export type MeetingMock = { windowTitle: string; speaker: Person; self: Person; controls: string[]; endLabel: string };

export type AfterItem = { label: string; icon: string };

export type Industry = {
  name: string;
  description: string;
  icon: string;
  color: string;
  cta: Cta | null;
  comingSoon?: boolean;
};

export type MetricRow = { label: string; value: string; tone?: "good" | "bad" | "plain" };
export type MetricGroup = { badge: string; badgeTone: "pink" | "green" | "blue"; rows: MetricRow[] };

export type TimelineDot = { lane: number; at: number; kind: "objection" | "insight" | "next" | "question" | "button" };

export type FeatureCard = { title: string; body: string };

export type IntegrationTile =
  /** icon: simple-icons anahtarı (bkz. components/landing/brand-icons.tsx) */
  | { kind: "app"; name: string; icon: string }
  /** Kendi içinde akan piksel bulut: palet açıktan koyuya (zemin → çekirdek) */
  | { kind: "blob"; palette: string[]; seed: number };

export type FooterColumn = {
  title: string;
  links: { label: string; href: string; soon?: boolean }[];
};
