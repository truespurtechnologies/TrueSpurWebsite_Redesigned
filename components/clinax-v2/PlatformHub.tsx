"use client"

import { useRef, useState, type KeyboardEvent } from "react"
import Image from "next/image"
import { C, GRADIENT, HEADING } from "./theme"
import { FEATURE_TABS, HUB_SPOKES } from "./content"
import { useInView, riseStyle } from "./motion"
import { SectionHeading } from "./ui"

// ─── Hub-and-spoke diagram ───────────────────────────────────────────────────

function HubDiagram({ active }: { active: boolean }) {
  const CX = 300
  const CY = 150
  const spokes = [
    { x: 70, y: 46 },
    { x: 530, y: 46 },
    { x: 70, y: 254 },
    { x: 530, y: 254 },
  ]
  return (
    <svg viewBox="0 0 600 300" className="w-full h-auto max-w-[760px] mx-auto" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cx2-core" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={C.violet} />
          <stop offset="100%" stopColor={C.magenta} />
        </linearGradient>
        <filter id="cx2-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="14" />
        </filter>
      </defs>

      {/* lines */}
      {spokes.map((s, i) => {
        const dir = s.x < CX ? 1 : -1
        const d = `M${s.x + dir * 92} ${s.y} C ${CX - dir * 90} ${s.y}, ${CX - dir * 110} ${CY}, ${CX - dir * 64} ${CY}`
        return (
          <g key={i}>
            <path d={d} stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" />
            <path
              d={d}
              pathLength={1}
              stroke="url(#cx2-core)"
              strokeWidth="2"
              strokeLinecap="round"
              style={{ strokeDasharray: 1, strokeDashoffset: active ? 0 : 1, transition: `stroke-dashoffset 1s ease-out ${0.3 + i * 0.12}s` }}
            />
            <circle r="3.5" fill={C.white} style={{ opacity: 0, offsetPath: `path("${d}")`, animation: active ? `cx2Flow 3.6s ease-in-out ${1.4 + i * 0.6}s infinite` : "none" }} />
          </g>
        )
      })}

      {/* core */}
      <circle cx={CX} cy={CY} r="70" fill={C.magenta} opacity="0.45" filter="url(#cx2-glow)" />
      <circle cx={CX} cy={CY} r="60" fill="url(#cx2-core)" />
      <circle cx={CX} cy={CY} r="60" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
      <text x={CX} y={CY - 6} textAnchor="middle" fontSize="17" fontWeight="800" fill="white" letterSpacing="0.02em" style={{ fontFamily: "var(--font-cx2-body)" }}>
        Clinax
      </text>
      <text x={CX} y={CY + 13} textAnchor="middle" fontSize="8.5" fontWeight="700" fill="white" opacity="0.8" letterSpacing="0.16em" style={{ fontFamily: "var(--font-cx2-body)" }}>
        CLINICAL OS
      </text>

      {/* spokes */}
      {HUB_SPOKES.map((sp, i) => {
        const s = spokes[i]
        return (
          <g key={sp.label} style={riseStyle(active, 0.2 + i * 0.1, 6)}>
            <rect x={s.x - 92} y={s.y - 30} width="184" height="60" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.14)" />
            <circle cx={s.x - 74} cy={s.y} r="4" fill={C.magenta} />
            <text x={s.x - 62} y={s.y - 4} fontSize="12.5" fontWeight="700" fill="white" style={{ fontFamily: "var(--font-cx2-body)" }}>
              {sp.label}
            </text>
            <text x={s.x - 62} y={s.y + 13} fontSize="9.5" fill={C.lilac} style={{ fontFamily: "var(--font-cx2-body)" }}>
              {sp.detail}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── Tabbed feature explorer ─────────────────────────────────────────────────

function FeatureExplorer() {
  const [tab, setTab] = useState(0)
  const [sub, setSub] = useState(0)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const current = FEATURE_TABS[tab]
  const screen = current.subSteps ? current.subSteps[sub] : current.screen

  const goTo = (i: number) => {
    const next = (i + FEATURE_TABS.length) % FEATURE_TABS.length
    setTab(next)
    setSub(0)
    tabRefs.current[next]?.focus()
  }

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(tab + 1) }
    else if (e.key === "ArrowLeft") { e.preventDefault(); goTo(tab - 1) }
    else if (e.key === "Home") { e.preventDefault(); goTo(0) }
    else if (e.key === "End") { e.preventDefault(); goTo(FEATURE_TABS.length - 1) }
  }

  const onSubKeyDown = (e: KeyboardEvent) => {
    const n = current.subSteps?.length ?? 0
    if (!n) return
    if (e.key === "ArrowRight") { e.preventDefault(); setSub((sub + 1) % n) }
    else if (e.key === "ArrowLeft") { e.preventDefault(); setSub((sub - 1 + n) % n) }
    else if (e.key === "Home") { e.preventDefault(); setSub(0) }
    else if (e.key === "End") { e.preventDefault(); setSub(n - 1) }
  }

  return (
    <div className="mt-16">
      {/* Tab strip */}
      <div role="tablist" aria-label="Clinax modules" onKeyDown={onKeyDown} className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {FEATURE_TABS.map((t, i) => {
          const selected = i === tab
          return (
            <button
              key={t.key}
              ref={(el) => { tabRefs.current[i] = el }}
              role="tab"
              id={`cx2-tab-${t.key}`}
              aria-selected={selected}
              aria-controls={`cx2-panel-${t.key}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => { setTab(i); setSub(0) }}
              className="whitespace-nowrap rounded-full px-5 py-2.5 text-[14px] font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              style={
                selected
                  ? { background: GRADIENT, color: C.white, boxShadow: "0 10px 26px -12px rgba(196,24,147,0.7)" }
                  : { background: "rgba(255,255,255,0.07)", color: C.lavenderTint, border: "1px solid rgba(255,255,255,0.12)" }
              }
            >
              {t.label}
            </button>
          )
        })}
      </div>

      {/* Panel */}
      <div
        role="tabpanel"
        id={`cx2-panel-${current.key}`}
        aria-labelledby={`cx2-tab-${current.key}`}
        className="mt-8 grid lg:grid-cols-12 gap-8 lg:gap-10 items-center"
      >
        <div className="lg:col-span-4 min-w-0">
          <p className="text-[11px] font-bold tracking-[0.16em] uppercase" style={{ color: C.magenta }}>
            {String(tab + 1).padStart(2, "0")} — {current.label}
          </p>
          <h3 className="mt-3 text-[1.7rem] sm:text-[2rem] leading-[1.15] font-bold text-white" style={HEADING}>
            {current.headline}
          </h3>
          <p className="mt-4 text-[15px] leading-[1.65]" style={{ color: C.lilac }}>
            {current.description}
          </p>
          <ul className="mt-6 flex flex-col gap-3">
            {current.bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-[14.5px]" style={{ color: C.lavenderTint }}>
                <span className="mt-1 w-4 h-4 rounded-full shrink-0 flex items-center justify-center" style={{ background: GRADIENT }}>
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M2 5.2l2.2 2.2L8 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {b}
              </li>
            ))}
          </ul>

          {current.subSteps && (
            <div className="mt-7 flex flex-wrap gap-2" role="tablist" aria-label="Clinical workflow steps" onKeyDown={onSubKeyDown}>
              {current.subSteps.map((s, i) => (
                <button
                  key={s.key}
                  role="tab"
                  aria-selected={i === sub}
                  tabIndex={i === sub ? 0 : -1}
                  onClick={() => setSub(i)}
                  className="rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold cursor-pointer transition-colors"
                  style={
                    i === sub
                      ? { background: C.white, color: C.violetDeep }
                      : { background: "rgba(255,255,255,0.08)", color: C.lavenderTint, border: "1px solid rgba(255,255,255,0.14)" }
                  }
                >
                  {i + 1}. {s.label}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-8 min-w-0">
          <div className="rounded-2xl overflow-hidden bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)]" style={{ border: "1px solid rgba(255,255,255,0.14)" }}>
            <div className="flex items-center gap-2 px-4 py-2.5 border-b" style={{ background: C.surface, borderColor: C.lavender }}>
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: C.lavender }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: C.lavender }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ background: C.lavender }} />
              <span className="ml-2 text-[10.5px] font-bold tracking-[0.14em] uppercase" style={{ color: C.muted }}>
                Clinax · {current.label}{current.subSteps ? ` · ${current.subSteps[sub].label}` : ""}
              </span>
            </div>
            <div className="overflow-x-auto">
              <Image
                key={screen.src}
                src={screen.src}
                alt={screen.alt}
                width={screen.width}
                height={screen.height}
                sizes="(min-width: 1024px) 60vw, (min-width: 640px) 92vw, 640px"
                className="w-full min-w-[640px] h-auto block cx2-fade-in"
              />
            </div>
            <div className="px-4 py-2 border-t" style={{ background: C.surface, borderColor: C.lavender }}>
              <p className="text-[10.5px] font-medium tracking-wide" style={{ color: C.muted }}>
                Demonstration data · fictional clinic
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

export default function PlatformHub() {
  const { ref, inView } = useInView(0.25)
  return (
    <section id="platform" className="relative py-24 sm:py-28 overflow-hidden scroll-mt-20" style={{ background: C.violetDeep }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: `radial-gradient(800px 500px at 50% 0%, rgba(91,15,193,0.6), transparent 65%), radial-gradient(700px 400px at 100% 100%, rgba(196,24,147,0.25), transparent 65%)` }}
      />
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          dark
          eyebrow="The platform"
          title={<>One platform. Every moving part of your clinic.</>}
          sub="Patient operations, clinical care, clinic operations and leadership visibility — connected, from a single branch to a multi-specialty organisation."
        />

        <div ref={ref} className="hidden md:block">
          <HubDiagram active={inView} />
        </div>

        {/* Compact fallback — the SVG spoke labels are too small to read on phones */}
        <div className="mt-12 grid grid-cols-2 gap-3 md:hidden">
          {HUB_SPOKES.map((sp) => (
            <div
              key={sp.label}
              className="rounded-2xl p-4"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)" }}
            >
              <p className="flex items-center gap-2 text-[13.5px] font-bold text-white">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: C.magenta }} />
                {sp.label}
              </p>
              <p className="mt-1.5 text-[12px] leading-snug" style={{ color: C.lilac }}>
                {sp.detail}
              </p>
            </div>
          ))}
        </div>

        <FeatureExplorer />
      </div>

      <style>{`
        @keyframes cx2Flow { 0% { offset-distance: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }
        @keyframes cx2FadeIn { from { opacity: 0; } to { opacity: 1; } }
        .cx2-fade-in { animation: cx2FadeIn 0.35s ease-out; }
        @media (prefers-reduced-motion: reduce) { #platform * { animation: none !important; transition-duration: 0.01ms !important; } }
      `}</style>
    </section>
  )
}
