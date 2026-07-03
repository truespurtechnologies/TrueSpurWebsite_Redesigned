import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface PrimaryButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
  type?: "button" | "submit" | "reset"
}

export function PrimaryButton({ 
  children, 
  onClick, 
  disabled = false, 
  loading = false,
  size = "md",
  className = "",
  type = "button"
}: PrimaryButtonProps) {
  const sizeClasses = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg"
  }

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${sizeClasses[size]} rounded-full font-bold shadow-sm bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 hover:shadow-md text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Loading...
        </>
      ) : (
        children
      )}
    </Button>
  )
}
