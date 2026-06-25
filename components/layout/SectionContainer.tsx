interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  background?: "white" | "gray" | "slate"
  padding?: "standard" | "compact" | "spacious"
}

export function SectionContainer({ 
  children, 
  className = "", 
  background = "white",
  padding = "standard"
}: SectionContainerProps) {
  const backgroundClasses = {
    white: "bg-white",
    gray: "bg-gray-50",
    slate: "bg-slate-900"
  }

  const paddingClasses = {
    compact: "py-12 md:py-16 lg:py-20",
    standard: "py-16 md:py-24 lg:py-32",
    spacious: "py-20 md:py-32 lg:py-40"
  }

  return (
    <section className={`${backgroundClasses[background]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </section>
  )
}
