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
  variant?: "light" | "dark"
}

export function SecondaryButton({ 
  children, 
  onClick, 
  disabled = false, 
  loading = false,
  size = "md",
  className = "",
  type = "button",
  variant = "light"
}: SecondaryButtonProps) {
  const sizeClasses = {
    sm: "px-6 py-2 text-sm",
    md: "px-8 py-3 text-base",
    lg: "px-10 py-4 text-lg"
  }

  const variantClasses = {
    light: "border-2 border-orange-500 text-orange-600 shadow-sm hover:bg-orange-50 hover:border-orange-600 hover:text-orange-700 hover:shadow-md hover:-translate-y-0.5",
    dark: "border-2 border-white bg-white/15 text-white shadow-sm shadow-white/10 hover:bg-white hover:text-slate-900 hover:border-white hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
  }

  return (
    <Button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      variant="outline"
      className={`${sizeClasses[size]} ${variantClasses[variant]} rounded-full font-bold transition-all duration-200 ease-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-sm ${className}`}
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
