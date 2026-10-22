import Image from "next/image";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ProjectMediaProps = {
  name: string;
  /** Real screenshot; when absent a branded placeholder is shown. */
  image?: { src: string; alt: string };
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Overlay content such as a status badge. */
  children?: ReactNode;
};

/** Cover frame shared by the catalog card and the detail page. */
export function ProjectMedia({
  name,
  image,
  sizes,
  priority,
  className,
  children,
}: ProjectMediaProps) {
  return (
    <div
      className={cn(
        "relative aspect-[16/10] overflow-hidden bg-surface-raised",
        className,
      )}
    >
      {image ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
      ) : (
        <div
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--brand)_70%,transparent),transparent_65%)]"
        >
          <span className="font-display text-6xl font-semibold text-foreground/20 select-none">
            {name.slice(0, 1)}
          </span>
        </div>
      )}
      {children}
    </div>
  );
}
