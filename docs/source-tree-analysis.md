# Source Tree Analysis

**Project:** TrueSpur Technology Solutions Website  
**Generated:** 2026-05-16  
**Repository Type:** Monolith

---

## Project Structure Overview

```
TrueSpurWebsite_Redesigned/
├── app/                          # Next.js App Router (application code)
├── components/                   # React components
├── public/                       # Static assets
├── styles/                       # Global styles
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
├── docs/                         # Project documentation (generated)
├── _bmad/                        # BMAD workflow configuration
├── _bmad-output/                 # BMAD artifacts output
├── .agents/                      # Agent skills
├── .next/                        # Next.js build output (gitignored)
├── node_modules/                 # Dependencies (gitignored)
└── Configuration files           # Root-level configs
```

---

## Critical Directories

### 1. `/app` - Next.js App Router

**Purpose:** Main application code using Next.js 15 App Router pattern

**Structure:**
```
app/
├── api/                          # API Routes (serverless functions)
│   ├── contact/
│   │   └── route.ts             # Contact form API endpoint
│   ├── intake/
│   │   └── route.ts             # Project intake form API endpoint
│   └── waitlist/
│       └── route.ts             # Product waitlist API endpoint
├── products/                     # Product pages
│   ├── artificial-intelligence/
│   │   └── tafsir-ai/
│   │       └── page.tsx         # TafsirAI product page
│   ├── digital-transformation/
│   │   └── truespur-billing/
│   │       └── page.tsx         # TrueSpur Billing product page
│   └── healthcare/
│       ├── clinexa/
│       │   └── page.tsx         # Clinexa product page
│       └── halome/
│           └── page.tsx         # HaloMe product page
├── globals.css                   # Global CSS styles
├── layout.tsx                    # Root layout component
├── page.tsx                      # Homepage (main landing page)
└── TerminalResults.md           # Technical notes (npm config output)
```

**Entry Points:**
- `layout.tsx` - Root layout wrapping all pages
- `page.tsx` - Homepage (2733 lines - main landing page)
- `api/*/route.ts` - API endpoints

**Key Features:**
- File-based routing
- Server and client components
- API routes for form handling
- Product suite pages

---

### 2. `/components` - React Components

**Purpose:** Reusable UI components

**Structure:**
```
components/
├── ui/                           # shadcn/ui component library (57 components)
│   ├── accordion.tsx
│   ├── alert-dialog.tsx
│   ├── button.tsx
│   ├── card.tsx
│   ├── dialog.tsx
│   ├── form.tsx
│   ├── input.tsx
│   ├── navigation-menu.tsx
│   ├── select.tsx
│   ├── toast.tsx
│   └── ... (48 more components)
├── lead-form-dialog.tsx          # Multi-step intake form dialog (15KB)
└── theme-provider.tsx            # Theme context provider
```

**Component Categories:**
- **Layout:** Card, Separator, Sidebar, Scroll Area
- **Forms:** Input, Select, Checkbox, Radio, Textarea, Calendar
- **Navigation:** Navigation Menu, Breadcrumb, Tabs, Pagination
- **Overlays:** Dialog, Sheet, Drawer, Popover, Tooltip
- **Feedback:** Alert, Toast, Progress, Spinner, Skeleton
- **Display:** Avatar, Table, Chart, Carousel, Accordion

---

### 3. `/public` - Static Assets

**Purpose:** Static files served directly by Next.js

**Structure:**
```
public/
├── customers/                    # Customer/client logos
│   ├── jy-shipping-logo.png
│   ├── Medispur logo.png
│   ├── popular-steels-logo.png
│   └── steel-world-logo.png
├── images/                       # General images
│   ├── about-team.jpg
│   ├── hero-landing.jpg
│   ├── design-mode/
│   │   └── ... (design assets)
│   └── recognition/
│       ├── ceremony-placeholder.jpg
│       └── certificate-placeholder.jpeg
├── logo/                         # Company logos
│   ├── truespur-footer-logo.png
│   ├── truespur-header-logo.png
│   ├── truespur-logo.png
│   └── truespur-main-logo.png
└── placeholder images            # Placeholder assets
```

**Asset Types:**
- Company logos (header, footer, main)
- Customer/client logos
- Hero images
- Team photos
- Recognition/awards placeholders

---

### 4. `/docs` - Project Documentation

**Purpose:** Generated project documentation (this directory)

**Structure:**
```
docs/
├── api-contracts.md              # API endpoint documentation
├── data-models.md                # Data structures and schemas
├── technology-stack.md           # Tech stack analysis
├── ui-components.md              # Component inventory
├── source-tree-analysis.md       # This file
├── project-scan-report.json      # Workflow state tracking
└── product-suite-prd.md          # Product requirements (may be outdated)
```

---

### 5. `/_bmad` - BMAD Workflow Configuration

**Purpose:** BMAD (Business Model Acceleration & Development) workflow system

**Structure:**
```
_bmad/
├── bmm/                          # BMM module configuration
│   ├── config.yaml              # Module settings
│   └── module-help.csv
├── scripts/                      # Python utility scripts
│   ├── resolve_config.py
│   └── resolve_customization.py
├── custom/                       # Custom overrides
│   └── config.toml
└── _config/                      # System configuration
    ├── bmad-help.csv
    ├── files-manifest.csv
    ├── manifest.yaml
    └── skill-manifest.csv
```

---

### 6. `/.agents` - Agent Skills

**Purpose:** AI agent skill definitions

**Structure:**
```
.agents/
└── skills/
    └── bmad-document-project/    # Project documentation skill
        ├── instructions.md
        ├── workflows/
        ├── documentation-requirements.csv
        └── ... (supporting files)
```

---

## Configuration Files (Root Level)

### Build & Development

| File | Purpose |
|------|---------|
| `package.json` | NPM dependencies and scripts |
| `pnpm-lock.yaml` | pnpm lock file (169KB) |
| `package-lock.json` | npm lock file (147KB) |
| `tsconfig.json` | TypeScript configuration |
| `next.config.mjs` | Next.js configuration |
| `postcss.config.mjs` | PostCSS configuration |
| `components.json` | shadcn/ui configuration |

### Environment & Deployment

| File | Purpose |
|------|---------|
| `.env.local` | Environment variables (gitignored) |
| `env-example.txt` | Environment variable template |
| `vercel.json` | Vercel deployment configuration |
| `.vercelignore` | Vercel ignore rules |

### Version Control

| File | Purpose |
|------|---------|
| `.gitignore` | Git ignore rules |
| `.git/` | Git repository data |

### Documentation

| File | Purpose |
|------|---------|
| `README.md` | Comprehensive project documentation (18KB) |

### Testing & Utilities

| File | Purpose |
|------|---------|
| `test-email.js` | Email testing utility |

---

## File Size Analysis

### Largest Files

1. **app/page.tsx** - 138KB (2733 lines)
   - Main homepage component
   - Contains all landing page sections
   - Includes animations, forms, carousels

2. **components/ui/sidebar.tsx** - 21.6KB
   - Complex sidebar navigation component

3. **components/lead-form-dialog.tsx** - 15.3KB
   - Multi-step intake form

4. **components/ui/chart.tsx** - 9.8KB
   - Data visualization component

5. **README.md** - 18KB
   - Comprehensive project documentation

---

## Integration Points

### API Routes → Email Service

```
app/api/contact/route.ts    ──→  Nodemailer  ──→  SMTP (Spaceship)
app/api/intake/route.ts     ──→  Nodemailer  ──→  SMTP (Spaceship)
app/api/waitlist/route.ts   ──→  Nodemailer  ──→  SMTP (Spaceship)
```

### Optional External Storage

```
app/api/intake/route.ts  ──→  Webhook  ──→  External Storage
                                            (INTAKE_SHEET_ENDPOINT)
```

### Component Dependencies

```
app/page.tsx                ──→  components/ui/*
                           ──→  components/lead-form-dialog.tsx
                           ──→  components/theme-provider.tsx

app/products/*/page.tsx    ──→  components/ui/*

components/lead-form-dialog.tsx  ──→  components/ui/dialog.tsx
                                    ──→  components/ui/button.tsx
                                    ──→  app/api/intake/route.ts
```

---

## Build Output

### `.next/` Directory (Gitignored)

**Purpose:** Next.js build artifacts

**Contents:**
- Compiled pages
- Static assets
- Server functions
- Cache files
- Type definitions

**Size:** Variable (regenerated on build)

---

## Development Workflow

### Local Development

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Configure environment:**
   ```bash
   cp env-example.txt .env.local
   # Edit .env.local with actual values
   ```

3. **Start dev server:**
   ```bash
   pnpm dev
   ```

4. **Access application:**
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
pnpm build
pnpm start
```

### Testing Email

```bash
node test-email.js
```

---

## Deployment Structure

### Vercel Deployment

**Configuration:** `vercel.json`

**Deployment Flow:**
```
Git Push  →  Vercel Build  →  Deploy
              ├── Build app (pnpm build)
              ├── Generate static pages
              ├── Bundle serverless functions
              └── Deploy to CDN
```

**Environment Variables (Vercel):**
- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASS
- FROM_EMAIL
- TO_EMAIL
- INTAKE_SHEET_ENDPOINT (optional)
- INTAKE_SHEET_SECRET (optional)

---

## Code Organization Patterns

### Page Structure

Each page follows this pattern:
```typescript
"use client"  // Client component directive

import statements
import components
import hooks

export default function PageName() {
  // State management
  const [state, setState] = useState()
  
  // Effects
  useEffect(() => { ... })
  
  // Event handlers
  const handleAction = () => { ... }
  
  // Render
  return (
    <main>
      {/* Page content */}
    </main>
  )
}
```

### API Route Structure

```typescript
import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

interface DataModel { ... }

export async function POST(request: NextRequest) {
  try {
    // 1. Parse request
    // 2. Validate input
    // 3. Process data
    // 4. Send emails
    // 5. Return response
  } catch (error) {
    // Error handling
  }
}
```

---

## Ignored Directories

### `.gitignore` Patterns

- `node_modules/` - Dependencies
- `.next/` - Build output
- `.env.local` - Environment variables
- `*.log` - Log files
- `.DS_Store` - macOS files

---

## Multi-Part Structure

**Repository Type:** Monolith (single cohesive codebase)

**No separate parts detected** - all code is in a single unified structure.

---

## Critical Paths Summary

### For Development
- `app/` - Application code
- `components/` - UI components
- `public/` - Static assets

### For Deployment
- `package.json` - Dependencies
- `next.config.mjs` - Build configuration
- `vercel.json` - Deployment settings
- `.env.local` - Environment variables

### For Documentation
- `README.md` - Project overview
- `docs/` - Generated documentation
- `env-example.txt` - Setup guide

---

## Navigation Map

### User-Facing Routes

- `/` - Homepage (landing page)
- `/products/healthcare/clinexa` - Clinexa product page
- `/products/healthcare/halome` - HaloMe product page
- `/products/digital-transformation/truespur-billing` - TrueSpur Billing page
- `/products/artificial-intelligence/tafsir-ai` - TafsirAI product page

### API Routes

- `POST /api/contact` - Contact form submission
- `POST /api/intake` - Project intake submission
- `POST /api/waitlist` - Waitlist registration

---

## Maintenance Notes

### Regular Updates Needed

- `package.json` dependencies (security updates)
- Product page content
- Customer logos in `public/customers/`
- Team photos in `public/images/`

### Configuration Files to Review

- `vercel.json` - Deployment settings
- `next.config.mjs` - Build optimizations
- `.env.local` - Environment variables

### Documentation to Keep Updated

- `README.md` - Project overview
- `docs/product-suite-prd.md` - Product requirements (currently may be outdated)
- This documentation set
