/** @type {import('next').NextConfig} */

/**
 * Content Security Policy.
 *
 * The site is fully static (SSG) and ships no third-party scripts. The one
 * external origin is the YouTube privacy proxy used for the demo embeds.
 *
 * On `script-src 'unsafe-inline'`: the App Router streams its RSC payload
 * through inline `self.__next_f.push(...)` scripts whose content changes
 * every build. Locking script-src to 'self' blocks those and the page
 * renders nothing at all — verified in a browser, not assumed. The two
 * alternatives both cost more than they return here: per-request nonces
 * require middleware and force every route to render dynamically, giving up
 * static generation; build-time hashes are regenerated on each build and
 * silently break the site whenever they drift.
 *
 * That trade is acceptable specifically because this site has no injection
 * sink: no user input, no query-param rendering, no dangerouslySetInnerHTML,
 * no third-party script. script-src remains meaningful defense-in-depth by
 * blocking external script origins. Every other directive stays strict.
 */
const isDev = process.env.NODE_ENV === "development";

/**
 * Dev needs two extra allowances that must never reach production: React
 * Refresh compiles modules with eval, and the HMR client opens a websocket.
 * Without them the dev bundle throws before hydration and every scroll-reveal
 * section stays at opacity 0 — a blank page.
 */
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self' data:",
  "frame-src https://www.youtube-nocookie.com",
  `connect-src 'self'${isDev ? " ws: wss:" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
];

const nextConfig = {
  // Image optimization is on. Sources in public/images are pre-compressed and
  // stripped of metadata; Next serves responsive AVIF/WebP variants from them.
  images: {
    formats: ["image/avif", "image/webp"],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
