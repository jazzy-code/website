import { siFacebook, siInstagram } from "simple-icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const networks = [
  { label: "Facebook", href: siteConfig.follow.facebook, icon: siFacebook },
  { label: "Instagram", href: siteConfig.follow.instagram, icon: siInstagram },
];

/** Round icon links to the company's social pages. */
export function SocialLinks({
  newTab,
  className,
}: {
  /** Screen reader note that the links open a new tab. */
  newTab: string;
  className?: string;
}) {
  return (
    <ul className={cn("flex gap-3", className)}>
      {networks.map(({ label, href, icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex size-11 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-brand-ring hover:bg-accent hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-current">
              <path d={icon.path} />
            </svg>
            <span className="sr-only">
              {label} {newTab}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
