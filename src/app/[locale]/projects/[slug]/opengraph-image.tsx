import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";
import { getProject, getProjectSlugs } from "@/lib/projects";

export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getProjectSlugs().map((slug) => ({ locale, slug })),
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
  const found = getProject(slug, lang);
  const t = await getTranslations({ locale: lang, namespace: "Projects" });

  return renderOgImage({
    eyebrow: t("detailEyebrow"),
    title: found?.project.name ?? "Jazzy Code",
    description: found?.project.summary,
  });
}
