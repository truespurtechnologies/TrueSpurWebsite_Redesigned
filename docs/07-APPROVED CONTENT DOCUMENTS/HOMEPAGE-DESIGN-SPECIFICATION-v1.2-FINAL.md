# HOMEPAGE DESIGN SPECIFICATION v1.2

**Document Type:** Implementation-Ready Design Specification  
**Version:** 1.2 (Final Implementation Version)  
**Date:** June 12, 2026  
**Status:** ✅ APPROVED FOR IMPLEMENTATION — Design Baseline Established  
**Authority:** Aligned with CURRENT-SOURCE-OF-TRUTH.md, FINAL-WEBSITE-STRATEGY.md, HOMEPAGE-COPY-FINAL.md

---

## DOCUMENT PURPOSE

This specification provides complete design guidance for implementing the TrueSpur homepage. All copy is frozen and approved. This document focuses on layout, visual hierarchy, components, and interaction design.

**This is the approved implementation baseline. Strategic decisions and design direction are established. Implementation refinements for technical or accessibility requirements are permitted within the design system.**

**Key Sources:**
- HOMEPAGE-COPY-FINAL.md (v2.1) — All copy is final
- design-system.md (v2.2) — Typography, colors, spacing
- brand-identity-guidelines.md (v3.0) — Brand standards
- SERVICES-SECTION-DESIGN-SOURCE-OF-TRUTH.md — Premium card patterns
- HOMEPAGE-DESIGN-REFINEMENT-REVIEW.md — Approved refinements
- Final Brand Distinctiveness Review — Final validation

---

## DESIGN PHILOSOPHY

### TrueSpur Visual Identity

**Core Principles:**
1. **Premium restraint** — Generous whitespace, typography-led, purposeful elements only
2. **Evidence over decoration** — Real product status, measurable outcomes, third-party validation
3. **Company-first narrative** — 60/40 company/founder balance throughout
4. **Founder-Led Product Studio aesthetic** — Building focus, not consultancy or SaaS template
5. **Purposeful interactions** — Subtle, functional, never flashy

**What Makes This Homepage TrueSpur:**
- Real product portfolio with honest status indicators
- Process shown as connected journey (not static features)
- Healthcare expertise visualized (not just stated)
- Evidence-based proof (government award, measurable outcomes)
- Typography-led design (minimal visual noise)

**What This Homepage Avoids:**
- Generic SaaS patterns (gradient blobs, decorative animations)
- AI startup aesthetics (floating elements, futuristic effects)
- Engineering consultancy feel (blueprint grids, technical schematics)
- Founder hero worship (large photos, extensive biography)
- Marketing fluff (vague claims, arbitrary metrics)

---

## GLOBAL INTERACTION SYSTEM

### Hover State Patterns

**Pattern A: Card Lift**
- **Use For:** Product cards, Process cards, Service cards
- **Default:** `shadow-sm`, `translate-y-0`
- **Hover:** `shadow-lg`, `-translate-y-1` (4px lift)
- **Duration:** `300ms ease-out`
- **Additional:** Left gradient accent opacity 0 → 100%

**Pattern B: CTA Buttons**
- **Primary Gradient:** `scale-[1.03]`, shadow enhancement, `300ms`
- **Secondary Outline:** `bg-white`, `text-slate-900`, `border-white`, `300ms`

### Animation Tokens

**Scroll Reveals:**
- Fade in: `opacity-0` → `opacity-100`, `400ms ease-out`
- Slide up: `translateY(20px)` → `translateY(0)`, `400ms ease-out`
- Stagger delay: `100ms` between elements

**Micro-interactions:**
- Button press: `scale(0.98)`, `150ms`
- Icon hover: `scale(1.1)` or color shift, `200ms`
- Input focus: Border color + shadow, `200ms`

### Motion Principles

1. **Purposeful** — Every animation serves a function
2. **Subtle** — Enhance, don't distract
3. **Fast** — 150-400ms range (never >500ms)
4. **Consistent** — Same patterns for similar elements
5. **Accessible** — Respect `prefers-reduced-motion`

---

## SECTION 1: HERO

### Strategic Purpose
Answer visitor's first question: "What can TrueSpur help me achieve?" Establish credibility and drive primary conversion action.

### Layout Structure

**Desktop (1280px+):**
- Full viewport height (min-h-screen)
- Two-column layout: 60% content / 40% visual space
- Content: Left-aligned, max-width 700px
- Background: Dark slate gradient with subtle texture
- Padding: px-4 py-20 lg:py-24

**Tablet (768px-1279px):**
- Single column, centered
- Content max-width 600px
- Reduced padding: py-16

**Mobile (<768px):**
- Single column, full width
- Content padding: px-4 py-12
- Stack all elements vertically

### Visual Hierarchy

**Primary Element:** Headline (H1)
- Poppins Black (900)
- `text-5xl lg:text-7xl xl:text-8xl` (48/72/96px)
- `leading-[1.15]`
- Color: white
- Maximum attention, largest text on page

**Secondary Element:** Subheadline
- Inter Regular (400)
- `text-lg lg:text-xl` (18/20px)
- `leading-relaxed`
- Color: slate-300
- Supports headline, explains value

**Tertiary Elements:**
- Identity statement: Inter Medium (500), `text-base`, slate-200
- Supporting line: Inter Regular (400), `text-sm lg:text-base`, slate-400
- Both positioned below subheadline with generous spacing

**Primary CTA:** "Start Your Project"
- Gradient button: `from-yellow-500 to-orange-500`
- `text-xl px-10 py-7` (desktop)
- `text-lg px-8 py-6` (mobile)
- Font: Inter Bold (700)
- Shadow: `shadow-2xl shadow-orange-500/40`
- Hover: Scale 1.03, enhanced shadow (Pattern B)

### Component Recommendations

**Background System:**

**Recommended Approach (Clean & Premium):**
```tsx
// Base gradient
<div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />

// Subtle texture overlay
<div className="absolute inset-0 opacity-[0.015]" style={{
  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
}} />

// Optional: Subtle orange glow (very minimal)
<div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 blur-3xl rounded-full" />
```

**Design Rationale:**
- Clean, premium, typography-focused
- Subtle texture adds depth without distraction
- Minimal orange glow suggests brand presence
- Avoids: Gradient blobs (AI startup), blueprint grids (engineering firm)
- Lets typography be the hero

**Typography Stack:**
```tsx
<h1 className="font-heading text-5xl lg:text-7xl xl:text-8xl font-black leading-[1.15] text-white">
  Turn Ideas Into Scalable Digital Products
</h1>

<p className="text-lg lg:text-xl leading-relaxed text-slate-300 mt-6">
  From validation to launch, we help you build products that solve real problems and scale with confidence.
</p>

<p className="text-base text-slate-200 font-medium mt-8">
  Founder-led product studio. Building products — our own and yours.
</p>

<p className="text-sm lg:text-base text-slate-400 mt-3">
  Building products from validation to scale since 2010.
</p>
```

**CTA Button:**
```tsx
<Button className="mt-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xl px-10 py-7 rounded shadow-2xl shadow-orange-500/40 hover:from-yellow-600 hover:to-orange-600 hover:scale-[1.03] transition-all duration-300">
  Start Your Project
</Button>
```

### Visual Content Requirements

**Background:**
- Dark gradient base (slate-900 to slate-950)
- Subtle texture overlay (very low opacity)
- Optional: Minimal orange glow (bottom-right, very subtle)

**No Additional Visual Elements:**
- ❌ No product mockup montage
- ❌ No abstract illustrations
- ❌ No gradient blobs
- ❌ No blueprint grids
- ✅ Typography is the hero

### Interaction Design

**Hover States:**
- CTA button: Pattern B (scale 1.03, shadow enhancement, 300ms)

**Scroll Behavior:**
- Fade to next section smoothly
- No parallax (keep simple)

**Animation on Load:**
- Headline: Fade in + slide up (400ms, 0ms delay)
- Subheadline: Fade in + slide up (400ms, 100ms delay)
- Identity: Fade in (400ms, 200ms delay)
- Supporting: Fade in (400ms, 300ms delay)
- CTA: Fade in + scale (400ms, 400ms delay)

### Mobile Optimization

**Typography Adjustments:**
- H1: `text-4xl` (36px) on mobile
- Subheadline: `text-base` (16px) on mobile
- Maintain readability, reduce size

**CTA Placement:**
- Full width on mobile (max-width 400px)
- Centered
- ❌ **No sticky bottom CTA** (removed — trust-based conversion)

**Spacing:**
- Reduce padding: `py-12` on mobile
- Tighter spacing between elements (mt-4 instead of mt-6)

### Development Notes

**Reusable Components:**
- Hero container pattern (dark background + gradient)
- CTA button component (gradient style)
- Texture overlay component (reusable pattern)

**Performance:**
- Optimize gradient rendering
- Preload critical fonts (Poppins Black, Inter Regular)
- Use CSS for texture pattern (no image file)

---

## SECTION 2: PRODUCT STUDIO SECTION

### Strategic Purpose
Build credibility through shared experience. Explain product studio model briefly without over-education. Connect internal building to founder value.

### Layout Structure

**Desktop:**
- Floating bridge card: Negative margin overlap with Hero (-mt-8 md:-mt-10 lg:-mt-12)
- Card: `max-w-5xl mx-auto`, `rounded-3xl`
- Background: `bg-white/95 backdrop-blur-sm`
- Shadow: `shadow-2xl shadow-slate-900/10`
- Padding: `p-8 md:p-10 lg:p-12`
- Subtle gradient overlay: `from-orange-50/40 via-transparent to-amber-50/30`

**Tablet/Mobile:**
- Same card structure, adjusted padding
- Full width with margins: `mx-4`

### Visual Hierarchy

**Primary:** Section headline (H2)
- Poppins Extrabold (800)
- `text-3xl lg:text-4xl xl:text-5xl`
- Color: gray-900
- Center-aligned

**Secondary:** Body copy
- Inter Regular (400)
- `text-base lg:text-lg`
- Color: gray-600
- Max-width: 800px, centered
- Two short paragraphs

### Component Recommendations

**Bridge Card Component:**
```tsx
<div className="relative -mt-8 md:-mt-10 lg:-mt-12 z-10">
  <div className="container mx-auto px-4">
    <div className="relative mx-auto max-w-5xl">
      <div className="relative rounded-3xl bg-white/95 backdrop-blur-sm shadow-2xl shadow-slate-900/10 border border-gray-100/50 p-8 md:p-10 lg:p-12">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-50/40 via-transparent to-amber-50/30 pointer-events-none" />
        <div className="relative text-center">
          <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900">
            We Understand Product Challenges From the Inside
          </h2>
          <p className="text-base lg:text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
            We're building four products right now—Clinax, Halo, TrueBill, TafsirAI. Each one teaches us what founders face: validating ideas, making tough technical calls, launching without costly mistakes.
          </p>
          <p className="text-base lg:text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
            That's why we build alongside you—not just for you.
          </p>
        </div>
      </div>
    </div>
  </div>
</div>
```

**Note:** ❌ **No founder attribution line** — Maintains company-first narrative. Founder credibility handled in Proof section.

### Visual Content Requirements
- No images required
- Focus on typography and card design
- Subtle gradient overlay for warmth

### Interaction Design
- No hover states (static content card)
- Smooth scroll reveal: Fade in + slide up (400ms)

### Mobile Optimization
- Reduce padding: `p-6` on mobile
- H2: `text-2xl` on mobile
- Body: `text-base` on mobile
- Maintain card structure

### Development Notes
- Bridge card pattern can be reused for other sections
- Ensure z-index layering works with Hero
- Test negative margin overlap on all screen sizes

---

## SECTION 3: PRODUCTS WE'RE BUILDING

### Strategic Purpose
Prove product studio model through action. Demonstrate active building across domains. Show breadth, not depth (homepage context).

### Layout Structure

**Desktop:**
- Section padding: `py-16 md:py-24 lg:py-32`
- Container: `max-w-7xl mx-auto px-4`
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6`
- Section intro: Centered, max-width 800px
- Closing statement: Centered, below cards

**Tablet:**
- Grid: `grid-cols-2 gap-5`

**Mobile:**
- Grid: `grid-cols-1 gap-4`

### Visual Hierarchy

**Primary:** Section headline (H2)
- Poppins Extrabold (800)
- `text-4xl lg:text-5xl xl:text-6xl`
- Color: gray-900
- Center-aligned

**Secondary:** Product cards (equal weight)
- 4 cards in responsive grid
- Each card: Category, product name, description, status badge

**Tertiary:** Section intro and closing statement
- Inter Regular (400)
- `text-base lg:text-lg`
- Color: gray-600

### Component Recommendations

**Enhanced Product Card:**
```tsx
<div className="group relative bg-white rounded-2xl border border-gray-100/80 p-6 lg:p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
  {/* Left gradient accent */}
  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-amber-400 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  
  {/* Category badge */}
  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 mb-4">
    Healthcare Platform
  </span>
  
  {/* Product icon/logo */}
  <div className="h-12 w-12 rounded-xl bg-orange-100/70 flex items-center justify-center mb-4">
    <Icon className="h-6 w-6 text-orange-600" />
  </div>
  
  {/* Product name */}
  <h3 className="font-heading text-xl lg:text-2xl font-semibold text-gray-900 mb-2">
    Clinax
  </h3>
  
  {/* Description */}
  <p className="text-sm lg:text-base text-gray-600 leading-relaxed mb-4">
    Healthcare platform connecting patients, providers, and pharmacies.
  </p>
  
  {/* Status badge */}
  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
    MVP Development
  </span>
</div>
```

**Product Data Structure:**
```typescript
interface Product {
  name: string;
  description: string;
  category: 'Healthcare Platform' | 'Business Tool' | 'AI Application';
  status: 'Production' | 'MVP Development' | 'Beta' | 'Concept';
  icon: IconComponent;
  link?: string;
}
```

**Category Options:**
- Healthcare Platform (Clinax, Halo)
- Business Tool (TrueBill)
- AI Application (TafsirAI)

**Status Badge Colors:**
- Production: `bg-green-100 text-green-700`
- MVP Development: `bg-blue-100 text-blue-700`
- Beta: `bg-purple-100 text-purple-700`
- Concept: `bg-gray-100 text-gray-700`

**What's Removed:**
- ❌ **No progress bars** — Arbitrary metrics reduce credibility
- ❌ **No completion percentages** — High maintenance burden
- ❌ **No build progress indicators** — Feels like vaporware marketing

**What's Kept:**
- ✅ Category badge (shows breadth)
- ✅ Status badge (honest, durable)
- ✅ Simple, scannable format

### Visual Content Requirements

**Product Icons/Logos:**
- Simple icon or first letter in colored circle
- Size: 48px (h-12 w-12)
- Background: `bg-orange-100/70`
- Icon color: `text-orange-600`
- Rounded: `rounded-xl`

**No Product Screenshots:**
- Keep cards clean and consistent
- Focus on category + status information
- Screenshots can be added to individual product pages later

### Interaction Design

**Card Hover:**
- Pattern A (Card Lift)
- Lift: `-translate-y-1` (4px up)
- Shadow: `shadow-sm` → `shadow-lg`
- Left accent: Opacity 0 → 100%
- Duration: 300ms ease-out

**Scroll Animation:**
- Cards stagger in: 100ms delay between each
- Fade in + slide up (400ms per card)

### Mobile Optimization

**Card Adjustments:**
- Padding: `p-6` on mobile
- Icon size: Maintain 48px (touch-friendly)
- Typography: `text-lg` for product name
- Description: `text-sm` on mobile

**Grid:**
- Single column on mobile
- Full width cards with `gap-4`

### Development Notes

**Reusable Pattern:**
- Product card component matches Services card pattern
- Consistent hover states across site (Pattern A)
- Left gradient accent is signature pattern

**Maintenance:**
- Status updates are simple (4 options only)
- No percentage tracking required
- Category rarely changes
- Low-maintenance, high-credibility approach

---

## SECTION 4: HOW WE BUILD PRODUCTS THAT SCALE

### Strategic Purpose
Demonstrate methodology and process. Build confidence in execution capability. Show structured approach to product development.

### Layout Structure

**Desktop:**
- Section padding: `py-16 md:py-24 lg:py-32`
- Container: `max-w-7xl mx-auto px-4`
- Section headline: Centered
- Supporting statement: Centered, max-width 700px
- **Process Timeline:** Horizontal layout with connected steps
- Layout: Flex row with gaps and connectors

**Tablet:**
- Horizontal scroll timeline (if needed)
- Or vertical timeline with top-to-bottom flow

**Mobile:**
- Vertical timeline
- Steps stacked top-to-bottom
- Connecting lines on left side

### Visual Hierarchy

**Primary:** Section headline (H2)
- Poppins Extrabold (800)
- `text-4xl lg:text-5xl xl:text-6xl`
- Color: gray-900
- Center-aligned

**Secondary:** Process step cards (equal weight)
- 5 steps, numbered 01-05
- Horizontal timeline with visual connections
- Each step: Number, title, tagline, description

**Tertiary:** Supporting statement
- Inter Regular (400)
- `text-base lg:text-lg`
- Color: gray-600
- Two lines, centered

### Component Recommendations

**Process Timeline (Desktop):**
```tsx
<div className="process-timeline-container">
  <div className="flex items-start justify-between gap-4 max-w-6xl mx-auto">
    {steps.map((step, index) => (
      <React.Fragment key={step.number}>
        {/* Process step */}
        <div className="flex-1 relative group">
          {/* Step number badge */}
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-heading font-black text-lg mb-4 mx-auto">
            {step.number}
          </div>
          
          {/* Step content */}
          <div className="text-center">
            <h3 className="font-heading text-lg lg:text-xl font-bold text-gray-900 mb-2">
              {step.title}
            </h3>
            <p className="text-sm font-medium text-orange-600 mb-3">
              {step.tagline}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {step.description}
            </p>
          </div>
          
          {/* Hover effect */}
          <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-orange-200/60 transition-colors duration-300 -z-10" />
        </div>
        
        {/* Connector arrow (except after last step) */}
        {index < steps.length - 1 && (
          <div className="flex items-center justify-center pt-6">
            <ArrowRight className="h-6 w-6 text-orange-400" />
          </div>
        )}
      </React.Fragment>
    ))}
  </div>
</div>
```

**Process Timeline (Mobile):**
```tsx
<div className="process-timeline-mobile">
  {steps.map((step, index) => (
    <div key={step.number} className="flex gap-4 mb-8 last:mb-0">
      {/* Left timeline track */}
      <div className="flex flex-col items-center">
        {/* Step number */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white font-heading font-black text-sm">
          {step.number}
        </div>
        
        {/* Connecting line (except last) */}
        {index < steps.length - 1 && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-orange-400 to-amber-400 mt-2" />
        )}
      </div>
      
      {/* Step content */}
      <div className="flex-1 pb-8">
        <h3 className="font-heading text-lg font-bold text-gray-900 mb-1">
          {step.title}
        </h3>
        <p className="text-sm font-medium text-orange-600 mb-2">
          {step.tagline}
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          {step.description}
        </p>
      </div>
    </div>
  ))}
</div>
```

**Design Rationale:**
- Horizontal timeline = Process flow, not feature list
- Connected steps = Sequential thinking
- Left-to-right = Natural reading order
- Number badges = Clear progression
- Arrows = Movement and direction
- Avoids: Generic card grid, static layout

### Visual Content Requirements

**Step Numbers:**
- Circular badges with gradient background
- Poppins Black (900)
- White text
- Gradient: `from-orange-400 to-amber-400`

**Connector Arrows:**
- Lucide React `ArrowRight` icon
- Color: `text-orange-400`
- Size: 24px (h-6 w-6)

### Interaction Design

**Step Hover:**
- Subtle border highlight: `border-orange-200/60`
- No lift (different from card pattern)
- Duration: 300ms

**Scroll Animation:**
- Steps stagger in: 100ms delay between each
- Fade in (400ms per step)

### Mobile Optimization

**Layout:**
- Vertical timeline (top to bottom)
- Connecting lines on left side
- Maintains progression visual

**Typography:**
- Title: `text-lg` on mobile
- Tagline: `text-sm` on mobile
- Description: `text-sm` on mobile

### Development Notes

**Responsive Behavior:**
- Desktop: Horizontal timeline (flex-row)
- Tablet: May need horizontal scroll or switch to vertical
- Mobile: Vertical timeline (guaranteed to work)

**Consistent Pattern:**
- Timeline pattern can be reused for other journey/process sections
- Number badges maintain brand consistency

---

## SECTION 5: DEEP HEALTHCARE EXPERTISE

### Strategic Purpose
Position healthcare as differentiator, not identity. Build credibility through domain expertise. Show depth without dominating page.

### Layout Structure

**Desktop:**
- Section padding: `py-16 md:py-24 lg:py-32`
- Background: Light gray (`bg-gray-50`)
- Container: `max-w-6xl mx-auto px-4`
- **Structure:** Expertise grid above headline, text content below

**Tablet/Mobile:**
- Same structure, adjusted padding and grid

### Visual Hierarchy

**Primary:** Expertise capability grid
- 6 capability blocks in 3×2 grid (desktop)
- Visual-first presentation above headline
- Icons + labels + optional years indicators

**Secondary:** Section headline (H2)
- Poppins Extrabold (800)
- `text-4xl lg:text-5xl xl:text-6xl`
- Color: gray-900
- Center-aligned

**Tertiary:** Body copy
- Inter Regular (400)
- `text-base lg:text-lg`
- Color: gray-600
- Three paragraphs, scannable

### Component Recommendations

**Complete Section:**
```tsx
<section className="py-16 md:py-24 lg:py-32 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="max-w-6xl mx-auto">
      
      {/* Expertise Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto mb-12">
        {capabilities.map(capability => (
          <div key={capability.id} className="capability-block group">
            <div className="flex flex-col items-center text-center p-4 rounded-xl border border-gray-200 bg-white hover:border-orange-200 hover:bg-orange-50/30 transition-all duration-300">
              {/* Icon */}
              <div className="h-10 w-10 rounded-lg bg-orange-100/70 flex items-center justify-center mb-3 group-hover:bg-orange-200/70 transition-colors">
                <capability.icon className="h-5 w-5 text-orange-600" />
              </div>
              
              {/* Label */}
              <span className="text-sm font-medium text-gray-900">
                {capability.name}
              </span>
              
              {/* Optional: Years indicator */}
              {capability.years && (
                <span className="text-xs text-gray-500 mt-1">
                  {capability.years}+ years
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {/* Section Headline */}
      <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-8 text-center">
        Deep Healthcare Expertise
      </h2>
      
      {/* Body Copy */}
      <div className="max-w-4xl mx-auto text-center space-y-6 text-base lg:text-lg text-gray-600">
        <p>Most teams hit a wall with healthcare technology...</p>
        <p>We've navigated it all for over a decade...</p>
        <p>That expertise makes us better builders...</p>
      </div>
      
    </div>
  </div>
</section>
```

**Capability Data:**
```typescript
const capabilities = [
  { id: 1, name: 'EHR Integration', icon: Database, years: 15 },
  { id: 2, name: 'Telemedicine', icon: Video, years: 10 },
  { id: 3, name: 'HIPAA Compliance', icon: Shield, years: 12 },
  { id: 4, name: 'HL7/FHIR', icon: Network, years: 8 },
  { id: 5, name: 'Clinical Workflows', icon: Activity, years: 15 },
  { id: 6, name: 'Healthcare Operations', icon: Settings, years: 15 },
];
```

**What's Removed:**
- ❌ **No government award badge** — Award belongs in Proof section only (single high-impact placement)
- ❌ **No award winner labels** — Avoids repetition and dilution

**What's Kept:**
- ✅ Expertise capability grid (visual, scannable)
- ✅ Domain capabilities with icons
- ✅ Years indicators (optional depth proof)
- ✅ Supporting text narrative

### Visual Content Requirements

**Capability Icons:**
- Lucide React icons
- Size: 20px (h-5 w-5)
- Color: `text-orange-600`
- Background: `bg-orange-100/70`
- Rounded container: `rounded-lg`

**No Additional Visuals:**
- No award certificates
- No product screenshots
- Focus on expertise grid + text

### Interaction Design

**Capability Block Hover:**
- Border: `border-gray-200` → `border-orange-200`
- Background: `bg-white` → `bg-orange-50/30`
- Icon background: `bg-orange-100/70` → `bg-orange-200/70`
- Duration: 300ms

**Scroll Animation:**
- Grid fade in (400ms)
- Headline fade in + slide up (400ms, 100ms delay)
- Text fade in (400ms, 200ms delay)

### Mobile Optimization

**Grid:**
- 2 columns on mobile (`grid-cols-2`)
- Smaller padding in blocks (`p-3`)
- Maintain icon size (touch-friendly)

**Typography:**
- H2: `text-3xl` on mobile
- Body: `text-base` on mobile
- Maintain readability

**Spacing:**
- Reduce padding: `py-12` on mobile
- Grid margin bottom: `mb-8` on mobile

### Development Notes

**Design Rationale:**
- Visual-first approach (grid before text)
- Scannable at a glance
- Shows breadth of expertise quickly
- Text provides depth and narrative
- Avoids: Wall of text, buried expertise

**Icon Selection:**
- Use Lucide React library
- Choose icons that clearly represent each capability
- Maintain consistent icon style

---

## SECTION 6: PROVEN TRACK RECORD

### Strategic Purpose
Build trust through balanced company/founder proof. Show active building (company) and third-party validation (founder). 60% company / 40% founder balance.

### Layout Structure

**Desktop:**
- Section padding: `py-16 md:py-24 lg:py-32`
- Container: `max-w-7xl mx-auto px-4`
- Two-column layout: Company proof (left) / Founder proof (right)
- Grid: `grid-cols-1 lg:grid-cols-2 gap-12`

**Tablet/Mobile:**
- Single column
- Company proof first, founder proof second

### Visual Hierarchy

**Primary:** Section headline (H2)
- Poppins Extrabold (800)
- `text-4xl lg:text-5xl xl:text-6xl`
- Color: gray-900
- Center-aligned

**Secondary:** Subsection headlines (H3)
- Poppins Bold (700)
- `text-2xl lg:text-3xl`
- Color: gray-900

**Tertiary:** Body copy and proof elements
- Inter Regular (400)
- `text-base lg:text-lg`
- Color: gray-600

### Component Recommendations

**Company Proof Column:**
```tsx
<div className="space-y-6">
  <h3 className="font-heading text-2xl lg:text-3xl font-bold text-gray-900">
    Active Product Studio
  </h3>
  
  <p className="text-base lg:text-lg text-gray-600">
    Four products in active development. From healthcare platforms to AI tools. Each one proves our model works and teaches us something we bring to yours.
  </p>
  
  {/* Product logos grid */}
  <div className="grid grid-cols-2 gap-4 mt-6">
    {products.map(product => (
      <div className="flex items-center justify-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
        <img src={product.logo} alt={product.name} className="h-8" />
      </div>
    ))}
  </div>
</div>
```

**Founder Proof Column:**
```tsx
<div className="space-y-6">
  <h3 className="font-heading text-2xl lg:text-3xl font-bold text-gray-900">
    Government-Recognized Innovation
  </h3>
  
  <p className="text-base lg:text-lg text-gray-600">
    Our founder won a competitive healthcare contract from the Government of India—beating multinational corporations. When a critical healthcare platform was failing at 5% success, we turned it around to 80%+ within months.
  </p>
  
  <p className="text-base font-semibold text-gray-700">
    Third-party validation. Measurable outcomes.
  </p>
</div>
```

**Note:** This is the **only section** where government award appears. Single high-impact placement.

### Visual Content Requirements

**Company Proof:**
- 4 product logos (Clinax, Halo, TrueBill, TafsirAI)
- Simple logo lockups or wordmarks
- Grid layout: 2×2
- White background cards with subtle borders

**Founder Proof:**
- Text-based (no images needed)
- Government award story (narrative only)
- Measurable outcome (5% → 80%+)
- Third-party validation emphasis

### Interaction Design

**Minimal Interaction:**
- No hover states on proof elements
- Smooth scroll reveal: Fade in + slide up (400ms)
- Stagger columns: 100ms delay

### Mobile Optimization

**Layout:**
- Stack vertically: Company proof → Founder proof
- Full width on mobile
- Maintain visual hierarchy

**Typography:**
- H3: `text-xl` on mobile
- Body: `text-base` on mobile

### Development Notes

**Balance:**
- Company proof gets 60% visual weight (larger, first)
- Founder proof gets 40% visual weight (smaller, second)
- Both important, but company leads

**Government Award Strategy:**
- Appears ONLY in this section
- Full narrative with context
- Measurable outcome included
- Maximum impact through single placement

---

## SECTION 7: FINAL CTA

### Strategic Purpose
Convert visitors who've read entire page. Provide clear next steps. Low-pressure, honest conversation positioning.

### Layout Structure

**Desktop:**
- Section padding: `py-16 md:py-24 lg:py-32`
- Background: Dark slate gradient (matches Hero)
- Container: `max-w-4xl mx-auto px-4`
- Content: Centered
- Two CTA buttons: Primary + Secondary

**Tablet/Mobile:**
- Same structure, adjusted padding
- Stack buttons vertically on mobile

### Visual Hierarchy

**Primary:** Section headline (H2)
- Poppins Extrabold (800)
- `text-4xl lg:text-5xl xl:text-6xl`
- Color: white
- Center-aligned

**Secondary:** Supporting copy
- Inter Regular (400)
- `text-base lg:text-lg`
- Color: slate-300
- Two short paragraphs

**Primary CTA:** "Start Your Project"
- Gradient button (same as Hero)
- Prominent, first position

**Secondary CTA:** "Schedule a Call"
- Outline button
- Border: `border-orange-400/60`
- Text: slate-100
- Hover: Fill white, text slate-900

### Component Recommendations

**CTA Section:**
```tsx
<section className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-6">
        Have an Idea Worth Building?
      </h2>
      
      <div className="space-y-4 text-base lg:text-lg text-slate-300 mb-10">
        <p>Whether you're validating a concept or ready to build, let's talk. We'll discuss your product, your goals, and whether we're the right partner.</p>
        <p>No sales pitch. Just an honest conversation about what you're building.</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-lg px-8 py-6 rounded-full hover:scale-[1.03] transition-all duration-300">
          Start Your Project
        </Button>
        <Button variant="outline" className="border-2 border-orange-400/60 text-slate-100 text-lg px-8 py-6 rounded-full hover:bg-white hover:text-slate-900 hover:border-white transition-all duration-300">
          Schedule a Call
        </Button>
      </div>
    </div>
  </div>
</section>
```

### Visual Content Requirements
- No images required
- Focus on typography and CTAs
- Optional: Subtle texture (same as Hero)

### Interaction Design

**CTA Hover States:**
- Primary: Pattern B (scale 1.03, shadow enhancement, 300ms)
- Secondary: Fill white, text color change, 300ms

### Mobile Optimization

**Button Layout:**
- Stack vertically on mobile
- Full width (max-width 400px)
- Maintain touch-friendly size (min 44px height)

**Typography:**
- H2: `text-3xl` on mobile
- Body: `text-base` on mobile

### Development Notes

**CTA Destinations:**
- "Start Your Project" → Contact form or lead form dialog
- "Schedule a Call" → Calendar booking link (Calendly, etc.)

---

## HOMEPAGE DESIGN RISK ASSESSMENT

### Areas Requiring Visual Support

**High Priority:**
1. **Product logos/icons** — Need simple, recognizable product branding
2. **Founder photo** — Professional headshot for About page (not homepage)

**Medium Priority:**
3. **Background texture** — CSS pattern (no image file needed)
4. **Capability icons** — Lucide React library (no custom assets)

**Low Priority:**
5. **Illustrations** — Not needed, can be added later
6. **Video content** — Defer to post-launch

### Areas Where Content May Become Visually Heavy

**Healthcare Section:**
- Risk: Too much technical jargon
- Mitigation: Expertise grid provides visual break
- Keep text to 3 paragraphs, scannable

**Proof Section:**
- Risk: Too much founder biography
- Mitigation: Strict 60/40 company/founder balance
- Visual break: Product logos

### Potential UX Issues

**Hero CTA:**
- Issue: Single CTA may not serve all visitor types
- Mitigation: Secondary CTA in Section 7 ("Schedule a Call")
- Test: A/B test single vs dual CTA in Hero

**Product Cards:**
- Issue: 4 products may feel sparse
- Mitigation: Strong card design, generous spacing
- Future: Add more products as they develop

**Mobile Navigation:**
- Issue: Long page, many sections
- Mitigation: Sticky header, smooth scroll anchors
- Enhancement: Progress indicator (optional)

### Potential Conversion Issues

**Friction Points:**
1. No pricing information (intentional — consultation model)
2. No case studies (addressed via product portfolio)
3. Limited social proof (addressed via government award)

**Mitigation Strategies:**
- Clear CTAs at Hero and Final sections
- Multiple proof points throughout page
- Low-pressure language ("honest conversation")

---

## ASSET COLLECTION CHECKLIST

### Founder Assets Needed
- [ ] Professional founder photo (high-res, 1000×1000px minimum) — **For About page only**
- [ ] Optional: Founder workspace photo (authentic, not staged)

### Product Assets Needed
- [ ] Clinax logo or icon (SVG preferred)
- [ ] Halo logo or icon (SVG preferred)
- [ ] TrueBill logo or icon (SVG preferred)
- [ ] TafsirAI logo or icon (SVG preferred)

### Brand Assets Needed
- [ ] TrueSpur logo (SVG, multiple variations)
- [ ] Favicon (ICO, PNG, multiple sizes)
- [ ] Social media images (OG images, Twitter cards)

### Technical Assets
- [ ] Poppins font files (WOFF2, weights 400-900)
- [ ] Inter font files (WOFF2, weights 400-700)
- [ ] Icon library setup (Lucide React)

**Note:** No government award certificate image needed — text narrative is sufficient.

---

## DESIGN IMPLEMENTATION PRIORITY

### Phase 1: Foundation (Week 1-2)
1. Set up design system (typography, colors, spacing)
2. Create reusable card component (Pattern A hover)
3. Build Hero section (clean background, typography-led)
4. Build Product Studio bridge section

### Phase 2: Core Sections (Week 3-4)
5. Build Products section with enhanced cards (category + status)
6. Build Process section with horizontal timeline
7. Build Healthcare section with expertise grid

### Phase 3: Proof & Conversion (Week 5-6)
8. Build Proof section (two-column layout)
9. Build Final CTA section
10. Implement all CTAs and form integrations

### Phase 4: Polish (Week 7-8)
11. Add animations and micro-interactions (Global Interaction System)
12. Mobile optimization pass
13. Performance optimization
14. Accessibility audit

---

## SUCCESS CRITERIA

### Design Quality
- [ ] Matches premium standards of Services section (A+ 98/100)
- [ ] Consistent typography throughout (Poppins + Inter)
- [ ] Proper spacing and whitespace (py-16 md:py-24 lg:py-32)
- [ ] Subtle, purposeful animations (200-300ms)
- [ ] Accessible (WCAG 2.1 AA compliant)

### Conversion Optimization
- [ ] Clear value proposition in Hero (above fold)
- [ ] Multiple proof points throughout page
- [ ] Clear CTAs at Hero and Final sections
- [ ] Low-friction conversion path
- [ ] Mobile-optimized for all screen sizes

### Brand Consistency
- [ ] Orange brand color (#F97316) used consistently
- [ ] Gradient CTAs (yellow-500 to orange-500)
- [ ] Whisper-soft borders (gray-100/80)
- [ ] Premium card patterns throughout
- [ ] Restraint over decoration (design principle)

### Technical Performance
- [ ] Page load time <2 seconds
- [ ] Lighthouse score >90
- [ ] Mobile-friendly (Google test)
- [ ] No layout shift (CLS <0.1)
- [ ] Smooth animations (60fps)

### Brand Distinctiveness
- [ ] Homepage feels unmistakably TrueSpur (not generic SaaS)
- [ ] Product studio identity clear from Hero section
- [ ] Building/craftsmanship signals throughout
- [ ] Evidence-based proof (not marketing fluff)
- [ ] Company-first narrative maintained (60/40 balance)

---

## 🔒 SPECIFICATION STATUS

### ✅ APPROVED FOR IMPLEMENTATION

**This specification is complete, validated, and ready for implementation.**

### Design Baseline Established

**Approved and Fixed:**
- Strategic positioning and messaging
- Homepage architecture and section order
- Visual design direction and philosophy
- Component patterns and interaction system
- Typography hierarchy and spacing standards

**Implementation Refinements Permitted:**
- Technical implementation details within design system
- Accessibility enhancements (WCAG compliance)
- Performance optimizations
- Component variations for edge cases
- Mobile-specific adjustments within approved patterns

**Not Permitted Without Review:**
- Strategic repositioning
- Section reordering or removal
- New homepage sections
- Design philosophy changes
- Major visual direction shifts

### Strategic Alignment ✅
- [x] All approved copy unchanged
- [x] Positioning preserved (Founder-Led Product Studio)
- [x] Messaging hierarchy maintained
- [x] Homepage architecture intact
- [x] Section order unchanged
- [x] 60/40 company/founder balance preserved
- [x] Healthcare as differentiator, not identity
- [x] Conversion focus maintained

### Design Alignment ✅
- [x] Premium standards maintained (A+ benchmark)
- [x] Typography hierarchy preserved (Poppins + Inter)
- [x] Generous whitespace throughout
- [x] Consistent interaction patterns (Global System)
- [x] Reduced visual repetition across sections
- [x] Each section has unique visual treatment
- [x] Mobile optimization strategy defined

### Brand Alignment ✅
- [x] Distinctively TrueSpur (not generic SaaS)
- [x] Product studio aesthetic (not consultancy or AI startup)
- [x] Evidence over decoration (real status, proof, outcomes)
- [x] Company-first narrative (no founder hero worship)
- [x] Ground work philosophy integrated (process timeline, expertise grid)
- [x] Purposeful interactions only (no flashy effects)

### Implementation Readiness ✅
- [x] All sections fully specified
- [x] Component code examples provided
- [x] Interaction patterns centralized
- [x] Mobile optimization defined
- [x] Asset checklist complete
- [x] Implementation priority phased
- [x] Success criteria measurable

---

## � VERSION HISTORY

### Changes Applied in v1.2 (Final Implementation Version):
1. ✅ Refined Hero supporting line for product-studio positioning
2. ✅ Updated Healthcare capability label (Government Healthcare → Healthcare Operations)
3. ✅ Updated governance wording for implementation clarity

### Changes Applied in v1.1:
1. ✅ Removed blueprint grid recommendation (replaced with clean texture approach)
2. ✅ Removed product progress bars (kept category + status only)
3. ✅ Removed founder attribution line (maintained company-first narrative)
4. ✅ Removed government award from Healthcare section (single placement in Proof section)
5. ✅ Integrated approved refinements (process timeline, expertise grid, enhanced product cards)
6. ✅ Created Global Interaction System (centralized hover/animation specs)
7. ✅ Defined TrueSpur Visual Identity principles

### What Makes This Homepage Distinctively TrueSpur:
- Clean, typography-led Hero (not gradient blobs or blueprint grids)
- Real product portfolio with honest status (not vaporware)
- Process shown as connected journey (not static grid)
- Healthcare expertise visualized (not buried in text)
- Evidence-based proof with single award placement (not repetition)
- Company-first narrative throughout (not founder-centric)
- Premium restraint and purposeful interactions (not flashy effects)

### Implementation Governance

This specification is the **Homepage Design Source of Truth** for implementation. Strategic decisions, section architecture, and design direction are approved and should not be revisited. Implementation refinements for technical or accessibility requirements are permitted within the established design system.

---

**Document Version:** 1.2 (Final Implementation Version)  
**Last Updated:** June 12, 2026  
**Status:** ✅ **APPROVED FOR IMPLEMENTATION** — Design Baseline Established  
**Next Steps:** Begin Phase 1 implementation (Foundation)  
**Next Document:** About Page Design Specification
