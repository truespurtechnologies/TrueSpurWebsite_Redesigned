"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { Home, RefreshCw } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header currentPage="error" />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full bg-orange-100 mb-6">
              <RefreshCw className="h-10 w-10 md:h-12 md:w-12 text-orange-500" />
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
              Something Went Wrong
            </h1>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-500 rounded-full"></div>
          </div>
          
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            We encountered an unexpected error. This has been logged, and we&apos;re working to resolve it.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={reset}
              className="inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-bold shadow-sm bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 hover:shadow-md text-white transition-all duration-200"
            >
              <RefreshCw className="mr-2 h-5 w-5" />
              Try Again
            </button>
            
            <Link 
              href="/"
              className="inline-flex items-center text-gray-600 hover:text-orange-600 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md px-4 py-3"
            >
              <Home className="mr-2 h-5 w-5" />
              Return Home
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
