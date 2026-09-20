"use client"

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react"
import Image from "next/image"

// ─── Shared helpers (mirrors app/clinax/page.tsx conventions) ──────────────

const SANS = { fontFamily: "var(--font-clinax-sans)" } as const
const SERIF = { fontFamily: "var(--font-clinax-serif)" } as const

// Reveals its content once scrolled into view, matching the page's existing
// reveal pattern for the Clinax Model / Why Clinax sections.
function useInView(threshold = 0.25) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true)
            observer.unobserve(el)
          }
        })
      },
      { threshold }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

function riseStyle(active: boolean, delay: number, distance = 10): CSSProperties {
  return {
    opacity: active ? 1 : 0,
    transform: active ? "translate(0,0)" : `translate(0,${distance}px)`,
    transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
  }
}

function drawStyle(active: boolean, delay: number, duration = 0.9): CSSProperties {
  return {
    strokeDasharray: 1,
    strokeDashoffset: active ? 0 : 1,
    transition: `stroke-dashoffset ${duration}s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
  }
}

// ─── Section intro ───────────────────────────────────────────────────────────

function SectionIntro() {
  const { ref, inView } = useInView(0.4)
  return (
    <div ref={ref} className="max-w-2xl mb-16" style={SANS}>
      <p
        className="text-[#0D9DAA] text-[11px] font-semibold tracking-[0.16em] uppercase mb-5"
        style={riseStyle(inView, 0)}
      >
        See It In Action
      </p>
      <h2 style={{ ...SERIF, ...riseStyle(inView, 0.08) }} className="text-4xl sm:text-[2.6rem] leading-[1.1] text-[#0B1F3A] mb-6">
        See Clinax in action.
      </h2>
      <p className="text-[#5A7189] text-[0.9375rem] leading-[1.7] font-light max-w-lg" style={riseStyle(inView, 0.16)}>
        One connected workflow across the clinic — from the front desk to the treatment floor and back to management.
      </p>
    </div>
  )
}

// ─── Workflow journey indicator ──────────────────────────────────────────────

const JOURNEY_STAGES = ["Book", "Check in", "Treat", "Document", "Follow up", "Manage"]

function WorkflowJourney({ activeStages }: { activeStages?: string[] }) {
  const { ref, inView } = useInView(0.5)
  const n = JOURNEY_STAGES.length

  return (
    <div ref={ref} className="mb-20" style={SANS} aria-hidden="true">
      {/* Desktop / tablet: single connected track */}
      <div className="hidden sm:block relative">
        <svg viewBox={`0 0 ${(n - 1) * 100} 4`} preserveAspectRatio="none" className="absolute top-[7px] left-0 w-full h-1" aria-hidden="true">
          <line x1="0" y1="2" x2={(n - 1) * 100} y2="2" stroke="#D6E0EA" strokeWidth="1.5" />
          <line
            x1="0"
            y1="2"
            x2={(n - 1) * 100}
            y2="2"
            pathLength={1}
            stroke="#0D9DAA"
            strokeWidth="1.5"
            strokeLinecap="round"
            style={drawStyle(inView, 0.2, 1.6)}
          />
        </svg>
        <div className="relative grid" style={{ gridTemplateColumns: `repeat(${n}, minmax(0,1fr))` }}>
          {JOURNEY_STAGES.map((stage, i) => {
            const active = !activeStages || activeStages.includes(stage)
            return (
              <div key={stage} className="flex flex-col items-center gap-3" style={riseStyle(inView, 0.15 + i * 0.08, 6)}>
                <span
                  className={`w-4 h-4 rounded-full border-2 bg-white transition-colors duration-300 ${
                    active ? "border-[#0D9DAA]" : "border-[#D6E0EA]"
                  }`}
                >
                  <span className={`block w-full h-full rounded-full scale-[0.4] ${active ? "bg-[#0D9DAA]" : "bg-[#D6E0EA]"}`} />
                </span>
                <span className={`text-[11.5px] font-semibold tracking-wide text-center ${active ? "text-[#0B1F3A]" : "text-[#B4C7D8]"}`}>
                  {stage}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Mobile: compact wrapped row */}
      <div className="flex sm:hidden flex-wrap items-center gap-x-1.5 gap-y-3 justify-center">
        {JOURNEY_STAGES.map((stage, i) => {
          const active = !activeStages || activeStages.includes(stage)
          return (
            <div key={stage} className="flex items-center gap-1.5" style={riseStyle(inView, 0.1 + i * 0.06, 4)}>
              <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${active ? "border-[#0D9DAA]/40 bg-[#0D9DAA]/8" : "border-[#D6E0EA] bg-white"}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${active ? "bg-[#0D9DAA]" : "bg-[#D6E0EA]"}`} />
                <span className={`text-[11px] font-semibold ${active ? "text-[#0B1F3A]" : "text-[#B4C7D8]"}`}>{stage}</span>
              </span>
              {i < n - 1 && (
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                  <path d="M2 1.5 5.5 4 2 6.5" stroke="#D6E0EA" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Product frame: the "window into Clinax" chrome ─────────────────────────

function ProductFrame({
  src,
  alt,
  width,
  height,
  screenLabel,
  inView,
  delay = 0,
}: {
  src: string
  alt: string
  width: number
  height: number
  screenLabel: string
  inView: boolean
  delay?: number
}) {
  return (
    <div
      className="w-full"
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(14px) scale(0.99)",
        transition: `opacity 0.7s ease-out ${delay}s, transform 0.7s ease-out ${delay}s`,
      }}
    >
      <div className="rounded-2xl border border-[#D6E0EA] bg-white shadow-[0_18px_50px_-24px_rgba(11,31,58,0.28)] overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#EEF2F7] bg-[#FBFCFD]">
          <span className="w-2 h-2 rounded-full bg-[#E2E8EF]" />
          <span className="w-2 h-2 rounded-full bg-[#E2E8EF]" />
          <span className="w-2 h-2 rounded-full bg-[#E2E8EF]" />
          <span className="ml-2 text-[10.5px] font-semibold tracking-widest uppercase text-[#8FA6BC]" style={SANS}>
            Clinax · {screenLabel}
          </span>
        </div>

        {/* Screenshot — horizontally scrollable on very small screens so the
            product UI stays readable instead of shrinking to illegibility. */}
        <div className="overflow-x-auto">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(min-width: 1024px) 60vw, (min-width: 640px) 90vw, 640px"
            loading="lazy"
            className="w-full min-w-[640px] h-auto block"
          />
        </div>

        {/* Demo-data disclosure */}
        <div className="px-4 py-2.5 border-t border-[#EEF2F7] bg-[#FBFCFD]">
          <p className="text-[10.5px] text-[#8FA6BC] font-medium tracking-wide" style={SANS}>
            Demonstration data · fictional clinic
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Product moment (alternating text / screenshot) ─────────────────────────

interface Moment {
  index: string
  label: string
  headline: string
  description: string
  stages: string[]
  screenLabel: string
  alt: string
  src?: string
  width?: number
  height?: number
}

function MomentCopy({ moment, inView }: { moment: Moment; inView: boolean }) {
  return (
    <div style={SANS}>
      <p className="text-[#0D9DAA] text-[11px] font-semibold tracking-[0.16em] uppercase mb-5" style={riseStyle(inView, 0)}>
        {moment.index} — {moment.label}
      </p>
      <h3 style={{ ...SERIF, ...riseStyle(inView, 0.08) }} className="text-[1.75rem] sm:text-[2rem] leading-[1.18] text-[#0B1F3A] mb-4">
        {moment.headline}
      </h3>
      <p className="text-[#5A7189] text-[0.9375rem] leading-[1.7] font-light max-w-md mb-6" style={riseStyle(inView, 0.16)}>
        {moment.description}
      </p>
      <div className="flex flex-wrap items-center gap-2" style={riseStyle(inView, 0.24)}>
        {moment.stages.map((s) => (
          <span
            key={s}
            className="inline-flex items-center gap-1.5 bg-white border border-[#D6E0EA] rounded-full pl-2.5 pr-3 py-1"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#0D9DAA]" />
            <span className="text-[#0B1F3A] text-[10px] font-semibold tracking-widest uppercase">{s}</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function ProductMoment({ moment, flip, isLast, children }: { moment: Moment; flip: boolean; isLast: boolean; children?: ReactNode }) {
  const { ref, inView } = useInView(0.25)

  return (
    <div ref={ref}>
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <div className={`lg:col-span-4 ${flip ? "lg:order-2 lg:col-start-9" : ""}`}>
          <MomentCopy moment={moment} inView={inView} />
        </div>
        <div className={`lg:col-span-8 ${flip ? "lg:order-1 lg:col-start-1" : ""}`}>
          {children ?? (
            moment.src && moment.width && moment.height ? (
              <ProductFrame
                src={moment.src}
                alt={moment.alt}
                width={moment.width}
                height={moment.height}
                screenLabel={moment.screenLabel}
                inView={inView}
                delay={0.1}
              />
            ) : null
          )}
        </div>
      </div>

      {!isLast && (
        <div className="flex justify-center py-10 sm:py-14" aria-hidden="true">
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-px bg-linear-to-b from-[#0D9DAA]/45 to-[#0D9DAA]/10"
              style={{ height: inView ? "36px" : "0px", transition: "height 0.6s ease-out 0.2s" }}
            />
            <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
              <path d="M1 1.5 5.5 6 10 1.5" stroke="#0D9DAA" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" opacity={inView ? 0.6 : 0} />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Product moment 04: clinical workflow carousel ──────────────────────────

const CLINICAL_STEPS = [
  { key: "assess", label: "Assess", src: "/images/clinax/visit-assess.png", width: 1235, height: 650, alt: "Clinax therapy session workflow showing the assessment step, with subjective and objective clinical notes for a patient visit" },
  { key: "treat", label: "Treat", src: "/images/clinax/visit-treat.png", width: 1227, height: 672, alt: "Clinax therapy session workflow showing the treatment step, with today's treatment log and a documentation action" },
  { key: "plan", label: "Plan", src: "/images/clinax/visit-plan.png", width: 1227, height: 672, alt: "Clinax therapy session workflow showing the care-plan step, with goals, progress and a home exercise plan" },
  { key: "complete", label: "Complete", src: "/images/clinax/visit-complete.png", width: 1232, height: 652, alt: "Clinax therapy session workflow showing the visit-completion step, with a summary and next appointment" },
] as const

function ClinicalWorkflowCarousel({ inView }: { inView: boolean }) {
  const [step, setStep] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const current = CLINICAL_STEPS[step]

  const goTo = (i: number) => {
    const next = (i + CLINICAL_STEPS.length) % CLINICAL_STEPS.length
    setStep(next)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault()
      goTo(step + 1)
    } else if (e.key === "ArrowLeft") {
      e.preventDefault()
      goTo(step - 1)
    } else if (e.key === "Home") {
      e.preventDefault()
      goTo(0)
    } else if (e.key === "End") {
      e.preventDefault()
      goTo(CLINICAL_STEPS.length - 1)
    }
  }

  return (
    <div
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0) scale(1)" : "translateY(14px) scale(0.99)",
        transition: "opacity 0.7s ease-out 0.1s, transform 0.7s ease-out 0.1s",
      }}
    >
      <div className="rounded-2xl border border-[#D6E0EA] bg-white shadow-[0_18px_50px_-24px_rgba(11,31,58,0.28)] overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#EEF2F7] bg-[#FBFCFD]">
          <span className="w-2 h-2 rounded-full bg-[#E2E8EF]" />
          <span className="w-2 h-2 rounded-full bg-[#E2E8EF]" />
          <span className="w-2 h-2 rounded-full bg-[#E2E8EF]" />
          <span className="ml-2 text-[10.5px] font-semibold tracking-widest uppercase text-[#8FA6BC]" style={SANS}>
            Clinax · Therapy Session
          </span>
        </div>

        {/* Step tabs */}
        <div
          role="tablist"
          aria-label="Therapy session workflow steps"
          onKeyDown={onKeyDown}
          className="flex items-stretch overflow-x-auto border-b border-[#EEF2F7] bg-white"
          style={SANS}
        >
          {CLINICAL_STEPS.map((s, i) => (
            <button
              key={s.key}
              ref={(el) => {
                tabRefs.current[i] = el
              }}
              role="tab"
              type="button"
              id={`clinax-step-tab-${s.key}`}
              aria-selected={step === i}
              aria-controls={`clinax-step-panel-${s.key}`}
              tabIndex={step === i ? 0 : -1}
              onClick={() => goTo(i)}
              className={`shrink-0 px-4 sm:px-5 py-3 text-[12.5px] font-semibold tracking-wide border-b-2 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9DAA] focus-visible:ring-inset ${
                step === i ? "border-[#0D9DAA] text-[#0B1F3A]" : "border-transparent text-[#8FA6BC] hover:text-[#5A7189]"
              }`}
            >
              <span className="mr-1.5 text-[#B4C7D8]">{i + 1}.</span>
              {s.label}
            </button>
          ))}
        </div>

        {/* Media: stacked + cross-faded, fixed aspect box so switching steps never shifts layout */}
        <div className="relative w-full overflow-x-auto">
          <div className="relative min-w-[640px]" style={{ aspectRatio: "1235 / 660" }}>
            {CLINICAL_STEPS.map((s, i) => (
              <div
                key={s.key}
                role="tabpanel"
                id={`clinax-step-panel-${s.key}`}
                aria-labelledby={`clinax-step-tab-${s.key}`}
                hidden={step !== i}
                className="absolute inset-0"
                style={{ opacity: step === i ? 1 : 0, transition: "opacity 0.35s ease-out" }}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  fill
                  sizes="(min-width: 1024px) 60vw, (min-width: 640px) 90vw, 640px"
                  className="object-cover object-top"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-[#EEF2F7] bg-[#FBFCFD]" style={SANS}>
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            aria-label="Previous workflow step"
            className="inline-flex items-center gap-1.5 text-[#5A7189] hover:text-[#0B1F3A] text-xs font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9DAA] rounded-sm px-1"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M7.5 2.5 3.5 6l4 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Back
          </button>

          <p className="text-[10.5px] text-[#8FA6BC] font-medium tracking-wide" aria-live="polite">
            Step {step + 1} of {CLINICAL_STEPS.length} · {current.label} · Demonstration data
          </p>

          <button
            type="button"
            onClick={() => goTo(step + 1)}
            aria-label="Next workflow step"
            className="inline-flex items-center gap-1.5 text-[#5A7189] hover:text-[#0B1F3A] text-xs font-medium transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0D9DAA] rounded-sm px-1"
          >
            Next
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M4.5 2.5 8.5 6l-4 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Moment data ─────────────────────────────────────────────────────────────

const MOMENTS: Moment[] = [
  {
    index: "01",
    label: "Front Desk",
    headline: "Start every day with the clinic in view.",
    description:
      "Give reception teams a clear view of arrivals, waiting patients, appointments, online sessions and follow-ups — all from one workspace.",
    stages: ["Book", "Check in"],
    screenLabel: "Front Desk",
    alt: "Clinax front desk workspace showing today's appointments and waiting queue",
    src: "/images/clinax/front-desk.png",
    width: 1506,
    height: 680,
  },
  {
    index: "02",
    label: "Scheduling",
    headline: "Know where capacity is — before you book.",
    description:
      "See therapist availability, appointment density and branch capacity in one connected schedule.",
    stages: ["Book"],
    screenLabel: "Schedule",
    alt: "Clinax therapist schedule showing provider availability and appointment capacity",
    src: "/images/clinax/schedule.png",
    width: 1487,
    height: 665,
  },
  {
    index: "03",
    label: "Therapist Workflow",
    headline: "Give therapists the context they need, when they need it.",
    description:
      "Bring the patient's previous progress, today's priorities and clinical context into the therapist's working day.",
    stages: ["Treat"],
    screenLabel: "Therapist Dashboard",
    alt: "Clinax therapist dashboard showing today's patients and clinical context",
    src: "/images/clinax/therapist-dashboard.png",
    width: 1217,
    height: 672,
  },
  {
    index: "04",
    label: "Clinical Workflow",
    headline: "Review. Assess. Treat. Document. Plan. Complete.",
    description:
      "Guide each therapy session through a connected clinical workflow while keeping the patient's context visible throughout.",
    stages: ["Treat", "Document"],
    screenLabel: "Therapy Session",
    alt: "Clinax therapy session workflow showing review, assessment, treatment and documentation",
  },
  {
    index: "05",
    label: "Management",
    headline: "See what is happening across your clinic.",
    description:
      "Give clinic managers and owners visibility into appointments, activity, revenue, therapist utilisation, follow-ups and operational performance.",
    stages: ["Follow up", "Manage"],
    screenLabel: "Management Dashboard",
    alt: "Clinax management dashboard showing clinic operations and performance",
    src: "/images/clinax/management-dashboard.png",
    width: 1492,
    height: 682,
  },
]

// ─── Section ─────────────────────────────────────────────────────────────────

export default function ClinaxProductExperience() {
  return (
    <section id="product" className="py-28 bg-[#F8F9FB] border-t border-[#D6E0EA]">
      <div className="max-w-6xl mx-auto px-6">
        <SectionIntro />
        <WorkflowJourney />

        <div className="flex flex-col">
          {MOMENTS.map((moment, i) => (
            <ProductMoment key={moment.index} moment={moment} flip={i % 2 === 1} isLast={i === MOMENTS.length - 1}>
              {moment.index === "04" ? <ClinicalWorkflowCarouselWrapper /> : undefined}
            </ProductMoment>
          ))}
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          #product * { animation: none !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  )
}

// Small wrapper so ClinicalWorkflowCarousel can read the surrounding
// ProductMoment's inView state without threading extra props through the
// generic ProductMoment/children API.
function ClinicalWorkflowCarouselWrapper() {
  const { ref, inView } = useInView(0.2)
  return (
    <div ref={ref}>
      <ClinicalWorkflowCarousel inView={inView} />
    </div>
  )
}
