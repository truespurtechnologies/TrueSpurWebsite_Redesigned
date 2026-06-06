# Deployment Guide

**Project:** TrueSpur Technology Solutions Website  
**Generated:** 2026-05-16  
**Platform:** Vercel (Recommended)

---

## Deployment Overview

**Recommended Platform:** Vercel  
**Framework:** Next.js 15  
**Build Command:** `pnpm build`  
**Output Directory:** `.next`

---

## Pre-Deployment Checklist

### 1. Environment Variables

Ensure all required environment variables are configured:

```env
✓ SMTP_HOST=smtp.spaceship.com
✓ SMTP_PORT=587
✓ SMTP_USER=your-email@truespur.ai
✓ SMTP_PASS=your-spaceship-email-password
✓ FROM_EMAIL=noreply@truespur.ai
✓ TO_EMAIL=info@truespur.ai
```

**Optional:**
```env
INTAKE_SHEET_ENDPOINT=https://your-webhook-url.com
INTAKE_SHEET_SECRET=your-secret-key
```

### 2. Build Verification

**Test production build locally:**
```bash
pnpm build
pnpm start
```

**Check for:**
- [ ] No build errors
- [ ] No TypeScript errors
- [ ] All pages load correctly
- [ ] API endpoints functional
- [ ] Email sending works

### 3. Code Quality

```bash
# Run linter
pnpm lint

# Check TypeScript
npx tsc --noEmit
```

### 4. Asset Verification

Ensure all assets are present:
- [ ] Company logos in `public/logo/`
- [ ] Customer logos in `public/customers/`
- [ ] Hero images in `public/images/`
- [ ] Placeholder images available

---

## Vercel Deployment

### Initial Setup

**1. Connect Repository**

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import Git repository
4. Select your repository

**2. Configure Project**

**Framework Preset:** Next.js (auto-detected)

**Build Settings:**
- **Build Command:** `pnpm build` (or leave default)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `pnpm install` (or leave default)
- **Development Command:** `pnpm dev`

**Root Directory:** `./` (leave default)

**3. Environment Variables**

Add in Vercel dashboard under **Settings → Environment Variables:**

| Variable | Value | Environment |
|----------|-------|-------------|
| SMTP_HOST | smtp.spaceship.com | Production, Preview, Development |
| SMTP_PORT | 587 | Production, Preview, Development |
| SMTP_USER | your-email@truespur.ai | Production, Preview, Development |
| SMTP_PASS | your-password | Production, Preview, Development |
| FROM_EMAIL | noreply@truespur.ai | Production, Preview, Development |
| TO_EMAIL | info@truespur.ai | Production, Preview, Development |

**Optional variables:**
| Variable | Value | Environment |
|----------|-------|-------------|
| INTAKE_SHEET_ENDPOINT | https://webhook-url.com | Production, Preview |
| INTAKE_SHEET_SECRET | your-secret | Production, Preview |

**4. Deploy**

Click **Deploy** button

**Deployment process:**
1. Clone repository
2. Install dependencies
3. Run build command
4. Deploy to CDN
5. Assign URL

---

## Custom Domain Configuration

### 1. Add Domain in Vercel

**Navigate to:** Project Settings → Domains

**Add domains:**
- `truespur.ai`
- `www.truespur.ai`

### 2. Configure DNS

**For root domain (`truespur.ai`):**

Add A records pointing to Vercel:
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**

Add CNAME record:
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. SSL Certificate

- Vercel automatically provisions SSL certificates
- HTTPS enabled within minutes
- Auto-renewal handled by Vercel

### 4. Redirect Configuration

**Redirect `truespur.ai` → `www.truespur.ai`:**

Configured automatically by Vercel when both domains added.

---

## Vercel Configuration File

**File:** `vercel.json`

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["fra1"],
  "functions": {
    "app/api/contact/route.ts": {
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        },
        {
          "key": "Access-Control-Allow-Headers",
          "value": "Content-Type, Authorization"
        }
      ]
    }
  ]
}
```

**Configuration details:**
- **Region:** `fra1` (Frankfurt, Germany)
- **Function timeout:** 10 seconds for contact API
- **CORS:** Enabled for all API routes
- **Framework:** Next.js auto-detected

---

## Deployment Workflow

### Automatic Deployments

**Production deployments:**
- Triggered by pushes to `main` branch
- Automatic build and deploy
- Live at custom domain

**Preview deployments:**
- Triggered by pushes to other branches
- Unique preview URL generated
- Test before merging to main

### Manual Deployments

**Via Vercel CLI:**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

**Via Vercel Dashboard:**
1. Go to project deployments
2. Click "Redeploy"
3. Select deployment to redeploy

---

## Environment-Specific Configuration

### Production

- **URL:** `https://www.truespur.ai`
- **Branch:** `main`
- **Environment:** Production
- **Analytics:** Enabled via `@vercel/analytics`

### Preview

- **URL:** Auto-generated (`*.vercel.app`)
- **Branch:** Any non-main branch
- **Environment:** Preview
- **Purpose:** Testing before production

### Development

- **URL:** `http://localhost:3000`
- **Environment:** Local
- **Purpose:** Local development

---

## Post-Deployment Verification

### 1. Domain Access

**Test URLs:**
- ✓ `https://www.truespur.ai`
- ✓ `https://truespur.ai` (should redirect to www)

### 2. SSL Certificate

- ✓ HTTPS enabled
- ✓ Valid certificate
- ✓ No mixed content warnings

### 3. Functionality Tests

**Homepage:**
- [ ] Page loads correctly
- [ ] Navigation works
- [ ] Images display
- [ ] Animations function

**Contact Form:**
- [ ] Form submits successfully
- [ ] Email sent to company
- [ ] Confirmation email sent to user
- [ ] Success message displays

**Intake Form (Lead Form):**
- [ ] Multi-step form works
- [ ] All validation functions
- [ ] Submission successful
- [ ] Emails sent

**Product Pages:**
- [ ] All product pages load
- [ ] Waitlist forms work
- [ ] Images display

**API Endpoints:**
- [ ] `/api/contact` responds
- [ ] `/api/intake` responds
- [ ] `/api/waitlist` responds

### 4. Performance

**Run Lighthouse audit:**
- Performance score > 90
- Accessibility score > 90
- Best Practices score > 90
- SEO score > 90

**Check:**
- [ ] Fast page load times
- [ ] Images optimized
- [ ] No console errors
- [ ] Mobile responsive

---

## Monitoring & Analytics

### Vercel Analytics

**Enabled via:** `@vercel/analytics` package

**Metrics tracked:**
- Page views
- Unique visitors
- Performance metrics
- Web Vitals

**Access:** Vercel Dashboard → Analytics

### Error Tracking

**Server errors:**
- Check Vercel function logs
- Monitor API endpoint errors
- Email sending failures

**Client errors:**
- Browser console
- Vercel Runtime Logs

---

## Rollback Procedure

### Via Vercel Dashboard

1. Go to **Deployments**
2. Find previous successful deployment
3. Click **⋯** menu
4. Select **Promote to Production**

### Via Vercel CLI

```bash
vercel rollback
```

---

## Troubleshooting

### Build Failures

**Check build logs:**
1. Go to Vercel Dashboard
2. Click failed deployment
3. View build logs
4. Fix errors and redeploy

**Common issues:**
- TypeScript errors
- Missing dependencies
- Environment variables not set

### Email Not Working

**Verify:**
- [ ] SMTP credentials correct in Vercel
- [ ] Environment variables set for production
- [ ] Spaceship email account active
- [ ] SMTP port accessible (587)

**Test locally first:**
```bash
node test-email.js
```

### Domain Not Loading

**Check:**
- [ ] DNS propagation (can take 24-48 hours)
- [ ] DNS records correct
- [ ] Domain added in Vercel
- [ ] SSL certificate issued

**DNS propagation check:**
```bash
nslookup truespur.ai
```

### Performance Issues

**Optimize:**
- Enable image optimization
- Check bundle size
- Review API response times
- Enable caching headers

---

## Security Considerations

### Environment Variables

- ✓ Never commit `.env.local` to Git
- ✓ Use Vercel's encrypted environment variables
- ✓ Rotate SMTP credentials periodically
- ✓ Use different credentials for preview/production

### API Security

**Recommended additions:**
- Rate limiting for API endpoints
- CAPTCHA for forms
- Input sanitization
- Request validation

### HTTPS

- ✓ Enforced by Vercel
- ✓ Auto-renewal of certificates
- ✓ HSTS headers recommended

---

## Alternative Deployment Options

### Netlify

**Configuration:**
```toml
# netlify.toml
[build]
  command = "pnpm build"
  publish = ".next"

[build.environment]
  NODE_VERSION = "18"
```

**Deploy:**
```bash
netlify deploy --prod
```

### Railway

**Configuration:**
```json
{
  "build": {
    "builder": "NIXPACKS"
  },
  "deploy": {
    "startCommand": "pnpm start",
    "restartPolicyType": "ON_FAILURE"
  }
}
```

### Self-Hosted (Docker)

**Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

**Build and run:**
```bash
docker build -t truespur-website .
docker run -p 3000:3000 --env-file .env.local truespur-website
```

---

## Continuous Integration

### GitHub Actions (Example)

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install -g pnpm
      - run: pnpm install
      - run: pnpm build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## Maintenance

### Regular Updates

**Monthly:**
- [ ] Update dependencies
- [ ] Check for security vulnerabilities
- [ ] Review error logs
- [ ] Test all forms

**Quarterly:**
- [ ] Performance audit
- [ ] SEO review
- [ ] Content updates
- [ ] Backup verification

### Dependency Updates

```bash
# Check for updates
pnpm outdated

# Update dependencies
pnpm update

# Test after updates
pnpm build
pnpm start
```

---

## Support & Resources

### Vercel Support

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

### Next.js Resources

- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Next.js Discord](https://discord.gg/nextjs)

### Project Documentation

- `README.md` - Project overview
- `docs/development-guide.md` - Development setup
- `docs/api-contracts.md` - API documentation
