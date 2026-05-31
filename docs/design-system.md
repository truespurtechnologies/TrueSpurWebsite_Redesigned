# TrueSpur Design System

**Version:** 2.2  
**Date:** May 30, 2026  
**Purpose:** Premium brand refinement - Orange brand identity with Poppins + Inter typography

---

## 🎨 Color Palette

### Primary Colors

**Orange (Primary Brand)**
- `orange-500`: `#F97316` - Primary brand color
- `orange-600`: `#EA580C` - Hover states, darker accent
- `orange-400`: `#FB923C` - Lighter accents
- `orange-700`: `#C2410C` - Deep orange for emphasis

**Yellow (Accent)**
- `yellow-500`: `#EAB308` - Gradient accent
- `yellow-400`: `#FACC15` - Lighter gradient
- `yellow-600`: `#CA8A04` - Darker gradient

**Amber (Secondary Accent)**
- `amber-500`: `#F59E0B` - Secondary accent
- `amber-400`: `#FBBF24` - Lighter amber
- `amber-600`: `#D97706` - Darker amber

### Neutral Colors

**Grays**
- `gray-50`: `#F9FAFB` - Light backgrounds
- `gray-100`: `#F3F4F6` - Card backgrounds
- `gray-200`: `#E5E7EB` - Borders
- `gray-300`: `#D1D5DB` - Disabled states
- `gray-500`: `#6B7280` - Secondary text
- `gray-600`: `#4B5563` - Body text
- `gray-700`: `#374151` - Subheadings
- `gray-800`: `#1F2937` - Dark text
- `gray-900`: `#111827` - Headings

**Dark Slate (Hero/Dark Sections)**
- `slate-900`: `#0F172A` - Dark backgrounds
- `slate-950`: `#020617` - Darkest backgrounds

### Semantic Colors

**Success**
- `green-600`: `#16A34A` - Green for positive actions

**Warning**
- `orange-500`: `#F97316` - Orange for caution (brand color)

**Error**
- `red-600`: `#DC2626` - Red for errors

---

## 📝 Typography

### Font Families

**Headings (Sans-Serif)**
- **Font:** Poppins
- **Type:** Geometric sans-serif with warmth
- **Weights:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold), 800 (ExtraBold), 900 (Black)
- **Usage:** H1, H2, H3, all card titles, dialog titles
- **Variable:** `--font-heading`
- **Fallback:** -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- **Implementation:** Applied via `font-heading` class
- **Rationale:** Premium tech aesthetic, geometric warmth, excellent readability
- **Previous:** Playfair Display (serif) - Replaced May 22, 2026

**Body (Sans-Serif)**
- **Font:** Inter
- **Weights:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Usage:** Body text, UI elements, navigation, descriptions
- **Variable:** `--font-sans`
- **Fallback:** -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif
- **Implementation:** Default font via `font-sans` class

### Implemented Type Scale

**Homepage & Product Pages:**

| Element | Tailwind Classes | Actual Size | Line Height | Weight | Usage |
|---------|-----------------|-------------|-------------|--------|-------|
| **Hero H1** | `text-5xl lg:text-7xl xl:text-8xl` | 48px / 72px / 96px | 1.15 | 900 (Black) | Homepage hero - Poppins |
| **Section H2** | `text-4xl lg:text-5xl xl:text-6xl` | 36px / 48px / 60px | 1.1 | 800 (ExtraBold) | Major section headings (e.g. Services) |
| **Expertise H2** | `text-4xl lg:text-5xl` | 36px / 48px | 1.1 | 700 (Bold) | Dark background sections |
| **Product H1** | `text-5xl md:text-6xl lg:text-7xl` | 48px / 60px / 72px | Default | 700 (Bold) | Product page titles |
| **Product Subheading** | `text-2xl md:text-3xl` | 24px / 30px | Default | 600 (Semibold) | Product taglines |
| **Section H3** | `text-3xl lg:text-4xl` | 30px / 36px | Default | 700 (Bold) | Subsection headings |
| **Large Card Titles** | `text-2xl lg:text-3xl` | 24px / 30px | Default | 600/700 | Product cards, CTA banners |
| **Medium Card Titles** | `text-xl lg:text-2xl` | 20px / 24px | Default | 400/600 | Feature cards |
| **Small Card Titles** | `text-lg lg:text-xl` | 18px / 20px | Default | 400/600 | Detail cards |
| **Dialog Titles** | `text-2xl lg:text-3xl` | 24px / 30px | Default | 400 | Modal/dialog headings |
| **Body Large** | `text-lg lg:text-xl` | 18px / 20px | Relaxed (1.625) | 400 | Intro paragraphs |
| **Body** | `text-base` | 16px | Relaxed (1.625) | 400 | Standard body text |
| **Body Small** | `text-sm` | 14px | Normal (1.5) | 400 | Secondary text |
| **Caption** | `text-xs` | 12px | Normal (1.5) | 500 | Labels, metadata |

### Typography Implementation Details

**All Headings Use Poppins** (via `font-heading` class):
- Homepage: Hero, Services, Expertise, Products, Stats, Awards, About, Customers, Contact
- Product Pages: Main titles, subheadings, card titles, waitlist headings
- Components: Dialog titles, form headings

**Specific Implementations (as of May 30, 2026):**
```tsx
// Hero Heading (Homepage)
<h1 className="font-heading text-5xl lg:text-7xl xl:text-8xl font-black leading-[1.15]">

// Section Headings (Homepage — e.g. Services)
<h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.1]">

// Service Card Titles
<CardTitle className="font-heading text-lg lg:text-xl font-semibold">

// CTA Banner H3
<h3 className="font-heading text-2xl lg:text-3xl font-bold">

// Product Page Main Title
<h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold">

// Dialog Titles
<DialogTitle className="font-heading text-2xl lg:text-3xl">
```

### Typography Guidelines

**Headings:**
- **Always** use `font-heading` class for Poppins
- Use `font-black` (900) only for Hero H1
- Use `font-extrabold` (800) for section H2 headings
- Use `font-bold` (700) for H3 / CTA banner headings
- Use `font-semibold` (600) for card titles
- Tight line-height (`leading-[1.1]` or `leading-[1.15]`) for large headings
- Gray-900 for light backgrounds
- White for dark backgrounds
- Maximum line length: 60-70 characters

**Body Text:**
- Use Inter (default `font-sans`) for all body text
- Gray-600 for primary body text
- Gray-500 for secondary text
- `leading-relaxed` (1.625) for comfortable reading
- Maximum line length: 65-75 characters
- Minimum font size: 16px for body text

**Color Usage:**
- Headings on light backgrounds: `text-gray-900`
- Headings on dark backgrounds: `text-white`
- Body text on light backgrounds: `text-gray-600` or `text-gray-700`
- Body text on dark backgrounds: `text-slate-200` or `text-white`
- Subheadings: `text-gray-700`

---

## 📏 Spacing System

### Base Unit: 8px

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

### Spacing Guidelines

**Section Gaps:**
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

**White Space Philosophy:**
- "Luxury brands breathe" - generous spacing creates premium feel
- Never cram content
- Use white space to guide attention

---

## 🎭 Components

### Buttons

**Primary CTA Button (Hero)**
```
Background: Gradient from-yellow-500 to-orange-500
Text: white
Padding: text-xl px-10 py-7
Font: Inter, 20px, 700 (bold)
Shadow: shadow-2xl shadow-orange-500/40
Hover: from-yellow-600 to-orange-600 + scale-105 + shadow-3xl
```

**Primary CTA Button (Section banners)**
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
Font: Inter, 16px, 500 (medium)
Hover: bg-white + text-slate-900 + border-white
```

### Cards

**Service Card**
```
Background: white
Border: 1px solid gray-100/80 (whisper-soft)
Border Radius: rounded-2xl (16px)
Padding: p-8 lg:p-9 (32-36px)
Shadow: shadow-sm
Hover: y: -4px + shadow-lg + border-gray-200/80
Accent: Left gradient bar (orange-400 → amber-400), opacity 0→100% on hover
Icon: h-7 w-7 in 56px container (bg-orange-100/70)
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

### Navigation

**Desktop Navigation**
```
Background: White/95 (backdrop blur)
Height: 80px
Border Bottom: 1px solid gray-200
Font: Inter, 16px, 500
Active: orange-600 underline (3px)
Hover: orange-600 color
```

**Mobile Navigation**
```
Background: White
Full height drawer
Font: Inter, 18px, 500
Padding: 24px
```

---

## 🎬 Animations & Interactions

### Principles

1. **Purposeful** - Every animation serves a function
2. **Subtle** - Enhance, don't distract
3. **Fast** - 200-300ms for most interactions
4. **Smooth** - Use easing functions

### Animation Tokens

**Durations:**
- `fast`: 150ms - Micro-interactions
- `normal`: 250ms - Standard transitions
- `slow`: 400ms - Page transitions

**Easing:**
- `ease-out`: Default for most interactions
- `ease-in-out`: For reversible animations
- `spring`: For playful interactions

### Common Animations

**Hover Effects:**
- Buttons: Lift (-2px) + shadow increase
- Cards: Lift (-4px) + shadow increase
- Links: Color change (250ms)

**Scroll Triggers:**
- Fade in: opacity 0 → 1 (400ms)
- Slide up: translateY(20px) → 0 (400ms)
- Stagger: 100ms delay between elements

**Micro-interactions:**
- Button press: Scale (0.98) (150ms)
- Icon hover: Rotate or scale (200ms)
- Input focus: Border color + shadow (200ms)

---

## 📐 Layout Grid

### Grid System

**Desktop (1280px+)**
- 12 columns
- Gap: 32px
- Margin: 64px

**Tablet (768px - 1279px)**
- 8 columns
- Gap: 24px
- Margin: 48px

**Mobile (< 768px)**
- 4 columns
- Gap: 16px
- Margin: 24px

### Breakpoints

```
sm: 640px   - Small devices
md: 768px   - Tablets
lg: 1024px  - Laptops
xl: 1280px  - Desktops
2xl: 1536px - Large screens
```

---

## 🖼️ Imagery Guidelines

### Photography

**Style:**
- Professional, high-quality
- Natural lighting preferred
- Authentic, not staged
- Team photos: Real people, real workspace

**Treatment:**
- Subtle vignette for focus
- Slight desaturation for sophistication
- Consistent color grading

**Avoid:**
- Stock photos
- AI-generated images
- Generic office photos
- Overly saturated colors

### Icons

**Style:**
- Outline style (2px stroke)
- 16px (inline bullets), 24px (UI), 28px (card icons), 48px (features)
- Lucide React library
- orange-600 for card header icons
- orange-500 for bullet check icons
- gray-700 for default/neutral icons

**Usage:**
- Service card icons: h-7 w-7 (28px) in 56px bg-orange-100/70 container
- Bullet checks: h-4 w-4 (16px) text-orange-500
- Navigation: 24px icons
- CTA arrows: h-5 w-5 to h-6 w-6

---

## ♿ Accessibility

### Color Contrast

**Text Contrast Ratios:**
- Body text: Minimum 4.5:1
- Large text (24px+): Minimum 3:1
- Interactive elements: Minimum 3:1

**Verified Combinations:**
- gray-900 on white: ✅ 16.2:1
- gray-600 on white: ✅ 7.0:1
- white on slate-900: ✅ 15.8:1
- orange-600 on white: ✅ 4.6:1 (large text)

### Focus States

**All interactive elements must have visible focus:**
- Outline: 2px solid orange-500
- Offset: 2px
- Border radius: Match element

### Motion

**Respect user preferences:**
- Implement `prefers-reduced-motion`
- Disable animations for users who prefer reduced motion
- Maintain functionality without animations

---

## 🎯 Design Principles

### 1. Visual-First Communication
- Show, don't tell
- Icons > paragraphs
- Images > text blocks
- Hierarchy > decoration

### 2. Premium Quality Signals
- Generous white space
- Sophisticated color palette
- Custom typography
- High-quality imagery

### 3. Trust Architecture
- Credibility above fold
- Human faces visible
- Social proof integrated
- Transparency in process

### 4. 60-Second Test
- Value clear immediately
- Scannable content
- Visual hierarchy guides attention
- CTAs obvious but not pushy

---

## 📦 Component Checklist

When creating new components, ensure:

- [ ] Uses design system colors
- [ ] Uses design system typography
- [ ] Uses design system spacing
- [ ] Has hover/focus states
- [ ] Is responsive (mobile, tablet, desktop)
- [ ] Has proper contrast ratios
- [ ] Animations are subtle and purposeful
- [ ] Follows accessibility guidelines
- [ ] Matches premium brand aesthetic

---

## 🔄 Version History

**v2.2 (May 30, 2026)**
- Synced all documentation with production code (`app/page.tsx`)
- Fixed Hero H1 type scale: `text-5xl lg:text-7xl xl:text-8xl` (48/72/96px)
- Fixed Section H2 weight: `font-extrabold` (800), added xl breakpoint
- Updated all component styles from Navy/Gold to Orange brand tokens
- Updated icon specs to match actual Lucide usage
- Updated accessibility color combos and focus states
- Corrected all Playfair Display references → Poppins

**v2.0 (May 22, 2026)**
- Typography system refined: Poppins replaced Playfair Display for headings
- Updated color palette to Orange brand (#F97316)
- Added font-black (900) weight for hero headings
- 56+ typography elements made consistent

**v1.0 (May 20, 2026)**
- Initial design system
- Premium color palette (Navy + Gold) — DEPRECATED
- Typography system (Playfair Display + Inter) — DEPRECATED
- Spacing system (8px base)
- Component guidelines
- Animation principles
- Accessibility standards

---

_This design system supports the TrueSpur website redesign to create a premium, visual-first experience with consistent typography and orange brand identity that builds trust within 60 seconds._
