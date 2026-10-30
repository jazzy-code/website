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
              className="flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3.5 font-display text-lg font-medium whitespace-nowrap shadow-sm"
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

/** Two rows of technology tiles drifting in opposite directions. */
export function TechMarquee({ items }: { items: readonly string[] }) {
  const mid = Math.ceil(items.length / 2);
  return (
    <div className="grid gap-3">
      <Row items={items.slice(0, mid)} duration="55s" />
      <Row items={items.slice(mid)} reverse duration="65s" />
    </div>
  );
}
