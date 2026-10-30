import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type SectionProps = ComponentProps<"section"> & {
  /**
   * "light" re-points the color tokens to a light palette (see `.theme-light`
   * in globals.css), so alternating tones needs no per-component changes.
   */
  tone?: "dark" | "light";
};

/** Full-width band of the home page; the content goes in a `Container`. */
export function Section({
  tone = "dark",
  className,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-20 sm:py-28",
        tone === "light" && "theme-light",
        className,
      )}
      {...props}
    />
  );
}
