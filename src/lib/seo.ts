import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

/** Canonical + hreflang alternates for a locale-less path such as "/projects". */
export function localizedAlternates(locale: Locale, href: string) {
  const languages = Object.fromEntries(
    routing.locales.map((code) => [code, getPathname({ locale: code, href })]),
  );

  return {
    canonical: getPathname({ locale, href }),
    languages: {
      ...languages,
      "x-default": getPathname({ locale: routing.defaultLocale, href }),
    },
  };
}
