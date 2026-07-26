"use client"

import { useState, type KeyboardEvent } from "react"
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

  const handleTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null

    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (index + 1) % services.length
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (index - 1 + services.length) % services.length
    } else if (event.key === "Home") {
      nextIndex = 0
    } else if (event.key === "End") {
      nextIndex = services.length - 1
    }

    if (nextIndex !== null) {
      event.preventDefault()
      setActiveIndex(nextIndex)
    }
  }

  return (
    <div>
      {/* Tab pills — scrollable on mobile, centered on desktop */}
      <div className="mb-12 max-w-full overflow-x-auto pb-1 lg:mb-16">
        <div className="flex min-w-max justify-center px-4">
          <div
            className="inline-flex rounded-2xl border border-gray-200/80 bg-gray-50/80 p-1.5 shadow-sm"
            role="tablist"
            aria-label="Service offerings"
          >
            {services.map((service, index) => (
              <button
              key={service.tabLabel}
              type="button"
              id={`service-tab-${index}`}
              role="tab"
              tabIndex={activeIndex === index ? 0 : -1}
              aria-selected={activeIndex === index}
              aria-controls={`service-panel-${index}`}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleTabKeyDown(event, index)}
              className={`
                rounded-xl px-3 py-2.5 text-sm font-semibold whitespace-nowrap
                transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2
                lg:px-5 lg:py-3 lg:text-base
                ${
                  activeIndex === index
                    ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/25"
                    : "text-gray-600 hover:text-gray-900"
                }
              `}
            >
              {service.tabLabel}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Featured service content */}
      <div
        key={activeIndex}
        id={`service-panel-${activeIndex}`}
        role="tabpanel"
        aria-labelledby={`service-tab-${activeIndex}`}
        tabIndex={0}
        className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-300 motion-reduce:animate-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4 rounded-3xl"
      >
        <div className="relative bg-gradient-to-br from-white via-amber-50/35 to-orange-50/45 rounded-3xl border border-orange-100/70 shadow-xl shadow-orange-950/5 overflow-hidden">
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
                  className="flex items-start gap-4 animate-in fade-in slide-in-from-bottom-1 duration-300 fill-mode-both motion-reduce:animate-none"
                  style={{ animationDelay: `${index * 75}ms` }}
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
