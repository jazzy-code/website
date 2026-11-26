import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig: NextConfig = {
  experimental: {
    // Vercel kept serving an old globals.css (the new sections' styles were
    // missing) from the restored Turbopack build cache; build from scratch.
    turbopackFileSystemCacheForBuild: false,
  },
  images: {
    // 90 keeps the small interface text of the app captures sharp.
    qualities: [75, 90],
  },
  // "/" is the English URL. next-intl redirects "/en" temporarily; make it
  // permanent. Open Graph images do live under "/en", so they are left alone.
  async redirects() {
    return [
      { source: "/en", destination: "/", permanent: true },
      {
        source: "/en/:path((?!.*opengraph-image).*)",
        destination: "/:path",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default withNextIntl(nextConfig);
