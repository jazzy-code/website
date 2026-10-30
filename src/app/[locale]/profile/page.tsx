import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactCta } from "@/components/site/contact-cta";
import { Container } from "@/components/site/container";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { SkillGroups } from "@/components/site/skill-groups";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { profile } from "@/content/profile";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { pick } from "@/lib/localized";
import { getProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";
import { personJsonLd } from "@/lib/structured-data";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/profile">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "Profile", "/profile");
}

export default async function ProfilePage({
  params,
}: PageProps<"/[locale]/profile">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Profile");
  const cv = await getTranslations("CV");
  const projects = getProjects(locale);

  const profiles = [
    { label: "LinkedIn", href: siteConfig.social.linkedin },
    { label: "GitHub", href: siteConfig.social.github },
  ];

  return (
    <>
      <JsonLd data={personJsonLd(locale)} />
      <PageHero title={t("title")} description={t("description")} />

      <Section className="pt-0 sm:pt-0">
        <Container>
          <section
            aria-labelledby="founder"
            className="relative grid gap-8 overflow-hidden rounded-[2rem] bg-[radial-gradient(50rem_24rem_at_100%_0%,color-mix(in_oklab,var(--brand)_70%,transparent),transparent_70%),var(--card)] p-8 sm:p-12 lg:grid-cols-[1fr_1.6fr] lg:gap-14"
          >
            <div>
              <h2
                id="founder"
                className="font-display text-4xl font-semibold tracking-tight"
              >
                {profile.name}
              </h2>
              <p className="mt-3 text-lg text-brand-soft">
                {pick(profile.title, locale)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("founderRole")}
              </p>
            </div>
            <div>
              <p className="text-lg leading-relaxed text-pretty">
                {pick(profile.summary, locale)}
              </p>
              <ul className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
                <li>
                  <Button asChild size="lg">
                    <Link href="/cv">{t("viewCv")}</Link>
                  </Button>
                </li>
                {profiles.map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-brand-soft underline-offset-4 hover:underline"
                    >
                      {label}
                      <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                      <span className="sr-only">{cv("newTab")}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <Reveal>
            <SectionHeading
              title={t("stackTitle")}
              description={t("stackDescription")}
            />
            <div className="mt-12">
              <SkillGroups locale={locale} />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal>
            <SectionHeading
              title={t("solutionsTitle")}
              description={t("solutionsDescription")}
            />
            <ul className="mt-12 grid gap-3">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group grid items-center gap-2 rounded-3xl bg-card p-6 transition-colors duration-300 hover:bg-secondary md:grid-cols-[1fr_2fr_auto] md:gap-8"
                  >
                    <h3 className="font-display text-xl font-semibold">
                      {project.name}
                    </h3>
                    <p className="text-muted-foreground">{project.summary}</p>
                    <ArrowRightIcon
                      aria-hidden="true"
                      className="hidden size-5 text-brand-soft transition-transform duration-300 group-hover:translate-x-1 md:block"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <Button asChild variant="link" className="mt-6 -ml-5">
              <Link href="/projects">{t("allProjects")}</Link>
            </Button>
          </Reveal>
        </Container>
      </Section>

      <ContactCta />
    </>
  );
}
