"use client"

import { useState } from "react"
import { Check } from "lucide-react"

interface ServiceOffering {
  title: string
  tabLabel: string
  positioning: string
  bullets: string[]
}

interface ServiceTabsViewProps {
  services: ServiceOffering[]
}

export function ServiceTabsView({ services }: ServiceTabsViewProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = services[activeIndex]

  return (
    <div>
      {/* Tab pills — scrollable on mobile, centered on desktop */}
      <div className="flex justify-center mb-12 lg:mb-16">
        <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
          {services.map((service, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`
                px-4 py-2.5 lg:px-6 lg:py-3 rounded-full text-sm lg:text-base font-semibold
                transition-all duration-300 ease-out whitespace-nowrap border
                ${
                  activeIndex === index
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white border-transparent shadow-md shadow-orange-500/25"
                    : "bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-900"
                }
              `}
              aria-pressed={activeIndex === index}
            >
              {service.tabLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Featured service content */}
      <div
        key={activeIndex}
        className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300"
      >
        <div className="relative bg-white rounded-3xl border border-gray-100/80 shadow-xl shadow-gray-900/5 overflow-hidden">
          {/* Left gradient accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-orange-400 to-amber-400" />

          <div className="p-8 md:p-12 lg:p-16 pl-10 md:pl-14 lg:pl-20">
            {/* Title + positioning */}
            <div className="text-center mb-10 lg:mb-12">
              <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-4">
                {active.title}
              </h3>
              <p className="text-lg lg:text-xl font-medium text-orange-600 italic">
                {active.positioning}
              </p>
            </div>

            {/* Outcome bullets — single centered column for visual balance */}
            <div className="max-w-2xl mx-auto space-y-5">
              {active.bullets.map((bullet, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0">
                    <div className="h-7 w-7 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-sm">
                      <Check className="h-4 w-4 text-white" strokeWidth={3} />
                    </div>
                  </div>
                  <span className="text-base lg:text-lg text-gray-600 leading-relaxed pt-0.5">
                    {bullet}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
