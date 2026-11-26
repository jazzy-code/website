import { ArrowDownIcon, ArrowRightIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { CSSProperties } from "react";
import {
  AppLogo,
  DeviceBadges,
  OpenAppButton,
  stageBackground,
} from "@/components/site/app-bits";
import { AppShowreel } from "@/components/site/app-showreel";
import { AppVideo } from "@/components/site/app-video";
import { ContactCta } from "@/components/site/contact-cta";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getApps } from "@/lib/apps";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/apps">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "Apps", "/apps");
}

export default async function AppsPage({
  params,
}: PageProps<"/[locale]/apps">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Apps");
  const apps = getApps(locale);

  return (
    <>
      <Section className="relative isolate overflow-hidden pt-16 pb-12 sm:pt-24 sm:pb-16">
        {/* Slow aurora in the colors of the apps. */}
        <div aria-hidden="true" className="absolute inset-0 -z-10">
          <span className="aurora absolute -top-40 left-[8%] size-[28rem] rounded-full bg-[#7c3aed]/40 blur-3xl" />
          <span className="aurora aurora-slow absolute top-10 right-[4%] size-[22rem] rounded-full bg-[#1b7fb5]/35 blur-3xl" />
          <span className="aurora absolute -bottom-32 left-[42%] size-[18rem] rounded-full bg-[#b45309]/25 blur-3xl" />
        </div>
        <Container className="text-center">
          <p className="rise inline-block rounded-full border border-brand-ring/60 bg-white/5 px-4 py-1.5 text-sm text-brand-soft">
            {t("eyebrow")}
          </p>
          <h1
            className="rise-soft mx-auto mt-7 max-w-4xl font-display text-5xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-7xl"
            style={{ "--d": "60ms" } as CSSProperties}
          >
            {t("titleStart")}{" "}
            <span className="shimmer">{t("titleHighlight")}</span>
          </h1>
          <p
            className="rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl"
            style={{ "--d": "200ms" } as CSSProperties}
          >
            {t("description")}
          </p>

          {/* Dock: one icon per app, jumping to its stage. */}
          <ul
            className="rise mt-12 flex flex-wrap justify-center gap-6"
            style={{ "--d": "320ms" } as CSSProperties}
          >
            {apps.map((app, i) => (
              <li key={app.slug}>
                <a
                  href={`#${app.slug}`}
                  className="group flex flex-col items-center gap-3 rounded-2xl p-2"
                >
                  <span
                    className="float"
                    style={{ animationDelay: `${i * -3.5}s` }}
                  >
                    <AppLogo
                      app={app}
                      className="size-24 rounded-[1.75rem] transition-transform duration-300 group-hover:scale-110"
                    />
                  </span>
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    {app.name}
                    <ArrowDownIcon
                      aria-hidden="true"
                      className="size-3.5 text-brand-soft"
                    />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section className="pt-4 sm:pt-4">
        <Container className="grid grid-cols-1 gap-10">
          {apps.map((app, i) => (
            <Reveal
              as="article"
              variant="scale"
              key={app.slug}
              id={app.slug}
              className="overflow-hidden rounded-[2.5rem] border border-white/10 text-white"
              style={stageBackground(app)}
            >
              <div className="grid grid-cols-1 items-center gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:p-14">
                <div className={i % 2 === 1 ? "min-w-0 lg:order-2" : "min-w-0"}>
                  <AppLogo app={app} />
                  <h2 className="mt-6 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
                    {app.name}
                  </h2>
                  <p
                    className="mt-3 font-display text-xl"
                    style={{ color: app.theme.accent }}
                  >
                    {app.tagline}
                  </p>
                  <p className="mt-4 max-w-lg text-lg text-white/75">
                    {app.summary}
                  </p>
                  <DeviceBadges className="mt-6" />
                  <div className="mt-8 flex flex-wrap gap-3">
                    <OpenAppButton app={app} />
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="border-white/25 text-white hover:border-white/60 hover:bg-white/10"
                    >
                      <Link href={`/apps/${app.slug}`}>
                        {t("howLink")}
                        <span className="sr-only"> — {app.name}</span>
                        <ArrowRightIcon aria-hidden="true" />
                      </Link>
                    </Button>
                  </div>
                </div>
                <div className="drift min-w-0">
                  <AppShowreel app={app} />
                </div>
              </div>

              <div className="grid grid-cols-1 items-center gap-8 border-t border-white/10 bg-black/25 p-6 sm:p-10 md:grid-cols-[1fr_auto] lg:px-14">
                <div>
                  <h3 className="font-display text-3xl font-semibold tracking-tight">
                    {t("watchTitle")}
                  </h3>
                  <p className="mt-3 max-w-md text-white/75">
                    {t("watchText", { name: app.name })}
                  </p>
                  <Image
                    src={app.logo.src}
                    alt=""
                    width={app.logo.width}
                    height={app.logo.height}
                    sizes="10rem"
                    className="float mt-8 hidden w-32 md:block"
                  />
                </div>
                <AppVideo
                  video={app.video}
                  locale={locale}
                  playLabel={t("play", {
                    name: app.name,
                    duration: app.video.duration,
                  })}
                  label={t("videoLabel", { name: app.name })}
                  subtitleLabels={{
                    en: t("subtitlesEn"),
                    es: t("subtitlesEs"),
                  }}
                  className="md:w-[18rem]"
                />
              </div>
            </Reveal>
          ))}
        </Container>
      </Section>
      <ContactCta />
    </>
  );
}
