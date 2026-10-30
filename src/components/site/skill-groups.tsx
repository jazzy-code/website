import { skillGroups } from "@/content/profile";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/localized";

const surfaces = [
  "bg-[linear-gradient(155deg,#e9defa_0%,#ffffff_72%)]",
  "bg-[linear-gradient(155deg,#dde6fb_0%,#ffffff_72%)]",
  "bg-[linear-gradient(155deg,#f4def3_0%,#ffffff_72%)]",
  "bg-[linear-gradient(155deg,#e4e0fa_0%,#ffffff_72%)]",
];

/** The four technology groups, shared by the profile and CV pages (light sections). */
export function SkillGroups({ locale }: { locale: Locale }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {skillGroups.map((group, i) => (
        <section
          key={group.id}
          className={`rounded-3xl p-6 ${surfaces[i % surfaces.length]}`}
        >
          <h3 className="font-display text-lg font-semibold">
            {pick(group.title, locale)}
          </h3>
          <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
            {group.items.map((item) => (
              <li key={item} className="flex gap-3">
                <span
                  aria-hidden="true"
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-brand-ring"
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
