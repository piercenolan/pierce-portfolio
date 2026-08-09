/**
 * Canonical origin for the deployed site.
 *
 * Vercel exposes the deployment host but not the scheme, and preview
 * deployments get a different host than production. Prefer an explicitly
 * configured public URL, fall back to the Vercel-provided host, and finally
 * to localhost for local development.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : "http://localhost:3000")
).replace(/\/$/, "");
