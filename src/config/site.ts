/**
 * Public site URL: explicit NEXT_PUBLIC_SITE_URL first (set it once the final
 * domain exists), then the Vercel production URL, then localhost.
 */
function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  return vercel ? `https://${vercel}` : "http://localhost:3000";
}

export const siteConfig = {
  name: "Jazzy Code",
  url: resolveSiteUrl(),
  // Temporary test address; NEXT_PUBLIC_CONTACT_EMAIL overrides it.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "javtorres.devtest@gmail.com",
  // Not shown anywhere for now (WhatsApp UI is commented out).
  whatsapp: { number: "524111186290", display: "+52 411 118 6290" },
  social: {
    linkedin: "https://www.linkedin.com/in/javier-t-b4644319b/",
    github: "https://github.com/javiertorresm2000",
  },
  /** CV in PDF (English). Add a Spanish file here when it exists. */
  cv: { href: "/docs/CV_JavierTorres_2026.pdf", locale: "en" },
} as const;

export const navItems = [
  { key: "projects", href: "/projects" },
  { key: "services", href: "/services" },
  { key: "profile", href: "/profile" },
  { key: "cv", href: "/cv" },
  { key: "contact", href: "/contact" },
] as const;
