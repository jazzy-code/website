import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    start_url: "/",
    display: "browser",
    background_color: "#0a0a0d",
    theme_color: "#4d1074",
    icons: [{ src: "/icon.png", sizes: "512x512", type: "image/png" }],
  };
}
