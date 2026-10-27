import { ArrowUpRightIcon, MailIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/site/container";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";
// import { whatsappUrl } from "@/lib/contact"; // WhatsApp hidden for now
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "Contact", "/contact");
}

export default async function ContactPage({
  params,
}: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Contact");

  const others = [
    { label: "LinkedIn", href: siteConfig.social.linkedin },
    { label: "GitHub", href: siteConfig.social.github },
  ];

  return (
    <Container className="py-16 sm:py-24">
      <SectionHeading
        as="h1"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="grid gap-6">
          {/* WhatsApp is hidden for now (the number is not shown publicly).
          <section className="surface p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold">
              {t("whatsappTitle")}
            </h2>
            <p className="mt-2 text-muted-foreground">{t("whatsappText")}</p>
            <p className="mt-6 font-display text-3xl font-semibold tracking-tight text-brand-soft">
              {siteConfig.whatsapp.display}
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 h-auto min-h-12 py-3 text-center whitespace-normal"
            >
              <a
                href={whatsappUrl(t("whatsappMessage"))}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("whatsappButton")}
                <ArrowUpRightIcon aria-hidden="true" />
                <span className="sr-only">{t("newTab")}</span>
              </a>
            </Button>
          </section> */}

          {siteConfig.email && (
            <section className="surface p-6 sm:p-8">
              <h2 className="font-display text-2xl font-semibold">
                {t("emailTitle")}
              </h2>
              <p className="mt-2 text-muted-foreground">{t("emailText")}</p>
              <p className="mt-6 font-display text-2xl font-semibold tracking-tight break-all text-brand-soft sm:text-3xl">
                {siteConfig.email}
              </p>
              <Button
                asChild
                size="lg"
                className="mt-6 h-auto min-h-12 py-3 text-center whitespace-normal"
              >
                <a
                  href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(
                    t("emailSubject"),
                  )}`}
                >
                  <MailIcon aria-hidden="true" />
                  {t("emailButton")}
                </a>
              </Button>
            </section>
          )}
        </div>

        <section className="surface p-6 sm:p-8 lg:self-start">
          <h2 className="font-display text-2xl font-semibold">
            {t("otherTitle")}
          </h2>
          <ul className="mt-4 grid gap-3">
            {others.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-lg text-brand-soft underline-offset-4 hover:underline"
                >
                  {label}
                  <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                  <span className="sr-only">{t("newTab")}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Container>
  );
}
