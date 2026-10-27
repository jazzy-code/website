import { ArrowUpRightIcon, DownloadIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
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

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2
      id={id}
      className="font-display text-2xl font-semibold tracking-tight sm:text-3xl"
    >
      {children}
    </h2>
  );
}

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
    <Container className="py-16 sm:py-24">
      <header className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="mb-4 flex items-center gap-3 text-sm font-medium tracking-widest text-brand-soft uppercase">
            <span aria-hidden="true" className="h-px w-8 bg-brand-ring" />
            {t("eyebrow")}
          </p>
          <h1 className="font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-3 text-xl text-muted-foreground">
            {pick(profile.title, locale)}
          </p>
        </div>
        <div className="flex flex-col items-start gap-3">
          <div className="flex flex-wrap gap-3">
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
          </div>
          {locale !== siteConfig.cv.locale && (
            <p className="text-sm text-muted-foreground">{t("pdfNote")}</p>
          )}
        </div>
      </header>

      <div className="mt-16 grid gap-16">
        <Reveal as="section" aria-labelledby="about">
          <H2 id="about">{t("about")}</H2>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-pretty">
            {pick(profile.summary, locale)}
          </p>
        </Reveal>

        <section aria-labelledby="experience">
          <H2 id="experience">{t("experience")}</H2>
          <ol className="mt-8 border-l border-border">
            {experience.map((job) => (
              <Reveal as="li" key={job.id} className="relative pb-10 pl-6 last:pb-0 sm:pl-8">
                <span
                  aria-hidden="true"
                  className="absolute top-2 -left-[5px] size-2.5 rounded-full bg-brand-ring"
                />
                <p className="text-sm text-brand-soft tabular-nums">
                  {pick(job.period, locale)}
                </p>
                <h3 className="mt-1 font-display text-xl font-semibold">
                  {pick(job.role, locale)}
                </h3>
                <p className="text-muted-foreground">
                  {job.company} · {pick(job.location, locale)}
                </p>
                <ul className="mt-4 grid max-w-3xl gap-2 text-muted-foreground">
                  {pick(job.highlights, locale)?.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-px w-4 shrink-0 bg-brand-ring"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </ol>
        </section>

        <Reveal as="section" aria-labelledby="skills">
          <H2 id="skills">{t("skills")}</H2>
          <div className="mt-8">
            <SkillGroups locale={locale} />
          </div>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-2">
          <section aria-labelledby="education">
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
          <section aria-labelledby="languages">
            <H2 id="languages">{t("languages")}</H2>
            <ul className="mt-6 grid gap-4">
              {languages.map((item) => (
                <li key={item.name.en}>
                  <p className="font-display text-lg font-semibold">
                    {item.name[locale]}
                  </p>
                  <p className="text-muted-foreground">{item.level[locale]}</p>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <Reveal as="section" aria-labelledby="projects">
          <H2 id="projects">{t("projects")}</H2>
          <p className="mt-3 text-muted-foreground">
            {t("projectsDescription")}
          </p>
          <ul className="mt-6 border-t border-border">
            {projects.map((project) => (
              <li
                key={project.slug}
                className="grid gap-2 border-b border-border py-4 md:grid-cols-[1fr_2fr] md:gap-6"
              >
                <h3 className="font-display text-lg font-semibold">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="hover:text-brand-soft"
                  >
                    {project.name}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground">
                  {project.summary}
                </p>
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
      </div>
    </Container>
  );
}
