import type { ReactNode } from "react"

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900">
      {children}
    </main>
  )
}
