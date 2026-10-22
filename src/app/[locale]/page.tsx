import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Home");

  return (
    <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <h1 className="font-display text-5xl font-semibold tracking-tight sm:text-6xl">
        Jazzy Code
      </h1>
      <p className="mt-4 text-lg text-muted">{t("placeholder")}</p>
    </section>
  );
}
