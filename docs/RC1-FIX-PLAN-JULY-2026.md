# RC1 Fix Plan

**Date:** July 5, 2026  
**Repository:** TrueSpurWebsite_Redesigned  
**Baseline:** RC1 Baseline Certification  
**Total Issues:** 23 (5 Critical, 8 High, 6 Medium, 4 Low)

---

## Fix Prioritization Framework

**RC1-A (Must Fix Before Launch):** Critical security vulnerabilities and production-blocking issues that prevent safe deployment.

**RC1-B (Should Fix Before Launch):** High-priority issues that significantly impact user experience, SEO, or performance but do not block launch.

**RC1-C (Can Ship Later):** Medium and low priority issues that can be addressed in post-launch sprints without significant production impact.

---

## RC1-A Fixes (Must Fix Before Launch)

**Estimated Total Effort: 8.5 hours**  
**Business Impact:** Security vulnerabilities, production blocking issues, SEO configuration

### A1: Add CSP Headers (SEC-001)
- **Priority:** 1 (Highest)
- **Effort:** 2 hours
- **Owner:** Backend/DevOps
- **Steps:**
  1. Add `headers` property to `next.config.mjs`
  2. Configure Content-Security-Policy header with appropriate directives
  3. Test CSP in development mode with report-only mode first
  4. Enable strict CSP after validation
- **Validation:** Security headers audit passes
- **Dependencies:** None

### A2: Fix TLS Configuration (SEC-002)
- **Priority:** 2
- **Effort:** 1 hour
- **Owner:** Backend
- **Steps:**
  1. Remove `rejectUnauthorized: false` from `app/api/contact/route.ts`
  2. Remove `rejectUnauthorized: false` from `app/api/intake/route.ts`
  3. Test email sending with proper certificate validation
  4. If certificate issues exist, configure proper CA bundle
- **Validation:** Email sending works with secure TLS
- **Dependencies:** None

### A3: Set metadataBase (SEO-001)
- **Priority:** 3
- **Effort:** 30 minutes
- **Owner:** Frontend
- **Steps:**
  1. Add `metadataBase: new URL('https://truespur.ai')` to `app/layout.tsx` metadata export
  2. Verify absolute URLs in Open Graph tags are correct
  3. Test social media sharing preview
- **Validation:** OG tags show correct absolute URLs
- **Dependencies:** None

### A4: Create Error Pages (PROD-001)
- **Priority:** 4
- **Effort:** 3 hours
- **Owner:** Frontend
- **Steps:**
  1. Create `app/error.tsx` with branded error UI and navigation
  2. Create `app/not-found.tsx` with 404 page and helpful navigation
  3. Test error pages by triggering errors
  4. Ensure error pages follow brand guidelines
- **Validation:** Error pages display correctly and provide navigation
- **Dependencies:** None

### A5: Create PWA Manifest (PROD-002)
- **Priority:** 5
- **Effort:** 2 hours
- **Owner:** Frontend
- **Steps:**
  1. Create `public/manifest.json` with app name, icons, colors
  2. Add icon assets (192x192, 512x512)
  3. Add manifest to `app/layout.tsx` metadata
  4. Test PWA installation on mobile
- **Validation:** "Add to Home Screen" works on mobile
- **Dependencies:** A6 (Favicon)

### A6: Configure Favicon (PROD-003)
- **Priority:** 6
- **Effort:** 1 hour
- **Owner:** Frontend
- **Steps:**
  1. Create favicon assets (favicon.ico, apple-touch-icon.png)
  2. Place in `public/` directory
  3. Add favicon to `app/layout.tsx` metadata
  4. Test favicon displays in browser
- **Validation:** Favicon displays correctly in browser
- **Dependencies:** Need favicon assets

---

## RC1-B Fixes (Should Fix Before Launch)

**Estimated Total Effort: 25 hours**  
**Business Impact:** Performance optimization, SEO enhancement, security hardening

### B1: Implement Image Optimization (PERF-001)
- **Priority:** 7
- **Effort:** 2 hours
- **Owner:** Frontend
- **Steps:**
  1. Replace `<img>` in `Header.tsx` with Next.js `<Image>` component
  2. Replace `<img>` in `Footer.tsx` with Next.js `<Image>` component
  3. Configure proper image dimensions and optimization
  4. Test image loading and responsiveness
- **Validation:** Images load optimized and responsive
- **Dependencies:** Need optimized image assets

### B2: Split Homepage Bundle (PERF-002)
- **Priority:** 8
- **Effort:** 8 hours
- **Owner:** Frontend
- **Steps:**
  1. Analyze `app/page.tsx` for server component opportunities
  2. Extract static sections to server components
  3. Use dynamic imports for heavy client components (LeadFormDialog, carousels)
  4. Measure bundle size reduction
- **Validation:** Initial bundle size reduced by 30%+
- **Dependencies:** None

### B3: Add Open Graph Tags (SEO-002)
- **Priority:** 9
- **Effort:** 4 hours
- **Owner:** Frontend
- **Steps:**
  1. Add Open Graph metadata to `app/services/layout.tsx`
  2. Add Open Graph metadata to `app/products/layout.tsx`
  3. Add Open Graph metadata to `app/contact/layout.tsx`
  4. Add Open Graph metadata to product detail pages
  5. Test social media sharing for each page
- **Validation:** All pages have proper OG tags
- **Dependencies:** Need OG image assets

### B4: Add Structured Data (SEO-003)
- **Priority:** 10
- **Effort:** 3 hours
- **Owner:** Frontend
- **Steps:**
  1. Create JSON-LD Organization schema component
  2. Add Organization schema to homepage
  3. Add LocalBusiness schema to contact page
  4. Validate structured data using Google Rich Results Test
- **Validation:** Structured data passes validation
- **Dependencies:** None

### B5: Implement Rate Limiting (FORM-001)
- **Priority:** 11
- **Effort:** 4 hours
- **Owner:** Backend
- **Steps:**
  1. Choose rate limiting solution (Vercel rate limiting or custom middleware)
  2. Implement rate limiting on `/api/contact`
  3. Implement rate limiting on `/api/intake`
  4. Configure rate limits (e.g., 5 requests per minute per IP)
  5. Test rate limiting behavior
- **Validation:** Rate limiting prevents spam
- **Dependencies:** None

### B6: Validate API Keys (SEC-003)
- **Priority:** 12
- **Effort:** 2 hours
- **Owner:** Backend
- **Steps:**
  1. Add validation for `INTAKE_SHEET_SECRET` at application startup
  2. Validate secret format (length, characters)
  3. Fail fast if secret is missing or invalid
  4. Add logging for validation failures
- **Validation:** Application fails fast on invalid secrets
- **Dependencies:** B8 (Env Validation)

### B7: Add Health Check Endpoint (PROD-004)
- **Priority:** 13
- **Effort:** 1 hour
- **Owner:** Backend
- **Steps:**
  1. Create `app/api/health/route.ts`
  2. Return application status (database, email service, external storage)
  3. Test health check endpoint
  4. Configure monitoring service to ping endpoint
- **Validation:** Health check returns correct status
- **Dependencies:** None

### B8: Validate Environment Variables (SEC-004)
- **Priority:** 14
- **Effort:** 2 hours
- **Owner:** Backend
- **Steps:**
  1. Create environment variable validation script
  2. Validate all required environment variables at startup
  3. Provide clear error messages for missing variables
  4. Add validation to build process
- **Validation:** Build fails if required env vars missing
- **Dependencies:** None

---

## RC1-C Fixes (Can Ship Later)

**Estimated Total Effort: 19.5 hours**  
**Business Impact:** Performance optimization, accessibility improvements, UX enhancements

### C1: Remove Unused Code (PERF-003)
- **Priority:** 15
- **Effort:** 2 hours
- **Owner:** Frontend
- **Steps:**
  1. Run ESLint to identify unused imports
  2. Remove unused imports from `app/page.tsx`
  3. Remove unused imports from `app/layout.tsx`
  4. Remove unused imports from `components/contact/ContactForm.tsx`
  5. Remove unused imports from `components/ui/use-toast.ts`
- **Validation:** ESLint shows no unused import warnings
- **Dependencies:** None

### C2: Implement Lazy Loading (PERF-004)
- **Priority:** 16
- **Effort:** 6 hours
- **Owner:** Frontend
- **Steps:**
  1. Identify below-fold sections on homepage
  2. Convert to dynamic imports with loading states
  3. Implement lazy loading for product cards
  4. Measure performance improvement
- **Validation:** LCP improved, initial load faster
- **Dependencies:** B2 (Code Splitting)

### C3: Add Canonical URLs (SEO-004)
- **Priority:** 17
- **Effort:** 2 hours
- **Owner:** Frontend
- **Steps:**
  1. Add `alternates.canonical` to `app/services/layout.tsx`
  2. Add `alternates.canonical` to `app/products/layout.tsx`
  3. Add `alternates.canonical` to product detail pages
  4. Verify canonical URLs are correct
- **Validation:** Canonical URLs present and correct
- **Dependencies:** A3 (metadataBase)

### C4: Implement CSRF Protection (FORM-002)
- **Priority:** 18
- **Effort:** 3 hours
- **Owner:** Backend
- **Steps:**
  1. Implement CSRF token generation
  2. Add CSRF token to forms
  3. Validate CSRF token on submission
  4. Test CSRF protection
- **Validation:** CSRF attacks prevented
- **Dependencies:** None

### C5: Improve Error Messages (FORM-003)
- **Priority:** 19
- **Effort:** 2 hours
- **Owner:** Frontend
- **Steps:**
  1. Review error messages in ContactForm
  2. Review error messages in LeadFormDialog
  3. Add specific guidance for each error type
  4. Test error scenarios
- **Validation:** Error messages are helpful and specific
- **Dependencies:** None

### C6: Add Skip Links (A11Y-001)
- **Priority:** 20
- **Effort:** 1 hour
- **Owner:** Frontend
- **Steps:**
  1. Add skip link to `app/layout.tsx`
  2. Add `id="main-content"` to main elements
  3. Style skip link to be visible on focus
  4. Test keyboard navigation
- **Validation:** Skip link works with keyboard
- **Dependencies:** None

### C7: Improve Image Alt Text (A11Y-002)
- **Priority:** 21
- **Effort:** 30 minutes
- **Owner:** Frontend
- **Steps:**
  1. Update alt text in Header logo
  2. Update alt text in Footer logo
  3. Make alt text more descriptive
- **Validation:** Alt text is descriptive and helpful
- **Dependencies:** None

### C8: Validate Color Contrast (A11Y-003)
- **Priority:** 22
- **Effort:** 2 hours
- **Owner:** Frontend
- **Steps:**
  1. Run automated contrast audit (e.g., axe DevTools)
  2. Identify contrast issues
  3. Adjust colors to meet WCAG AA standards
  4. Re-audit after changes
- **Validation:** All colors meet WCAG AA contrast
- **Dependencies:** None

### C9: Test 320px Breakpoint (RESP-001)
- **Priority:** 23
- **Effort:** 2 hours
- **Owner:** Frontend
- **Steps:**
  1. Test homepage at 320px width
  2. Test all pages at 320px width
  3. Fix any overflow or layout issues
  4. Document responsive behavior
- **Validation:** No issues at 320px
- **Dependencies:** None

### C10: Verify OG Images (SEO-005)
- **Priority:** 24
- **Effort:** 30 minutes
- **Owner:** Frontend
- **Steps:**
  1. Verify `/images/truespur-og-image.jpg` exists
  2. If missing, create or use placeholder
  3. Test OG image in social media preview
- **Validation:** OG image displays correctly
- **Dependencies:** Need OG image assets

---

## Sprint Schedule

### Sprint RC1-A (Launch Blockers)
- **Duration:** 2 days
- **Focus:** Security vulnerabilities and production-blocking issues
- **Issues:** A1-A6 (6 issues)
- **Effort:** 8.5 hours
- **Deliverable:** Safe to deploy to production

### Sprint RC1-B (Pre-Launch Polish)
- **Duration:** 5 days
- **Focus:** Performance, SEO, and security hardening
- **Issues:** B1-B8 (8 issues)
- **Effort:** 25 hours
- **Deliverable:** Production-ready with good performance and SEO

### Sprint RC1-C (Post-Launch)
- **Duration:** 3 days
- **Focus:** Accessibility, UX improvements, code cleanup
- **Issues:** C1-C10 (10 issues)
- **Effort:** 19.5 hours
- **Deliverable:** Enhanced accessibility and user experience

---

## Resource Requirements

### Assets Needed
- Favicon assets (favicon.ico, apple-touch-icon.png)
- PWA icon assets (192x192, 512x512)
- OG image assets (1200x630)
- Optimized logo images for Next.js Image component

### Skills Needed
- Frontend Developer (React, Next.js, TypeScript)
- Backend Developer (Node.js, API security)
- DevOps (Vercel deployment, monitoring)

---

## Risk Mitigation

### Risk: Asset Delays
- **Mitigation:** Use placeholder assets initially, replace with final assets later
- **Impact:** Low - placeholders are acceptable for RC1-A

### Risk: Bundle Splitting Complexity
- **Mitigation:** Start with simple dynamic imports, iterate on optimization
- **Impact:** Medium - may require additional testing

### Risk: CSP Breaking Functionality
- **Mitigation:** Use report-only mode first, iterate on policy
- **Impact:** High - could break analytics or third-party scripts

---

## Success Criteria

### RC1-A Success
- ✅ CSP headers configured and validated
- ✅ TLS configuration secure
- ✅ metadataBase set correctly
- ✅ Error pages created and tested
- ✅ PWA manifest configured
- ✅ Favicon configured

### RC1-B Success
- ✅ Images optimized with Next.js Image
- ✅ Homepage bundle size reduced by 30%+
- ✅ All pages have Open Graph tags
- ✅ Structured data validated
- ✅ Rate limiting implemented
- ✅ API keys validated
- ✅ Health check endpoint working
- ✅ Environment variables validated

### RC1-C Success
- ✅ Unused code removed
- ✅ Lazy loading implemented
- ✅ Canonical URLs added
- ✅ CSRF protection implemented
- ✅ Error messages improved
- ✅ Skip links added
- ✅ Image alt text improved
- ✅ Color contrast validated
- ✅ 320px breakpoint tested
- ✅ OG images verified

---

## Next Steps

1. **Immediate:** Begin RC1-A sprint focusing on security vulnerabilities
2. **Asset Preparation:** Prepare favicon, PWA icons, and OG images
3. **Testing:** Set up staging environment for testing fixes
4. **Monitoring:** Configure uptime monitoring for health check endpoint
5. **Documentation:** Update deployment documentation with new configurations
