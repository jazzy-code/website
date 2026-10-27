import { siteConfig } from "@/config/site";
import { profile } from "@/content/profile";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/localized";
import { absoluteUrl } from "@/lib/seo";

const context = "https://schema.org";

/** Only confirmed facts: no logo, address, phone or ratings are declared. */
function founder(locale: Locale) {
  return {
    "@type": "Person",
    name: profile.name,
    url: absoluteUrl(locale, "/profile"),
  };
}

export function organizationJsonLd(locale: Locale, description: string) {
  return {
    "@context": context,
    "@type": "Organization",
    name: siteConfig.name,
    url: absoluteUrl(locale, "/"),
    description,
    founder: founder(locale),
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": context,
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl(locale, "/"),
    inLanguage: locale,
  };
}

export function personJsonLd(locale: Locale) {
  return {
    "@context": context,
    "@type": "Person",
    name: profile.name,
    jobTitle: pick(profile.title, locale),
    url: absoluteUrl(locale, "/profile"),
    sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: absoluteUrl(locale, "/"),
    },
  };
}

export function breadcrumbJsonLd(
  items: readonly { name: string; href: string }[],
  locale: Locale,
) {
  return {
    "@context": context,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(locale, item.href),
    })),
  };
}
