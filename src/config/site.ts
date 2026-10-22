export const siteConfig = {
  name: "Jazzy Code",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  // Optional: links are hidden until these env vars are set (see .env.example).
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, ""),
} as const;

export const navItems = [
  { key: "projects", href: "/projects" },
  { key: "services", href: "/services" },
  { key: "profile", href: "/profile" },
  { key: "cv", href: "/cv" },
  { key: "contact", href: "/contact" },
] as const;
