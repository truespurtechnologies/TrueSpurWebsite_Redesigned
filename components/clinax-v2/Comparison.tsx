"use client"

import { C, GRADIENT } from "./theme"
import { COMPARE_COLUMNS, COMPARE_ROWS, type Mark } from "./content"
import { useInView, riseStyle } from "./motion"
import { SectionHeading, PrimaryButton } from "./ui"

function MarkIcon({ mark }: { mark: Mark }) {
  if (mark === "yes") {
    return (
      <span className="inline-flex w-6 h-6 rounded-full items-center justify-center" style={{ background: GRADIENT }} aria-label="Yes">
        <svg width="11" height="11" viewBox="0 0 10 10" fill="none" aria-hidden="true">
          <path d="M2 5.2l2.2 2.2L8 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    )
  }
  if (mark === "partial") {
    return (
      <span className="inline-flex w-6 h-6 rounded-full items-center justify-center" style={{ background: C.lavenderTint }} aria-label="Partial">
        <span className="w-2.5 h-0.5 rounded-full" style={{ background: C.violet }} />
      </span>
    )
  }
  return (
    <span className="inline-flex w-6 h-6 rounded-full items-center justify-center" style={{ background: C.peach }} aria-label="No">
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
        <path d="M1.5 1.5l6 6M7.5 1.5l-6 6" stroke={C.brown} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </span>
  )
}

export default function Comparison() {
  const { ref, inView } = useInView(0.15)
  return (
    <section id="compare" className="py-24 sm:py-28 bg-white scroll-mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <SectionHeading
          eyebrow="Why clinics choose Clinax"
          title="Purpose-built for how a rehab clinic actually runs."
          sub="Not a chat app with a spreadsheet behind it. Not a generic billing system with a notes field. A clinical operating system."
        />

        <div ref={ref} className="relative" style={riseStyle(inView, 0)}>
          <div className="overflow-x-auto -mx-5 px-5 sm:mx-0 sm:px-0">
          <table className="w-full min-w-[720px] border-separate border-spacing-0 text-[14px]">
            <thead>
              <tr>
                <th className="text-left font-semibold py-4 pr-4 align-bottom sticky left-0 z-10 bg-white" style={{ color: C.muted }}>
                  Capability
                </th>
                {COMPARE_COLUMNS.map((col, i) => (
                  <th
                    key={col}
                    className={`py-4 px-3 text-center align-bottom font-bold ${i === 0 ? "rounded-t-2xl text-white" : ""}`}
                    style={i === 0 ? { background: GRADIENT } : { color: C.ink }}
                  >
                    {i === 0 ? (
                      <span className="flex flex-col items-center gap-1">
                        <span className="text-[10px] font-bold tracking-[0.14em] uppercase opacity-85">Built for you</span>
                        <span className="text-[15px]">{col}</span>
                      </span>
                    ) : (
                      <span className="text-[13px] font-semibold" style={{ color: C.muted }}>{col}</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, r) => (
                <tr key={row.feature}>
                  <td className="py-4 pr-4 font-medium border-t sticky left-0 z-10 bg-white" style={{ color: C.ink, borderColor: C.lavender }}>
                    {row.feature}
                  </td>
                  {row.marks.map((m, i) => (
                    <td
                      key={i}
                      className={`py-4 px-3 text-center border-t ${i === 0 && r === COMPARE_ROWS.length - 1 ? "rounded-b-2xl" : ""}`}
                      style={{ borderColor: i === 0 ? "rgba(255,255,255,0.35)" : C.lavender, background: i === 0 ? C.surface : undefined }}
                    >
                      <MarkIcon mark={m} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          {/* scroll affordance on small screens */}
          <div className="absolute inset-y-0 right-0 w-10 pointer-events-none sm:hidden" style={{ background: "linear-gradient(270deg, rgba(255,255,255,0.95), transparent)" }} aria-hidden="true" />
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px]" style={{ color: C.muted }}>
          <span className="flex items-center gap-2"><MarkIcon mark="yes" /> Included</span>
          <span className="flex items-center gap-2"><MarkIcon mark="partial" /> Partial / manual workaround</span>
          <span className="flex items-center gap-2"><MarkIcon mark="no" /> Not available</span>
          <span className="ml-auto">Generic categories, not specific vendors.</span>
        </div>

        <div className="mt-12 text-center">
          <PrimaryButton href="#demo" size="lg">See it with your workflows</PrimaryButton>
        </div>
      </div>
    </section>
  )
}
