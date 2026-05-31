# UI Components Inventory

**Project:** TrueSpur Technology Solutions Website  
**Generated:** 2026-05-16  
**Component Library:** shadcn/ui (Radix UI primitives)

---

## Overview

The application uses **shadcn/ui** component library built on **Radix UI primitives** for accessible, customizable components. All components are located in `components/ui/` directory.

**Total Components:** 57 shadcn/ui components + 2 custom components

---

## Component Categories

### Layout Components

| Component | File | Purpose |
|-----------|------|---------|
| Card | `card.tsx` | Container for content sections with header/footer |
| Separator | `separator.tsx` | Visual divider between content |
| Resizable | `resizable.tsx` | Resizable panel layouts |
| Scroll Area | `scroll-area.tsx` | Custom scrollable areas |
| Aspect Ratio | `aspect-ratio.tsx` | Maintain aspect ratio for media |
| Sidebar | `sidebar.tsx` | Complex sidebar navigation (21KB - largest component) |

### Form Components

| Component | File | Purpose | Features |
|-----------|------|---------|----------|
| Input | `input.tsx` | Text input field | Basic text input |
| Input Group | `input-group.tsx` | Grouped input with addons | Prefix/suffix support |
| Input OTP | `input-otp.tsx` | One-time password input | Segmented OTP entry |
| Textarea | `textarea.tsx` | Multi-line text input | Resizable text area |
| Checkbox | `checkbox.tsx` | Checkbox input | Accessible checkbox |
| Radio Group | `radio-group.tsx` | Radio button group | Single selection |
| Select | `select.tsx` | Dropdown select | Searchable dropdown |
| Switch | `switch.tsx` | Toggle switch | On/off toggle |
| Slider | `slider.tsx` | Range slider | Value selection |
| Calendar | `calendar.tsx` | Date picker calendar | Date selection |
| Form | `form.tsx` | Form wrapper with validation | React Hook Form integration |
| Field | `field.tsx` | Form field wrapper | Label, error, helper text |
| Label | `label.tsx` | Form field label | Accessible labels |

### Button Components

| Component | File | Purpose |
|-----------|------|---------|
| Button | `button.tsx` | Primary button component with variants |
| Button Group | `button-group.tsx` | Grouped buttons |
| Toggle | `toggle.tsx` | Toggle button |
| Toggle Group | `toggle-group.tsx` | Group of toggle buttons |

### Navigation Components

| Component | File | Purpose |
|-----------|------|---------|
| Navigation Menu | `navigation-menu.tsx` | Main navigation with dropdowns |
| Breadcrumb | `breadcrumb.tsx` | Breadcrumb navigation |
| Pagination | `pagination.tsx` | Page navigation |
| Menubar | `menubar.tsx` | Application menu bar |
| Tabs | `tabs.tsx` | Tabbed interface |

### Overlay Components

| Component | File | Purpose |
|-----------|------|---------|
| Dialog | `dialog.tsx` | Modal dialog |
| Alert Dialog | `alert-dialog.tsx` | Confirmation dialog |
| Sheet | `sheet.tsx` | Slide-out panel |
| Drawer | `drawer.tsx` | Bottom drawer (mobile-friendly) |
| Popover | `popover.tsx` | Floating popover |
| Tooltip | `tooltip.tsx` | Hover tooltip |
| Hover Card | `hover-card.tsx` | Rich hover card |
| Context Menu | `context-menu.tsx` | Right-click context menu |
| Dropdown Menu | `dropdown-menu.tsx` | Dropdown menu |

### Feedback Components

| Component | File | Purpose |
|-----------|------|---------|
| Alert | `alert.tsx` | Alert messages |
| Toast | `toast.tsx` | Toast notification |
| Toaster | `toaster.tsx` | Toast container |
| Sonner | `sonner.tsx` | Alternative toast system |
| Progress | `progress.tsx` | Progress bar |
| Spinner | `spinner.tsx` | Loading spinner |
| Skeleton | `skeleton.tsx` | Loading skeleton |
| Badge | `badge.tsx` | Status badge |

### Display Components

| Component | File | Purpose |
|-----------|------|---------|
| Avatar | `avatar.tsx` | User avatar |
| Table | `table.tsx` | Data table |
| Chart | `chart.tsx` | Data visualization (9.7KB) |
| Carousel | `carousel.tsx` | Image/content carousel |
| Accordion | `accordion.tsx` | Collapsible sections |
| Collapsible | `collapsible.tsx` | Collapsible content |
| Empty | `empty.tsx` | Empty state display |
| Kbd | `kbd.tsx` | Keyboard shortcut display |
| Item | `item.tsx` | Generic list item |

### Utility Components

| Component | File | Purpose |
|-----------|------|---------|
| Command | `command.tsx` | Command palette (⌘K menu) |

---

## Custom Application Components

### 1. Lead Form Dialog

**Location:** `components/lead-form-dialog.tsx` (15.3KB)

**Purpose:** Multi-step intake form for project enquiries

**Features:**
- Multi-step wizard interface
- Form validation
- Module selection (iOS, Android, Website, AI, etc.)
- Phone number with country code selector
- Source tracking (CTA attribution)
- Integration with `/api/intake` endpoint

**State Management:**
```typescript
interface LeadFormState {
  fullName: string
  email: string
  phoneCountryCode: string
  phoneNumber: string
  company: string
  role: string
  modules: string[]
  modulesOther: string
  requirements: string
}
```

**Steps:**
1. Welcome
2. Full Name
3. Email
4. Phone
5. Company
6. Role
7. Modules Selection
8. Requirements
9. Success

**Module Options:**
- iOS App
- Android App
- Website
- Payment Integration
- AI Automation / Application
- Explore TrueSpur Product Suite
- Other

**Country Codes:**
- +1 (US / Canada)
- +44 (UK)
- +61 (Australia)
- +65 (Singapore)
- +91 (India)

### 2. Theme Provider

**Location:** `components/theme-provider.tsx` (292 bytes)

**Purpose:** Provides theme context for dark/light mode

**Features:**
- Wraps application with `next-themes` provider
- Enables theme switching
- Persists theme preference

---

## State Management Patterns

### React Hooks Usage

The application uses **React Hooks** for state management (no Redux/Zustand):

**Main Page (`app/page.tsx`):**
- `useState` - 15 instances for local state
- `useEffect` - Scroll tracking, carousel auto-play
- `useRef` - DOM references for animations
- `useMotionValue` - Framer Motion animations
- `useTransform` - Animation value transformations

**State Variables:**
- `activeSection` - Current scroll section
- `isMenuOpen` - Mobile menu state
- `isProductMobileOpen` - Product dropdown state
- `isLeadFormOpen` - Lead form dialog state
- `leadFormSource` - CTA source tracking
- `formData` - Contact form data
- `formStatus` - Form submission status
- `formMessage` - Form feedback message
- `emblaApi` - Carousel API
- `spotlightIndex` - Carousel active index

**Product Pages:**
- Each product page uses similar state patterns
- `useState` for waitlist form state
- `useEffect` for scroll effects and animations

### Form State Management

**Contact Form (Main Page):**
```typescript
const [formData, setFormData] = useState({
  firstName: "",
  lastName: "",
  email: "",
  projectType: "Website Development",
  message: "",
})
const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
const [formMessage, setFormMessage] = useState("")
```

**Lead Form Dialog:**
- Multi-step form with step tracking
- Form state object with all fields
- Validation state per step
- Submission state (loading, error)

**Waitlist Forms (Product Pages):**
- Simple form state for name, email, organization
- Submission status tracking
- Success/error message display

---

## Animation Patterns

### Framer Motion Usage

**Scroll Animations:**
```typescript
<motion.div
  initial={{ opacity: 0, y: 20, scale: 0.96 }}
  whileInView={{ opacity: 1, y: 0, scale: 1 }}
  transition={{ duration: 0.5, delay: 0.1 * index }}
  viewport={{ once: true, amount: 0.6 }}
>
```

**Animated Statistics:**
- IntersectionObserver triggers animation
- `useMotionValue` for count animation
- `useTransform` for value formatting
- Smooth easing with 1.8s duration

**Hover Effects:**
- Scale transformations
- Gradient overlays
- Shadow transitions
- Color shifts

### Carousel Implementation

**Library:** embla-carousel-react

**Features:**
- Loop mode enabled
- Auto-play functionality
- Spotlight/active slide tracking
- Responsive breakpoints

---

## Design System

### Color Scheme

**Primary Colors:**
- Yellow to Orange gradients (`from-yellow-500 to-orange-500`)
- Orange accents (`orange-500`, `orange-600`)

**Neutral Colors:**
- Gray scale for text and backgrounds
- White/transparent backgrounds with backdrop blur

**Semantic Colors:**
- Success: Green
- Error: Red
- Warning: Yellow

### Typography

**Font Families:**
- Headings: Poppins (`font-heading`, `--font-heading`)
- Body: Inter (`font-sans`, `--font-sans`)
- Monospace: Geist Mono (`--font-mono`)

**Text Sizes:**
- Hero H1: `text-5xl lg:text-7xl xl:text-8xl` (font-black 900)
- Section H2: `text-4xl lg:text-5xl xl:text-6xl` (font-extrabold 800)
- Card Titles: `text-lg lg:text-xl` (font-semibold 600)
- Body: `text-base`, `text-lg`
- Small: `text-sm`, `text-xs`

> See `docs/design-system.md` and `docs/brand-identity-guidelines.md` for full type scale.

### Spacing & Layout

**Container:**
- Max width with padding
- Responsive breakpoints (sm, md, lg, xl)

**Grid System:**
- `grid-cols-1` → `md:grid-cols-2` → `lg:grid-cols-3`
- Gap utilities for spacing

### Component Variants

**Button Variants:**
- Default
- Destructive
- Outline
- Secondary
- Ghost
- Link

**Badge Variants:**
- Default
- Secondary
- Destructive
- Outline

---

## Accessibility Features

### Radix UI Benefits

All shadcn/ui components inherit Radix UI accessibility:
- ✓ Keyboard navigation
- ✓ Screen reader support
- ✓ ARIA attributes
- ✓ Focus management
- ✓ WCAG compliance

### Form Accessibility

- Label associations
- Error message announcements
- Required field indicators
- Validation feedback

### Navigation Accessibility

- Semantic HTML (`nav`, `button`, `a`)
- Skip links (recommended addition)
- Focus visible states
- Keyboard shortcuts (Command palette)

---

## Component Dependencies

### Core UI Dependencies

```json
{
  "@radix-ui/react-accordion": "1.2.2",
  "@radix-ui/react-alert-dialog": "1.1.4",
  "@radix-ui/react-dialog": "1.1.4",
  "@radix-ui/react-dropdown-menu": "2.1.4",
  "@radix-ui/react-navigation-menu": "1.2.3",
  "@radix-ui/react-select": "2.1.4",
  "@radix-ui/react-tabs": "1.1.2",
  "@radix-ui/react-toast": "1.2.4",
  "class-variance-authority": "0.7.1",
  "clsx": "2.1.1",
  "tailwind-merge": "2.5.5",
  "lucide-react": "0.454.0",
  "framer-motion": "11.5.5",
  "embla-carousel-react": "8.5.1"
}
```

---

## Component Usage Examples

### Navigation Menu (Main Header)

Used in main page for desktop navigation with Product Suite dropdown.

### Dialog (Lead Form)

Multi-step form dialog triggered by CTA buttons with source tracking.

### Carousel (Customer Logos)

Displays customer logos with auto-play and loop.

### Toast (Form Feedback)

Success/error notifications for form submissions.

### Motion Components (Stats)

Animated statistics with scroll-triggered counting animation.

---

## Reusable Patterns

### Form Pattern
1. State management with `useState`
2. Validation before submission
3. API call with loading state
4. Success/error feedback with toast/message
5. Form reset on success

### Animation Pattern
1. `motion.div` wrapper
2. `initial` state (hidden/offset)
3. `whileInView` target state
4. `transition` with easing
5. `viewport` configuration

### Modal Pattern
1. Open state in parent
2. `onOpenChange` callback
3. Dialog/Sheet/Drawer component
4. Close on success or cancel
5. State reset on close

---

## Performance Considerations

### Code Splitting
- Components loaded on-demand
- Dynamic imports for heavy components
- Tree-shaking for unused components

### Optimization
- Memoization for expensive renders (recommended)
- Lazy loading for images
- Debouncing for scroll handlers
- Throttling for resize handlers

---

## Future Enhancements

### Recommended Additions
- Loading states for all async operations
- Error boundaries for component failures
- Storybook for component documentation
- Unit tests for components
- A11y testing automation
