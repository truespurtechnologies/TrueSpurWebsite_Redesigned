interface ProcessStepCardProps {
  number: number
  title: string
  description: string
}

export function ProcessStepCard({ number, title, description }: ProcessStepCardProps) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-8 lg:p-10 hover:shadow-sm transition-all duration-300 group">
      <div className="flex items-center justify-center w-14 h-14 rounded-xl bg-orange-100 text-orange-600 font-heading text-2xl font-bold mb-6">
        {number}
      </div>
      <h3 className="font-heading text-xl lg:text-2xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>
      <p className="text-base text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
