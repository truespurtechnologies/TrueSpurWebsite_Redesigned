# SERVICES PAGE DESIGN SPECIFICATION

**Document Type:** Implementation-Ready Design Specification  
**Version:** 1.4 (Governance Aligned)  
**Date:** July 2, 2026  
**Status:** ✅ FROZEN FOR IMPLEMENTATION — Aligned with Frozen Design System  
**Authority:** Aligned with SERVICES-PAGE-COPY-FINAL.md, FINAL-WEBSITE-STRATEGY.md, docs/05-DESIGN-SYSTEM/design-system.md (v2.2), docs/05-DESIGN-SYSTEM/brand-identity-guidelines.md (v3.0), Frozen CTA Component System

---

## DOCUMENT PURPOSE

This specification provides complete design guidance for implementing the TrueSpur Services Page. All copy is frozen and approved in SERVICES-PAGE-COPY-FINAL.md (v1.0). This document focuses on layout, visual hierarchy, components, interaction design, and conversion optimization.

**This specification reuses the governance discipline, component consistency, and premium restraint philosophy established in Homepage Design Specification v1.2 while adapting for the Services Page's conversion-focused purpose.**

**Key Sources:**
- docs/03-APPROVED COPY/SERVICES-PAGE-COPY-FINAL.md (v1.0) — All copy is final (750 words, conversion-optimized)
- docs/05-DESIGN-SYSTEM/design-system.md (v2.2) — Typography, colors, spacing, animation tokens
- docs/05-DESIGN-SYSTEM/brand-identity-guidelines.md (v3.0) — Brand standards and color system
- docs/02-COMPANY-STRATEGY/FINAL-WEBSITE-STRATEGY.md (v2.0) — Product studio positioning
- components/cta/PrimaryButton.tsx — Frozen reusable primary CTA component
- components/cta/SecondaryButton.tsx — Frozen reusable secondary CTA component
- components/layout/Header.tsx, Footer.tsx, PageContainer.tsx — Frozen shared layout components
- Mature architecture established by Homepage, About, and Products implementations

---

## DESIGN PHILOSOPHY FOR SERVICES PAGE

### TrueSpur Services Page Identity

**Core Principles (Inherited from Homepage):**
1. **Premium restraint** — Generous whitespace, typography-led, purposeful elements only
2. **Evidence over decoration** — Real capabilities, honest differentiation, no agency clichés
3. **Founder-Led Product Studio aesthetic** — Building focus, not transactional service catalog
4. **Purposeful interactions** — Subtle, functional, never flashy
5. **Conversion-focused design** — Clear hierarchy, scannable content, strategic CTAs

**Services Page Specific Principles:**
6. **Consultative over transactional** — Partnership feel, not vendor catalog
7. **Outcome-focused presentation** — Benefits before features, value before process
8. **Founder-to-founder tone** — Empathy, shared experience, honest conversation
9. **Differentiation without defensiveness** — Show what makes TrueSpur different without attacking competitors
10. **Trust-building progression** — Journey from capability → differentiation → philosophy → conversion

**What Makes This Services Page TrueSpur:**
- Founder journey visualization shows process as partnership, not transaction
- Service cards emphasize outcomes over features
- Differentiation narrative grounded in product studio experience
- Engagement philosophy demonstrates honesty and long-term thinking
- Trust signals feel earned (product building, PM background, healthcare expertise)

**What This Services Page Avoids:**
- ❌ Agency brochure aesthetics (feature lists, technology badges, generic claims)
- ❌ Transactional catalog feel (pricing tables, package tiers, comparison charts)
- ❌ Defensive positioning ("unlike other agencies" language)
- ❌ Corporate consulting layouts (process diagrams, methodology frameworks)
- ❌ Excessive animations or visual clutter

---

## STRATEGIC POSITIONING

### Page Purpose

**Primary Goal:** Convert interested founders into conversations

**Secondary Goals:**
1. Explain how TrueSpur helps founders build products
2. Differentiate through product studio model and founder perspective
3. Build trust through honest partnership philosophy
4. Demonstrate capability across strategy, design, and engineering
5. Create low-pressure conversion path

### Visitor Questions This Page Answers

1. **"What can TrueSpur help me build?"** → 5 service offerings with outcome-focused descriptions
2. **"How is TrueSpur different from agencies?"** → Product studio model, founder perspective, active building
3. **"Can I trust you?"** → Honest engagement philosophy, shared challenges, long-term thinking
4. **"What's the process?"** → Founder journey from idea to product
5. **"What should I do next?"** → Clear, low-pressure CTAs

### Page Architecture (6 Sections)

**Section 1: Hero**
- Typography-led white background
- "We Build Products. We Help You Build Yours." headline
- Two CTAs: "Start Your Project" + "Schedule a Call"

**Section 2: From Idea to Product**
- Founder journey context
- Explains the challenge and TrueSpur's approach
- Light gray background

**Section 3: What We Offer (Services Grid)**
- 5 service cards in responsive grid
- Outcome-focused positioning statements
- White background

**Section 4: Why Founders Work With Us**
- Product studio differentiation
- Three trust themes: Founder thinking, Product thinking, Active building
- Light gray background

**Section 5: How We Work With Founders**
- Engagement philosophy
- Four principles: Honest conversations, Challenge assumptions, Think long-term, Build alongside
- White background

**Section 6: Final CTA**
- Conversion-focused invitation
- Two CTAs: "Start Your Project" + "Schedule a Call"
- Light gray background

### Page Flow Governance

**Approved Narrative Sequence:**

```
Hero
  ↓
From Idea to Product
  ↓
What We Offer
  ↓
Why Founders Work With Us
  ↓
How We Work With Founders
  ↓
Final CTA
```

**Strategic Rationale:**

This six-section flow creates a conversion-optimized trust-building progression:
1. **Hero** — Immediate clarity (what we do)
2. **Journey** — Empathy (we understand your challenges)
3. **Services** — Capability (what we can help with)
4. **Differentiation** — Trust (why choose us)
5. **Philosophy** — Partnership (how we work)
6. **CTA** — Conversion (low-pressure invitation)

**Prohibited Changes Without Strategic Approval:**

- ❌ Inserting new sections between approved sections
- ❌ Reordering sections
- ❌ Removing sections
- ❌ Adding testimonials, case studies, or social proof sections
- ❌ Adding pricing, packages, or comparison tables
- ❌ Adding team bios or company history
- ❌ Adding FAQ or support sections

**Rationale:**

Each section serves a specific conversion purpose. The sequence is strategic, not arbitrary. Adding sections disrupts the trust-building progression and dilutes conversion focus.

**Allowed Enhancements:**

- ✅ Refining content within existing sections
- ✅ Adding optional visual enhancements (e.g., Founder Journey Visualization, Credibility Theme Cards)
- ✅ Improving accessibility or mobile optimization
- ✅ Performance optimizations

**Governance Principle:**

The Services Page is a conversion-focused narrative, not a comprehensive information repository. Maintain focus, maintain flow, maintain conversion optimization.

---

## GLOBAL INTERACTION SYSTEM

### Hover State Patterns

**Pattern A: Service Card Lift**
- **Use For:** Service cards (Section 3)
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
- Card hover: Pattern A (lift + shadow + accent)
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
Create immediate clarity. Answer "What does TrueSpur do?" Position as product builders who help founders, not just service providers.

### Layout Structure

**Desktop (1280px+):**
- Section padding: py-20 md:py-24 lg:py-28
- Background: white
- Container: max-w-5xl mx-auto px-4
- Content: Centered, single column
- No visual elements (typography-led)

**Tablet/Mobile:**
- Padding: py-16 md:py-20
- Same centered structure
- Maintain readability

### Visual Hierarchy

**Primary Element:** Headline (H1)
- Poppins Black (900)
- `text-5xl lg:text-6xl xl:text-7xl` (48/60/72px)
- `leading-tight` (1.25)
- Color: gray-900
- Center-aligned
- Core message: "We Build Products. We Help You Build Yours."

**Secondary Element:** Supporting copy
- Inter Regular (400)
- `text-lg lg:text-xl` (18/20px)
- `leading-relaxed` (1.625)
- Color: gray-600
- Max-width: 700px, centered
- Two sentences explaining value proposition

**Primary CTA:** "Start Your Project"
- **Component:** `PrimaryButton` (components/cta/PrimaryButton.tsx)
- **Size:** `lg` (px-10 py-4)
- **Styling:** Frozen component handles all styling (gradient, shadow, hover states)
- **Implementation:** Use reusable component without page-specific overrides

**Secondary CTA:** "Schedule a Call"
- **Component:** `SecondaryButton` (components/cta/SecondaryButton.tsx)
- **Variant:** `light` (border-orange-500, text-orange-600)
- **Size:** `lg` (px-10 py-4)
- **Styling:** Frozen component handles all styling (border, hover states)
- **Implementation:** Use reusable component without page-specific overrides

### Component Implementation

```tsx
import { PrimaryButton } from '@/components/cta/PrimaryButton'
import { SecondaryButton } from '@/components/cta/SecondaryButton'

<section className="py-20 md:py-24 lg:py-28 bg-white">
  <div className="container mx-auto px-4">
    <div className="max-w-5xl mx-auto text-center">
      
      <h1 className="font-heading text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-gray-900">
        We Build Products. We Help You Build Yours.
      </h1>
      
      <p className="text-lg lg:text-xl leading-relaxed text-gray-600 mt-6 max-w-3xl mx-auto">
        From validating your idea to launching a product people want to use, we partner with founders to turn concepts into real products. Product strategy, design, and engineering—integrated into one team that thinks like founders, not vendors.
      </p>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
        <PrimaryButton size="lg">
          Start Your Project
        </PrimaryButton>
        
        <SecondaryButton size="lg" variant="light">
          Schedule a Call
        </SecondaryButton>
      </div>
      
    </div>
  </div>
</section>
```

**Implementation Notes:**
- Use frozen `PrimaryButton` and `SecondaryButton` components
- Do NOT add page-specific className overrides
- Do NOT modify component styling inline
- Components handle all hover states, shadows, and transitions
- Consistent with Homepage, About, and Products implementations

### Visual Content Requirements
- No images required
- Typography-led design
- Clean, premium, direct

### Interaction Design

**Hover States:**
- Primary CTA: Handled by frozen `PrimaryButton` component (scale-[1.02], shadow enhancement, 200ms)
- Secondary CTA: Handled by frozen `SecondaryButton` component (bg-orange-50, border-orange-600, -translate-y-0.5, 200ms)
- **Note:** Do NOT override component hover states with page-specific styling

**Scroll Behavior:**
- Fade to next section smoothly
- No parallax (keep simple)

**Animation on Load:**
- Headline: Fade in + slide up (400ms, 0ms delay)
- Supporting copy: Fade in + slide up (400ms, 100ms delay)
- CTAs: Fade in (400ms, 200ms delay)

### Mobile Optimization

**Typography Adjustments:**
- H1: `text-4xl` (36px) on mobile
- Supporting copy: `text-base` (16px) on mobile
- Maintain readability

**CTA Layout:**
- Stack vertically on mobile (flex-col)
- Full width buttons (max-width 400px each)
- Centered

**Spacing:**
- Reduce padding: `py-16` on mobile
- Tighter spacing between elements (mt-4 instead of mt-6)

### Development Notes

**Reusable Components:**
- `PrimaryButton` (components/cta/PrimaryButton.tsx) — Frozen gradient CTA
- `SecondaryButton` (components/cta/SecondaryButton.tsx) — Frozen outline CTA with light/dark variants
- Two-CTA layout pattern (Hero + Final CTA sections)
- **Implementation:** Import and use frozen components without modifications

**Performance:**
- Preload critical fonts (Poppins Black, Inter Regular)
- No images to optimize

---

## SECTION 2: FROM IDEA TO PRODUCT

### Strategic Purpose
Explain the founder journey. Set context for services. Build empathy through shared challenges. Position TrueSpur as guide, not just executor.

### Layout Structure

**Desktop:**
- Section padding: py-16 md:py-24 lg:py-32
- Background: bg-gray-50 (light gray)
- Container: max-w-5xl mx-auto px-4
- Content: Centered, single column
- Three paragraphs

**Tablet/Mobile:**
- Same structure, adjusted padding
- Maintain paragraph breaks for scannability

### Visual Hierarchy

**Primary:** Section headline (H2)
- Poppins Extrabold (800)
- `text-4xl lg:text-5xl xl:text-6xl`
- Color: gray-900
- Center-aligned
- mb-8

**Secondary:** Body copy (3 paragraphs)
- Inter Regular (400)
- `text-base lg:text-lg`
- Color: gray-600
- Max-width: 800px, centered
- Spacing: space-y-4 (16px between paragraphs)

### Component Recommendations

```tsx
<section className="py-16 md:py-24 lg:py-32 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="max-w-5xl mx-auto text-center">
      
      <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-8">
        From Idea to Product
      </h2>
      
      <div className="max-w-4xl mx-auto space-y-4 text-base lg:text-lg text-gray-600">
        <p>
          Most founders face the same challenge: they know what problem they want to solve, but need help turning that vision into a product people will use.
        </p>
        <p>
          We guide you through the entire journey—from validating demand to designing experiences to building software that can evolve with your business to launching with confidence.
        </p>
        <p>
          We don't just execute requirements. We challenge assumptions, suggest better approaches, and help you avoid mistakes we've already made building our own products.
        </p>
      </div>
      
    </div>
  </div>
</section>
```

### Founder Journey Visualization (Required Component)

**Purpose:** Visual representation of the founder journey from idea to product. This component strengthens the "guide from idea to product" positioning and differentiates TrueSpur from transactional service catalogs.

**Framework:**
- Validate → Define → Design → Build → Launch & Learn

**Implementation Pattern: Card-Based Journey**
```tsx
<div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
  {steps.map((step, index) => (
    <div key={step.id} className="relative bg-white rounded-xl border border-gray-100/80 p-5 shadow-sm">
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-amber-400 rounded-l-xl" />
      <div className="text-center">
        <div className="w-10 h-10 rounded-full bg-orange-100/70 flex items-center justify-center text-orange-600 font-heading font-black text-sm mb-3 mx-auto">
          {index + 1}
        </div>
        <h4 className="font-heading text-sm font-semibold text-gray-900 mb-1">
          {step.title}
        </h4>
        <p className="text-xs text-gray-600">
          {step.tagline}
        </p>
      </div>
    </div>
  ))}
</div>
```

**Journey Steps Data:**
```typescript
const journeySteps = [
  { id: 1, title: 'Validate', tagline: 'Test demand first' },
  { id: 2, title: 'Define', tagline: 'Scope your MVP' },
  { id: 3, title: 'Design', tagline: 'Create experiences' },
  { id: 4, title: 'Build', tagline: 'Develop scalably' },
  { id: 5, title: 'Launch & Learn', tagline: 'Ship with confidence' },
];
```

**Design Rationale:**
- **Card-based pattern** maintains consistency with Services Grid (Section 3)
- **Left gradient accent** reinforces TrueSpur signature design pattern
- **Premium restraint** — Subtle, not a process diagram or agency methodology graphic
- **Mobile responsive** — Stacks cleanly to single column on mobile
- **Aligns with Homepage** — Similar to "How We Build Products That Scale" timeline pattern

**Implementation Requirements:**
- Position after three narrative paragraphs (mt-12)
- Grid: `grid-cols-1 md:grid-cols-3 lg:grid-cols-5` (responsive)
- Gap: `gap-4` (consistent with design system)
- Card styling: Matches service card pattern (white bg, border-gray-100/80, shadow-sm)
- Left accent: Permanent (not hover-only) to reinforce journey flow
- Icon container: `bg-orange-100/70` with numbered indicators
- Typography: Poppins Semibold for titles, Inter Regular for taglines

### Visual Content Requirements
- No images required
- Focus on text and narrative flow
- Journey visualization: Required component (see above)

### Interaction Design
- Smooth scroll reveal: Fade in (400ms)
- No hover states on text
- Journey cards: No hover states (static visual element, not interactive)

### Mobile Optimization
- H2: `text-3xl` on mobile
- Body: `text-base` on mobile
- Maintain paragraph spacing
- Journey visualization: Single-column grid (`grid-cols-1`), full-width cards

### Development Notes
- Three paragraphs create scannable narrative
- Alternating background pattern (white → gray)
- Journey visualization is required component for launch
- Reinforces "guide from idea to product" positioning
- Differentiates from transactional service catalog aesthetic

---

## SECTION 3: WHAT WE OFFER (SERVICES GRID)

### Strategic Purpose
Main conversion section. Explain TrueSpur's service offerings. Keep scannable and outcome-focused. Demonstrate breadth of capabilities.

### Layout Structure

**Desktop:**
- Section padding: py-16 md:py-24 lg:py-32
- Background: white
- Container: max-w-7xl mx-auto px-4
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8`
- Section headline: Centered

**Tablet:**
- Grid: `grid-cols-2 gap-6`

**Mobile:**
- Grid: `grid-cols-1 gap-5`

### Visual Hierarchy

**Primary:** Section headline (H2)
- Poppins Extrabold (800)
- `text-4xl lg:text-5xl xl:text-6xl`
- Color: gray-900
- Center-aligned
- mb-12

**Secondary:** Service cards (5 cards, equal weight)
- Each card: Service title, positioning statement, 5 outcome bullets
- Responsive grid layout

### Service Card Component

**Card Structure:**
```tsx
<div className="group relative bg-white rounded-2xl border border-gray-100/80 p-8 lg:p-9 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
  {/* Left gradient accent */}
  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-amber-400 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  
  {/* Service title */}
  <h3 className="font-heading text-xl lg:text-2xl font-semibold text-gray-900 mb-3">
    Product Discovery & Validation
  </h3>
  
  {/* Positioning statement */}
  <p className="text-base font-medium text-orange-600 italic mb-5">
    Reduce risk before you build.
  </p>
  
  {/* Outcome bullets */}
  <ul className="space-y-3">
    <li className="flex items-start gap-3 text-sm lg:text-base text-gray-600">
      <Check className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
      <span>Validate market demand through user research and interviews</span>
    </li>
    <li className="flex items-start gap-3 text-sm lg:text-base text-gray-600">
      <Check className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
      <span>Define your MVP and prioritize features that matter</span>
    </li>
    <li className="flex items-start gap-3 text-sm lg:text-base text-gray-600">
      <Check className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
      <span>Test assumptions before investing months of development</span>
    </li>
    <li className="flex items-start gap-3 text-sm lg:text-base text-gray-600">
      <Check className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
      <span>Build product strategy grounded in evidence, not guesses</span>
    </li>
    <li className="flex items-start gap-3 text-sm lg:text-base text-gray-600">
      <Check className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
      <span>Identify the right problems to solve for your target users</span>
    </li>
  </ul>
</div>
```

**Full Section:**
```tsx
<section className="py-16 md:py-24 lg:py-32 bg-white">
  <div className="container mx-auto px-4">
    <div className="max-w-7xl mx-auto">
      
      <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 text-center mb-12">
        What We Offer
      </h2>
      
      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Service 1: Product Discovery & Validation */}
        <ServiceCard 
          title="Product Discovery & Validation"
          positioning="Reduce risk before you build."
          bullets={[
            'Validate market demand through user research and interviews',
            'Define your MVP and prioritize features that matter',
            'Test assumptions before investing months of development',
            'Build product strategy grounded in evidence, not guesses',
            'Identify the right problems to solve for your target users'
          ]}
        />
        
        {/* Service 2: Product Design & User Experience */}
        <ServiceCard 
          title="Product Design & User Experience"
          positioning="Design products people want to use."
          bullets={[
            'Map user journeys and identify friction points',
            'Test designs with real users before writing code',
            'Design experiences users understand and adopt quickly',
            'Create design foundations that evolve as your product grows',
            'Build products people can actually use'
          ]}
        />
        
        {/* Service 3: SaaS Product Development */}
        <ServiceCard 
          title="SaaS Product Development"
          positioning="Build products ready to grow with your business."
          bullets={[
            'Build MVPs on foundations that can evolve as adoption grows',
            'Build customer portals and internal platforms',
            'Create scalable architecture using modern technologies',
            'Ship products ready for real users, not just technically complete',
            'Focus on outcomes—solving problems, not just shipping features'
          ]}
        />
        
        {/* Service 4: Healthcare Product Development */}
        <ServiceCard 
          title="Healthcare Product Development"
          positioning="Build healthcare products grounded in clinical and operational reality."
          bullets={[
            'Design clinical workflows that fit how providers actually work',
            'Design healthcare products that earn provider and patient trust',
            'Integrate with EHR systems using HL7, FHIR, and DIRECT standards',
            'Reduce risk by building with healthcare realities in mind',
            'Create patient-facing experiences that build trust'
          ]}
        />
        
        {/* Service 5: AI Product Development */}
        <ServiceCard 
          title="AI Product Development"
          positioning="Integrate AI to solve real problems."
          bullets={[
            'Identify where AI creates value vs. where it's just hype',
            'Build AI-assisted workflows that improve user productivity',
            'Develop knowledge systems and LLM applications',
            'Focus on solving problems, not chasing trends',
            'Ensure AI features are reliable, not just impressive demos'
          ]}
        />
        
      </div>
      
    </div>
  </div>
</section>
```

### Visual Content Requirements

**Icons:**
- Lucide React `Check` icon for bullets
- Size: 20px (h-5 w-5)
- Color: `text-orange-500`
- Positioned: `flex-shrink-0 mt-0.5` (aligned with first line)

**No Additional Visuals:**
- No service icons or illustrations
- Focus on typography and content hierarchy
- Keep cards clean and scannable

### Service Card Visual Restraint Governance

**Current Implementation:**

Service cards use typography-first presentation:
- Service title (Poppins Semibold, text-xl lg:text-2xl)
- Positioning statement (orange-600, italic, medium weight)
- Outcome bullets (Check icon + text)

**Governance Principle:**

Service cards intentionally avoid decorative icons, illustrations, or category graphics.

**Rationale:**

- **Typography carries the hierarchy** — Title → Positioning → Bullets creates clear visual flow
- **Outcomes carry the value proposition** — Bullets communicate value, not icons
- **Content carries the differentiation** — Words differentiate TrueSpur, not graphics
- **Premium restraint philosophy** — Minimal, purposeful, not decorative

**Explicitly Prohibited Visual Elements:**

- ❌ Service category icons (lightbulb, rocket, brain, gear, etc.)
- ❌ SaaS marketing icons (charts, dashboards, analytics graphics)
- ❌ Healthcare icons (stethoscope, heart, medical cross)
- ❌ AI/tech icons (brain, neural network, robot graphics)
- ❌ Rocketship or growth illustrations
- ❌ Generic agency-style artwork or spot illustrations
- ❌ Decorative service-category imagery
- ❌ Icon backgrounds, icon containers, or icon badges
- ❌ Gradient icon treatments or 3D icon effects

**Allowed Visual Elements:**

- ✅ Check icon for outcome bullets (Lucide React, orange-500, 20px)
- ✅ Left gradient accent bar (hover state only)
- ✅ Typography hierarchy (title, positioning, bullets)
- ✅ Whitespace and card structure

**Why This Matters:**

Adding service icons would:
- Create generic agency aesthetic (contradicts Product Studio positioning)
- Reduce scannability (visual noise competes with content)
- Weaken premium restraint (decorative over functional)
- Dilute differentiation (icons are commoditized, words are unique)

**Governance Rule:**

If a visual element doesn't improve scannability, hierarchy, or conversion, it doesn't belong on service cards.

Maintain typography-first presentation consistent with TrueSpur's premium restraint philosophy and Product Studio positioning.

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
- Typography: `text-lg` for service title
- Positioning statement: `text-sm` on mobile
- Bullets: `text-sm` on mobile

**Grid:**
- Single column on mobile
- Full width cards with `gap-5`
- Maintain left accent bar (visual consistency)

### Development Notes

**Reusable Pattern:**
- Service card component matches Homepage Services pattern
- Consistent hover states across site (Pattern A)
- Left gradient accent is signature TrueSpur pattern

**Grid Layout:**
- 3-column on desktop (lg:grid-cols-3)
- 2-column on tablet (md:grid-cols-2)
- 1-column on mobile (grid-cols-1)
- 5 cards total (last row has 2 cards on desktop)

**Strategic Card Order:**
- Product Discovery & Validation is intentionally positioned first (top-left) as it represents TrueSpur's strongest strategic differentiator and most common entry point for founder engagement
- First position + orange-600 italic positioning statement provides subtle hierarchy without breaking grid consistency
- Maintain this order — do not reorder cards without strategic approval

**Maintenance:**
- Service descriptions are fixed (from approved copy)
- Bullets are outcome-focused (no feature lists)
- Low-maintenance, high-conversion format

---

## SECTION 4: WHY FOUNDERS WORK WITH US

### Strategic Purpose
Differentiate TrueSpur without attacking competitors. Show what makes TrueSpur different through product studio model, founder perspective, and active building. Build trust through shared experience.

### Layout Structure

**Desktop:**
- Section padding: py-16 md:py-24 lg:py-32
- Background: bg-gray-50
- Container: max-w-5xl mx-auto px-4
- Content: Centered, single column
- Opening paragraph + 3 subsections with bold headlines

**Tablet/Mobile:**
- Same structure
- Maintain subsection breaks for scannability

### Visual Hierarchy

**Primary:** Section headline (H2)
- Poppins Extrabold (800)
- `text-4xl lg:text-5xl xl:text-6xl`
- Color: gray-900
- Center-aligned
- mb-8

**Secondary:** Opening paragraph
- Inter Regular (400)
- `text-base lg:text-lg`
- Color: gray-600
- mb-8

**Tertiary:** Subsections (3 themes)
- Headlines: Poppins Semibold (600), `text-lg lg:text-xl`, gray-900
- Body: Inter Regular, `text-base lg:text-lg`, gray-600
- Spacing: space-y-6

### Component Recommendations

```tsx
<section className="py-16 md:py-24 lg:py-32 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="max-w-5xl mx-auto">
      
      <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 text-center mb-8">
        Why Founders Work With Us
      </h2>
      
      <div className="max-w-4xl mx-auto space-y-6 text-base lg:text-lg text-gray-600">
        
        <p className="text-center">
          We're not a typical development agency. We're a product studio—which means we're building products ourselves while helping founders build theirs.
        </p>
        
        <div className="space-y-6 mt-10">
          
          {/* Theme 1: We think like founders */}
          <div>
            <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-3">
              We think like founders.
            </h3>
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              We've faced the same challenges you face: limited budget, uncertain demand, pressure to ship fast without breaking things. That shared experience changes how we work. We don't just execute—we challenge assumptions, suggest better approaches, and help you avoid mistakes we've already made.
            </p>
          </div>
          
          {/* Theme 2: We bring product thinking */}
          <div>
            <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-3">
              We bring product thinking.
            </h3>
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              Our founder is a product manager with 15+ years building healthcare and enterprise software. We validate before we build. We prioritize ruthlessly. We measure success by outcomes, not features shipped.
            </p>
          </div>
          
          {/* Theme 3: We're actively building */}
          <div>
            <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-3">
              We're actively building.
            </h3>
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              When you work with a team that's building products themselves, you get partners who understand the journey—not just the destination. We know what it's like to make difficult product decisions, work within constraints, and balance speed with long-term sustainability.
            </p>
          </div>
          
        </div>
        
      </div>
      
    </div>
  </div>
</section>
```

### Trust Signal Visualization (Optional Enhancement)

**Purpose:** Visual reinforcement of Product Studio credibility through thematic trust signals that align with founder-focused positioning.

**Recommended Pattern: Credibility Theme Cards**
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 max-w-4xl mx-auto">
  
  {/* Theme 1: Founder Perspective */}
  <div className="text-center p-6 bg-white rounded-xl border border-gray-100/80 shadow-sm">
    <h4 className="font-heading text-base font-semibold text-gray-900 mb-2">
      Founder Perspective
    </h4>
    <p className="text-sm text-gray-600 leading-relaxed">
      Builders who understand founder constraints, uncertainty, and trade-offs.
    </p>
  </div>
  
  {/* Theme 2: Product Thinking */}
  <div className="text-center p-6 bg-white rounded-xl border border-gray-100/80 shadow-sm">
    <h4 className="font-heading text-base font-semibold text-gray-900 mb-2">
      Product Thinking
    </h4>
    <p className="text-sm text-gray-600 leading-relaxed">
      Product management discipline focused on validation, prioritization, and outcomes.
    </p>
  </div>
  
  {/* Theme 3: Active Product Building */}
  <div className="text-center p-6 bg-white rounded-xl border border-gray-100/80 shadow-sm">
    <h4 className="font-heading text-base font-semibold text-gray-900 mb-2">
      Active Product Building
    </h4>
    <p className="text-sm text-gray-600 leading-relaxed">
      Building our own products while helping founders build theirs.
    </p>
  </div>
  
</div>
```

**Design Rationale:**
- **Thematic consistency** — Mirrors Section 4 narrative subsections (Founder Perspective, Product Thinking, Active Building)
- **Avoids metric expectations** — No invitation for customer count, revenue, or scale questions
- **Premium restraint** — Subtle reinforcement, not proof-by-numbers or achievement metrics
- **Product Studio positioning** — Focuses on approach and philosophy, not scale or volume
- **Cross-page alignment** — Consistent with Homepage (no stat callouts), About Page (narrative-driven), Products Page (no vanity metrics)
- **Evidence-based** — Themes are provable through Products Page portfolio and About Page founder story

**Implementation Guidance:**
- Optional enhancement (not required for launch)
- Recommended for activation post-launch if conversion data shows Section 4 needs visual reinforcement
- Position after three subsections (mt-10)
- Grid: `grid-cols-1 md:grid-cols-3` (responsive)
- Card styling: Matches service card pattern (white bg, border-gray-100/80, shadow-sm)
- Typography: Poppins Semibold for theme titles, Inter Regular for descriptions
- No hover states (static visual element, not interactive)
- Maintain premium restraint (no icons, no decorative elements, no promotional treatment)

### Visual Content Requirements
- No images required
- Focus on text hierarchy and subsections
- Optional: Credibility theme cards for visual reinforcement (see above)

### Interaction Design
- Smooth scroll reveal: Fade in (400ms)
- No hover states on text
- Credibility theme cards (if added): No hover states (static visual element)

### Mobile Optimization
- H2: `text-3xl` on mobile
- H3: `text-base` on mobile
- Body: `text-base` on mobile
- Maintain subsection spacing
- Credibility theme cards (if added): Single column on mobile (`grid-cols-1`)

### Development Notes
- Three subsections with bold headlines create scannable format
- Avoids defensive "unlike agencies" language
- Focuses on positive differentiation
- Product portfolio referenced conceptually (specific products showcased on Products Page)
- Credibility theme cards are optional enhancement (recommended for post-launch activation if needed)

---

## SECTION 5: HOW WE WORK WITH FOUNDERS

### Strategic Purpose
Explain engagement philosophy. Build trust through honesty. Show long-term thinking. Demonstrate partnership approach over transactional relationship.

### Layout Structure

**Desktop:**
- Section padding: py-16 md:py-24 lg:py-32
- Background: white
- Container: max-w-5xl mx-auto px-4
- Content: Centered, single column
- Opening paragraph + 4 subsections with bold headlines

**Tablet/Mobile:**
- Same structure
- Maintain subsection breaks for scannability

### Visual Hierarchy

**Primary:** Section headline (H2)
- Poppins Extrabold (800)
- `text-4xl lg:text-5xl xl:text-6xl`
- Color: gray-900
- Center-aligned
- mb-8

**Secondary:** Opening paragraph
- Inter Regular (400)
- `text-base lg:text-lg`
- Color: gray-600
- mb-8

**Tertiary:** Subsections (4 principles)
- Headlines: Poppins Semibold (600), `text-lg lg:text-xl`, gray-900
- Body: Inter Regular, `text-base lg:text-lg`, gray-600
- Spacing: space-y-6

### Component Recommendations

```tsx
<section className="py-16 md:py-24 lg:py-32 bg-white">
  <div className="container mx-auto px-4">
    <div className="max-w-5xl mx-auto">
      
      <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 text-center mb-8">
        How We Work With Founders
      </h2>
      
      <div className="max-w-4xl mx-auto space-y-6 text-base lg:text-lg text-gray-600">
        
        <p className="text-center">
          We believe the best products come from honest partnerships, not transactional relationships.
        </p>
        
        <div className="space-y-6 mt-10">
          
          {/* Principle 1: Honest conversations */}
          <div>
            <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-3">
              We start with honest conversations.
            </h3>
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              Not every idea should be built. Not every feature matters. We'll tell you when we think you're solving the wrong problem or building the wrong thing. That honesty saves you time and money.
            </p>
          </div>
          
          {/* Principle 2: Challenge assumptions */}
          <div>
            <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-3">
              We challenge assumptions.
            </h3>
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              Great products come from questioning everything. We push back on bad ideas and move fast on good ones. We validate before we invest. We build only what creates value.
            </p>
          </div>
          
          {/* Principle 3: Think long-term */}
          <div>
            <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-3">
              We think long-term.
            </h3>
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              We're not optimizing for the fastest path to invoicing hours. We're optimizing for building products that solve real problems and scale sustainably. That means sometimes saying no to features that don't move the business forward.
            </p>
          </div>
          
          {/* Principle 4: Build alongside */}
          <div>
            <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-3">
              We build alongside you.
            </h3>
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              You're not handing off requirements to a vendor. You're partnering with builders who understand product challenges from the inside. We're in the trenches with you.
            </p>
          </div>
          
        </div>
        
      </div>
      
    </div>
  </div>
</section>
```

### Visual Content Requirements
- No images required
- Focus on text hierarchy and subsections
- Clean, readable layout

### Interaction Design
- Smooth scroll reveal: Fade in (400ms)
- No hover states on text

### Mobile Optimization
- H2: `text-3xl` on mobile
- H3: `text-base` on mobile
- Body: `text-base` on mobile
- Maintain subsection spacing

### Development Notes
- Four subsections with bold headlines create scannable format
- Demonstrates honesty and long-term thinking
- Avoids transactional language
- Partnership-focused tone throughout

---

## SECTION 6: FINAL CTA

### Strategic Purpose
Convert visitors who've read entire page. Provide clear next steps. Low-pressure, honest conversation positioning. Reinforce consultative approach.

### Layout Structure

**Desktop:**
- Section padding: py-16 md:py-24 lg:py-32
- Background: bg-gray-50
- Container: max-w-4xl mx-auto px-4
- Content: Centered
- Two CTA buttons: Primary + Secondary

**Tablet/Mobile:**
- Same structure, adjusted padding
- Stack buttons vertically on mobile

### Visual Hierarchy

**Primary:** Section headline (H2)
- Poppins Extrabold (800)
- `text-4xl lg:text-5xl xl:text-6xl`
- Color: gray-900
- Center-aligned

**Secondary:** Supporting copy (2 paragraphs)
- Inter Regular (400)
- `text-base lg:text-lg`
- Color: gray-600
- Max-width: 700px, centered

**Primary CTA:** "Start Your Project"
- **Component:** `PrimaryButton` (components/cta/PrimaryButton.tsx)
- **Size:** `lg`
- Prominent, first position

**Secondary CTA:** "Schedule a Call"
- **Component:** `SecondaryButton` (components/cta/SecondaryButton.tsx)
- **Variant:** `light`
- **Size:** `lg`

### Component Implementation

```tsx
import { PrimaryButton } from '@/components/cta/PrimaryButton'
import { SecondaryButton } from '@/components/cta/SecondaryButton'

<section className="py-16 md:py-24 lg:py-32 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center">
      
      <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-6">
        Let's Talk About What You're Building.
      </h2>
      
      <div className="max-w-3xl mx-auto space-y-4 text-base lg:text-lg text-gray-600 mb-10">
        <p>
          Whether you're validating an idea or ready to build, let's talk. We'll discuss your product, your goals, and whether we're the right partner.
        </p>
        <p>
          No sales pitch. Just an honest conversation about what you're building and how we can help.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <PrimaryButton size="lg">
          Start Your Project
        </PrimaryButton>
        
        <SecondaryButton size="lg" variant="light">
          Schedule a Call
        </SecondaryButton>
      </div>
      
    </div>
  </div>
</section>
```

**Implementation Notes:**
- Use frozen `PrimaryButton` and `SecondaryButton` components
- Do NOT add page-specific className overrides
- Components handle all styling, hover states, and transitions

### Visual Content Requirements
- No images required
- Typography-led design
- Clean, inviting layout

### Interaction Design

**Hover States:**
- Primary CTA: Handled by frozen `PrimaryButton` component
- Secondary CTA: Handled by frozen `SecondaryButton` component
- **Note:** Do NOT override component hover states

**Scroll Animation:**
- Headline: Fade in + slide up (400ms, 0ms delay)
- Supporting copy: Fade in (400ms, 100ms delay)
- CTAs: Fade in (400ms, 200ms delay)

### Mobile Optimization

**Typography Adjustments:**
- H2: `text-3xl` on mobile
- Supporting copy: `text-base` on mobile

**CTA Layout:**
- Stack vertically on mobile (flex-col)
- Full width buttons (max-width 400px each)
- Centered

**Spacing:**
- Reduce padding: `py-16` on mobile

### Development Notes

**Reusable Components:**
- `PrimaryButton` (components/cta/PrimaryButton.tsx) — Frozen gradient CTA
- `SecondaryButton` (components/cta/SecondaryButton.tsx) — Frozen outline CTA
- Two-CTA layout pattern (identical to Hero section)
- **Implementation:** Import and use frozen components without modifications

**Conversion Optimization:**
- Low-pressure language ("Let's talk" vs "Get started now")
- Honest positioning ("No sales pitch")
- Two conversion paths (project start vs call)
- Reinforces consultative approach

---

## RESPONSIVE DESIGN SPECIFICATIONS

### Breakpoints

**Mobile:** < 768px
**Tablet:** 768px - 1279px
**Desktop:** 1280px+

### Section-by-Section Responsive Behavior

**Section 1: Hero**
- Desktop: py-28, text-7xl headline
- Tablet: py-24, text-6xl headline
- Mobile: py-16, text-4xl headline, stacked CTAs

**Section 2: From Idea to Product**
- Desktop: py-32, text-6xl headline
- Tablet: py-24, text-5xl headline
- Mobile: py-16, text-3xl headline
- Journey visualization: Horizontal → Vertical on mobile

**Section 3: Services Grid**
- Desktop: 3-column grid (lg:grid-cols-3)
- Tablet: 2-column grid (md:grid-cols-2)
- Mobile: 1-column grid (grid-cols-1)
- Card padding: p-9 → p-8 → p-6

**Section 4: Why Founders Work With Us**
- Desktop: py-32, text-6xl headline
- Tablet: py-24, text-5xl headline
- Mobile: py-16, text-3xl headline
- Trust signals: 3-column → 1-column on mobile

**Section 5: How We Work**
- Desktop: py-32, text-6xl headline
- Tablet: py-24, text-5xl headline
- Mobile: py-16, text-3xl headline
- Maintain subsection spacing

**Section 6: Final CTA**
- Desktop: py-32, text-6xl headline
- Tablet: py-24, text-5xl headline
- Mobile: py-16, text-3xl headline, stacked CTAs

### Typography Responsive Scale

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| H1 (Hero) | 72px (text-7xl) | 60px (text-6xl) | 36px (text-4xl) |
| H2 (Sections) | 60px (text-6xl) | 48px (text-5xl) | 30px (text-3xl) |
| H3 (Service titles) | 24px (text-2xl) | 20px (text-xl) | 18px (text-lg) |
| Body Large | 20px (text-xl) | 18px (text-lg) | 16px (text-base) |
| Body | 18px (text-lg) | 16px (text-base) | 16px (text-base) |
| Bullets | 16px (text-base) | 14px (text-sm) | 14px (text-sm) |

### Spacing Responsive Scale

| Element | Desktop | Tablet | Mobile |
|---------|---------|--------|--------|
| Section padding (vertical) | py-32 | py-24 | py-16 |
| Card padding | p-9 | p-8 | p-6 |
| Grid gaps | gap-8 | gap-6 | gap-5 |
| Subsection spacing | space-y-6 | space-y-6 | space-y-4 |

---

## ACCESSIBILITY REQUIREMENTS

### WCAG 2.1 AA Compliance

**Color Contrast:**
- ✅ gray-900 on white: 16.2:1 (Excellent)
- ✅ gray-600 on white: 7.0:1 (Excellent)
- ✅ orange-600 on white: 4.6:1 (Good for large text)
- ✅ white on orange-500 gradient: 3.1:1 (Acceptable for large bold text)

**Typography:**
- Minimum body text: 16px (text-base)
- Minimum line height: 1.5 (leading-relaxed for body)
- Maximum line length: 75 characters
- Clear visual hierarchy

**Interactive Elements:**
- Touch targets: Minimum 44px × 44px
- Focus states: Visible keyboard focus indicators
- Hover states: Clear visual feedback
- Button labels: Descriptive, action-oriented

**Semantic HTML:**
- Proper heading hierarchy (H1 → H2 → H3)
- Semantic section elements
- ARIA labels where needed
- Alt text for images (if added)

**Keyboard Navigation:**
- All interactive elements keyboard accessible
- Logical tab order
- Skip links (if needed)
- Focus trap in modals (if used)

**Motion:**
- Respect `prefers-reduced-motion`
- Disable animations for users who prefer reduced motion
- Ensure content is accessible without animations

---

## IMPLEMENTATION GUIDANCE

### Component Inventory

**EXISTING SHARED COMPONENTS (Direct Reuse):**

1. **Header** — `components/layout/Header.tsx` (Frozen)
   - Global site navigation
   - Direct reuse, no modifications

2. **Footer** — `components/layout/Footer.tsx` (Frozen)
   - Global site footer
   - Direct reuse, no modifications

3. **PageContainer** — `components/layout/PageContainer.tsx` (Frozen)
   - Standard page wrapper
   - Direct reuse, no modifications

4. **PrimaryButton** — `components/cta/PrimaryButton.tsx` (Frozen)
   - Gradient CTA button (yellow-500 → orange-500)
   - Hover: scale-[1.02], shadow enhancement, 200ms
   - Sizes: sm, md, lg
   - **Usage:** Hero CTA, Final CTA
   - **Implementation:** Import and use without page-specific overrides

5. **SecondaryButton** — `components/cta/SecondaryButton.tsx` (Frozen)
   - Outline CTA button
   - Variants: light (border-orange-500), dark (border-white)
   - Hover: bg-orange-50, border-orange-600, -translate-y-0.5, 200ms
   - Sizes: sm, md, lg
   - **Usage:** Hero CTA, Final CTA
   - **Implementation:** Import and use without page-specific overrides

6. **Typography System** — Design System (Frozen)
   - Poppins headings (font-heading)
   - Inter body text (font-sans)
   - Responsive type scale
   - **Usage:** All sections

7. **Spacing System** — Design System (Frozen)
   - Section padding: `py-16 md:py-24 lg:py-32`
   - Card padding: `p-8 lg:p-9`
   - Grid gaps: `gap-6 lg:gap-8`
   - **Usage:** All sections

8. **Animation System** — Design System (Frozen)
   - Durations: 150ms, 200ms, 300ms, 400ms
   - Easing: ease-out
   - prefers-reduced-motion support
   - **Usage:** Scroll reveals, hover states

**NEW REUSABLE COMPONENTS (To Be Created):**

9. **ServiceCard** — Service offering card
   - Structure: Title + positioning statement + 5 outcome bullets
   - Hover: shadow-sm → shadow-lg, -translate-y-1, left gradient accent reveal
   - Visual Restraint: NO decorative icons (typography-first)
   - **Usage:** Section 3 (Services Grid)
   - **Reusability:** HIGH — Could replace Homepage service cards

10. **FounderJourneyVisualization** — 5-step journey cards (REQUIRED)
    - Steps: Validate → Define → Design → Build → Launch & Learn
    - Grid: 5-column → 3-column → 1-column (responsive)
    - Card-based pattern with numbered indicators
    - **Usage:** Section 2 (From Idea to Product)
    - **Status:** REQUIRED FOR LAUNCH

11. **SubsectionBlock** — Bold headline + paragraph (Optional)
    - Structure: H3 + body paragraph wrapper
    - **Usage:** Sections 4 & 5 (narrative subsections)
    - **Reusability:** HIGH — Narrative sections across site

**PAGE-SPECIFIC COMPONENTS:**
- None — All components are shared or genuinely reusable

**IMPLEMENTATION GOVERNANCE:**

**Reuse Existing Components:**
- Use frozen `PrimaryButton` and `SecondaryButton` without modifications
- Use frozen `Header`, `Footer`, `PageContainer` without modifications
- Use frozen Typography, Spacing, and Animation systems
- Do NOT create page-specific CTA styling
- Do NOT override component hover states
- Do NOT introduce duplicate implementations

**Respect Visual Restraint Governance:**
- ServiceCard: NO decorative icons (lines 656-707)
- Typography-first presentation
- Premium restraint philosophy
- Calm, editorial aesthetic

**Follow Mature Architecture:**
- Component-based architecture (no monolithic page.tsx)
- TypeScript types for all components
- Responsive design with approved spacing system
- Animation tokens (150ms, 200ms, 300ms, 400ms)
- prefers-reduced-motion handling

**Component Code Examples:**

**PrimaryButton Usage:**
```tsx
import { PrimaryButton } from '@/components/cta/PrimaryButton'

<PrimaryButton size="lg">
  Start Your Project
</PrimaryButton>
```

**SecondaryButton Usage:**
```tsx
import { SecondaryButton } from '@/components/cta/SecondaryButton'

<SecondaryButton size="lg" variant="light">
  Schedule a Call
</SecondaryButton>
```

**Service Card:**
```tsx
<div className="group relative bg-white rounded-2xl border border-gray-100/80 p-8 lg:p-9 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-amber-400 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  <h3 className="font-heading text-xl lg:text-2xl font-semibold text-gray-900 mb-3">{title}</h3>
  <p className="text-base font-medium text-orange-600 italic mb-5">{positioning}</p>
  <ul className="space-y-3">
    {bullets.map(bullet => (
      <li className="flex items-start gap-3 text-sm lg:text-base text-gray-600">
        <Check className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
        <span>{bullet}</span>
      </li>
    ))}
  </ul>
</div>
```

### Design System References

**Source:** docs/05-DESIGN-SYSTEM/design-system.md (v2.2)

**Typography:**
- Headings: Poppins via `font-heading` class
- Body: Inter via `font-sans` (default)
- H1: `font-black` (900)
- H2: `font-extrabold` (800)
- H3: `font-semibold` (600)
- Body: `font-regular` (400)

**Colors:**
- Primary brand: orange-500 (#F97316)
- CTA gradient: yellow-500 → orange-500
- Text on light: gray-900 (headings), gray-600 (body)
- Borders: gray-100/80 (whisper-soft)
- Accents: orange-600, amber-400

**Spacing:**
- Section padding: `py-16 md:py-24 lg:py-32`
- Card padding: `p-8 lg:p-9`
- Grid gaps: `gap-6 lg:gap-8`
- Subsection spacing: `space-y-6`

**Shadows:**
- Card default: `shadow-sm`
- Card hover: `shadow-lg`
- CTA button: `shadow-md` (handled by PrimaryButton component)

**Border Radius:**
- Cards: `rounded-2xl` (16px)
- Buttons: `rounded-full`
- Icon containers: `rounded-lg` (8px)

**Animation Tokens:**
- Micro-interactions: 150ms, 200ms
- Scroll reveals: 300ms, 400ms
- Easing: ease-out
- Respect: prefers-reduced-motion

### Developer Notes

**Performance Optimization:**
- Lazy load images (if added)
- Preload critical fonts (Poppins Black, Inter Regular)
- Optimize animations (use CSS transforms)
- Minimize layout shifts

**Accessibility:**
- Use semantic HTML
- Provide ARIA labels where needed
- Ensure keyboard navigation
- Respect `prefers-reduced-motion`

**Responsive Testing:**
- Test on multiple devices
- Verify touch targets (min 44px)
- Check text readability on mobile
- Ensure CTAs are accessible

**Maintenance:**
- Service descriptions are fixed (from approved copy)
- Update service offerings only with strategic approval
- Keep design system aligned with homepage
- Document any component changes

### CTA Destination Governance

**Launch Strategy:**

At launch, both CTAs ("Start Your Project" and "Schedule a Call") should route to the same consultation workflow (Calendly, contact form, or equivalent intake process).

**Purpose:**
- Reduce conversion friction (single, optimized path)
- Simplify early-stage lead handling (one workflow to manage)
- Avoid unnecessary funnel complexity (no A/B routing at launch)
- Maintain conversion focus (both CTAs represent same intent: "talk to us")

**Preferred Launch Destination:**

**Primary Recommendation:**
- Calendly consultation booking workflow

**Rationale:**
- Lowest friction (no form fields, instant confirmation)
- Automatic calendar integration (reduces manual scheduling)
- Professional experience (founders expect modern booking)
- Conversion-optimized (fewer steps = higher completion)
- Operational efficiency (automated scheduling reduces back-and-forth)

**Fallback Option:**
- Contact form workflow (if Calendly unavailable or inappropriate)

**Implementation Guidance:**

Use Calendly unless:
- Business operations don't support immediate booking
- Qualification workflow required before scheduling
- Technical constraints prevent Calendly integration
- Strategic decision to use alternative intake process

If using contact form fallback:
- Keep fields minimal (Name, Email, Message)
- Auto-response confirmation required
- Response SLA documented (e.g., "We'll respond within 24 hours")
- Consider adding Calendly link in confirmation email

**Future Optimization:**

Separate conversion paths may be introduced later based on:
- Actual user behavior data
- Conversion rate analysis
- Lead quality assessment
- Operational capacity

**Implementation Notes:**
- Both CTAs should use identical destination URL
- Track CTA source via UTM parameters or event tracking (e.g., `?source=hero-cta` vs `?source=final-cta`)
- This allows measurement of CTA placement effectiveness without splitting conversion paths
- Do not create separate forms, calendars, or intake processes until data justifies complexity

**Prohibited at Launch:**
- ❌ Different destination URLs for each CTA
- ❌ Separate intake forms based on CTA clicked
- ❌ Different qualification workflows
- ❌ A/B routing without data justification

---

## CONVERSION OPTIMIZATION

### Trust-Building Progression

**Section 1 (Hero):** Immediate clarity
- What TrueSpur does
- Two conversion paths

**Section 2 (Journey):** Empathy
- Understand founder challenges
- Position as guide

**Section 3 (Services):** Capabilities
- Show breadth of offerings
- Outcome-focused value

**Section 4 (Differentiation):** Why choose TrueSpur
- Product studio model
- Founder perspective
- Active building

**Section 5 (Philosophy):** How we work
- Honest partnership
- Long-term thinking
- Build alongside

**Section 6 (CTA):** Low-pressure invitation
- Honest conversation
- Two conversion paths

### Scannability Optimization

**Visual Hierarchy:**
- Large headlines (H1, H2) draw attention
- Subsection headlines (H3) create breaks
- Bullet points enable quick scanning
- Generous whitespace guides eye

**Content Structure:**
- Short paragraphs (2-4 sentences)
- Bold subheadlines for navigation
- Clear section breaks
- Outcome-focused language

**Conversion Elements:**
- Two CTAs (primary + secondary)
- Positioned at Hero and Final CTA
- Low-pressure language
- Clear next steps

### Founder Relevance

**Addresses Real Challenges:**
- "Limited budget, uncertain demand, pressure to ship fast"
- "Validate demand before investing months of development"
- "Build MVPs on foundations that can evolve as adoption grows"

**Speaks to Pain Points:**
- "Not every idea should be built"
- "We'll tell you when you're solving the wrong problem"
- "We push back on bad ideas and move fast on good ones"

**Demonstrates Empathy:**
- "We've faced the same challenges you face"
- "We know what it's like to make difficult product decisions"
- "We're in the trenches with you"

---

## SUCCESS CRITERIA

### A Founder Should Leave Thinking:

✅ "These people understand product building."  
✅ "They've faced the same challenges I'm facing."  
✅ "They think like founders, not vendors."  
✅ "They'll be honest with me, not just take my money."  
✅ "They have real product experience."

### A Founder Should NOT Think:

✅ "These people sell software development." (Avoided)  
✅ "This is just another agency." (Differentiated)  
✅ "They're all talk, no proof." (Product studio model proven)  
✅ "They'll say yes to everything." (Honest partnership emphasized)

---

## MAINTENANCE GUIDELINES

### Service Offering Governance

**Review Cadence:**
- Annual strategic review of service offerings
- Quarterly review of service descriptions and positioning statements
- Ad-hoc review when Product Studio model evolves

**Adding New Services:**

**Before adding a new service, validate:**
1. ✅ Aligns with Product Studio positioning (not agency expansion)
2. ✅ Grounded in TrueSpur's active product-building experience
3. ✅ Addresses founder pain points (not just market trends)
4. ✅ Can be delivered with product thinking approach
5. ✅ Differentiates from typical agency offerings

**Reject new services that:**
- ❌ Expand into generic agency territory (e.g., "Staff Augmentation," "Dedicated Teams")
- ❌ Lack product studio grounding (e.g., "Digital Marketing," "SEO Services")
- ❌ Feel transactional rather than consultative
- ❌ Dilute Product Studio positioning

**Preserving Outcome-Oriented Positioning:**

**All service descriptions must:**
- Lead with outcomes, not features
- Use founder-focused language ("Reduce risk" not "Conduct research")
- Include 5 outcome-focused bullets (not capability lists)
- Maintain italic positioning statement (strategic value proposition)
- Avoid technical jargon or agency buzzwords

**Service Description Update Rules:**
- Bullets must answer: "What problem does this solve for founders?"
- Avoid feature lists: ❌ "User interviews, surveys, competitive analysis"
- Use outcome language: ✅ "Validate market demand through user research"
- Maintain consistent bullet structure across all cards
- Keep descriptions scannable (5 bullets max per service)

**Maintaining Product Studio Consistency:**

**Services must reflect:**
- Active product-building experience (reference TrueSpur products when relevant)
- PM-led approach (strategic thinking, not just execution)
- Founder empathy (shared challenges, honest guidance)
- Long-term thinking (sustainable products, not quick projects)
- Evidence-based approach (validate, measure, iterate)

**Cross-Page Consistency:**
- Services Page must align with Homepage "What We Do" section
- Service offerings must be provable through Products Page portfolio
- Capabilities must be grounded in About Page founder experience
- Update all three pages when service strategy evolves

**Visual Consistency:**
- Maintain card design pattern (left gradient accent, shadow-sm → shadow-lg)
- Preserve grid layout (3-column desktop, 2-column tablet, 1-column mobile)
- Keep typography hierarchy consistent
- Do not add featured cards or promotional treatments
- Maintain equal visual weight across all services (except strategic first position)

**Prohibited Changes Without Strategic Approval:**
- ❌ Adding pricing or package tiers
- ❌ Changing page architecture (6-section structure is strategic)
- ❌ Removing or combining sections
- ❌ Adding testimonials or case studies to Services Page (belongs on dedicated page)
- ❌ Changing CTA positioning or language
- ❌ Modifying Product Studio positioning narrative
- ❌ Reordering service cards (Product Discovery & Validation must remain first)

**Approval Requirements:**

**Minor updates (no approval needed):**
- Typo fixes
- Bullet refinement (maintaining outcome focus)
- Mobile optimization improvements
- Accessibility enhancements

**Major updates (strategic approval required):**
- Adding or removing services
- Changing service titles
- Modifying positioning statements
- Reordering service cards
- Changing section architecture
- Updating CTAs or conversion flow

**Document Maintenance:**
- Update this specification when design patterns change
- Maintain version history
- Document rationale for major changes
- Keep aligned with design-system.md and brand-identity-guidelines.md

---

## FINAL IMPLEMENTATION CHECKLIST

### Before Development

- [ ] Review SERVICES-PAGE-COPY-FINAL.md (all copy is frozen)
- [ ] Confirm design system alignment
- [ ] Verify CTA destinations
- [ ] Review mobile layouts
- [ ] Confirm accessibility requirements

### During Development

- [ ] Use exact copy from approved document (no variations)
- [ ] Follow design specifications exactly
- [ ] Implement Founder Journey Visualization (Section 2 - Required Component)
- [ ] Maintain visual hierarchy
- [ ] Test responsive behavior on multiple devices
- [ ] Verify CTA functionality
- [ ] Implement hover states (Pattern A for cards, Pattern B for buttons)
- [ ] Add scroll animations (fade in + slide up)
- [ ] Ensure keyboard navigation
- [ ] Test with screen readers

### Before Launch

- [ ] Verify all sections match approved content
- [ ] Confirm positioning consistency with Homepage
- [ ] Test conversion flow (CTAs → forms/calendly)
- [ ] Review on multiple devices and browsers
- [ ] Run accessibility audit (WCAG 2.1 AA)
- [ ] Check performance (page load speed)
- [ ] Stakeholder final approval

---

**Document Version:** 1.4 (Governance Aligned)  
**Date:** July 2, 2026  
**Status:** ✅ FROZEN FOR IMPLEMENTATION — Aligned with Frozen Design System  
**Refinements Applied:**
- v1.1: Founder Journey Visualization promoted to Required Component (Card-Based pattern)
- v1.1: Trust Signal Visualization simplified to single pattern (optional)
- v1.1: Strategic Card Order guidance added (Product Discovery & Validation first)
- v1.1: Maintenance Guidelines section added
- v1.2: Trust Signal pattern updated from Stat Callouts to Credibility Theme Cards
- v1.2: CTA Destination Governance added to Implementation Guidance
- v1.3: Page Flow Governance added (narrative sequence protection)
- v1.3: Service Card Visual Restraint Governance added (prevent icon/illustration drift)
- v1.3: Preferred Launch Destination added to CTA Governance (Calendly primary recommendation)
- v1.3.1: Product name references removed for maintainability (Section 4 opening paragraph)
- **v1.4: Pre-Implementation Governance Alignment Sprint (July 2, 2026)**
  - Updated all CTA references to frozen `PrimaryButton` and `SecondaryButton` components
  - Corrected all Design System file paths (docs/05-DESIGN-SYSTEM/)
  - Updated Component Inventory to reflect mature architecture (8 existing shared + 3 new reusable)
  - Added Implementation Governance guidance (reuse existing, respect Visual Restraint, follow mature architecture)
  - Updated hover state descriptions to reference frozen component behavior
  - Removed outdated inline CTA styling specifications
  - Added explicit "Do NOT override" warnings for component modifications
  - Synchronized all cross-references with current repository structure
  - Aligned specification with Homepage, About, and Products frozen implementations

**Governance Synchronization:** Complete — All documentation aligned with frozen Design System  
**Next Steps:** Begin Services Page implementation using frozen components  
**Maintenance:** Document frozen — no further refinements without strategic approval

---

**END OF SERVICES PAGE DESIGN SPECIFICATION**
