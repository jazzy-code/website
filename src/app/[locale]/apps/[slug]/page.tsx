import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { CSSProperties } from "react";
import {
  AppLogo,
  DeviceBadges,
  featureIcons,
  OpenAppButton,
  stageBackground,
} from "@/components/site/app-bits";
import { AppSteps } from "@/components/site/app-steps";
import { AppShowreel } from "@/components/site/app-showreel";
import { AppVideo } from "@/components/site/app-video";
import { Container } from "@/components/site/container";
import { JsonLd } from "@/components/site/json-ld";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { SpotlightCard } from "@/components/site/spotlight-card";
import { hasTechIcon, TechIcon } from "@/components/site/tech-icon";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getApp, getApps, getAppSlugs } from "@/lib/apps";
import { buildMetadata } from "@/lib/seo";
import {
  appJsonLd,
  breadcrumbJsonLd,
  videoJsonLd,
} from "@/lib/structured-data";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getAppSlugs().map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/apps/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const app = getApp(slug, locale);
  if (!app) return {};

  return buildMetadata(
    locale,
    `/apps/${slug}`,
    `${app.name}: ${app.tagline}`,
    app.summary,
  );
}

export default async function AppPage({
  params,
}: PageProps<"/[locale]/apps/[slug]">) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const app = getApp(slug, locale);
  if (!app) notFound();

  const t = await getTranslations("Apps");
  const nav = await getTranslations("Nav");
  const others = getApps(locale).filter((other) => other.slug !== slug);

  return (
    <>
      <JsonLd data={appJsonLd(locale, app)} />
      <JsonLd data={videoJsonLd(app)} />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: nav("home"), href: "/" },
            { name: nav("apps"), href: "/apps" },
            { name: app.name, href: `/apps/${slug}` },
          ],
          locale,
        )}
      />

      <Section
        className="overflow-hidden pt-10 pb-16 text-white sm:pt-14 sm:pb-24"
        style={stageBackground(app)}
      >
        <Container>
          <Link
            href="/apps"
            className="rise inline-flex items-center gap-2 text-sm text-white/75 transition-colors hover:text-white"
          >
            <ArrowLeftIcon aria-hidden="true" className="size-4" />
            {t("back")}
          </Link>
          <div className="mt-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div className="min-w-0">
              <div className="rise">
                <AppLogo app={app} className="size-20 rounded-3xl" />
              </div>
              <h1 className="rise-soft mt-6 font-display text-5xl leading-[1.02] font-semibold tracking-tight sm:text-7xl">
                {app.name}
              </h1>
              <p
                className="rise mt-4 font-display text-2xl text-balance"
                style={
                  { "--d": "120ms", color: app.theme.accent } as CSSProperties
                }
              >
                {app.tagline}
              </p>
              <p
                className="rise mt-5 max-w-lg text-lg text-white/75"
                style={{ "--d": "200ms" } as CSSProperties}
              >
                {app.summary}
              </p>
              <div
                className="rise mt-8"
                style={{ "--d": "280ms" } as CSSProperties}
              >
                <OpenAppButton app={app} />
                <DeviceBadges className="mt-6" />
              </div>
            </div>
            <div
              className="rise min-w-0"
              style={{ "--d": "200ms" } as CSSProperties}
            >
              <AppShowreel app={app} priority />
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_auto] md:gap-20">
          <Reveal>
            <SectionHeading
              title={t("watchTitle")}
              description={t("watchText", { name: app.name })}
            />
          </Reveal>
          <Reveal delay={120}>
            <AppVideo
              video={app.video}
              locale={locale}
              playLabel={t("play", {
                name: app.name,
                duration: app.video.duration,
              })}
              label={t("videoLabel", { name: app.name })}
              subtitleLabels={{ en: t("subtitlesEn"), es: t("subtitlesEs") }}
              className="md:w-[20rem]"
            />
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading title={t("howTitle")} />
          <div className="mt-12 lg:mt-4">
            <AppSteps steps={app.steps} accent={app.theme.accent} />
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container>
          <Reveal>
            <SectionHeading title={t("featuresTitle")} />
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {app.features.map((feature, i) => {
              const Icon = featureIcons[feature.icon];
              return (
                <Reveal as="li" key={feature.title} delay={(i % 3) * 90}>
                  <SpotlightCard
                    glow={`${app.theme.accent}40`}
                    className="h-full rounded-3xl bg-[linear-gradient(135deg,#241436_0%,#100b18_70%)] p-7 text-white transition-transform duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-8"
                      style={{ color: app.theme.accent }}
                    />
                    <h3 className="mt-6 font-display text-xl font-semibold">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-white/75">{feature.text}</p>
                  </SpotlightCard>
                </Reveal>
              );
            })}
          </ul>

          <h2 className="mt-16 text-sm font-semibold tracking-widest text-muted-foreground uppercase">
            {t("technologies")}
          </h2>
          <ul className="mt-5 flex flex-wrap gap-3">
            {app.technologies.map((name) => (
              <li
                key={name}
                className="flex items-center gap-2.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium"
              >
                {hasTechIcon(name) && (
                  <TechIcon name={name} className="size-4" />
                )}
                {name}
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal
            variant="scale"
            className="flex flex-col items-center rounded-[2.5rem] border border-white/10 px-6 py-16 text-center text-white sm:py-20"
            style={stageBackground(app)}
          >
            <AppLogo app={app} className="float size-24 rounded-[1.75rem]" />
            <h2 className="mt-8 font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {t("ctaTitle", { name: app.name })}
            </h2>
            <p className="mt-3 mb-8 text-lg text-white/75">{t("ctaText")}</p>
            <OpenAppButton app={app} />
          </Reveal>

          {others.length > 0 && (
            <nav aria-label={t("more")} className="mt-12">
              <h2 className="font-display text-2xl font-semibold">
                {t("more")}
              </h2>
              <ul className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                {others.map((other) => (
                  <li key={other.slug}>
                    <Link
                      href={`/apps/${other.slug}`}
                      className="surface surface-interactive flex items-center gap-5 p-5"
                    >
                      <AppLogo app={other} />
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-lg font-semibold">
                          {t("moreLink", { name: other.name })}
                        </span>
                        <span className="block text-sm text-muted-foreground">
                          {other.tagline}
                        </span>
                      </span>
                      <ArrowRightIcon
                        aria-hidden="true"
                        className="size-5 shrink-0 text-brand-soft"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </Container>
      </Section>
    </>
  );
}
