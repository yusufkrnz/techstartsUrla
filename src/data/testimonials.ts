import type { Testimonial } from "@/types/landing";

// Yer tutucu alıntılar (kurgusal kişi/şirketler) — gerçek müşteri alıntıları gelince değiştirilecek.
export const testimonials = {
  technical: {
    quote:
      "When a CTO goes deep on architecture, Sonar hands our reps the exact detail they need — no more “let me get back to you.”",
    name: "Ethan Brooks",
    role: "Head of Sales at Contoso",
    initials: "EB",
    tint: ["#c7b8ff", "#ff8fb1"],
  },
  curveballs: {
    quote:
      "The notch is my safety net. Pricing, security, integrations — whatever comes up, the answer is already on my screen.",
    name: "Can Yıldız",
    role: "Account Executive at Fabrikam",
    initials: "CY",
    tint: ["#7fb6ff", "#1b1b1b"],
  },
  safeguard: {
    quote:
      "Follow-ups used to eat an hour after every call. Now the recap, CRM update and next meeting are done before I close the tab.",
    name: "Sofia Reyes",
    role: "Sales Lead at Tailspin",
    initials: "SR",
    tint: ["#ffb27a", "#1b1b1b"],
  },
  founder: {
    quote:
      "As a founder I jump between sales, hiring and investor calls all day. Sonar keeps the context for every one of them, so I never walk in cold.",
    name: "Deniz Aksoy",
    role: "Co-founder of Litware",
    initials: "DA",
    tint: ["#7aa7ff", "#c8d8ff"],
  },
} satisfies Record<string, Testimonial>;
