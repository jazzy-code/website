import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/site/container";
import { JsonLd } from "@/components/site/json-ld";
import { ProjectMedia } from "@/components/site/project-media";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Screenshot } from "@/components/site/screenshot";
import { TagSection } from "@/components/site/tag-section";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getProject, getProjectSlugs } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getProjectSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const found = getProject(slug, locale);
  if (!found) return {};

  return buildMetadata(
    locale,
    `/projects/${slug}`,
    found.project.name,
    found.project.summary,
  );
}

export default async function ProjectPage({
  params,
}: PageProps<"/[locale]/projects/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const found = getProject(slug, locale);
  if (!found) notFound();

  const t = await getTranslations("Projects");
  const nav = await getTranslations("Nav");
  const { project, index, previous, next } = found;
  const {
    description,
    features,
    metrics,
    technologies,
    infrastructure,
    links,
    screens,
  } = project;
  // The first screen is the cover; the rest form the gallery.
  const [cover, ...gallery] = screens;
  const hasDetails = Boolean(
    description ||
      features?.length ||
      metrics.length ||
      technologies?.length ||
      infrastructure?.length,
  );

  return (
    <Container className="py-12 sm:py-20">
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: nav("home"), href: "/" },
            { name: nav("projects"), href: "/projects" },
            { name: project.name, href: `/projects/${project.slug}` },
          ],
          locale,
        )}
      />
      <Button asChild variant="link" size="sm" className="-ml-4 mb-6">
        <Link href="/projects">
          <ArrowLeftIcon aria-hidden="true" />
          {t("back")}
        </Link>
      </Button>

      <SectionHeading
        as="h1"
        index={index + 1}
        eyebrow={t("detailEyebrow")}
        title={project.name}
        description={project.summary}
      />

      <div className="mt-10">
        {cover ? (
          <Screenshot
            screen={cover}
            sizes="(min-width: 1152px) 1104px, 100vw"
            priority
          />
        ) : (
          <div className="surface overflow-hidden">
            <ProjectMedia name={project.name} sizes="100vw" />
          </div>
        )}
      </div>

      <Reveal className="mt-12 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          {description && (
            <p className="max-w-prose text-lg leading-relaxed text-pretty">
              {description}
            </p>
          )}
          {metrics.length > 0 && (
            <section aria-labelledby="reach">
              <h2 id="reach" className="font-display text-2xl font-semibold">
                {t("reach")}
              </h2>
              <dl className="mt-4 flex flex-wrap gap-4">
                {metrics.map(({ value, label }) => (
                  <div key={label} className="surface px-6 py-4">
                    <dt className="text-sm text-muted-foreground">{label}</dt>
                    <dd className="font-display text-4xl font-semibold text-brand-soft">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}
          {features && features.length > 0 && (
            <section aria-labelledby="features">
              <h2 id="features" className="font-display text-2xl font-semibold">
                {t("features")}
              </h2>
              <ul className="mt-4 grid gap-3 text-muted-foreground">
                {features.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2.5 h-px w-5 shrink-0 bg-brand-ring"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          )}
          {!hasDetails && (
            <p className="surface px-5 py-4 text-muted-foreground">
              {t("pendingNotice")}
            </p>
          )}
        </div>

        {(Boolean(technologies?.length) ||
          Boolean(infrastructure?.length) ||
          links.length > 0) && (
          <aside className="space-y-8">
            {technologies && technologies.length > 0 && (
              <TagSection
                id="technologies"
                title={t("technologies")}
                items={technologies}
              />
            )}
            {infrastructure && infrastructure.length > 0 && (
              <TagSection
                id="infrastructure"
                title={t("infrastructure")}
                items={infrastructure}
              />
            )}
            {links.length > 0 && (
              <ul className="flex flex-wrap gap-3">
                {links.map(({ href, label }, i) => (
                  <li key={href}>
                    <Button asChild variant={i === 0 ? "default" : "outline"}>
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {label ?? t("visit")}
                        <ArrowUpRightIcon aria-hidden="true" />
                        <span className="sr-only">{t("newTab")}</span>
                      </a>
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </aside>
        )}
      </Reveal>

      {gallery.length > 0 && (
        <section aria-labelledby="gallery" className="mt-16">
          <h2 id="gallery" className="font-display text-2xl font-semibold">
            {t("gallery")}
          </h2>
          <ul className="mt-6 grid items-start gap-x-6 gap-y-10 md:grid-cols-2">
            {gallery.map((screen) => (
              <Reveal as="li" key={screen.desktop.src}>
                <Screenshot
                  screen={screen}
                  sizes="(min-width: 1152px) 540px, (min-width: 768px) 45vw, 100vw"
                  compact
                />
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      {previous && next && (
        <nav
          aria-label={t("navLabel")}
          className="mt-20 grid gap-4 border-t border-border pt-8 sm:grid-cols-2"
        >
          <Link
            href={`/projects/${previous.slug}`}
            className="group flex flex-col gap-1"
          >
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <ArrowLeftIcon className="size-4" aria-hidden="true" />
              {t("previous")}
            </span>
            <span className="font-display text-xl font-semibold group-hover:text-brand-soft">
              {previous.name}
            </span>
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="group flex flex-col gap-1 sm:items-end sm:text-right"
          >
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              {t("next")}
              <ArrowRightIcon className="size-4" aria-hidden="true" />
            </span>
            <span className="font-display text-xl font-semibold group-hover:text-brand-soft">
              {next.name}
            </span>
          </Link>
        </nav>
      )}
    </Container>
  );
}
