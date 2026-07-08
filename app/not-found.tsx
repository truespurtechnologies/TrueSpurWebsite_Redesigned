"use client"

import Link from "next/link"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PrimaryButton } from "@/components/cta/PrimaryButton"
import { Home } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header currentPage="not-found" />
      
      <main className="flex-1 flex items-center justify-center px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-black text-orange-500 mb-4">
              404
            </h1>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-500 rounded-full"></div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">
            Page Not Found
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/">
              <PrimaryButton size="lg">
                <Home className="mr-2 h-5 w-5" />
                Return Home
              </PrimaryButton>
            </Link>
            
            <Link 
              href="/contact"
              className="text-gray-600 hover:text-orange-600 font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md px-4 py-3"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}
