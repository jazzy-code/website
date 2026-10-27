import { ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ContactCta } from "@/components/site/contact-cta";
import { Container } from "@/components/site/container";
import { JsonLd } from "@/components/site/json-ld";
import { Reveal } from "@/components/site/reveal";
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
      <Container className="py-16 sm:py-24">
        <SectionHeading
          as="h1"
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <section
          aria-labelledby="founder"
          className="surface mt-12 grid gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_1.6fr]"
        >
          <div>
            <p className="text-sm font-medium tracking-widest text-brand-soft uppercase">
              {t("founderEyebrow")}
            </p>
            <h2
              id="founder"
              className="mt-3 font-display text-3xl font-semibold tracking-tight"
            >
              {profile.name}
            </h2>
            <p className="mt-2 text-muted-foreground">
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
            <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
              <li>
                <Button asChild>
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

      <Container className="py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            as="h2"
            index={1}
            title={t("stackTitle")}
            description={t("stackDescription")}
          />
          <div className="mt-10">
            <SkillGroups locale={locale} />
          </div>
        </Reveal>
      </Container>

      <Container className="py-12 sm:py-16">
        <Reveal>
          <SectionHeading
            as="h2"
            index={2}
            title={t("solutionsTitle")}
            description={t("solutionsDescription")}
          />
          <ul className="mt-10 border-t border-border">
            {projects.map((project) => (
              <li
                key={project.slug}
                className="grid gap-2 border-b border-border py-5 md:grid-cols-[1fr_2fr] md:gap-6"
              >
                <h3 className="font-display text-xl font-semibold">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-brand-soft"
                  >
                    {project.name}
                  </Link>
                </h3>
                <p className="text-muted-foreground">{project.summary}</p>
              </li>
            ))}
          </ul>
          <Button asChild variant="link" className="mt-6 -ml-5">
            <Link href="/projects">{t("allProjects")}</Link>
          </Button>
        </Reveal>
      </Container>

      <ContactCta />
    </>
  );
}
