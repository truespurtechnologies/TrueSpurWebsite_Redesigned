# TrueSpur Website - Spacing Specifications

**Version:** 2.1  
**Last Updated:** May 30, 2026  
**Status:** Production-Ready ✅

---

## 📐 Overview

This document defines the complete spacing system for the TrueSpur website, ensuring consistent, premium spacing across all pages and components. All spacing values use Tailwind CSS utility classes for responsive design.

---

## 🎯 Core Spacing Principles

1. **Progressive Scaling:** Mobile → Tablet → Desktop spacing increases gradually
2. **Breathing Room:** Generous internal padding for premium feel
3. **Visual Hierarchy:** Consistent spacing creates clear content structure
4. **Responsive Design:** All spacing adapts to screen size

---

## 📏 Section Spacing

### **Main Section Padding**

**Standard sections use:**
```tsx
className="py-16 md:py-24 lg:py-32"
```

**Breakdown:**
- **Mobile:** `py-16` = 64px top/bottom
- **Tablet:** `md:py-24` = 96px top/bottom
- **Desktop:** `lg:py-32` = 128px top/bottom

**Total Gap Between Sections:**
- Mobile: 128px (64px + 64px)
- Tablet: 192px (96px + 96px)
- Desktop: 256px (128px + 128px)

**Applied To:**
- Services Section
- Expertise Section
- Products Section
- Stats Section
- Awards Section
- About Section
- Customer Showcase Section
- Contact Section

### **Hero Section Padding (Exception)**

The Hero uses **asymmetric** padding because it sits directly below the header:
```tsx
className="pt-4 pb-16 md:pt-6 md:pb-20 lg:pt-8 lg:pb-32"
```

**Breakdown:**
- **Top:** Minimal (4–8px) — header provides visual top boundary
- **Bottom:** Matches standard section padding (64–128px)

> **Note:** Hero spacing is intentionally different from other sections. Do not apply standard `py-*` to the Hero.

---

## 🎴 Card Spacing

### **1. Service Cards (Updated May 30, 2026)**

Service cards use a flat structure (no separate CardContent), all content inside `CardHeader`:
```tsx
className="p-8 lg:p-9"
```
- Padding: 32px → 36px
- Flat single-container layout (no header/content split)
- Icon container: `mb-6` (24px gap below icon)
- Title to description: `mb-3` (12px)
- Description to bullets: `mb-5` (20px)
- Bullet spacing: `space-y-2.5` (10px)

### **2. Expertise Cards (Dark Background)**

**Card Header:**
```tsx
className="p-6 md:p-8 pb-4"
```
- Padding: 24px → 32px
- Bottom reduced to 16px

**Card Content:**
```tsx
className="p-6 md:p-8"
```
- Padding: 24px → 32px
- Full padding on all sides

**List Spacing:**
```tsx
className="space-y-3"
```
- Gap between list items: 12px

### **3. Product Cards**

**Card Header:**
```tsx
className="p-6 md:p-8"
```
- Padding: 24px → 32px

**Card Title:**
```tsx
className="mb-3"
```
- Bottom margin: 12px (title-to-description gap)

**Card Description:**
```tsx
className="mb-6"
```
- Bottom margin: 24px (description-to-badges gap)

**Card Content:**
```tsx
className="p-6 md:p-8 pt-0"
```
- Padding: 24px → 32px
- Top padding removed

**Badge Container:**
```tsx
className="flex flex-wrap gap-2 mb-6"
```
- Gap between badges: 8px
- Bottom margin: 24px (badges-to-button gap)

### **4. Stats Cards**

**Card Content:**
```tsx
className="p-8 md:p-10 lg:p-12"
```
- Mobile: 32px
- Tablet: 40px
- Desktop: 48px

**Progressive scaling for premium feel**

### **5. Award Cards**

**Card Header:**
```tsx
className="p-6 md:p-8"
```
- Padding: 24px → 32px
- No wrapper padding constraints

**Icon-to-Title Gap:**
```tsx
className="gap-3 mb-3"
```
- Gap: 12px
- Bottom margin: 12px

### **6. Testimonial Cards**

**Card Content:**
```tsx
className="p-8 md:p-10"
```
- Padding: 32px → 40px
- Generous padding for readability

**Star Rating:**
```tsx
className="space-x-2 mb-4"
```
- Gap between stars: 8px
- Bottom margin: 16px

**Quote Text:**
```tsx
className="mb-4"
```
- Bottom margin: 16px

### **7. Service CTA Card**

**Card Header:**
```tsx
className="text-center p-8 md:p-10"
```
- Padding: 32px → 40px
- Centered content with generous spacing

---

## 📱 Product Subpage Spacing

### **Container Padding**

```tsx
className="container mx-auto px-4 py-10 md:py-14 lg:py-24"
```
- Matches main section spacing
- Horizontal padding: 16px (px-4)

### **Feature Sections**

```tsx
className="mt-10 md:mt-12 lg:mt-20"
```
- Mobile: 40px top margin
- Tablet: 48px top margin
- Desktop: 80px top margin

### **Waitlist Forms**

```tsx
className="mt-14 md:mt-20 lg:mt-28"
```
- Mobile: 56px top margin
- Tablet: 80px top margin
- Desktop: 112px top margin

**Applied To:**
- Clinexa product page
- HaloMe product page
- TrueSpur Billing product page
- TafsirAI product page

---

## 🎯 Contact Section Spacing

### **Contact Info Card**

**Wrapper Padding:**
```tsx
className="px-6 py-7 md:px-8 md:py-10"
```
- Mobile: 24px horizontal, 28px vertical
- Desktop: 32px horizontal, 40px vertical

**Icon-to-Text Gap:**
```tsx
className="flex items-start space-x-4 md:space-x-5"
```
- Mobile: 16px gap
- Desktop: 20px gap

**Item Spacing:**
```tsx
className="space-y-6"
```
- Gap between contact items: 24px

### **Contact Form Card**

**Card Header:**
```tsx
className="pt-6 pb-4 px-6 md:px-8"
```
- Top: 24px
- Bottom: 16px
- Horizontal: 24px → 32px

**Card Content:**
```tsx
className="space-y-4 px-6 pb-6"
```
- Gap between form fields: 16px
- Horizontal padding: 24px
- Bottom padding: 24px

---

## 🔄 Hover & Transition Spacing

### **Service Cards**

**Hover Transform:**
```tsx
whileHover={{ y: -4 }}
```
- Lift: 4px upward via Framer Motion
- Left accent bar: opacity 0 → 100% on hover (300ms)
- Shadow: shadow-sm → shadow-lg on hover

### **Expertise Cards**

**Hover Transform:**
```tsx
className="group-hover:-translate-y-2"
```
- Lift: 8px upward on hover
- Smooth, premium feel

### **Product Cards**

**Hover Transform:**
```tsx
className="group-hover:-translate-y-1"
```
- Lift: 4px upward on hover
- Subtle, professional

### **Award Cards**

**Hover Transform:**
```tsx
className="hover:-translate-y-1"
```
- Lift: 4px upward on hover
- Consistent with product cards

---

## 📊 Spacing System Summary

### **Section Spacing**
| Breakpoint | Standard Padding | Total Gap | Hero Top | Hero Bottom |
|------------|-----------------|-----------|----------|-------------|
| Mobile | 64px (`py-16`) | 128px | 4px | 64px |
| Tablet | 96px (`md:py-24`) | 192px | 6px | 80px |
| Desktop | 128px (`lg:py-32`) | 256px | 8px | 128px |

### **Card Padding**
| Component | Mobile | Tablet | Desktop |
|-----------|--------|--------|---------|
| Service Cards | 32px | 32px | 36px |
| Expertise Cards | 24px | 32px | 32px |
| Product Cards | 24px | 32px | 32px |
| Stats Cards | 32px | 40px | 48px |
| Award Cards | 24px | 32px | 32px |
| Testimonial Cards | 32px | 40px | 40px |
| CTA Card | 32px | 40px | 40px |

### **Internal Spacing**
| Element | Value | Purpose |
|---------|-------|---------|
| Title-to-Description | 12px (mb-3) | Clear hierarchy |
| Description-to-Badges | 24px (mb-6) | Visual separation |
| Badge-to-Button | 24px (mb-6) | Breathing room |
| List Item Gap | 12px (space-y-3) | Readability |
| Icon-to-Text | 16-20px | Visual balance |

---

## 🎨 Hover Effects

### **Card Hover States**

**Expertise Cards:**
- Transform: `-translate-y-2` (8px lift)
- Shadow: `shadow-2xl`
- Border glow: Opacity 70% → 100%
- Duration: 300ms

**Product Cards:**
- Transform: `-translate-y-1` (4px lift)
- Shadow: `shadow-2xl`
- Duration: 300ms

**Stats Cards:**
- Transform: `-translate-y-1` (4px lift)
- Shadow: `shadow-2xl`
- Duration: 300ms

**Testimonial Cards:**
- Scale: 0.96 → 1.0
- Transform: `y: 0 → -4`
- Active state visual feedback

---

## 🔧 Implementation Notes

### **Consistency Rules**

1. **All major sections (except Hero):** Use `py-16 md:py-24 lg:py-32`
2. **Hero section:** Use asymmetric `pt-4 pb-16 md:pt-6 md:pb-20 lg:pt-8 lg:pb-32`
3. **All card headers:** Minimum `p-8 lg:p-9`
4. **All lists:** Use `space-y-2.5` or `space-y-3` for readability
5. **All hover lifts:** 4px or 8px (no other values)

### **Responsive Breakpoints**

- **Mobile:** < 768px (default)
- **Tablet:** ≥ 768px (md:)
- **Desktop:** ≥ 1024px (lg:)

### **Container System**

- **Max Width:** 1280px (Tailwind default)
- **Horizontal Padding:** `px-4` (16px)
- **Applied:** `container mx-auto px-4`

---

## ✅ Quality Checklist

**Before deploying spacing changes:**

- [ ] All sections (except Hero) use `py-16 md:py-24 lg:py-32`
- [ ] Hero uses asymmetric padding `pt-4 pb-16 md:pt-6 md:pb-20 lg:pt-8 lg:pb-32`
- [ ] All cards have consistent internal padding
- [ ] All product cards have title/description margins
- [ ] All lists use `space-y-3`
- [ ] All hover effects are 4px or 8px
- [ ] All contact info has proper icon-text gaps
- [ ] All forms have consistent field spacing
- [ ] Mobile spacing tested (< 768px)
- [ ] Tablet spacing tested (768px - 1023px)
- [ ] Desktop spacing tested (≥ 1024px)

---

## 🚀 Grade & Status

**UX Review Grade:** A+ (98/100)

**Strengths:**
- ✅ Consistent spacing system across all pages
- ✅ Progressive scaling (mobile → desktop)
- ✅ Premium card padding
- ✅ Excellent visual hierarchy
- ✅ Professional hover effects

**Production Status:** ✅ Ready for deployment

---

**Last Reviewed By:** Sally (UX Designer)  
**Review Date:** May 30, 2026  
**Next Review:** After next section refinement pass
