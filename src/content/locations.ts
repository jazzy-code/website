import type { Localized } from "./projects/types";

export type ClientCountry = {
  id: string;
  name: Localized<string>;
  /** Approximate center of the country, in degrees. */
  lon: number;
  lat: number;
  /** Where the map label sits relative to the pin. */
  label?: "top" | "bottom" | "left" | "right";
};

/**
 * Countries with clients Jazzy Code has worked with (provided by the
 * founder). Pins sit at the country level, not at a city.
 */
export const clientCountries: readonly ClientCountry[] = [
  { id: "mx", name: { en: "Mexico", es: "México" }, lon: -102, lat: 23 },
  { id: "us", name: { en: "United States", es: "Estados Unidos" }, lon: -98, lat: 39 },
  { id: "ca", name: { en: "Canada", es: "Canadá" }, lon: -100, lat: 56 },
  { id: "pe", name: { en: "Peru", es: "Perú" }, lon: -75, lat: -10 },
  { id: "br", name: { en: "Brazil", es: "Brasil" }, lon: -52, lat: -10 },
  { id: "es", name: { en: "Spain", es: "España" }, lon: -3.7, lat: 40.4, label: "left" },
  { id: "ad", name: { en: "Andorra", es: "Andorra" }, lon: 1.5, lat: 42.5, label: "top" },
];
