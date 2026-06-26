import { Badge } from "@/components/ui/badge"

interface SectionHeadingProps {
  badge?: string
  title: string
  description: string
  className?: string
  centered?: boolean
}

export function SectionHeading({ 
  badge, 
  title, 
  description, 
  className = "",
  centered = false
}: SectionHeadingProps) {
  return (
    <div className={`space-y-4 ${centered ? "text-center" : ""} ${className}`}>
      {badge && (
        <Badge variant="secondary" className="w-fit">
          {badge}
        </Badge>
      )}
      <h2 className="font-extrabold text-3xl md:text-4xl lg:text-5xl font-heading text-gray-900 leading-tight">
        {title}
      </h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl leading-relaxed">
        {description}
      </p>
    </div>
  )
}
