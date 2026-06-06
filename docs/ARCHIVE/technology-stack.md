# Technology Stack Analysis

**Project:** TrueSpur Technology Solutions Website  
**Generated:** 2026-05-16  
**Project Type:** Web Application (Next.js)

---

## Technology Summary

| Category | Technology | Version | Justification |
|----------|-----------|---------|---------------|
| **Framework** | Next.js | 15.5.9 | Modern React framework with App Router, server-side rendering, and API routes |
| **Runtime** | React | 19.1.0 | Latest React version with improved performance and concurrent features |
| **Language** | TypeScript | 5.x | Type-safe JavaScript for better developer experience and code quality |
| **Styling** | Tailwind CSS | 4.1.9 | Utility-first CSS framework for rapid UI development |
| **UI Components** | shadcn/ui (Radix UI) | Various | Accessible, customizable component library built on Radix UI primitives |
| **Icons** | Lucide React | 0.454.0 | Comprehensive icon library with consistent design |
| **Form Management** | React Hook Form | 7.60.0 | Performant form state management with validation |
| **Validation** | Zod | 3.25.76 | TypeScript-first schema validation |
| **Email Service** | Nodemailer | 7.0.10 | SMTP email sending for contact forms |
| **Animation** | Framer Motion | 11.5.5 | Production-ready animation library |
| **Theme Management** | next-themes | 0.4.6 | Dark/light mode support |
| **Analytics** | Vercel Analytics | 1.3.1 | Web analytics and performance monitoring |
| **Package Manager** | pnpm | - | Fast, disk space efficient package manager |

---

## Architecture Pattern

**Pattern:** Layered Component-Based Architecture (Next.js App Router)

- **Presentation Layer:** React components with Tailwind CSS styling
- **API Layer:** Next.js API routes for serverless functions
- **Component Library:** shadcn/ui components for consistent UI
- **State Management:** React hooks (useState, useEffect) for local state
- **Form Handling:** React Hook Form with Zod validation

---

## Core Dependencies Detail

### Frontend Framework
- **Next.js 15.5.9** - React framework with:
  - App Router for file-based routing
  - Server-side rendering (SSR) for SEO
  - API routes for backend functionality
  - Image optimization
  - Built-in TypeScript support

### UI & Component Library
- **Radix UI Primitives** (Multiple packages):
  - `@radix-ui/react-accordion` 1.2.2
  - `@radix-ui/react-dialog` 1.1.4
  - `@radix-ui/react-dropdown-menu` 2.1.4
  - `@radix-ui/react-navigation-menu` 1.2.3
  - `@radix-ui/react-select` 2.1.4
  - `@radix-ui/react-tabs` 1.1.2
  - `@radix-ui/react-toast` 1.2.4
  - And 20+ more Radix UI components

- **shadcn/ui** - Component library built on Radix UI
- **class-variance-authority** 0.7.1 - Component variant management
- **clsx** 2.1.1 - Conditional className utility
- **tailwind-merge** 2.5.5 - Merge Tailwind classes intelligently

### Styling System
- **Tailwind CSS** 4.1.9 - Utility-first CSS framework
- **PostCSS** 8.5.x - CSS processing
- **Autoprefixer** 10.4.20 - Automatic vendor prefixing
- **tailwindcss-animate** 1.0.7 - Animation utilities

### Form & Validation
- **react-hook-form** 7.60.0 - Form state management
- **@hookform/resolvers** 3.10.0 - Validation schema resolvers
- **zod** 3.25.76 - TypeScript-first schema validation
- **input-otp** 1.4.1 - OTP input component

### Additional Features
- **framer-motion** 11.5.5 - Animation library
- **embla-carousel-react** 8.5.1 - Carousel/slider component
- **react-day-picker** 9.8.0 - Date picker component
- **recharts** 2.15.4 - Data visualization library
- **sonner** 1.7.4 - Toast notification system
- **vaul** 0.9.9 - Drawer component
- **cmdk** 1.0.4 - Command menu component
- **react-resizable-panels** 2.1.7 - Resizable panel layouts

### Backend & Email
- **nodemailer** 7.0.10 - Email sending via SMTP
- SMTP Configuration for Spaceship email service

### Development Tools
- **@types/node** 22.x - Node.js type definitions
- **@types/react** 18.x - React type definitions
- **@types/react-dom** 18.x - React DOM type definitions
- **@types/nodemailer** 7.0.3 - Nodemailer type definitions
- **dotenv** 17.2.3 - Environment variable management

---

## Environment Configuration

### Required Environment Variables
```
SMTP_HOST=smtp.spaceship.com
SMTP_PORT=587
SMTP_USER=your-email@truespur.ai
SMTP_PASS=your-spaceship-email-password
FROM_EMAIL=noreply@truespur.ai
TO_EMAIL=info@truespur.ai
```

### Configuration Files
- `.env.local` - Local environment variables (gitignored)
- `env-example.txt` - Environment variable template
- `next.config.mjs` - Next.js configuration
- `tsconfig.json` - TypeScript configuration
- `postcss.config.mjs` - PostCSS configuration
- `components.json` - shadcn/ui configuration
- `tailwind.config.ts` - Tailwind CSS configuration (implied)

---

## Build & Development

### Package Manager
- **pnpm** - Fast, disk space efficient package manager
- Lock file: `pnpm-lock.yaml` (169KB)

### Scripts (from package.json)
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### TypeScript Configuration
- Target: ES6
- Module: ESNext
- JSX: preserve (for Next.js)
- Strict mode enabled
- Path alias: `@/*` maps to project root

---

## Architecture Characteristics

### Performance Optimizations
- Server-side rendering for initial page load
- Automatic code splitting by routes
- Image optimization via Next.js
- Tree-shaking for smaller bundles
- Production console removal (except errors/warnings)

### Accessibility
- Radix UI primitives are WCAG compliant
- Semantic HTML structure
- Keyboard navigation support
- Screen reader friendly

### Developer Experience
- TypeScript for type safety
- Hot module replacement in development
- Component-based architecture
- Reusable UI component library
- Path aliases for clean imports

---

## Deployment Target

**Platform:** Vercel (optimized for Next.js)
- Automatic deployments from Git
- Global CDN
- Serverless functions for API routes
- Built-in analytics integration
- SSL certificates included
