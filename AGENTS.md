# AGENTS.md

## Project

TrueSpur company website (truespur.ai). Next.js 15 App Router, React 19, Tailwind v4, pnpm, deployed on Vercel.

## Commands

- `pnpm dev` - local dev server
- `pnpm lint` - ESLint (warnings are pre-existing; do not introduce new errors)
- `pnpm build` - production build (also runs type-check)
- `pnpm start -p <port>` - serve the production build (use this to verify `next.config.mjs` redirects)

## Clinax product page

Clinax does **not** live in this repo any more. It was extracted to its own repository and domain
(www.clinax.in) in Sep 2026. Rules:

- Do not recreate `app/clinax`, `app/clinax-v2`, `components/clinax*`, or `app/api/clinax-demo` here.
- `/clinax`, `/clinax-v2` and `/products/healthcare/Clinax` are permanent redirects defined in
  `next.config.mjs` (`redirects()`). Keep them.
- Links to Clinax from this site must point to `https://www.clinax.in`.
- The pre-extraction code is preserved at git tag `clinax-pre-split` if it is ever needed for reference.
