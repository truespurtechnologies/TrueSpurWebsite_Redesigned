"use client"

import { useEffect, useRef, useState, type CSSProperties } from "react"
import ClinaxNav from "@/components/clinax/ClinaxNav"
import ConnectedClinicVisual from "@/components/clinax/ConnectedClinicVisual"

// ─── Section 1: Hero ────────────────────────────────────────────────────────

function Hero() {
  const scrollTo = (href: string) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth", block: "start" })

  return (
    <section className="relative flex items-center pt-16 overflow-hidden bg-[#F8F9FB]">
      {/* Subtle dot-grid texture */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#0B1F3A 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24 md:py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">
          {/* Left: copy */}
          <div className="max-w-xl">
            <p className="text-[#0D9DAA] text-[11px] font-semibold tracking-[0.16em] uppercase mb-6" style={{ fontFamily: "var(--font-clinax-sans)" }}>
              Clinax · Clinic Operating System
            </p>

            <h1
              style={{ fontFamily: "var(--font-clinax-serif)" }}
              className="text-[2.6rem] sm:text-5xl lg:text-[3rem] xl:text-[3.25rem] leading-[1.08] text-[#0B1F3A] mb-7"
            >
              The connected operating system for physiotherapy and rehabilitation clinics.
            </h1>

            <p className="text-[#5A7189] text-[1.0625rem] leading-[1.7] mb-10 font-light max-w-lg" style={{ fontFamily: "var(--font-clinax-sans)" }}>
              Bring patient care, teams and clinic operations together in one connected platform—so your clinic can operate with greater visibility, efficiency and control as it grows.
            </p>

            <div className="flex flex-wrap items-center gap-4" style={{ fontFamily: "var(--font-clinax-sans)" }}>
              <button
                onClick={() => scrollTo("#contact")}
                className="inline-flex items-center gap-2.5 bg-[#0B1F3A] text-white text-sm font-medium px-7 py-3.5 rounded-md hover:bg-[#0D2B4E] transition-colors duration-150 cursor-pointer"
              >
                Request a Demo
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M2.5 6.5h8M7.5 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                onClick={() => scrollTo("#how-it-works")}
                className="text-[#5A7189] text-sm font-medium hover:text-[#0B1F3A] transition-colors duration-150 cursor-pointer flex items-center gap-1.5"
              >
                See how it works
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M6.5 2.5v8M3.5 7.5l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          {/* Right: connected clinic visual */}
          <div className="flex justify-center lg:justify-end">
            <ConnectedClinicVisual />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Section 2: The Problem ──────────────────────────────────────────────────

// Minimal line icons - kept consistent with the hand-drawn SVG icon language
// used throughout the page (nav mark, CTA arrows) instead of emoji, so the
// fragmentation story reads as an intentional product visual rather than a
// generic icon-and-card layout.
function ChatIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M3 3.5h10a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H7.2L4 14.2V11.5H3a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SheetIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M2.5 6.7h11M2.5 10.3h11M6.7 2.5v11" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  )
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M4.6 2.6h1.9l1 2.6-1.5 1.3a7.8 7.8 0 0 0 3.3 3.3l1.3-1.5 2.6 1v1.9c0 .9-.8 1.6-1.7 1.5A10.6 10.6 0 0 1 3.1 4.3c-.1-.9.6-1.7 1.5-1.7Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M4.5 2.5h4.5L11.5 5v8.5h-7Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M9 2.5V5h2.5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M6 8.7h3.5M6 11h3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function WrenchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <path
        d="M9.9 3.3a2.9 2.9 0 0 0-3.8 3.5L2.9 10a1.3 1.3 0 0 0 1.8 1.8l3.2-3.2a2.9 2.9 0 0 0 3.5-3.8L9.6 6.6 8.2 5.2Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function BulbIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="8" cy="6.2" r="3.4" stroke="currentColor" strokeWidth="1.3" />
      <path d="M6.6 9.1 7 11.3M9.4 9.1 9 11.3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M6.8 11.3h2.4M7.1 13h1.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M8 2.8 14 13H2Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M8 7v2.4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <circle cx="8" cy="11" r="0.6" fill="currentColor" />
    </svg>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1.3" />
      <path d="M10.1 10.1 13.3 13.3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  )
}

function TrendDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" className={className}>
      <path d="M2.5 4.7 6.2 8.4l2.3-2.3 4.8 4.8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10 10.9h3.3V7.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const TOOLS = [
  { label: "WhatsApp", Icon: ChatIcon },
  { label: "Spreadsheets", Icon: SheetIcon },
  { label: "Phone Calls", Icon: PhoneIcon },
  { label: "Paper Records", Icon: DocumentIcon },
  { label: "Multiple Tools", Icon: WrenchIcon },
  { label: "Individual Knowledge", Icon: BulbIcon },
]

const FRAGMENTATION_OUTCOMES = [
  { label: "Coordination overhead", Icon: WarningIcon },
  { label: "Information gaps", Icon: SearchIcon },
  { label: "Harder to scale", Icon: TrendDownIcon },
]

// Smooth converging lines - visualises many disconnected tools funnelling
// through a single manual point of contact, without reading as a literal
// technical/architecture diagram.
function ConvergingFlow() {
  const anchors = [40, 140, 240, 360, 460, 560]
  return (
    <svg viewBox="0 0 600 56" preserveAspectRatio="none" className="w-full h-12" fill="none" aria-hidden="true">
      {anchors.map((x, i) => (
        <path
          key={i}
          d={`M${x} 0 C ${x} 26, 300 22, 300 54`}
          stroke="#C3D2E0"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity={0.6 + Math.abs(i - 2.5) * -0.03}
        />
      ))}
      <circle cx="300" cy="54" r="3" fill="#8FA6BC" />
    </svg>
  )
}

function FragmentationDiagram() {
  return (
    <div className="w-full" style={{ fontFamily: "var(--font-clinax-sans)" }}>
      {/* Tools row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {TOOLS.map((t) => (
          <div
            key={t.label}
            className="bg-white border border-[#D6E0EA] rounded-xl px-3 py-3.5 flex flex-col items-start gap-2.5"
          >
            <span className="w-7 h-7 rounded-lg bg-[#EEF2F7] text-[#5A7189] flex items-center justify-center shrink-0">
              <t.Icon className="w-3.5 h-3.5" />
            </span>
            <span className="text-[#0B1F3A] text-[11.5px] font-medium leading-tight">{t.label}</span>
          </div>
        ))}
      </div>

      {/* Converging flow */}
      <ConvergingFlow />

      {/* Person node - the manual integration layer */}
      <div className="flex justify-center mb-5">
        <div className="relative bg-[#EEF2F7] border border-[#D6E0EA] rounded-2xl px-7 py-5 text-center max-w-[280px]">
          {/* Pulse ring - subtle cue that this is ongoing manual effort */}
          <div className="absolute -inset-2 rounded-2xl border border-[#D6E0EA] opacity-40 animate-pulse" />
          <div className="w-10 h-10 rounded-full bg-white border border-[#D6E0EA] flex items-center justify-center mx-auto mb-3">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <circle cx="9" cy="6" r="3.5" stroke="#5A7189" strokeWidth="1.5" />
              <path d="M2 17c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="#5A7189" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
          <p className="text-[#0B1F3A] text-sm font-semibold mb-1">Clinic Team</p>
          <p className="text-[#5A7189] text-xs leading-snug">becomes the manual integration layer</p>
        </div>
      </div>

      {/* Down arrow */}
      <div className="flex justify-center mb-5">
        <div className="flex flex-col items-center gap-1">
          <div className="w-px h-8 bg-linear-to-b from-[#B4C7D8] to-[#E05C6A]" />
          <div className="w-0 h-0 border-x-[3px] border-x-transparent border-t-[5px] border-t-[#E05C6A]" />
        </div>
      </div>

      {/* Outcome row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {FRAGMENTATION_OUTCOMES.map((o) => (
          <div key={o.label} className="bg-[#FFF6F5] border border-[#F6D9D7] rounded-xl px-3 py-3 flex items-center gap-2.5">
            <span className="w-6 h-6 rounded-full bg-white text-[#C0464A] flex items-center justify-center shrink-0">
              <o.Icon className="w-3 h-3" />
            </span>
            <span className="text-[#B34349] text-[11px] font-medium leading-tight">{o.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Problem() {
  return (
    <section id="why-clinax" className="py-28 bg-white border-t border-[#D6E0EA]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 xl:gap-24 items-start">
          {/* Left: narrative */}
          <div>
            <p className="text-[#0D9DAA] text-[11px] font-semibold tracking-[0.16em] uppercase mb-5" style={{ fontFamily: "var(--font-clinax-sans)" }}>
              01 — The Problem
            </p>
            <h2
              style={{ fontFamily: "var(--font-clinax-serif)" }}
              className="text-4xl sm:text-[2.6rem] leading-[1.1] text-[#0B1F3A] mb-8"
            >
              Growth shouldn&apos;t make your clinic harder to run.
            </h2>

            {/* Cascading growth pressures */}
            <div className="flex flex-col gap-1.5 mb-10 pl-1" style={{ fontFamily: "var(--font-clinax-sans)" }}>
              {[
                "More patients.",
                "More therapists.",
                "More appointments.",
                "More services.",
                "More coordination.",
                "More locations.",
              ].map((line, i) => (
                <p
                  key={i}
                  className="text-[#0B1F3A] font-light leading-snug"
                  style={{
                    fontSize: `${1.15 - i * 0.04}rem`,
                    opacity: 1 - i * 0.1,
                  }}
                >
                  {line}
                </p>
              ))}
            </div>

            <p className="text-[#5A7189] text-[0.9375rem] leading-[1.7] mb-7 font-light" style={{ fontFamily: "var(--font-clinax-sans)" }}>
              As your clinic grows, so does the complexity of running it. Information and workflows can become scattered across people and disconnected tools.
            </p>

            <div className="border-l-2 border-[#0D9DAA] pl-5" style={{ fontFamily: "var(--font-clinax-sans)" }}>
              <p className="text-[#0B1F3A] text-[1rem] font-medium leading-snug">Your clinic may use digital tools.</p>
              <p className="text-[#0B1F3A] text-[1rem] leading-snug mt-1">
                But is your clinic{" "}
                <em style={{ fontFamily: "var(--font-clinax-serif)" }} className="text-[#0D9DAA] not-italic font-normal">
                  digitally connected?
                </em>
              </p>
            </div>
          </div>

          {/* Right: fragmentation diagram */}
          <div>
            <p className="text-[#5A7189] text-[11px] font-semibold tracking-[0.14em] uppercase mb-5" style={{ fontFamily: "var(--font-clinax-sans)" }}>
              Information scattered across...
            </p>
            <FragmentationDiagram />
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Section 3: The Shift ────────────────────────────────────────────────────

const FRAGMENTED_ITEMS = [
  "Different tools manage different tasks.",
  "People are responsible for connecting information.",
  "Updates are shared manually.",
  "Teams work without complete context.",
]

const CONNECTED_ITEMS = [
  "Information, workflows and teams work together.",
  "Teams operate with shared context.",
  "Operations become more connected.",
  "The organisation has a stronger foundation to grow.",
]

function ShiftColumn({ side, items }: { side: "fragmented" | "connected"; items: string[] }) {
  const isConnected = side === "connected"

  return (
    <div
      className={`rounded-2xl p-8 flex flex-col gap-7 border ${
        isConnected ? "bg-[#0B1F3A] border-[#1A3558]" : "bg-white border-[#D6E0EA]"
      }`}
      style={{ fontFamily: "var(--font-clinax-sans)" }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
            isConnected ? "bg-[#0D9DAA]/20" : "bg-[#F0F5FA]"
          }`}
        >
          {isConnected ? (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <circle cx="7.5" cy="7.5" r="2" fill="#0D9DAA" />
              <path d="M7.5 1.5v2M7.5 11.5v2M1.5 7.5h2M11.5 7.5h2" stroke="#0D9DAA" strokeWidth="1.5" strokeLinecap="round" />
              <circle cx="7.5" cy="7.5" r="5.5" stroke="#0D9DAA" strokeWidth="1" opacity="0.35" />
            </svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
              <path d="M3 5h9M3 8h7M3 11h5" stroke="#B4C7D8" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </div>
        <p className={`text-[11px] font-semibold tracking-[0.13em] uppercase ${isConnected ? "text-[#0D9DAA]" : "text-[#B4C7D8]"}`}>
          {isConnected ? "The Connected Way" : "The Fragmented Way"}
        </p>
      </div>

      {/* Items */}
      <ul className="flex flex-col gap-4">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-3.5">
            <div className={`mt-[7px] w-1.5 h-1.5 rounded-full shrink-0 ${isConnected ? "bg-[#0D9DAA]" : "bg-[#D6E0EA]"}`} />
            <p className={`text-[0.9rem] leading-[1.65] ${isConnected ? "text-[#A8C0D4]" : "text-[#5A7189]"}`}>{item}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Shift() {
  return (
    <section className="py-28 bg-[#F8F9FB] border-t border-[#D6E0EA]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-14">
          <p className="text-[#0D9DAA] text-[11px] font-semibold tracking-[0.16em] uppercase mb-5" style={{ fontFamily: "var(--font-clinax-sans)" }}>
            02 — The Shift
          </p>
          <h2 style={{ fontFamily: "var(--font-clinax-serif)" }} className="text-4xl sm:text-[2.6rem] leading-[1.1] text-[#0B1F3A]">
            Your clinic deserves more than a collection of tools.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <ShiftColumn side="fragmented" items={FRAGMENTED_ITEMS} />
          <ShiftColumn side="connected" items={CONNECTED_ITEMS} />
        </div>

        {/* Transition bar */}
        <div className="flex justify-center" style={{ fontFamily: "var(--font-clinax-sans)" }}>
          <div className="inline-flex items-center gap-4 bg-white border border-[#D6E0EA] rounded-xl px-7 py-4 shadow-sm">
            <span className="text-[#B4C7D8] text-xs font-medium tracking-wide">Disconnected tools</span>
            <div className="flex items-center gap-1">
              <div className="w-4 h-px bg-[#D6E0EA]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#D6E0EA]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#86C5CB]" />
              <div className="w-1.5 h-1.5 rounded-full bg-[#0D9DAA]" />
              <div className="w-4 h-px bg-[#0D9DAA]" />
            </div>
            <span className="text-[#0B1F3A] text-xs font-semibold tracking-wide">Connected clinic operations</span>
          </div>
        </div>

        <p style={{ fontFamily: "var(--font-clinax-serif)" }} className="text-center text-[#5A7189] text-base mt-5 italic">
          From disconnected tools to connected clinic operations.
        </p>
      </div>
    </section>
  )
}

// ─── Section 4: The Clinax Model (Connect → Operate → Scale) ───────────────

// Reveals its content once scrolled into view, so the CONNECT → OPERATE →
// SCALE story unfolds progressively down the page rather than appearing all
// at once.
function useInView(threshold = 0.3) {
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

// All three model visuals share one SVG language: fine #D6E0EA structure
// lines, teal connections that draw in with `pathLength="1"` (so every
// stroke animates on a normalised 0→1 dash regardless of its real length),
// white nodes with a teal accent dot, and a single teal Clinax core.
const SANS = { fontFamily: "var(--font-clinax-sans)" } as const

// Draw-in stroke: dashoffset 1 → 0 once the step is in view.
function drawStyle(active: boolean, delay: number, duration = 0.7): CSSProperties {
  return {
    strokeDasharray: 1,
    strokeDashoffset: active ? 0 : 1,
    transition: `stroke-dashoffset ${duration}s cubic-bezier(0.25,0.46,0.45,0.94) ${delay}s`,
  }
}

// Fade + rise once the step is in view.
function riseStyle(active: boolean, delay: number, distance = 8): CSSProperties {
  return {
    opacity: active ? 1 : 0,
    transform: active ? "translate(0,0)" : `translate(0,${distance}px)`,
    transition: `opacity 0.5s ease-out ${delay}s, transform 0.5s ease-out ${delay}s`,
  }
}

function CoreDefs({ id }: { id: string }) {
  return (
    <defs>
      <radialGradient id={`${id}-core`} cx="40%" cy="35%" r="65%">
        <stop offset="0%" stopColor="#1BB8C7" />
        <stop offset="100%" stopColor="#0A7A86" />
      </radialGradient>
      <filter id={`${id}-glow`} x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow dx="0" dy="0" stdDeviation="9" floodColor="#0D9DAA" floodOpacity="0.3" />
      </filter>
      <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0B1F3A" floodOpacity="0.06" />
      </filter>
    </defs>
  )
}

function ClinaxCore({ id, cx, cy, r, active }: { id: string; cx: number; cy: number; r: number; active: boolean }) {
  return (
    <g style={{ opacity: active ? 1 : 0.35, transition: "opacity 0.6s ease-out" }}>
      <circle cx={cx} cy={cy} r={r + 9} fill="#0D9DAA" opacity="0.08" />
      <g filter={`url(#${id}-glow)`}>
        <circle cx={cx} cy={cy} r={r} fill={`url(#${id}-core)`} />
      </g>
      <text x={cx} y={cy - 4} textAnchor="middle" dominantBaseline="middle" fontSize="12" fontWeight="600" fill="white" letterSpacing="0.09em" style={SANS}>
        CLINAX
      </text>
      <text x={cx} y={cy + 10} textAnchor="middle" dominantBaseline="middle" fontSize="7.5" fill="white" opacity="0.72" letterSpacing="0.04em" style={SANS}>
        Connected Core
      </text>
    </g>
  )
}

// Step 1 visual — five separate parts of the clinic converge onto one core.
// Nodes start pushed outward and slide in as their connection draws toward
// the centre; afterwards a slow pulse travels each line inward.
const CONNECT_NODES = [
  { label: "Patients", angle: -90 },
  { label: "Care", angle: -18 },
  { label: "Operations", angle: 54 },
  { label: "Information", angle: 126 },
  { label: "Team", angle: 198 },
]

function ConnectVisual({ active }: { active: boolean }) {
  const CX = 180
  const CY = 160
  const RING = 116
  const NODE_R = 35
  const CORE_R = 40
  const polar = (angle: number, r: number) => {
    const rad = (angle * Math.PI) / 180
    return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) }
  }

  return (
    <svg viewBox="0 0 360 320" className="w-full h-auto max-w-[390px]" fill="none" aria-hidden="true">
      <CoreDefs id="cxc" />
      <circle cx={CX} cy={CY} r={RING} stroke="#D6E0EA" strokeWidth="1" strokeDasharray="3 7" opacity="0.6" />

      {CONNECT_NODES.map((n, i) => {
        const from = polar(n.angle, RING - NODE_R)
        const to = polar(n.angle, CORE_R + 3)
        return (
          <g key={n.label}>
            <line x1={from.x} y1={from.y} x2={to.x} y2={to.y} pathLength={1} stroke="#0D9DAA" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" style={drawStyle(active, 0.35 + i * 0.12)} />
            <line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              pathLength={1}
              stroke="#0D9DAA"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray="0.08 1"
              style={{ animation: active ? `clinaxPulseIn 3.2s ease-in-out ${1.4 + i * 0.55}s infinite` : "none", opacity: 0 }}
            />
          </g>
        )
      })}

      {CONNECT_NODES.map((n, i) => {
        const pos = polar(n.angle, RING)
        const rad = (n.angle * Math.PI) / 180
        const dx = Math.cos(rad) * 22
        const dy = Math.sin(rad) * 22
        const dot = polar(n.angle, RING - NODE_R + 9)
        return (
          <g
            key={n.label}
            filter="url(#cxc-shadow)"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? "translate(0,0)" : `translate(${dx}px,${dy}px)`,
              transition: `opacity 0.5s ease-out ${0.15 + i * 0.12}s, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${0.15 + i * 0.12}s`,
            }}
          >
            <circle cx={pos.x} cy={pos.y} r={NODE_R} fill="white" stroke="#D6E0EA" strokeWidth="1" />
            <circle cx={dot.x} cy={dot.y} r="3" fill="#0D9DAA" opacity="0.75" />
            <text x={pos.x} y={pos.y + 1} textAnchor="middle" dominantBaseline="middle" fontSize="10.5" fontWeight="600" fill="#0B1F3A" style={SANS}>
              {n.label}
            </text>
          </g>
        )
      })}

      <ClinaxCore id="cxc" cx={CX} cy={CY} r={CORE_R} active={active} />
      {CONNECT_NODES.map((n) => {
        const d = polar(n.angle, CORE_R - 1)
        return <circle key={n.label} cx={d.x} cy={d.y} r="2.5" fill="white" opacity={active ? 0.6 : 0} style={{ transition: "opacity 0.4s ease-out 1s" }} />
      })}
    </svg>
  )
}

// Step 2 visual — three layers of clinic work (patient journey, team
// coordination, daily operations) laid out as connected flows and tied
// together by a single "shared context" spine on the left.
const OPERATE_ROWS: { label: string; nodes: string[]; mode: "forward" | "exchange" }[] = [
  { label: "Patient journey", nodes: ["Booking", "Consultation", "Treatment", "Follow-up"], mode: "forward" },
  { label: "Team coordination", nodes: ["Reception", "Therapist", "Clinic team"], mode: "exchange" },
  { label: "Clinic operations", nodes: ["Scheduling", "Coordination", "Daily operations"], mode: "exchange" },
]

function OperateVisual({ active }: { active: boolean }) {
  const SPINE_X = 24
  const X0 = 66
  const X1 = 330
  const ROW_H = 96
  const TOP = 20
  const lineY = (i: number) => TOP + i * ROW_H + 30

  return (
    <svg viewBox="0 0 380 300" className="w-full h-auto max-w-[400px]" fill="none" aria-hidden="true">
      {/* Shared-context spine */}
      <g style={riseStyle(active, 0.7, 0)}>
        <line x1={SPINE_X} y1={lineY(0)} x2={SPINE_X} y2={lineY(2)} pathLength={1} stroke="#0D9DAA" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" style={drawStyle(active, 0.7, 0.9)} />
        <text
          x={SPINE_X - 13}
          y={(lineY(0) + lineY(2)) / 2}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="8.5"
          fontWeight="600"
          fill="#0D9DAA"
          letterSpacing="0.14em"
          transform={`rotate(-90 ${SPINE_X - 13} ${(lineY(0) + lineY(2)) / 2})`}
          style={SANS}
        >
          SHARED CONTEXT
        </text>
      </g>

      {OPERATE_ROWS.map((row, i) => {
        const y = lineY(i)
        const step = (X1 - X0) / (row.nodes.length - 1)
        const delay = 0.1 + i * 0.2
        return (
          <g key={row.label} style={riseStyle(active, delay)}>
            <text x={X0 - 6} y={y - 20} fontSize="9.5" fontWeight="600" fill="#5A7189" letterSpacing="0.12em" style={SANS}>
              {row.label.toUpperCase()}
            </text>

            {/* Junction to spine + base track */}
            <line x1={SPINE_X} y1={y} x2={X0} y2={y} stroke="#D6E0EA" strokeWidth="1.2" />
            <circle cx={SPINE_X} cy={y} r="3" fill="#0D9DAA" opacity={active ? 0.8 : 0} style={{ transition: `opacity 0.4s ease-out ${1 + i * 0.2}s` }} />
            <line x1={X0} y1={y} x2={X1} y2={y} stroke="#D6E0EA" strokeWidth="1.2" />
            <line x1={X0} y1={y} x2={X1} y2={y} pathLength={1} stroke="#0D9DAA" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" style={drawStyle(active, delay + 0.15, 0.9)} />

            {/* Direction markers between nodes */}
            {row.nodes.slice(1).map((_, j) => {
              const mx = X0 + step * j + step / 2
              return row.mode === "forward" ? (
                <path key={j} d={`M${mx - 2} ${y - 3.5} L${mx + 1.5} ${y} L${mx - 2} ${y + 3.5}`} stroke="#0D9DAA" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" opacity="0.8" />
              ) : (
                <path
                  key={j}
                  d={`M${mx - 3} ${y - 3.5} L${mx - 6.5} ${y} L${mx - 3} ${y + 3.5} M${mx + 3} ${y - 3.5} L${mx + 6.5} ${y} L${mx + 3} ${y + 3.5}`}
                  stroke="#0D9DAA"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.8"
                />
              )
            })}

            {/* Moving signal */}
            {row.mode === "forward" ? (
              <circle
                cx={X0}
                cy={y}
                r="4.5"
                fill="#0D9DAA"
                style={{ opacity: 0, animation: active ? `clinaxTravel 4.4s ease-in-out 1.6s infinite` : "none", ["--travel" as string]: `${X1 - X0}px` }}
              />
            ) : (
              <line
                x1={X0}
                y1={y}
                x2={X1}
                y2={y}
                pathLength={1}
                stroke="#0D9DAA"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray="0.06 1"
                style={{ opacity: 0, animation: active ? `clinaxExchange 3.6s ease-in-out ${1.6 + i * 0.9}s infinite alternate` : "none" }}
              />
            )}

            {/* Nodes */}
            {row.nodes.map((label, j) => {
              const x = X0 + step * j
              return (
                <g key={label} style={riseStyle(active, delay + 0.25 + j * 0.1, 4)}>
                  <circle cx={x} cy={y} r="6" fill="white" stroke="#0D9DAA" strokeWidth="1.5" />
                  <circle cx={x} cy={y} r="2" fill="#0D9DAA" />
                  <text x={x} y={y + 22} textAnchor="middle" fontSize="10.5" fontWeight="500" fill="#0B1F3A" style={SANS}>
                    {label}
                  </text>
                </g>
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}

// Step 3 visual — one core branching into more people, services and
// locations. Each branch fans out into "more", yet every line traces back
// to the same core, so growth reads as structured rather than sprawling.
const SCALE_BRANCHES = [
  { label: "People", more: "More people", outcome: "Coordinated", x: 66 },
  { label: "Services", more: "More services", outcome: "Connected", x: 190 },
  { label: "Locations", more: "More locations", outcome: "Visible", x: 314 },
]

function ScaleVisual({ active }: { active: boolean }) {
  const CX = 190
  const CORE_Y = 50
  const CORE_R = 34
  const NODE_Y = 170
  const NODE_R = 28
  const FAN_Y = 228

  return (
    <svg viewBox="0 0 380 292" className="w-full h-auto max-w-[400px]" fill="none" aria-hidden="true">
      <CoreDefs id="cxs" />

      {/* Slow expanding ring behind the core */}
      <circle
        cx={CX}
        cy={CORE_Y}
        r={CORE_R + 6}
        stroke="#0D9DAA"
        strokeWidth="1"
        style={{ opacity: 0, transformOrigin: `${CX}px ${CORE_Y}px`, animation: active ? "clinaxExpand 4s ease-out 1.2s infinite" : "none" }}
      />

      {SCALE_BRANCHES.map((b, i) => {
        const d = b.x === CX ? `M${CX} ${CORE_Y + CORE_R} L${b.x} ${NODE_Y - NODE_R}` : `M${CX} ${CORE_Y + CORE_R} C${CX} ${CORE_Y + CORE_R + 44} ${b.x} ${NODE_Y - NODE_R - 44} ${b.x} ${NODE_Y - NODE_R}`
        const baseDelay = 0.2 + i * 0.15
        const fan = [-18, 0, 18]
        return (
          <g key={b.label}>
            {/* Branch from core */}
            <path d={d} pathLength={1} stroke="#0D9DAA" strokeWidth="1.5" strokeLinecap="round" opacity="0.7" style={drawStyle(active, baseDelay, 0.8)} />

            {/* Node */}
            <g filter="url(#cxs-shadow)" style={riseStyle(active, baseDelay + 0.45)}>
              <circle cx={b.x} cy={NODE_Y} r={NODE_R} fill="white" stroke="#D6E0EA" strokeWidth="1" />
              <circle cx={b.x} cy={NODE_Y - NODE_R + 9} r="3" fill="#0D9DAA" opacity="0.75" />
              <text x={b.x} y={NODE_Y + 2} textAnchor="middle" dominantBaseline="middle" fontSize="11" fontWeight="600" fill="#0B1F3A" style={SANS}>
                {b.label}
              </text>
            </g>

            {/* Fan out into "more", still tied to the node */}
            <path
              d={`M${b.x} ${NODE_Y + NODE_R} V${FAN_Y - 14} M${b.x - 18} ${FAN_Y - 14} H${b.x + 18} M${b.x - 18} ${FAN_Y - 14} V${FAN_Y - 6} M${b.x} ${FAN_Y - 14} V${FAN_Y - 6} M${b.x + 18} ${FAN_Y - 14} V${FAN_Y - 6}`}
              pathLength={1}
              stroke="#0D9DAA"
              strokeWidth="1.2"
              strokeLinecap="round"
              opacity="0.5"
              style={drawStyle(active, baseDelay + 0.85, 0.6)}
            />
            {fan.map((off, j) => (
              <circle
                key={off}
                cx={b.x + off}
                cy={FAN_Y}
                r="5"
                fill="white"
                stroke="#0D9DAA"
                strokeWidth="1.4"
                style={riseStyle(active, baseDelay + 1.05 + j * 0.1, 4)}
              />
            ))}

            {/* Outcome */}
            <g style={riseStyle(active, baseDelay + 1.3, 6)}>
              <text x={b.x} y={FAN_Y + 26} textAnchor="middle" fontSize="10" fill="#5A7189" style={SANS}>
                {b.more}
              </text>
              <text x={b.x} y={FAN_Y + 43} textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#0D9DAA" letterSpacing="0.12em" style={SANS}>
                {b.outcome.toUpperCase()}
              </text>
            </g>
          </g>
        )
      })}

      <ClinaxCore id="cxs" cx={CX} cy={CORE_Y} r={CORE_R} active={active} />
    </svg>
  )
}

const MODEL_STEPS = [
  {
    index: "01",
    label: "CONNECT",
    headline: "Bring your clinic together.",
    description:
      "Connect patient information, care journeys, teams and everyday clinic operations through one connected foundation.",
    Visual: ConnectVisual,
  },
  {
    index: "02",
    label: "OPERATE",
    headline: "Make everyday work flow better.",
    description:
      "Help teams work with greater shared context and reduce unnecessary manual coordination across the clinic.",
    Visual: OperateVisual,
  },
  {
    index: "03",
    label: "SCALE",
    headline: "Grow without losing control.",
    description:
      "Build the structure and visibility needed to confidently expand teams, services, patient volumes and locations.",
    Visual: ScaleVisual,
  },
]

function ModelStep({ step, isLast }: { step: (typeof MODEL_STEPS)[number]; isLast: boolean }) {
  const { ref, inView } = useInView(0.35)
  const { Visual } = step

  return (
    <div ref={ref}>
      <div
        className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(16px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        {/* Copy */}
        <div style={{ fontFamily: "var(--font-clinax-sans)" }}>
          <div className="flex items-center gap-3 mb-5">
            <span className="w-9 h-9 rounded-full bg-[#0D9DAA]/10 border border-[#0D9DAA]/25 flex items-center justify-center text-[#0D9DAA] text-xs font-semibold">
              {step.index}
            </span>
            <p className="text-[#0D9DAA] text-[11px] font-semibold tracking-[0.16em] uppercase">{step.label}</p>
          </div>
          <h3
            style={{ fontFamily: "var(--font-clinax-serif)" }}
            className="text-2xl sm:text-[1.75rem] leading-[1.2] text-[#0B1F3A] mb-4"
          >
            {step.headline}
          </h3>
          <p className="text-[#5A7189] text-[0.9375rem] leading-[1.7] font-light max-w-md">{step.description}</p>
        </div>

        {/* Visual */}
        <div className="flex justify-center items-center bg-white border border-[#D6E0EA] rounded-2xl px-3 py-6 sm:px-7 sm:py-7 min-h-[280px] md:min-h-[340px]">
          <Visual active={inView} />
        </div>
      </div>

      {/* Connector to next step */}
      {!isLast && (
        <div className="flex justify-center py-6" aria-hidden="true">
          <div className="flex flex-col items-center gap-1">
            <div
              className="w-px bg-linear-to-b from-[#0D9DAA]/50 to-[#0D9DAA]/10"
              style={{
                height: inView ? "40px" : "0px",
                transition: "height 0.6s ease-out 0.2s",
              }}
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

function ClinaxModel() {
  return (
    <section id="how-it-works" className="py-28 bg-white border-t border-[#D6E0EA]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-2xl mb-20" style={{ fontFamily: "var(--font-clinax-sans)" }}>
          <p className="text-[#0D9DAA] text-[11px] font-semibold tracking-[0.16em] uppercase mb-5">The Clinax Model</p>
          <h2 style={{ fontFamily: "var(--font-clinax-serif)" }} className="text-4xl sm:text-[2.6rem] leading-[1.1] text-[#0B1F3A] mb-6">
            Connect. Operate. Scale.
          </h2>
          <p className="text-[#5A7189] text-[0.9375rem] leading-[1.7] font-light max-w-lg">
            Clinax is designed to help physiotherapy and rehabilitation clinics build a connected foundation for the way
            they work today—and the way they grow tomorrow.
          </p>
        </div>

        <div className="flex flex-col">
          {MODEL_STEPS.map((step, i) => (
            <ModelStep key={step.index} step={step} isLast={i === MODEL_STEPS.length - 1} />
          ))}
        </div>
      </div>

      {/* Shared motion for the model visuals. Every stroke uses pathLength="1",
          so dash offsets below are in normalised 0→1 units. */}
      <style>{`
        @keyframes clinaxPulseIn {
          0% { stroke-dashoffset: 1.08; opacity: 0; }
          15% { opacity: 0.9; }
          85% { opacity: 0.9; }
          100% { stroke-dashoffset: 0; opacity: 0; }
        }
        @keyframes clinaxTravel {
          0% { transform: translateX(0); opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { transform: translateX(var(--travel)); opacity: 0; }
        }
        @keyframes clinaxExchange {
          0% { stroke-dashoffset: 1.06; opacity: 0.9; }
          100% { stroke-dashoffset: 0; opacity: 0.9; }
        }
        @keyframes clinaxExpand {
          0% { transform: scale(1); opacity: 0.35; }
          100% { transform: scale(1.45); opacity: 0; }
        }
        @media (prefers-reduced-motion: reduce) {
          #how-it-works * { animation: none !important; transition-duration: 0.01ms !important; }
        }
      `}</style>
    </section>
  )
}

// ─── Contact anchor ──────────────────────────────────────────────────────────

function ContactAnchor() {
  return (
    <section id="contact" className="py-24 bg-[#0B1F3A] border-t border-[#1A3558]">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-[#0D9DAA] text-[11px] font-semibold tracking-[0.16em] uppercase mb-5" style={{ fontFamily: "var(--font-clinax-sans)" }}>
          Get Started
        </p>
        <h2 style={{ fontFamily: "var(--font-clinax-serif)" }} className="text-3xl sm:text-4xl text-white mb-5 leading-snug">
          See Clinax in action.
        </h2>
        <p className="text-[#6B8BA8] text-[0.9375rem] mb-10 font-light leading-relaxed" style={{ fontFamily: "var(--font-clinax-sans)" }}>
          Request a personalised demo and discover how Clinax can bring your clinic operations together.
        </p>
        <a
          href="mailto:info@truespur.ai?subject=Clinax Demo Request"
          className="inline-flex items-center gap-2.5 bg-[#0D9DAA] text-white text-sm font-medium px-8 py-3.5 rounded-md hover:bg-[#0B8A96] transition-colors duration-150"
          style={{ fontFamily: "var(--font-clinax-sans)" }}
        >
          Request a Demo
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M2.5 6.5h8M7.5 3.5l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="bg-[#071628] border-t border-[#1A3558] py-6" style={{ fontFamily: "var(--font-clinax-sans)" }}>
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
        <p className="text-[#3A5570] text-xs">© {new Date().getFullYear()} TrueSpur. Clinax is a product of TrueSpur.</p>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded bg-[#0D9DAA]/20 flex items-center justify-center">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <circle cx="4" cy="4" r="1.5" fill="#0D9DAA" />
              <path d="M4 1v1M4 6v1M1 4h1M6 4h1" stroke="#0D9DAA" strokeWidth="0.8" strokeLinecap="round" />
            </svg>
          </div>
          <span className="text-[#3A5570] text-xs tracking-wide">
            Clinax <span className="text-[#1A3558]">·</span> by TrueSpur
          </span>
        </div>
      </div>
    </footer>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function ClinaxPage() {
  return (
    <>
      <ClinaxNav />
      <main>
        <Hero />
        {/* "Who It's For" anchor - nav scrolls here; maps to the Problem section context */}
        <div id="who-its-for" />
        <Problem />
        <Shift />
        <ClinaxModel />
        <ContactAnchor />
      </main>
      <Footer />
    </>
  )
}
