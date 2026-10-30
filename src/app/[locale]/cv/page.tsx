import { ArrowRightIcon, ArrowUpRightIcon, DownloadIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { Container } from "@/components/site/container";
import { PageHero } from "@/components/site/page-hero";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { SkillGroups } from "@/components/site/skill-groups";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import {
  education,
  experience,
  languages,
  profile,
} from "@/content/profile";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { pick } from "@/lib/localized";
import { getProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/cv">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "CV", "/cv");
}

function H2({ id, children }: { id: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
    >
      {children}
    </h2>
  );
}

const card = "rounded-3xl bg-[linear-gradient(155deg,#ece3f8_0%,#ffffff_75%)] p-6 sm:p-8";

export default async function CvPage({ params }: PageProps<"/[locale]/cv">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("CV");
  const projects = getProjects(locale);

  const profiles = [
    { label: "LinkedIn", href: siteConfig.social.linkedin },
    { label: "GitHub", href: siteConfig.social.github },
  ];

  return (
    <>
      <PageHero title={profile.name} description={pick(profile.title, locale)}>
        <Button asChild size="lg">
          <a href={siteConfig.cv.href} download>
            <DownloadIcon aria-hidden="true" />
            {t("download")}
          </a>
        </Button>
        <Button asChild size="lg" variant="outline">
          <a
            href={siteConfig.cv.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("view")}
            <span className="sr-only">{t("newTab")}</span>
          </a>
        </Button>
        {locale !== siteConfig.cv.locale && (
          <p className="w-full text-sm text-muted-foreground">
            {t("pdfNote")}
          </p>
        )}
      </PageHero>

      <Section tone="light">
        <Container className="grid gap-20">
          <Reveal as="section" aria-labelledby="about">
            <H2 id="about">{t("about")}</H2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-pretty">
              {pick(profile.summary, locale)}
            </p>
          </Reveal>

          <section aria-labelledby="experience">
            <H2 id="experience">{t("experience")}</H2>
            <ol className="mt-10 grid gap-5">
              {experience.map((job) => (
                <Reveal as="li" key={job.id}>
                  <article className={`grid gap-5 ${card} md:grid-cols-[14rem_1fr]`}>
                    <div>
                      <p className="text-sm font-medium text-brand-soft tabular-nums">
                        {pick(job.period, locale)}
                      </p>
                      <h3 className="mt-2 font-display text-xl font-semibold">
                        {pick(job.role, locale)}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {job.company} · {pick(job.location, locale)}
                      </p>
                    </div>
                    <ul className="grid gap-2.5 text-muted-foreground">
                      {pick(job.highlights, locale)?.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span
                            aria-hidden="true"
                            className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-ring"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </article>
                </Reveal>
              ))}
            </ol>
          </section>

          <Reveal as="section" aria-labelledby="skills">
            <H2 id="skills">{t("skills")}</H2>
            <div className="mt-10">
              <SkillGroups locale={locale} />
            </div>
          </Reveal>

          <div className="grid gap-5 md:grid-cols-2">
            <section aria-labelledby="education" className={card}>
              <H2 id="education">{t("education")}</H2>
              <ul className="mt-6 grid gap-4">
                {education.map((item) => (
                  <li key={item.school}>
                    <p className="font-display text-lg font-semibold">
                      {item.school}
                    </p>
                    <p className="text-muted-foreground">
                      {item.degree[locale]} · {item.period}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="languages" className={card}>
              <H2 id="languages">{t("languages")}</H2>
              <ul className="mt-6 grid gap-4">
                {languages.map((item) => (
                  <li key={item.name.en}>
                    <p className="font-display text-lg font-semibold">
                      {item.name[locale]}
                    </p>
                    <p className="text-muted-foreground">
                      {item.level[locale]}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </Container>
      </Section>

      <Section>
        <Container className="grid gap-16">
          <Reveal as="section" aria-labelledby="projects">
            <H2 id="projects">{t("projects")}</H2>
            <p className="mt-3 text-muted-foreground">
              {t("projectsDescription")}
            </p>
            <ul className="mt-8 grid gap-3">
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group grid items-center gap-2 rounded-3xl bg-card p-5 transition-colors duration-300 hover:bg-secondary md:grid-cols-[1fr_2fr_auto] md:gap-8"
                  >
                    <h3 className="font-display text-lg font-semibold">
                      {project.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {project.summary}
                    </p>
                    <ArrowRightIcon
                      aria-hidden="true"
                      className="hidden size-5 text-brand-soft transition-transform duration-300 group-hover:translate-x-1 md:block"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>

          <section aria-labelledby="links">
            <H2 id="links">{t("links")}</H2>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {profiles.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-lg text-brand-soft underline-offset-4 hover:underline"
                  >
                    {label}
                    <ArrowUpRightIcon className="size-4" aria-hidden="true" />
                    <span className="sr-only">{t("newTab")}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </Container>
      </Section>
    </>
  );
}
