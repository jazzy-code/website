import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { ProjectView } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { BrowserFrame, PhoneFrame } from "./device-frames";

type ProjectBannerProps = {
  project: ProjectView;
  /** Puts the screens on the left on large screens. */
  reverse?: boolean;
  /** Localized call to action, e.g. "View project". */
  cta: string;
};

/**
 * Large project card: the text on one side and the real screens bleeding off
 * the other. The whole card is one link (stretched from the title).
 */
export function ProjectBanner({
  project,
  reverse,
  cta,
}: ProjectBannerProps) {
  const screen =
    project.screens.find(({ mobile }) => mobile) ?? project.screens[0];
  const tags = project.technologies?.slice(0, 4);

  return (
    <article className="group relative isolate grid overflow-hidden rounded-[2rem] border border-border bg-[radial-gradient(60rem_26rem_at_100%_0%,color-mix(in_oklab,var(--brand)_70%,transparent),transparent_70%),var(--card)] transition-colors duration-500 hover:border-brand-ring lg:grid-cols-[0.8fr_1.2fr]">
      <div
        className={cn(
          "flex flex-col justify-center gap-4 p-6 sm:p-10 lg:p-12",
          reverse && "lg:order-2",
        )}
      >
        <h3 className="font-display text-2xl leading-tight font-semibold tracking-tight text-balance sm:text-3xl">
          <Link
            href={`/projects/${project.slug}`}
            className="after:absolute after:inset-0 after:z-10 after:content-[''] focus-visible:outline-offset-4"
          >
            {project.name}
          </Link>
        </h3>
        {project.summary && (
          <p className="line-clamp-4 max-w-md leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
        )}
        {tags && tags.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
        <span
          aria-hidden="true"
          className="mt-1 inline-flex items-center gap-2 text-sm font-medium text-brand-soft"
        >
          {cta}
          <ArrowRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>

      {screen && (
        <div
          className={cn(
            "flex items-center p-5 pb-12 sm:p-10 sm:pb-14 lg:p-12 lg:pb-14",
            reverse && "lg:order-1",
          )}
        >
          <div className="relative w-full">
            <div className="drift">
              <BrowserFrame className="transition-transform duration-700 ease-out-expo group-hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                <Image
                  src={screen.desktop.src}
                  alt={screen.alt}
                  width={screen.desktop.width}
                  height={screen.desktop.height}
                  sizes="(min-width: 1024px) 50vw, 90vw"
                  className="h-auto w-full"
                />
              </BrowserFrame>
            </div>
            {screen.mobile && (
              <div className="absolute right-2 -bottom-8 w-[26%] max-w-40 sm:right-4">
                <PhoneFrame className="transition-transform duration-700 ease-out-expo group-hover:-translate-y-3 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                  <Image
                    src={screen.mobile.src}
                    alt=""
                    width={screen.mobile.width}
                    height={screen.mobile.height}
                    sizes="(min-width: 1024px) 10rem, 26vw"
                    className="h-auto w-full"
                  />
                </PhoneFrame>
              </div>
            )}
          </div>
        </div>
      )}
    </article>
  );
}
