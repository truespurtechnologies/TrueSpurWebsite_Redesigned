import { PrimaryButton } from "./PrimaryButton"
import { SecondaryButton } from "./SecondaryButton"

interface CTAGroupProps {
  primaryText: string
  primaryOnClick?: () => void
  secondaryText?: string
  secondaryOnClick?: () => void
  layout?: "horizontal" | "vertical"
  alignment?: "left" | "center" | "right"
  className?: string
}

export function CTAGroup({
  primaryText,
  primaryOnClick,
  secondaryText,
  secondaryOnClick,
  layout = "horizontal",
  alignment = "left",
  className = ""
}: CTAGroupProps) {
  const layoutClasses = {
    horizontal: "flex flex-col sm:flex-row gap-4",
    vertical: "flex flex-col gap-4"
  }

  const alignmentClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end"
  }

  return (
    <div className={`${layoutClasses[layout]} ${alignmentClasses[alignment]} ${className}`}>
      <PrimaryButton onClick={primaryOnClick}>
        {primaryText}
      </PrimaryButton>
      
      {secondaryText && (
        <SecondaryButton onClick={secondaryOnClick}>
          {secondaryText}
        </SecondaryButton>
      )}
    </div>
  )
}
