"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

export function LanguageSwitcher() {
  const t = useTranslations("LanguageSwitcher");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("label")}>
      <ul className="flex items-center gap-1 rounded-full border border-border bg-surface p-1 text-sm">
        {routing.locales.map((code) => {
          const active = code === locale;
          return (
            <li key={code}>
              <Link
                href={pathname}
                locale={code}
                lang={code}
                hrefLang={code}
                aria-current={active ? "true" : undefined}
                // The accessible name starts with the visible text ("ES").
                aria-label={
                  active ? undefined : `${code.toUpperCase()} — ${t(code)}`
                }
                className={
                  "block rounded-full px-3 py-1 font-medium uppercase transition-colors duration-200 " +
                  (active
                    ? "bg-brand text-white"
                    : "text-muted-foreground hover:text-foreground")
                }
              >
                {code}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
