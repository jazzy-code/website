import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  title: string;
  href: string;
  /** Position in the list, rendered as "01". */
  index?: number;
  summary?: string;
  tags?: readonly string[];
  /** Screenshot; when absent a branded placeholder is shown. */
  image?: { src: string; alt: string };
  /** Localized badge such as "Draft"; the caller owns the text. */
  statusLabel?: string;
  className?: string;
};

export function ProjectCard({
  title,
  href,
  index,
  summary,
  tags,
  image,
  statusLabel,
  className,
}: ProjectCardProps) {
  return (
    <article
      className={cn(
        "surface surface-interactive group flex h-full flex-col overflow-hidden",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border bg-surface-raised">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--brand)_70%,transparent),transparent_65%)]"
          >
            <span className="font-display text-6xl font-semibold text-foreground/20 select-none">
              {title.slice(0, 1)}
            </span>
          </div>
        )}
        {statusLabel && (
          <span className="absolute top-3 left-3 rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            {statusLabel}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-baseline gap-3">
          {index !== undefined && (
            <span
              aria-hidden="true"
              className="font-display text-sm text-brand-soft tabular-nums"
            >
              {String(index).padStart(2, "0")}
            </span>
          )}
          <h3 className="font-display text-xl font-semibold tracking-tight">
            {/* The ::after stretches the link over the whole card. */}
            <Link
              href={href}
              className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-offset-4"
            >
              {title}
            </Link>
          </h3>
        </div>
        {summary && (
          <p className="text-sm leading-relaxed text-muted-foreground">
            {summary}
          </p>
        )}
        {tags && tags.length > 0 && (
          <ul className="mt-auto flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
