import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";

/** Territory-qualified locales, as Open Graph expects them. */
const ogLocales: Record<Locale, string> = { en: "en_US", es: "es_MX" };

/** Absolute URL of a locale-less path such as "/projects" in one locale. */
export function absoluteUrl(locale: Locale, href: string) {
  return new URL(getPathname({ locale, href }), siteConfig.url).toString();
}

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

/** Open Graph block shared by every page (a child's block replaces the parent's). */
export function openGraphFor(
  locale: Locale,
  href: string,
  title: string,
  description?: string,
): NonNullable<Metadata["openGraph"]> {
  return {
    type: "website",
    siteName: siteConfig.name,
    locale: ogLocales[locale],
    alternateLocale: routing.locales
      .filter((code) => code !== locale)
      .map((code) => ogLocales[code]),
    url: getPathname({ locale, href }),
    title,
    description,
  };
}

/** Title, description, canonical/hreflang and social tags for one page. */
export function buildMetadata(
  locale: Locale,
  href: string,
  title: string,
  description?: string,
): Metadata {
  return {
    title,
    description,
    alternates: localizedAlternates(locale, href),
    openGraph: openGraphFor(
      locale,
      href,
      `${title} | ${siteConfig.name}`,
      description,
    ),
  };
}

/**
 * Metadata for a simple page whose messages namespace has `metaTitle` and
 * `metaDescription`.
 */
export async function pageMetadata(
  locale: string,
  namespace: "Apps" | "Services" | "Contact" | "Profile" | "CV",
  href: string,
): Promise<Metadata> {
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace });

  return buildMetadata(locale, href, t("metaTitle"), t("metaDescription"));
}
