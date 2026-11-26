import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/site/container";
import { ContactCta } from "@/components/site/contact-cta";
import { PageHero } from "@/components/site/page-hero";
import { ProjectBanner } from "@/components/site/project-banner";
import { Reveal } from "@/components/site/reveal";
import { Section } from "@/components/site/section";
import { routing } from "@/i18n/routing";
import { getProjects } from "@/lib/projects";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "Projects", "/projects");
}

export default async function ProjectsPage({
  params,
}: PageProps<"/[locale]/projects">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Projects");
  const projects = getProjects(locale);

  return (
    <>
      <PageHero title={t("title")} description={t("description")} />
      <Section className="pt-4 sm:pt-4">
        <Container>
          <ul aria-label={t("listLabel")} className="grid grid-cols-1 gap-8">
            {projects.map((project, i) => (
              <Reveal as="li" key={project.slug} variant="scale">
                <ProjectBanner
                  project={project}
                  reverse={i % 2 === 1}
                  cta={t("viewProject")}
                />
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>
      <ContactCta />
    </>
  );
}
