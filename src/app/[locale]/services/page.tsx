import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactCta } from "@/components/site/contact-cta";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Section } from "@/components/site/section";
import { ServicesGrid } from "@/components/site/services-grid";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "Services", "/services");
}

export default async function ServicesPage({
  params,
}: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Services");

  return (
    <>
      <PageHero title={t("title")} description={t("description")} />
      <Section tone="light">
        <Container>
          <div aria-label={t("listLabel")} role="region">
            <ServicesGrid locale={locale} maxExamples={6} />
          </div>
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {t("note")}{" "}
            <Link
              href="/projects"
              className="text-brand-soft underline underline-offset-4"
            >
              {t("noteLink")}
            </Link>
          </p>
        </Container>
      </Section>
      <ContactCta />
    </>
  );
}
