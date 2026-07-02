interface JourneyStep {
  id: number
  title: string
  tagline: string
}

interface FounderJourneyVisualizationProps {
  className?: string
}

export function FounderJourneyVisualization({ className = "" }: FounderJourneyVisualizationProps) {
  const journeySteps: JourneyStep[] = [
    { id: 1, title: 'Validate', tagline: 'Test demand first' },
    { id: 2, title: 'Define', tagline: 'Scope your MVP' },
    { id: 3, title: 'Design', tagline: 'Create experiences' },
    { id: 4, title: 'Build', tagline: 'Develop scalably' },
    { id: 5, title: 'Launch & Learn', tagline: 'Ship with confidence' },
  ]

  return (
    <div className={`mt-16 relative max-w-6xl mx-auto ${className}`}>
      {/* Subtle progression connector line - desktop only */}
      <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-200/40 to-transparent" aria-hidden="true" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-5 lg:gap-6 relative">
        {journeySteps.map((step, index) => (
          <div key={step.id} className="relative">
            {/* Card */}
            <div className="relative bg-white rounded-xl border border-gray-100/80 p-6 shadow-sm">
              {/* Left gradient accent */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-amber-400 rounded-l-xl" />
              
              <div className="text-center">
                {/* Step number badge */}
                <div className="w-12 h-12 rounded-full bg-orange-100/70 flex items-center justify-center text-orange-600 font-heading font-black text-base mb-4 mx-auto relative z-10">
                  {index + 1}
                </div>
                
                {/* Step title */}
                <h4 className="font-heading text-base font-semibold text-gray-900 mb-2 leading-tight">
                  {step.title}
                </h4>
                
                {/* Step tagline */}
                <p className="text-xs text-gray-600 leading-relaxed">
                  {step.tagline}
                </p>
              </div>
            </div>
            
            {/* Mobile progression indicator - subtle arrow between cards */}
            {index < journeySteps.length - 1 && (
              <div className="lg:hidden flex justify-center my-3" aria-hidden="true">
                <div className="w-px h-6 bg-gradient-to-b from-orange-200/60 to-transparent" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
