import { ArrowUpRightIcon, MailIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { siFacebook, siGithub, siInstagram } from "simple-icons";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
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

  const follow = [
    { label: "Instagram", href: siteConfig.follow.instagram, icon: siInstagram },
    { label: "Facebook", href: siteConfig.follow.facebook, icon: siFacebook },
  ];
  const others = [
    { label: "LinkedIn", href: siteConfig.social.linkedin, icon: null },
    { label: "GitHub", href: siteConfig.social.github, icon: siGithub },
  ];

  return (
    <>
      <PageHero title={t("title")} description={t("description")} />

      <Section tone="light" className="pt-16 sm:pt-20">
        <Container className="grid gap-5 lg:grid-cols-[1.5fr_1fr]">
          {/* WhatsApp is hidden for now (the number is not shown publicly).
          <section className="...">
            <h2>{t("whatsappTitle")}</h2>
            <p>{t("whatsappText")}</p>
            <p>{siteConfig.whatsapp.display}</p>
            <a href={whatsappUrl(t("whatsappMessage"))} target="_blank" rel="noopener noreferrer">
              {t("whatsappButton")}
              <span className="sr-only">{t("newTab")}</span>
            </a>
          </section> */}

          {siteConfig.email && (
            <Reveal
              as="section"
              className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#3b0a63_0%,#150821_70%)] p-8 text-white sm:p-12"
            >
              <MailIcon
                aria-hidden="true"
                className="size-10 text-[#c79bff]"
              />
              <h2 className="mt-6 font-display text-3xl font-semibold tracking-tight">
                {t("emailTitle")}
              </h2>
              <p className="mt-3 max-w-md text-white/75">{t("emailText")}</p>
              <p className="mt-8 font-display text-2xl font-semibold tracking-tight break-all text-[#c79bff] sm:text-3xl">
                {siteConfig.email}
              </p>
              <Button
                asChild
                size="lg"
                className="mt-8 h-auto min-h-12 bg-white py-3 text-center whitespace-normal text-[#150821] shadow-none hover:bg-white/90"
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
            </Reveal>
          )}

          <Reveal
            as="section"
            delay={120}
            className="rounded-[2rem] bg-[linear-gradient(155deg,#ece3f8_0%,#ffffff_75%)] p-8 sm:p-10 lg:self-start"
          >
            {[
              { title: t("followTitle"), links: follow },
              { title: t("otherTitle"), links: others },
            ].map(({ title, links }) => (
              <Fragment key={title}>
                <h2 className="font-display text-2xl font-semibold not-first:mt-10">
                  {title}
                </h2>
                <ul className="mt-6 grid gap-3">
                  {links.map(({ label, href, icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                      >
                        {icon ? (
                          <svg
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                            className="size-6 shrink-0"
                            fill={`#${icon.hex}`}
                          >
                            <path d={icon.path} />
                          </svg>
                        ) : (
                          <span
                            aria-hidden="true"
                            className="flex size-6 shrink-0 items-center justify-center rounded-md bg-[#0a66c2] text-xs font-bold text-white"
                          >
                            in
                          </span>
                        )}
                        <span className="flex-1 text-lg font-medium">{label}</span>
                        <ArrowUpRightIcon
                          aria-hidden="true"
                          className="size-4 text-brand-soft"
                        />
                        <span className="sr-only">{t("newTab")}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </Fragment>
            ))}
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
