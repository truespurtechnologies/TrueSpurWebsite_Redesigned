"use client"

import type React from "react"

import Image from "next/image"
import { animate, motion, useMotionValue, useTransform } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
import { useState, useEffect, useRef } from "react"
import {
  ArrowRight,
  Code,
  Smartphone,
  Brain,
  Users,
  Heart,
  GraduationCap,
  Zap,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Loader2,
  Lock,
} from "lucide-react"

const statsData = [
  { label: "Projects Delivered", value: 10, suffix: "+" },
  { label: "Customers Served", value: 10, suffix: "+" },
  { label: "Industries Touched", value: 4, suffix: "+" },
  { label: "Annual Transactions", value: 100, suffix: "K+" },
]

function AnimatedStatCard({
  label,
  value,
  suffix,
  index,
}: {
  label: string
  value: number
  suffix: string
  index: number
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => Math.floor(latest))

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animate(count, value, {
              duration: 1.8,
              ease: "easeOut",
            })
          }
        })
      },
      { threshold: 0.6 },
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [count, value])

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 * index, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.6 }}
    >
      <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-yellow-400/70 via-orange-500/70 to-amber-500/70 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
      <Card className="relative border-0 bg-white/95 shadow-lg rounded-2xl overflow-hidden backdrop-blur-sm group-hover:-translate-y-1 group-hover:shadow-2xl transition-all duration-300">
        <CardContent className="py-8 px-6 flex flex-col items-center justify-center">
          <div className="mb-3 inline-flex items-baseline gap-1">
            <motion.span className="text-4xl font-extrabold tracking-tight text-gray-900">
              {rounded}
            </motion.span>
            <span className="text-2xl font-bold text-orange-500">{suffix}</span>
          </div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-gray-500 mb-1 text-center">
            {label}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProductMobileOpen, setIsProductMobileOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    projectType: "Website Development",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [formMessage, setFormMessage] = useState("")

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" })
  const [spotlightIndex, setSpotlightIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "expertise", "about", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element =
          section === "home"
            ? (document.querySelector("header")?.nextElementSibling as HTMLElement)
            : document.getElementById(section)

        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSpotlightIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)
    onSelect()

    const autoplay = setInterval(() => {
      if (!emblaApi) return
      emblaApi.scrollNext()
    }, 7000)

    return () => {
      emblaApi.off("select", onSelect)
      clearInterval(autoplay)
    }
  }, [emblaApi])

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({ top: elementPosition, behavior: "smooth" })
    }
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "expertise", label: "Expertise" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ]

  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3)
    }, 9000)

    return () => clearInterval(interval)
  }, [])

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
          href: "/products/artificial-intelligence/tafsir-ai",
          description: "AI-powered insights and understanding of Islamic Quran through advanced natural language processing.",
        },
      ],
    },
  ]

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("loading")
    setFormMessage("")

    // Validation
    if (!formData.firstName.trim()) {
      setFormStatus("error")
      setFormMessage("First name is required")
      return
    }
    if (!formData.lastName.trim()) {
      setFormStatus("error")
      setFormMessage("Last name is required")
      return
    }
    if (!formData.email.trim()) {
      setFormStatus("error")
      setFormMessage("Email is required")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormStatus("error")
      setFormMessage("Please enter a valid email address")
      return
    }
    if (!formData.message.trim()) {
      setFormStatus("error")
      setFormMessage("Message is required")
      return
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setFormStatus("success")
      setFormMessage("Message sent successfully! We'll get back to you soon.")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        projectType: "Website Development",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus("idle")
        setFormMessage("")
      }, 5000)
    } catch (error) {
      setFormStatus("error")
      setFormMessage(error instanceof Error ? error.message : "Failed to send message. Please try again.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection("home")}
              className="focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
            >
              <img
                src="/logo/truespur-main-logo.png"
                alt="TrueSpur Technology Solutions - We Craft. You Lead."
                className="h-16 w-auto md:h-18 lg:h-20 hover:opacity-80 transition-opacity cursor-pointer"
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
                        onClick={() => scrollToSection(item.id)}
                        className={`text-sm font-medium transition-colors duration-200 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-3 py-1.5 ${
                          activeSection === item.id
                            ? "text-orange-600 border-b-2 border-orange-600"
                            : "text-gray-600"
                        }`}
                      >
                        {item.label}
                      </button>
                    </NavigationMenuItem>
                  ))}

                {/* Product Suite immediately after Home */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-orange-600">
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
                        onClick={() => scrollToSection(item.id)}
                        className={`text-sm font-medium transition-colors duration-200 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-3 py-1.5 ${
                          activeSection === item.id
                            ? "text-orange-600 border-b-2 border-orange-600"
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
            onClick={() => scrollToSection("contact")}
            className="hidden md:block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
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
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      activeSection === item.id ? "text-orange-600 bg-orange-50" : "text-gray-600"
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
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      activeSection === item.id ? "text-orange-600 bg-orange-50" : "text-gray-600"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              <div className="pt-4">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <motion.section
        id="home"
        className="relative overflow-hidden py-20 bg-slate-950 hero-gradient-animated"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-orange-500/25 blur-3xl"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-40 right-[-4rem] h-96 w-96 rounded-full bg-amber-400/20 blur-3xl"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/3 right-1/3 h-64 w-64 rounded-full bg-yellow-400/10 blur-3xl"
            animate={{ x: [0, 10, -6, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative container mx-auto px-4">
          <motion.div
            className="pointer-events-none absolute inset-x-4 top-10 bottom-10 hidden md:flex items-center justify-center"
            animate={{ opacity: [0.4, 0.85, 0.4] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              viewBox="0 0 520 260"
              className="w-full max-w-4xl text-orange-100/40"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="hero-tech-grid" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
                  <stop offset="45%" stopColor="currentColor" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>

              <rect
                x="32"
                y="28"
                width="456"
                height="204"
                rx="28"
                fill="none"
                stroke="url(#hero-tech-grid)"
                strokeWidth="1.4"
              />

              {Array.from({ length: 7 }).map((_, i) => (
                <line
                  key={`hv-${i}`}
                  x1={60 + i * 52}
                  y1={44}
                  x2={60 + i * 52}
                  y2={216}
                  stroke="currentColor"
                  strokeOpacity={0.18}
                  strokeWidth="0.7"
                />
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <line
                  key={`hh-${i}`}
                  x1={52}
                  y1={64 + i * 36}
                  x2={460}
                  y2={64 + i * 36}
                  stroke="currentColor"
                  strokeOpacity={0.14}
                  strokeWidth="0.7"
                />
              ))}

              <path
                d="M84 90h26l10-14 14 26 10-34 14 38 10-18h28"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeOpacity="0.9"
              />
              <path
                d="M124 152h30M190 152h64M292 152h42"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeOpacity="0.8"
                strokeLinecap="round"
              />

              <circle cx="112" cy="90" r="4" fill="currentColor" fillOpacity="0.9" />
              <circle cx="172" cy="104" r="3.5" fill="currentColor" fillOpacity="0.85" />
              <circle cx="220" cy="86" r="3.5" fill="currentColor" fillOpacity="0.85" />
              <circle cx="260" cy="104" r="3.5" fill="currentColor" fillOpacity="0.85" />
              <circle cx="332" cy="80" r="3" fill="currentColor" fillOpacity="0.8" />
              <circle cx="372" cy="110" r="3" fill="currentColor" fillOpacity="0.8" />
            </svg>
          </motion.div>

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <Badge className="mb-4 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20 border border-orange-400/40">
                Cutting-Edge Technology Solutions
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Transform Your Business with{" "}
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  Innovation
                </span>
              </h1>
              <p className="text-xl text-slate-200/80 mb-6 leading-relaxed">
                We specialize in website development, mobile apps, custom software, AI solutions, and product
                consulting. Empowering healthcare, education, and digital transformation with cutting-edge technology.
              </p>
              <p className="text-lg text-orange-300 font-medium mb-8 italic">"We Craft. You Lead."</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-md shadow-orange-200"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("services")}
                  className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-white/80 backdrop-blur"
                >
                  View Our Work
                </Button>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="relative rounded-[32px] bg-white/95 shadow-2xl overflow-hidden">
                {/* Retain the original hero image as a clean card without overlay */}
                <img
                  src="/images/hero-landing.jpg"
                  alt="Team collaborating on modern technology solutions at TrueSpur"
                  className="w-full h-[500px] object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        id="services"
        className="relative overflow-hidden py-20 bg-gradient-to-b from-white via-[#FFF7ED] to-[#FEFCE8]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-0 h-64 w-64 rounded-full bg-orange-200/40 blur-3xl" />
          <div className="absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-100 text-gray-700 hover:bg-gray-100">Our Services</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
              Comprehensive Technology Solutions
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to deployment, we deliver end-to-end solutions that drive growth and innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Card className="relative h-full border-0 shadow-lg rounded-2xl bg-white/95 backdrop-blur-sm overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-500" />
                <CardHeader>
                  <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 p-[2px]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[0.7rem] bg-white/5">
                      <Code className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-lg lg:text-xl">Website Development</CardTitle>
                  <CardDescription>
                    Modern, responsive websites built with the latest technologies for optimal performance and user
                    experience.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Card className="relative h-full border-0 shadow-lg rounded-2xl bg-white/95 backdrop-blur-sm overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400" />
                <CardHeader>
                  <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 p-[2px]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[0.7rem] bg-white/5">
                      <Smartphone className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-lg lg:text-xl">Mobile App Development</CardTitle>
                  <CardDescription>
                    Native and cross-platform mobile applications that deliver seamless experiences across all devices.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Card className="relative h-full border-0 shadow-lg rounded-2xl bg-white/95 backdrop-blur-sm overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-600 via-orange-500 to-amber-400" />
                <CardHeader>
                  <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-yellow-600 to-orange-500 p-[2px]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[0.7rem] bg-white/5">
                      <Zap className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-lg lg:text-xl">Custom Software Development</CardTitle>
                  <CardDescription>
                    Tailored software solutions designed to meet your specific business requirements and workflows.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Card className="relative h-full border-0 shadow-lg rounded-2xl bg-white/95 backdrop-blur-sm overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500" />
                <CardHeader>
                  <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-orange-600 to-yellow-500 p-[2px]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[0.7rem] bg-white/5">
                      <Users className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-lg lg:text-xl">Product Research</CardTitle>
                  <CardDescription>
                    Strategic guidance and technical expertise to help you make informed decisions about your technology
                    investments.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Card className="relative h-full border-0 shadow-lg rounded-2xl bg-white/95 backdrop-blur-sm overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500" />
                <CardHeader>
                  <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 p-[2px]">
                    <div className="flex h-11 w-11 items-center justify-center rounded-[0.7rem] bg-white/5">
                      <Brain className="h-5 w-5 text-white" />
                    </div>
                  </div>
                  <CardTitle className="text-lg lg:text-xl">AI Solutions</CardTitle>
                  <CardDescription>
                    Cutting-edge artificial intelligence and machine learning solutions to automate and optimize your
                    business processes.
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <Card className="relative h-full border-0 shadow-lg rounded-2xl bg-gradient-to-br from-yellow-50 via-orange-50 to-amber-50 overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg lg:text-xl mb-1">Ready to Get Started?</CardTitle>
                  <CardDescription>
                    {"Let's discuss your project and find the perfect solution for your needs."}
                  </CardDescription>
                  <Button
                    onClick={() => scrollToSection("contact")}
                    className="mt-4 w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white shadow-md shadow-orange-200"
                  >
                    Contact Us Today
                  </Button>
                </CardHeader>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Expertise Section */}
      <motion.section
        id="expertise"
        className="relative overflow-hidden py-20 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute -top-32 left-[-6rem] h-72 w-72 rounded-full bg-orange-500/25 blur-3xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-36 right-[-4rem] h-80 w-80 rounded-full bg-amber-400/20 blur-3xl"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-1/2 left-1/4 h-56 w-56 -translate-y-1/2 rounded-full bg-yellow-400/12 blur-3xl"
            animate={{ x: [0, 8, -4, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative container mx-auto px-4">
          <motion.div
            className="pointer-events-none absolute inset-x-4 top-10 bottom-10 flex items-center justify-center"
            animate={{ opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg
              viewBox="0 0 480 260"
              className="w-full max-w-4xl text-orange-100/60"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="expertise-grid" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.8" />
                  <stop offset="40%" stopColor="currentColor" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </linearGradient>
              </defs>

              <rect
                x="24"
                y="24"
                width="432"
                height="212"
                rx="32"
                fill="none"
                stroke="url(#expertise-grid)"
                strokeWidth="1.2"
              />

              {Array.from({ length: 6 }).map((_, i) => (
                <line
                  key={`v-${i}`}
                  x1={64 + i * 56}
                  y1={40}
                  x2={64 + i * 56}
                  y2={220}
                  stroke="currentColor"
                  strokeOpacity={0.16}
                  strokeWidth="0.6"
                />
              ))}
              {Array.from({ length: 4 }).map((_, i) => (
                <line
                  key={`h-${i}`}
                  x1={48}
                  y1={70 + i * 42}
                  x2={432}
                  y2={70 + i * 42}
                  stroke="currentColor"
                  strokeOpacity={0.16}
                  strokeWidth="0.6"
                />
              ))}

              <circle cx="132" cy="96" r="5" fill="currentColor" fillOpacity="0.85" />
              <circle cx="240" cy="160" r="4" fill="currentColor" fillOpacity="0.7" />
              <circle cx="348" cy="120" r="5" fill="currentColor" fillOpacity="0.8" />
              <circle cx="188" cy="204" r="3" fill="currentColor" fillOpacity="0.65" />
              <circle cx="300" cy="72" r="3" fill="currentColor" fillOpacity="0.6" />
            </svg>
          </motion.div>

          <div className="relative text-center mb-16 max-w-3xl mx-auto">
            <Badge className="mb-4 bg-orange-500/10 text-orange-300 hover:bg-orange-500/20 border border-orange-400/40">
              Industry Expertise
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Deep Domain Knowledge</h2>
            <p className="text-xl text-slate-200/80 max-w-3xl mx-auto">
              We bring specialized expertise in key industries, understanding unique challenges and requirements
            </p>
          </div>

          <div className="relative grid lg:grid-cols-3 gap-8">
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.5, delay: 0.05, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-orange-400/75 via-amber-400/70 to-yellow-400/60 opacity-70 md:opacity-0 md:group-hover:opacity-100 blur-[1px] transition-opacity duration-300" />
              <Card className="relative text-center border border-white/10 shadow-xl bg-white/5 backdrop-blur-md rounded-2xl md:group-hover:-translate-y-1 md:group-hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <motion.div
                    className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 opacity-90" />
                    <div className="absolute inset-2 rounded-full bg-white/20" />
                    <Heart className="relative h-8 w-8 text-white" />
                  </motion.div>
                  <CardTitle className="text-xl sm:text-2xl text-white">Healthcare</CardTitle>
                </CardHeader>
                <CardContent className="relative overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 opacity-70">
                    <svg
                      viewBox="0 0 260 160"
                      className="absolute -right-10 -bottom-6 h-40 w-40 text-orange-100/70"
                      aria-hidden="true"
                    >
                      <path
                        d="M10 86h38l12-28 18 66 16-90 16 72 14-40 10 20h40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeOpacity="0.9"
                      />
                      <circle cx="40" cy="86" r="3" fill="currentColor" fillOpacity="0.85" />
                      <circle cx="92" cy="102" r="3" fill="currentColor" fillOpacity="0.8" />
                      <circle cx="146" cy="64" r="3" fill="currentColor" fillOpacity="0.75" />
                      <circle cx="206" cy="86" r="3" fill="currentColor" fillOpacity="0.8" />
                    </svg>
                  </div>
                  <p className="text-slate-100/80 mb-6">
                    HIPAA-compliant solutions, patient management systems, telemedicine platforms, and healthcare
                    analytics.
                  </p>
                  <ul className="text-left space-y-2 text-sm text-slate-100/80">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                      Electronic Health Records (EHR)
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                      Telemedicine Platforms
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                      Medical Device Integration
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                      Healthcare Analytics
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-amber-400/75 via-orange-400/70 to-yellow-400/60 opacity-70 md:opacity-0 md:group-hover:opacity-100 blur-[1px] transition-opacity duration-300" />
              <Card className="relative text-center border border-white/10 shadow-xl bg-white/5 backdrop-blur-md rounded-2xl md:group-hover:-translate-y-1 md:group-hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <motion.div
                    className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 4.4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400 to-orange-400 opacity-90" />
                    <div className="absolute inset-2 rounded-full bg-white/20" />
                    <GraduationCap className="relative h-8 w-8 text-white" />
                  </motion.div>
                  <CardTitle className="text-xl sm:text-2xl text-white">Education</CardTitle>
                </CardHeader>
                <CardContent className="relative overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 opacity-70">
                    <svg
                      viewBox="0 0 260 160"
                      className="absolute -right-8 -bottom-6 h-40 w-40 text-orange-100/70"
                      aria-hidden="true"
                    >
                      <rect
                        x="40"
                        y="40"
                        width="120"
                        height="72"
                        rx="8"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeOpacity="0.85"
                      />
                      <rect
                        x="60"
                        y="56"
                        width="80"
                        height="44"
                        rx="6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeOpacity="0.7"
                      />
                      <path
                        d="M56 128h88"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeOpacity="0.8"
                        strokeLinecap="round"
                      />
                      <circle cx="74" cy="72" r="3" fill="currentColor" fillOpacity="0.85" />
                      <circle cx="104" cy="88" r="3" fill="currentColor" fillOpacity="0.8" />
                      <circle cx="134" cy="72" r="3" fill="currentColor" fillOpacity="0.75" />
                    </svg>
                  </div>
                  <p className="text-slate-100/80 mb-6">
                    Learning management systems, educational apps, virtual classrooms, and student information systems.
                  </p>
                  <ul className="text-left space-y-2 text-sm text-slate-100/80">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                      Learning Management Systems
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                      Virtual Classrooms
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                      Student Information Systems
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                      Educational Mobile Apps
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-orange-500/80 via-amber-400/75 to-yellow-400/65 opacity-70 md:opacity-0 md:group-hover:opacity-100 blur-[1px] transition-opacity duration-300" />
              <Card className="relative text-center border border-white/10 shadow-xl bg-white/5 backdrop-blur-md rounded-2xl md:group-hover:-translate-y-1 md:group-hover:shadow-2xl transition-all duration-300">
                <CardHeader className="pb-4">
                  <motion.div
                    className="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-orange-500 to-yellow-500 opacity-90" />
                    <div className="absolute inset-2 rounded-full bg-white/20" />
                    <Zap className="relative h-8 w-8 text-white" />
                  </motion.div>
                  <CardTitle className="text-xl sm:text-2xl text-white">Digital Transformation</CardTitle>
                </CardHeader>
                <CardContent className="relative overflow-hidden">
                  <div className="pointer-events-none absolute inset-0 opacity-70">
                    <svg
                      viewBox="0 0 260 160"
                      className="absolute -right-10 -bottom-8 h-44 w-44 text-orange-100/75"
                      aria-hidden="true"
                    >
                      <rect
                        x="36"
                        y="48"
                        width="140"
                        height="72"
                        rx="12"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeOpacity="0.85"
                      />
                      <path
                        d="M56 72h22l8-10 10 18 10-26 12 28 8-14h24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeOpacity="0.9"
                      />
                      <path
                        d="M76 112h16M112 112h40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeOpacity="0.8"
                        strokeLinecap="round"
                      />
                      <circle cx="72" cy="72" r="3" fill="currentColor" fillOpacity="0.9" />
                      <circle cx="110" cy="82" r="3" fill="currentColor" fillOpacity="0.8" />
                      <circle cx="146" cy="68" r="3" fill="currentColor" fillOpacity="0.8" />
                      <circle cx="170" cy="82" r="3" fill="currentColor" fillOpacity="0.8" />
                    </svg>
                  </div>
                  <p className="text-slate-100/80 mb-6">
                    Cloud migration, process automation, digital workflows, and modernization of legacy systems.
                  </p>
                  <ul className="text-left space-y-2 text-sm text-slate-100/80">
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                      Cloud Migration & Architecture
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                      Process Automation
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                      Legacy System Modernization
                    </li>
                    <li className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                      Digital Workflow Solutions
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Products / Featured Solutions Section (placeholder content, update with real products later) */}
      <motion.section
        id="products"
        className="relative overflow-hidden py-20 bg-gradient-to-b from-[#FFF7ED] via-white to-[#FEFCE8]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
          <div className="absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="absolute top-1/2 left-1/3 h-56 w-56 -translate-y-1/2 rounded-full bg-yellow-200/40 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100/90">
              Products &amp; Solutions
            </Badge>
            <h2 className="text-3xl lg:text-[2.5rem] font-bold text-gray-900 mb-3 leading-snug">
              World-Class Products, Proven Results
            </h2>
            <p className="text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Discover our leading suite of products, already trusted by teams and organizations across healthcare,
              education, and digital transformation.
            </p>
          </div>

          <div className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/80 bg-white/90 px-5 py-2.5 shadow-md shadow-orange-100/60 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 animate-pulse" />
              <p className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.26em] text-orange-800">
                Product Suite Spotlight
              </p>
            </div>
          </div>

          <div className="mb-10 space-y-3">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.24em] text-orange-700/80">
              Built for teams across key industries
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] md:text-xs font-medium">
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/90 px-3.5 py-1.5 text-orange-800 shadow-sm shadow-orange-50">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                Healthcare &amp; Digital Health
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/90 px-3.5 py-1.5 text-orange-800 shadow-sm shadow-orange-50">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                Government &amp; Public Sector
              </span>
              <span className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white/90 px-3.5 py-1.5 text-orange-800 shadow-sm shadow-orange-50">
                <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
                Logistics &amp; Manufacturing
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-orange-400/75 via-amber-400/70 to-yellow-400/70 opacity-0 group-hover:opacity-100 blur-[1.5px] transition-opacity duration-300" />
              <Card className="relative h-full border-0 shadow-lg bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden group-hover:-translate-y-1 group-hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-500" />
                <CardHeader>
                  <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-100">Healthcare</Badge>
                  <CardTitle className="text-xl">Clinexa</CardTitle>
                  <CardDescription>
                    Clinexa unifies patient journeys, clinicians, and operations into a single, intelligent platform.
                    Designed for hospitals, clinics, and digital health initiatives that need reliability, speed, and
                    clinical-grade workflows.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="border-orange-200 text-orange-700">
                      Virtual Clinic
                    </Badge>
                    <Badge variant="outline" className="border-orange-200 text-orange-700">
                      Telemedicine
                    </Badge>
                    <Badge variant="outline" className="border-orange-200 text-orange-700">
                      SaaS
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    className="group/button w-full border-orange-300 text-orange-600 bg-white hover:bg-orange-50 hover:border-orange-400"
                    asChild
                  >
                    <a href="/products/healthcare/clinexa" className="flex items-center justify-center gap-1">
                      <span>View product</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-amber-400/75 via-orange-400/70 to-yellow-400/65 opacity-0 group-hover:opacity-100 blur-[1.5px] transition-opacity duration-300" />
              <Card className="relative h-full border-0 shadow-lg bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden group-hover:-translate-y-1 group-hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-400 via-amber-500 to-yellow-400" />
                <CardHeader>
                  <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-100">Healthcare</Badge>
                  <CardTitle className="text-xl">HaloMe</CardTitle>
                  <CardDescription>
                    HaloMe helps health systems reach, educate, and support patients beyond the hospital walls through
                    thoughtful, timely, and contextual communication.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="border-orange-200 text-orange-700">
                      Patient App
                    </Badge>
                    <Badge variant="outline" className="border-orange-200 text-orange-700">
                      SaaS
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    className="group/button w-full border-orange-300 text-orange-600 bg-white hover:bg-orange-50 hover:border-orange-400"
                    asChild
                  >
                    <a href="/products/healthcare/halome" className="flex items-center justify-center gap-1">
                      <span>View product</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-orange-500/80 via-amber-400/75 to-yellow-400/70 opacity-0 group-hover:opacity-100 blur-[1.5px] transition-opacity duration-300" />
              <Card className="relative h-full border-0 shadow-lg bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden group-hover:-translate-y-1 group-hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-400" />
                <CardHeader>
                  <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-100">Digital Transformation</Badge>
                  <CardTitle className="text-xl">TrueBill</CardTitle>
                  <CardDescription>
                    TrueBill brings clarity, control, and speed to your receivables. From quote to cash, get a single,
                    coherent view of how revenue flows through your business.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="border-orange-200 text-orange-700">
                      iOS &amp; Android
                    </Badge>
                    <Badge variant="outline" className="border-orange-200 text-orange-700">
                      Cloud
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    className="group/button w-full border-orange-300 text-orange-600 bg-white hover:bg-orange-50 hover:border-orange-400"
                    asChild
                  >
                    <a
                      href="/products/digital-transformation/truespur-billing"
                      className="flex items-center justify-center gap-1"
                    >
                      <span>View product</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="relative group"
              initial={{ opacity: 0, y: 30, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-amber-500/80 via-orange-500/80 to-yellow-400/75 opacity-0 group-hover:opacity-100 blur-[1.5px] transition-opacity duration-300" />
              <Card className="relative h-full border-0 shadow-lg bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden group-hover:-translate-y-1 group-hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400" />
                <CardHeader>
                  <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-100">AI Solutions</Badge>
                  <CardTitle className="text-xl">Tafsir Divine Guidance</CardTitle>
                  <CardDescription>
                    TafsirAI helps learners, scholars, and institutions explore Quranic text with augmentative AIrespectfully and responsibly. It is designed to support understanding, not replace scholarship.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="outline" className="border-orange-200 text-orange-700">
                      Web &amp; Mobile
                    </Badge>
                    <Badge variant="outline" className="border-orange-200 text-orange-700">
                      Quranic Insights
                    </Badge>
                  </div>
                  <Button
                    variant="outline"
                    className="group/button w-full border-orange-300 text-orange-600 bg-white hover:bg-orange-50 hover:border-orange-400"
                    asChild
                  >
                    <a href="/products/artificial-intelligence/tafsir-ai" className="flex items-center justify-center gap-1">
                      <span>View product</span>
                      <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-1" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats / Metrics Section (placeholder metrics, replace with real numbers later) */}
      <motion.section
        id="stats"
        className="relative overflow-hidden py-20 bg-gradient-to-b from-gray-50 via-white to-[#FFF7ED]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
          <div className="absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/40 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="pointer-events-none absolute inset-x-6 -top-4 bottom-8 flex items-center justify-center">
            <svg
              viewBox="0 0 400 260"
              className="w-full max-w-3xl text-orange-200/40 drop-shadow-sm"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="stats-orbit" cx="50%" cy="50%" r="65%">
                  <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
                  <stop offset="45%" stopColor="currentColor" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="200" cy="130" r="120" fill="url(#stats-orbit)" />
              <ellipse cx="200" cy="130" rx="160" ry="70" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1.2" />
              <ellipse cx="200" cy="130" rx="110" ry="50" fill="none" stroke="currentColor" strokeOpacity="0.4" strokeWidth="1" />
              <ellipse cx="200" cy="130" rx="70" ry="30" fill="none" stroke="currentColor" strokeOpacity="0.35" strokeWidth="1" />
              <path
                d="M80 120c30-40 60-60 120-60s90 20 120 60"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.35"
                strokeWidth="1"
              />
              <path
                d="M80 150c30 40 60 60 120 60s90-20 120-60"
                fill="none"
                stroke="currentColor"
                strokeOpacity="0.25"
                strokeWidth="1"
              />
              <circle cx="100" cy="118" r="4" fill="currentColor" fillOpacity="0.9" />
              <circle cx="300" cy="118" r="4" fill="currentColor" fillOpacity="0.85" />
              <circle cx="150" cy="85" r="3" fill="currentColor" fillOpacity="0.75" />
              <circle cx="250" cy="85" r="3" fill="currentColor" fillOpacity="0.65" />
              <circle cx="200" cy="190" r="3" fill="currentColor" fillOpacity="0.7" />
            </svg>
          </div>
          <div className="relative text-center mb-14 max-w-3xl mx-auto">
            <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">Value Realized</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-snug">
              Empowering Innovation Worldwide
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
              The early outcomes speak for themselves—demonstrating how we empower customers to achieve measurable
              progress in healthcare, education, and digital transformation.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {statsData.map((stat, index) => (
              <AnimatedStatCard
                key={stat.label}
                label={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.section>

      {/* Awards & Recognitions Section */}
      <motion.section
        id="awards"
        className="relative overflow-hidden py-20 bg-gradient-to-b from-[#FFF7ED] via-white to-[#E5F0FF]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
          <div className="absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200/40 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-14 max-w-5xl mx-auto">
            <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">Recognized for Innovation</Badge>
            <h2 className="text-3xl lg:text-[2.4rem] font-bold text-gray-900 mb-4 leading-snug">
              Developed a winning design that secured World Bank–backed projects for the Tamil Nadu State Government
            </h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Designing impactful solutions for the Welfare of Differently Abled Persons in partnership with the Tamil Nadu State Government.
            </p>
          </div>

          <div className="grid gap-10 xl:gap-16 lg:grid-cols-2 items-stretch">
            {/* Left column: text cards */}
            <motion.div
              className="space-y-17"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-500 opacity-80 group-hover:opacity-100 blur-[1px] transition-opacity duration-300" />
                <div className="relative rounded-2xl bg-white/95 shadow-lg border border-white/60 backdrop-blur-sm px-1 py-1 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-out">
                  <CardHeader className="pt-5 pb-5 px-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-orange-200">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-semibold tracking-tight text-gray-900">
                        <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                          Government of Tamil Nadu Award
                        </span>
                      </CardTitle>
                    </div>
                    <CardDescription className="mt-1 text-sm md:text-base text-gray-700 leading-relaxed">
                      Award-winning mobile outreach and therapy unit design for differently-abled persons, supported by the
                      World Bank and the Government of Tamil Nadu.
                    </CardDescription>
                  </CardHeader>
                </div>
              </motion.div>

              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 opacity-80 group-hover:opacity-100 blur-[1px] transition-opacity duration-300" />
                <div className="relative rounded-2xl bg-white/95 shadow-lg border border-white/60 backdrop-blur-sm px-1 py-1 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-out">
                  <CardHeader className="pt-5 pb-5 px-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-md shadow-orange-200">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-semibold tracking-tight text-gray-900">
                        <span className="bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-transparent">
                          Innovation Recognition
                        </span>
                      </CardTitle>
                    </div>
                    <CardDescription className="mt-1 text-sm md:text-base text-gray-700 leading-relaxed">
                      Groundbreaking mobile outreach solution that brings therapy, eye care, hearing care, and physiotherapy services closer to underserved communities.
                    </CardDescription>
                  </CardHeader>
                </div>
              </motion.div>

              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 opacity-80 group-hover:opacity-100 blur-[1px] transition-opacity duration-300" />
                <div className="relative rounded-2xl bg-white/95 shadow-lg border border-white/60 backdrop-blur-sm px-1 py-1 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-out">
                  <CardHeader className="pt-5 pb-5 px-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center shadow-md shadow-orange-200">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-semibold tracking-tight text-gray-900">
                        <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                          Community Impact
                        </span>
                      </CardTitle>
                    </div>
                    <CardDescription className="mt-1 text-sm md:text-base text-gray-700 leading-relaxed">
                      Delivering sustained community health and welfare impact through accessible, mobile outreach and therapy units.
                    </CardDescription>
                  </CardHeader>
                </div>
              </motion.div>
            </motion.div>

            {/* Right column: recognition spotlight with images */}
            <motion.div
              className="relative group h-full"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-500 to-amber-500 opacity-80 group-hover:opacity-100 blur-[1.5px] transition-opacity duration-300" />
              <Card className="relative h-full border border-white/60 shadow-2xl rounded-3xl overflow-hidden bg-white/95 backdrop-blur-sm">
                {/* Celebration ribbon at the very top inside the card */}
                <div className="pt-4 pb-1">
                  <div className="relative w-full">
                    <div className="relative mx-6 flex items-center justify-between rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-yellow-400 px-6 py-3 shadow-md shadow-orange-200">
                      <div className="flex items-center gap-3">
                        <span className="h-3 w-3 rounded-full bg-white/95" />
                        <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.24em] text-white/95">
                          Recognition Spotlight
                        </span>
                      </div>
                      <span className="hidden md:inline-flex text-[11px] font-medium tracking-wide text-white/90">
                        Achievement Highlight
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-12 h-3 w-10 bg-orange-300/80 rounded-full blur-md" />
                  </div>
                </div>

                <CardHeader className="pb-2 pt-2 px-6 relative z-30 overflow-hidden">
                  <CardTitle className="text-2xl md:text-3xl font-semibold tracking-tight text-gray-900 mb-2">
                    <span className="bg-gradient-to-r from-orange-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                      Award-winning public sector innovation
                    </span>
                  </CardTitle>
                  <CardDescription className="text-base md:text-lg text-gray-800 leading-relaxed font-medium">
                         First place – Design of Mobile Outreach and Therapy Unit.
Directorate for Welfare of the Differently Abled & StartupTN, World Bank–backed initiative (2023).
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-3 pb-3 px-6 flex flex-col gap-3">
                  <div ref={emblaRef} className="relative rounded-2xl overflow-hidden bg-gray-100 shadow-md">
                    <div className="flex">
                      <div className="relative min-w-full h-72 w-full lg:h-80">
                        <Image
                          src="/images/recognition/certificate-placeholder.jpeg"
                          alt="Certificate of recognition for first place in the Mobile Outreach and Therapy Unit design hackathon"
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          priority
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        />
                      </div>

                      <div className="relative min-w-full h-72 w-full lg:h-80">
                        <Image
                          src="/images/recognition/ceremony-placeholder.jpg"
                          alt="Award ceremony photo presenting the certificate of recognition"
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {[0, 1].map((index) => (
                        <button
                          key={index}
                          type="button"
                          className={`h-2.5 w-2.5 rounded-full border border-orange-500 transition-all duration-300 ${
                            spotlightIndex === index ? "bg-orange-500 scale-110" : "bg-white/70 hover:bg-orange-100"
                          }`}
                          onClick={() => emblaApi && emblaApi.scrollTo(index)}
                          aria-label={index === 0 ? "View certificate" : "View award ceremony photo"}
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>

                {/* Confetti overlay above all content – continuous rain */}
                <motion.div className="pointer-events-none absolute inset-0 overflow-hidden z-40" initial={false}>
                  {Array.from({ length: 26 }).map((_, index) => {
                    const baseLeft = 4 + (index % 13) * 7
                    const rowOffset = index < 13 ? 0 : 8
                    const colors = [
                      "bg-pink-400",
                      "bg-fuchsia-400",
                      "bg-amber-300",
                      "bg-sky-400",
                      "bg-emerald-400",
                      "bg-purple-400",
                    ]
                    const colorClass = colors[index % colors.length]

                    const shapeTypes = ["bar", "square", "circle", "diamond", "triangle"] as const
                    const shape = shapeTypes[index % shapeTypes.length]

                    let width = 6
                    let height = 12
                    let borderRadius = 2
                    let initialRotate = -20
                    let clipPath: string | undefined = undefined

                    if (shape === "square") {
                      width = 8
                      height = 8
                      borderRadius = 2
                      initialRotate = 10
                    } else if (shape === "circle") {
                      width = 7
                      height = 7
                      borderRadius = 9999
                      initialRotate = 0
                    } else if (shape === "diamond") {
                      width = 8
                      height = 8
                      borderRadius = 2
                      initialRotate = 45
                    } else if (shape === "triangle") {
                      width = 10
                      height = 10
                      borderRadius = 0
                      initialRotate = 0
                      clipPath = "polygon(50% 0%, 0% 100%, 100% 100%)"
                    }

                    return (
                      <motion.span
                        key={index}
                        className={`absolute opacity-80 shadow-sm ${colorClass}`}
                        style={{
                          left: `${baseLeft}%`,
                          top: -40 - rowOffset * 4,
                          width,
                          height,
                          borderRadius,
                          transformOrigin: "center",
                          clipPath,
                        }}
                        animate={{
                          y: [0, 520],
                          x: [0, index % 2 === 0 ? 12 : -12, 0],
                          rotate: [initialRotate, initialRotate + 30, initialRotate - 24, initialRotate],
                        }}
                        transition={{
                          duration: 2.8 + (index % 7) * 0.3,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.14,
                        }}
                      />
                    )
                  })}
                </motion.div>

                {/* Burst-style confetti layer for occasional party pops */}
                <motion.div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 overflow-visible z-50" initial={false}>
                  {Array.from({ length: 12 }).map((_, index) => {
                    const colors = [
                      "bg-pink-400",
                      "bg-amber-300",
                      "bg-sky-400",
                      "bg-emerald-400",
                      "bg-purple-400",
                    ]
                    const colorClass = colors[index % colors.length]
                    const isWide = index % 3 === 0

                    return (
                      <motion.span
                        key={index}
                        className={`absolute opacity-90 shadow-sm ${colorClass}`}
                        style={{
                          top: 24,
                          left: `${10 + (index % 6) * 14}%`,
                          width: isWide ? 14 : 8,
                          height: isWide ? 4 : 8,
                          borderRadius: 3,
                          transformOrigin: "center",
                        }}
                        animate={{
                          y: [0, 180],
                          scale: [0.6, 1, 1],
                          rotate: [-30, 25, -10],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 1.6,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: 1.2 + index * 0.2,
                          repeatDelay: 3.2,
                        }}
                      />
                    )
                  })}
                </motion.div>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section
        id="about"
        className="relative overflow-hidden py-20 bg-gradient-to-b from-white via-[#F9FAFB] to-[#FFF7ED]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-0 h-64 w-64 rounded-full bg-orange-200/35 blur-3xl" />
          <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="relative z-10"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <Badge className="mb-4 bg-gray-100 text-gray-700 hover:bg-gray-100">About TrueSpur</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Innovation Meets Excellence</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At TrueSpur Technology Solutions, we believe in the power of technology to transform businesses and
                improve lives. Our team of experienced developers, designers, and consultants work closely with clients
                to deliver solutions that not only meet current needs but also scale for future growth.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                With deep expertise in healthcare, education, and digital transformation, we understand the unique
                challenges these industries face and provide tailored solutions using cutting-edge technologies.
              </p>
              <div className="mb-4 max-w-2xl">
                <motion.div
                  className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-yellow-50 via-orange-50 to-amber-100 border border-orange-200/80 shadow-xl shadow-orange-100/90 px-5 py-4 md:px-7 md:py-5"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.5 }}
                  whileHover={{ y: -4 }}
                >
                  <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-r from-yellow-300/20 via-orange-400/15 to-amber-300/25 opacity-60 blur-xl" />
                  <div className="relative flex items-start gap-3 md:gap-4">
                    <div className="mt-0.5 hidden sm:flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg shadow-orange-300/80">
                      <Smartphone className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-800 mb-2">
                        <span>For startup founders & product leaders</span>
                        <span className="hidden md:inline-flex h-4 w-[1px] bg-orange-300/70" />
                        <span className="hidden md:inline text-[10px] font-medium tracking-[0.18em] text-orange-600/90">
                          Product strategy · UX · Engineering
                        </span>
                      </p>
                      <p className="text-sm md:text-base text-gray-800 leading-relaxed">
                        <span className="font-semibold text-gray-900">From idea to launch</span>
                        {", we help you architect and build software that's ready for real users and real growth."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.4 }}
            >
              <div className="relative rounded-3xl bg-white/95 shadow-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 via-amber-500 to-yellow-400 opacity-95" />
                <div className="relative p-3">
                  <div className="relative rounded-2xl bg-black/5 overflow-hidden">
                    {/* Keep image size exactly as before */}
                    <img
                      src="/images/about-team.jpg"
                      alt="TrueSpur team collaborating on innovative technology solutions"
                      className="w-full h-[500px] object-cover rounded-2xl"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
                <div className="inline-flex items-start gap-3 rounded-2xl bg-white/95 px-4 py-3 md:px-5 md:py-3 shadow-lg border border-orange-100">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-r from-yellow-500 to-orange-500 shadow-md shadow-orange-200">
                    <Smartphone className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-900">From idea to real users</p>
                    <p className="text-xs text-gray-600">We build apps ready for growth.</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-3 right-6">
                <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-orange-200">
                  <span className="h-2 w-2 rounded-full bg-white/95" />
                  <span className="uppercase tracking-[0.18em]">Award Winning Team</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Customer Showcase Section */}
      <motion.section
        className="relative overflow-hidden py-20 bg-gradient-to-br from-slate-950 via-slate-950 to-black"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/4 h-72 w-72 -translate-x-1/2 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute -bottom-40 right-0 h-72 w-72 rounded-full bg-amber-400/25 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-10">
            <Badge className="mb-4 bg-orange-900 text-orange-300 hover:bg-orange-900">
              Trusted By Industry Leaders
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Our Valued Customers</h2>
            <p className="text-lg lg:text-xl text-slate-200/90 max-w-3xl mx-auto">
              We&apos;re proud to partner with innovative companies across healthcare, education, and enterprise sectors.
            </p>
            <p className="mt-3 text-sm uppercase tracking-[0.22em] text-orange-300/80">
              10+ customers • 4 industries • 100K+ annual transactions
            </p>
          </div>

          {/* Customer Logos */}
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="group relative overflow-hidden rounded-2xl bg-white/95 px-6 py-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-yellow-100 via-orange-100 to-amber-100" />
              <div className="relative flex h-24 w-full items-center justify-center">
                <img
                  src="/customers/Medispur logo.png"
                  alt="Medispur"
                  className="max-h-68 md:max-h-70 lg:max-h-74 max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-white/95 px-6 py-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-yellow-100 via-orange-100 to-amber-100" />
              <div className="relative flex h-20 w-full items-center justify-center">
                <img
                  src="/customers/jy-shipping-logo.png"
                  alt="Joy Shipping Services Private Limited"
                  className="max-h-68 md:max-h-70 lg:max-h-74 max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-white/95 px-6 py-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-yellow-100 via-orange-100 to-amber-100" />
              <div className="relative flex h-20 w-full items-center justify-center">
                <img
                  src="/customers/steel-world-logo.png"
                  alt="Steel World"
                  className="max-h-48 md:max-h-70 lg:max-h-44 max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
            <div className="group relative overflow-hidden rounded-2xl bg-white/95 px-6 py-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-yellow-100 via-orange-100 to-amber-100" />
              <div className="relative flex h-20 w-full items-center justify-center">
                <img
                  src="/customers/popular-steels-logo.png"
                  alt="Popular Steels"
                  className="max-h-68 md:max-h-70 lg:max-h-74 max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          </div>

          {/* Customer Testimonials Hub */}
          <div className="space-y-6">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-300">
                Customer Stories
              </p>
              <p className="text-xs text-gray-400">
                {activeTestimonial + 1} / 3
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <motion.div
                className="cursor-pointer"
                onClick={() => setActiveTestimonial(0)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
                viewport={{ once: true, amount: 0.3 }}
                animate={
                  activeTestimonial === 0
                    ? { scale: 1, y: -4 }
                    : { scale: 0.96, y: 0, opacity: 0.85 }
                }
              >
                <Card className={`h-full border ${
                  activeTestimonial === 0
                    ? "bg-slate-900 border-orange-500/60 shadow-2xl"
                    : "bg-slate-900/95 border-gray-800 shadow-lg"
                } text-white transition-all duration-300`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-orange-500 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-200 mb-4 italic">
                      "TrueSpur delivered an exceptional billing platform that streamlined our sales process. Their
                      expertise in critical thinking was invaluable."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-semibold text-sm">SM</span>
                      </div>
                      <div>
                        <p className="font-semibold">Munirul Gutha</p>
                        <p className="text-gray-400 text-sm">Founder, Popular Steels</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                className="cursor-pointer"
                onClick={() => setActiveTestimonial(1)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                animate={
                  activeTestimonial === 1
                    ? { scale: 1, y: -4 }
                    : { scale: 0.96, y: 0, opacity: 0.85 }
                }
              >
                <Card className={`h-full border ${
                  activeTestimonial === 1
                    ? "bg-slate-900 border-orange-500/60 shadow-2xl"
                    : "bg-slate-900/95 border-gray-800 shadow-lg"
                } text-white transition-all duration-300`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-orange-500 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-200 mb-4 italic">
                      "Truespur’s award-winning Mobile Outreach Vehicle is transforming disability services in rural
                      Tamil Nadu. Built in collaboration with the Government Disability Welfare Department, it brings
                      essential care and smart diagnostics directly to remote communities. Mohideen’s vision turned
                      innovation into impact—now, this vehicle is changing lives where it’s needed most."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-semibold text-sm">SO</span>
                      </div>
                      <div>
                        <p className="font-semibold">Senior Official</p>
                        <p className="text-gray-400 text-sm">TN Government Disability Welfare Department</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                className="cursor-pointer"
                onClick={() => setActiveTestimonial(2)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.15 }}
                viewport={{ once: true, amount: 0.3 }}
                animate={
                  activeTestimonial === 2
                    ? { scale: 1, y: -4 }
                    : { scale: 0.96, y: 0, opacity: 0.85 }
                }
              >
                <Card className={`h-full border ${
                  activeTestimonial === 2
                    ? "bg-slate-900 border-orange-500/60 shadow-2xl"
                    : "bg-slate-900/95 border-gray-800 shadow-lg"
                } text-white transition-all duration-300`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-orange-500 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-gray-200 mb-4 italic">
                      "Their AI-powered automation solution reduced our processing time by 60%. The ROI was evident
                      within the first quarter of implementation."
                    </p>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-semibold text-sm">MS</span>
                      </div>
                      <div>
                        <p className="font-semibold">Wasim Feroz</p>
                        <p className="text-gray-400 text-sm">Managing Director, Joy Shipping</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <div className="mt-4 flex items-center justify-center gap-3">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveTestimonial(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    activeTestimonial === index
                      ? "w-6 bg-orange-500"
                      : "w-2.5 bg-gray-600 hover:bg-gray-400"
                  }`}
                  aria-label={`Show testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Call to Action Band */}
          <div className="mt-14">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500 px-6 py-8 md:px-10 md:py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-2xl">
              <div>
                <h3 className="text-xl md:text-2xl font-semibold text-white mb-2">
                  Join these industry leaders in transforming their business with technology.
                </h3>
                <p className="text-sm md:text-base text-white/90 max-w-xl">
                  Share your goals with us and we&apos;ll help craft the next success story—tailored to your industry,
                  scale, and ambitions.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-white text-orange-600 hover:bg-orange-50 font-semibold px-6 md:px-8"
                >
                  Become Our Next Success Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <section id="contact" className="relative overflow-hidden py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-200/35 blur-3xl" />
          <div className="absolute -bottom-28 right-0 h-80 w-80 rounded-full bg-amber-200/40 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">Get In Touch</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {"Build Software That Moves Your Business Forward"}
            </h2>
            <p className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto">
              Have a product idea or operational challenge? Let’s design and build the right solution — built to scale from day one.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <div className="relative h-full rounded-2xl bg-gradient-to-br from-white via-orange-50/40 to-amber-50/70 border border-orange-100 shadow-xl shadow-orange-100/60 px-6 py-7 md:px-7 md:py-8 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
                <motion.div
                  className="pointer-events-none absolute -top-6 right-4 h-24 w-32 text-orange-200/70"
                  animate={{ opacity: [0.4, 0.9, 0.4], scale: [1, 1.03, 1] }}
                  transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                >
                  <svg viewBox="0 0 160 90" className="w-full h-full" aria-hidden="true">
                    <defs>
                      <linearGradient id="contact-tech" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="currentColor" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                      </linearGradient>
                    </defs>

                    <path
                      d="M10 40h20l8-10 10 22 10-30 12 28 8-14h26"
                      fill="none"
                      stroke="url(#contact-tech)"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M24 62h26M70 62h34M120 62h16"
                      fill="none"
                      stroke="url(#contact-tech)"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                    />
                    <circle cx="24" cy="40" r="3" fill="currentColor" fillOpacity="0.95" />
                    <circle cx="54" cy="46" r="2.5" fill="currentColor" fillOpacity="0.9" />
                    <circle cx="86" cy="38" r="2.5" fill="currentColor" fillOpacity="0.9" />
                    <circle cx="118" cy="46" r="2.5" fill="currentColor" fillOpacity="0.9" />
                  </svg>
                </motion.div>

                <div className="absolute top-3 left-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-md shadow-orange-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-white/95" />
                  <span>Contact Hub</span>
                </div>

                <div className="mt-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                        <p className="text-gray-800">info@truespur.ai</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                        <p className="text-gray-800">+91-9884664913</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Office</h4>
                        <p className="text-gray-800">N.G.O Colony, 1st Main Road</p>
                        <p className="text-gray-800">Adambakkam, Chennai</p>
                        <p className="text-gray-800">TamilNadu, 600088</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card className="relative rounded-2xl border border-orange-100 bg-white/95 shadow-xl shadow-orange-100/60 overflow-hidden">
              <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-yellow-500 via-orange-500 to-amber-500" />
              <CardHeader className="pt-6 pb-4 px-6">
                <CardTitle className="text-2xl">
                  {formStatus === "success" ? "Message sent" : "Send us a message"}
                </CardTitle>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 font-medium text-emerald-700 border border-emerald-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {formStatus === "success" ? "We've received your message" : "Typically replies within 24 hours"}
                  </span>
                  <span className="hidden md:inline text-[11px] text-gray-500">
                    {formStatus === "success"
                      ? "Watch for an email from info@truespur.ai with next steps."
                      : "Share a few details and we'll follow up with next steps."}
                  </span>
                  {formStatus !== "success" && (
                    <span className="inline-flex items-center gap-1 text-[11px] text-gray-400">
                      <span className="flex h-1.5 w-6 items-center justify-between">
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-300 animate-pulse" />
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-300 animate-[pulse_1.4s_ease-in-out_infinite_200ms]" />
                        <span className="h-1.5 w-1.5 rounded-full bg-orange-300 animate-[pulse_1.6s_ease-in-out_infinite_400ms]" />
                      </span>
                      <span>We're listening</span>
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4 px-6 pb-6">
                {formStatus === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-900 text-sm font-semibold mb-1">Thank you for reaching out.</p>
                    <p className="text-green-800 text-sm font-medium">{formMessage}</p>
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm font-medium">{formMessage}</p>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={formStatus === "loading"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 bg-white/95 focus:bg-orange-50/40 disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={formStatus === "loading"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={formStatus === "loading"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Project Type</label>
                    <div className="mb-2 flex flex-wrap gap-2">
                      {["Website Development", "Mobile App Development", "AI Solutions", "Not sure yet"].map((type) => (
                        <button
                          key={type}
                          type="button"
                          disabled={formStatus === "loading"}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              projectType: type === "Not sure yet" ? "Product Consulting" : type,
                            }))
                          }
                          className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed ${
                            (type === "Not sure yet" && formData.projectType === "Product Consulting") ||
                            formData.projectType === type
                              ? "border-orange-400 bg-orange-50 text-orange-700"
                              : "border-gray-200 bg-white text-gray-600 hover:border-orange-300 hover:bg-orange-50 hover:text-orange-700"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      disabled={formStatus === "loading"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 bg-white/95 focus:bg-orange-50/40 disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      <option>Website Development</option>
                      <option>Mobile App Development</option>
                      <option>Custom Software Development</option>
                      <option>Product Consulting</option>
                      <option>AI Solutions</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={formStatus === "loading"}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 bg-white/95 focus:bg-orange-50/40 disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="Tell us about your project..."
                      required
                    />
                    <div className="mt-1 flex items-center justify-between text-[11px] text-gray-500">
                      <span className="hidden sm:inline">Share your goals, timeline, and any links you think are helpful.</span>
                      <span>{formData.message.length} / 500</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="inline-flex items-center gap-1">
                      <Lock className="h-3.5 w-3.5 text-gray-400" />
                      <span>Your details are kept private and used only to contact you.</span>
                    </div>
                    <span className="hidden sm:inline">We usually respond within one business day.</span>
                  </div>
                  <Button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <button
                  onClick={() => scrollToSection("home")}
                  className="focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
                >
                  <img
                    src="/logo/truespur-footer-logo.png"
                    alt="TrueSpur Technology Solutions - We Craft. You Lead."
                    className="h-12 w-auto brightness-0 invert hover:opacity-80 transition-opacity cursor-pointer"
                  />
                </button>
              </div>
              <p className="text-gray-400 mb-4">Transforming businesses with cutting-edge technology solutions.</p>
              <p className="text-orange-400 text-sm italic">"We Craft. You Lead."</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-orange-400">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Website Development
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Mobile App Development
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Custom Software
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    AI Solutions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Product Consulting
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-orange-400">Industries</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => scrollToSection("expertise")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Healthcare
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("expertise")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Education
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("expertise")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Digital Transformation
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("expertise")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Enterprise Solutions
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-orange-400">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Our Team
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2026 TrueSpur Technology Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
