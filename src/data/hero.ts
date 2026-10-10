import type { NotchMessage } from "@/types/landing";

export const hero = {
  titleLines: ["Have the answer", "on every sales call"],
  subtitleBefore: "Your team’s knowledge, surfaced",
  subtitleHighlight: "live",
  subtitleAfter: "during every customer call.",
  subtitleSecondLine: "Tackle technical questions, sharpen discovery and always know your next move.",
  partnersLabel: "Works with",
  partners: ["Zoom", "Google Meet", "Microsoft Teams"],
};

/** Hero'daki macOS + toplantı mock'u */
export const heroMock = {
  menuBar: { app: "Meet", items: ["Edit", "Window", "Help"], clock: "Tue Oct 14  9:41 AM" },
  windowTitle: "Video Meeting",
  speaker: { name: "Laura Kim", initials: "LK" },
  self: { name: "You", initials: "DA" },
  caption: "Can your engineer join us for a deeper dive next week?",
  controls: ["Mute", "Stop Video", "Participants", "Chat", "Share Screen", "Reactions"],
  endLabel: "End",
  notch: { time: "04:41", battery: "58%" },
};

/** Notch içinde sırayla akan öneriler */
export const heroNotchFeed: NotchMessage[] = [
  {
    label: "Answer",
    tone: "lime",
    text: "Yes — a solutions engineer can join. Offer Thursday 2pm or Friday 11am and invite their IT lead.",
  },
  {
    label: "Context",
    tone: "plain",
    text: "Laura’s team already records calls, but reps still prep by hand. Position Sonar as the live layer that answers during the meeting.",
  },
  {
    label: "Ask next",
    tone: "amber",
    text: "Who else needs to approve before a pilot can start?",
  },
];
