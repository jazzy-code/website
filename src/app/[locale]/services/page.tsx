import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactCta } from "@/components/site/contact-cta";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { services } from "@/content/services";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { pick } from "@/lib/localized";
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
      <Container className="py-16 sm:py-24">
        <SectionHeading
          as="h1"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />
        <ol aria-label={t("listLabel")} className="mt-12 grid gap-6">
          {services.map((service, i) => (
            <Reveal as="li" key={service.id}>
              <article className="surface grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_1fr]">
                <div>
                  <p
                    aria-hidden="true"
                    className="font-display text-sm text-brand-soft tabular-nums"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    {pick(service.name, locale)}
                  </h2>
                  <h3 className="mt-6 text-sm font-medium tracking-widest text-muted-foreground uppercase">
                    {t("problem")}
                  </h3>
                  <p className="mt-2 text-lg leading-relaxed">
                    {pick(service.problem, locale)}
                  </p>
                </div>
                <div className="flex flex-col">
                  <h3 className="text-sm font-medium tracking-widest text-muted-foreground uppercase">
                    {t("examples")}
                  </h3>
                  <ul className="mt-3 grid gap-3 text-muted-foreground">
                    {pick(service.examples, locale)?.map((example) => (
                      <li key={example} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-px w-5 shrink-0 bg-brand-ring"
                        />
                        {example}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-8 self-start lg:mt-auto"
                  >
                    <Link href="/contact">{t("cta")}</Link>
                  </Button>
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
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
      <ContactCta />
    </>
  );
}
