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
    x: (lon - worldMap.lon0) / worldMap.step + 0.5,
    y: (worldMap.lat0 - lat) / worldMap.step + 0.5,
  };
}

const labelPosition = {
  top: "-translate-x-1/2 -translate-y-[170%]",
  bottom: "-translate-x-1/2 translate-y-[90%]",
  left: "-translate-x-[110%] -translate-y-1/2",
  right: "translate-x-[40%] -translate-y-1/2",
} as const;

/**
 * Dotted world map with a pulsing pin on each
 * country. Pure SVG + CSS; the visible labels are decorative because the
 * same countries are listed as text next to the map.
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
      className={cn(
        "relative w-full overflow-hidden aspect-[80/72] sm:aspect-[181/72]",
        className,
      )}
      aria-hidden="true"
    >
      {/* On phones only the Americas and Spain are in view, so the pins stay legible. */}
      <div className="absolute top-0 left-[-22.5%] h-full w-[226%] sm:left-0 sm:w-full">
      <svg viewBox={`0 0 ${cols} ${rows}`} className="absolute inset-0 size-full">
        <path
          d={dots}
          fill="none"
          stroke="currentColor"
          strokeWidth={0.62}
          strokeLinecap="round"
          className="text-white/25"
        />
        {countries.map(({ id, lon, lat }, i) => {
          const { x, y } = project(lon, lat);
          return (
            <g key={id} style={{ transformOrigin: `${x}px ${y}px` }}>
              <circle
                cx={x}
                cy={y}
                r={1.5}
                className="pin-pulse fill-brand-soft"
                style={{ animationDelay: `${i * 350}ms`, transformOrigin: `${x}px ${y}px` }}
              />
              <circle cx={x} cy={y} r={1.05} className="fill-brand-soft" />
              <circle cx={x} cy={y} r={0.45} className="fill-background" />
            </g>
          );
        })}
      </svg>
      {countries.map(({ id, lon, lat, name, label = "top" }) => {
        const { x, y } = project(lon, lat);
        return (
          <span
            key={id}
            className={cn(
              "absolute hidden rounded-full border border-white/10 bg-background/80 px-2.5 py-0.5 text-[11px] font-medium whitespace-nowrap text-foreground backdrop-blur sm:block",
              labelPosition[label],
            )}
            style={{ left: `${(x / cols) * 100}%`, top: `${(y / rows) * 100}%` }}
          >
            {name[locale]}
          </span>
        );
      })}
      </div>
    </div>
  );
}
