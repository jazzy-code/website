import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { TechIcon } from "./tech-icon";

function Row({
  items,
  reverse,
  duration,
}: {
  items: readonly string[];
  reverse?: boolean;
  duration: string;
}) {
  // The list is rendered twice so translating by -50% loops seamlessly; the
  // copy is hidden from assistive technology.
  return (
    <div className="marquee-pause overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <ul
        className={cn("marquee flex w-max gap-3 py-1.5", reverse && "marquee-reverse")}
        style={{ "--marquee-duration": duration } as CSSProperties}
      >
        {[0, 1].map((copy) =>
          items.map((item) => (
            <li
              key={`${copy}-${item}`}
              aria-hidden={copy === 1 || undefined}
              className="flex items-center gap-2.5 rounded-2xl border border-border bg-card px-4 py-2.5 font-display text-base font-medium whitespace-nowrap shadow-sm sm:gap-3 sm:px-5 sm:py-3.5 sm:text-lg"
            >
              <TechIcon name={item} />
              {item}
            </li>
          )),
        )}
      </ul>
    </div>
  );
}

function split<T>(items: readonly T[], rows: number) {
  const size = Math.ceil(items.length / rows);
  return Array.from({ length: rows }, (_, i) =>
    items.slice(i * size, (i + 1) * size),
  ).filter((row) => row.length > 0);
}

/**
 * Rows of technology tiles drifting in opposite directions: four on phones,
 * so every technology fits on screen sooner, and two from `sm` up.
 */
export function TechMarquee({ items }: { items: readonly string[] }) {
  return (
    <>
      <div className="grid gap-2.5 sm:hidden">
        {split(items, 4).map((row, i) => (
          <Row
            key={row[0]}
            items={row}
            reverse={i % 2 === 1}
            duration={`${34 + i * 6}s`}
          />
        ))}
      </div>
      <div className="hidden gap-3 sm:grid">
        {split(items, 2).map((row, i) => (
          <Row
            key={row[0]}
            items={row}
            reverse={i % 2 === 1}
            duration={i === 0 ? "55s" : "65s"}
          />
        ))}
      </div>
    </>
  );
}
