"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

import { useRouter } from "next/navigation"

interface HeaderProps {
  currentPage?: string
}

export function Header({ currentPage = "home" }: HeaderProps) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleNavigation = (path: string) => {
    router.push(path)
    setIsMenuOpen(false)
  }

  const handleCTAClick = () => {
    if (currentPage === "/contact") {
      // On Contact page, check if form is visible before scrolling
      const formSection = document.querySelector('[data-contact-form]') as HTMLElement
      if (formSection) {
        const rect = formSection.getBoundingClientRect()
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight
        
        // Check if form is substantially visible (at least 30% in viewport)
        const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0)
        const isSubstantiallyVisible = visibleHeight > 0 && visibleHeight >= rect.height * 0.3
        
        // Only scroll if form is not substantially visible
        if (!isSubstantiallyVisible) {
          formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    } else {
      // On all other pages, navigate to Contact
      router.push('/contact')
    }
    setIsMenuOpen(false)
  }

  const navigationItems = [
    { path: "/", label: "Home" },
    { path: "/products", label: "Products" },
    { path: "/services", label: "Services" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
  ]


  return (
    <header className="relative border-b border-slate-200/50 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-200/40 to-transparent"></div>
      <div className="container mx-auto px-4 py-2 md:py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => handleNavigation("/")}
            className="focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
          >
            <img
              src="/images/TrueSpur logo.png"
              alt="TrueSpur Technology Solutions"
              className="h-12 w-auto md:h-14 lg:h-16 xl:h-18 hover:opacity-80 transition-opacity cursor-pointer"
            />
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`text-base font-medium transition-colors duration-200 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-3 py-2 relative ${
                currentPage === item.path || (currentPage === "home" && item.path === "/")
                  ? "text-orange-600 after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2px] after:bg-gradient-to-r after:from-yellow-400 after:via-orange-500 after:to-amber-500 after:rounded-full"
                  : "text-gray-600"
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md p-2"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Desktop CTA Button */}
        <Button
          onClick={handleCTAClick}
          className="hidden md:inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-bold shadow-sm bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 hover:shadow-md text-white transition-all duration-200"
        >
          Start a Conversation
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  currentPage === item.path || (currentPage === "home" && item.path === "/")
                    ? "text-orange-600 bg-orange-50"
                    : "text-gray-600"
                }`}
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4">
              <Button
                onClick={handleCTAClick}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
              >
                Start a Conversation
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
