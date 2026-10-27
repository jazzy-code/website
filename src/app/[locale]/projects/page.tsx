import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/site/container";
import { ProjectCard } from "@/components/site/project-card";
import { Reveal } from "@/components/site/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { routing } from "@/i18n/routing";
import { getProjects } from "@/lib/projects";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  const t = await getTranslations({ locale, namespace: "Projects" });

  return buildMetadata(locale, "/projects", t("title"), t("description"));
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
    <Container className="py-16 sm:py-24">
      <SectionHeading
        as="h1"
        eyebrow={t("eyebrow")}
        title={t("title")}
        description={t("description")}
      />
      <ul
        aria-label={t("listLabel")}
        className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project, i) => (
          <Reveal as="li" key={project.slug} delay={(i % 3) * 100}>
            <ProjectCard
              index={i + 1}
              title={project.name}
              href={`/projects/${project.slug}`}
              summary={project.summary}
              tags={project.technologies}
              image={project.cover}
              statusLabel={project.summary ? undefined : t("pending")}
            />
          </Reveal>
        ))}
      </ul>
    </Container>
  );
}
