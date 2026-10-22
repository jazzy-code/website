import { Link } from "@/i18n/navigation";

// Provisional typographic wordmark until a logo exists.
export function Wordmark() {
  return (
    <Link
      href="/"
      className="font-display text-lg font-semibold tracking-tight text-foreground"
    >
      Jazzy<span className="text-brand-soft">Code</span>
    </Link>
  );
}
