import { CheckCircle2, ChevronDown, Code2, Lightbulb, PenLine, Rocket, Search, Target, type LucideIcon } from 'lucide-react'

interface JourneyStep {
  id: number
  title: string
  tagline: string
  outcome: string
  icon: LucideIcon
}

interface FounderJourneyVisualizationProps {
  className?: string
}

// Vertical center (px) of each numbered node within the 192px desktop track.
// The curve rises gently from IDEA (left) toward the REAL IMPACT flag (right).
const NODE_Y = [160, 148, 132, 114, 96]
const NODE_COLORS = ['#fdba74', '#fb923c', '#fb923c', '#f97316', '#f97316']

function FlagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path d="M6 21V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M6 4h12l-3.5 4L18 12H6Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  )
}

/** Mobile flow link between two stages — keeps the journey reading as one continuous path. */
function FlowConnector() {
  return (
    <div className="relative flex h-10 items-center justify-center" aria-hidden="true">
      <span className="absolute inset-y-0 w-0.5 rounded-full bg-linear-to-b from-orange-200 via-orange-300 to-orange-200" />
      <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-orange-50 text-orange-400 ring-1 ring-orange-200">
        <ChevronDown className="h-3 w-3" strokeWidth={2.5} />
      </span>
    </div>
  )
}

export function FounderJourneyVisualization({ className = "" }: FounderJourneyVisualizationProps) {
  const journeySteps: JourneyStep[] = [
    { id: 1, title: 'Validate', tagline: 'Test demand first', outcome: 'Right problem? Real demand.', icon: Search },
    { id: 2, title: 'Define', tagline: 'Scope your MVP', outcome: 'Clear scope. Maximum impact.', icon: Target },
    { id: 3, title: 'Design', tagline: 'Create experiences people love', outcome: 'Usable. Valuable. Delightful.', icon: PenLine },
    { id: 4, title: 'Build', tagline: 'Develop for scale and reliability', outcome: 'Quality code. Built to scale.', icon: Code2 },
    { id: 5, title: 'Launch & Learn', tagline: 'Ship with confidence and iterate', outcome: 'Learn fast. Improve always.', icon: Rocket },
  ]

  return (
    <div className={`mt-16 max-w-6xl mx-auto ${className}`}>

      {/* ==================== MOBILE & TABLET: stacked journey flow ==================== */}
      <div className="mx-auto max-w-md lg:hidden">

        {/* Journey start */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full border border-orange-200 bg-white py-2 pl-2 pr-5 shadow-sm shadow-orange-500/10">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-orange-50 text-orange-500 ring-1 ring-inset ring-orange-200/70">
              <Lightbulb className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </span>
            <span className="font-heading text-[11px] font-bold tracking-[0.22em] text-gray-900">IDEA</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">Where every journey begins</p>
        </div>

        <FlowConnector />

        <ol>
          {journeySteps.map((step, index) => {
            const Icon = step.icon
            const isFinal = index === journeySteps.length - 1

            return (
              <li key={step.id}>
                {index > 0 && <FlowConnector />}
                <div
                  className={`rounded-2xl p-px shadow-lg shadow-orange-950/5 ${
                    isFinal
                      ? 'bg-linear-to-b from-orange-400/70 via-orange-200/60 to-orange-100/50'
                      : 'bg-linear-to-b from-orange-200/80 via-orange-100/50 to-orange-100/40'
                  }`}
                >
                  <article className="relative overflow-hidden rounded-[calc(1rem-1px)] bg-white">
                    <span
                      className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-orange-50/70 to-transparent"
                      aria-hidden="true"
                    />
                    <div className="relative p-5">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-1 ring-inset ${
                            isFinal
                              ? 'bg-linear-to-br from-orange-500 to-orange-600 text-white shadow-md shadow-orange-500/25 ring-orange-400/40'
                              : 'bg-linear-to-br from-orange-50 to-orange-100/80 text-orange-500 ring-orange-200/60'
                          }`}
                        >
                          <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
                        </div>
                        <div className="min-w-0 text-left">
                          <p className="font-heading text-[10px] font-bold tracking-[0.22em] text-orange-500">
                            STEP {String(step.id).padStart(2, '0')}
                          </p>
                          <h3 className="mt-1 font-heading text-lg font-bold leading-tight text-gray-900">
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      <p className="mt-4 text-left text-sm leading-relaxed text-gray-600">{step.tagline}</p>
                      <div className="mt-4 flex items-center gap-2 rounded-xl bg-orange-50/80 px-3.5 py-2.5 text-left ring-1 ring-inset ring-orange-100">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-orange-500" strokeWidth={2} aria-hidden="true" />
                        <p className="text-xs font-medium leading-snug text-gray-700">{step.outcome}</p>
                      </div>
                    </div>
                  </article>
                </div>
              </li>
            )
          })}
        </ol>

        <FlowConnector />

        {/* Journey destination */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2.5 rounded-full bg-linear-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-white shadow-lg shadow-orange-500/25">
            <FlagIcon className="h-4 w-4" />
            <span className="font-heading text-[11px] font-bold tracking-[0.22em]">REAL IMPACT</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">Products that grow your business</p>
        </div>
      </div>

      {/* ==================== DESKTOP: ascending growth curve ==================== */}
      <div className="relative hidden h-48 lg:block" aria-hidden="true">
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1152 192" preserveAspectRatio="none" fill="none">
          <defs>
            <linearGradient id="journey-line" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="55%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#f97316" />
            </linearGradient>
            <linearGradient id="journey-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fb923c" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Soft area fill beneath the curve — growth-chart feel */}
          <path
            d="M 66 160
               C 80 160 95 160.5 108.8 160
               C 190 158 260 152 342.4 148
               C 420 144 500 137 576 132
               C 650 127 735 119 809.6 114
               C 880 110 970 102 1043.2 96
               L 1043.2 192 L 66 192 Z"
            fill="url(#journey-area)"
          />
          <path
            d="M 66 160
               C 80 160 95 160.5 108.8 160
               C 190 158 260 152 342.4 148
               C 420 144 500 137 576 132
               C 650 127 735 119 809.6 114
               C 880 110 970 102 1043.2 96"
            stroke="url(#journey-line)"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Flag pole rising from the final node */}
          <path d="M 1043.2 92 V 6" stroke="#ea580c" strokeWidth="3" strokeLinecap="round" />
          {/* Pennant */}
          <path d="M 1043.2 6 H 1080 L 1070 17 L 1080 28 H 1043.2 Z" fill="#f97316" stroke="#f97316" strokeWidth="2" strokeLinejoin="round" />
        </svg>

        {/* IDEA start circle */}
        <div className="absolute left-0 top-32 flex h-16 w-16 flex-col items-center justify-center rounded-full border-2 border-orange-200 bg-white text-orange-500 shadow-md shadow-orange-500/15">
          <Lightbulb className="h-6 w-6" strokeWidth={1.75} />
          <span className="mt-0.5 text-[9px] font-bold tracking-wide text-gray-700">IDEA</span>
        </div>

        {/* Numbered nodes + destination label, aligned to the same 5-column grid as the cards */}
        <div className="absolute inset-0 grid grid-cols-5 gap-4">
          {journeySteps.map((step, index) => {
            const isFinal = index === journeySteps.length - 1

            return (
              <div key={step.id} className="relative">
                {isFinal && (
                  <div className="absolute right-1/2 top-0 mr-7 w-44 text-right">
                    <p className="font-heading text-[11px] font-bold tracking-[0.18em] text-gray-900">REAL IMPACT</p>
                    <p className="mt-1 text-[10px] leading-snug text-gray-500">Products that grow your business</p>
                  </div>
                )}
                <span
                  className="absolute bottom-0 left-1/2 w-px -translate-x-1/2 border-l border-dashed border-orange-200/80"
                  style={{ top: NODE_Y[index] + 18 }}
                />
                <span
                  className="absolute left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full border-2 font-heading text-xs font-bold shadow-[0_1px_2px_rgba(249,115,22,0.15),0_0_0_5px_rgba(249,115,22,0.06)]"
                  style={{
                    top: NODE_Y[index] - 18,
                    borderColor: isFinal ? '#f97316' : NODE_COLORS[index],
                    color: isFinal ? '#ffffff' : NODE_COLORS[index],
                    backgroundColor: isFinal ? '#f97316' : '#ffffff',
                  }}
                >
                  {String(step.id).padStart(2, '0')}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      {/* ==================== DESKTOP: step cards ==================== */}
      <ol className="mt-2 hidden grid-cols-5 gap-4 lg:grid">
        {journeySteps.map((step) => {
          const Icon = step.icon

          return (
            <li key={step.id} className="group relative flex flex-col">
              <div className="flex-1 rounded-2xl bg-linear-to-b from-orange-200/80 via-orange-100/50 to-orange-100/40 p-px shadow-lg shadow-orange-950/5 transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:shadow-orange-500/15">
                <article className="relative flex h-full flex-col overflow-hidden rounded-[calc(1rem-1px)] bg-white text-center">
                  <span
                    className="pointer-events-none absolute -top-2 right-2 select-none font-heading text-6xl font-black leading-none text-orange-500/6"
                    aria-hidden="true"
                  >
                    {String(step.id).padStart(2, '0')}
                  </span>
                  <div className="flex flex-1 flex-col items-center px-5 pb-4 pt-7">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-linear-to-br from-orange-50 to-orange-100/80 text-orange-500 ring-1 ring-inset ring-orange-200/60 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="h-7 w-7" strokeWidth={1.75} />
                    </div>
                    <h3 className="mt-4 font-heading text-base font-bold text-gray-900">{step.title}</h3>
                    <span className="mt-2 h-0.5 w-6 rounded-full bg-linear-to-r from-orange-400 to-orange-500" aria-hidden="true" />
                    <p className="mt-3 min-h-10 text-xs leading-relaxed text-gray-600">{step.tagline}</p>
                  </div>
                  <div className="mx-4 mb-4 flex min-h-11 items-center justify-center gap-1.5 rounded-xl bg-orange-50/80 px-3 py-2 ring-1 ring-inset ring-orange-100/80">
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-orange-500" strokeWidth={2} aria-hidden="true" />
                    <p className="text-[10px] font-medium leading-snug text-gray-700">{step.outcome}</p>
                  </div>
                </article>
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
