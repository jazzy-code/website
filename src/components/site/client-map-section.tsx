import { getTranslations } from "next-intl/server";
import { Container } from "@/components/site/container";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { WorldMap } from "@/components/site/world-map";
import { clientCountries } from "@/content/locations";
import type { Locale } from "@/i18n/routing";

/** World map with a pin per country where Jazzy Code has clients. */
export async function ClientMapSection({ locale }: { locale: Locale }) {
  const t = await getTranslations("Home");

  return (
    <Section className="overflow-hidden">
      <Container>
        <Reveal>
          <SectionHeading
            className="mx-auto text-center"
            title={t("mapTitle", { count: clientCountries.length })}
            description={t("mapDescription")}
          />
          <ul
            aria-label={t("mapList")}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {clientCountries.map(({ id, name }) => (
              <li
                key={id}
                className="rounded-full border border-border bg-card px-4 py-1.5 text-sm"
              >
                {name[locale]}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal variant="scale" className="mt-10 sm:mt-14">
          <WorldMap countries={clientCountries} locale={locale} />
        </Reveal>
      </Container>
    </Section>
  );
}
