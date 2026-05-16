# Data Models Documentation

**Project:** TrueSpur Technology Solutions Website  
**Generated:** 2026-05-16  
**Database:** None (Stateless Application)

---

## Overview

This application is **stateless** and does not use a traditional database. All data is handled through:
- API request/response cycles
- Email delivery via SMTP
- Optional external webhook storage (intake form only)

---

## Data Structures

The application defines TypeScript interfaces for form data validation and type safety.

### 1. Contact Form Data Model

**Location:** `app/api/contact/route.ts`

```typescript
interface ContactFormData {
  firstName: string      // User's first name
  lastName: string       // User's last name
  email: string          // User's email address
  projectType: string    // Type of project inquiry
  message: string        // User's message/inquiry
}
```

**Validation Rules:**
- All fields are required
- Strings must be non-empty after trimming
- Email must match regex pattern: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

**Data Flow:**
1. Client submits form → API validates → Sends emails → Returns response
2. No persistent storage in application
3. Data exists only in email records and server logs

---

### 2. Intake Form Data Model

**Location:** `app/api/intake/route.ts`

```typescript
interface IntakeFormData {
  fullName: string           // Full name of contact person
  email: string              // Contact email address
  phoneCountryCode: string   // Phone country code (e.g., "+1")
  phoneNumber: string        // Phone number without country code
  company: string            // Company/organization name
  role: string               // Contact person's role/title
  modules: string[]          // Array of selected service modules
  modulesOther?: string      // Description if "Other" module selected
  requirements: string       // Detailed project requirements
  source?: "get-started" | "start-project" | "get-proposal" | "success-story" | null
}
```

**Validation Rules:**
- `fullName`, `email`, `phoneNumber`, `company`, `role`, `requirements` are required
- `modules` array must have at least 1 item
- If `modules` includes "Other", `modulesOther` is required
- Email must match regex pattern
- All string fields are trimmed

**Input Sanitization:**
```typescript
const safeBody: IntakeFormData = {
  fullName: body.fullName.trim().slice(0, 150),
  email: body.email.trim().slice(0, 200),
  phoneCountryCode: body.phoneCountryCode?.trim().slice(0, 8) || "+1",
  phoneNumber: body.phoneNumber.trim().slice(0, 32),
  company: body.company.trim().slice(0, 200),
  role: body.role.trim().slice(0, 200),
  modules: body.modules.slice(0, 20),
  modulesOther: body.modulesOther?.trim().slice(0, 500),
  requirements: body.requirements.trim().slice(0, 4000),
  source: body.source ?? null,
}
```

**Character Limits:**
- `fullName`: 150 characters
- `email`: 200 characters
- `phoneCountryCode`: 8 characters
- `phoneNumber`: 32 characters
- `company`: 200 characters
- `role`: 200 characters
- `modules`: 20 items max
- `modulesOther`: 500 characters
- `requirements`: 4000 characters

**Data Flow:**
1. Client submits form → API validates → Sanitizes input
2. Optionally sends to external webhook (`INTAKE_SHEET_ENDPOINT`)
3. Sends emails → Returns response
4. External storage structure (if webhook configured):
```typescript
{
  ...safeBody,
  createdAt: string  // ISO timestamp
}
```

---

### 3. Waitlist Form Data Model

**Location:** `app/api/waitlist/route.ts`

```typescript
interface WaitlistFormData {
  name: string           // User's name
  email: string          // User's email address
  organization?: string  // Optional organization name
  product: string        // Product name for waitlist
}
```

**Validation Rules:**
- `name`, `email`, `product` are required
- Strings must be non-empty after trimming
- Email must match regex pattern
- `organization` is optional

**Data Flow:**
1. Client submits form → API validates → Sends emails → Returns response
2. No persistent storage in application

---

## Data Persistence Strategy

### Current Implementation
- **No Database:** Application is stateless
- **Email Records:** Data persisted in email inboxes
- **Server Logs:** Console logging for debugging and monitoring
- **Optional Webhook:** Intake form can POST to external endpoint

### Email as Data Store
All form submissions are sent via email to:
- **Company Email:** `TO_EMAIL` environment variable (default: `info@truespur.ai`)
- **User Email:** Confirmation sent to user's provided email

### External Storage (Intake Only)
Optional webhook integration for intake form:
```typescript
// Environment variables
INTAKE_SHEET_ENDPOINT=https://your-webhook-url.com
INTAKE_SHEET_SECRET=your-secret-key

// Webhook request
POST INTAKE_SHEET_ENDPOINT
Headers: {
  "Content-Type": "application/json",
  "X-Intake-Secret": INTAKE_SHEET_SECRET  // if secret configured
}
Body: {
  ...IntakeFormData,
  createdAt: "2026-05-16T12:00:00.000Z"
}
```

---

## Logging Strategy

All API endpoints log structured data to console:

### Contact Form Logs
```typescript
console.log("Contact form submission processed successfully:", {
  firstName: string,
  lastName: string,
  email: string,
  projectType: string,
  timestamp: string  // ISO format
})
```

### Intake Form Logs
```typescript
console.log("Intake form submission processed successfully", {
  fullName: string,
  email: string,
  company: string,
  role: string,
  source: string | null,
  timestamp: string  // ISO format
})
```

### Waitlist Logs
```typescript
console.log("Waitlist submission processed successfully:", {
  name: string,
  email: string,
  product: string,
  organization: string | undefined,
  timestamp: string  // ISO format
})
```

### Error Logs
```typescript
console.error("Email sending failed:", emailError)
console.error("Contact form error:", error)
console.error("Intake storage error:", storageError)
```

---

## Data Security

### Sensitive Data Handling
- **No Password Storage:** Application doesn't handle user passwords
- **Email Validation:** Prevents invalid email addresses
- **Input Sanitization:** Length limits on intake form prevent overflow attacks
- **Environment Variables:** SMTP credentials stored in `.env.local` (gitignored)
- **No SQL Injection Risk:** No database queries
- **No XSS in Storage:** Data only stored in emails (HTML escaped)

### Data in Transit
- **HTTPS:** All API requests over HTTPS in production
- **SMTP TLS:** Email sent over encrypted connection (port 587 with STARTTLS)
- **Environment Variables:** Secrets never exposed to client

### Privacy Considerations
- **No Cookies:** Application doesn't set cookies
- **No Session Storage:** Stateless API
- **Email Retention:** Depends on email provider retention policy
- **Webhook Data:** External storage responsibility of webhook endpoint owner

---

## Future Database Considerations

If persistent storage is needed in the future:

### Recommended Stack
- **Database:** PostgreSQL or MongoDB
- **ORM:** Prisma (already in dependencies as potential future use)
- **Hosting:** Vercel Postgres, PlanetScale, or MongoDB Atlas

### Potential Schema (Prisma Example)
```prisma
model ContactSubmission {
  id          String   @id @default(cuid())
  firstName   String
  lastName    String
  email       String
  projectType String
  message     String
  createdAt   DateTime @default(now())
  emailSent   Boolean  @default(false)
}

model IntakeSubmission {
  id               String   @id @default(cuid())
  fullName         String
  email            String
  phoneCountryCode String
  phoneNumber      String
  company          String
  role             String
  modules          String[]
  modulesOther     String?
  requirements     String   @db.Text
  source           String?
  createdAt        DateTime @default(now())
  emailSent        Boolean  @default(false)
}

model WaitlistSubmission {
  id           String   @id @default(cuid())
  name         String
  email        String
  organization String?
  product      String
  createdAt    DateTime @default(now())
  emailSent    Boolean  @default(false)
}
```

---

## Data Migration Strategy

Currently not applicable (no database). If migrating to database:

1. **Phase 1:** Add database alongside email system
2. **Phase 2:** Store submissions in both email and database
3. **Phase 3:** Use database as primary, email as backup notification
4. **Phase 4:** Add admin dashboard to view submissions

---

## Compliance Notes

### GDPR Considerations
- **Data Minimization:** Only collects necessary fields
- **Purpose Limitation:** Data used only for contact/inquiry purposes
- **Storage Limitation:** No long-term storage in application (email retention varies)
- **Right to Erasure:** Would require email deletion from inbox
- **Data Portability:** User receives copy via confirmation email

### Recommendations for Production
- Add privacy policy link on forms
- Add consent checkbox for data processing
- Implement data retention policy
- Consider GDPR-compliant email provider
- Add unsubscribe mechanism for waitlist
