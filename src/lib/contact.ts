import { siteConfig } from "@/config/site";

/** WhatsApp chat link with an optional, correctly encoded first message. */
export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${siteConfig.whatsapp.number}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}
