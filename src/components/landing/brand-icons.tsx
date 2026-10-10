import {
  siAirtable,
  siAsana,
  siCaldotcom,
  siCalendly,
  siDropbox,
  siEvernote,
  siGmail,
  siGooglecalendar,
  siGoogledrive,
  siGooglemeet,
  siHubspot,
  siJira,
  siLinear,
  siLoom,
  siNotion,
  siOdoo,
  siTelegram,
  siWhatsapp,
  siZapier,
  siZendesk,
  siZoom,
  type SimpleIcon,
} from "simple-icons";
import { cn } from "@/lib/utils";

// Veri dosyasındaki ikon anahtarlarını simple-icons verisine eşler
const brandIcons: Record<string, SimpleIcon> = {
  airtable: siAirtable,
  asana: siAsana,
  caldotcom: siCaldotcom,
  calendly: siCalendly,
  dropbox: siDropbox,
  evernote: siEvernote,
  gmail: siGmail,
  googlecalendar: siGooglecalendar,
  googledrive: siGoogledrive,
  googlemeet: siGooglemeet,
  hubspot: siHubspot,
  jira: siJira,
  linear: siLinear,
  loom: siLoom,
  notion: siNotion,
  odoo: siOdoo,
  telegram: siTelegram,
  whatsapp: siWhatsapp,
  zapier: siZapier,
  zendesk: siZendesk,
  zoom: siZoom,
};

export function BrandIcon({ icon, name, className }: { icon: string; name: string; className?: string }) {
  const data = brandIcons[icon];
  if (!data) return <span className="text-[13px] font-semibold text-black/70">{name}</span>;
  return (
    <svg role="img" viewBox="0 0 24 24" className={cn("size-9", className)} fill={`#${data.hex}`}>
      <title>{name}</title>
      <path d={data.path} />
    </svg>
  );
}
