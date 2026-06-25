interface SectionHeadingProps {
  children: React.ReactNode
  badge?: string
  color?: "gray" | "white"
  className?: string
}

export function SectionHeading({ 
  children, 
  badge, 
  color = "gray",
  className = "" 
}: SectionHeadingProps) {
  const colorClasses = {
    gray: "text-gray-900",
    white: "text-white"
  }

  const badgeColorClasses = {
    gray: "bg-orange-100 text-orange-800 border-orange-200",
    white: "bg-orange-500/20 text-orange-200 border-orange-400/30"
  }

  return (
    <div className={`text-center mb-12 ${className}`}>
      {badge && (
        <div className={`inline-flex items-center px-4 py-2 rounded-full border text-sm font-medium mb-6 ${badgeColorClasses[color]}`}>
          {badge}
        </div>
      )}
      <h2 className={`font-extrabold text-4xl lg:text-5xl xl:text-6xl ${colorClasses[color]} leading-tight`}>
        {children}
      </h2>
    </div>
  )
}
