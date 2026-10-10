import type { AfterItem, LiveTab, MeetingMock, MenuBarMock, PreCallCard, SectionIntro } from "@/types/landing";
import { BRAND } from "@/data/brand";

/* ---------- Before the call ---------- */

export const preCallIntro: SectionIntro = {
  eyebrow: "Before the Call",
  lead: "Preparation starts early:",
  highlight: "not a generic daily digest, but a custom plan built for each meeting.",
  cta: { label: "Explore pre-call", href: "#" },
};

export const preCallBrief = {
  upcoming: "Next call today",
  duration: "30 min",
  title: "Briefing · 30 min with Laura Kim",
  attendee: "Acme",
  chips: ["Acme", "Daniel Ross", "Laura Kim", "2 prior calls"],
  tabs: ["Call", "Company", "People"],
  bullets: [
    "Expansion call with Laura Kim and Daniel Ross; the Acme deal is in Proposal stage.",
    `Acme is piloting ${BRAND} with 4 users (2 SDRs, 2 AEs) before deciding on a wider rollout.`,
    "Still open: pilot feedback, recording access, pricing and the decision date.",
  ],
};

export const preCallPlan = {
  leadLabel: "Open with",
  lead: `How ${BRAND} cuts manual account prep and gives managers a clear view of every deal.`,
  questionsLabel: "Questions to ask",
  openCount: "3 open",
  questions: [
    "What have the four pilot users said so far, and where did onboarding slow down?",
    "Did you and Daniel decide whether to connect call recordings or start with public docs?",
  ],
};

export const preCallNotch = {
  time: "04:35",
  battery: "58%",
  leadLabel: "Open with",
  lead: `How ${BRAND} cuts manual account prep and gives managers a clear view of every deal.`,
  questionsLabel: "Your questions",
  questions: [
    { text: "What has to happen to launch before Q4?", done: true },
    { text: "Who keeps the CRM clean today?", done: false },
    { text: "Is procurement joining the next session?", done: false },
  ],
};

export const preCallCards: PreCallCard[] = [
  { title: "See who’s on the other side", body: "Walk in knowing each attendee’s role, history and what they care about." },
  { title: "Plan your opening", body: "Your opening angle and the discovery questions still unanswered for this account." },
  { title: "Carry it into the call", body: "The plan stays pinned in the notch while you talk, so nothing gets lost once you join." },
];

/* ---------- During the call ---------- */

export const liveIntro: SectionIntro = {
  eyebrow: "During the Call",
  lead: "Own every moment of the conversation:",
  highlight: "answers, research and actions without switching tabs.",
  cta: { label: "Explore live assist", href: "#" },
};

/** Sekmenin otomatik ilerleme süresi (ms) */
export const liveTabDuration = 5000;

export const liveTabs: LiveTab[] = [
  {
    id: "handle",
    caption: "Honestly, the price feels high next to what we pay today.",
    title: "Answer any objection",
    notch: [
      { label: "Objection · Price", tone: "amber", text: "Reframe around ROI: pilot customers cut prep time by 4h per rep each week." },
      { label: "Answer", tone: "lime", text: "SOC 2 Type II, data encrypted at rest and in transit, never used for training." },
    ],
  },
  {
    id: "web",
    caption: "We actually just grew our EMEA sales team quite a bit.",
    title: "Search the web live",
    notch: [
      { label: "Web · Acme", tone: "plain", text: "Acme announced a 40-person EMEA sales team expansion last week." },
      { label: "Use it", tone: "lime", text: "Ask how onboarding new reps fits their Q4 ramp plan." },
    ],
  },
  {
    id: "discovery",
    caption: "We’d love to get a pilot going as soon as possible.",
    title: "Run sharper discovery",
    notch: [
      { label: "Ask next", tone: "amber", text: "Who else needs to approve before a pilot can start?" },
      { label: "Still open", tone: "plain", text: "Decision timeline · Budget owner · Success criteria" },
    ],
  },
  {
    id: "actions",
    caption: "Could your engineer join a follow-up next week?",
    title: "Act without leaving the call",
    notch: [
      { label: "Done", tone: "lime", text: "Follow-up booked: Thu 2:00 PM with Laura Kim and an engineer." },
      { label: "Sent", tone: "plain", text: "Security one-pager shared in the meeting chat." },
    ],
  },
];

/** During panelindeki macOS ekranı: menü çubuğu, notch ve toplantı penceresi */
export const liveMeeting = {
  time: "04:41",
  battery: "58%",
  menuBar: { app: "Meet", items: ["Edit", "View", "Window", "Help"], clock: "Tue Oct 14  2:12 PM" },
  meeting: {
    windowTitle: "Acme security review — Video call",
    speaker: { name: "Laura Kim", initials: "LK" },
    self: { name: "You", initials: "DA" },
    controls: ["Mute", "Stop Video", "Participants", "Chat", "Share Screen", "Reactions"],
    endLabel: "End",
  },
} satisfies { time: string; battery: string; menuBar: MenuBarMock; meeting: MeetingMock };

/* ---------- After the call ---------- */

export const afterIntro: SectionIntro = {
  eyebrow: "After the Call",
  lead: "The call ends, the work is done:",
  highlight: "notes, CRM updates, Slack and follow-ups ready before you leave your desk.",
  cta: { label: "Explore post-call", href: "#" },
};

export const afterItems: AfterItem[] = [
  { label: "Meeting notes drafted automatically", icon: "file-text" },
  { label: "Action items with owners and deadlines", icon: "list-checks" },
  { label: "Full-text searchable transcript", icon: "search" },
  { label: "CRM fields and deal stage synced", icon: "database" },
  { label: "Key moments posted to Slack", icon: "hash" },
  { label: "Next meeting scheduled", icon: "calendar" },
  { label: "Recap email ready to send", icon: "mail" },
  { label: "Context remembered for next time", icon: "brain" },
  { label: "Feature requests sent to product", icon: "radio" },
  { label: "Talk-time balance and coaching tips", icon: "gauge" },
  { label: "Risks and objections highlighted", icon: "flag" },
  { label: "Buying committee kept up to date", icon: "users" },
  { label: "Deal history connected across apps", icon: "link" },
  { label: "Nudges before tasks go stale", icon: "bell" },
];
