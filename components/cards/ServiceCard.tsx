import { Check } from "lucide-react"

interface ServiceCardProps {
  title: string
  positioning: string
  bullets: string[]
}

export function ServiceCard({ title, positioning, bullets }: ServiceCardProps) {
  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100/80 p-8 lg:p-10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out">
      {/* Left gradient accent - appears on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-amber-400 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Service title */}
      <h3 className="font-heading text-xl lg:text-2xl font-semibold text-gray-900 leading-tight mb-4">
        {title}
      </h3>
      
      {/* Positioning statement */}
      <p className="text-base font-medium text-orange-600 italic leading-relaxed mb-6">
        {positioning}
      </p>
      
      {/* Outcome bullets */}
      <ul className="space-y-3.5">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex items-start gap-3 text-sm lg:text-base text-gray-600 leading-relaxed">
            <Check className="h-5 w-5 text-orange-500 flex-shrink-0 mt-0.5" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
