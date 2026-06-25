import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

interface SecondaryButtonProps {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
  loading?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
  type?: "button" | "submit" | "reset"
}

export function SecondaryButton({ 
  children, 
  onClick, 
  disabled = false, 
  loading = false,
  size = "md",
  className = "",
  type = "button"
}: SecondaryButtonProps) {
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
      variant="outline"
      className={`${sizeClasses[size]} rounded-full font-bold border-2 border-orange-500 text-orange-600 hover:bg-orange-50 hover:border-orange-600 hover:text-orange-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
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
