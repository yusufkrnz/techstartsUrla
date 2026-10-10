import {
  AudioLines,
  Bell,
  Brain,
  Calendar,
  Cpu,
  Database,
  FileText,
  Flag,
  Gauge,
  Hash,
  Link2,
  ListChecks,
  Lock,
  Mail,
  Radio,
  Rocket,
  Search,
  Shield,
  Users,
  type LucideIcon,
} from "lucide-react";

// Veri dosyalarındaki ikon adlarını bileşenlere eşler
const icons: Record<string, LucideIcon> = {
  "audio-lines": AudioLines,
  bell: Bell,
  brain: Brain,
  calendar: Calendar,
  cpu: Cpu,
  database: Database,
  "file-text": FileText,
  flag: Flag,
  gauge: Gauge,
  hash: Hash,
  link: Link2,
  "list-checks": ListChecks,
  lock: Lock,
  mail: Mail,
  radio: Radio,
  rocket: Rocket,
  search: Search,
  shield: Shield,
  users: Users,
};

export function Icon({ name, className, color }: { name: string; className?: string; color?: string }) {
  const Cmp = icons[name] ?? FileText;
  return <Cmp className={className} style={color ? { color } : undefined} strokeWidth={1.75} />;
}
