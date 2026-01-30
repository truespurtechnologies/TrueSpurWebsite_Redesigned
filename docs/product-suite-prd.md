# Product Suite Navigation & Product Pages – PRD

## 1. Overview

**Goal**

- Introduce a **“Product Suite”** entry in the top navigation.
- Showcase TrueSpur’s products in a **world-class, product-led** way.
- Provide **deep-dive marketing pages** for each product.
- Add **waitlist capture** for all products *except* **TrueSpur Billing**.

**Products & Routes**

- **Healthcare**
  - Clinexa → `/products/healthcare/clinexa`
  - HaloMe → `/products/healthcare/halome`
- **Digital Transformation**
  - TrueSpur Billing → `/products/digital-transformation/truespur-billing`
- **Artificial Intelligence**
  - TafsirAI → `/products/artificial-intelligence/tafsir-ai`

**Key UX Themes**

- Visuals should feel like a **billion-dollar SaaS**:
  - Clean typography, generous spacing, precise alignment.
  - Confident use of gradients and brand colors, but **not flashy for the sake of it**.
- Content and layout remain **grounded and practical**:
  - Clear problem/solution framing.
  - Specific benefits and use cases, not just buzzwords.
  - Strong but honest positioning.

---

## 2. Navigation Experience

### 2.1 Desktop Header – Radix `NavigationMenu`

**Current state**

- `app/page.tsx`:
  - Simple `navItems` array (`Home`, `Services`, `Expertise`, `About`, `Contact`).
  - `scrollToSection` drives smooth scrolling.
  - Basic `<nav>` with mapped `<button>` elements.

**Target state**

- Use `NavigationMenu` from `components/ui/navigation-menu.tsx` for **desktop**:
  - **Home / Services / Expertise / About / Contact** remain scroll-based.
  - **Product Suite** becomes a **NavigationMenu dropdown**.

**Structure**

- Replace the current desktop `<nav>` with:
  - `NavigationMenu` with `viewport={true}`.
  - Inside:
    - `NavigationMenuList`:
      - One `NavigationMenuItem` per existing scroll section.
      - One dedicated `NavigationMenuItem` for **Product Suite**:
        - `NavigationMenuTrigger`: label “Product Suite”.
        - Paired `NavigationMenuContent`: mega-menu panel.

**Styling principles**

- **Top-level items**
  - Similar base typography to current nav, with refined padding and alignment.
  - Active state driven by `activeSection` (underline or bottom border, using brand colors).
- **Product Suite trigger**
  - Same base style as other items, plus dropdown icon.
  - On open: subtle background highlight (tint or light gradient).

### 2.2 Product Suite Mega-menu (Desktop)

**Data-driven design**

- Introduce a `productSuite` data structure in `app/page.tsx`:
  - Categories:
    - Healthcare → Clinexa, HaloMe
    - Digital Transformation → TrueSpur Billing
    - Artificial Intelligence → TafsirAI
  - Each product item has: `label`, `href`, optional `description`.

**Layout**

- Inside `NavigationMenuContent` for Product Suite:
  - 3-column responsive layout:
    - Desktop: 3 columns (Healthcare, Digital Transformation, Artificial Intelligence).
    - Smaller screens: stack or 2 columns.
  - Each column:
    - Category label.
    - Product links styled as mini cards/rows.

**Visual style**

- Panel container:
  - `bg-white`, soft border, elevated shadow, `rounded-xl`, generous padding.
- Product rows:
  - Hover:
    - Light gradient background using brand colors at low opacity.
    - Subtle motion (scale or slight shift).
  - Text:
    - Product name: `font-semibold`.
    - Description: `text-sm text-gray-500/600`.

### 2.3 Mobile Navigation

**Behavior**

- Existing mobile dropdown stays for scroll-based items.
- Add **Product Suite** as a parent entry:
  - Tap to expand/collapse (`isProductMobileOpen`).
  - Display categories + product links underneath.

**Navigation**

- Clicking a product:
  - Navigates to its route.
  - Closes the mobile menu (`setIsMenuOpen(false)`).

---

## 3. Product Page Design (Marketing Style)

Each product page should feel like a **standalone marketing landing page**, but clearly part of the TrueSpur brand.

### 3.1 Shared Layout – `app/products/layout.tsx`

- Provides:
  - `<main>` wrapper.
  - Consistent padding and background.
  - Optional small header (logo + back-to-home link).
- Reuses global styles from `globals.css`.

### 3.2 Common Page Structure

Each product `page.tsx` will generally have:

1. **Hero Section**
   - Product name, tagline, short positioning statement.
   - Primary CTA:
     - Clinexa / HaloMe / TafsirAI: “Join waitlist”.
     - TrueSpur Billing: “Talk to us” / “Request a demo” (no waitlist).
   - Strong hero visual (image/illustration).

2. **Problem & Solution Section**
   - “The problem we solve” – 2–3 bullets.
   - “How [Product] helps” – 3–4 benefit cards using `Card` + icons.

3. **Key Features / Capabilities**
   - Grid of feature tiles:
     - Icon
     - Title
     - 1–2 line explanation.

4. **Who it’s for / Use Cases**
   - Segmented by audience, with short scenario-like descriptions.

5. **Social proof / Trust**
   - Tone aligned with existing testimonials.
   - Optional reuse of `Badge` / `Card` pattern.

6. **Final CTA Section**
   - Strong bottom banner:
     - Waitlist (where applicable) or contact/demo CTA.

---

## 4. Waitlist Functionality

**Applies to:**

- Clinexa
- HaloMe
- TafsirAI

**Excluded:**

- TrueSpur Billing

**Implementation**

1. Page-level waitlist CTA block on Clinexa, HaloMe, TafsirAI pages:
   - Headline: “Join the waitlist” (or similar).
   - Short reassurance copy.
   - Fields:
     - `name`
     - `email`
     - Optional: `organization` / `role`.

2. Submission behavior:
   - Client-side state: `idle`, `loading`, `success`, `error`.
   - POST to an API route (e.g. `/api/waitlist`) or reuse `/api/contact` with an explicit flag, depending on backend decisions.

3. User feedback:
   - Inline success and error states similar to existing contact form.

4. Billing exception:
   - TrueSpur Billing page uses a contact/demo CTA only.

---

## 5. Technical Execution Plan

### Phase 1 – Data & Desktop Navigation

1. Add `productSuite` constant near `navItems` in `app/page.tsx`.
2. Integrate `NavigationMenu` for desktop header:
   - Import `NavigationMenu` components from `@/components/ui/navigation-menu`.
   - Replace desktop `<nav>` with `NavigationMenu` + `NavigationMenuList`.
   - Render scroll-based sections as `NavigationMenuItem`s.
   - Add Product Suite `NavigationMenuItem` with `NavigationMenuTrigger` and `NavigationMenuContent`.
3. Render mega-menu panel using `productSuite` data.

### Phase 2 – Mobile Navigation Extension

1. Extend mobile nav in `app/page.tsx`:
   - Add Product Suite parent item with local toggle state.
   - Render nested categories and product links using `productSuite`.
2. Ensure product taps navigate correctly and close the mobile menu.

### Phase 3 – Product Routes & Layout

1. Create `app/products/layout.tsx` as shared layout.
2. Create product routes:
   - `app/products/healthcare/clinexa/page.tsx`
   - `app/products/healthcare/halome/page.tsx`
   - `app/products/digital-transformation/truespur-billing/page.tsx`
   - `app/products/artificial-intelligence/tafsir-ai/page.tsx`
3. Implement marketing-style content on each page following the common structure.

### Phase 4 – Waitlist & CTA Wiring

1. For Clinexa, HaloMe, TafsirAI:
   - Add waitlist sections with forms and client-side state.
   - Wire up to API handler.
2. For TrueSpur Billing:
   - Use contact/demo CTA only.

### Phase 5 – Polish & Validation

1. Cross-device testing.
2. Interaction tests for navigation and waitlist.
3. Visual refinements for spacing, shadows, typography.
