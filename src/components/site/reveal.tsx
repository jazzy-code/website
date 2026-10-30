"use client";

import { useEffect, useRef, type ComponentProps, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type RevealProps = ComponentProps<"div"> & {
  as?: "div" | "section" | "article" | "li" | "aside";
  /** Delay in ms, e.g. to stagger cards in a grid. */
  delay?: number;
  /** "scale" also grows the content slightly; meant for large banners. */
  variant?: "lift" | "scale";
};

/**
 * Fades and lifts its content in when it scrolls into view.
 *
 * Content is always visible in the server HTML. After hydration, only
 * elements that start below the fold are hidden, and they are revealed once
 * they intersect the viewport. If JS or IntersectionObserver is unavailable,
 * or the user prefers reduced motion, nothing is ever hidden.
 */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  variant = "lift",
  className,
  style,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Already on screen at load: leave it alone instead of flashing it.
    if (el.getBoundingClientRect().top < window.innerHeight) return;

    let observer: IntersectionObserver | undefined;
    try {
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            el.dataset.reveal = "shown";
            observer?.disconnect();
          }
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
      );
      el.dataset.reveal = "hidden";
      observer.observe(el);
    } catch {
      delete el.dataset.reveal;
    }

    return () => {
      observer?.disconnect();
      // Never leave content hidden if the effect is torn down (e.g. Strict Mode).
      delete el.dataset.reveal;
    };
  }, []);

  const Component = Tag as "div";

  return (
    <Component
      ref={ref}
      data-variant={variant}
      className={cn("reveal", className)}
      style={{ "--reveal-delay": `${delay}ms`, ...style } as CSSProperties}
      {...props}
    />
  );
}
