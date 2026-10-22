import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  /** Small label above the title, e.g. the section name. */
  eyebrow?: string;
  /** Editorial section number, rendered as "01". */
  index?: number;
  description?: string;
  /** Heading level; use "h1" for the main title of a page. */
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  title,
  eyebrow,
  index,
  description,
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <header className={cn("max-w-3xl", className)}>
      {(eyebrow || index !== undefined) && (
        <p className="mb-4 flex items-center gap-3 text-sm font-medium tracking-widest text-brand-soft uppercase">
          {index !== undefined && (
            <span aria-hidden="true" className="font-display tabular-nums">
              {String(index).padStart(2, "0")}
            </span>
          )}
          <span aria-hidden="true" className="h-px w-8 bg-brand-ring" />
          {eyebrow && <span>{eyebrow}</span>}
        </p>
      )}
      <Heading className="font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl">
        {title}
      </Heading>
      {description && (
        <p className="mt-5 text-lg leading-relaxed text-pretty text-muted-foreground">
          {description}
        </p>
      )}
    </header>
  );
}
