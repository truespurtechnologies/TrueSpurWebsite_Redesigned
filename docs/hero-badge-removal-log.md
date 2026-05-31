# Hero Badge Removal Log

**Date:** May 30, 2026  
**Issue:** Bridge card overlapping Hero CTA buttons  
**Solution:** Remove generic Hero badge

---

## Problem Analysis

The bridge card implementation created an overlap issue where the floating card was hiding the Hero section's CTA buttons ("Start Your Project" and "View Our Work").

Initial bridge card was too large with excessive padding (`p-8 md:p-10 lg:p-12`) and took up significant vertical space, pushing journey steps down and creating visual clutter.

---

## Solution: Hero Badge Removal

**Badge Removed:**
```tsx
<Badge className="mb-4 bg-orange-500/25 text-orange-300 ...">
  Cutting-Edge Technology Solutions
</Badge>
```

**Rationale:**

1. **Generic Marketing Speak** — "Cutting-Edge Technology Solutions" is buzzword soup with zero differentiation
2. **Redundant Content** — H1 already says "From Idea to Scalable Product", subheadline explains the service
3. **Weakened Hierarchy** — Extra visual layer before H1 delayed user's eye from reaching main message
4. **Vertical Space** — Removal shifts content up ~40-50px, solving overlap issue
5. **Premium Standards** — Apple, Stripe, Linear rarely use pre-headline badges unless containing specific valuable info (e.g., "Now in Public Beta", "Trusted by 10,000+ startups")

---

## Results

- ✅ Solves overlap — Hero CTAs remain visible, not hidden by bridge card
- ✅ Cleaner Hero — Stronger visual hierarchy, immediate impact
- ✅ More premium feel — Removes AI-template-style generic badge
- ✅ Preserves bridge card — Current bridge design maintained
- ✅ Optimal CTA placement — Buttons remain in conversion-optimized position

---

## Design Principle Applied

**"Less is More"** — Removing unnecessary elements strengthens the core message and improves user experience. Generic badges add visual noise without adding value.

---

## Future Badge Guidelines

If a Hero badge is needed in the future, it must contain **specific, valuable, differentiating information**:

- ✅ "Trusted by 50+ Startups" (social proof)
- ✅ "Product Strategy + Engineering" (clear value prop)
- ✅ "From MVP to Scale" (journey positioning)
- ✅ "SOC 2 Certified" (trust signal)
- ❌ "Cutting-Edge Technology" (generic)
- ❌ "Innovative Solutions" (meaningless)
- ❌ "Industry Leading" (unsubstantiated claim)
