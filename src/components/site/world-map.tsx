import { worldMap } from "@/content/world-map";
import type { ClientCountry } from "@/content/locations";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

const cols = worldMap.rows[0].length;
const rows = worldMap.rows.length;

/** One path with a zero-length round-capped segment per land cell. */
const dots = worldMap.rows
  .flatMap((row, y) =>
    [...row].flatMap((cell, x) => (cell === "1" ? [`M${x + 0.5} ${y + 0.5}h0`] : [])),
  )
  .join("");

function project(lon: number, lat: number) {
  return {
    x: ((lon - worldMap.lon0) / worldMap.step + 0.5) / cols,
    y: ((worldMap.lat0 - lat) / worldMap.step + 0.5) / rows,
  };
}

const labelPosition = {
  top: "-translate-x-1/2 -translate-y-[170%]",
  bottom: "-translate-x-1/2 translate-y-[90%]",
  left: "-translate-x-[110%] -translate-y-1/2",
  right: "translate-x-[40%] -translate-y-1/2",
} as const;

/**
 * Dotted world map with a pulsing pin on each country. The land is SVG and
 * scales with the width; the pins and labels are HTML so they keep a
 * readable size even on a phone. Decorative: the same countries are listed
 * as text next to the map.
 */
export function WorldMap({
  countries,
  locale,
  className,
}: {
  countries: readonly ClientCountry[];
  locale: Locale;
  className?: string;
}) {
  return (
    <div
      className={cn("relative w-full", className)}
      style={{ aspectRatio: `${cols} / ${rows}` }}
      aria-hidden="true"
    >
      <svg viewBox={`0 0 ${cols} ${rows}`} className="absolute inset-0 size-full">
        <path
          d={dots}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.62}
          strokeLinecap="round"
          className="text-white/25"
        />
      </svg>
      {countries.map(({ id, lon, lat, name, label = "top" }, i) => {
        const { x, y } = project(lon, lat);
        return (
          <span
            key={id}
            className="absolute"
            style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
          >
            <span className="absolute top-0 left-0 block size-3.5 -translate-x-1/2 -translate-y-1/2 sm:size-5">
              <span
                className="pin-ring absolute inset-0 rounded-full bg-brand-soft/60"
                style={{ animationDelay: `${i * 350}ms` }}
              />
              <span className="absolute inset-[22%] rounded-full bg-brand-soft ring-2 ring-background" />
            </span>
            <span
              className={cn(
                "absolute hidden rounded-full border border-white/10 bg-background/80 px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap text-foreground backdrop-blur md:block",
                labelPosition[label],
              )}
            >
              {name[locale]}
            </span>
          </span>
        );
      })}
    </div>
  );
}
