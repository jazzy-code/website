import { ArrowRightIcon } from "lucide-react";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactCta } from "@/components/site/contact-cta";
import { Container } from "@/components/site/container";
import { JsonLd } from "@/components/site/json-ld";
import { ProjectCard } from "@/components/site/project-card";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { services } from "@/content/services";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { pick } from "@/lib/localized";
import { getFeaturedProjects } from "@/lib/projects";
import { organizationJsonLd, websiteJsonLd } from "@/lib/structured-data";

const approachKeys = ["custom", "fullstack", "needs"] as const;

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const meta = await getTranslations("Metadata");
  const featured = getFeaturedProjects(locale);

  return (
    <>
      <JsonLd data={organizationJsonLd(locale, meta("description"))} />
      <JsonLd data={websiteJsonLd(locale)} />
      <Container className="pt-20 pb-16 sm:pt-32 sm:pb-24">
        <p className="mb-6 flex items-center gap-3 text-sm font-medium tracking-widest text-brand-soft uppercase">
          <span aria-hidden="true" className="h-px w-8 bg-brand-ring" />
          {t("eyebrow")}
        </p>
        <h1 className="font-display max-w-4xl text-5xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-7xl">
          {t("title")}
        </h1>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl">
          {t("description")}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link href="/contact">{t("contact")}</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/projects">{t("projects")}</Link>
          </Button>
        </div>
      </Container>

      <Container className="py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            index={1}
            eyebrow={t("servicesEyebrow")}
            title={t("servicesTitle")}
            description={t("servicesDescription")}
          />
          <ol className="mt-10 border-t border-border">
            {services.map((service, i) => (
              <li
                key={service.id}
                className="grid gap-2 border-b border-border py-5 md:grid-cols-[3rem_1fr_1.4fr] md:gap-6"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-sm text-brand-soft tabular-nums"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-xl font-semibold">
                  {pick(service.name, locale)}
                </h3>
                <p className="text-muted-foreground">
                  {pick(service.problem, locale)}
                </p>
              </li>
            ))}
          </ol>
          <Button asChild variant="link" className="mt-6 -ml-5">
            <Link href="/services">
              {t("servicesLink")}
              <ArrowRightIcon aria-hidden="true" />
            </Link>
          </Button>
        </Reveal>
      </Container>

      <Container className="py-16 sm:py-20">
        <SectionHeading
          index={2}
          eyebrow={t("projectsEyebrow")}
          title={t("projectsTitle")}
        />
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal as="li" key={project.slug} delay={i * 100}>
              <ProjectCard
                title={project.name}
                href={`/projects/${project.slug}`}
                summary={project.summary}
                image={project.cover}
                tags={project.technologies?.slice(0, 4)}
              />
            </Reveal>
          ))}
        </ul>
        <Button asChild variant="link" className="mt-6 -ml-5">
          <Link href="/projects">
            {t("projectsLink")}
            <ArrowRightIcon aria-hidden="true" />
          </Link>
        </Button>
      </Container>

      <Container className="py-16 sm:py-20">
        <Reveal>
          <SectionHeading
            index={3}
            eyebrow={t("approachEyebrow")}
            title={t("approachTitle")}
          />
          <ul className="mt-10 grid gap-8 md:grid-cols-3">
            {approachKeys.map((key) => (
              <li key={key} className="border-t border-brand-ring pt-5">
                <h3 className="font-display text-xl font-semibold">
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

      <ContactCta />
    </>
  );
}
