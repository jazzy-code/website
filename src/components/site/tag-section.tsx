type TagSectionProps = {
  id: string;
  title: string;
  items: readonly string[];
};

/** Titled list of chips, e.g. technologies or infrastructure. */
export function TagSection({ id, title, items }: TagSectionProps) {
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="font-display text-2xl font-semibold">
        {title}
      </h2>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li
            key={item}
            className="rounded-full border border-border px-3 py-1 text-sm text-muted-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
