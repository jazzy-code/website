import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems, siteConfig } from "@/config/site";
import { Wordmark } from "./wordmark";

export function Footer() {
  const t = useTranslations("Footer");
  const nav = useTranslations("Nav");
  const hasContact = siteConfig.email || siteConfig.whatsapp;

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-3">
        <Wordmark />
        <nav aria-label={t("navLabel")}>
          <ul className="grid gap-2 text-sm">
            {navItems.map(({ key, href }) => (
              <li key={key}>
                <Link href={href} className="text-muted-foreground hover:text-foreground">
                  {nav(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {hasContact && (
          <ul aria-label={t("contactLabel")} className="grid gap-2 text-sm">
            {siteConfig.email && (
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-brand-soft underline-offset-4 hover:underline"
                >
                  {t("email")}: {siteConfig.email}
                </a>
              </li>
            )}
            {siteConfig.whatsapp && (
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-soft underline-offset-4 hover:underline"
                >
                  {t("whatsapp")}
                </a>
              </li>
            )}
          </ul>
        )}
      </div>
      <p className="border-t border-border px-4 py-4 text-center text-xs text-muted-foreground">
        {t("rights", { year: new Date().getFullYear() })}
      </p>
    </footer>
  );
}
