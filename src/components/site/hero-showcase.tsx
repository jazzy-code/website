import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import type { DeviceScreen } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { BrowserFrame, PhoneFrame } from "./device-frames";

/*
 * Collage of several projects under the hero title, so the page reads as a
 * studio that builds many applications rather than one product: a large
 * center screen, two tilted screens behind it, two phones in front and a few
 * gradient panels for depth. The bottom fades into the next section.
 */

type Slot = {
  /** Wrapper position/size/tilt. */
  className: string;
  /** Float timing, so the pieces never move in sync. */
  float?: string;
};

const desktopSlots: Slot[] = [
  // Center
  { className: "left-[22%] top-[0%] z-20 w-[56%]" },
  // Back left
  { className: "left-[0%] top-[14%] z-10 w-[36%] -rotate-6", float: "7s" },
  // Back right
  { className: "right-[0%] top-[10%] z-10 w-[36%] rotate-6", float: "8s" },
];

const phoneSlots: Slot[] = [
  { className: "left-[17%] top-[34%] z-30 w-[11%] -rotate-3", float: "6s" },
  { className: "right-[15%] top-[40%] z-30 w-[11%] rotate-3", float: "7.5s" },
];

function Rise({ delay, children, className }: { delay: number; children: ReactNode; className?: string }) {
  return (
    <div
      className={cn("rise absolute", className)}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function HeroShowcase({ screens }: { screens: readonly DeviceScreen[] }) {
  // Center: second project (dark UI reads best); sides and phones: the rest.
  const [a, b, c, d] = screens;
  const desktops = [b ?? a, c ?? a, d ?? a].filter(Boolean) as DeviceScreen[];
  const phones = [a, d ?? b].filter(Boolean) as DeviceScreen[];

  return (
    <div className="relative mx-auto mt-16 max-w-6xl overflow-hidden mask-[linear-gradient(to_bottom,black_62%,transparent)] sm:mt-20">
      {/* On phones the collage is drawn wider than the screen and centered, so the screens stay legible. */}
      <div className="relative left-1/2 aspect-[16/8.2] w-[165%] -translate-x-1/2 sm:left-0 sm:w-full sm:translate-x-0">
        {/* Gradient panels and glows behind the screens. */}
        <div
          aria-hidden="true"
          className="absolute top-[6%] left-[6%] z-0 h-[70%] w-[34%] -rotate-12 rounded-[2rem] bg-linear-to-br from-brand via-brand-ring/60 to-transparent opacity-80 blur-[2px]"
        />
        <div
          aria-hidden="true"
          className="absolute top-[2%] right-[6%] z-0 h-[64%] w-[30%] rotate-12 rounded-[2rem] bg-linear-to-bl from-[#7c3fb0] via-brand/70 to-transparent opacity-80 blur-[2px]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-x-[20%] top-[18%] z-0 h-[60%] rounded-full bg-brand/50 blur-3xl"
        />

        {desktops.map((screen, i) => {
          const slot = desktopSlots[i];
          return (
            <Rise
              key={`d-${screen.slug}`}
              delay={450 + i * 120}
              className={slot.className}
            >
              <div
                className={slot.float ? "float" : undefined}
                style={slot.float ? { animationDuration: slot.float, animationDelay: `${i * 700}ms` } : undefined}
              >
                <BrowserFrame className={i === 0 ? undefined : "opacity-95"}>
                  <Image
                    src={screen.desktop.src}
                    alt={i === 0 ? screen.alt : ""}
                    width={screen.desktop.width}
                    height={screen.desktop.height}
                    sizes={i === 0 ? "(min-width: 1152px) 40rem, 56vw" : "(min-width: 1152px) 26rem, 36vw"}
                    priority={i === 0}
                    className="h-auto w-full"
                  />
                </BrowserFrame>
              </div>
            </Rise>
          );
        })}

        {phones.map((screen, i) => {
          const slot = phoneSlots[i];
          return (
            <Rise
              key={`p-${screen.slug}`}
              delay={700 + i * 150}
              className={slot.className}
            >
              <div
                className="float"
                style={{ animationDuration: slot.float, animationDelay: `${i * 900}ms` }}
              >
                <PhoneFrame>
                  <Image
                    src={screen.mobile.src}
                    alt=""
                    width={screen.mobile.width}
                    height={screen.mobile.height}
                    sizes="(min-width: 1152px) 8rem, 11vw"
                    className="h-auto w-full"
                  />
                </PhoneFrame>
              </div>
            </Rise>
          );
        })}
      </div>
    </div>
  );
}
