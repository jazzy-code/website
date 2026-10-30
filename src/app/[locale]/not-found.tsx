import { useTranslations } from "next-intl";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <Section className="relative overflow-hidden py-24 sm:py-36">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[32rem] bg-[radial-gradient(44rem_20rem_at_50%_0%,color-mix(in_oklab,var(--brand)_55%,transparent),transparent_72%)]"
      />
      <Container className="text-center">
        <p
          aria-hidden="true"
          className="rise-soft font-display bg-linear-to-b from-white to-brand-ring bg-clip-text text-8xl font-semibold tracking-tight text-transparent sm:text-9xl"
        >
          404
        </p>
        <h1 className="rise mt-6 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {t("title")}
        </h1>
        <p className="rise mx-auto mt-4 max-w-md text-lg text-muted-foreground">
          {t("description")}
        </p>
        <div className="rise mt-9">
          <Button asChild size="lg">
            <Link href="/">{t("back")}</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
