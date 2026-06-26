---
title: 'Global Navigation & Routing Hardening Sprint'
type: 'feature'
created: '2026-06-27'
status: 'done'
context: []
---

<frozen-after-approval reason="human-owned intent — do not modify unless human renegotiates">

## Intent

**Problem:** Navigation infrastructure has missing Footer components on some pages, inconsistent "Product Suite" labeling, and placeholder pages that lack proper structure and navigation.

**Approach:** Systematically restore shared Footer to all pages, rename navigation consistently, enhance placeholder pages with proper Header/Footer structure, and verify all routes work correctly.

## Boundaries & Constraints

**Always:** 
- Maintain existing Header component interface
- Use shared Footer component consistently
- Preserve all existing route destinations (/products, /services, /about, /contact)
- Keep mobile navigation functionality intact
- Maintain accessibility compliance

**Ask First:** 
- Any changes to Footer link destinations that don't exist yet
- Any modifications to navigation structure beyond renaming "Product Suite" to "Products"
- Any changes to page layouts or content beyond adding Header/Footer

**Never:** 
- Redesign navigation or create new UI components
- Modify page layouts or copy
- Create fake routes or placeholder pages solely for footer links
- Introduce "#" links or broken navigation
- Change the overall navigation architecture

## I/O & Edge-Case Matrix

| Scenario | Input / State | Expected Output / Behavior | Error Handling |
|----------|--------------|---------------------------|----------------|
| Navigation to Products | Click "Products" in Header | Navigate to /products page with Header/Footer | No errors, smooth routing |
| Footer logo click | Click Footer logo | Navigate to home page | Fallback to window.location.href if scrollToSection unavailable |
| Mobile menu toggle | Click hamburger | Open mobile navigation drawer | Close menu on navigation, escape key, or outside click |
| Placeholder page load | Visit /products, /services, /contact | Show Header, Footer, and "Page Under Development" message | No 404 errors, proper page structure |

</frozen-after-approval>

## Code Map

- `components/layout/Header.tsx` -- Navigation component with "Product Suite" label to rename
- `components/layout/Footer.tsx` -- Shared Footer component to restore on all pages
- `app/page.tsx` -- Homepage with Footer already present
- `app/about/page.tsx` -- About page missing Footer component
- `app/products/page.tsx` -- Placeholder page lacking Header/Footer and proper structure
- `app/services/page.tsx` -- Placeholder page lacking Header/Footer and proper structure
- `app/contact/page.tsx` -- Contact page missing Footer component

## Tasks & Acceptance

**Execution:**
- [x] `components/layout/Header.tsx` -- Rename "Product Suite" to "Products" in navigationItems array -- Ensures consistent navigation labeling
- [x] `app/about/page.tsx` -- Add Footer import and component usage -- Restores missing Footer to About page
- [x] `app/contact/page.tsx` -- Add Footer import and component usage -- Restores missing Footer to Contact page  
- [x] `app/products/page.tsx` -- Add Header/Footer imports and proper page structure -- Transforms basic placeholder to proper structured page
- [x] `app/services/page.tsx` -- Add Header/Footer imports and proper page structure -- Transforms basic placeholder to proper structured page
- [x] All pages -- Verify navigation routes work without errors -- Ensures no broken navigation or console errors
- [x] Verify shared Header and Footer implementation consistency -- Ensure every page uses the SAME shared Header and Footer components with NO duplicated implementations

**Acceptance Criteria:**
- Given all pages are loaded, when navigating between them, then all routes work without errors or 404s
- Given any page is loaded, when viewing the page structure, then Header and Footer components are present
- Given Header navigation is viewed, when checking navigation labels, then "Products" is displayed instead of "Product Suite"
- Given placeholder pages are loaded, when viewing the content, then proper "Page Under Development" messaging is displayed
- Given the application is inspected, when comparing all implemented pages, then every page must use the same shared Header and shared Footer components, with no duplicated implementations

## Spec Change Log

## Design Notes

The Footer component already handles the optional scrollToSection prop gracefully by falling back to window.location.href, making it safe to use across all pages without breaking existing functionality.

Placeholder pages need minimal structure - just Header, Footer, proper page title, and development messaging. No complex content or styling required.

## Verification

**Commands:**
- `npm run dev` -- expected: Development server starts without TypeScript errors
- Navigate to all routes (/products, /services, /about, /contact) -- expected: All pages load without 404 errors

**Manual checks:**
- Verify each page has both Header and Footer components visible
- Check that "Products" appears in navigation instead of "Product Suite"  
- Test mobile navigation hamburger menu opens/closes correctly
- Confirm all navigation links work without console errors
- Validate placeholder pages show proper development messaging

### Navigation & Layout Inventory

| Page | Shared Header | Shared Footer | Navigation Verified | Status |
|------|---------------|---------------|---------------------|--------|
| Home | Yes | Yes | PASS | ✅ |
| About | Yes | Yes | PASS | ✅ |
| Products | Yes | Yes | PASS | ✅ |
| Services | Yes | Yes | PASS | ✅ |
| Contact | Yes | Yes | PASS | ✅ |

**Verification Results:**
- ✅ All pages import Header from `@/components/layout/Header`
- ✅ All pages import Footer from `@/components/layout/Footer`
- ✅ No duplicated Header or Footer implementations found
- ✅ All pages have proper Header → Content → Footer structure
- ✅ Navigation label "Products" consistently applied across all pages
- ✅ Placeholder pages have proper development messaging
