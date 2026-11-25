import { ArrowRightIcon, LayersIcon, PuzzleIcon, TargetIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ClientMapSection } from "@/components/site/client-map-section";
import { ClientsStrip } from "@/components/site/clients-strip";
import { ContactCta } from "@/components/site/contact-cta";
import { Container } from "@/components/site/container";
import { DeviceShowcase } from "@/components/site/device-showcase";
import { HeroCarousel } from "@/components/site/hero-carousel";
import { JsonLd } from "@/components/site/json-ld";
import { ProjectBanner } from "@/components/site/project-banner";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { ServicesGrid } from "@/components/site/services-grid";
import { TechMarquee } from "@/components/site/tech-marquee";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  getAllTechnologies,
  getDeviceScreens,
  getFeaturedProjects,
  getShowcaseScreens,
} from "@/lib/projects";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";

const approach = [
  { key: "custom", Icon: PuzzleIcon },
  { key: "fullstack", Icon: LayersIcon },
  { key: "needs", Icon: TargetIcon },
] as const;

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const meta = await getTranslations("Metadata");
  const featured = getFeaturedProjects(locale);
  const deviceScreens = getDeviceScreens(locale);
  const showcase = getShowcaseScreens(locale);
  const technologies = getAllTechnologies();

  return (
    <>
      <JsonLd data={organizationJsonLd(locale, meta("description"))} />
      <JsonLd data={websiteJsonLd(locale)} />

      <Section className="overflow-hidden pt-16 pb-0 sm:pt-24 sm:pb-0">
        <Container className="text-center">
          <h1
            className="rise-soft font-display mx-auto max-w-5xl text-5xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl"
            style={{ "--d": "100ms" } as CSSProperties}
          >
            {t("title")}
          </h1>
          <p
            className="rise mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl"
            style={{ "--d": "250ms" } as CSSProperties}
          >
            {t("description")}
          </p>
          <div
            className="rise mt-10 flex flex-wrap justify-center gap-3"
            style={{ "--d": "350ms" } as CSSProperties}
          >
            <Button asChild size="lg">
              <Link href="/contact">{t("contact")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/projects">{t("projects")}</Link>
            </Button>
          </div>
        </Container>
        <HeroCarousel items={showcase} />
        <Container>
          <ClientsStrip />
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <Reveal>
            <SectionHeading
              title={t("servicesTitle")}
              description={t("servicesDescription")}
            />
          </Reveal>
          <div className="mt-12">
            <ServicesGrid locale={locale} />
          </div>
          <Button asChild variant="link" className="mt-8 -ml-4 sm:-ml-5">
            <Link href="/services">
              {t("servicesLink")}
              <ArrowRightIcon aria-hidden="true" />
            </Link>
          </Button>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title={t("projectsTitle")} />
          <ul className="mt-12 grid grid-cols-1 gap-8">
            {featured.map((project, i) => (
              <Reveal as="li" key={project.slug} variant="scale">
                <ProjectBanner
                  project={project}
                  reverse={i % 2 === 1}
                  cta={t("viewProject")}
                />
              </Reveal>
            ))}
          </ul>
          <Button asChild variant="link" className="mt-8 -ml-4 sm:-ml-5">
            <Link href="/projects">
              {t("projectsLink")}
              <ArrowRightIcon aria-hidden="true" />
            </Link>
          </Button>
        </Container>
      </Section>

      {technologies.length > 0 && (
        <Section tone="light" className="overflow-hidden">
          <Container>
            <Reveal>
              <SectionHeading
                className="mx-auto text-center"
                title={t("techTitle")}
                description={t("techDescription")}
              />
            </Reveal>
          </Container>
          <div className="mt-12">
            <TechMarquee items={technologies} />
          </div>
        </Section>
      )}

      <ClientMapSection locale={locale} />

      {deviceScreens.length > 0 && (
        <Section tone="light" className="overflow-hidden">
          <Container>
            <Reveal>
              <DeviceShowcase items={deviceScreens}>
                <SectionHeading
                  title={t("devicesTitle")}
                  description={t("devicesDescription")}
                />
              </DeviceShowcase>
            </Reveal>
          </Container>
        </Section>
      )}

      <Section>
        <Container>
          <Reveal>
            <SectionHeading title={t("approachTitle")} />
            <ul className="mt-12 grid gap-6 md:grid-cols-3">
              {approach.map(({ key, Icon }) => (
                <li key={key} className="surface p-7">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-brand/40 text-brand-soft">
                    <Icon aria-hidden="true" className="size-6" />
                  </span>
                  <h3 className="font-display mt-6 text-xl font-semibold">
                    {t(`approach.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-muted-foreground">
                    {t(`approach.${key}.text`)}
                  </p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* Reviews are hidden until there are real ones: import ReviewsSection
          from "@/components/site/reviews-section" and render it here. */}

      <ContactCta />
    </>
  );
}
