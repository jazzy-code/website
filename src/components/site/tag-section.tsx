import { TechIcon, hasTechIcon } from "./tech-icon";

type TagSectionProps = {
  id: string;
  title: string;
  items: readonly string[];
  /** Show each item's brand mark when it has one. */
  icons?: boolean;
};

/** Titled list of chips, e.g. technologies or infrastructure. */
export function TagSection({ id, title, items, icons }: TagSectionProps) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="font-display text-2xl font-semibold">
        {title}
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 rounded-full bg-card px-4 py-2 text-sm shadow-sm"
          >
            {icons && hasTechIcon(item) && (
              <TechIcon name={item} className="size-4" />
            )}
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
