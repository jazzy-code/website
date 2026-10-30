import { CheckIcon } from "lucide-react";
import { Reveal } from "@/components/site/reveal";
import { ServiceArt } from "@/components/site/service-art";
import { SpotlightCard } from "@/components/site/spotlight-card";
import { services } from "@/content/services";
import type { Locale } from "@/i18n/routing";
import { pick } from "@/lib/localized";
import { cn } from "@/lib/utils";

type Look = {
  /** Column span on large screens (the grid has 6 columns). */
  span: string;
  /** Surface of the card: a soft gradient, no border. */
  surface: string;
  dark?: boolean;
  /** Text and illustration side by side. */
  wide?: boolean;
};

/** A different surface per card, all within the purple family. */
const looks: Record<string, Look> = {
  web: {
    span: "lg:col-span-4",
    surface: "bg-[linear-gradient(135deg,#3b0a63_0%,#150821_65%)]",
    dark: true,
    wide: true,
  },
  "custom-software": { span: "lg:col-span-2", surface: "bg-[linear-gradient(155deg,#e9defa_0%,#ffffff_72%)]" },
  dashboards: { span: "lg:col-span-2", surface: "bg-[linear-gradient(155deg,#dde6fb_0%,#ffffff_72%)]" },
  apis: { span: "lg:col-span-2", surface: "bg-[linear-gradient(155deg,#f4def3_0%,#ffffff_72%)]" },
  automation: { span: "lg:col-span-2", surface: "bg-[linear-gradient(155deg,#e4e0fa_0%,#ffffff_72%)]" },
  cloud: {
    span: "lg:col-span-6",
    surface: "bg-[linear-gradient(120deg,#150821_0%,#3b0a63_100%)]",
    dark: true,
    wide: true,
  },
};

/**
 * Bento grid of services: borderless gradient cards of different sizes, each
 * with an animated illustration, the problem it solves and examples. A light
 * follows the pointer and the illustrations speed up on hover.
 */
export function ServicesGrid({
  locale,
  maxExamples = 3,
}: {
  locale: Locale;
  maxExamples?: number;
}) {
  return (
    <ul className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-6">
      {services.map((service, i) => {
        const look = looks[service.id] ?? looks.dashboards;
        const examples = pick(service.examples, locale)?.slice(0, maxExamples);

        return (
          <Reveal
            as="li"
            key={service.id}
            delay={(i % 3) * 90}
            className={cn(
              "min-w-0",
              look.span,
              look.wide && "md:col-span-2",
            )}
          >
            <SpotlightCard
              glow={look.dark ? "rgba(199, 155, 255, 0.28)" : "rgba(124, 63, 176, 0.18)"}
              className={cn(
                "flex h-full flex-col gap-5 rounded-[2rem] p-5 shadow-[0_1px_0_0_rgba(255,255,255,0.6)_inset] transition-transform duration-500 ease-out-expo hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-8",
                look.surface,
                look.dark ? "text-white" : "text-foreground",
                look.wide && "lg:grid lg:grid-cols-[1.05fr_1fr] lg:items-stretch lg:gap-10",
              )}
            >
              <div className="flex flex-col gap-3">
                <h3 className="font-display text-2xl leading-tight font-semibold tracking-tight">
                  {pick(service.name, locale)}
                </h3>
                <p className={look.dark ? "text-white/70" : "text-muted-foreground"}>
                  {pick(service.problem, locale)}
                </p>
                {examples && examples.length > 0 && (
                  <ul className="mt-3 grid gap-2 text-sm">
                    {examples.map((example) => (
                      <li key={example} className="flex gap-2">
                        <CheckIcon
                          aria-hidden="true"
                          className={cn(
                            "mt-0.5 size-4 shrink-0",
                            look.dark ? "text-[#c79bff]" : "text-brand-soft",
                          )}
                        />
                        <span className={look.dark ? "text-white/85" : undefined}>
                          {example}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div
                className={cn(
                  "mt-auto rounded-3xl p-3",
                  look.dark
                    ? "bg-black/25 ring-1 ring-white/10"
                    : "bg-[#14081f] shadow-xl shadow-brand/20",
                  "aspect-[2/1] overflow-hidden sm:aspect-[16/9]",
                  look.wide && "lg:mt-0 lg:aspect-auto lg:min-h-0",
                )}
              >
                <ServiceArt id={service.id} />
              </div>
            </SpotlightCard>
          </Reveal>
        );
      })}
    </ul>
  );
}
