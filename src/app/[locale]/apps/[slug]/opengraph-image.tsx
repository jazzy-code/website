import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { getApp, getAppSlugs } from "@/lib/apps";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAppSlugs().map((slug) => ({ locale, slug })),
  );
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const lang = hasLocale(routing.locales, locale)
    ? locale
    : routing.defaultLocale;
  const app = getApp(slug, lang);
  const t = await getTranslations({ locale: lang, namespace: "Apps" });

  return renderOgImage({
    eyebrow: t("eyebrow"),
    title: app?.name ?? "Jazzy Code",
    description: app?.tagline,
  });
}
