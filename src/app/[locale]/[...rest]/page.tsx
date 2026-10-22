import { notFound } from "next/navigation";

// Routes not built yet under a valid locale render the localized not-found page.
export default function CatchAll() {
  notFound();
}
