// All copy and structured data for the Clinax v2 page lives here so it can be
// edited without touching component markup.

export const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Compare", href: "#compare" },
  { label: "FAQ", href: "#faq" },
]

export const HERO = {
  eyebrow: "The Clinical Operating System",
  headline: "Run your clinic without WhatsApp chaos, spreadsheets and paper files.",
  sub: "Clinax connects reception, therapists and leadership on one platform — so patient records, appointments, clinical notes and branch performance finally live in one place.",
  primaryCta: "Request a Demo",
  secondaryCta: "See the platform",
  trust: ["Built for physiotherapy & rehab clinics", "Single branch to multi-branch", "Role-based for reception, therapists & leadership", "Now onboarding early clinics"],
}

export const CAPABILITIES = [
  "Patient Management",
  "Appointments & Scheduling",
  "Reception Operations",
  "Clinical Documentation",
  "Treatment & Sessions",
  "Patient Progress",
  "Teams & Access",
  "Branch Operations",
  "Dashboards & Reporting",
  "Follow-up Tracking",
  "Therapist Utilisation",
  "Multi-Specialty Ready",
]

// Illustrative scenario for a growing two-branch clinic. Not research claims;
// replace with real discovery numbers when available.
export const PAIN_POINTS = [
  { value: "12+", unit: "WhatsApp groups", text: "One per branch, per team, per therapist — and the patient update is always in the other one." },
  { value: "9", unit: "spreadsheets", text: "Appointments, follow-ups, therapist rosters and collections tracked by hand, out of sync by lunchtime." },
  { value: "6–8", unit: "hours / week", text: "Spent by the front desk chasing files, confirming slots and re-typing the same patient details." },
  { value: "4", unit: "places a history lives", text: "Paper file, a therapist's phone, an Excel row and someone's memory. None of them complete." },
]

export const BEFORE_ITEMS = [
  "Different tools manage different tasks.",
  "People are responsible for connecting information.",
  "Updates are shared manually, if at all.",
  "Therapists treat without the full patient context.",
  "Leadership finds out about problems after the fact.",
]

export const AFTER_ITEMS = [
  "One patient record from enquiry to every follow-up.",
  "Reception, therapists and leaders share the same context.",
  "Schedules, notes and progress update in real time.",
  "Structured documentation across every therapist and session.",
  "Branch dashboards show what is happening — today.",
]

export const HUB_SPOKES = [
  { label: "Patient Operations", detail: "Registration & scheduling" },
  { label: "Clinical Care", detail: "Assessment to progress" },
  { label: "Clinic Operations", detail: "Teams & branches" },
  { label: "Visibility & Insights", detail: "Dashboards & follow-ups" },
]

// Trust/security strip shown after the platform section. Keep claims generic —
// no certifications until they exist.
export const TRUST_ITEMS = [
  { title: "Encrypted records", text: "Patient data is encrypted in transit and at rest." },
  { title: "Role-based access", text: "Staff see only what their work requires — nothing more." },
  { title: "Backed up daily", text: "Automatic backups keep your clinic's data recoverable." },
  { title: "Your data stays yours", text: "Full export anytime. No lock-in." },
]

export interface FeatureTab {
  key: string
  label: string
  headline: string
  description: string
  bullets: string[]
  screen: { src: string; width: number; height: number; alt: string }
  subSteps?: { key: string; label: string; src: string; width: number; height: number; alt: string }[]
}

export const FEATURE_TABS: FeatureTab[] = [
  {
    key: "front-desk",
    label: "Front Desk",
    headline: "Start every day with the whole clinic in view.",
    description: "Reception sees arrivals, waiting patients, online sessions and follow-ups from one workspace — no register, no group chat.",
    bullets: ["Today's queue and arrivals at a glance", "Check-in and registration in one flow", "Follow-ups that never fall off the list", "Branch switch without losing context"],
    screen: { src: "/images/clinax/front-desk.png", width: 1506, height: 680, alt: "Clinax front desk workspace showing today's appointments and waiting queue" },
  },
  {
    key: "scheduling",
    label: "Scheduling",
    headline: "Know where the capacity is — before you book.",
    description: "Therapist availability, appointment density and branch capacity in one connected schedule.",
    bullets: ["Provider-level availability", "Appointment density by hour and day", "Cross-branch view for multi-location clinics", "Reschedule without a phone tree"],
    screen: { src: "/images/clinax/schedule.png", width: 1487, height: 665, alt: "Clinax therapist schedule showing provider availability and appointment capacity" },
  },
  {
    key: "therapist",
    label: "Therapist",
    headline: "Give therapists the context they need, when they need it.",
    description: "Previous progress, today's priorities and clinical history in the therapist's working day — at the point of care.",
    bullets: ["Today's patients with history attached", "Progress since the last session", "Priorities and pending documentation", "Works on the treatment floor, not just at a desk"],
    screen: { src: "/images/clinax/therapist-dashboard.png", width: 1217, height: 672, alt: "Clinax therapist dashboard showing today's patients and clinical context" },
  },
  {
    key: "clinical",
    label: "Clinical Workflow",
    headline: "Assess. Treat. Plan. Complete — in one guided session.",
    description: "A structured clinical workflow that keeps documentation consistent across every therapist and every session.",
    bullets: ["Subjective and objective assessment notes", "Today's treatment log", "Goals, progress and home exercise plan", "Visit summary and next appointment"],
    screen: { src: "/images/clinax/visit-assess.png", width: 1235, height: 650, alt: "Clinax therapy session workflow showing the assessment step" },
    subSteps: [
      { key: "assess", label: "Assess", src: "/images/clinax/visit-assess.png", width: 1235, height: 650, alt: "Clinax therapy session — assessment step with subjective and objective notes" },
      { key: "treat", label: "Treat", src: "/images/clinax/visit-treat.png", width: 1227, height: 672, alt: "Clinax therapy session — treatment step with today's treatment log" },
      { key: "plan", label: "Plan", src: "/images/clinax/visit-plan.png", width: 1227, height: 672, alt: "Clinax therapy session — care-plan step with goals and home exercise plan" },
      { key: "complete", label: "Complete", src: "/images/clinax/visit-complete.png", width: 1232, height: 652, alt: "Clinax therapy session — completion step with summary and next appointment" },
    ],
  },
  {
    key: "management",
    label: "Management",
    headline: "See what is happening across your clinic.",
    description: "Appointments, activity, revenue, therapist utilisation and follow-ups for owners and managers — per branch and overall.",
    bullets: ["Branch-level operational dashboards", "Therapist utilisation and capacity", "Follow-up and drop-off visibility", "Reporting without exporting to Excel"],
    screen: { src: "/images/clinax/management-dashboard.png", width: 1492, height: 682, alt: "Clinax management dashboard showing clinic operations and performance" },
  },
]

export const ROLES = [
  {
    title: "Reception & Front Desk",
    summary: "The day, organised.",
    tasks: ["Register and check in patients", "Manage appointments and scheduling", "Handle day-to-day reception tasks", "Track follow-ups and confirmations"],
  },
  {
    title: "Therapists & Clinical Staff",
    summary: "Context at the point of care.",
    tasks: ["Document assessments and treatment plans", "Record sessions and track progress", "Access patient history instantly", "See today's priorities, not a paper pile"],
  },
  {
    title: "Clinic Leadership",
    summary: "Visibility across branches.",
    tasks: ["Oversee operations across branches", "Manage teams and role-based access", "Monitor performance through dashboards", "Make decisions on connected information"],
  },
]

export const STEPS = [
  { n: "01", title: "Discover & Align", text: "We confirm your priority workflows, branches and roles — starting with what matters most." },
  { n: "02", title: "Configure & Prepare", text: "Your environment, branches, users and workflows are set up. Existing patient lists are imported." },
  { n: "03", title: "Onboard & Go Live", text: "Reception, therapists and leadership are onboarded by role, with go-live support through the first weeks." },
  { n: "04", title: "Grow", text: "Add specialties, therapists and branches on the same foundation — without starting over." },
]

export type Mark = "yes" | "partial" | "no"

export const COMPARE_COLUMNS = ["Clinax", "WhatsApp + Spreadsheets", "Paper Records", "Generic Clinic Software"]

export const COMPARE_ROWS: { feature: string; marks: Mark[] }[] = [
  { feature: "One patient record across branches", marks: ["yes", "no", "no", "partial"] },
  { feature: "Structured physio / rehab documentation", marks: ["yes", "no", "partial", "partial"] },
  { feature: "Therapist schedule & capacity view", marks: ["yes", "partial", "no", "partial"] },
  { feature: "Role-based views for reception, therapist, leadership", marks: ["yes", "no", "no", "partial"] },
  { feature: "Follow-up and drop-off tracking", marks: ["yes", "partial", "no", "partial"] },
  { feature: "Branch-level dashboards without exports", marks: ["yes", "no", "no", "partial"] },
  { feature: "Progress tracking across sessions", marks: ["yes", "no", "partial", "partial"] },
  { feature: "Built to add specialties and branches", marks: ["yes", "no", "no", "partial"] },
]

export const FAQS = [
  {
    q: "Can therapists see the patient's history at the point of care?",
    a: "Yes. Every therapist sees previous assessments, treatment logs, goals and progress for the patient in front of them — on the treatment floor, not just at the desk.",
  },
  {
    q: "Does Clinax support multiple branches?",
    a: "Yes. Clinax is designed to grow from a single branch to a multi-branch, multi-specialty organisation. Patients, teams and dashboards can be viewed per branch or across the whole clinic.",
  },
  {
    q: "Who can see what? How is access controlled?",
    a: "Access is role-based. Reception, therapists and leadership each get the views and actions relevant to their work, and you decide who can access which branches and records.",
  },
  {
    q: "Do we have to replace all our existing tools on day one?",
    a: "No. Implementation starts with your priority workflows — typically front desk and scheduling, then clinical documentation, then dashboards — so teams adopt Clinax step by step.",
  },
  {
    q: "How long does onboarding take?",
    a: "It depends on branches and scope, but the approach is the same: discover and align, configure, onboard by role, go live with support. Most clinics start on the front desk and scheduling within weeks, not months.",
  },
  {
    q: "Is Clinax only for physiotherapy?",
    a: "Clinax is built for physiotherapy and rehabilitation clinics first, with structured clinical workflows for that setting — and designed so clinics can extend into additional specialties over time.",
  },
  {
    q: "Can we import our existing patient list?",
    a: "Yes. Existing patient details from spreadsheets or exports are imported during configuration so reception is not re-typing records on day one.",
  },
  {
    q: "What about WhatsApp reminders and payments?",
    a: "Patient communication and payment integrations are handled through third-party providers and are scoped with you during discovery, alongside the core clinic workflows.",
  },
  {
    q: "Is our patient data secure?",
    a: "Yes. Patient records are encrypted in transit and at rest, access is role-based so staff only see what their work requires, and your data is backed up automatically. You retain full ownership and can export your data at any time.",
  },
  {
    q: "How is Clinax priced?",
    a: "Pricing is scoped to your clinic — branches, roles and the workflows you switch on first — rather than a one-size-fits-all plan. We walk through it transparently during the demo so you can weigh it against the tools and hours it replaces.",
  },
  {
    q: "How do we get started?",
    a: "Request a demo. We walk through Clinax with your workflows in mind, then agree an initial scope and implementation plan with you.",
  },
]

export const FINAL_CTA = {
  headline: "Stop running your clinic from group chats.",
  sub: "See how Clinax brings patients, therapists and branches together — in a demo built around your clinic.",
  bullets: ["Personalised walkthrough with your workflows", "No commitment, no credit card", "Reply within one business day"],
}

export const FOOTER_LINKS = [
  { label: "TrueSpur", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
]
