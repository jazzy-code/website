import { skillGroups } from "@/content/profile";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/localized";

/** The four technology groups, shared by the profile and CV pages. */
export function SkillGroups({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {skillGroups.map((group) => (
        <section key={group.id} className="surface p-5">
          <h3 className="font-display text-lg font-semibold">
            {pick(group.title, locale)}
          </h3>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
            {group.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-px w-4 shrink-0 bg-brand-ring"
                />
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
