# Development Guide

**Project:** TrueSpur Technology Solutions Website  
**Generated:** 2026-05-16  
**Framework:** Next.js 15 with App Router

---

## Prerequisites

### Required Software

| Software | Version | Purpose |
|----------|---------|---------|
| Node.js | 18.x or higher | JavaScript runtime |
| pnpm | Latest | Package manager (preferred) |
| npm | 10.x or higher | Alternative package manager |
| Git | Latest | Version control |

### Optional Tools

- **VS Code** - Recommended IDE with TypeScript support
- **Vercel CLI** - For local deployment testing
- **Postman/Thunder Client** - API testing

---

## Initial Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd TrueSpurWebsite_Redesigned
```

### 2. Install Dependencies

**Using pnpm (recommended):**
```bash
pnpm install
```

**Using npm:**
```bash
npm install
```

**Package Manager Notes:**
- Project uses `pnpm-lock.yaml` (169KB)
- Also includes `package-lock.json` for npm compatibility
- pnpm is faster and more disk-efficient

### 3. Environment Configuration

**Copy environment template:**
```bash
cp env-example.txt .env.local
```

**Edit `.env.local` with actual values:**
```env
# Spaceship Email SMTP Configuration
SMTP_HOST=smtp.spaceship.com
SMTP_PORT=587
SMTP_USER=your-email@truespur.ai
SMTP_PASS=your-spaceship-email-password

# Email Configuration
FROM_EMAIL=noreply@truespur.ai
TO_EMAIL=info@truespur.ai

# Optional: Intake form external storage
INTAKE_SHEET_ENDPOINT=https://your-webhook-url.com
INTAKE_SHEET_SECRET=your-secret-key
```

**Environment Variable Sources:**
- **SMTP credentials:** Get from Spaceship email dashboard
- **Email addresses:** Configure sender and recipient emails
- **Webhook (optional):** External storage for intake submissions

---

## Development Commands

### Start Development Server

```bash
pnpm dev
```

**Access application:**
- URL: `http://localhost:3000`
- Hot reload enabled
- TypeScript errors shown in terminal

### Build for Production

```bash
pnpm build
```

**Output:**
- Compiled files in `.next/` directory
- Static pages generated
- Serverless functions bundled
- Build errors/warnings displayed

### Start Production Server Locally

```bash
pnpm start
```

**Requirements:**
- Must run `pnpm build` first
- Serves optimized production build
- Test before deploying

### Lint Code

```bash
pnpm lint
```

**Checks:**
- ESLint rules
- TypeScript errors
- Code style issues

---

## Project Structure

### Key Directories

```
TrueSpurWebsite_Redesigned/
├── app/                    # Application code (App Router)
│   ├── api/               # API routes
│   ├── products/          # Product pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── *.tsx             # Custom components
├── public/               # Static assets
│   ├── images/
│   ├── logo/
│   └── customers/
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
└── docs/                 # Documentation
```

### Configuration Files

- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `next.config.mjs` - Next.js settings
- `components.json` - shadcn/ui config
- `postcss.config.mjs` - PostCSS settings
- `vercel.json` - Deployment configuration

---

## Development Workflow

### 1. Feature Development

**Create feature branch:**
```bash
git checkout -b feature/your-feature-name
```

**Make changes:**
- Edit files in `app/`, `components/`, etc.
- Test locally with `pnpm dev`
- Check for TypeScript errors

**Commit changes:**
```bash
git add .
git commit -m "feat: description of changes"
```

### 2. Testing

**Manual testing checklist:**
- [ ] Homepage loads correctly
- [ ] Navigation works (desktop & mobile)
- [ ] Contact form submits successfully
- [ ] Intake form (lead form) works
- [ ] Product pages load
- [ ] Waitlist forms function
- [ ] Responsive design on mobile
- [ ] Email notifications sent

**Test API endpoints:**
```bash
# Test contact form
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "projectType": "Website Development",
    "message": "Test message"
  }'
```

**Test email configuration:**
```bash
node test-email.js
```

### 3. Code Quality

**Run linter:**
```bash
pnpm lint
```

**Fix auto-fixable issues:**
```bash
pnpm lint --fix
```

**TypeScript check:**
```bash
npx tsc --noEmit
```

---

## Common Development Tasks

### Adding a New Page

**1. Create page file:**
```bash
# Create new route
mkdir -p app/new-page
touch app/new-page/page.tsx
```

**2. Page template:**
```typescript
export default function NewPage() {
  return (
    <main className="min-h-screen">
      <h1>New Page</h1>
    </main>
  )
}
```

**3. Access page:**
```
http://localhost:3000/new-page
```

### Adding a New API Endpoint

**1. Create route file:**
```bash
mkdir -p app/api/new-endpoint
touch app/api/new-endpoint/route.ts
```

**2. Route template:**
```typescript
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Process request
    
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    )
  }
}
```

### Adding a New Component

**1. Create component file:**
```bash
touch components/my-component.tsx
```

**2. Component template:**
```typescript
"use client"

import React from "react"

interface MyComponentProps {
  title: string
}

export function MyComponent({ title }: MyComponentProps) {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  )
}
```

**3. Use component:**
```typescript
import { MyComponent } from "@/components/my-component"

<MyComponent title="Hello" />
```

### Adding shadcn/ui Component

**Install component:**
```bash
npx shadcn@latest add button
```

**Use component:**
```typescript
import { Button } from "@/components/ui/button"

<Button variant="default">Click me</Button>
```

### Updating Dependencies

**Check for updates:**
```bash
pnpm outdated
```

**Update all dependencies:**
```bash
pnpm update
```

**Update specific package:**
```bash
pnpm update package-name
```

---

## Debugging

### Common Issues

**1. Port already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000

# Or use different port
pnpm dev -- -p 3001
```

**2. TypeScript errors:**
```bash
# Check errors
npx tsc --noEmit

# Clear Next.js cache
rm -rf .next
pnpm dev
```

**3. Email not sending:**
- Verify SMTP credentials in `.env.local`
- Check Spaceship email settings
- Test with `node test-email.js`
- Check server logs for errors

**4. Build failures:**
```bash
# Clear cache and rebuild
rm -rf .next
rm -rf node_modules
pnpm install
pnpm build
```

### Development Tools

**Next.js DevTools:**
- Fast Refresh for instant updates
- Error overlay for runtime errors
- Build output in terminal

**Browser DevTools:**
- Console for JavaScript errors
- Network tab for API requests
- React DevTools extension

**VS Code Extensions:**
- ESLint
- Prettier
- TypeScript and JavaScript Language Features
- Tailwind CSS IntelliSense

---

## Environment Variables

### Required Variables

```env
SMTP_HOST=smtp.spaceship.com
SMTP_PORT=587
SMTP_USER=your-email@truespur.ai
SMTP_PASS=your-password
FROM_EMAIL=noreply@truespur.ai
TO_EMAIL=info@truespur.ai
```

### Optional Variables

```env
# Intake form external storage
INTAKE_SHEET_ENDPOINT=https://webhook-url.com
INTAKE_SHEET_SECRET=secret-key

# Node environment
NODE_ENV=development
```

### Environment Files

- `.env.local` - Local development (gitignored)
- `env-example.txt` - Template for setup
- Never commit `.env.local` to Git

---

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new files
- Define interfaces for props and data
- Avoid `any` type
- Use strict mode

### React Components

- Use functional components
- Use hooks for state management
- Add "use client" for client components
- Export named components

### Naming Conventions

- **Files:** kebab-case (`my-component.tsx`)
- **Components:** PascalCase (`MyComponent`)
- **Functions:** camelCase (`handleSubmit`)
- **Constants:** UPPER_SNAKE_CASE (`API_URL`)

### Imports

```typescript
// External libraries first
import React from "react"
import { useState } from "react"

// Internal components
import { Button } from "@/components/ui/button"
import { MyComponent } from "@/components/my-component"

// Utilities and types
import { cn } from "@/lib/utils"
import type { MyType } from "@/types"
```

---

## Performance Optimization

### Image Optimization

**Use Next.js Image component:**
```typescript
import Image from "next/image"

<Image
  src="/images/hero.jpg"
  alt="Hero image"
  width={1200}
  height={600}
  priority
/>
```

### Code Splitting

- Automatic by Next.js App Router
- Dynamic imports for heavy components:
```typescript
const HeavyComponent = dynamic(() => import("@/components/heavy"), {
  loading: () => <Spinner />
})
```

### Caching

- API routes use Next.js caching
- Static assets cached by CDN
- Revalidation strategies in `next.config.mjs`

---

## Git Workflow

### Commit Messages

**Format:**
```
type(scope): description

[optional body]
```

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `style:` Formatting
- `refactor:` Code restructuring
- `test:` Tests
- `chore:` Maintenance

**Examples:**
```bash
git commit -m "feat(contact): add phone field to contact form"
git commit -m "fix(api): handle email sending errors gracefully"
git commit -m "docs(readme): update setup instructions"
```

### Branch Strategy

- `main` - Production branch
- `develop` - Development branch
- `feature/*` - Feature branches
- `fix/*` - Bug fix branches

---

## Troubleshooting

### Build Issues

**Clear all caches:**
```bash
rm -rf .next
rm -rf node_modules
rm -rf .pnpm-store
pnpm install
pnpm build
```

### Email Issues

**Test SMTP connection:**
```bash
node test-email.js
```

**Check logs:**
- Server console for error messages
- Verify environment variables loaded
- Test with different SMTP port (465 vs 587)

### Deployment Issues

**Local production test:**
```bash
pnpm build
pnpm start
```

**Check Vercel logs:**
- Visit Vercel dashboard
- Check deployment logs
- Verify environment variables set

---

## Additional Resources

### Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Docs](https://ui.shadcn.com)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

### Project Documentation

- `README.md` - Project overview
- `docs/api-contracts.md` - API documentation
- `docs/ui-components.md` - Component inventory
- `docs/architecture.md` - Architecture overview

---

## Getting Help

### Internal Resources

- Project README
- Generated documentation in `docs/`
- Code comments
- Git commit history

### External Resources

- Next.js Discord
- Stack Overflow
- GitHub Issues (for dependencies)

### Team Communication

- Check with team lead for architecture decisions
- Review existing code patterns
- Follow established conventions
