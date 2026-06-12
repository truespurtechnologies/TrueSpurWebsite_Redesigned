# HOMEPAGE DESIGN SPECIFICATION

**Document Type:** Implementation-Ready Design Specification  
**Version:** 1.0  
**Date:** June 12, 2026  
**Status:** Ready for Design & Development  
**Authority:** Aligned with CURRENT-SOURCE-OF-TRUTH.md, FINAL-WEBSITE-STRATEGY.md, HOMEPAGE-COPY-FINAL.md

---

## DOCUMENT PURPOSE

This specification provides complete design guidance for implementing the TrueSpur homepage. All copy is frozen and approved. This document focuses on layout, visual hierarchy, components, and interaction design.

**Key Sources:**
- HOMEPAGE-COPY-FINAL.md (v2.1) — All copy is final
- design-system.md (v2.2) — Typography, colors, spacing
- brand-identity-guidelines.md (v3.0) — Brand standards
- SERVICES-SECTION-DESIGN-SOURCE-OF-TRUTH.md — Premium card patterns

---

## SECTION 1: HERO

### Strategic Purpose
Answer visitor's first question: "What can TrueSpur help me achieve?" Establish credibility and drive primary conversion action.

### Layout Structure

**Desktop (1280px+):**
- Full viewport height (min-h-screen)
- Two-column layout: 60% content / 40% visual space
- Content: Left-aligned, max-width 700px
- Background: Dark slate gradient with animated orange blobs
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
- Hover: Scale 1.05, enhanced shadow

### Component Recommendations

**Background System:**
- Base: `bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900`
- Animated blobs: 3-4 orange/amber gradient circles with blur and opacity animation
- Blob specs: `absolute`, `rounded-full`, `blur-3xl`, `opacity-20`, animate position slowly

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
  15+ years building products across healthcare and complex platforms.
</p>
```

**CTA Button:**
```tsx
<Button className="mt-10 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xl px-10 py-7 rounded shadow-2xl shadow-orange-500/40 hover:from-yellow-600 hover:to-orange-600 hover:scale-105 transition-all duration-300">
  Start Your Project
</Button>
```

### Visual Content Requirements

**Background Animation:**
- 3-4 gradient blob elements
- Colors: orange-500/20, amber-500/15, orange-400/10
- Size: 400-800px diameter
- Position: Scattered across background
- Animation: Slow float (20-40s duration), subtle scale pulse

**Optional Visual Element:**
- Abstract geometric illustration (right side, desktop only)
- Product mockup montage (subtle, not distracting)
- Keep minimal — focus on typography

### Interaction Design

**Hover States:**
- CTA button: Scale 1.05, shadow enhancement (300ms ease-out)
- Smooth gradient shift on hover

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
- Sticky bottom option (optional)

**Spacing:**
- Reduce padding: `py-12` on mobile
- Tighter spacing between elements (mt-4 instead of mt-6)

### Development Notes

**Reusable Components:**
- Hero container pattern (dark background + gradient)
- CTA button component (gradient style)
- Animated blob component (background decoration)

**Performance:**
- Lazy load background animations
- Optimize gradient rendering
- Preload critical fonts (Poppins Black, Inter Regular)

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
- Each card: Product name, one-line description, status badge

**Tertiary:** Section intro and closing statement
- Inter Regular (400)
- `text-base lg:text-lg`
- Color: gray-600

### Component Recommendations

**Product Card:**
```tsx
<div className="group relative bg-white rounded-2xl border border-gray-100/80 p-6 lg:p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
  {/* Left gradient accent */}
  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-amber-400 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  
  {/* Product icon/logo (optional) */}
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
    Beta — Active Development
  </span>
</div>
```

**Status Badge Colors:**
- Production: `bg-green-100 text-green-700`
- Beta: `bg-blue-100 text-blue-700`
- MVP: `bg-purple-100 text-purple-700`
- Concept: `bg-gray-100 text-gray-700`

### Visual Content Requirements

**Product Icons/Logos:**
- Simple icon or first letter in colored circle
- Size: 48px (h-12 w-12)
- Background: `bg-orange-100/70`
- Icon color: `text-orange-600`
- Rounded: `rounded-xl`

**Product Screenshots (Optional):**
- Small thumbnail above card content
- Aspect ratio: 16:9
- Rounded corners: `rounded-lg`
- Subtle border
- Only if high-quality screenshots available

### Interaction Design

**Card Hover:**
- Lift: `-translate-y-1` (4px up)
- Shadow: `shadow-sm` → `shadow-lg`
- Border: Subtle color shift to `border-orange-200/60`
- Background: Very subtle `bg-gray-50/30`
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
- Consistent hover states across site
- Left gradient accent is signature pattern

**Product Data Structure:**
```typescript
interface Product {
  name: string;
  description: string;
  status: 'Production' | 'Beta' | 'MVP' | 'Concept';
  icon: IconComponent;
  link?: string; // Optional link to product page
}
```

---

## SECTION 4: HOW WE BUILD PRODUCTS THAT SCALE

### Strategic Purpose
Demonstrate methodology and process. Build confidence in execution capability. Show structured approach to product development.

### Layout Structure

**Desktop:**
- Section padding: `py-16 md:py-24 lg:py-32`
- Container: `max-w-7xl mx-auto px-4`
- Supporting statement: Centered, max-width 700px
- Process cards: `grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5`

**Tablet:**
- Grid: `grid-cols-2 gap-4` (5th card spans 2 columns or wraps)

**Mobile:**
- Grid: `grid-cols-1 gap-4`

### Visual Hierarchy

**Primary:** Section headline (H2)
- Poppins Extrabold (800)
- `text-4xl lg:text-5xl xl:text-6xl`
- Color: gray-900
- Center-aligned

**Secondary:** Process step cards (equal weight)
- 5 cards, numbered 01-05
- Each card: Number, title, tagline, 2-sentence description

**Tertiary:** Supporting statement
- Inter Regular (400)
- `text-base lg:text-lg`
- Color: gray-600
- Two lines, centered

### Component Recommendations

**Process Card:**
```tsx
<div className="group relative bg-white rounded-2xl border border-gray-100/80 p-6 lg:p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
  {/* Left gradient accent */}
  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-amber-400 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
  
  {/* Step number */}
  <div className="text-5xl font-heading font-black text-orange-500/20 mb-3">
    01
  </div>
  
  {/* Step title */}
  <h3 className="font-heading text-xl lg:text-2xl font-bold text-gray-900 mb-2">
    Discover
  </h3>
  
  {/* Tagline */}
  <p className="text-base font-medium text-gray-700 mb-3">
    Validate before you invest.
  </p>
  
  {/* Description */}
  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
    Understand your market and validate demand before building. Reduce risk, save time, build the right thing.
  </p>
</div>
```

### Visual Content Requirements

**Step Numbers:**
- Large background numbers (01-05)
- Poppins Black (900)
- `text-5xl` or larger
- Color: `text-orange-500/20` (subtle, decorative)
- Position: Top of card

**Icons (Optional):**
- Small icon next to step title
- Size: 24px (h-6 w-6)
- Color: `text-orange-600`
- Lucide React library

### Interaction Design

**Card Hover:**
- Same pattern as Product cards
- Lift: `-translate-y-1`
- Shadow: `shadow-sm` → `shadow-lg`
- Left accent: Opacity 0 → 100%
- Duration: 300ms

**Scroll Animation:**
- Cards stagger in: 100ms delay between each
- Fade in + slide up (400ms per card)

### Mobile Optimization

**Card Adjustments:**
- Padding: `p-6` on mobile
- Step number: `text-4xl` on mobile
- Title: `text-lg` on mobile
- Description: `text-sm` on mobile

**Grid:**
- Single column on mobile
- Vertical progression (01 → 02 → 03 → 04 → 05)

### Development Notes

**Consistent Pattern:**
- Process cards use same base component as Product/Service cards
- Only content differs (number vs icon)
- Maintains visual consistency across homepage

---

## SECTION 5: DEEP HEALTHCARE EXPERTISE

### Strategic Purpose
Position healthcare as differentiator, not identity. Build credibility through domain expertise. Show depth without dominating page.

### Layout Structure

**Desktop:**
- Section padding: `py-16 md:py-24 lg:py-32`
- Background: Light gray (`bg-gray-50`) or white
- Container: `max-w-4xl mx-auto px-4`
- Content: Single column, centered
- Three short paragraphs

**Tablet/Mobile:**
- Same structure, adjusted padding

### Visual Hierarchy

**Primary:** Section headline (H2)
- Poppins Extrabold (800)
- `text-4xl lg:text-5xl xl:text-6xl`
- Color: gray-900
- Center-aligned

**Secondary:** Body copy
- Inter Regular (400)
- `text-base lg:text-lg`
- Color: gray-600
- Three paragraphs, scannable

### Component Recommendations

**Simple Text Section:**
```tsx
<section className="py-16 md:py-24 lg:py-32 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="max-w-4xl mx-auto text-center">
      <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-8">
        Deep Healthcare Expertise
      </h2>
      
      <div className="space-y-6 text-base lg:text-lg text-gray-600">
        <p>Most teams hit a wall with healthcare technology...</p>
        <p>We've navigated it all for over a decade...</p>
        <p>That expertise makes us better builders...</p>
      </div>
    </div>
  </div>
</section>
```

### Visual Content Requirements

**Optional Visual Elements:**
- Government award certificate (small, subtle)
- Healthcare product screenshot
- Technical stack icons (EHR, FHIR, HL7)
- Keep minimal — text is primary

**If Including Visuals:**
- Position below text
- Max-width: 600px
- Subtle shadow
- Rounded corners

### Interaction Design

**Minimal Interaction:**
- No hover states (text section)
- Smooth scroll reveal: Fade in (400ms)

### Mobile Optimization

**Typography:**
- H2: `text-3xl` on mobile
- Body: `text-base` on mobile
- Maintain readability

**Spacing:**
- Reduce padding: `py-12` on mobile
- Paragraph spacing: `space-y-4` on mobile

### Development Notes

**Keep Simple:**
- This section is intentionally minimal
- Focus on credibility, not decoration
- Text-heavy by design (expertise demonstration)

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
  
  {/* Optional: Award badge/certificate image */}
</div>
```

### Visual Content Requirements

**Company Proof:**
- 4 product logos (Clinax, Halo, TrueBill, TafsirAI)
- Simple logo lockups or wordmarks
- Grid layout: 2x2
- White background cards with subtle borders

**Founder Proof:**
- Government award certificate (optional)
- Size: Max 300px wide
- Position: Below text
- Subtle shadow and border

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
        <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-lg px-8 py-6 rounded-full">
          Start Your Project
        </Button>
        <Button variant="outline" className="border-2 border-orange-400/60 text-slate-100 text-lg px-8 py-6 rounded-full hover:bg-white hover:text-slate-900 hover:border-white">
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
- Optional: Subtle background animation (same as Hero)

### Interaction Design

**CTA Hover States:**
- Primary: Scale 1.03, shadow enhancement
- Secondary: Fill white, text color change
- Duration: 300ms

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
3. **Product screenshots** — Optional but helpful for Products section

**Medium Priority:**
4. **Government award certificate** — Adds credibility to Proof section
5. **Background animations** — Hero blob animations enhance premium feel

**Low Priority:**
6. **Illustrations** — Not critical, can be added later
7. **Video content** — Defer to post-launch

### Areas Where Content May Become Visually Heavy

**Healthcare Section:**
- Risk: Too much technical jargon
- Mitigation: Keep to 3 paragraphs, scannable
- Visual break: Optional certificate or icon grid

**Proof Section:**
- Risk: Too much founder biography
- Mitigation: Strict 60/40 company/founder balance
- Visual break: Product logos, award image

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
- [ ] Professional founder photo (high-res, 1000x1000px minimum)
- [ ] Government award certificate (scan or photo, 300 DPI)
- [ ] Optional: Founder workspace photo (authentic, not staged)

### Product Assets Needed
- [ ] Clinax logo or icon (SVG preferred)
- [ ] Halo logo or icon (SVG preferred)
- [ ] TrueBill logo or icon (SVG preferred)
- [ ] TafsirAI logo or icon (SVG preferred)
- [ ] Optional: Product screenshots (1920x1080px, high quality)

### Proof Assets Needed
- [ ] Government award certificate image
- [ ] Optional: Healthcare project photos
- [ ] Optional: Team workspace photos

### Brand Assets Needed
- [ ] TrueSpur logo (SVG, multiple variations)
- [ ] Favicon (ICO, PNG, multiple sizes)
- [ ] Social media images (OG images, Twitter cards)

### Technical Assets
- [ ] Poppins font files (WOFF2, weights 400-900)
- [ ] Inter font files (WOFF2, weights 400-700)
- [ ] Icon library setup (Lucide React)

---

## DESIGN IMPLEMENTATION PRIORITY

### Phase 1: Foundation (Week 1-2)
1. Set up design system (typography, colors, spacing)
2. Create reusable card component
3. Build Hero section
4. Build Product Studio bridge section

### Phase 2: Core Sections (Week 3-4)
5. Build Products section with cards
6. Build Process section with cards
7. Build Healthcare section (text-focused)

### Phase 3: Proof & Conversion (Week 5-6)
8. Build Proof section (two-column layout)
9. Build Final CTA section
10. Implement all CTAs and form integrations

### Phase 4: Polish (Week 7-8)
11. Add animations and micro-interactions
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

---

**Document Version:** 1.0  
**Last Updated:** June 12, 2026  
**Status:** ✅ Ready for Design & Development  
**Next Steps:** Begin Phase 1 implementation (Foundation)
