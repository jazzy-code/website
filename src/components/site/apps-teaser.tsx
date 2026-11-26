import { ArrowRightIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { AppFrame } from "@/components/site/app-devices";
import { AppLogo, stageBackground } from "@/components/site/app-bits";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { getApps } from "@/lib/apps";
import { cn } from "@/lib/utils";

/**
 * Home page "Our products": one large banner per app, like the selected
 * projects but in each app's own colors. The whole banner is one link.
 */
export async function AppsTeaser({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: "Apps" });
  const home = await getTranslations({ locale, namespace: "Home" });
  const apps = getApps(locale);

  return (
    <Section>
      <Container>
        <Reveal>
          <SectionHeading
            title={t("teaserTitle")}
            description={t("teaserText")}
          />
        </Reveal>
        <ul className="mt-12 grid grid-cols-1 gap-8">
          {apps.map((app, i) => (
            <Reveal as="li" key={app.slug} variant="scale">
              <article
                className={cn(
                  "group relative isolate grid grid-cols-1 overflow-hidden rounded-[2rem] border border-white/10 text-white transition-colors duration-500 hover:border-white/30",
                  i % 2 === 1
                    ? "lg:grid-cols-[1.2fr_0.8fr]"
                    : "lg:grid-cols-[0.8fr_1.2fr]",
                )}
                style={stageBackground(app)}
              >
                <div
                  className={cn(
                    "flex min-w-0 flex-col items-start justify-center gap-4 p-6 sm:p-10 lg:p-12",
                    i % 2 === 1 && "lg:order-2",
                  )}
                >
                  <AppLogo app={app} />
                  <h3 className="font-display text-3xl leading-tight font-semibold tracking-tight sm:text-4xl">
                    <Link
                      href={`/apps/${app.slug}`}
                      className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-offset-4"
                    >
                      {app.name}
                    </Link>
                  </h3>
                  <p
                    className="font-display text-lg"
                    style={{ color: app.theme.accent }}
                  >
                    {app.tagline}
                  </p>
                  <p className="max-w-md leading-relaxed text-white/75">
                    {app.summary}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-flex items-center gap-2 text-sm font-medium"
                    style={{ color: app.theme.accent }}
                  >
                    {home("viewApp")}
                    <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>

                <div
                  className={cn(
                    "flex min-w-0 items-center p-5 pb-12 sm:p-10 sm:pb-14 lg:p-12 lg:pb-14",
                    i % 2 === 1 && "lg:order-1",
                  )}
                >
                  <div className="relative w-full pr-[5%]">
                    <div className="drift">
                      <AppFrame
                        screen={app.hero.desktop}
                        sizes="(min-width: 1024px) 40rem, 90vw"
                        className="transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
                      />
                    </div>
                    <div className="absolute right-0 -bottom-8 w-[28%] max-w-44">
                      <AppFrame
                        screen={app.hero.phone}
                        alt=""
                        sizes="(min-width: 1024px) 11rem, 28vw"
                        className="transition-transform duration-700 ease-out-expo group-hover:-translate-y-3 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
                      />
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
        <Button asChild variant="link" className="mt-8 -ml-4 sm:-ml-5">
          <Link href="/apps">
            {t("teaserLink")}
            <ArrowRightIcon aria-hidden="true" />
          </Link>
        </Button>
      </Container>
    </Section>
  );
}
