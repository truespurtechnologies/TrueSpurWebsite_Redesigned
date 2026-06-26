"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Menu, X } from "lucide-react"

import { useRouter } from "next/navigation"

interface HeaderProps {
  activeSection: string
  scrollToSection: (sectionId: string) => void
  openLeadForm: (source: string) => void
  currentPage?: string
}

export function Header({ activeSection, scrollToSection, openLeadForm, currentPage = "home" }: HeaderProps) {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProductMobileOpen, setIsProductMobileOpen] = useState(false)

  const handleNavigation = (item: { id: string; label: string }) => {
    if (item.id === "about") {
      // Navigate to About page
      router.push("/about")
    } else if (item.id === "contact") {
      // Navigate to Contact page (placeholder for now)
      router.push("/contact")
    } else if (currentPage === "about" && item.id === "home") {
      // Navigate back to home page
      router.push("/")
    } else if (currentPage === "home" && item.id === "home") {
      // Scroll to top on home page
      window.scrollTo({ top: 0, behavior: "smooth" })
    } else {
      // Use scroll navigation for single-page sections
      scrollToSection(item.id)
    }
    // Close mobile menu if open
    setIsMenuOpen(false)
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ]

  const productSuite = [
    {
      category: "Healthcare",
      items: [
        {
          label: "Clinexa",
          href: "/products/healthcare/clinexa",
          description: "Connected care platform for modern healthcare delivery.",
        },
        {
          label: "HaloMe",
          href: "/products/healthcare/halome",
          description: "Patient engagement and outreach for hospitals and clinics.",
        },
      ],
    },
    {
      category: "Digital Transformation",
      items: [
        {
          label: "TrueSpur Billing",
          href: "/products/digital-transformation/truespur-billing",
          description: "Billing and invoicing built for growth-ready businesses.",
        },
      ],
    },
    {
      category: "Artificial Intelligence",
      items: [
        {
          label: "TafsirAI",
          href: "/products/artificial-intelligence/tafsirai",
          description: "AI-powered document analysis and insights.",
        },
      ],
    },
  ]

  return (
    <header className="relative border-b border-slate-200/50 bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-200/40 to-transparent"></div>
      <div className="container mx-auto px-4 py-2 md:py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => scrollToSection("home")}
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
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu viewport={true}>
            <NavigationMenuList>
              {/* Home first */}
              {navItems
                .filter((item) => item.id === "home")
                .map((item) => (
                  <NavigationMenuItem key={item.id}>
                    <button
                      onClick={() => handleNavigation(item)}
                      className={`text-base font-medium transition-colors duration-200 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-3 py-2 relative ${
                        (currentPage === "home" && activeSection === item.id) || (currentPage === "about" && item.id === "home")
                          ? "text-orange-600 after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2px] after:bg-gradient-to-r after:from-yellow-400 after:via-orange-500 after:to-amber-500 after:rounded-full"
                          : "text-gray-600"
                      }`}
                    >
                      {item.label}
                    </button>
                  </NavigationMenuItem>
                ))}

              {/* Product Suite immediately after Home */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-base font-medium text-gray-700 hover:text-orange-600">
                  Product Suite
                </NavigationMenuTrigger>
                <NavigationMenuContent className="md:min-w-[700px]">
                  <div className="grid gap-6 p-4 md:grid-cols-3 bg-white rounded-xl border shadow-xl">
                    {productSuite.map((group) => (
                      <div key={group.category} className="space-y-3">
                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                          {group.category}
                        </p>
                        <div className="space-y-2">
                          {group.items.map((product) => (
                            <NavigationMenuLink
                              key={product.label}
                              href={product.href}
                              className="block rounded-lg border border-transparent px-3 py-2 text-left hover:border-orange-200 hover:bg-orange-50/80 transition-all duration-200"
                            >
                              <div className="text-sm font-semibold text-gray-900">
                                {product.label}
                              </div>
                              {product.description && (
                                <p className="mt-1 text-xs text-gray-600 leading-snug">
                                  {product.description}
                                </p>
                              )}
                            </NavigationMenuLink>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Remaining sections */}
              {navItems
                .filter((item) => item.id !== "home")
                .map((item) => (
                  <NavigationMenuItem key={item.id}>
                    <button
                      onClick={() => handleNavigation(item)}
                      className={`text-base font-medium transition-colors duration-200 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-3 py-2 relative ${
                        (currentPage === "home" && activeSection === item.id) || (currentPage === "about" && item.id === "about")
                          ? "text-orange-600 after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:right-0 after:h-[2px] after:bg-gradient-to-r after:from-yellow-400 after:via-orange-500 after:to-amber-500 after:rounded-full"
                          : "text-gray-600"
                      }`}
                    >
                      {item.label}
                    </button>
                  </NavigationMenuItem>
                ))}

              <NavigationMenuIndicator />
            </NavigationMenuList>
            <NavigationMenuViewport />
          </NavigationMenu>
        </div>

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
          onClick={() => openLeadForm("get-started")}
          className="hidden md:inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-bold shadow-md bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 hover:shadow-lg hover:scale-[1.02] text-white transition-all duration-200"
        >
          Get Started
        </Button>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {/* Home first */}
            {navItems
              .filter((item) => item.id === "home")
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    (currentPage === "home" && activeSection === item.id) || (currentPage === "about" && item.id === "home") ? "text-orange-600 bg-orange-50" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}

            {/* Mobile Product Suite */}
            <div className="mt-2 border-t border-gray-100 pt-3">
              <button
                onClick={() => setIsProductMobileOpen((open) => !open)}
                className="flex w-full items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <span>Product Suite</span>
                <span className={`transition-transform ${isProductMobileOpen ? "rotate-180" : "rotate-0"}`}>
                  ▾
                </span>
              </button>

              {isProductMobileOpen && (
                <div className="mt-2 space-y-3 px-2">
                  {productSuite.map((group) => (
                    <div key={group.category} className="space-y-1">
                      <p className="px-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                        {group.category}
                      </p>
                      <div className="space-y-1">
                        {group.items.map((product) => (
                          <a
                            key={product.label}
                            href={product.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                          >
                            {product.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Remaining sections */}
            {navItems
              .filter((item) => item.id !== "home")
              .map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item)}
                  className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                    (currentPage === "home" && activeSection === item.id) || (currentPage === "about" && item.id === "about") ? "text-orange-600 bg-orange-50" : "text-gray-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            <div className="pt-4">
              <Button
                onClick={() => openLeadForm("get-started")}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
              >
                Get Started
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
