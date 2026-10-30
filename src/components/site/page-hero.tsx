import type { CSSProperties, ReactNode } from "react";
import { Container } from "@/components/site/container";
import { Section } from "@/components/site/section";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  description?: string;
  /** Buttons or links under the description. */
  children?: ReactNode;
  /** Content above the title, e.g. a "back" link. */
  top?: ReactNode;
  className?: string;
};

/** Opening band of the inner pages: big centered title over a purple glow. */
export function PageHero({
  title,
  description,
  children,
  top,
  className,
}: PageHeroProps) {
  return (
    <Section
      className={cn(
        "relative overflow-hidden pt-16 pb-14 sm:pt-24 sm:pb-20",
        className,
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[30rem] bg-[radial-gradient(44rem_20rem_at_50%_0%,color-mix(in_oklab,var(--brand)_55%,transparent),transparent_72%)]"
      />
      <Container className="text-center">
        {top && <div className="rise mb-6">{top}</div>}
        <h1
          className="rise-soft font-display mx-auto max-w-4xl text-5xl leading-[1.04] font-semibold tracking-tight text-balance sm:text-6xl"
          style={{ "--d": "60ms" } as CSSProperties}
        >
          {title}
        </h1>
        {description && (
          <p
            className="rise mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted-foreground sm:text-xl"
            style={{ "--d": "200ms" } as CSSProperties}
          >
            {description}
          </p>
        )}
        {children && (
          <div
            className="rise mt-9 flex flex-wrap justify-center gap-3"
            style={{ "--d": "320ms" } as CSSProperties}
          >
            {children}
          </div>
        )}
      </Container>
    </Section>
  );
}
