import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  CheckIcon,
} from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { CSSProperties } from "react";
import { ContactCta } from "@/components/site/contact-cta";
import { Container } from "@/components/site/container";
import { JsonLd } from "@/components/site/json-ld";
import { PageHero } from "@/components/site/page-hero";
import { ProjectMedia } from "@/components/site/project-media";
import { Reveal } from "@/components/site/reveal";
import { Screenshot } from "@/components/site/screenshot";
import { Section } from "@/components/site/section";
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

const lilacCard = "bg-[linear-gradient(155deg,#ece3f8_0%,#ffffff_75%)]";

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
  const { project, previous, next } = found;
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
    <>
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

      <PageHero
        title={project.name}
        description={project.summary}
        top={
          <Button asChild variant="ghost" size="sm">
            <Link href="/projects">
              <ArrowLeftIcon aria-hidden="true" />
              {t("back")}
            </Link>
          </Button>
        }
        className="pb-10 sm:pb-12"
      >
        {links.map(({ href, label }, i) => (
          <Button
            key={href}
            asChild
            size="lg"
            variant={i === 0 ? "default" : "outline"}
          >
            <a href={href} target="_blank" rel="noopener noreferrer">
              {label ?? t("visit")}
              <ArrowUpRightIcon aria-hidden="true" />
              <span className="sr-only">{t("newTab")}</span>
            </a>
          </Button>
        ))}
      </PageHero>

      <Section className="pt-0 pb-16 sm:pt-0 sm:pb-24">
        <Container>
          <div className="rise" style={{ "--d": "400ms" } as CSSProperties}>
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
        </Container>
      </Section>

      {hasDetails ? (
        <Section tone="light">
          <Container className="grid gap-14 lg:grid-cols-[1.6fr_1fr]">
            <Reveal className="space-y-12">
              {description && (
                <p className="max-w-prose text-xl leading-relaxed text-pretty">
                  {description}
                </p>
              )}
              {metrics.length > 0 && (
                <section aria-labelledby="reach">
                  <h2
                    id="reach"
                    className="font-display text-2xl font-semibold"
                  >
                    {t("reach")}
                  </h2>
                  <dl className="mt-5 grid gap-4 sm:grid-cols-2">
                    {metrics.map(({ value, label }) => (
                      <div
                        key={label}
                        className="flex flex-col-reverse rounded-3xl bg-[linear-gradient(135deg,#3b0a63_0%,#150821_75%)] p-6 text-white"
                      >
                        <dt className="mt-2 text-white/75">{label}</dt>
                        <dd className="font-display text-5xl font-semibold text-[#c79bff]">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </section>
              )}
              {features && features.length > 0 && (
                <section aria-labelledby="features">
                  <h2
                    id="features"
                    className="font-display text-2xl font-semibold"
                  >
                    {t("features")}
                  </h2>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {features.map((item) => (
                      <li
                        key={item}
                        className={`flex gap-3 rounded-2xl p-4 text-sm leading-relaxed ${lilacCard}`}
                      >
                        <CheckIcon
                          aria-hidden="true"
                          className="mt-0.5 size-4 shrink-0 text-brand-soft"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </Reveal>

            {(Boolean(technologies?.length) ||
              Boolean(infrastructure?.length)) && (
              <Reveal as="aside" className="space-y-10 lg:self-start">
                {technologies && technologies.length > 0 && (
                  <TagSection
                    id="technologies"
                    title={t("technologies")}
                    items={technologies}
                    icons
                  />
                )}
                {infrastructure && infrastructure.length > 0 && (
                  <TagSection
                    id="infrastructure"
                    title={t("infrastructure")}
                    items={infrastructure}
                    icons
                  />
                )}
              </Reveal>
            )}
          </Container>
        </Section>
      ) : (
        <Section className="pt-0 sm:pt-0">
          <Container>
            <p className="surface px-5 py-4 text-muted-foreground">
              {t("pendingNotice")}
            </p>
          </Container>
        </Section>
      )}

      {gallery.length > 0 && (
        <Section>
          <Container>
            <h2
              id="gallery"
              className="font-display text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {t("gallery")}
            </h2>
            <ul
              aria-labelledby="gallery"
              className="mt-10 grid items-start gap-x-8 gap-y-16 md:grid-cols-2"
            >
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
          </Container>
        </Section>
      )}

      {previous && next && (
        <Section tone="light" className="py-14 sm:py-16">
          <Container>
            <nav
              aria-label={t("navLabel")}
              className="grid gap-4 sm:grid-cols-2"
            >
              <Link
                href={`/projects/${previous.slug}`}
                className={`flex flex-col gap-1 rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${lilacCard}`}
              >
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ArrowLeftIcon className="size-4" aria-hidden="true" />
                  {t("previous")}
                </span>
                <span className="font-display text-xl font-semibold">
                  {previous.name}
                </span>
              </Link>
              <Link
                href={`/projects/${next.slug}`}
                className={`flex flex-col gap-1 rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:items-end sm:text-right ${lilacCard}`}
              >
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  {t("next")}
                  <ArrowRightIcon className="size-4" aria-hidden="true" />
                </span>
                <span className="font-display text-xl font-semibold">
                  {next.name}
                </span>
              </Link>
            </nav>
          </Container>
        </Section>
      )}

      <ContactCta />
    </>
  );
}
