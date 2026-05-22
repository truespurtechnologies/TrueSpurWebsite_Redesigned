# TrueSpur Design System

**Version:** 2.1  
**Date:** May 22, 2026 (Updated 11:55 PM)  
**Purpose:** Premium brand refinement - Orange brand identity with modern tech typography

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
| **Hero H1** | `text-5xl lg:text-6xl xl:text-7xl` | 48px / 60px / 72px | 1.15 | 900 (Black) | Homepage hero - Poppins - UPDATED May 22 |
| **Section H2** | `text-5xl lg:text-6xl` | 48px / 60px | 1.1 | 700 (Bold) | Major section headings |
| **Expertise H2** | `text-4xl lg:text-5xl` | 36px / 48px | 1.1 | 700 (Bold) | Dark background sections |
| **Product H1** | `text-5xl md:text-6xl lg:text-7xl` | 48px / 60px / 72px | Default | 700 (Bold) | Product page titles |
| **Product Subheading** | `text-2xl md:text-3xl` | 24px / 30px | Default | 600 (Semibold) | Product taglines |
| **Section H3** | `text-3xl lg:text-4xl` | 30px / 36px | Default | 700 (Bold) | Subsection headings |
| **Large Card Titles** | `text-2xl lg:text-3xl` | 24px / 30px | Default | 400/600 | Service, product cards |
| **Medium Card Titles** | `text-xl lg:text-2xl` | 20px / 24px | Default | 400/600 | Feature cards |
| **Small Card Titles** | `text-lg lg:text-xl` | 18px / 20px | Default | 400/600 | Detail cards |
| **Dialog Titles** | `text-2xl lg:text-3xl` | 24px / 30px | Default | 400 | Modal/dialog headings |
| **Body Large** | `text-lg lg:text-xl` | 18px / 20px | Relaxed (1.625) | 400 | Intro paragraphs |
| **Body** | `text-base` | 16px | Relaxed (1.625) | 400 | Standard body text |
| **Body Small** | `text-sm` | 14px | Normal (1.5) | 400 | Secondary text |
| **Caption** | `text-xs` | 12px | Normal (1.5) | 500 | Labels, metadata |

### Typography Implementation Details

**All Headings Use Playfair Display:**
- Homepage: Hero, Services, Expertise, Products, Stats, Awards, About, Customers, Contact
- Product Pages: Main titles, subheadings, card titles, waitlist headings
- Components: Dialog titles, form headings

**Specific Implementations:**
```tsx
// Hero Heading (Homepage)
<h1 className="font-heading text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.05]">

// Section Headings (Homepage)
<h2 className="font-heading text-5xl lg:text-6xl font-bold leading-[1.1]">

// Service Card Titles
<CardTitle className="font-heading text-2xl lg:text-3xl">

// Expertise Card Titles
<CardTitle className="font-heading text-2xl sm:text-3xl font-semibold">

// Product Page Main Title
<h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold">

// Dialog Titles
<DialogTitle className="font-heading text-2xl lg:text-3xl">
```

### Typography Guidelines

**Headings:**
- **Always** use `font-heading` class for Playfair Display
- Use `font-extrabold` (800) only for hero headings
- Use `font-bold` (700) for section headings
- Use `font-semibold` (600) for card titles when emphasis needed
- Tight line-height (`leading-[1.05]` or `leading-[1.1]`) for large headings
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

**Primary Button**
```
Background: Gold-600
Text: Navy-950
Padding: 16px 32px
Border Radius: 8px
Font: Inter, 16px, 600
Hover: Gold-500 + lift effect
```

**Secondary Button**
```
Background: Transparent
Border: 2px solid Navy-700
Text: Navy-900
Padding: 14px 30px
Border Radius: 8px
Font: Inter, 16px, 600
Hover: Navy-50 background
```

**CTA Button (Hero)**
```
Background: Gradient (Gold-600 to Copper-600)
Text: White
Padding: 18px 36px
Border Radius: 12px
Font: Inter, 18px, 600
Shadow: 0 4px 12px rgba(212, 175, 55, 0.3)
Hover: Lift + shadow increase
```

### Cards

**Service Card**
```
Background: Warm-50
Border: 1px solid Warm-200
Border Radius: 16px
Padding: 48px
Shadow: 0 2px 8px rgba(0, 0, 0, 0.04)
Hover: Lift (-4px) + shadow increase
```

**Portfolio Card**
```
Background: White
Border Radius: 12px
Overflow: hidden
Shadow: 0 4px 16px rgba(0, 0, 0, 0.08)
Hover: Scale (1.02) + shadow increase
```

**Trust Badge**
```
Background: Navy-900
Text: Warm-50
Padding: 12px 24px
Border Radius: 24px (pill)
Font: Inter, 14px, 600
Icon: Gold-500
```

### Navigation

**Desktop Navigation**
```
Background: White/95 (backdrop blur)
Height: 80px
Border Bottom: 1px solid Warm-200
Font: Inter, 16px, 500
Active: Gold-600 underline (3px)
Hover: Gold-600 color
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
- 24px or 48px sizes
- Lucide React library
- Gold-600 for accent icons
- Navy-700 for default icons

**Usage:**
- Service cards: 64px bold icons
- Navigation: 24px icons
- Inline: 20px icons
- Trust badges: 20px icons

---

## ♿ Accessibility

### Color Contrast

**Text Contrast Ratios:**
- Body text: Minimum 4.5:1
- Large text (24px+): Minimum 3:1
- Interactive elements: Minimum 3:1

**Verified Combinations:**
- Navy-950 on Warm-50: ✅ 16.2:1
- Warm-700 on Warm-50: ✅ 8.4:1
- Gold-600 on Navy-900: ✅ 4.8:1

### Focus States

**All interactive elements must have visible focus:**
- Outline: 2px solid Gold-600
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

**v2.0 (May 22, 2026)**
- **Typography System Refinement:** Complete implementation of Playfair Display across all pages
- Updated color palette to Orange brand (#F97316) from Navy + Gold
- Detailed typography scale with Tailwind classes and actual implementations
- Added ExtraBold (800) weight for hero headings
- Comprehensive typography guidelines with code examples
- Applied to: Homepage (30 elements), Product pages (24 elements), Dialogs (2 elements)
- Total: 56+ typography elements now consistent

**v1.0 (May 20, 2026)**
- Initial design system
- Premium color palette (Navy + Gold) - DEPRECATED
- Typography system (Playfair Display + Inter) - Foundation
- Spacing system (8px base)
- Component guidelines
- Animation principles
- Accessibility standards

---

_This design system supports the TrueSpur website redesign to create a premium, visual-first experience with consistent typography and orange brand identity that builds trust within 60 seconds._
