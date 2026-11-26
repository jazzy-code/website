import { apps } from "@/content/apps";
import type { App, AppScreen } from "@/content/apps/types";
import type { Localized } from "@/content/projects/types";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/localized";
import type { ShowcaseScreen } from "@/lib/projects";

export type ResolvedScreen = Omit<AppScreen, "alt"> & { alt: string };

/** One app with every text resolved to a locale. */
function resolve(app: App, locale: Locale) {
  const text = (value: Localized<string>) => pick(value, locale) ?? "";
  const screen = (value: AppScreen): ResolvedScreen => ({
    ...value,
    alt: text(value.alt),
  });

  return {
    ...app,
    tagline: text(app.tagline),
    summary: text(app.summary),
    hero: {
      desktop: screen(app.hero.desktop),
      phone: screen(app.hero.phone),
    },
    steps: app.steps.map((step) => ({
      title: text(step.title),
      text: text(step.text),
      screen: screen(step.screen),
    })),
    features: app.features.map((feature) => ({
      icon: feature.icon,
      title: text(feature.title),
      text: text(feature.text),
    })),
  };
}

export type ResolvedApp = ReturnType<typeof resolve>;

export function getApps(locale: Locale) {
  return apps.map((app) => resolve(app, locale));
}

export function getApp(slug: string, locale: Locale) {
  return getApps(locale).find((app) => app.slug === slug);
}

/** Hero carousel slides of the apps. */
export function getAppShowcase(locale: Locale): ShowcaseScreen[] {
  return getApps(locale).map(({ slug, name, hero }) => ({
    slug,
    name,
    alt: hero.desktop.alt,
    href: `/apps/${slug}`,
    kind: "app",
    desktop: hero.desktop,
    mobile: hero.phone,
  }));
}

export function getAppSlugs() {
  return apps.map((app) => app.slug);
}
