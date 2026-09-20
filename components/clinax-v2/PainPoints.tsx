"use client"

import { C, HEADING } from "./theme"
import { PAIN_POINTS } from "./content"
import { useInView, riseStyle } from "./motion"
import { SectionHeading, PrimaryButton } from "./ui"

const PAIN_ICONS = [
  // chat bubble — WhatsApp groups
  <path key="chat" d="M10 3a7 7 0 0 1 7 7 7 7 0 0 1-7 7c-1.3 0-2.5-.3-3.5-.9L3 17l1-3.3A7 7 0 0 1 3 10a7 7 0 0 1 7-7z" />,
  // spreadsheet grid
  <path key="grid" d="M4 4h12v12H4V4z M4 8.5h12 M9.5 4v12" />,
  // clock — hours per week
  <path key="clock" d="M10 3a7 7 0 1 0 0 14 7 7 0 0 0 0-14z M10 6.5V10l2.5 2" />,
  // layers — places a history lives
  <path key="layers" d="M10 3l7 3.5-7 3.5-7-3.5L10 3z M3.5 10.5l6.5 3.25 6.5-3.25 M3.5 14l6.5 3.25L16.5 14" />,
]

export default function PainPoints() {
  const { ref, inView } = useInView(0.2)
  return (
    <section className="py-24 sm:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Sound familiar?"
          title={
            <>
              Evenings spent <em className="not-italic" style={{ color: C.magenta }}>reconciling</em> what happened during the day.
            </>
          }
          sub="A growing clinic doesn't run on one system. It runs on a dozen half-systems held together by the people at the front desk."
        />

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {PAIN_POINTS.map((p, i) => (
            <div
              key={p.unit}
              className="rounded-2xl p-6 sm:p-7 flex flex-col"
              style={{ ...riseStyle(inView, i * 0.08), background: C.peach, border: "1px solid #F3DFC9" }}
            >
              <span className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: "#F3DFC9", color: C.brown }}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {PAIN_ICONS[i]}
                </svg>
              </span>
              <p className="text-[2.6rem] leading-none font-bold" style={{ ...HEADING, color: C.brown }}>
                {p.value}
              </p>
              <p className="mt-2 text-[12px] font-bold tracking-[0.12em] uppercase" style={{ color: C.brown }}>
                {p.unit}
              </p>
              <p className="mt-4 text-[14.5px] leading-[1.6]" style={{ color: C.ink }}>
                {p.text}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-5 text-center text-[12px]" style={{ color: C.muted }}>
          Illustrative scenario for a two-branch physiotherapy clinic. Your numbers will differ — that&apos;s the point.
        </p>

        <div className="mt-12 text-center">
          <p className="text-[1.5rem] sm:text-[1.9rem] font-bold leading-tight" style={{ ...HEADING, color: C.ink }}>
            You opened a clinic to treat patients,
            <br />
            not to be the integration layer.
          </p>
          <div className="mt-7">
            <PrimaryButton href="#demo">Get rid of it</PrimaryButton>
          </div>
        </div>
      </div>
    </section>
  )
}
