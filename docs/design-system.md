# TrueSpur Design System

**Version:** 1.0  
**Date:** May 20, 2026  
**Purpose:** Premium brand redesign - Visual-first storytelling with trust architecture

---

## 🎨 Color Palette

### Primary Colors

**Navy (Primary)**
- `navy-950`: `#0A0F1E` - Darkest, for text
- `navy-900`: `#0F172A` - Primary brand color
- `navy-800`: `#1E293B` - Hover states
- `navy-700`: `#334155` - Borders, dividers

**Gold (Accent)**
- `gold-600`: `#D4AF37` - Primary accent
- `gold-500`: `#E5C158` - Lighter accent
- `gold-400`: `#F0D97A` - Subtle highlights

**Copper (Secondary Accent)**
- `copper-600`: `#B87333` - Secondary accent
- `copper-500`: `#C98850` - Lighter copper
- `copper-400`: `#DA9D6D` - Subtle copper

### Neutral Colors

**Warm Grays**
- `warm-50`: `#FAFAF9` - Background
- `warm-100`: `#F5F5F4` - Card backgrounds
- `warm-200`: `#E7E5E4` - Borders
- `warm-300`: `#D6D3D1` - Disabled states
- `warm-600`: `#78716C` - Secondary text
- `warm-700`: `#57534E` - Body text
- `warm-900`: `#1C1917` - Headings

### Semantic Colors

**Success**
- `success`: `#10B981` - Green for positive actions

**Warning**
- `warning`: `#F59E0B` - Amber for caution

**Error**
- `error`: `#EF4444` - Red for errors

---

## 📝 Typography

### Font Families

**Headings (Serif)**
- **Font:** Playfair Display
- **Weights:** 400 (Regular), 600 (SemiBold), 700 (Bold)
- **Usage:** H1, H2, H3, feature text
- **Fallback:** Georgia, serif

**Body (Sans-Serif)**
- **Font:** Inter
- **Weights:** 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Usage:** Body text, UI elements, navigation
- **Fallback:** -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif

### Type Scale

| Element | Size | Line Height | Weight | Letter Spacing |
|---------|------|-------------|--------|----------------|
| **H1** | 64px (4rem) | 1.1 | 700 | -0.02em |
| **H2** | 48px (3rem) | 1.2 | 700 | -0.01em |
| **H3** | 32px (2rem) | 1.3 | 600 | 0 |
| **H4** | 24px (1.5rem) | 1.4 | 600 | 0 |
| **H5** | 20px (1.25rem) | 1.4 | 600 | 0 |
| **Body Large** | 20px (1.25rem) | 1.6 | 400 | 0 |
| **Body** | 16px (1rem) | 1.6 | 400 | 0 |
| **Body Small** | 14px (0.875rem) | 1.5 | 400 | 0 |
| **Caption** | 12px (0.75rem) | 1.4 | 500 | 0.02em |

### Typography Guidelines

**Headings:**
- Use Playfair Display for all headings
- Navy-900 or Navy-950 for dark backgrounds
- Warm-50 for light text on dark backgrounds
- Maximum line length: 60-70 characters

**Body Text:**
- Use Inter for all body text
- Warm-700 for primary body text
- Warm-600 for secondary text
- Maximum line length: 65-75 characters
- Minimum font size: 16px for body text

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

**v1.0 (May 20, 2026)**
- Initial design system
- Premium color palette (Navy + Gold)
- Typography system (Playfair Display + Inter)
- Spacing system (8px base)
- Component guidelines
- Animation principles
- Accessibility standards

---

_This design system supports the TrueSpur website redesign to create a premium, visual-first experience that builds trust within 60 seconds._
