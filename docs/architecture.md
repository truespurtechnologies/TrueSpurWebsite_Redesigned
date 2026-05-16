# Architecture Documentation

**Project:** TrueSpur Technology Solutions Website  
**Generated:** 2026-05-16  
**Architecture Type:** Layered Component-Based (Next.js App Router)

---

## Executive Summary

TrueSpur Technology Solutions website is a modern, stateless web application built with Next.js 15, React 19, and TypeScript. The architecture follows a layered component-based pattern with serverless API routes, optimized for deployment on Vercel's edge network.

**Key Characteristics:**
- **Stateless:** No database, email-based data persistence
- **Serverless:** API routes deployed as serverless functions
- **Component-Based:** Modular UI with shadcn/ui library
- **Type-Safe:** Full TypeScript coverage
- **Performance-Optimized:** SSR, code splitting, image optimization

---

## Technology Stack

### Core Framework

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| **Framework** | Next.js | 15.5.9 | React framework with App Router |
| **UI Library** | React | 19.1.0 | Component-based UI |
| **Language** | TypeScript | 5.x | Type-safe JavaScript |
| **Styling** | Tailwind CSS | 4.1.9 | Utility-first CSS |
| **Component Library** | shadcn/ui | Various | Accessible UI components |

### Supporting Technologies

- **Email:** Nodemailer 7.0.10 with SMTP
- **Animation:** Framer Motion 11.5.5
- **Forms:** React Hook Form 7.60.0 + Zod 3.25.76
- **Icons:** Lucide React 0.454.0
- **Analytics:** Vercel Analytics 1.3.1

---

## Architecture Pattern

### Layered Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│  (React Components, Pages, UI, Animations)              │
├─────────────────────────────────────────────────────────┤
│                    Application Layer                     │
│  (Business Logic, Form Handling, State Management)      │
├─────────────────────────────────────────────────────────┤
│                      API Layer                          │
│  (Next.js API Routes, Serverless Functions)             │
├─────────────────────────────────────────────────────────┤
│                   Integration Layer                      │
│  (Email Service, External Webhooks)                     │
└─────────────────────────────────────────────────────────┘
```

### Component Hierarchy

```
Root Layout (app/layout.tsx)
├── Theme Provider
├── Analytics
└── Page Content
    ├── Homepage (app/page.tsx)
    │   ├── Header/Navigation
    │   ├── Hero Section
    │   ├── Services Section
    │   ├── Expertise Section
    │   ├── About Section
    │   ├── Customer Showcase
    │   ├── Contact Section
    │   └── Footer
    ├── Product Pages (app/products/*/page.tsx)
    │   ├── Hero
    │   ├── Features
    │   ├── Benefits
    │   └── Waitlist Form
    └── Shared Components
        ├── Lead Form Dialog
        └── UI Components (57 shadcn/ui components)
```

---

## Data Architecture

### Data Flow

**Stateless Architecture - No Database:**

```
User Input (Form)
    ↓
Client-Side Validation
    ↓
API Route (Serverless Function)
    ↓
Server-Side Validation
    ↓
Email Service (Nodemailer + SMTP)
    ↓
Email Delivery
    ↓
Response to Client
```

### Data Models

**TypeScript Interfaces (No Database Schema):**

1. **ContactFormData**
   - firstName, lastName, email, projectType, message

2. **IntakeFormData**
   - fullName, email, phone, company, role, modules, requirements, source

3. **WaitlistFormData**
   - name, email, organization, product

**Data Persistence:**
- Email inboxes (primary storage)
- Server logs (debugging)
- Optional external webhook (intake form only)

---

## API Design

### RESTful API Routes

**Endpoint Pattern:** `/api/{resource}/route.ts`

| Endpoint | Method | Purpose | Request Body | Response |
|----------|--------|---------|--------------|----------|
| `/api/contact` | POST | Contact form | ContactFormData | Success/Error JSON |
| `/api/intake` | POST | Project intake | IntakeFormData | Success/Error JSON |
| `/api/waitlist` | POST | Waitlist signup | WaitlistFormData | Success/Error JSON |

### API Architecture Pattern

```typescript
// Serverless Function Pattern
export async function POST(request: NextRequest) {
  try {
    // 1. Parse and validate input
    const body = await request.json()
    validate(body)
    
    // 2. Process business logic
    const result = await processData(body)
    
    // 3. Send notifications (email)
    await sendEmails(result)
    
    // 4. Return response
    return NextResponse.json({ success: true })
  } catch (error) {
    // Error handling
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
```

### Authentication & Authorization

**Current:** None (public endpoints)

**Recommended for future:**
- Rate limiting per IP
- CAPTCHA for spam prevention
- API key for webhook endpoints

---

## Component Architecture

### Design System

**Component Library:** shadcn/ui (57 components)

**Categories:**
- **Layout:** Card, Separator, Sidebar, Scroll Area (6 components)
- **Forms:** Input, Select, Checkbox, Radio, Textarea (13 components)
- **Navigation:** Navigation Menu, Breadcrumb, Tabs (5 components)
- **Overlays:** Dialog, Sheet, Drawer, Popover, Tooltip (9 components)
- **Feedback:** Alert, Toast, Progress, Spinner (8 components)
- **Display:** Avatar, Table, Chart, Carousel (10 components)
- **Buttons:** Button, Toggle, Button Group (4 components)
- **Utility:** Command (1 component)

**Custom Components:**
- Lead Form Dialog (multi-step wizard)
- Theme Provider (dark/light mode)

### Component Pattern

```typescript
// Typical Component Structure
"use client"  // Client component directive

import React, { useState } from "react"
import { Button } from "@/components/ui/button"

interface ComponentProps {
  title: string
  onAction: () => void
}

export function MyComponent({ title, onAction }: ComponentProps) {
  const [state, setState] = useState(false)
  
  return (
    <div>
      <h2>{title}</h2>
      <Button onClick={onAction}>Action</Button>
    </div>
  )
}
```

---

## State Management

### Strategy: React Hooks (No Global State)

**State Management Tools:**
- `useState` - Local component state
- `useEffect` - Side effects and lifecycle
- `useRef` - DOM references and mutable values
- `useContext` - Theme context only

**No Redux/Zustand:** Application complexity doesn't require global state management.

### State Patterns

**Form State:**
```typescript
const [formData, setFormData] = useState({
  field1: "",
  field2: ""
})
const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
```

**UI State:**
```typescript
const [isOpen, setIsOpen] = useState(false)
const [activeSection, setActiveSection] = useState("home")
```

**Animation State:**
```typescript
const count = useMotionValue(0)
const rounded = useTransform(count, (latest) => Math.floor(latest))
```

---

## Deployment Architecture

### Vercel Edge Network

```
┌──────────────────────────────────────────────────────┐
│                    User Request                       │
└────────────────────┬─────────────────────────────────┘
                     ↓
┌──────────────────────────────────────────────────────┐
│              Vercel Edge Network (CDN)                │
│  - Global distribution                                │
│  - SSL/TLS termination                               │
│  - Static asset caching                              │
└────────────────────┬─────────────────────────────────┘
                     ↓
         ┌───────────┴───────────┐
         ↓                       ↓
┌─────────────────┐    ┌──────────────────┐
│  Static Pages   │    │ Serverless       │
│  (SSR/SSG)      │    │ Functions        │
│  - Homepage     │    │ - /api/contact   │
│  - Product pages│    │ - /api/intake    │
└─────────────────┘    │ - /api/waitlist  │
                       └────────┬─────────┘
                                ↓
                       ┌──────────────────┐
                       │  Email Service   │
                       │  (SMTP)          │
                       └──────────────────┘
```

### Infrastructure Components

**Vercel Platform:**
- **Edge Network:** Global CDN for static assets
- **Serverless Functions:** API routes (10s timeout)
- **Build System:** Automatic builds on Git push
- **Environment Variables:** Encrypted secrets storage
- **Analytics:** Built-in performance monitoring

**External Services:**
- **Spaceship Email:** SMTP email delivery
- **Optional Webhook:** External data storage (intake form)

### Regions

**Primary Region:** `fra1` (Frankfurt, Germany)

**Global Distribution:** Vercel CDN serves static assets from nearest edge location

---

## Security Architecture

### Current Security Measures

**Input Validation:**
- Server-side validation on all API endpoints
- Email format validation (regex)
- Required field checks
- Type safety via TypeScript

**Data Protection:**
- Environment variables for secrets
- HTTPS enforced
- No sensitive data in client code
- Email credentials encrypted in Vercel

**CORS Configuration:**
```json
{
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization"
}
```

### Recommended Enhancements

**High Priority:**
- Rate limiting (prevent spam/abuse)
- CAPTCHA integration (prevent bots)
- Input sanitization (XSS prevention)

**Medium Priority:**
- API key authentication for webhooks
- Request logging and monitoring
- IP-based throttling

**Low Priority:**
- Content Security Policy headers
- HSTS headers
- Subresource Integrity

---

## Performance Architecture

### Optimization Strategies

**Server-Side Rendering (SSR):**
- Initial page load optimized
- SEO-friendly HTML
- Fast Time to First Byte (TTFB)

**Code Splitting:**
- Automatic by Next.js App Router
- Route-based splitting
- Component-level lazy loading

**Image Optimization:**
- Next.js Image component
- Automatic format conversion (WebP)
- Responsive image sizes
- Lazy loading

**Caching Strategy:**
- Static assets cached by CDN
- API routes: No caching (dynamic)
- Browser caching headers

### Performance Metrics

**Target Lighthouse Scores:**
- Performance: > 90
- Accessibility: > 90
- Best Practices: > 90
- SEO: > 90

---

## Development Workflow

### Build Process

```
Source Code
    ↓
TypeScript Compilation
    ↓
Next.js Build
    ├── Static Page Generation
    ├── Serverless Function Bundling
    └── Asset Optimization
    ↓
.next/ Output Directory
    ↓
Deployment to Vercel
```

### CI/CD Pipeline

**Automatic Deployment:**
1. Push to Git repository
2. Vercel detects changes
3. Runs build command (`pnpm build`)
4. Deploys to production/preview
5. Assigns URL

**Environments:**
- **Production:** `main` branch → `www.truespur.ai`
- **Preview:** Other branches → `*.vercel.app`
- **Development:** Local → `localhost:3000`

---

## Testing Strategy

### Current Testing

**Manual Testing:**
- Form submissions
- Email delivery
- Responsive design
- Cross-browser compatibility

**Build-Time Testing:**
- TypeScript type checking
- ESLint code quality
- Build success verification

### Recommended Testing

**Unit Tests:**
- Component rendering
- Utility functions
- Form validation logic

**Integration Tests:**
- API endpoint responses
- Email sending flow
- Form submission flow

**E2E Tests:**
- User journeys
- Form submissions
- Navigation flows

**Tools:**
- Jest for unit tests
- React Testing Library for components
- Playwright for E2E tests

---

## Scalability Considerations

### Current Architecture

**Scalability:** Excellent (serverless)

**Advantages:**
- Auto-scaling serverless functions
- Global CDN distribution
- No database bottlenecks
- Stateless design

**Limitations:**
- Email as data store (not queryable)
- No user accounts/sessions
- Limited to form submissions

### Future Scalability

**If database needed:**
- Add PostgreSQL (Vercel Postgres)
- Implement Prisma ORM
- Add caching layer (Redis)
- Maintain serverless architecture

**If high traffic:**
- Already optimized for scale
- Vercel handles auto-scaling
- CDN caching reduces origin load

---

## Monitoring & Observability

### Current Monitoring

**Vercel Analytics:**
- Page views
- Performance metrics
- Web Vitals

**Server Logs:**
- Console logging in API routes
- Error tracking in Vercel dashboard
- Function execution logs

### Recommended Additions

**Error Tracking:**
- Sentry for error monitoring
- Structured logging
- Alert notifications

**Performance Monitoring:**
- Real User Monitoring (RUM)
- API response time tracking
- Email delivery success rate

**Business Metrics:**
- Form submission rates
- Conversion tracking
- User engagement metrics

---

## Disaster Recovery

### Backup Strategy

**Code:**
- Git repository (primary backup)
- Vercel deployment history
- Local development copies

**Data:**
- Email inboxes (company and users)
- Server logs (Vercel retention)
- Optional webhook storage

**Configuration:**
- Environment variables in Vercel
- Configuration files in Git
- Documentation in `docs/`

### Recovery Procedures

**Rollback:**
1. Access Vercel dashboard
2. Select previous deployment
3. Promote to production
4. Verify functionality

**Data Loss:**
- Email data: Check email provider backups
- Logs: Limited retention in Vercel
- Code: Restore from Git

---

## Future Architecture Considerations

### Potential Enhancements

**Database Integration:**
- Add PostgreSQL for data persistence
- Implement admin dashboard
- Enable data querying and reporting

**Authentication:**
- Add user accounts
- Implement admin login
- Secure API endpoints

**CMS Integration:**
- Headless CMS for content management
- Dynamic content updates
- Multi-language support

**Advanced Features:**
- Real-time notifications
- WebSocket support
- Background job processing

---

## Architecture Decision Records

### ADR-001: Stateless Architecture

**Decision:** Use email-based persistence instead of database

**Rationale:**
- Simple requirements (form submissions)
- Reduced infrastructure complexity
- Lower operational costs
- Email provides natural backup

**Consequences:**
- No data querying capability
- Dependent on email service reliability
- Limited analytics without external tools

### ADR-002: Vercel Deployment

**Decision:** Deploy on Vercel platform

**Rationale:**
- Optimized for Next.js
- Automatic scaling
- Global CDN
- Simple deployment workflow

**Consequences:**
- Vendor lock-in to Vercel
- Function timeout limits (10s)
- Pricing based on usage

### ADR-003: shadcn/ui Component Library

**Decision:** Use shadcn/ui instead of Material-UI or Chakra

**Rationale:**
- Full customization control
- Radix UI accessibility
- Tailwind CSS integration
- Copy-paste components (no package dependency)

**Consequences:**
- Manual component updates
- More initial setup
- Greater flexibility

---

## Glossary

- **SSR:** Server-Side Rendering
- **CDN:** Content Delivery Network
- **SMTP:** Simple Mail Transfer Protocol
- **API:** Application Programming Interface
- **UI:** User Interface
- **CTA:** Call to Action
- **OTP:** One-Time Password
- **CORS:** Cross-Origin Resource Sharing
