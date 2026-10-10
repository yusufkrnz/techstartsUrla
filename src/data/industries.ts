import type { Industry } from "@/types/landing";
import { BRAND } from "@/data/brand";

export const industriesIntro = {
  lead: "Designed for",
  highlight: "the toughest technical sales",
};

export const industries: Industry[] = [
  {
    name: "Compute & Inference",
    description: "Give exact answers on GPUs, latency and pricing.",
    icon: "cpu",
    color: "#ef2cc1",
    cta: { label: "Explore Compute & Inference", href: "#" },
  },
  {
    name: "Voice AI",
    description: "Demo voice products without missing a detail.",
    icon: "audio-lines",
    color: "#9b5cf6",
    cta: null,
    comingSoon: true,
  },
  {
    name: "Insurance",
    description: "Handle policy details and tricky buyer questions.",
    icon: "shield",
    color: "#f2711c",
    cta: { label: "Explore Insurance", href: "#" },
  },
  {
    name: "Startups",
    description: "Turn founder-led sales into a repeatable process.",
    icon: "rocket",
    color: "#1b4dff",
    cta: { label: "Explore Startups", href: "#" },
  },
  {
    name: "Cybersecurity",
    description: "Field deep security questions on the spot.",
    icon: "lock",
    color: "#2d4fc4",
    cta: { label: "Explore Cybersecurity", href: "#" },
  },
];

export const industriesFallback = {
  title: "Don’t see your industry?",
  body: `${BRAND} learns any product from the material you already have.`,
  comingSoon: "Coming soon",
};
