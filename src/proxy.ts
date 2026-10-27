import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Everything except API routes, Next internals, the generated favicon and
  // Open Graph images (their URLs must answer directly, without a redirect)
  // and files with an extension.
  matcher: ["/((?!api|_next|_vercel|icon|.*opengraph-image|.*\\..*).*)"],
};
