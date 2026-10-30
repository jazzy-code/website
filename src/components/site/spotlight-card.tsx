"use client";

import { useRef, type ComponentProps, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = ComponentProps<"article"> & {
  /** Color of the light that follows the pointer. */
  glow?: string;
};

/**
 * Card with a soft light that follows the pointer. The position is written
 * to CSS variables, so React does not re-render while the mouse moves.
 */
export function SpotlightCard({
  glow = "rgba(139, 92, 196, 0.22)",
  className,
  style,
  children,
  ...props
}: SpotlightCardProps) {
  const ref = useRef<HTMLElement>(null);

  return (
    <article
      ref={ref}
      onPointerMove={(event) => {
        const el = ref.current;
        if (!el || event.pointerType !== "mouse") return;
        const rect = el.getBoundingClientRect();
        el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        el.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }}
      className={cn("group relative isolate overflow-hidden", className)}
      style={{ "--glow": glow, ...style } as CSSProperties}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(22rem circle at var(--mx, 50%) var(--my, 0%), var(--glow), transparent 70%)",
        }}
      />
      {children}
    </article>
  );
}
