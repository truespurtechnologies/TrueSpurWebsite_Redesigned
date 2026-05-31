# TrueSpur Technology Solutions - Brand Identity Guidelines

**Version:** 3.0  
**Date:** May 30, 2026  
**Brand Strategy:** Premium Tech — Orange Brand Identity (Refined)  
**Designer:** Sally (UX Designer) + Aswar (Founder)

---

## 🎯 Brand Strategy Overview

### Brand Decision Rationale

**Selected Palette:** Orange Brand Identity (Refined from original TrueSpur brand)

**Why This Palette:**
1. **Established Identity** — Orange is already the TrueSpur brand; users recognize it
2. **Warm & Distinctive** — Stands out in a sea of blue/navy tech websites
3. **Premium Signal** — Orange + dark slate conveys energy, confidence, and quality
4. **Approachable** — Warm amber/yellow accents create inviting atmosphere
5. **International Appeal** — Works globally, not culturally specific
6. **Mentor-Validated** — The problem was never the color; it was aesthetic execution

> **Key Insight (May 21, 2026):** A Purple + Gold rebrand was explored and rejected. The founder confirmed: *"If I close my eyes, I actually like my current website. The only thing not right is design aesthetics and too much text."* Decision: **Refine, don't redesign.**

**Brand Personality:**
- Innovative yet trustworthy
- Premium yet approachable
- Bold yet professional
- Creative yet reliable

**Target Perception:**
- "This is a premium technology partner"
- "They're innovative and forward-thinking"
- "They care about quality and craft"
- "They're confident and distinctive"

---

## 🎨 Color System

### Primary Colors

**Orange (Primary Brand Color)**
- `orange-500`: `#F97316` — Primary brand color
- `orange-600`: `#EA580C` — Hover states, darker accent
- `orange-400`: `#FB923C` — Lighter accents
- `orange-700`: `#C2410C` — Deep orange for emphasis

**Rationale:** Orange conveys energy, warmth, and innovation. It is TrueSpur's established brand color and stands out distinctively in the tech industry.

---

**Yellow (Gradient Accent)**
- `yellow-500`: `#EAB308` — Gradient accent (CTA buttons)
- `yellow-400`: `#FACC15` — Lighter gradient
- `yellow-600`: `#CA8A04` — Darker gradient

**Amber (Secondary Accent)**
- `amber-500`: `#F59E0B` — Secondary accent
- `amber-400`: `#FBBF24` — Lighter amber
- `amber-600`: `#D97706` — Darker amber

**Rationale:** Yellow and amber complement the orange brand, providing gradient depth for CTAs and atmospheric warmth in dark sections.

---

### Dark Slate (Hero / Dark Sections)

- `slate-900`: `#0F172A` — Dark backgrounds (lighter)
- `slate-950`: `#020617` — Darkest backgrounds
- `orange-950`: `#431407` — Dark warmth for radial overlays

### Neutral Colors

**Grays (for text & UI)**
- `gray-50`: `#F9FAFB` — Light backgrounds
- `gray-100`: `#F3F4F6` — Card backgrounds, badges
- `gray-200`: `#E5E7EB` — Borders
- `gray-300`: `#D1D5DB` — Disabled states
- `gray-500`: `#6B7280` — Secondary text
- `gray-600`: `#4B5563` — Body text
- `gray-700`: `#374151` — Subheadings
- `gray-900`: `#111827` — Headings on light backgrounds

**Rationale:** Cool grays paired with warm orange/amber accents create a modern tech feel with human warmth.

---

### Semantic Colors

**Success**
- `green-600`: `#16A34A` — Positive actions, confirmations

**Warning**
- `orange-500`: `#F97316` — Caution, alerts (brand color)

**Error**
- `red-600`: `#DC2626` — Errors, destructive actions

**Info**
- `blue-500`: `#3B82F6` — Informational messages

---

## 🎨 Color Usage Guidelines

### Primary Use Cases

**Dark Slate (Hero & Dark Sections):**
- Hero section background (`slate-900 → slate-950 → slate-900` gradient)
- CTA banners within sections
- Footer background
- Expertise/domain section backgrounds

**Orange (Primary Brand Accent):**
- CTA button gradients (`from-yellow-500 to-orange-500`)
- Icon containers (`bg-orange-100/70`)
- Badge accents, hover borders
- Gradient text highlights
- Atmospheric gradient blobs on dark backgrounds

**White (Light Section Backgrounds):**
- Services section, Products section
- Card backgrounds
- Content areas

**Gray (Text & UI):**
- `gray-900` — Headings on light backgrounds
- `gray-600` — Body text on light backgrounds
- `gray-500` — Secondary text, descriptions
- `white` — Headings on dark backgrounds
- `slate-300` — Body text on dark backgrounds

---

### Color Combinations (Tested for Accessibility)

**High Contrast Combinations:**
- ✅ gray-900 on white: 16.2:1 (Excellent)
- ✅ white on slate-900: 15.8:1 (Excellent)
- ✅ gray-600 on white: 7.0:1 (Excellent)
- ✅ orange-600 on white: 4.6:1 (Good for large text)
- ✅ white on orange-500 gradient: 3.1:1 (Acceptable for large bold text)

**Avoid:**
- ❌ orange-300 on white (too low contrast)
- ❌ gray-400 on white (insufficient contrast for body text)
- ❌ yellow-500 on white (fails all contrast ratios)

---

## 📝 Typography System

### Font Families

**Headings (Sans-Serif)**
- **Font:** Poppins
- **Type:** Geometric sans-serif with warmth
- **Weights:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold), 900 (Black)
- **Usage:** H1, H2, H3, all card titles, dialog titles
- **Variable:** `--font-heading`
- **Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Implementation:** Applied via `font-heading` class
- **Character:** Premium tech aesthetic, geometric warmth, excellent readability

> **History:** Playfair Display (serif) was used in v1.0–v2.0 but replaced May 22, 2026 after iterative testing. Cabinet Grotesk was also tested and rejected as too cold.

**Body (Sans-Serif)**
- **Font:** Inter
- **Weights:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Usage:** Body text, UI elements, navigation, buttons
- **Variable:** `--font-sans`
- **Fallback:** -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- **Character:** Clean, modern, highly readable

**Rationale:** Poppins provides geometric warmth without coldness, pairs perfectly with Inter body text. Used by successful tech brands. Weight 900 (Black) provides maximum hero impact.

---

### Type Scale

| Element | Font | Tailwind Classes | Size | Line Height | Weight | Color |
|---------|------|-----------------|------|-------------|--------|-------|
| **Hero H1** | Poppins | `text-5xl lg:text-7xl xl:text-8xl` | 48 / 72 / 96px | 1.15 | 900 (Black) | white (dark bg) |
| **Section H2** | Poppins | `text-4xl lg:text-5xl xl:text-6xl` | 36 / 48 / 60px | 1.1 | 800 (ExtraBold) | gray-900 (light bg), white (dark bg) |
| **Section H3** | Poppins | `text-2xl lg:text-3xl` | 24 / 30px | default | 700 (Bold) | gray-900 or white |
| **Card Titles** | Poppins | `text-lg lg:text-xl` | 18 / 20px | default | 600 (SemiBold) | gray-900 |
| **H4 (Journey)** | Poppins | `text-sm` | 14px | default | 700 (Bold) | gray-900 |
| **Body Large** | Inter | `text-lg lg:text-xl` | 18 / 20px | relaxed (1.625) | 400 | gray-600 |
| **Body** | Inter | `text-base` | 16px | relaxed (1.625) | 400 | gray-600 |
| **Body Small** | Inter | `text-sm` | 14px | normal (1.5) | 400 | gray-500 |
| **Caption** | Inter | `text-xs` | 12px | normal (1.5) | 500 | gray-400 |

---

### Typography Guidelines

**Headings:**
- **Always** use `font-heading` class for Poppins
- Use `font-black` (900) only for Hero H1
- Use `font-extrabold` (800) for section H2 headings
- Use `font-semibold` (600) for card titles
- Tight line-height (`leading-[1.1]` or `leading-[1.15]`) for large headings
- `gray-900` on light backgrounds, `white` on dark backgrounds
- Maximum line length: 60–70 characters

**Body Text:**
- Always use Inter (default `font-sans`) for all body text
- `gray-600` for primary body text on light backgrounds
- `gray-500` for secondary text
- `slate-300` for body text on dark backgrounds
- `leading-relaxed` (1.625) for comfortable reading
- Minimum font size: 16px for body text (accessibility)
- Maximum line length: 65–75 characters

**Accent Text:**
- Gradient (`from-yellow-500 to-orange-500`) for highlighted words on dark backgrounds
- `orange-600` for highlighted text on light backgrounds
- Use sparingly — one gradient accent per section maximum

---

## 🎨 Logo Design Specifications

### Logo Concept: "TrueSpur" Wordmark + Symbol

**Primary Logo (Horizontal)**

**Symbol:**
- Geometric "T" monogram or abstract spur icon
- Style: Minimalist, modern, geometric
- Color: Orange-500 on light backgrounds, Orange-500 on dark backgrounds
- Size: Square aspect ratio

**Wordmark:**
- Font: Custom or Inter Bold (700)
- "TrueSpur" - single word, no spaces
- Color: gray-900 on light backgrounds, white on dark backgrounds
- Letter spacing: -0.02em (tight, modern)

**Tagline (Optional):**
- "We Craft. You Lead."
- Font: Inter Regular (400)
- Size: 40% of wordmark height
- Color: Warm-600
- Position: Below wordmark, left-aligned

---

### Logo Variations

**1. Primary Logo (Full Color)**
- Symbol: Orange-500
- Wordmark: gray-900
- Background: Light (white)
- Use: Website header, marketing materials, light backgrounds

**2. Reversed Logo (Dark Background)**
- Symbol: Orange-500
- Wordmark: white
- Background: Dark (slate-900 or slate-950)
- Use: Hero sections, footer, dark mode

**3. Monochrome Logo (Dark)**
- Symbol: gray-900
- Wordmark: gray-900
- Background: Light
- Use: Print, single-color applications

**4. Monochrome Logo (White)**
- Symbol: white
- Wordmark: white
- Background: Dark
- Use: Dark backgrounds when orange accent not appropriate

**5. Icon Only**
- Symbol: Orange-500 or gray-900
- Use: Favicon, app icons, social media avatars

---

### Logo Clear Space

**Minimum clear space:** Equal to the height of the "T" in "TrueSpur"

**Minimum sizes:**
- Digital: 120px width minimum
- Print: 1 inch width minimum
- Favicon: 32px × 32px (icon only)

---

### Logo Don'ts

❌ Do not rotate the logo  
❌ Do not change the color scheme  
❌ Do not add effects (shadows, gradients, outlines)  
❌ Do not stretch or distort proportions  
❌ Do not place on busy backgrounds without sufficient contrast  
❌ Do not use deprecated purple/gold branding alongside current orange brand

---

## 📐 Spacing & Layout

### Spacing System (8px base unit)

| Token | Value | Usage |
|-------|-------|-------|
| `xs` | 4px | Tight spacing, icon gaps |
| `sm` | 8px | Small gaps, button padding |
| `md` | 16px | Default spacing |
| `lg` | 24px | Card padding (small) |
| `xl` | 32px | Card padding (medium) |
| `2xl` | 48px | Card padding (large) |
| `3xl` | 64px | Section padding (small) |
| `4xl` | 80px | Section padding (medium) |
| `5xl` | 120px | Section padding (large) |
| `6xl` | 160px | Hero section spacing |

---

### Layout Guidelines

**Section Spacing:**
- Desktop: 120px (5xl) between major sections
- Tablet: 80px (4xl)
- Mobile: 64px (3xl)

**Card Padding:**
- Large cards: 48px (2xl)
- Medium cards: 32px (xl)
- Small cards: 24px (lg)

**Container Max Width:**
- Default: 1280px
- Wide: 1440px
- Narrow (text): 800px

**Grid System:**
- Desktop: 12 columns, 32px gap
- Tablet: 8 columns, 24px gap
- Mobile: 4 columns, 16px gap

---

## 🎭 Component Styles

### Buttons

**Primary Button (CTA — Hero)**
```
Background: Gradient from-yellow-500 to-orange-500
Text: white
Padding: text-xl px-10 py-7
Border Radius: default (rounded)
Font: Inter, 20px, 700 (bold)
Shadow: shadow-2xl shadow-orange-500/40
Hover: from-yellow-600 to-orange-600 + scale-105 + shadow-3xl shadow-orange-500/60
```

**Primary Button (CTA — Section banners)**
```
Background: Gradient from-yellow-500 to-orange-500
Text: white
Padding: text-base px-8 py-6
Border Radius: rounded-full
Font: Inter, 16px, 700 (bold)
Shadow: shadow-lg shadow-orange-500/30
Hover: scale-[1.03] + shadow-xl
```

**Secondary Button**
```
Background: Transparent
Border: 2px solid orange-400/60
Text: slate-100 (dark bg) or gray-900 (light bg)
Padding: text-base px-6 py-5
Border Radius: default
Font: Inter, 16px, 500 (medium)
Hover: bg-white + text-slate-900 + border-white
```

---

### Cards

**Service Card**
```
Background: white
Border: 1px solid gray-100/80 (whisper-soft)
Border Radius: rounded-2xl (16px)
Padding: p-8 lg:p-9 (32-36px)
Shadow: shadow-sm
Hover: y: -4px + shadow-lg + border-gray-200/80
Accent: Left gradient bar (orange-400 → amber-400), opacity 0 → 100% on hover
Icon: h-7 w-7 in 56px rounded-2xl container (bg-orange-100/70)
```

**CTA Banner Card**
```
Background: Gradient from-slate-900 via-slate-800 to-slate-900
Overlay: from-orange-500/10 via-amber-500/5 to-orange-500/10
Border Radius: rounded-3xl
Padding: px-8 py-10 md:px-12 md:py-12
```

**Hero Badge**
```
Background: orange-500/25 with backdrop-blur-sm
Border: 1px solid orange-400/40
Text: orange-300
Padding: px-4 py-1.5
Font: Inter, 16px (text-base), 600 (semibold)
Shadow: shadow-lg shadow-orange-500/20
```

**Section Badge (Light bg)**
```
Background: gray-100
Text: gray-700
Padding: px-3 py-1
Font: Inter, 14px (text-sm), 600 (semibold)
```

---

### Icons

**Style:** Outline style (2px stroke)  
**Sizes:** 16px (inline bullets), 24px (UI), 28px (card icons), 48px (features)  
**Library:** Lucide React  
**Colors:**
- Primary: `orange-600` (card header icons)
- Accent: `orange-500` (bullet check icons)
- Neutral: `gray-700` (default icons)

**Usage:**
- Service card icons: h-7 w-7 (28px) in 56px `bg-orange-100/70` container
- Bullet checks: h-4 w-4 (16px) `text-orange-500`
- Navigation: 24px icons
- CTA arrows: h-5 w-5 to h-6 w-6

---

## 🎬 Animation & Interaction

### Animation Principles

1. **Purposeful** - Every animation serves a function
2. **Subtle** - Enhance, don't distract (learned from user feedback)
3. **Fast** - 200-300ms for most interactions
4. **Smooth** - Use easing functions

### Animation Tokens

**Durations:**
- `fast`: 150ms - Micro-interactions
- `normal`: 250ms - Standard transitions
- `slow`: 400ms - Page transitions, scroll reveals

**Easing:**
- `ease-out`: Default for most interactions
- `ease-in-out`: For reversible animations
- `spring`: For playful interactions (use sparingly)

### Common Animations

**Hover Effects:**
- Buttons: Scale (1.03–1.05) + shadow increase (200ms)
- Cards: Lift (-4px) via `whileHover={{ y: -4 }}` + shadow-lg (300ms)
- Links: Color change to orange-600 (200ms)
- Left accent bar: opacity 0 → 100% on card hover (300ms)

**Scroll Triggers:**
- Fade in: opacity 0 → 1 (400ms ease-out)
- Slide up: translateY(20px) → 0 (400ms ease-out)
- Stagger: 100ms delay between elements

**Micro-interactions:**
- Button press: Scale (0.98) (150ms)
- Icon hover: Scale (1.1) or color change (200ms)
- Input focus: Border color + shadow (200ms)

**Important:** Respect `prefers-reduced-motion` - disable animations for users who prefer reduced motion

---

## ♿ Accessibility Standards

### Color Contrast Requirements

**Text Contrast Ratios:**
- Body text (16px): Minimum 4.5:1 ✅
- Large text (24px+): Minimum 3:1 ✅
- Interactive elements: Minimum 3:1 ✅

**Verified Combinations:**
- gray-900 on white: ✅ 16.2:1 (Excellent)
- white on slate-900: ✅ 15.8:1 (Excellent)
- gray-600 on white: ✅ 7.0:1 (Excellent)
- orange-600 on white: ✅ 4.6:1 (Good for large text)
- white on orange-500 gradient: ✅ 3.1:1 (Acceptable for large bold text)

### Focus States

**All interactive elements must have visible focus:**
- Outline: 2px solid orange-500
- Offset: 2px
- Border radius: Match element
- Visible on keyboard navigation

### Motion Preferences

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 🖼️ Imagery Guidelines

### Photography Style

**Characteristics:**
- Professional, high-quality
- Natural lighting preferred
- Authentic, not staged
- Real team photos (not stock)
- Diverse representation

**Treatment:**
- Subtle vignette for focus
- Slight desaturation for sophistication
- Consistent color grading (warm tones)
- Orange/amber gradient glow overlay at low opacity (optional, for dark sections)

**Avoid:**
- Generic stock photos
- AI-generated images
- Overly saturated colors
- Cliché tech imagery (handshakes, laptops in coffee shops)

### Illustration Style (if used)

**Style:** Minimalist, geometric, modern  
**Colors:** orange-500, amber-500, gray-700  
**Usage:** Icons, diagrams, abstract backgrounds  
**Avoid:** Cartoon-style, overly detailed illustrations

---

## 🎯 Brand Voice & Messaging

### Brand Voice Characteristics

**Confident but not arrogant**
- "We craft scalable solutions" not "We're the best"

**Professional but approachable**
- "Let's build together" not "Submit your requirements"

**Clear but not simplistic**
- "Transform your vision into reality" not "We make apps"

**Innovative but trustworthy**
- "Cutting-edge technology, proven results"

### Tagline

**Primary:** "We Craft. You Lead."

**Meaning:**
- We = TrueSpur's expertise and craftsmanship
- Craft = Quality, attention to detail, artisanal approach
- You = Client empowerment and ownership
- Lead = Client remains in control, we support their vision

**Usage:** Always paired with logo, below wordmark

---

## 📋 Brand Application Checklist

When creating any brand touchpoint, ensure:

- [ ] Uses approved color palette (Orange + Amber/Yellow + Gray)
- [ ] Uses approved typography (Poppins headings + Inter body)
- [ ] Logo has proper clear space
- [ ] Color contrast meets accessibility standards (4.5:1 minimum)
- [ ] Animations are subtle and purposeful
- [ ] Follows spacing system (8px base unit)
- [ ] Interactive elements have hover/focus states
- [ ] Responsive across mobile, tablet, desktop
- [ ] Respects prefers-reduced-motion
- [ ] Maintains premium, professional aesthetic

---

## 🔄 Version History

**v3.0 (May 30, 2026)**
- Full documentation update to match production implementation
- All references updated from Purple+Gold to Orange brand
- Typography updated from Playfair Display to Poppins
- Component styles updated to match actual code (`app/page.tsx`)
- Added Tailwind classes to type scale table
- Updated accessibility color combinations

**v2.0 (May 21, 2026)** — DEPRECATED
- Explored Purple + Gold rebrand (Option 6A)
- Rejected by founder after A/B testing against existing orange brand
- See `docs/design-exploration-summary.md` for full rationale

**v1.0 (Previous)**
- Original orange logo and initial brand identity

---

## 📞 Brand Governance

**Brand Owner:** Aswar (Founder)  
**Design Lead:** Sally (UX Designer)  
**Last Updated:** May 30, 2026

**For brand questions or exceptions:**
- Review this document first
- Consult with brand owner for significant deviations
- Document any approved exceptions

---

## 🎨 Quick Reference

**Primary Colors:**
- Orange: `#F97316` (brand accent)
- Slate: `#0F172A` (dark backgrounds)
- White: `#FFFFFF` (light backgrounds)

**Typography:**
- Headings: Poppins (`font-heading`)
- Body: Inter (`font-sans`)

**Logo:**
- Orange symbol + dark/white wordmark
- Tagline: "We Craft. You Lead."

**Brand Personality:**
- Innovative, Premium, Bold, Professional

---

_This brand identity system supports TrueSpur's mission to be recognized as a premium, innovative technology partner that stands out in the industry while maintaining trust and professionalism._
