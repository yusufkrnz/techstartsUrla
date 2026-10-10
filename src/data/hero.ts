import type { MeetingMock, MenuBarMock, NotchMessage } from "@/types/landing";
import { BRAND } from "@/data/brand";

export const hero = {
  titleLines: ["Have the answer", "on every sales call"],
  subtitleBefore: `${BRAND} listens with you and surfaces your team’s answers`,
  subtitleHighlight: "live",
  subtitleAfter: "on every call.",
  subtitleSecondLine: "Tackle technical questions, sharpen discovery and always know your next move.",
  partnersLabel: "Works with",
  partners: ["Zoom", "Google Meet", "Microsoft Teams"],
};

/** Hero'daki macOS + toplantı mock'u */
export const heroMock = {
  menuBar: { app: "Meet", items: ["Edit", "Window", "Help"], clock: "Tue Oct 14  9:41 AM" },
  meeting: {
    windowTitle: "Video Meeting",
    speaker: { name: "Laura Kim", initials: "LK" },
    self: { name: "You", initials: "DA" },
    controls: ["Mute", "Stop Video", "Participants", "Chat", "Share Screen", "Reactions"],
    endLabel: "End",
  },
  caption: "Can your engineer join us for a deeper dive next week?",
  notch: { time: "04:41", battery: "58%" },
} satisfies { menuBar: MenuBarMock; meeting: MeetingMock; caption: string; notch: { time: string; battery: string } };

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
    text: `Laura’s team already records calls, but reps still prep by hand. Position ${BRAND} as the live layer that answers during the meeting.`,
  },
  {
    label: "Ask next",
    tone: "amber",
    text: "Who else needs to approve before a pilot can start?",
  },
];
