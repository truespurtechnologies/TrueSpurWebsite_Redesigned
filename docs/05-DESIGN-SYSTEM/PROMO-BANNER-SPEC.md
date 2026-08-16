# Promo Banner Specification

**Date:** August 16, 2026  
**Campaign:** Indian Independence Day — Free Product Discovery Call  
**Active window:** August 1, 2026 → August 31, 2026  
**Status:** Implemented

---

## Purpose

A time-bound, site-wide announcement banner that surfaces a seasonal offer without disrupting the premium visual identity. The banner is contextual, dismissible, and routes users into the existing lead-form flow with explicit source tracking.

---

## Components

### `components/promo/AnnouncementBanner.tsx`

Reusable presentational banner.

- **Role:** `banner`, labelled as "Promotional announcement"
- **Background:** `bg-linear-to-r from-emerald-700 via-teal-600 to-cyan-600`
- **Rationale for palette:** the original `slate-900` banner blended into the dark navy hero and was easy to overlook. Emerald/teal is complementary to the orange brand, so the banner reads as a distinct promotional layer against both the white header and the dark hero.
- **Badge:** `bg-amber-300` pill with `text-emerald-900`, uppercase, tracking-wider. Contains a small circular saffron/white/green tricolor mark as a contained nod to the occasion.
- **Title:** `font-heading font-bold text-white`
- **Subtitle:** `text-emerald-50/90`
- **Icon:** `PartyPopper` in `text-amber-200` inside a `bg-white/15` circle with `ring-white/25`
- **CTA:** white pill with `text-emerald-800`, hovering to `bg-amber-300`. Deliberately **not** the orange `PrimaryButton`, so it does not compete with the Header's orange "Start a Conversation" CTA.
- **Accent:** saffron hairline at the bottom edge (`amber-400 → white/70 → amber-400`)
- **Motion:** a slow white/15 highlight sweep loops across the banner to attract attention. Disabled under `prefers-reduced-motion: reduce`.
- **Dismiss:** `X` close button with focus-visible ring and hover state
- **Layout:** stacked on mobile, horizontal from `sm` upward

### `components/promo/FloatingPromoPill.tsx`

Scroll-triggered recall card that re-surfaces the offer after the top banner has scrolled away.

- **Trigger:** appears once the user passes `revealAtScrollFraction` (default `0.5`) of the scrollable page height. Pages too short to scroll reveal it immediately.
- **Position:** `fixed bottom-6 right-6` at `sm` and above; full-width inset card at `bottom-4` on mobile.
- **Palette:** same emerald/teal gradient as the banner, so the two read as one campaign.
- **Motion:** fades and lifts in via `AnimatePresence`; falls back to a plain fade under `prefers-reduced-motion`.
- **Copy:** intentionally different from the banner — the banner announces, the pill re-asks ("Still exploring? Let's talk.").
- **Dismiss:** independent `X`, persisted separately from the banner.
- **Semantics:** `role="complementary"` with an `aria-label`, so it is not announced as a second `banner` landmark.

### `hooks/use-prefers-reduced-motion.ts`

Shared hook used by both promo components so the reduced-motion check is defined once.

### `components/promo/SiteWidePromo.tsx`

Client wrapper that controls visibility, date gating, and lead-form integration.

- **Date gating:** compares current date against `startDate` and `endDate`
- **Dismiss persistence:** two independent `localStorage` keys, so closing the top banner does not also remove the recall pill
- **Hydration-safe:** renders `null` until storage/date checks complete
- **Single dialog:** both the banner and the pill open the same `LeadFormDialog` instance
- **Lead form source:** `"independence-day-offer"` (tracked in `LeadFormDialog`)

---

## Copy

**Top banner**
- **Badge:** "Independence Day"
- **Title:** "Free Product Discovery Call"
- **Subtitle:** "Offer ends 31 Aug — map your MVP with us in 30 minutes."
- **CTA:** "Claim Free Call"

**Floating pill**
- **Title:** "Still exploring? Let's talk."
- **Subtitle:** "Book a free 30-minute product discovery call. Offer ends 31 Aug."
- **CTA:** "Claim Free Call"

---

## Placement

Rendered at the top of `<body>` in `app/layout.tsx`, above the `Header`. Because this is the **root** layout, the banner appears on every route — Home, Products, Services, About, Contact, and all nested product detail pages. Nested layouts such as `app/products/layout.tsx` and `app/about/layout.tsx` do not replace the root layout, so no per-page wiring is needed.

The banner is **not** sticky; it scrolls away while the `Header` remains sticky below it. This avoids two stacked sticky bars competing for vertical space.

Visibility across a long scroll is handled by the **floating recall pill** rather than by pinning the banner. The campaign therefore has two touchpoints:

| Stage | Element | Timing |
|---|---|---|
| Awareness | Top banner | On page load |
| Recall | Floating pill | After 50% scroll depth |

A sticky banner was considered and rejected: it permanently consumes vertical space (costly on mobile) and invites banner blindness.

---

## Lead-form tracking

The `LeadFormSource` union in `components/lead-form-dialog.tsx` was extended with `"independence-day-offer"` so submissions from the campaign are attributable. Both the banner and the pill submit under this same source.

---

## National flag usage — decision

A full Indian tricolor background was considered and **rejected**:

1. **Legal exposure.** The Flag Code of India and the *Emblems and Names (Prevention of Improper Use) Act, 1950* restrict use of the national flag for commercial and promotional purposes. Using it as the background of a paid-service promotion is a real risk. Confirm with counsel before any future flag-based creative.
2. **Contrast.** The tricolor's centre band is white, which would force mixed dark and light text within a single banner — unreadable and visually incoherent.
3. **Brand collision.** Saffron is close to the TrueSpur orange, which would recreate the original problem of the banner blending into brand chrome.

**Approved treatment:** an emerald base with amber accents, plus a small contained tricolor mark inside the badge and a saffron hairline. This signals the occasion without appropriating the flag.

---

## Design principles applied

- **Restraint over decoration:** the festive nod is limited to the amber badge, a small tricolor mark, and a 2px saffron hairline; no flag backgrounds or full-page thematic overrides.
- **Typography-driven hierarchy:** badge → title → subtitle descend in weight and size, so the banner is scannable in one glance without competing with page headings.
- **Distinct from the brand accent:** the banner intentionally sits outside the orange palette. Orange is reserved for the Header and page CTAs, so the promo does not create two identical-looking primary buttons in the same viewport.
- **Accessibility:** proper `role="banner"`, focusable close button, white-on-emerald text well above AA contrast, and motion disabled under `prefers-reduced-motion`.

---

## Troubleshooting

**"The banner only shows on one page."** Dismissal is persisted in `localStorage`, and the keys are shared across all routes. Once dismissed, the element stays hidden site-wide. To reset both during testing:

```js
localStorage.removeItem('truespur-promo-aug-2026-banner-dismissed')
localStorage.removeItem('truespur-promo-aug-2026-pill-dismissed')
```

**"The pill never appears."** It requires 50% scroll depth. On very short pages there is nothing to scroll, in which case it reveals immediately.

---

## Future campaigns

To reuse for another offer:

1. Update the `PROMO` config object in `components/promo/SiteWidePromo.tsx`.
2. Change both `bannerStorageKey` and `pillStorageKey` so previously dismissed users see the new campaign.
3. Add the new `source` value to `LeadFormSource` in `components/lead-form-dialog.tsx` if lead tracking is required.
4. Update this doc.

---

## Version history

**v3 (Aug 16, 2026)**
- Added `FloatingPromoPill` — scroll-triggered recall card at 50% depth
- Rejected full tricolor background; added a contained tricolor mark inside the badge instead
- Split dismissal into separate banner and pill `localStorage` keys
- Extracted `usePrefersReducedMotion` into `hooks/use-prefers-reduced-motion.ts`
- Confirmed sticky banner rejected in favour of the recall pill

**v2 (Aug 16, 2026)**
- Replaced `slate-900` background with emerald/teal gradient for visibility
- Added amber campaign badge and `PartyPopper` icon
- Replaced orange `PrimaryButton` with a white pill CTA to avoid competing with the Header CTA
- Added reduced-motion-safe highlight sweep
- Bumped the dismissal storage key so previously dismissed users saw the new design
- Removed the `light`/`dark` variant props (single campaign treatment)

**v1 (Aug 16, 2026)**
- Initial dark banner with tricolor accent line
