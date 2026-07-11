# Recognition Asset Register

## Government Recognition — 2023 Design Hackathon

### Event Details

| Field | Value |
|---|---|
| Award | Certificate of Recognition — First Place |
| Awardee | Mohideen Aswar N |
| Hackathon title | "Design of Mobile Outreach and Therapy Unit" |
| Organizers | Directorate for Welfare of the Differently Abled + StartupTN |
| Period | August–October 2023 |
| Signatories | Tmt. M. Lakshmi, IAS (Director, Directorate for Welfare of the Differently Abled); Thiru. Sivarajah Ramanathan (Mission Director & CEO, StartupTN) |

---

### Assets

| Filename (in `public/images/recognition/`) | Status | Dimensions | Notes |
|---|---|---|---|
| `Govt Official Giving award.png` | **APPROVED WEBSITE ASSET / IN USE** | 442×367px (landscape) | Primary visual on About Page, "Government-recognized" subsection. Rendered at 300px wide. Original filename used directly — no production-named copy needed. |
| `Certificate.png` | **AUTHENTICATED SUPPORTING ASSET / IN USE (modal)** | — | Exposed via accessible modal behind "View certificate" interaction on About Page. Not loaded on initial page load. Original filename used directly. |
| `Award from TN Govt.png` | **SUPPORTING ASSET / NOT CURRENTLY DISPLAYED** | — | Thiruvalluvar statue trophy, transparent background. Retained in asset library. Not displayed on website. |
| `ceremony-placeholder.jpg` | **DEPRECATED PLACEHOLDER** | — | Legacy placeholder, can be removed in future cleanup sprint. |
| `certificate-placeholder.jpeg` | **DEPRECATED PLACEHOLDER** | — | Legacy placeholder, can be removed in future cleanup sprint. |

---

### Implementation Notes

**Initial integration:** July 2026 within existing "Deep Healthcare Experience" → "Government-recognized" subsection of `app/about/page.tsx`.

**Visual refinement pass:** July 2026 — corrected aspect ratio from incorrect 3:4 portrait to actual 442×367px landscape (442/367). Widened desktop photo from `w-56` (224px) to `w-[300px]`. Photo moved to left column for natural left-to-right reading flow (photo → text → "View certificate"). Mobile: `max-w-[300px]` centered. Production-named duplicate files removed — originals used directly.

**Copy discrepancy corrected:** Previous copy and all active governance docs claimed "Government of India contract / beating multinational corporations" — not supported by the Certificate of Recognition. Corrected to verified certificate facts across `app/about/page.tsx`, `app/page.tsx`, and 5 active governance docs.

No new page sections were added. No existing frozen architecture was changed. Archive docs were not modified.
