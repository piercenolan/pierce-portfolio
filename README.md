# pierce-portfolio

Personal portfolio site for Nolan Pierce. Next.js 15 (App Router) · TypeScript · Tailwind CSS. Deploys on Vercel with zero configuration.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Scripts

| Command | Does |
|---------|------|
| `npm run dev` | Dev server |
| `npm run build` | Production build. Regenerates the image manifest first via `prebuild` |
| `npm run lint` | ESLint (flat config, `next/core-web-vitals`) |
| `npm run check:contrast` | Fails if any colour pair the site uses drops below WCAG AA |
| `npm test` | `lint` + `check:contrast` |
| `npm run optimize:images` | Resizes, recompresses, and strips EXIF from `public/images`, in place |

Run `optimize:images` after adding any photo — it caps the longest edge at 2000px and removes camera metadata. Then run a build so `src/data/imageDimensions.ts` picks up the new dimensions; that manifest is what lets `next/image` reserve the right aspect ratio and keeps layout shift at zero.

## Deploy to Vercel

Import the repo at [vercel.com/new](https://vercel.com/new) and accept the detected defaults.

**Set one environment variable:** `NEXT_PUBLIC_SITE_URL` to the production domain (e.g. `https://nolanpierce.com`). Without it, `sitemap.xml`, `robots.txt`, and the canonical/Open Graph URLs fall back to the Vercel-generated deployment host.

Security headers (CSP, HSTS, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, `X-Content-Type-Options`) are set in `next.config.mjs` and apply automatically. The CSP relaxes `script-src` in development only, because React Refresh needs `eval`.

## Editing content

All copy lives in two files. You should not need to touch component code to update the site.

| File | Contains |
|------|----------|
| `src/data/profile.ts` | Name, hero copy, spec-strip numbers, experience entries, skills, coursework |
| `src/data/projects.ts` | Every project: title, status, prose sections, callouts, figures, video embeds |

**Adding a project:** append an object to the `projects` array in `src/data/projects.ts`. Set `featured: true` to place it in the top grid, `false` for the Other Projects grid. Detail pages and routing generate automatically.

**Marking the turret complete:** in `src/data/projects.ts`, change the `tracking-turret` entry's `status` from `"In progress"` to `"Complete"`, add a `hero` image path, and add `figures`.

## Design system

Colors are defined in `tailwind.config.ts` and derive from the matplotlib `tab10` cycle used in the research figures, so those charts sit natively in the page rather than clashing with it.

| Token | Hex | Use |
|-------|-----|-----|
| `bench` | `#EDEFF0` | Page background |
| `panel` | `#F7F8F9` | Cards, alternating sections |
| `ink` | `#12171A` | Primary text |
| `graphite` | `#4A5459` | Body text, secondary |
| `rule` | `#CDD3D6` | Borders, dividers |
| `signal` | `#1F77B4` | Links, primary accent |
| `measure` | `#FF7F0E` | Measured values, callouts |

Type: **Archivo** (display) · **IBM Plex Sans** (body) · **IBM Plex Mono** (data, labels, captions).

The recurring `[LABEL]` annotation blocks are the site's signature device — dimension callouts borrowed from engineering drawings, used to put the measured number or honest caveat next to a claim.

## Assets

- `public/Nolan_Pierce_Resume.pdf` — replace this file to update the résumé download
- `public/images/projects/cv/` — research figures
- `public/images/projects/misc/` — coursework project thumbnails
- `public/images/projects/servo-gate/` — Arduino build photos
- `public/images/projects/warehouse/` — Unreal Engine screenshots

`public/` holds only what the site references; unused assets are pruned rather than left to ship.

The favicon and the link-preview card are generated at build time from the design tokens — `src/app/icon.tsx` and `src/app/opengraph-image.tsx` — so they track the palette instead of drifting from it. There are no binary icon files to maintain.

No third-party company logos are used anywhere on the site.
