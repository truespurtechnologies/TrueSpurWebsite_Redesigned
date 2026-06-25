"use client"

import { motion } from "framer-motion"

interface JourneyStep {
  id: number
  title: string
  description: string
  icon: string
}

interface FounderJourneyVisualizationProps {
  className?: string
}

export function FounderJourneyVisualization({ className = "" }: FounderJourneyVisualizationProps) {
  const journeySteps: JourneyStep[] = [
    {
      id: 1,
      title: "Validate",
      description: "We validate your concept through market research and technical feasibility analysis.",
      icon: "✓"
    },
    {
      id: 2,
      title: "Define",
      description: "We define requirements, user stories, and technical architecture for your solution.",
      icon: "📋"
    },
    {
      id: 3,
      title: "Design",
      description: "We create intuitive user interfaces and exceptional user experiences.",
      icon: "🎨"
    },
    {
      id: 4,
      title: "Build",
      description: "We develop robust, scalable software using modern technologies.",
      icon: "🔧"
    },
    {
      id: 5,
      title: "Launch & Learn",
      description: "We launch your product and continuously improve based on user feedback.",
      icon: "🚀"
    }
  ]

  return (
    <div className={`w-full ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {journeySteps.map((step, index) => (
          <motion.div
            key={step.id}
            className="relative group"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {/* Left gradient accent bar - permanent as per specification */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-yellow-400 via-orange-500 to-amber-500 rounded-full" />
            
            {/* Card content */}
            <div className="pl-6 pr-4 py-6 bg-white rounded-xl border border-gray-100/80 shadow-sm shadow-gray-900/5 hover:shadow-lg hover:shadow-gray-900/10 hover:-translate-y-1 transition-all duration-300">
              {/* Step number and icon */}
              <div className="flex items-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold text-sm">
                  {step.icon}
                </div>
                <span className="ml-3 text-sm font-medium text-gray-500">Step {step.id}</span>
              </div>
              
              {/* Title */}
              <h3 className="font-semibold text-gray-900 mb-2 text-lg">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
