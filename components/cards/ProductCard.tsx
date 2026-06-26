import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface ProductCardProps {
  title: string
  description: string
  image: string
  category: string
  features: string[]
  className?: string
}

export function ProductCard({ 
  title, 
  description, 
  image, 
  category, 
  features, 
  className = "" 
}: ProductCardProps) {
  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-gray-100/80 ${className}`}>
      <CardHeader className="p-6">
        <div className="aspect-video relative mb-4 rounded-lg overflow-hidden bg-gray-50">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <Badge variant="secondary" className="w-fit mb-2">
          {category}
        </Badge>
        <CardTitle className="font-semibold text-lg leading-tight">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-600 line-clamp-3">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <ul className="space-y-2">
          {features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-600">
              <div className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
