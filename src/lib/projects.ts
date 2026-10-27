import { featuredSlugs, projects } from "@/content/projects";
import type {
  ImageFile,
  Localized,
  Project,
} from "@/content/projects/types";
import type { Locale } from "@/i18n/routing";

export type ScreenView = {
  alt: string;
  desktop: ImageFile;
  mobile?: ImageFile;
};

/** A project resolved for one locale: what the UI actually renders. */
export type ProjectView = {
  slug: string;
  name: string;
  summary?: string;
  description?: string;
  features?: readonly string[];
  metrics: readonly { value: string; label: string }[];
  technologies?: readonly string[];
  infrastructure?: readonly string[];
  links: readonly { href: string; label?: string }[];
  /** Screens in display order; the first one is the cover. */
  screens: readonly ScreenView[];
  /** Desktop capture of the first screen, used by the catalog. */
  cover?: { src: string; alt: string };
};

function toView(project: Project, locale: Locale): ProjectView {
  const pick = <T>(value: Localized<T> | undefined) => value?.[locale];
  const screens = (project.screens ?? []).map(({ alt, desktop, mobile }) => ({
    alt: pick(alt) ?? project.name,
    desktop,
    mobile,
  }));

  return {
    slug: project.slug,
    name: project.name,
    summary: pick(project.summary),
    description: pick(project.description),
    features: pick(project.features),
    metrics: (project.metrics ?? []).flatMap(({ value, label }) => {
      const text = pick(label);
      return text ? [{ value, label: text }] : [];
    }),
    technologies: project.technologies,
    infrastructure: project.infrastructure,
    links: (project.links ?? []).map(({ href, label }) => ({
      href,
      label: pick(label),
    })),
    screens,
    cover: screens[0] && { src: screens[0].desktop.src, alt: screens[0].alt },
  };
}

export function getProjectSlugs() {
  return projects.map((project) => project.slug);
}

export function getProjects(locale: Locale): ProjectView[] {
  return projects.map((project) => toView(project, locale));
}

export function getFeaturedProjects(locale: Locale): ProjectView[] {
  return getProjects(locale).filter((project) =>
    (featuredSlugs as readonly string[]).includes(project.slug),
  ).sort(
    (a, b) =>
      (featuredSlugs as readonly string[]).indexOf(a.slug) -
      (featuredSlugs as readonly string[]).indexOf(b.slug),
  );
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
