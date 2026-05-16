# API Contracts Documentation

**Project:** TrueSpur Technology Solutions Website  
**Generated:** 2026-05-16  
**API Type:** Next.js API Routes (Serverless Functions)

---

## Overview

The application exposes 3 RESTful API endpoints for form submissions:
- Contact form submissions
- Project intake/enquiry submissions  
- Product waitlist registrations

All endpoints use **POST** method, accept JSON payloads, and return JSON responses.

---

## Authentication & Security

- **Authentication:** None (public endpoints)
- **Rate Limiting:** Not implemented (recommended for production)
- **CORS:** Default Next.js CORS policy
- **Input Validation:** Server-side validation on all fields
- **Input Sanitization:** String trimming and length limits on intake endpoint

---

## Endpoints

### 1. Contact Form API

**Endpoint:** `POST /api/contact`

**Purpose:** Handle general contact form submissions from the website

**Request Body:**
```typescript
interface ContactFormData {
  firstName: string      // Required, trimmed
  lastName: string       // Required, trimmed
  email: string          // Required, validated email format
  projectType: string    // Required (e.g., "Website Development", "Mobile App")
  message: string        // Required, trimmed
}
```

**Request Example:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john.doe@example.com",
  "projectType": "Website Development",
  "message": "I need a new website for my business"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you for your message! We've sent you a confirmation email and will get back to you within 24 hours."
}
```

**Error Responses:**

**400 Bad Request** - Missing or invalid fields:
```json
{
  "error": "All fields are required"
}
```
```json
{
  "error": "Invalid email format"
}
```

**500 Internal Server Error** - Email configuration or sending failure:
```json
{
  "error": "Email service is not configured"
}
```
```json
{
  "success": false,
  "message": "Your message was received but there was an issue sending the email. Please try again or contact us directly."
}
```
```json
{
  "error": "Failed to process your request"
}
```

**Email Behavior:**
- Sends notification email to company (`TO_EMAIL`)
- Sends confirmation email to user
- Logs submission details to console
- Continues logging even if email fails

---

### 2. Project Intake/Enquiry API

**Endpoint:** `POST /api/intake`

**Purpose:** Handle detailed project enquiry submissions with module selection

**Request Body:**
```typescript
interface IntakeFormData {
  fullName: string           // Required, max 150 chars
  email: string              // Required, validated, max 200 chars
  phoneCountryCode: string   // Optional, default "+1", max 8 chars
  phoneNumber: string        // Required, max 32 chars
  company: string            // Required, max 200 chars
  role: string               // Required, max 200 chars
  modules: string[]          // Required, min 1 item, max 20 items
  modulesOther?: string      // Required if "Other" in modules, max 500 chars
  requirements: string       // Required, max 4000 chars
  source?: "get-started" | "start-project" | "get-proposal" | "success-story" | null
}
```

**Request Example:**
```json
{
  "fullName": "Jane Smith",
  "email": "jane@company.com",
  "phoneCountryCode": "+1",
  "phoneNumber": "555-0123",
  "company": "Acme Corp",
  "role": "CTO",
  "modules": ["Web Development", "Mobile Apps", "AI Solutions"],
  "requirements": "We need a complete digital transformation solution",
  "source": "get-started"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you for your enquiry! We have sent a confirmation email and will get back to you as soon as possible."
}
```

**Error Responses:**

**400 Bad Request:**
```json
{
  "error": "Name, email, and phone are required"
}
```
```json
{
  "error": "Company and role are required"
}
```
```json
{
  "error": "At least one module must be selected"
}
```
```json
{
  "error": "Please describe the other modules you need"
}
```
```json
{
  "error": "Project requirements are required"
}
```
```json
{
  "error": "Invalid email format"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Email service is not configured"
}
```
```json
{
  "success": false,
  "error": "Your enquiry was received but there was an issue sending email notifications. Please try again or contact us directly."
}
```
```json
{
  "error": "Failed to process your request"
}
```

**Additional Features:**
- Optional external storage via `INTAKE_SHEET_ENDPOINT` webhook
- Input sanitization with character limits
- Source tracking for analytics (which CTA triggered the form)
- Sends notification to company and confirmation to user

---

### 3. Product Waitlist API

**Endpoint:** `POST /api/waitlist`

**Purpose:** Register users for product waitlists

**Request Body:**
```typescript
interface WaitlistFormData {
  name: string           // Required, trimmed
  email: string          // Required, validated email format
  organization?: string  // Optional
  product: string        // Required (product name)
}
```

**Request Example:**
```json
{
  "name": "Alex Johnson",
  "email": "alex@example.com",
  "organization": "Tech Startup Inc",
  "product": "Clinexa"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "You're on the waitlist. We'll keep you updated."
}
```

**Error Responses:**

**400 Bad Request:**
```json
{
  "error": "Name, email, and product are required"
}
```
```json
{
  "error": "Invalid email format"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Email service is not configured"
}
```
```json
{
  "success": false,
  "message": "We recorded your waitlist request, but there was an issue sending email. Please try again later."
}
```
```json
{
  "error": "Failed to process your request"
}
```

**Email Behavior:**
- Sends notification to company with waitlist details
- Sends confirmation to user
- Logs submission to console

---

## Email Configuration

All endpoints use **Nodemailer** with SMTP for email delivery.

### Required Environment Variables

```env
SMTP_HOST=smtp.spaceship.com
SMTP_PORT=587
SMTP_USER=your-email@truespur.ai
SMTP_PASS=your-spaceship-email-password
FROM_EMAIL=noreply@truespur.ai
TO_EMAIL=info@truespur.ai
```

### Optional Environment Variables (Intake only)

```env
INTAKE_SHEET_ENDPOINT=https://your-webhook-url.com
INTAKE_SHEET_SECRET=your-secret-key
```

### Email Transport Configuration

- **Host:** Configurable via `SMTP_HOST`
- **Port:** Configurable via `SMTP_PORT` (default: 587)
- **Secure:** Auto-detected (true for port 465, false otherwise)
- **TLS:** `rejectUnauthorized: false` for compatibility
- **Authentication:** Username/password via SMTP credentials

---

## Common Patterns

### Validation Strategy
1. Check required fields are present and non-empty (after trimming)
2. Validate email format using regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
3. Additional business logic validation (e.g., modules array length)
4. Return 400 with descriptive error message on validation failure

### Error Handling
1. Try-catch wrapper around entire handler
2. Separate try-catch for email sending
3. Log errors to console with context
4. Return appropriate HTTP status codes
5. Provide user-friendly error messages

### Email Flow
1. Validate SMTP configuration exists
2. Create Nodemailer transporter
3. Send notification email to company
4. Send confirmation email to user
5. Log success/failure
6. Return response to client

### Logging
All endpoints log:
- Successful submissions with key details
- Failed email attempts with error details
- Timestamp in ISO format
- Sanitized user data (no passwords/secrets)

---

## Security Considerations

### Current Implementation
- ✓ Server-side input validation
- ✓ Email format validation
- ✓ Environment variable protection
- ✓ Error message sanitization (no stack traces exposed)
- ✓ Input length limits (intake endpoint)

### Recommended Enhancements
- ⚠️ Rate limiting (prevent spam/abuse)
- ⚠️ CAPTCHA integration (prevent bots)
- ⚠️ Request origin validation
- ⚠️ Input sanitization for XSS prevention
- ⚠️ Honeypot fields for spam detection
- ⚠️ IP-based throttling

---

## Testing

### Manual Testing with cURL

**Contact Form:**
```bash
curl -X POST https://your-domain.com/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "projectType": "Website Development",
    "message": "This is a test message"
  }'
```

**Intake Form:**
```bash
curl -X POST https://your-domain.com/api/intake \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phoneCountryCode": "+1",
    "phoneNumber": "555-0123",
    "company": "Test Corp",
    "role": "Developer",
    "modules": ["Web Development"],
    "requirements": "Test requirements",
    "source": "get-started"
  }'
```

**Waitlist:**
```bash
curl -X POST https://your-domain.com/api/waitlist \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "organization": "Test Org",
    "product": "Clinexa"
  }'
```

---

## Response Time Expectations

- **Validation errors:** < 50ms
- **Successful submission:** 1-3 seconds (depends on SMTP server)
- **Email sending failure:** 5-10 seconds (timeout dependent)

---

## Dependencies

- `next` - Next.js framework for API routes
- `nodemailer` ^7.0.10 - Email sending library
- TypeScript interfaces for type safety
