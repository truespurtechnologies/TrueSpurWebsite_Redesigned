# Calendly Integration Spec

**Status:** Live
**Last updated:** Aug 16, 2026

---

## Problem this solves

Previously every "Schedule a Call" CTA did:

```js
window.open(SITE_CONFIG.calendlyUrl, '_blank', 'noopener,noreferrer')
```

This handed the visitor to a Calendly tab and abandoned them there. TrueSpur had no
way to confirm the booking in its own UI, and the visitor had no path back to the site.

The scheduler is now embedded **inside** the site, and booking completion is detected
and confirmed on-site.

---

## Components

### `components/calendly/CalendlyEmbed.tsx`

Loads the Calendly inline widget and reports completion.

- **Assets:** injects `assets.calendly.com/assets/external/widget.js` and `widget.css` once per session, reusing them if already present.
- **Init:** calls `window.Calendly.initInlineWidget({ url, parentElement, prefill })`.
- **Completion signal:** listens for the `window` `message` event and fires `onEventScheduled` when `event.data.event === "calendly.event_scheduled"`.
- **Origin validation:** the message is ignored unless its origin hostname is `calendly.com` or a `*.calendly.com` subdomain. This prevents any other embedded frame from spoofing a completed booking.
- **Loading state:** spinner and "Loading available times…" until the widget initialises.
- **Failure state:** if the script cannot load (offline, ad blocker, tracker blocking), it renders a fallback link that opens Calendly in a new tab. The booking path never becomes a dead end.
- **Cleanup:** clears the container and removes the listener on unmount.

### `components/calendly/MeetingScheduledPanel.tsx`

Shared confirmation UI. Green `CalendarCheck` badge, "Meeting scheduled" heading,
personalised line when a name is known, and notes about the calendar invite and
rescheduling. Marked `role="status"` with `aria-live="polite"` so screen readers
announce the outcome.

### `components/calendly/CalendlyDialog.tsx`

Standalone dialog used by the page-level "Schedule a Call" CTAs. Shows the embed,
then swaps to `MeetingScheduledPanel` with a **"Back to TrueSpur"** button. Resets
to the scheduler shortly after close so the next open starts fresh.

---

## Flows

### Direct "Schedule a Call" CTAs

Homepage final CTA, About final CTA, and both Services CTAs open `CalendlyDialog`.
No prefill, since no details have been collected.

### Lead form → schedule

`components/lead-form-dialog.tsx` gained two steps: `schedule` and `scheduled`.

After submitting the intake form, "Schedule a Call" no longer opens a tab — it
advances to the `schedule` step, which renders the embed **prefilled** with data
already collected:

- `name` and `email` map to Calendly's standard fields
- `customAnswers.a1` carries a summary: company, role, modules of interest, phone, requirements

On `calendly.event_scheduled`, the dialog advances to `scheduled`.

The dialog widens to `max-w-3xl` on the `schedule` step to fit the scheduler, then
returns to `max-w-lg` for the confirmation.

---

## Content Security Policy

**This was a blocker.** The previous CSP in `next.config.mjs` had no `frame-src`
directive, so iframes fell back to `default-src 'self'` and every Calendly embed
would have been silently blocked in production.

Added to both the development and production policies:

| Directive | Added value | Reason |
|---|---|---|
| `script-src` | `https://assets.calendly.com` | Loads `widget.js` |
| `style-src` | `https://assets.calendly.com` | Loads `widget.css` |
| `connect-src` | `https://calendly.com` | Widget API calls |
| `frame-src` | `https://calendly.com` | **Renders the scheduler iframe** |

`frame-ancestors 'none'` and `X-Frame-Options: DENY` are unchanged — those govern who
may embed *TrueSpur*, not what TrueSpur may embed.

---

## Configuration

The scheduling link lives in `lib/constants.ts`:

```ts
export const SITE_CONFIG = {
  calendlyUrl: "https://calendly.com/truespur/discoverycall",
} as const;
```

Changing the event type only requires updating this value.

---

## Notes and limitations

- **No Calendly paid plan required.** This uses the standard embed and its
  `postMessage` events, not the Pro-only redirect-after-booking setting.
- **Custom question mapping.** `customAnswers.a1` assumes the Calendly event type has
  at least one custom question. If questions are reordered or removed in Calendly,
  the prefilled summary will land on the wrong field or be dropped. Re-check after
  editing the event type.
- **Ad blockers.** Some blockers stop `assets.calendly.com`. The fallback link covers
  this case, but such visitors will still leave the site to book.
- **No server-side record.** Booking confirmation is client-side only. If bookings need
  to be recorded in TrueSpur's own systems, that requires a Calendly webhook against a
  server route — not currently implemented.

---

## Testing checklist

1. Open any "Schedule a Call" CTA — scheduler renders inline, no new tab.
2. Complete a booking — dialog switches to "Meeting scheduled" without leaving the site.
3. Click "Back to TrueSpur" — dialog closes; reopening starts at the scheduler.
4. Submit the lead form, then "Schedule a Call" — name and email are prefilled.
5. Check the browser console for CSP violations mentioning `calendly.com`. There should be none.
6. Block `assets.calendly.com` in devtools — the fallback link appears instead of a blank area.

---

## Version history

**v1 (Aug 16, 2026)**
- Replaced all four `window.open` Calendly handoffs with an inline embed
- Added `CalendlyEmbed`, `CalendlyDialog`, `MeetingScheduledPanel`
- Added `schedule` and `scheduled` steps to the lead form with prefill
- Extended CSP with Calendly script, style, connect, and frame sources
