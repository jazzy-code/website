import { ArrowLeftIcon, ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/site/container";
import { ProjectMedia } from "@/components/site/project-media";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getProject, getProjectSlugs } from "@/lib/projects";
import { localizedAlternates } from "@/lib/seo";

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

  return {
    title: found.project.name,
    // Without a confirmed summary the site-wide description is inherited.
    ...(found.project.summary && { description: found.project.summary }),
    alternates: localizedAlternates(locale, `/projects/${slug}`),
  };
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
  const { project, index, previous, next } = found;
  const { description, contributions, technologies, url, gallery } = project;
  const hasDetails = Boolean(
    description || contributions?.length || technologies?.length,
  );

  return (
    <Container className="py-12 sm:py-20">
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

      <div className="surface group mt-10 overflow-hidden">
        <ProjectMedia
          name={project.name}
          image={project.cover}
          sizes="(min-width: 1152px) 1104px, 100vw"
          priority
        />
      </div>

      <Reveal className="mt-12 grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          {description && (
            <p className="max-w-prose text-lg leading-relaxed text-pretty">
              {description}
            </p>
          )}
          {contributions && contributions.length > 0 && (
            <section aria-labelledby="contributions">
              <h2
                id="contributions"
                className="font-display text-2xl font-semibold"
              >
                {t("contributions")}
              </h2>
              <ul className="mt-4 grid gap-3 text-muted-foreground">
                {contributions.map((item) => (
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

        {(Boolean(technologies?.length) || Boolean(url)) && (
          <aside className="space-y-8">
            {technologies && technologies.length > 0 && (
              <section aria-labelledby="technologies">
                <h2
                  id="technologies"
                  className="font-display text-2xl font-semibold"
                >
                  {t("technologies")}
                </h2>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {url && (
              <Button asChild>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {t("visit")}
                  <ArrowUpRightIcon aria-hidden="true" />
                </a>
              </Button>
            )}
          </aside>
        )}
      </Reveal>

      {gallery.length > 0 && (
        <section aria-labelledby="gallery" className="mt-16">
          <h2 id="gallery" className="font-display text-2xl font-semibold">
            {t("gallery")}
          </h2>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2">
            {gallery.map((image) => (
              <Reveal as="li" key={image.src}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="h-auto w-full rounded-lg border border-border"
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
