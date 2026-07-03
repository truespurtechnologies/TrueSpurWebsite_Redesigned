# CONTACT PAGE DESIGN SPECIFICATION

**Document Type:** Implementation-Ready Design Specification  
**Version:** 1.0 — Final  
**Date:** July 3, 2026  
**Status:** ✅ READY FOR IMPLEMENTATION  
**Authority:** Aligned with CONTACT-PAGE-COPY-FINAL.md, CONTACT-PAGE-STRATEGY-BLUEPRINT.md v1.1, CURRENT-SOURCE-OF-TRUTH.md, design-system.md v2.2, brand-identity-guidelines.md v3.0

---

## DOCUMENT PURPOSE

This specification provides complete design guidance for implementing the TrueSpur Contact Page. All copy is frozen and approved in CONTACT-PAGE-COPY-FINAL.md. This document focuses on layout, visual hierarchy, components, interaction design, and emotional experience optimization.

**This is NOT the Contact Page a software agency would create.**  
**This is NOT the Contact Page a SaaS company would create.**  
**This IS the Contact Page that only TrueSpur could create.**

**Key Sources:**
- `docs/03-APPROVED COPY/CONTACT-PAGE-COPY-FINAL.md` — All copy is final (725 words, anxiety-reducing, trust-building)
- `_bmad-output/CONTACT-PAGE-STRATEGY-BLUEPRINT.md` v1.1 — Strategic foundation, visitor psychology, trust strategy
- `docs/05-DESIGN-SYSTEM/design-system.md` v2.2 — Typography, colors, spacing, animation tokens
- `docs/05-DESIGN-SYSTEM/brand-identity-guidelines.md` v3.0 — Brand standards and color system
- `docs/07-APPROVED PAGE SPECIFICATIONS/SERVICES-PAGE-DESIGN-SPECIFICATION.md` — Component patterns
- `components/cta/PrimaryButton.tsx` — Frozen reusable CTA component
- `components/layout/Header.tsx`, `Footer.tsx`, `PageContainer.tsx` — Frozen shared layout components

---

## DESIGN PHILOSOPHY

### Core Principle

**"Design for trust before conversion. Every visual decision should reduce uncertainty."**

### Contact Page Principles

1. **Personal over corporate** — Warm, human, conversational
2. **Reassuring over persuasive** — Reduce anxiety, not increase urgency
3. **Transparent over mysterious** — Show exactly what happens next
4. **Conversation over transaction** — Partnership invitation, not lead capture
5. **Calm over aggressive** — Low-pressure environment
6. **Editorial over marketing** — Thoughtful presentation
7. **Minimal over complex** — Focus attention, respect intelligence
8. **Warm over cold** — More orange/amber warmth than typical pages

### What This Page Avoids

- ❌ Generic "Contact Us" / "Get in Touch" language
- ❌ Long interrogation forms (8-12 fields)
- ❌ Fake urgency ("Limited spots available")
- ❌ Aggressive CTAs ("Book your free consultation")
- ❌ Corporate language ("Submit your inquiry")
- ❌ Sales pressure or manipulation
- ❌ Mystery about next steps

---

## PAGE ARCHITECTURE

### 7 Sections

1. **Hero** — Welcome, set tone, reduce sales pressure
2. **Why Founders Reach Out** — Empathy, inclusion, remove barriers
3. **What Happens Next** — Process transparency, 4-step journey
4. **You Don't Need Everything Figured Out** — Permission framework
5. **How We Help Founders** — Capability reconnection (editorial)
6. **Ready to Start the Conversation?** — Form introduction and form
7. **We're Looking Forward to Talking** — Final confidence boost

### Emotional Journey

```
Hero → Welcomed, not sold to
  ↓
Why Reach Out → Understood, not judged
  ↓
What Happens Next → Clarity, not confusion
  ↓
Permission Framework → Prepared, not anxious
  ↓
How We Help → Capable, not oversold
  ↓
Form → Comfortable, not interrogated
  ↓
Closing → Confident, not uncertain
```

---

## GLOBAL DESIGN SYSTEM

### Color Strategy

**Primary Background:** White  
**Accent Background:** gray-50  
**Text Primary:** gray-900 (headings)  
**Text Body:** gray-600  
**Text Secondary:** gray-500  
**Brand Accent:** orange-500 (CTAs, icons)  
**Warmth Accent:** amber-400 (subtle)

### Typography

**Headings (Poppins):**
- Hero H1: `text-5xl lg:text-6xl xl:text-7xl`, font-black (900)
- Section H2: `text-4xl lg:text-5xl`, font-extrabold (800)
- Subheadlines: `text-lg lg:text-xl`, font-semibold (600)

**Body (Inter):**
- Large: `text-lg lg:text-xl`, leading-relaxed
- Standard: `text-base`, leading-relaxed
- Small: `text-sm lg:text-base`

### Spacing

**Section Padding:** `py-16 md:py-24 lg:py-32` (standard)  
**Hero Padding:** `py-20 md:py-28 lg:py-36` (generous)  
**Form Padding:** `py-20 md:py-28 lg:py-32` (focus space)

**Content Max Width:**
- Standard: `max-w-4xl`
- Form: `max-w-2xl`
- Process: `max-w-5xl`

### Animation

**Scroll Reveals:** Fade in + slide up, 400ms, stagger 100ms  
**Hover:** Scale/shadow enhancement, 300ms  
**Form Focus:** Border color + shadow, 200ms

---

## SECTION 1: HERO

### Purpose
Welcome visitors. Set tone. Reduce sales pressure. Create emotional bridge: Idea → Conversation → Product.

### Layout
- Padding: `py-20 md:py-28 lg:py-36`
- Background: white
- Container: `max-w-5xl mx-auto px-4`
- Centered, single column

### Hierarchy

**Headline (H1):**
```
"Let's Talk About What You're Building."
Poppins Black (900), text-5xl lg:text-6xl xl:text-7xl
gray-900, center-aligned
```

**Supporting Copy:**
```
"Whether you're validating an idea or ready to build..."
Inter Regular, text-lg lg:text-xl
gray-600, max-w-3xl mx-auto, mt-6
```

**CTA:**
```
"Start a Conversation"
PrimaryButton, size lg
Smooth scroll to form, mt-10
```

### Emotional Bridge

**Three Visual Beats:**
1. Invitation (Headline) — Largest, warmest
2. Reassurance (Supporting) — Calm, readable
3. Action (CTA) — Clear, not pushy

**Spacing Creates Bridge:**
```
Headline
  ↓ (24px — emotional pause)
Supporting
  ↓ (40px — confidence building)
CTA
```

---

## SECTION 2: WHY FOUNDERS REACH OUT

### Purpose
Empathy and inclusion. Remove barriers.

### Layout
- Padding: `py-16 md:py-24 lg:py-32`
- Background: gray-50
- Container: `max-w-4xl mx-auto px-4`
- Left-aligned (editorial)

### Content
- H2: "Why Founders Reach Out"
- 3 paragraphs, Inter Regular
- Acknowledges multiple founder profiles
- Inclusive language throughout

---

## SECTION 3: WHAT HAPPENS NEXT

### Purpose
Process transparency. Reduce primary anxiety.

### Layout
- Padding: `py-16 md:py-24 lg:py-32`
- Background: white
- Container: `max-w-5xl mx-auto px-4`

### 4-Step Process Cards

**Card Design:**
```
Background: white
Border: 1px solid gray-200
Border Radius: rounded-2xl
Padding: p-8 lg:p-10
Shadow: shadow-sm → shadow-md (hover)
Grid: 2 columns on desktop, 1 on mobile
```

**Number Badge:**
```
Background: orange-100
Color: orange-600
Font: Poppins Bold, text-2xl
Size: w-14 h-14, rounded-xl
```

**Step Title:** Poppins Semibold, text-xl lg:text-2xl  
**Step Description:** Inter Regular, text-base, gray-600

**4 Steps:**
1. You fill out the form
2. We respond within 24 hours (Aswar or senior team member)
3. We have a 30-45 minute conversation (no sales pitch)
4. We determine fit together

---

## SECTION 4: PERMISSION FRAMEWORK

### Purpose
Remove psychological barriers.

### Layout
- Padding: `py-16 md:py-24 lg:py-32`
- Background: gray-50
- Container: `max-w-4xl mx-auto px-4`

### Content
- H2: "You Don't Need Everything Figured Out"
- Intro: 2 paragraphs
- 4 scenarios: "If you're..." format
- Closing reassurance

**Scenario Pattern:**
```
Title: Poppins Semibold, text-lg lg:text-xl
Description: Inter Regular, text-base, mt-2
Spacing: mt-8 between scenarios
```

---

## SECTION 5: HOW WE HELP FOUNDERS

### Purpose
Capability reconnection. Editorial presentation (NOT service catalog).

### Design Challenge
> "Should NOT visually resemble a catalogue of services. Design as continuation of conversation. Avoid: service grid, marketing cards. Create editorial presentation focused on founder needs."

### Layout
- Padding: `py-16 md:py-24 lg:py-32`
- Background: white
- Container: `max-w-4xl mx-auto px-4`
- **Editorial list, NOT cards**

### Content
- H2: "How We Help Founders"
- Intro paragraph
- 5 capabilities (editorial format)
- Closing statement

**Capability Pattern (NOT Cards):**
```
Title: Poppins Semibold, text-lg lg:text-xl
Description: Inter Regular, text-base, mt-2
Spacing: mt-8 between capabilities
NO background, NO border, NO padding
Editorial, conversational presentation
```

**5 Capabilities:**
1. Product Discovery & Validation
2. Product Design & User Experience
3. Product Development
4. Healthcare Expertise
5. AI Integration

---

## SECTION 6: CONTACT FORM

### Purpose
Enable conversation with minimum friction.

### Form Philosophy
> "The form is NOT the primary experience. The conversation is."

### Layout
- Padding: `py-20 md:py-28 lg:py-32`
- Background: gray-50
- Container: `max-w-2xl mx-auto px-4`

### Form Fields

**Required (3):**
1. **Name** — text input
2. **Email** — email input
3. **What are you building?** — textarea (5 rows)

**Optional (4):**
4. **Company/Project Name** — text input
5. **Where are you in your journey?** — dropdown (4 options)
6. **Timeline** — dropdown (4 options)
7. **How did you hear about us?** — dropdown (4 options)

### Field Design

**Input Styling:**
```
Background: white
Border: 2px solid gray-300
Border Radius: rounded-lg
Padding: px-4 py-3
Font: Inter Regular, text-base

Focus:
Border: 2px solid orange-500
Shadow: shadow-lg shadow-orange-500/20
Transition: 200ms ease-out
```

**Label Styling:**
```
Font: Inter Medium, text-sm
Color: gray-700
Format: "Label" or "Label (Optional)"
```

**Submit Button:**
```
"Start a Conversation"
PrimaryButton, size lg
Full width on mobile
```

### Validation

- Client-side: Immediate feedback
- Server-side: Security
- Inline errors: Field-specific
- Success state: Confirmation message

---

## SECTION 7: CLOSING REASSURANCE

### Purpose
Final confidence boost. Partnership framing.

### Layout
- Padding: `py-16 md:py-24 lg:py-32`
- Background: white
- Container: `max-w-4xl mx-auto px-4`
- Center-aligned

### Content
- H2: "We're Looking Forward to Talking"
- 4 paragraphs, centered
- Partnership language
- No CTA (conversation started via form)

---

## IMPLEMENTATION GUIDANCE

### Component Reuse
- Header, Footer, PageContainer (existing)
- PrimaryButton (existing)
- New: ProcessStepCard, ContactForm, ScenarioBlock, CapabilityBlock

### Development Phases
1. Structure & Layout
2. Components
3. Interactions
4. Form Integration
5. Testing & Optimization

### Technical Stack
- React/Next.js
- TypeScript
- Tailwind CSS
- Framer Motion (optional, scroll reveals)

### Quality Checklist
- [ ] Copy matches CONTACT-PAGE-COPY-FINAL.md exactly
- [ ] Typography consistent with design-system.md
- [ ] All interactive elements have hover/focus states
- [ ] Form validation works
- [ ] Mobile responsive
- [ ] WCAG 2.1 AA compliant
- [ ] Cross-browser tested
- [ ] Performance optimized (Lighthouse >90)

---

## SUCCESS CRITERIA

### Visitor Outcomes

✅ "I know who I'll be talking to."  
✅ "I know what happens next."  
✅ "I don't need everything figured out."  
✅ "I won't receive a sales pitch."  
✅ "I'll leave with more clarity."  
✅ "These people genuinely enjoy helping founders think."  
✅ "I feel comfortable reaching out."

### Design Quality

✅ Reduces anxiety through transparency  
✅ Builds confidence through honesty  
✅ Maintains premium brand aesthetic  
✅ Feels personal, not corporate  
✅ Conversation-focused, not transactional  
✅ Consistent with other pages  
✅ Accessible and performant

---

**This is the Contact Page that only TrueSpur could have written and designed.**

It doesn't ask visitors to contact us.

**It invites them into the first founder conversation.**

---

**END OF CONTACT PAGE DESIGN SPECIFICATION**
