import type { Client } from "./clients";
import type { Review } from "./reviews";

/**
 * Demo content so the clients and reviews sections can be designed and
 * reviewed before there is real material. It is NOT real: it only shows
 * while running `pnpm dev`, or anywhere `NEXT_PUBLIC_MOCK_CONTENT=true` is
 * set (e.g. a Vercel preview). Production never shows it by default, and it
 * disappears on its own once the real lists in clients.ts / reviews.ts have
 * entries.
 */
export const showMockContent =
  process.env.NODE_ENV === "development" ||
  process.env.NEXT_PUBLIC_MOCK_CONTENT === "true";

export const mockClients: readonly Client[] = [
  { name: "Aurora Logística" },
  { name: "Vértice Capital" },
  { name: "Nómada Travel" },
  { name: "Cobalto Studio" },
  { name: "Altamar Hoteles" },
  { name: "Pulso Salud" },
];

export const mockReviews: readonly Review[] = [
  {
    quote: {
      en: "They took a messy process and turned it into a tool our whole team uses every day. Clear communication from the first call.",
      es: "Convirtieron un proceso desordenado en una herramienta que todo el equipo usa a diario. Comunicación clara desde la primera llamada.",
    },
    author: "Nombre Apellido",
    role: { en: "Operations Director", es: "Directora de Operaciones" },
    company: "Aurora Logística",
  },
  {
    quote: {
      en: "The platform launched on time and has handled real traffic without surprises. Easy to work with and quick to answer.",
      es: "La plataforma salió a tiempo y ha soportado tráfico real sin sorpresas. Fáciles de trabajar y rápidos para responder.",
    },
    author: "Nombre Apellido",
    role: { en: "Co-founder", es: "Cofundador" },
    company: "Nómada Travel",
  },
  {
    quote: {
      en: "We needed a dashboard our managers could actually understand. They listened first and built exactly that.",
      es: "Necesitábamos un panel que nuestros gerentes pudieran entender. Primero escucharon y luego construyeron justo eso.",
    },
    author: "Nombre Apellido",
    role: { en: "Head of Product", es: "Líder de Producto" },
    company: "Vértice Capital",
  },
];
