# TECHNICAL DEBT & FUTURE WORK BACKLOG

This document tracks technical debt items and future engineering work that should be addressed in upcoming sprints.

---

## High Priority

### Global Metadata Configuration

**Created:** June 30, 2026  
**Priority:** Medium  
**Target Sprint:** Final Launch Hardening Sprint  
**Status:** Pending

**Description:**

Configure `metadataBase` in the root Next.js App Router layout to ensure proper URL generation for social media sharing and SEO.

**Verification Required:**

- [ ] Configure `metadataBase` in `app/layout.tsx`
- [ ] Verify canonical URL generation across all pages
- [ ] Verify Open Graph URL generation
- [ ] Verify Open Graph image URLs resolve correctly
- [ ] Verify Twitter Card image URLs resolve correctly
- [ ] Verify sitemap URL consistency
- [ ] Test social media sharing (LinkedIn, Twitter, Facebook)
- [ ] Validate with social media debuggers (Twitter Card Validator, Facebook Debugger)

**Current Impact:**

Build warning: "metadataBase property in metadata export is not set for resolving social open graph or twitter images, using 'http://localhost:3000'."

This causes Next.js to use `localhost:3000` as the base URL for relative image paths in Open Graph and Twitter Card metadata during build time.

**Recommended Implementation:**

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  metadataBase: new URL('https://www.truespur.ai'),
  // ... rest of metadata
}
```

**Related Files:**

- `app/layout.tsx` (root layout)
- All page-level `layout.tsx` files with metadata exports

**Notes:**

This is a global configuration issue affecting all pages, not specific to any individual page. All page-level metadata currently uses absolute URLs as a workaround, but configuring `metadataBase` is the proper Next.js App Router pattern.

---

## Medium Priority

### ESLint Configuration Circular Reference

**Created:** June 30, 2026  
**Priority:** Low  
**Target Sprint:** Post-Launch Maintenance  
**Status:** Pending Investigation

**Description:**

ESLint configuration contains a circular reference that causes warnings during `npm run lint` and `npm run build`.

**Error Message:**

```
Converting circular structure to JSON
    --> starting at object with constructor 'Object'
    |     property 'configs' -> object with constructor 'Object'
    |     property 'flat' -> object with constructor 'Object'
    |     ...
    |     property 'plugins' -> object with constructor 'Object'
    --- property 'react' closes the circle
Referenced from: .eslintrc.json
```

**Current Impact:**

- Build completes successfully despite the error
- Linting functionality appears to work
- Warning messages clutter build output
- Does not block production deployment

**Investigation Required:**

- [ ] Review `.eslintrc.json` configuration
- [ ] Check for conflicting ESLint plugin versions
- [ ] Verify `eslint-config-next` compatibility with ESLint 9.x
- [ ] Consider migrating to flat config format (ESLint 9+ recommendation)
- [ ] Test with Next.js 16 when available (current deprecation notice for `next lint`)

**Related Files:**

- `.eslintrc.json`
- `package.json` (ESLint dependencies)

**Notes:**

Next.js 15.5.9 shows deprecation warning: "`next lint` is deprecated and will be removed in Next.js 16." Migration to ESLint CLI may resolve this issue.

---

## Low Priority

### Linter Rule Misconfiguration - Tailwind CSS Gradients

**Created:** June 30, 2026  
**Priority:** Low  
**Target Sprint:** Post-Launch Maintenance  
**Status:** Documented (No Action Required)

**Description:**

IDE linter incorrectly suggests replacing `bg-gradient-to-*` with `bg-linear-to-*`, which is invalid Tailwind CSS syntax.

**Current Impact:**

- Cosmetic linter warnings in IDE
- No functional impact
- Code is correct as-is

**Recommendation:**

Ignore these warnings. The correct Tailwind CSS syntax is `bg-gradient-to-{direction}`. The linter rule suggesting `bg-linear-to-*` is misconfigured.

**Notes:**

This may be related to a custom Tailwind CSS linter plugin or outdated linter rules. Investigation and fix are low priority since the warnings are incorrect and do not affect functionality.

---

## Completed Items

_No completed items yet._

---

## Notes

- This backlog should be reviewed during sprint planning sessions
- Items should be prioritized based on business impact and technical risk
- Completed items should be moved to the "Completed Items" section with completion date
- New technical debt should be added as discovered during development or code reviews
