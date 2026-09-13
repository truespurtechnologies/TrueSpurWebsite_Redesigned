"use client"

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
    <section id="how-it-works" className="py-28 bg-[#F8F9FB] border-t border-[#D6E0EA]">
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
        <ContactAnchor />
      </main>
      <Footer />
    </>
  )
}
