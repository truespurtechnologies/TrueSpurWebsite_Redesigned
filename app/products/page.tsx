"use client"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export default function ProductsPage() {
  const openLeadForm = (source: string) => {
    // Implementation for opening lead form
    console.log(`Opening lead form from ${source}`)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="/products" openLeadForm={openLeadForm} />
      
      <main className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Products</h1>
          <p className="text-lg text-gray-600 mb-8">
            Products page content will be implemented according to the approved specifications.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-amber-800 mb-4">Page Under Development</h2>
            <p className="text-amber-700">
              This page is currently under development. In the meantime, please use the navigation above to explore other sections of our website.
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
