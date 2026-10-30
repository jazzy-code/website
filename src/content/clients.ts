import { mockClients, showMockContent } from "@/content/mock";
import type { ImageFile } from "@/content/projects/types";

export type Client = {
  name: string;
  /** Logo file under /public, e.g. "/images/clients/acme.png". The name is shown as text when missing. */
  logo?: ImageFile;
};

/**
 * Clients shown on the home page. Add only real clients with their own logo;
 * the section stays hidden while the list is empty.
 */
const realClients: readonly Client[] = [
  {
    name: "Rollstack",
    logo: {
      src: "/images/clients/rollstack.svg",
      width: 120,
      height: 17,
    },
  },
  {
    name: "Synertix",
    logo: {
      src: "/images/clients/synertix.png",
      width: 699,
      height: 282,
    },
  },
  {
    name: "Alpha Wolves Arena",
    logo: {
      src: "/images/clients/alpha-wolves-arena.jpg",
      width: 800,
      height: 307,
    },
  },
  {
    name: "PMOX",
    logo: {
      src: "/images/clients/pmox.webp",
      width: 1599,
      height: 608,
    },
  },
  {
    name: "The World Club",
    logo: {
      src: "/images/clients/the-world-club.png",
      width: 640,
      height: 390,
    },
  },
  {
    name: "Marhaba Marbella",
    logo: {
      src: "/images/clients/marhaba-marbella.svg",
      width: 500,
      height: 500,
    },
  }
];

/** True when the list shown is the demo one (see mock.ts). */
export const clientsAreMock = realClients.length === 0 && showMockContent;

export const clients: readonly Client[] = clientsAreMock ? mockClients : realClients;
