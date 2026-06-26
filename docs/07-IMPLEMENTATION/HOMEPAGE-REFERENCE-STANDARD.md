# Homepage Reference Standard

**Document Type:** Implementation Reference Standard  
**Version:** 1.0  
**Created:** June 26, 2026  
**Status:** ACTIVE - Visual & Implementation Authority  
**Scope:** Homepage as reference for all subsequent pages

---

## Purpose

This document establishes the **Homepage as the definitive visual and implementation reference** for the entire TrueSpur website.

**This is NOT another design specification.** This is an implementation standard that documents the actual patterns, behaviors, and design language observed in the frozen Homepage implementation.

Future developers and AI agents must follow these standards when implementing About, Products, Services, and future pages to ensure visual consistency and design language integrity.

---

## 1. Overall Design Philosophy

### Premium Restraint Philosophy
- **Apple/Stripe-inspired restraint** over decoration
- **Human-crafted feel** over template patterns
- **Typography-driven hierarchy** over visual noise
- **Subtle interactivity** over aggressive animations
- **Integration over decoration** - every element serves purpose

### Visual Principles
1. **Fewer layers, more impact** - Avoid nested decorative elements
2. **Generous whitespace** - Breathable layouts with clear visual separation
3. **Scannable content** - Clear hierarchy that guides the eye naturally
4. **One gradient accent per section maximum** - Prevent visual competition
5. **Subtle depth** - Gentle shadows and hover states, not dramatic effects

---

## 2. Visual Hierarchy System

### Typography Scale (Observed in Homepage)

#### Headings (Poppins via `font-heading`)
- **Hero H1:** `font-black text-4xl md:text-5xl lg:text-6xl xl:text-7xl` (900 weight)
- **Section H2:** `font-extrabold text-3xl md:text-4xl lg:text-5xl` (800 weight)
- **Card Titles:** `font-semibold text-lg` (600 weight)
- **Small Labels:** `font-medium text-sm` (500 weight)

#### Body Text (Inter via `font-sans`)
- **Primary Body:** `text-lg text-gray-600` - 18px, line-height relaxed
- **Secondary Body:** `text-base text-gray-600` - 16px, standard
- **Small Text:** `text-sm text-gray-500` - 14px, supporting information
- **Micro Text:** `text-xs` - 12px, labels and metadata

#### Special Text Treatments
- **Uppercase Labels:** `uppercase tracking-[0.16em] text-gray-500` - Stats labels
- **Gradient Text:** Not used in Homepage (avoid)
- **Italic Text:** `italic` - Founder quote "We Craft. You Lead."

---

## 3. Section Spacing Rhythm

### Standard Section Padding
- **Compact:** `py-12 md:py-16 lg:py-20` (48px → 64px → 80px)
- **Standard:** `py-16 md:py-24 lg:py-32` (64px → 96px → 128px) - **Most common**
- **Spacious:** `py-20 md:py-32 lg:py-40` (80px → 128px → 160px)

### Special Cases
- **Hero Section:** Asymmetric padding `pt-32 pb-20 lg:pt-36 lg:pb-24` - More top padding for header clearance
- **Bridge Elements:** Negative margin `-mt-8 md:-mt-10 lg:-mt-12` for overlap effects
- **Card Internal Padding:** `p-8 lg:p-9` (32px → 36px) for service cards

### Container System
- **Standard Container:** `container mx-auto px-4` with `max-w-[1280px]`
- **Wide Container:** `max-w-[800px] ml-0 lg:ml-8` for hero content (asymmetric)
- **Full-width Backgrounds:** Section backgrounds extend full viewport

---

## 4. Container Widths & Layout

### Primary Container
```css
.container.mx-auto.px-4 {
  max-width: 1280px; /* 80rem */
}
```

### Content Width Constraints
- **Hero Content:** `max-w-[800px]` - Optimized for readability
- **Bridge Cards:** `max-w-5xl` - Centered with breathing room
- **Stats Grid:** Full container width with grid distribution

### Grid Systems
- **3-column Standard:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- **Stats Grid:** `grid-cols-2 md:grid-cols-4` (responsive 2→4 columns)
- **Navigation Dropdown:** `md:grid-cols-3` for product suite

---

## 5. CTA Hierarchy & Usage

### Primary CTA (Orange Gradient)
```css
bg-gradient-to-r from-yellow-500 to-orange-500
hover:from-yellow-600 hover:to-orange-600
text-white
rounded-full
px-8 py-3 (desktop) / py-6 (hero)
font-bold
shadow-lg shadow-orange-500/20
hover:shadow-lg hover:scale-[1.01]
transition-all duration-200
```

### Secondary CTA (Outline)
```css
border-2 border-orange-500
text-orange-600
hover:bg-orange-50 hover:border-orange-600 hover:text-orange-700
rounded-full
px-8 py-3
font-bold
transition-all duration-200
```

### CTA Hierarchy Rules
1. **One primary CTA per section maximum** - Avoid competing CTAs
2. **Secondary CTAs only in banners** - Two-button layouts allowed in CTA banners
3. **Hero uses single primary CTA** - "Start Your Project" only
4. **Consistent rounded-full style** - No pill variations
5. **Orange gradient only for primary** - No other color gradients

---

## 6. Card Design Language

### Service Card Pattern (Reference Standard)
```css
/* Base Card */
bg-white
border-gray-100/80
rounded-2xl
shadow-sm
p-8 lg:p-9
group

/* Hover State */
hover:shadow-lg
hover:-translate-y-1
transition-all duration-300

/* Left Accent Border */
border-l-4
border-l-orange-500
```

### Stats Card Pattern
```css
/* Gradient Border Effect */
absolute -inset-[1px]
rounded-2xl
bg-gradient-to-br from-yellow-400/70 via-orange-500/70 to-amber-500/70
opacity-0 group-hover:opacity-100
blur-sm

/* Card Content */
bg-white/95
backdrop-blur-sm
border-0
shadow-lg
rounded-2xl
overflow-hidden
```

### Card Content Structure
1. **Icon/Visual:** Top position, consistent sizing
2. **Title:** `font-semibold text-lg` - Clear hierarchy
3. **Description:** `text-gray-600` - Supporting text
4. **Features:** Bullet points with orange dot indicators

---

## 7. Badge Styling System

### Standard Badge (Secondary)
```css
bg-gray-100
text-gray-800
px-3 py-1
rounded-full
text-sm font-medium
```

### Navigation Active State
```css
after:content-['']
after:absolute
after:-bottom-1.5
after:left-0
after:right-0
after:h-[2px]
after:bg-gradient-to-r
after:from-yellow-400 after:via-orange-500 after:to-amber-500
after:rounded-full
```

### Badge Usage Rules
1. **Category badges:** Use for product/service categorization
2. **Navigation indicators:** Gradient underline for active states
3. **Status badges:** Keep minimal, avoid badge proliferation
4. **Consistent rounded-full** - No square or pill variations

---

## 8. Icon Usage Guidelines

### Icon Sources & Style
- **Library:** Lucide React exclusively
- **Sizing:** Consistent 20px (5w 5h) for most applications
- **Color:** `text-orange-500` for primary icons, `text-gray-400` for secondary

### Icon Applications
1. **Feature Lists:** Small orange dots `w-1.5 h-1.5 bg-orange-500 rounded-full`
2. **Navigation:** Menu icons `h-6 w-6` in gray
3. **CTAs:** Arrow icons `h-4 w-4` for directional emphasis
4. **Stats:** No icons - let numbers speak

### Icon Constraints
- **No decorative icon sets** - Use only meaningful icons
- **Consistent sizing within context** - Don't mix sizes arbitrarily
- **Orange accent color only** - No rainbow icon colors

---

## 9. Color Usage System

### Primary Brand Colors
- **Orange Primary:** `orange-500` (#F97316) - Main CTAs, accents
- **Orange Dark:** `orange-600` (#EA580C) - Hover states
- **Yellow Accent:** `yellow-500` (#EAB308) - Gradient start

### Neutral Colors
- **White:** `white`/`bg-white` - Primary background
- **Light Gray:** `gray-50` (#F9FAFB) - Section backgrounds
- **Medium Gray:** `gray-100` (#F3F4F6) - Card backgrounds, borders
- **Body Text:** `gray-600` (#4B5563) - Primary body copy
- **Light Text:** `gray-500` (#6B7280) - Secondary text
- **Dark Text:** `gray-900` (#111827) - Headings

### Dark Background Colors
- **Slate Dark:** `slate-900` (#0F172A) - Hero background
- **Slate Darkest:** `slate-950` (#020617) - Gradient variations

### Color Usage Rules
1. **Orange for interaction only** - CTAs, hover states, accents
2. **Grays for structure** - Text, backgrounds, borders
3. **One accent color per section** - Don't compete with orange
4. **Consistent gray hierarchy** - Maintain text contrast ratios

---

## 10. Border Radius System

### Radius Scale
- **Small:** `rounded-md` (6px) - Form inputs, small elements
- **Medium:** `rounded-lg` (8px) - Buttons, navigation items
- **Large:** `rounded-xl` (12px) - Cards, containers
- **Extra Large:** `rounded-2xl` (16px) - **Primary card radius**
- **Full:** `rounded-full` - Pills, badges, CTAs

### Usage Patterns
- **Cards:** `rounded-2xl` - Primary card style
- **Buttons:** `rounded-full` - All CTA buttons
- **Navigation:** `rounded-md` - Menu items, dropdowns
- **Badges:** `rounded-full` - All badge types

---

## 11. Shadow System

### Shadow Hierarchy
- **Subtle:** `shadow-sm` - Default card state
- **Standard:** `shadow-lg` - Hover states, elevated elements
- **Strong:** `shadow-2xl` - Modal, dropdown, focused elements
- **Colored:** `shadow-orange-500/20` - CTA shadows with brand color

### Shadow Usage Rules
1. **Cards start subtle, elevate on hover** - `shadow-sm` → `shadow-lg`
2. **CTAs use colored shadows** - Orange tint for brand consistency
3. **Navigation uses subtle shadows** - `shadow-sm` for dropdown
4. **No dramatic shadows** - Keep depth subtle and premium

---

## 12. Hover & Interaction Philosophy

### Interaction Principles
- **Subtle lift effect:** `hover:-translate-y-1` - Cards, buttons
- **Gentle scale:** `hover:scale-[1.01]` - Primary CTAs only
- **Smooth transitions:** `duration-200` for buttons, `duration-300` for cards
- **Color shifts:** Darken orange on hover, not color changes

### Hover Patterns
```css
/* Cards */
hover:shadow-lg hover:-translate-y-1 transition-all duration-300

/* Primary Buttons */
hover:from-yellow-600 hover:to-orange-600 hover:shadow-lg hover:scale-[1.01]

/* Navigation Links */
hover:text-orange-600 transition-colors duration-200

/* Background Interactions */
hover:bg-orange-50 - Subtle background warmth
```

### Interaction Constraints
- **No aggressive animations** - Keep movements subtle
- **Consistent timing** - 200ms for buttons, 300ms for cards
- **Predictable behavior** - Same hover pattern for similar elements
- **Accessibility first** - Respect `prefers-reduced-motion`

---

## 13. Motion & Animation Rules

### Animation Philosophy
- **Purposeful motion** - Every animation serves user understanding
- **Reduced motion respect** - `useReducedMotion() hook implemented
- **Entrance animations only** - No continuous animations
- **Performance optimized** - GPU-accelerated transforms

### Animation Patterns
```javascript
// Standard entrance animation
initial: { opacity: 0, y: 40 }
whileInView: { opacity: 1, y: 0 }
transition: { duration: 0.6, ease: "easeOut" }
viewport: { once: true, amount: 0.3 }

// Staggered animations
transition: { duration: 0.5, delay: 0.1 * index, ease: "easeOut" }
```

### Animation Rules
1. **Reduced motion support required** - Check `prefers-reduced-motion`
2. **Entrance animations only** - No looping or continuous motion
3. **Consistent easing** - `easeOut` for natural feel
4. **Viewport-based triggers** - Animate when scrolled into view

---

## 14. Responsive Behavior

### Breakpoint System
- **Mobile:** `default` (< 768px) - Single column, compact spacing
- **Tablet:** `md:` (768px+) - Two columns, medium spacing
- **Desktop:** `lg:` (1024px+) - Three columns, full spacing
- **Large Desktop:** `xl:` (1280px+) - Maximum layouts

### Responsive Patterns
- **Typography:** `text-4xl md:text-5xl lg:text-6xl` - Progressive scaling
- **Grids:** `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` - Progressive columns
- **Spacing:** `py-12 md:py-16 lg:py-20` - Progressive padding
- **Navigation:** Mobile hamburger → Desktop full menu

### Mobile Considerations
- **Touch-friendly targets** - Minimum 44px touch targets
- **Simplified navigation** - Hamburger menu with clear hierarchy
- **Readable text sizes** - No smaller than 14px on mobile
- **Condensed layouts** - Tighter spacing on small screens

---

## 15. Accessibility Expectations

### Semantic HTML
- **Proper heading hierarchy** - One h1 per page, logical h2-h6 structure
- **Button semantics** - Use `<button>` for actions, not styled divs
- **Link semantics** - Use `<a>` for navigation, not button clicks
- **Form labels** - Proper label association with form inputs

### Accessibility Features
- **Focus management** - Visible focus rings, logical tab order
- **Screen reader support** - Alt text for images, aria labels where needed
- **Keyboard navigation** - All interactive elements keyboard accessible
- **Reduced motion support** - `prefers-reduced-motion` respected

### Focus States
```css
focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2
```

---

## 16. Component Reuse Guidelines

### Required Component Usage
1. **PageContainer** - For consistent max-width and padding
2. **SectionContainer** - For standardized section spacing
3. **PrimaryButton/SecondaryButton** - For all CTAs
4. **SectionHeading** - For consistent section headers
5. **Header/Footer** - For navigation consistency

### Component Customization Rules
- **Extend through props** - Customize via className prop, not modification
- **Maintain core patterns** - Don't break established hover states or timing
- **Consistent props interface** - Use same prop patterns across components
- **Design system alignment** - Custom components must follow design tokens

---

## 17. Elements That Must Remain Consistent

### Global Brand Elements
- **Orange gradient CTAs** - Color, rounded-full, hover behavior
- **Typography scale** - Poppins headings, Inter body, weight hierarchy
- **Spacing rhythm** - Standard section padding, container widths
- **Card design language** - White backgrounds, subtle shadows, hover lift
- **Navigation behavior** - Active state underline, mobile hamburger

### Visual Design Language
- **Color usage** - Orange for interaction, grays for structure
- **Border radius** - rounded-2xl for cards, rounded-full for buttons
- **Shadow system** - Subtle to strong hierarchy
- **Interaction patterns** - Consistent hover states and transitions

### Content Patterns
- **Tone of voice** - Professional but approachable, founder-led
- **Messaging hierarchy** - Outcome-focused over feature-focused
- **Proof integration** - Internal products as primary credibility

---

## 18. Elements Intentionally Allowed to Vary

### Page-Specific Variations
- **Hero content** - Each page can have unique hero messaging and layout
- **Section ordering** - Pages can have different section flows
- **Content focus** - Pages can emphasize different aspects of the business
- **Visual accents** - Pages can use different supporting imagery/graphics

### Flexible Elements
- **Section-specific components** - New components allowed for page-specific needs
- **Content density** - Pages can have different amounts of content
- **Visual hierarchy emphasis** - Pages can highlight different elements
- **Background treatments** - Pages can use different background approaches

---

## 19. DO NOT - Violations of Design Language

### Practices That Violate Standards
- ❌ **Multiple gradient accents per section** - Competes with orange primary
- ❌ **Aggressive animations** - No dramatic transforms or continuous motion
- ❌ **Inconsistent border radius** - Don't mix rounded styles arbitrarily
- ❌ **Rainbow color usage** - Orange brand color only for interactions
- ❌ **Template patterns** - Avoid generic web template layouts
- ❌ **Decorative overuse** - No nested decorative elements or visual noise
- ❌ **Inconsistent hover timing** - Maintain 200ms/300ms standards
- ❌ **Broken semantic HTML** - Maintain proper heading hierarchy and element semantics
- ❌ **Accessibility shortcuts** - No skipping focus management or reduced motion
- ❌ **Component modification** - Don't modify core components, extend through props

### Design Anti-Patterns to Avoid
- ❌ **"Creative" color schemes** - Stay within established palette
- ❌ **Complex animations** - Keep motion subtle and purposeful
- ❌ **Inconsistent spacing** - Follow established rhythm patterns
- ❌ **Mixed typography** - Don't introduce new fonts or weight variations
- ❌ **Visual competition** - One focal point per section maximum

---

## 20. Implementation Verification

### Before Page Launch Checklist
- [ ] Typography scale matches Homepage patterns
- [ ] CTA styling uses orange gradient consistently
- [ ] Section spacing follows standard rhythm
- [ ] Card design language matches reference patterns
- [ ] Hover states follow timing and behavior standards
- [ ] Color usage respects orange primary/gray structure
- [ ] Border radius follows established scale
- [ ] Shadow system maintains subtle hierarchy
- [ ] Responsive behavior matches breakpoint patterns
- [ ] Accessibility features implemented (focus, reduced motion)
- [ ] Component reuse follows guidelines
- [ ] No design language violations present

### Governance Compliance
- **This document overrides** conflicting design specifications
- **Homepage patterns take precedence** over theoretical design systems
- **Implementation consistency** required across all pages
- **Design language integrity** must be preserved

---

## Authority & Governance

**This document establishes the Homepage as the definitive implementation reference** for the TrueSpur website.

**Authority Level:** Implementation Reference Standard  
**Scope:** All website pages beyond Homepage  
**Maintenance:** Update only when Homepage patterns change  
**Compliance:** Required for all future page implementations

**Governance Position:** When implementation guidance is absent, ambiguous, or not explicitly defined within an approved page specification, the Homepage Reference Standard becomes the implementation authority for maintaining visual consistency across the website.

**Hierarchy:** 
1. CURRENT-SOURCE-OF-TRUTH (Strategic Authority)
2. Approved Copy Documents (Content Authority)
3. Approved Design Specifications (Design Authority)
4. Homepage Reference Standard (Implementation Language & Consistency)
5. Live Implementation (Execution Reference)

**When in doubt, reference the Homepage implementation in `app/page.tsx` and follow the established patterns exactly.**

---

*This document was created on June 26, 2026, by analyzing the frozen Homepage implementation to establish visual and implementation standards for subsequent page development.*
