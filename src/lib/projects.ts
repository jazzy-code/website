import { projects } from "@/content/projects";
import type { Localized, Project } from "@/content/projects/types";
import type { Locale } from "@/i18n/routing";

export type LocalizedImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

/** A project resolved for one locale: what the UI actually renders. */
export type ProjectView = {
  slug: string;
  name: string;
  summary?: string;
  description?: string;
  contributions?: readonly string[];
  technologies?: readonly string[];
  url?: string;
  cover?: LocalizedImage;
  gallery: readonly LocalizedImage[];
};

function localizedImage(
  image: NonNullable<Project["cover"]>,
  locale: Locale,
  fallbackAlt: string,
): LocalizedImage {
  const { alt, ...rest } = image;
  return { ...rest, alt: alt[locale] ?? fallbackAlt };
}

function toView(project: Project, locale: Locale): ProjectView {
  const pick = <T>(value: Localized<T> | undefined) => value?.[locale];

  return {
    slug: project.slug,
    name: project.name,
    summary: pick(project.summary),
    description: pick(project.description),
    contributions: pick(project.contributions),
    technologies: project.technologies,
    url: project.url,
    cover: project.cover && localizedImage(project.cover, locale, project.name),
    gallery: (project.gallery ?? []).map((image) =>
      localizedImage(image, locale, project.name),
    ),
  };
}

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}

export function getProjects(locale: Locale): ProjectView[] {
  return projects.map((project) => toView(project, locale));
}

/** The project plus its neighbours in catalog order (wrapping around). */
export function getProject(slug: string, locale: Locale) {
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return undefined;

  const at = (i: number) => projects[(i + projects.length) % projects.length];
  return {
    project: toView(projects[index], locale),
    index,
    previous: projects.length > 1 ? toView(at(index - 1), locale) : undefined,
    next: projects.length > 1 ? toView(at(index + 1), locale) : undefined,
  };
}
