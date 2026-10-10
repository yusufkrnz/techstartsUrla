import type { CallLine, FeatureCard, MetricGroup, SectionIntro, TimelineDot } from "@/types/landing";

export const metricsIntro: SectionIntro = {
  eyebrow: "Sonar Metrics",
  lead: "A single view for sales leaders:",
  highlight: "every call, scored and searchable.",
  cta: { label: "Explore Sonar Metrics", href: "#" },
};

export const metricsCall = {
  date: "Oct 9 at 12:30 PM",
  title: "Sonar Demo | Jonas Weber & Elif Arslan",
  summary: "Jonas wants answers on audit trails and will check internal appetite before a follow-up on Monday.",
  meta: [
    { label: "Rep", value: "Elif Arslan" },
    { label: "Company", value: "Contoso" },
    { label: "Attendees", value: "jonas@contoso.com" },
  ],
  kpis: [
    { label: "Insight adoption", value: "33%", tone: "amber" },
    { label: "Engagement", value: "High", tone: "green" },
    { label: "Objection resolution", value: "50%", tone: "plain" },
    { label: "Discovery", value: "4", tone: "green" },
  ],
};

export const metricsGroups: MetricGroup[] = [
  {
    badge: "Call Management",
    badgeTone: "pink",
    rows: [
      { label: "Agenda Set", value: "No", tone: "bad" },
      { label: "Deferrals Count", value: "2" },
      { label: "Filler Word Frequency", value: "5", tone: "good" },
    ],
  },
  {
    badge: "Coaching Adoption",
    badgeTone: "green",
    rows: [
      { label: "Insights Led To Engagement", value: "9/11" },
      { label: "Insights Shown", value: "33", tone: "good" },
    ],
  },
];

export const metricsTranscriptTabs = ["Transcript", "Video"];

export const metricsTranscript: CallLine[] = [
  { speaker: "them", name: "Jonas", text: "Hi Elif, good to finally meet. Can you hear me okay?" },
  { speaker: "you", name: "Elif", text: "Loud and clear. Thanks for making time on a Friday." },
  { speaker: "them", name: "Jonas", text: "Of course. It’s been a hectic week, so this is a nice break." },
  { speaker: "you", name: "Elif", text: "Glad to hear it. How’s the quarter shaping up for your team?" },
  { speaker: "them", name: "Jonas", text: "Busy — we’re onboarding six new reps, which is partly why I took this call." },
  { speaker: "you", name: "Elif", text: "Great timing. Want me to start with how ramp works in Sonar?" },
  { speaker: "them", name: "Jonas", text: "Please. Ramp speed is the thing my VP keeps asking about." },
  { speaker: "you", name: "Elif", text: "Perfect, let me share my screen." },
];

export const metricsAsk = { placeholder: "Ask Sonar", shortcut: "⌘ K" };

export const metricsTimeline = {
  lanes: ["Rep", "Speaking", "Objection", "Insights", "Question", "Next step"],
  ticks: ["00:00", "05:00", "10:00", "15:00", "20:00", "25:00", "30:00"],
  dots: [
    { lane: 2, at: 0.12, kind: "objection" },
    { lane: 3, at: 0.16, kind: "insight" },
    { lane: 4, at: 0.2, kind: "question" },
    { lane: 5, at: 0.21, kind: "next" },
    { lane: 3, at: 0.31, kind: "insight" },
    { lane: 5, at: 0.36, kind: "next" },
    { lane: 2, at: 0.44, kind: "objection" },
    { lane: 3, at: 0.47, kind: "insight" },
    { lane: 5, at: 0.52, kind: "next" },
    { lane: 2, at: 0.6, kind: "objection" },
    { lane: 3, at: 0.64, kind: "insight" },
    { lane: 5, at: 0.66, kind: "next" },
    { lane: 4, at: 0.82, kind: "question" },
    { lane: 4, at: 0.88, kind: "question" },
  ] satisfies TimelineDot[],
  legend: [
    { label: "Speaking", kind: "speaking" },
    { label: "Listening", kind: "listening" },
    { label: "Insights", kind: "insight" },
    { label: "Objection", kind: "objection" },
    { label: "Question", kind: "question" },
    { label: "Next step", kind: "next" },
  ],
};

export const metricsFeatures: FeatureCard[] = [
  {
    title: "Every call, broken down",
    body: "Transcript on the left, timeline on the right: objections raised, insights shown and used, questions asked and who did the talking.",
  },
  {
    title: "Scorecards in your words",
    body: "Describe what a great call looks like for your team. Sonar grades every call against it, alongside built-in scores for discovery, objections and next steps.",
  },
  {
    title: "Dashboards from plain questions",
    body: "Ask a question about your calls in plain English and pin the answer as a live chart. Filter by rep, metric and time range.",
  },
];
