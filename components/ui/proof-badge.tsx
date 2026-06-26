import { Badge } from "@/components/ui/badge"
import { CheckCircle, Award, Shield, Star } from "lucide-react"

interface ProofBadgeProps {
  type: "verified" | "certified" | "trusted" | "premium"
  text: string
  className?: string
}

export function ProofBadge({ type, text, className = "" }: ProofBadgeProps) {
  const icons = {
    verified: CheckCircle,
    certified: Award,
    trusted: Shield,
    premium: Star
  }

  const variants = {
    verified: "bg-green-100 text-green-800 border-green-200",
    certified: "bg-blue-100 text-blue-800 border-blue-200",
    trusted: "bg-purple-100 text-purple-800 border-purple-200",
    premium: "bg-amber-100 text-amber-800 border-amber-200"
  }

  const Icon = icons[type]

  return (
    <Badge 
      variant="outline" 
      className={`${variants[type]} font-medium flex items-center gap-1.5 px-3 py-1 ${className}`}
    >
      <Icon className="w-3.5 h-3.5" />
      {text}
    </Badge>
  )
}
