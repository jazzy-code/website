import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems, siteConfig } from "@/config/site";
// import { whatsappUrl } from "@/lib/contact"; // WhatsApp hidden for now
import { LogoLink } from "./logo-link";

const columnTitle =
  "text-xs font-semibold tracking-widest text-muted-foreground uppercase";
const linkClass =
  "text-sm text-muted-foreground transition-colors hover:text-foreground";

/**
 * Brand on one side, link columns on the other. The columns sit in their own
 * grid (2 per row on phones, 3 from `sm`), so a new group of links only needs
 * another `<div>` there.
 */
export function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");

  const contactLinks = [
    // WhatsApp hidden for now (the number is not shown publicly):
    // { label: t("whatsapp"), href: whatsappUrl() },
    { label: "LinkedIn", href: siteConfig.social.linkedin },
    { label: "GitHub", href: siteConfig.social.github },
  ];

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-12 sm:px-6 md:grid-cols-[1fr_1.6fr] md:gap-16">
        <div className="flex flex-col items-start gap-4">
          <LogoLink className="w-fit">
            <Image
              src="/logos/logo-white.png"
              alt="Jazzy Code"
              width={96}
              height={75}
            />
          </LogoLink>
          <p className="max-w-xs text-sm text-muted-foreground">
            {t("tagline")}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3">
          <nav aria-label={t("navLabel")}>
            <h2 className={columnTitle}>{t("exploreTitle")}</h2>
            <ul className="mt-4 grid gap-3">
              {navItems.map(({ key, href }) => (
                <li key={key}>
                  <Link href={href} className={linkClass}>
                    {nav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className={columnTitle}>{t("contactTitle")}</h2>
            <ul aria-label={t("contactLabel")} className="mt-4 grid gap-3">
              {siteConfig.email && (
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className={`${linkClass} break-all`}
                  >
                    {siteConfig.email}
                  </a>
                </li>
              )}
              {contactLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {label}
                    <span className="sr-only"> {t("newTab")}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-muted-foreground sm:px-6 text-center">
          {t("rights", { year: new Date().getFullYear() })}
        </p>
      </div>
    </footer>
  );
}
