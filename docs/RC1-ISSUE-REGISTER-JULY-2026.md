# RC1 Issue Register

**Date:** July 5, 2026  
**Repository:** TrueSpurWebsite_Redesigned  
**Baseline:** RC1 Baseline Certification  
**Total Issues:** 23 (5 Critical, 8 High, 6 Medium, 4 Low)

---

## Critical Issues (RC1-A - Must Fix Before Launch)

### SEC-001: No CSP Headers
- **Severity:** Critical
- **Category:** Security
- **Location:** `next.config.mjs`
- **Root Cause:** Content Security Policy not configured in Next.js config
- **Recommended Fix:** Add CSP headers in Next.js config using `headers` property
- **Production Impact:** Vulnerable to XSS attacks; malicious scripts could be injected
- **Estimated Effort:** 2 hours
- **Dependencies:** None

### SEC-002: TLS Configuration Risk
- **Severity:** Critical
- **Category:** Security
- **Location:** `app/api/contact/route.ts:50-52`, `app/api/intake/route.ts:100-102`
- **Root Cause:** `rejectUnauthorized: false` in TLS configuration disables certificate validation
- **Recommended Fix:** Remove `rejectUnauthorized: false` or configure proper certificate validation
- **Production Impact:** Man-in-the-middle attacks possible; email credentials could be intercepted
- **Estimated Effort:** 1 hour
- **Dependencies:** None

### SEO-001: metadataBase Not Set
- **Severity:** Critical
- **Category:** SEO
- **Location:** `app/layout.tsx:24-31`
- **Root Cause:** Missing `metadataBase` in root metadata export
- **Recommended Fix:** Add `metadataBase: new URL('https://truespur.ai')` to root metadata
- **Production Impact:** Absolute URLs in Open Graph and canonical tags will be incorrect; poor social media sharing
- **Estimated Effort:** 30 minutes
- **Dependencies:** None

### PROD-001: Missing Error Pages
- **Severity:** Critical
- **Category:** Production Readiness
- **Location:** `app/` directory
- **Root Cause:** No `error.tsx` or `not-found.tsx` files
- **Recommended Fix:** Create `app/error.tsx` and `app/not-found.tsx` with proper branding and navigation
- **Production Impact:** Poor UX when errors occur or routes not found; users see default Next.js error pages
- **Estimated Effort:** 3 hours
- **Dependencies:** None

### PROD-002: No PWA Manifest
- **Severity:** Critical
- **Category:** Production Readiness
- **Location:** Root directory
- **Root Cause:** No `manifest.json` for progressive web app
- **Recommended Fix:** Create `manifest.json` with app name, icons, colors, and add to metadata
- **Production Impact:** Cannot be installed as PWA; poor mobile experience; no "Add to Home Screen" capability
- **Estimated Effort:** 2 hours
- **Dependencies:** PROD-003 (favicon)

---

## High Issues (RC1-B - Should Fix Before Launch)

### PERF-001: Image Optimization Missing
- **Severity:** High
- **Category:** Performance
- **Location:** `components/layout/Header.tsx:64-68`, `components/layout/Footer.tsx:16-20`
- **Root Cause:** Using `<img>` tags instead of Next.js `<Image>` component
- **Recommended Fix:** Replace `<img>` with Next.js `<Image>` component with proper sizing and optimization
- **Production Impact:** No automatic optimization, lazy loading, or responsive sizing; slower page loads
- **Estimated Effort:** 2 hours
- **Dependencies:** Need optimized image assets

### PERF-002: Large Client-Side Bundle
- **Severity:** High
- **Category:** Performance
- **Location:** `app/page.tsx` (1013 lines, all client-side)
- **Root Cause:** Entire homepage is client component with no code splitting
- **Recommended Fix:** Split into server components where possible, use dynamic imports for heavy components
- **Production Impact:** Larger initial bundle, slower Time to Interactive, poor Core Web Vitals
- **Estimated Effort:** 8 hours
- **Dependencies:** None

### SEO-002: Incomplete Open Graph Tags
- **Severity:** High
- **Category:** SEO
- **Location:** Most page layouts missing comprehensive OG tags
- **Root Cause:** Only about page has full Open Graph implementation
- **Recommended Fix:** Add Open Graph title, description, images to all page layouts
- **Production Impact:** Poor social media sharing experience; low click-through rates from social platforms
- **Estimated Effort:** 4 hours
- **Dependencies:** SEO-005 (OG images)

### SEO-003: Missing Structured Data
- **Severity:** High
- **Category:** SEO
- **Location:** All pages
- **Root Cause:** No JSON-LD structured data for organization, products, or services
- **Recommended Fix:** Add JSON-LD structured data for Organization and LocalBusiness schemas
- **Production Impact:** Missing rich snippets in search results; lower search visibility
- **Estimated Effort:** 3 hours
- **Dependencies:** None

### FORM-001: No Rate Limiting
- **Severity:** High
- **Category:** Security
- **Location:** `app/api/contact/route.ts`, `app/api/intake/route.ts`
- **Root Cause:** No rate limiting on form submission endpoints
- **Recommended Fix:** Implement rate limiting using Next.js middleware or external service (e.g., Vercel rate limiting)
- **Production Impact:** Vulnerable to spam and abuse; potential DoS attacks
- **Estimated Effort:** 4 hours
- **Dependencies:** None

### SEC-003: No API Key Validation
- **Severity:** High
- **Category:** Security
- **Location:** `app/api/intake/route.ts:59-78`
- **Root Cause:** No validation of `INTAKE_SHEET_SECRET` before using it
- **Recommended Fix:** Validate secret format and presence at application startup
- **Production Impact:** Potential unauthorized access to external storage; data leakage
- **Estimated Effort:** 2 hours
- **Dependencies:** SEC-004 (env validation)

### PROD-003: No Favicon Configuration
- **Severity:** High
- **Category:** Production Readiness
- **Location:** `app/layout.tsx`
- **Root Cause:** Favicon not properly configured in metadata
- **Recommended Fix:** Add favicon to metadata and place favicon files in public directory
- **Production Impact:** Default browser favicon shown; unprofessional appearance
- **Estimated Effort:** 1 hour
- **Dependencies:** Need favicon assets

### PROD-004: No Health Check Endpoint
- **Severity:** High
- **Category:** Production Readiness
- **Location:** API routes
- **Root Cause:** No health check endpoint for monitoring
- **Recommended Fix:** Add `/api/health` endpoint that returns application status
- **Production Impact:** Difficult to monitor application health; no uptime monitoring
- **Estimated Effort:** 1 hour
- **Dependencies:** None

---

## Medium Issues (RC1-C - Can Ship Later)

### PERF-003: Unused Code
- **Severity:** Medium
- **Category:** Performance
- **Location:** `app/page.tsx`, `app/layout.tsx`, `components/contact/ContactForm.tsx`, `components/ui/use-toast.ts`
- **Root Cause:** 30+ unused imports and variables
- **Recommended Fix:** Remove unused imports and variables
- **Production Impact:** Unnecessary bundle size increase; slower page loads
- **Estimated Effort:** 2 hours
- **Dependencies:** None

### PERF-004: No Lazy Loading
- **Severity:** Medium
- **Category:** Performance
- **Location:** All page components
- **Root Cause:** All content loads immediately, no below-fold lazy loading
- **Recommended Fix:** Implement lazy loading for below-fold sections using Next.js dynamic imports
- **Production Impact:** Slower initial page load; poor perceived performance
- **Estimated Effort:** 6 hours
- **Dependencies:** PERF-002 (code splitting)

### SEO-004: Inconsistent Canonical URLs
- **Severity:** Medium
- **Category:** SEO
- **Location:** `app/services/layout.tsx`, `app/products/layout.tsx`, product pages
- **Root Cause:** Canonical URLs not set on most pages
- **Recommended Fix:** Add `alternates.canonical` to all page metadata
- **Production Impact:** Potential duplicate content issues; diluted SEO authority
- **Estimated Effort:** 2 hours
- **Dependencies:** SEO-001 (metadataBase)

### FORM-002: No CSRF Protection
- **Severity:** Medium
- **Category:** Security
- **Location:** All form submission endpoints
- **Root Cause:** No CSRF token validation
- **Recommended Fix:** Implement CSRF protection using Next.js built-in features
- **Production Impact:** Vulnerable to cross-site request forgery attacks
- **Estimated Effort:** 3 hours
- **Dependencies:** None

### FORM-003: Error Handling Could Be Improved
- **Severity:** Medium
- **Category:** User Experience
- **Location:** `components/contact/ContactForm.tsx`, `components/lead-form-dialog.tsx`
- **Root Cause:** Generic error messages don't guide users to fix issues
- **Recommended Fix:** Add more specific error messages and guidance
- **Production Impact:** Poor user experience when errors occur; higher form abandonment
- **Estimated Effort:** 2 hours
- **Dependencies:** None

### SEC-004: No Environment Variable Validation
- **Severity:** Medium
- **Category:** Security
- **Location:** Application startup
- **Root Cause:** Environment variables not validated at application start
- **Recommended Fix:** Add environment variable validation in startup script
- **Production Impact:** Runtime errors if required variables missing; poor error messages
- **Estimated Effort:** 2 hours
- **Dependencies:** None

---

## Low Issues (RC1-C - Can Ship Later)

### A11Y-001: Missing Skip Links
- **Severity:** Low
- **Category:** Accessibility
- **Location:** `app/layout.tsx`
- **Root Cause:** No skip-to-content link for keyboard users
- **Recommended Fix:** Add skip link at top of page with `href="#main-content"`
- **Production Impact:** Keyboard users must tab through entire navigation to reach main content
- **Estimated Effort:** 1 hour
- **Dependencies:** None

### A11Y-002: Image Alt Text Gaps
- **Severity:** Low
- **Category:** Accessibility
- **Location:** `components/layout/Header.tsx:64-68`, `components/layout/Footer.tsx:16-20`
- **Root Cause:** Logo images use generic alt text
- **Recommended Fix:** Update alt text to be more descriptive
- **Production Impact:** Screen readers announce generic text instead of brand context
- **Estimated Effort:** 30 minutes
- **Dependencies:** None

### A11Y-003: Color Contrast Not Validated
- **Severity:** Low
- **Category:** Accessibility
- **Location:** Global CSS and component styling
- **Root Cause:** No systematic WCAG AA contrast ratio validation
- **Recommended Fix:** Run automated contrast audit and adjust colors if needed
- **Production Impact:** Potential contrast issues for color-blind users
- **Estimated Effort:** 2 hours
- **Dependencies:** None

### RESP-001: 320px Breakpoint Not Validated
- **Severity:** Low
- **Category:** Responsive Design
- **Location:** All pages
- **Root Cause:** Design not systematically tested at 320px width
- **Recommended Fix:** Manual testing at 320px and adjust if needed
- **Production Impact:** Potential overflow or layout issues on very small screens
- **Estimated Effort:** 2 hours
- **Dependencies:** None

### SEO-005: OG Image References May Not Exist
- **Severity:** Low
- **Category:** SEO
- **Location:** `app/about/layout.tsx:15-19`
- **Root Cause:** References to `/images/truespur-og-image.jpg` may not exist
- **Recommended Fix:** Verify OG image exists or use placeholder
- **Production Impact:** Broken social media preview images
- **Estimated Effort:** 30 minutes
- **Dependencies:** Need OG image assets

---

## Issue Summary by Category

| Category | Critical | High | Medium | Low | Total |
|----------|----------|------|--------|-----|-------|
| Security | 2 | 2 | 2 | 0 | 6 |
| Performance | 0 | 2 | 2 | 0 | 4 |
| SEO | 1 | 2 | 1 | 1 | 5 |
| Accessibility | 0 | 0 | 0 | 3 | 3 |
| Responsive Design | 0 | 0 | 0 | 1 | 1 |
| Forms & User Journey | 0 | 1 | 2 | 0 | 3 |
| Production Readiness | 2 | 2 | 0 | 0 | 4 |
| **Total** | **5** | **8** | **6** | **4** | **23** |

---

## Estimated Effort Summary

| Priority | Issues | Total Hours |
|----------|--------|-------------|
| RC1-A (Critical) | 5 | 8.5 hours |
| RC1-B (High) | 8 | 25 hours |
| RC1-C (Medium/Low) | 10 | 19.5 hours |
| **Total** | **23** | **53 hours** |

---

## Dependencies

- **PROD-002** (PWA Manifest) depends on **PROD-003** (Favicon)
- **PERF-004** (Lazy Loading) depends on **PERF-002** (Code Splitting)
- **SEO-004** (Canonical URLs) depends on **SEO-001** (metadataBase)
- **SEC-003** (API Key Validation) depends on **SEC-004** (Env Validation)
- **PERF-001** (Image Optimization) requires optimized image assets
- **PROD-003** (Favicon) requires favicon assets
- **SEO-002** (Open Graph) requires OG image assets
