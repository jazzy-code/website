import { MailIcon, SparklesIcon } from "lucide-react";
import {
  siBootstrap,
  siClerk,
  siDeepl,
  siExpress,
  siJavascript,
  siJsonwebtokens,
  siLaravel,
  siMapbox,
  siMeilisearch,
  siMui,
  siMysql,
  siNextdotjs,
  siNodedotjs,
  siPayloadcms,
  siPhp,
  siPnpm,
  siPostgresql,
  siPrimevue,
  siPrisma,
  siReact,
  siRedux,
  siSanity,
  siSass,
  siSequelize,
  siStripe,
  siTailwindcss,
  siTypescript,
  siVite,
  siVuedotjs,
  type SimpleIcon,
} from "simple-icons";
import { cn } from "@/lib/utils";

/*
 * Brand marks come from the `simple-icons` package (CC0). A technology with
 * no mark there gets a generic icon or, failing that, its first letter, so
 * the tile never looks empty.
 */
const brand: Record<string, SimpleIcon> = {
  "Next.js": siNextdotjs,
  TypeScript: siTypescript,
  "Sanity CMS": siSanity,
  "Payload CMS": siPayloadcms,
  "DeepL API": siDeepl,
  Meilisearch: siMeilisearch,
  pnpm: siPnpm,
  React: siReact,
  "Material UI": siMui,
  "Tailwind CSS": siTailwindcss,
  PHP: siPhp,
  "PHP 8.2": siPhp,
  Laravel: siLaravel,
  "Laravel Sanctum": siLaravel,
  Stripe: siStripe,
  MySQL: siMysql,
  JavaScript: siJavascript,
  SCSS: siSass,
  Redux: siRedux,
  "Node.js": siNodedotjs,
  Express: siExpress,
  PostgreSQL: siPostgresql,
  Sequelize: siSequelize,
  "JWT Authentication": siJsonwebtokens,
  "Vue 3": siVuedotjs,
  Vuex: siVuedotjs,
  Vite: siVite,
  Bootstrap: siBootstrap,
  PrimeVue: siPrimevue,
  Mapbox: siMapbox,
  Clerk: siClerk,
  Prisma: siPrisma,
};

const generic: Record<string, typeof MailIcon> = {
  Nodemailer: MailIcon,
  "Kapa AI": SparklesIcon,
};

/** Whether a technology has a mark of its own (brand or generic). */
export function hasTechIcon(name: string) {
  return name in brand || name in generic;
}

/** Decorative mark for a technology; the name is always shown next to it. */
export function TechIcon({ name, className }: { name: string; className?: string }) {
  const icon = brand[name];
  if (icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={cn("size-6 shrink-0", className)}
        fill={`#${icon.hex}`}
      >
        <path d={icon.path} />
      </svg>
    );
  }

  const Generic = generic[name];
  if (Generic) {
    return <Generic aria-hidden="true" className={cn("size-6 shrink-0 text-brand-soft", className)} />;
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        "flex size-6 shrink-0 items-center justify-center rounded-md bg-brand text-xs font-semibold text-white",
        className,
      )}
    >
      {name.slice(0, 1).toUpperCase()}
    </span>
  );
}
