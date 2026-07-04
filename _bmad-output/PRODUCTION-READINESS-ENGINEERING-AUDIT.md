# Production Readiness Engineering Audit

**Project:** TrueSpur Website (Redesigned)
**Date:** July 2026
**Phase:** Post-Implementation, Pre-Launch Hardening
**Scope:** Engineering quality and long-term maintainability only
**Exclusions:** Design, copy, UX, strategy — all frozen and out of scope

---

## Executive Summary

The TrueSpur website is a Next.js 15 / React 19 / TypeScript 5 / Tailwind CSS 4 application with 5 primary pages (Home, About, Products, Services, Contact), 4 product sub-pages, 3 API routes, and a component library built on shadcn/ui. The codebase is functional and well-structured at the component level for newer pages (Contact, Services), but suffers from significant technical debt in the homepage (1009-line monolithic file), pervasive `"use client"` directives eliminating server-side rendering benefits, a runtime prop mismatch bug on the Services page, missing SEO infrastructure across most pages, ~47 unused shadcn/ui components adding bundle weight, and 15+ unused npm packages.

**Overall Production Readiness Score: 68/100**

The project is **conditionally ready for launch hardening**, but 3 critical issues must be resolved first (Services page dialog bug, missing `<main>` landmarks, missing robots/sitemap). Remaining items can be addressed during hardening.

---

## Health Scores

| Category | Score | Status |
|---|---|---|
| **Repository Hygiene** | 55/100 | Needs cleanup |
| **Architecture** | 65/100 | Fair — good component structure for new pages, monolithic homepage |
| **Code Quality** | 72/100 | Good — strict TS, no ESLint disables, but significant dead code |
| **Component Audit** | 70/100 | Fair — reusable components exist but are bypassed on key pages |
| **Accessibility Engineering** | 68/100 | Fair — good ARIA on forms, missing landmarks and nav labels |
| **Performance Readiness** | 60/100 | Poor — all pages client-rendered, no dynamic imports, unused deps |
| **SEO Readiness** | 45/100 | Poor — metadata on only 2 of 9+ pages, no sitemap/robots |
| **Dependency Audit** | 50/100 | Poor — 15+ unused packages, 47 unused UI components |
| **Overall Production Readiness** | 68/100 | Conditionally ready |

---

## 1. Architecture Audit

### 1.1 Folder Structure

**Strengths:**
- Clean separation: `app/` (routes), `components/` (UI), `lib/` (utils), `hooks/` (custom hooks)
- Component subdirectories by category: `cards/`, `contact/`, `cta/`, `layout/`, `page/`, `ui/`, `utility/`
- API routes properly organized under `app/api/`
- Product sub-pages use nested routing: `products/healthcare/clinexa/`, `products/artificial-intelligence/tafsir-ai/`

**Issues:**
- `types/` directory is empty — defined types live inline in components
- `archive/` directory contains `prototype/` and `purple-test/` pages — should not be in production build
- `styles/globals.css` is a dead duplicate of `app/globals.css` (159 vs 172 lines, not imported anywhere)
- `components/lead-form-dialog.tsx` and `components/theme-provider.tsx` sit at root of `components/` instead of in a subdirectory
- `app/TerminalResults.md` — terminal output file in the app directory

### 1.2 Component Boundaries

**Critical:**
- `app/page.tsx` is **1009 lines** — contains inline `AnimatedStatCard` component, 4 manually-coded product cards, inline stats data, inline contact form handler (dead code), inline testimonial state (dead code), inline carousel setup (never rendered). This is a monolithic file violating SRP.
- `app/products/page.tsx` (452 lines) defines inline `ProductCard` and `LearningCard` components that shadow the reusable `@/components/cards/ProductCard.tsx`
- `app/about/page.tsx` (476 lines) defines inline `CapabilityCard` and `BeliefCard` components

**Strengths:**
- `app/contact/page.tsx` (314 lines) properly uses external components (`ContactForm`, `ProcessStepCard`, `Header`, `Footer`, `PrimaryButton`)
- `app/services/page.tsx` (326 lines) properly uses external components (`ServiceCard`, `FounderJourneyVisualization`, `PrimaryButton`, `SecondaryButton`)
- Reusable components are well-structured: `PrimaryButton`, `SecondaryButton`, `ServiceCard`, `ProcessStepCard`, `FounderJourneyVisualization`, `PageContainer`, `SectionContainer`, `SectionHeading`

### 1.3 Import Consistency

**Issues:**
- Path alias `@/*` used consistently — good
- But 4 reusable components are never imported anywhere:
  - `@/components/cta/CTAGroup` — never imported
  - `@/components/layout/SectionContainer` — never imported
  - `@/components/utility/SectionHeading` — never imported
  - `@/components/cards/ProductCard` — never imported (shadowed by inline)
- `ThemeProvider` (`@/components/theme-provider`) — never imported in any layout
- Two `SectionHeading` components exist: `components/ui/section-heading.tsx` and `components/utility/SectionHeading.tsx` — neither is used

### 1.4 Dependency Graph Issues

- `app/page.tsx` imports `Image` from `next/image` (line 5) — **never used**
- `app/page.tsx` imports `useEmblaCarousel` (line 7) — initialized (line 161) but **carousel never rendered in JSX**
- `app/layout.tsx` loads `Geist` and `Geist_Mono` fonts (lines 6-7) — prefixed with `_` indicating **unused**, yet `geist` package remains in dependencies
- `next-themes` package installed, `ThemeProvider` component created, but **never used** in any layout

---

## 2. Code Quality Audit

### 2.1 TODO/FIXME Comments
- **0 TODO/FIXME/HACK comments** found in source files — clean

### 2.2 Console Statements
- **14 console statements** across 3 API route files:
  - `app/api/contact/route.ts`: 5 statements (console.error + console.log)
  - `app/api/intake/route.ts`: 5 statements
  - `app/api/waitlist/route.ts`: 4 statements
- `next.config.mjs` removes `console.log` in production but **excludes `error` and `warn`** — API route logging will persist in production (acceptable for server-side error tracking, but should use a structured logger)

### 2.3 Unsafe TypeScript
- **1 `any` type**: `app/about/layout.tsx` line 46 — `children: any` should be `React.ReactNode`
- **0 `@ts-ignore` / `@ts-nocheck`** — clean
- **0 `eslint-disable`** directives — clean
- `tsconfig.json` has `strict: true` — good

### 2.4 Dead Code

**`app/page.tsx` (significant dead code):**
- `Image` import (line 5) — never used
- `formData` state and `handleFormSubmit` function (lines 151-318) — inline contact form handler, appears dead since `LeadFormDialog` is used instead
- `handleInputChange` function (lines 320-326) — dead, supports unused form
- `activeTestimonial` state and interval (lines 204-212) — no testimonials rendered
- `emblaRef`, `emblaApi`, `spotlightIndex` (lines 161-162) — carousel initialized but never rendered
- `productSuite` array (lines 214-250) — defined but never used in JSX
- Multiple potentially unused Lucide icon imports (lines 17-43)

**Other dead code:**
- `components/theme-provider.tsx` — never imported
- `components/cta/CTAGroup.tsx` — never imported
- `components/layout/SectionContainer.tsx` — never imported
- `components/utility/SectionHeading.tsx` — never imported
- `components/cards/ProductCard.tsx` — never imported
- `styles/globals.css` — duplicate, never imported

### 2.5 Runtime Bug

**`app/services/page.tsx` lines 318-322 — LeadFormDialog prop mismatch:**
```tsx
// Services page passes:
<LeadFormDialog
  isOpen={isLeadFormOpen}      // WRONG — component expects "open"
  onClose={() => setIsLeadFormOpen(false)}  // WRONG — component expects "onOpenChange"
  source={leadFormSource}      // WRONG TYPE — string vs LeadFormSource | null
/>
```
The `LeadFormDialog` component interface (lines 28-31) expects `open: boolean` and `onOpenChange: (open: boolean) => void`. The Services page dialog **will never open** — this is a user-facing bug.

---

## 3. Component Audit

### 3.1 Single Responsibility Principle (SRP)

| Component | Lines | SRP Status |
|---|---|---|
| `app/page.tsx` | 1009 | **Violated** — hero, products, stats, process, expertise, CTA, dead form code |
| `app/products/page.tsx` | 452 | **Violated** — defines 2 inline components + page |
| `app/about/page.tsx` | 476 | **Violated** — defines 2 inline components + page |
| `app/contact/page.tsx` | 314 | **Pass** — delegates to external components |
| `app/services/page.tsx` | 326 | **Pass** — delegates to external components |
| `components/lead-form-dialog.tsx` | 468 | **Pass** — multi-step dialog with clear responsibility |
| `components/contact/ContactForm.tsx` | 305 | **Pass** — form with validation and submission |
| `components/layout/Header.tsx` | 140 | **Pass** |
| `components/layout/Footer.tsx` | 158 | **Pass** |

### 3.2 Props and Interfaces

**Issues:**
- `LeadFormDialog` prop mismatch on Services page (see §2.5) — **runtime bug**
- `Footer` accepts optional `scrollToSection?: (sectionId: string) => void` — but when not provided, falls back to `window.location.href = "/"` which causes full page reloads instead of client-side navigation
- `PrimaryButton` and `SecondaryButton` have nearly identical interfaces but don't share a base type

### 3.3 Component Duplication

| Duplicated Pattern | Files | Recommendation |
|---|---|---|
| `useReducedMotion` hook | `app/page.tsx`, `app/about/page.tsx`, `app/products/page.tsx`, `app/contact/page.tsx` | Extract to `hooks/use-reduced-motion.ts` |
| `createAnimationProps` function | Same 4 files | Extract to `lib/animation.ts` |
| Product card markup | `app/page.tsx` (4 inline cards), `app/products/page.tsx` (inline `ProductCard`), `@/components/cards/ProductCard.tsx` (unused) | Consolidate to single reusable component |
| `useIsMobile` hook | `hooks/use-mobile.ts`, `components/ui/use-mobile.tsx` | Remove one duplicate |
| `useToast` hook | `hooks/use-toast.ts`, `components/ui/use-toast.ts` | Remove one duplicate |
| Section heading | `components/ui/section-heading.tsx`, `components/utility/SectionHeading.tsx` | Remove one, use the other |

### 3.4 Naming

- `components/ui/section-heading.tsx` vs `components/utility/SectionHeading.tsx` — confusing duplication
- `components/ui/proof-badge.tsx` — custom component in ui/ directory, unclear purpose
- `components/ui/item.tsx` — generic name, unclear purpose
- `package.json` name is `"my-v0-project"` — should be `"truespur-website"` or similar

---

## 4. Tailwind CSS Audit

### 4.1 Duplicate Utility Patterns

**CTA gradient button (repeated 6+ times):**
```
bg-gradient-to-r from-yellow-500 to-orange-500 ... hover:from-yellow-600 hover:to-orange-600
```
Appears in: `PrimaryButton.tsx`, `Header.tsx` (x2), `app/page.tsx` (x2), product sub-pages. Should use `PrimaryButton` component everywhere.

**Container pattern (repeated 20+ times):**
```
container mx-auto px-4
```
`PageContainer` component exists but is used only on Products page. All other pages inline this pattern.

**Section padding pattern (repeated 15+ times):**
```
py-16 md:py-24 lg:py-32
```
`SectionContainer` component exists with this pattern but is never used.

**Section heading pattern (repeated 10+ times):**
```
font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900
```
`SectionHeading` component exists but is never used.

### 4.2 Inconsistent Spacing

| Pattern | Usage |
|---|---|
| `container mx-auto px-4` | Most pages — inline |
| `PageContainer` (`container mx-auto px-4 max-w-[1280px]`) | Products page only |
| `container mx-auto px-4 max-w-5xl` | Contact page — inline |
| `container mx-auto px-4 max-w-4xl` | Contact page sections — inline |
| `container mx-auto px-4 max-w-3xl` | Contact page sections — inline |
| `container mx-auto px-4 max-w-2xl` | Contact form section — inline |

No consistent max-width strategy — each section picks a different max-width.

### 4.3 Inconsistent Border/Shadow Opacities

| Component | Border | Shadow |
|---|---|---|
| Homepage product cards | `border-gray-100/50` | `shadow-gray-900/5` |
| Products page ProductCard | `border-gray-100/70` | `shadow-gray-900/6` |
| ServiceCard | `border-gray-100/80` | (none specified) |
| ProcessStepCard | `border-gray-100` (no opacity) | (none) |
| LearningCard | `border-gray-100/70` | `shadow-gray-900/6` |

---

## 5. Performance Audit (Code Only)

### 5.1 Client Components — Critical

**ALL 9+ pages use `"use client"`:**

| Page | "use client" | Needs to be? |
|---|---|---|
| `app/page.tsx` | Yes | Yes (uses framer-motion, state, effects) |
| `app/about/page.tsx` | Yes | Yes (uses framer-motion, state) |
| `app/products/page.tsx` | Yes | Yes (uses framer-motion, state) |
| `app/contact/page.tsx` | Yes | Yes (uses framer-motion, state) |
| `app/services/page.tsx` | Yes | **No** — only uses `useState` for dialog; could be server component with client island |
| Product sub-pages (4) | Yes | Most could be server components |

**Impact:** No server-side rendering benefits, no streaming, entire page JS shipped to client. Framer Motion library loaded on every page.

### 5.2 Unused Imports Increasing Bundle

- `embla-carousel-react` — imported in homepage, carousel never rendered (~12KB wasted)
- `Image` from `next/image` — imported in homepage, never used
- Multiple Lucide icons imported but potentially unused in homepage
- `geist` font package — loaded but unused

### 5.3 Image Optimization

- `Header.tsx` and `Footer.tsx` use `<img>` tags instead of `next/image` — no optimization, no lazy loading, potential CLS
- `ProductCard.tsx` (unused) correctly uses `next/image`
- No `width`/`height` on `<img>` tags — layout shift risk

### 5.4 No Dynamic Imports

- `LeadFormDialog` (468 lines) loaded eagerly on every page — should be `next/dynamic` with `{ ssr: false }` since it's only shown on click
- No `LazyMotion` from framer-motion — full motion library loaded instead of reduced `m` component

### 5.5 API Route Optimization

- All 3 API routes create a new `nodemailer.createTransport` on every request — should be cached at module level
- No rate limiting on any API route
- No request body size limit (intake route does `.slice()` for safety, contact route does not)

---

## 6. Accessibility Engineering Audit

### 6.1 Semantic HTML and Landmarks

**Critical:**
- `app/page.tsx` (homepage) — **no `<main>` tag** — sections are direct children of root `<div>`
- `app/about/page.tsx` — **no `<main>` tag**
- `app/products/layout.tsx` wraps children in `<main>` but `app/products/page.tsx` also has `<main id="main-content">` — **nested `<main>` tags** (invalid HTML)

**Strengths:**
- `app/contact/page.tsx` — has `<main>` tag
- `app/services/page.tsx` — has `<main>` tag
- `app/products/page.tsx` — has `<main id="main-content">` with `focus:outline-none`

### 6.2 ARIA

**Strengths:**
- `ContactForm.tsx` has excellent ARIA: `aria-required`, `aria-invalid`, `aria-describedby`, `role="alert"` on error messages
- Header mobile menu button has `aria-label="Toggle menu"`
- Founder photo placeholder has `role="img"` and `aria-label`

**Issues:**
- Header `<nav>` elements lack `aria-label` (e.g., "Main navigation", "Mobile navigation")
- Footer has no `<nav>` landmark — all links are `<button>` elements without navigation landmark
- `app/products/page.tsx` has `id="main-content"` but no `aria-label` on `<main>`
- Sections in contact and services pages lack `aria-labelledby` on `<section>` elements (products page does this correctly)

### 6.3 Keyboard Navigation

- All interactive elements use `<button>` — keyboard accessible
- Focus styles present: `focus:outline-none focus:ring-2 focus:ring-orange-500` on most interactive elements
- `focus:outline-none` removes default outline — acceptable only because custom ring is applied
- Mobile menu is conditional render, not a dialog — no focus trap, no Escape key handling
- No skip-to-main-content link on any page

### 6.4 Heading Hierarchy

- All pages have exactly one H1 — correct
- Heading hierarchy (H1 → H2 → H3) appears correct on all pages
- `FounderJourneyVisualization` uses `<h4>` — may skip H3 in some contexts

---

## 7. SEO Readiness Audit

### 7.1 Metadata Coverage

| Page | Metadata | OG | Twitter | Canonical | Robots |
|---|---|---|---|---|---|
| Root (layout.tsx) | Partial | **Missing** | **Missing** | **Missing** | **Missing** |
| Homepage | **None** (inherits root) | **Missing** | **Missing** | **Missing** | **Missing** |
| About | Complete | Complete | Complete | Complete | Complete |
| Services | Partial | Partial | **Missing** | **Missing** | **Missing** |
| Contact | **None** | **Missing** | **Missing** | **Missing** | **Missing** |
| Products | **None** | **Missing** | **Missing** | **Missing** | **Missing** |
| Product sub-pages (4) | **None** | **Missing** | **Missing** | **Missing** | **Missing** |

**Only 1 of 9+ pages has complete metadata.**

### 7.2 Missing SEO Infrastructure

- **No `robots.txt`** or `app/robots.ts`
- **No `sitemap.xml`** or `app/sitemap.ts`
- **No `manifest.json`** or `app/manifest.ts`
- **No JSON-LD structured data** anywhere (no Organization, Product, BreadcrumbList schemas)
- **No OG image** — About page references `/images/truespur-og-image.jpg` but file does not exist in `public/`

### 7.3 Root Metadata Issues

- `title` lacks template pattern (e.g., `%s | TrueSpur`) — each page must define full title
- `description` uses generic "Transforming businesses with cutting-edge technology solutions" — doesn't match current brand positioning
- `icons` references `/logo/truespur-main-logo.png` — file exists, but Header uses different path `/images/TrueSpur logo.png`
- No `metadataBase` set — relative OG URLs will resolve incorrectly

### 7.4 `.vercelignore` Blocks All Markdown

```
*.md
!README.md
```
This blocks all `.md` files from deployment, including any documentation that might be needed. The `docs/` directory is also excluded. This is fine for production but means no documentation is deployed.

---

## 8. Dependency Audit

### 8.1 Unused npm Packages

| Package | Size Impact | Used By | Status |
|---|---|---|---|
| `geist` | ~Font loading | `app/layout.tsx` (prefixed `_`) | **Unused** |
| `next-themes` | ~5KB | `components/theme-provider.tsx` (never imported) | **Unused** |
| `react-hook-form` | ~30KB | Nothing | **Unused** |
| `@hookform/resolvers` | ~5KB | Nothing | **Unused** |
| `zod` | ~50KB | Nothing | **Unused** |
| `date-fns` | ~20KB | `components/ui/calendar.tsx` (unused) | **Unused** |
| `react-day-picker` | ~40KB | `components/ui/calendar.tsx` (unused) | **Unused** |
| `cmdk` | ~15KB | `components/ui/command.tsx` (unused) | **Unused** |
| `vaul` | ~10KB | `components/ui/drawer.tsx` (unused) | **Unused** |
| `react-resizable-panels` | ~10KB | `components/ui/resizable.tsx` (unused) | **Unused** |
| `input-otp` | ~5KB | `components/ui/input-otp.tsx` (unused) | **Unused** |
| `sonner` | ~15KB | `components/ui/sonner.tsx` (unused) | **Unused** |
| `recharts` | ~100KB+ | `components/ui/chart.tsx` (unused) | **Unused** |
| `embla-carousel-react` | ~12KB | `app/page.tsx` (initialized but never rendered) | **Effectively unused** |
| `tailwindcss-animate` | ~5KB | Potentially duplicate with `tw-animate-css` | **Possibly unused** |

**~300KB+ of unused dependencies.**

### 8.2 Unused Radix UI Packages (23+)

Only 5 Radix packages are actually used:
- `@radix-ui/react-dialog` (LeadFormDialog)
- `@radix-ui/react-slot` (Button)
- `@radix-ui/react-label` (possibly)
- `@radix-ui/react-select` (possibly)
- `@radix-ui/react-separator` (possibly)

The remaining ~20 Radix packages are only used by unused shadcn/ui components.

### 8.3 Unused shadcn/ui Components (47 of 56)

Only ~9 of 56 `components/ui/` files are actually used:
- `badge.tsx`, `button.tsx`, `card.tsx`, `dialog.tsx`, `input.tsx`, `label.tsx`, `select.tsx`, `textarea.tsx`, `toast.tsx`/`toaster.tsx`

**47 unused component files** adding to repository noise and potential confusion.

### 8.4 Version Inconsistencies

| Package | Version | Issue |
|---|---|---|
| `next` | `15.5.9` | — |
| `eslint-config-next` | `16.2.9` | **Major version mismatch** — eslint-config-next 16 is for Next.js 16, not 15 |
| `eslint` | `^9.39.4` | May be incompatible with eslint-config-next 16 |
| `react` / `react-dom` | `19.1.0` | Consistent |
| `@types/react` / `@types/react-dom` | `^19.2.17` / `^19.2.3` | Consistent |

### 8.5 Package Name

- `package.json` `"name": "my-v0-project"` — should be `"truespur-website"` or similar

---

## 9. Repository Hygiene Audit

### 9.1 Unused Files

| File | Reason | Action |
|---|---|---|
| `archive/prototype/page.tsx` | Archived prototype | Remove from production build |
| `archive/purple-test/page.tsx` | Archived test page | Remove from production build |
| `app/TerminalResults.md` | Terminal output in app dir | Delete |
| `test-email.js` | Test script at root | Delete or move to scripts/ |
| `docs.zip` | Compressed docs at root | Delete — docs are in repo |
| `styles/globals.css` | Dead duplicate of `app/globals.css` | Delete |
| `types/` | Empty directory | Delete or populate |
| `env-example.txt` | Should be `.env.example` | Rename |

### 9.2 Duplicate Assets

**Logo files (7+ variants):**
- `public/images/TrueSpur logo.png` — used by Header.tsx
- `public/images/TrueSpur logo Transparent.png` — unused
- `public/images/TrueSpur logo tranparent.png` — unused (typo in name)
- `public/images/TrueSpur logo11.png` — unused
- `public/images/TrueSpur logo Transparent.png` — unused
- `public/logo/truespur-logo.png` — unused
- `public/logo/truespur-main-logo.png` — used by layout.tsx metadata
- `public/logo/truespur-header-logo.png` — unused
- `public/logo/truespur-header-logo.jpg` — unused
- `public/logo/truespur-footer-logo.png` — used by Footer.tsx

**Customer logos duplicated across directories:**
- `public/customers/` (4 files) vs `public/images/` (4 files) — same logos, different names

**Placeholder files:**
- `public/placeholder-logo.png`, `public/placeholder-logo.svg`, `public/placeholder-user.jpg`, `public/placeholder.jpg` — all unused

**Design mode assets:**
- `public/images/design-mode/` — development assets, not used in production

### 9.3 Duplicate Hooks

| Hook | Location 1 | Location 2 | Action |
|---|---|---|---|
| `useIsMobile` | `hooks/use-mobile.ts` | `components/ui/use-mobile.tsx` | Remove one |
| `useToast` | `hooks/use-toast.ts` | `components/ui/use-toast.ts` | Remove one |

### 9.4 Stale Documentation in Repo

- `docs.zip` — compressed archive of docs (already extracted to `docs/`)
- `app/TerminalResults.md` — terminal output
- `_bmad-output/` contains 15+ process documents — not production code but in repo
- `docs/` contains extensive governance documentation — properly excluded from deployment via `.vercelignore`

---

## 10. Technical Debt Register

### Priority 1 — Critical (Must fix before launch)

| ID | Issue | Impact | Effort | File(s) |
|---|---|---|---|---|
| P1-1 | Services page LeadFormDialog prop mismatch — dialog never opens | **User-facing bug** — CTA buttons on Services page do nothing | 0.5h | `app/services/page.tsx:318-322` |
| P1-2 | No `<main>` landmark on homepage and about page | Accessibility violation, SEO issue | 0.5h | `app/page.tsx`, `app/about/page.tsx` |
| P1-3 | Nested `<main>` tags on products page | Invalid HTML, accessibility violation | 0.5h | `app/products/layout.tsx` + `app/products/page.tsx` |
| P1-4 | No `robots.txt` or `sitemap.xml` | Search engines cannot properly crawl | 1h | New `app/robots.ts`, `app/sitemap.ts` |
| P1-5 | `eslint-config-next` version mismatch (16.x with Next 15) | Lint rules may not match framework version | 0.5h | `package.json` |

### Priority 2 — High (Fix during launch hardening)

| ID | Issue | Impact | Effort | File(s) |
|---|---|---|---|---|
| P2-1 | Missing metadata on 7+ pages (Contact, Products, sub-pages, Homepage) | Poor SEO, no social sharing previews | 4h | All page layouts |
| P2-2 | No OG image — About page references non-existent file | Broken social sharing | 1h | `public/` + layout files |
| P2-3 | No `metadataBase` in root metadata | Relative OG URLs resolve incorrectly | 0.5h | `app/layout.tsx` |
| P2-4 | `<img>` tags in Header/Footer instead of `next/image` | No image optimization, CLS risk | 1h | `Header.tsx`, `Footer.tsx` |
| P2-5 | `any` type in About layout | TypeScript safety bypassed | 0.1h | `app/about/layout.tsx:46` |
| P2-6 | No `<nav>` aria-labels in Header | Screen reader users can't distinguish nav regions | 0.5h | `Header.tsx` |
| P2-7 | No skip-to-main-content link | Keyboard accessibility issue | 0.5h | All page layouts |
| P2-8 | No rate limiting on API routes | Spam/abuse vulnerability | 2h | 3 API route files |
| P2-9 | `nodemailer.createTransport` recreated per request | Performance degradation under load | 1h | 3 API route files |
| P2-10 | No request body size limit on contact API route | Potential DoS vector | 0.5h | `app/api/contact/route.ts` |

### Priority 3 — Medium (Post-launch cleanup)

| ID | Issue | Impact | Effort | File(s) |
|---|---|---|---|---|
| P3-1 | Homepage 1009 lines — monolithic file | Maintainability, difficult to test | 8h | `app/page.tsx` |
| P3-2 | Duplicated `useReducedMotion` hook across 4 files | DRY violation, maintenance burden | 1h | 4 page files + new hook |
| P3-3 | Duplicated `createAnimationProps` across 4 files | DRY violation | 1h | 4 page files + new lib |
| P3-4 | Inline components in Products and About pages shadow reusable components | DRY violation, inconsistency | 4h | `app/products/page.tsx`, `app/about/page.tsx` |
| P3-5 | 47 unused shadcn/ui components | Repo noise, confusion, bundle impact | 2h | `components/ui/` |
| P3-6 | 15+ unused npm packages | ~300KB unnecessary install, longer builds | 1h | `package.json` |
| P3-7 | 20+ unused Radix UI packages | Dependency bloat | 1h | `package.json` |
| P3-8 | Dead code in homepage (form handler, carousel, testimonials, productSuite) | Bundle size, confusion | 2h | `app/page.tsx` |
| P3-9 | 4 reusable components never imported (CTAGroup, SectionContainer, SectionHeading, ProductCard) | Wasted effort, inconsistency | 4h | Multiple files |
| P3-10 | Duplicate logo assets (7+ variants) | Repo bloat, confusion | 1h | `public/` |
| P3-11 | Duplicate customer logo assets across 2 directories | Repo bloat | 0.5h | `public/customers/`, `public/images/` |
| P3-12 | Duplicate hooks (use-mobile, use-toast) | DRY violation | 0.5h | `hooks/`, `components/ui/` |
| P3-13 | `styles/globals.css` dead duplicate | Confusion | 0.1h | `styles/globals.css` |
| P3-14 | Archive pages in production build | Unintended routes | 0.5h | `archive/` |
| P3-15 | `package.json` name is "my-v0-project" | Unprofessional | 0.1h | `package.json` |
| P3-16 | No dynamic import for LeadFormDialog | Unnecessary JS on initial load | 1h | All pages using LeadFormDialog |
| P3-17 | Services page could be server component | Unnecessary client-side JS | 2h | `app/services/page.tsx` |
| P3-18 | Inconsistent Tailwind patterns (container, section padding, headings) | Maintainability | 4h | All pages |
| P3-19 | No JSON-LD structured data | Missed SEO opportunity | 2h | Layout files |
| P3-20 | `console.log` in API routes (persists in production for error/warn) | No structured logging | 2h | 3 API route files |

### Priority 4 — Low (Backlog)

| ID | Issue | Impact | Effort | File(s) |
|---|---|---|---|---|
| P4-1 | No structured logger (Winston/Pino) | Operational visibility | 4h | API routes |
| P4-2 | No error boundary components | Uncaught errors show blank page | 2h | `app/error.tsx` |
| P4-3 | No loading.tsx skeletons | No streaming UX | 4h | Route segments |
| P4-4 | No unit tests | No regression protection | 16h+ | New test files |
| P4-5 | No CI/CD pipeline configuration | Manual deployment | 4h | New config |
| P4-6 | `app/TerminalResults.md` in app directory | Repo hygiene | 0.1h | Delete |
| P4-7 | `test-email.js` at root | Repo hygiene | 0.1h | Delete or move |
| P4-8 | `docs.zip` at root | Repo hygiene | 0.1h | Delete |
| P4-9 | `types/` empty directory | Repo hygiene | 0.1h | Delete or populate |
| P4-10 | `env-example.txt` naming | Convention | 0.1h | Rename to `.env.example` |

---

## Final Recommendation

### Status: Conditionally Ready for Launch Hardening

The TrueSpur website is **conditionally ready** to enter the launch hardening phase. The core functionality (pages, forms, API routes, navigation) is operational. The component architecture shows good practices on newer pages (Contact, Services). However, **5 critical issues (P1) must be resolved before launch**:

1. **Services page dialog bug** (P1-1) — CTA buttons are non-functional
2. **Missing `<main>` landmarks** (P1-2, P1-3) — Accessibility and SEO violation
3. **No robots.txt/sitemap.xml** (P1-4) — Search engine crawling impaired
4. **ESLint config version mismatch** (P1-5) — Lint rules don't match framework

**Estimated effort for P1 fixes: 3.5 hours**

Once P1 items are resolved, the project can proceed to launch hardening. P2 items (metadata, image optimization, rate limiting, accessibility improvements) should be addressed during the hardening phase. P3 and P4 items can be scheduled as post-launch technical debt cleanup.

**The project should NOT be deployed to production until P1 items are resolved.**

---

*Audit completed July 2026. This is an engineering audit only — all design, copy, UX, and strategic decisions are frozen and out of scope.*
