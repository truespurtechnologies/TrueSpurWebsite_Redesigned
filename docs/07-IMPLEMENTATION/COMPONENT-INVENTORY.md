# Component Inventory

**Document Type:** Living Implementation Inventory  
**Version:** 1.0  
**Created:** June 26, 2026  
**Status:** ACTIVE - Component Reuse Governance  
**Purpose:** Track reusable implementation components to prevent duplication and maintain consistency

---

## Purpose

This document provides a living inventory of reusable implementation components available for TrueSpur website development.

**This is NOT another design system.** This is an implementation inventory that answers practical questions about:

- What reusable components already exist?
- Where are they currently used?
- Which components are mandatory for reuse?
- Which components are page-specific?
- Which components are global across all pages?

**Goal:** Prevent component duplication, ensure consistency, and accelerate development by promoting reuse of established patterns.

---

## Global Components

These components are required for use across all pages to maintain consistency.

| Component | Status | Used By | Reuse Required | Notes |
|-----------|--------|---------|----------------|-------|
| **Header** | ✅ Active | Homepage | ✅ Mandatory | Navigation, active states, mobile menu |
| **Footer** | ✅ Active | Homepage | ✅ Mandatory | Company info, navigation links, contact |
| **PageContainer** | ✅ Active | Foundation | ✅ Mandatory | Consistent max-width (1280px) and padding |
| **SectionContainer** | ✅ Active | Foundation | ✅ Mandatory | Standard section spacing (py-16→24→32) |
| **PrimaryButton** | ✅ Active | Homepage | ✅ Mandatory | Orange gradient CTA, rounded-full |
| **SecondaryButton** | ✅ Active | Homepage | ✅ Mandatory | Outline style, orange border |
| **SectionHeading** | ✅ Active | Foundation | ✅ Recommended | Badge + title + description pattern |

### Global Component Usage Rules

- **Header/Footer:** Must be used on every page for navigation consistency
- **PageContainer:** Required for all page-level content wrapping
- **SectionContainer:** Required for all sections to maintain spacing rhythm
- **Buttons:** Use PrimaryButton for main CTAs, SecondaryButton for secondary actions
- **SectionHeading:** Use for consistent section headers across all pages

---

## Homepage Components

These components were developed for the Homepage and may be reusable for other pages.

| Component | Status | Used By | Reusability | Notes |
|-----------|--------|---------|-------------|-------|
| **ServiceCard** | ✅ Active | Homepage | 🔄 Reusable | White background, left accent border, hover lift |
| **AnimatedStatCard** | ✅ Active | Homepage | 🔄 Reusable | Number animation, gradient border effect |
| **ProductBridge** | ✅ Active | Homepage | 📋 Page-specific | Floating card with section header |
| **CTABanner** | ✅ Active | Homepage | 🔄 Reusable | Two-button layout, gradient background |
| **HeroLayout** | ✅ Active | Homepage | 📋 Page-specific | Asymmetric content, dark background |
| **FeatureList** | ✅ Active | Homepage | 🔄 Reusable | Icon + text with orange dot indicators |
| **BadgeSystem** | ✅ Active | Homepage | 🔄 Reusable | Category badges, navigation indicators |

### Component Reusability Classification

**🔄 Reusable:** Can be adapted for other pages with minimal changes
**📋 Page-specific:** Designed for Homepage context, reuse requires careful consideration
**⚠️ Deprecated:** Superseded by newer approaches

---

## Shared Interaction Patterns

These are reusable interaction standards documented in the Homepage Reference Standard.

### Hover States
- **Cards:** `hover:shadow-lg hover:-translate-y-1 transition-all duration-300`
- **Buttons:** `hover:scale-[1.01]` for primary CTAs only
- **Navigation:** `hover:text-orange-600 transition-colors duration-200`
- **Backgrounds:** `hover:bg-orange-50` for subtle warmth

### Animation Timing
- **Buttons:** `duration-200` - Quick, responsive
- **Cards:** `duration-300` - Smooth, deliberate
- **Entrance:** `duration: 0.6, ease: "easeOut"` - Natural fade-in

### Button Behavior
- **Primary:** Orange gradient, white text, rounded-full
- **Secondary:** Orange outline, hover background fill
- **Consistent sizing:** sm (px-6 py-2), md (px-8 py-3), lg (px-10 py-4)

### Card Elevation
- **Default:** `shadow-sm` - Subtle presence
- **Hover:** `shadow-lg` - Elevated interaction
- **Focused:** `shadow-2xl` - Modal/dropdown level

### Focus Styles
- **Standard:** `focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2`
- **Consistent:** Same focus ring across all interactive elements

### Motion Rules
- **Reduced motion support:** Required for all animations
- **Entrance only:** No continuous or looping animations
- **Viewport triggered:** Animate when scrolled into view

> **Reference:** See [Homepage Reference Standard](./HOMEPAGE-REFERENCE-STANDARD.md) for complete interaction pattern documentation.

---

## Component Location Map

### Foundation Components
```
components/
├── layout/
│   ├── Header.tsx              # Global navigation
│   ├── Footer.tsx              # Global footer
│   ├── PageContainer.tsx      # Global wrapper
│   └── SectionContainer.tsx   # Section spacing
├── cta/
│   ├── PrimaryButton.tsx      # Main CTAs
│   ├── SecondaryButton.tsx    # Secondary actions
│   └── CTAGroup.tsx           # Button groups
└── ui/
    ├── section-heading.tsx    # Section headers
    ├── proof-badge.tsx        # Trust indicators
    └── card.tsx               # Base card (shadcn/ui)
```

### Homepage-Specific Components
```
app/page.tsx                    # Homepage implementation
components/
├── cards/
│   └── ProductCard.tsx        # New reusable product card
└── page/
    └── FounderJourneyVisualization.tsx  # Homepage-specific
```

---

## Reuse Rules

### Mandatory Reuse
1. **Global components MUST be used** - No custom Header/Footer implementations
2. **Foundation components REQUIRED** - PageContainer/SectionContainer for structure
3. **Button components MANDATORY** - Use PrimaryButton/SecondaryButton consistently
4. **Design system adherence** - Follow Homepage Reference Standard patterns

### Preferred Reuse
1. **Extend existing components** through props rather than duplication
2. **Adapt Homepage components** for similar use cases on other pages
3. **Maintain interaction patterns** - Use established hover states and timing
4. **Preserve visual language** - Follow colors, typography, spacing from reference

### Duplication Prevention
1. **Search existing components** before creating new ones
2. **Check component inventory** for similar patterns
3. **Prefer composition** over inheritance
4. **Document new components** in this inventory after implementation

### Page-Specific Exceptions
1. **Create new components only** when reuse is inappropriate
2. **Page-specific patterns** should be documented as such
3. **Consider future reuse** even for page-specific initial implementations
4. **Avoid one-off components** unless absolutely necessary

---

## Implementation Guidelines

### Before Creating a New Component

1. **Check this inventory** - Does a similar component exist?
2. **Review Homepage patterns** - Can you adapt an existing pattern?
3. **Consider props extension** - Can the existing component be extended?
4. **Evaluate reusability** - Will this be useful on other pages?

### When Reusing Components

1. **Respect the original intent** - Don't force components into inappropriate contexts
2. **Use props for customization** - Avoid direct modification of component code
3. **Maintain consistency** - Follow established patterns for similar use cases
4. **Document usage** - Note any new usage patterns in this inventory

### Component Extension Principles

1. **Props over modification** - Extend functionality through component props
2. **Backward compatibility** - Don't break existing usage when extending
3. **Clear prop interfaces** - Document available customization options
4. **Consistent patterns** - Follow established prop naming and structure

---

## Future Maintenance

### Living Document Status

This inventory should evolve as new shared components are introduced during:

- **About Page implementation** - New narrative components
- **Products Page implementation** - Product showcase components  
- **Services Page implementation** - Service description components
- **Future page development** - New reusable patterns

### Update Process

1. **Add new components** to appropriate sections when implemented
2. **Update reusability status** as components prove their flexibility
3. **Document new patterns** that emerge during implementation
4. **Maintain component location map** as the codebase evolves

### Review Schedule

- **After each major page implementation** - Review and update inventory
- **Monthly component audits** - Check for duplication opportunities
- **Quarterly governance review** - Ensure rules remain relevant

---

## Component Health Metrics

### Success Indicators
- **High reuse rate** - Existing components used frequently
- **Low duplication** - Minimal similar-but-different components
- **Consistent patterns** - Visual and interaction consistency across pages
- **Developer efficiency** - Faster development due to reusable components

### Warning Signs
- **Component proliferation** - Too many similar components
- **Inconsistent patterns** - Different approaches to similar problems
- **Low reuse rate** - New components created when existing ones would work
- **Page-specific silos** - Components not shared across pages

---

## Governance Integration

### Relationship to Other Documents

- **Homepage Reference Standard** - Defines visual and interaction patterns
- **Design System** - Provides foundational design tokens
- **Page Specifications** - Define page-specific component requirements
- **This Inventory** - Tracks what exists and how to reuse it

### Authority and Compliance

- **Mandatory for developers** - Must consult before creating new components
- **Required for consistency** - Ensures visual cohesion across pages
- **Living governance** - Evolves with implementation experience
- **Compliance monitoring** - Track reuse rates and duplication issues

---

*This document was created on June 26, 2026, to support the Foundation Hardening Sprint and establish component reuse governance for subsequent page implementations.*
