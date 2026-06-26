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
import { LeadFormDialog } from "@/components/lead-form-dialog"
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
  Palette,
  Target,
  Building2,
  Database,
  Video,
  Shield,
  Network,
  Activity,
  Settings,
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
        <CardContent className="p-8 md:p-10 lg:p-12 flex flex-col items-center justify-center">
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
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false)
  const [leadFormSource, setLeadFormSource] = useState<
    "get-started" | "start-project" | "get-proposal" | "success-story" | null
  >(null)
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

  const openLeadForm = (
    source: "get-started" | "start-project" | "get-proposal" | "success-story",
  ) => {
    setLeadFormSource(source)
    setIsLeadFormOpen(true)
  }

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
      <LeadFormDialog
        open={isLeadFormOpen}
        onOpenChange={setIsLeadFormOpen}
        source={leadFormSource}
      />
      {/* Header */}
      {/* TODO: Navigation visual refinement intentionally deferred until full Homepage implementation is complete.
          Future refinement should evaluate: navigation proportions, logo scale, menu spacing, visual hierarchy, overall balance against all homepage sections */}
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
                className="h-11 w-auto md:h-13 lg:h-15 xl:h-17 hover:opacity-80 transition-opacity cursor-pointer"
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
                        className={`text-base font-medium transition-colors duration-200 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-3 py-2 relative ${
                          activeSection === item.id
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
                        onClick={() => scrollToSection(item.id)}
                        className={`text-base font-medium transition-colors duration-200 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-3 py-2 relative ${
                          activeSection === item.id
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
                    ?
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

      {/* Hero Section */}
      <motion.section
        id="home"
        className="relative min-h-screen overflow-hidden px-4 pt-32 pb-20 lg:pt-36 lg:pb-24 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Background System */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
        
        {/* Subtle texture overlay */}
        <div 
          className="absolute inset-0 opacity-[0.015]" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} 
        />
        
        {/* Optional: Subtle orange glow */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/3.5 blur-3xl rounded-full" />

        <div className="relative container mx-auto">
          <div className="max-w-[900px] ml-0 lg:ml-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0 }}
              viewport={{ once: true }}
            >
              <h1 className="font-heading text-5xl lg:text-7xl xl:text-8xl font-black leading-[1.15] text-white">
                Turn Ideas Into Scalable Digital Products
              </h1>
            </motion.div>

            <motion.p
              className="text-lg lg:text-xl leading-relaxed text-slate-300 mt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true }}
            >
              From validation to launch, we help you build products that solve real problems and scale with confidence.
            </motion.p>

            <motion.p
              className="text-base text-slate-200 font-medium mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true }}
            >
              Founder-led product studio. Building products — our own and yours.
            </motion.p>

            <motion.p
              className="text-sm lg:text-base text-slate-400 mt-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
              viewport={{ once: true }}
            >
              15+ years building products across healthcare and complex platforms.
            </motion.p>

            <motion.div
              className="mt-16"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Button
                onClick={() => openLeadForm("start-project")}
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xl px-10 py-7 rounded shadow-2xl shadow-orange-500/40 hover:from-yellow-600 hover:to-orange-600 hover:scale-[1.03] transition-all duration-300"
              >
                Start Your Project
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section 2: Product Studio Bridge */}
      <div className="relative -mt-8 md:-mt-10 lg:-mt-12 z-10">
        <div className="container mx-auto px-4">
          <motion.div
            className="relative mx-auto max-w-5xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="relative rounded-3xl bg-white/95 backdrop-blur-sm shadow-2xl shadow-slate-900/10 border border-gray-100/50 p-8 md:p-10 lg:p-12">
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-orange-50/40 via-transparent to-amber-50/30 pointer-events-none" />
              
              <div className="relative text-center">
                <h2 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900">
                  We Understand Product Challenges From the Inside
                </h2>
                <p className="text-base lg:text-lg text-gray-600 mt-6 max-w-3xl mx-auto">
                  We're building four products right now—Clinax, Halo, TrueBill, TafsirAI. Each one teaches us what founders face: validating ideas, making tough technical calls, launching without costly mistakes.
                </p>
                <p className="text-base lg:text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                  That's why we build alongside you—not just for you.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section 3: Products We're Building */}
      <motion.section
        className="relative py-16 md:py-24 lg:py-32 bg-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Headline */}
            <motion.div
              className="text-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900">
                Products We're Building
              </h2>
            </motion.div>

            {/* Section Introduction */}
            <motion.div
              className="text-center mb-12 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-base lg:text-lg text-gray-600">
                We don't just build products for clients—we build our own. Each one teaches us something we bring to yours.
              </p>
            </motion.div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5 lg:gap-6 mb-12">
              {/* Clinax */}
              <motion.div
                className="group relative bg-white rounded-2xl border border-gray-100/50 p-6 lg:p-8 shadow-sm shadow-gray-900/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Top brand accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400" />
                
                {/* Left gradient accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-amber-400 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category badge */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 mb-6">
                  Healthcare Platform
                </span>
                
                {/* Product name */}
                <h3 className="font-heading text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  Clinax
                </h3>
                
                {/* Description */}
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed mb-5">
                  Healthcare platform connecting patients, providers, and pharmacies.
                </p>
                
                {/* Status badge */}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-50/80 text-purple-600">
                  Beta — Active Development
                </span>
              </motion.div>

              {/* Halo */}
              <motion.div
                className="group relative bg-white rounded-2xl border border-gray-100/50 p-6 lg:p-8 shadow-sm shadow-gray-900/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Top brand accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400" />
                
                {/* Left gradient accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-amber-400 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category badge */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 mb-6">
                  Healthcare Platform
                </span>
                
                {/* Product name */}
                <h3 className="font-heading text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  Halo
                </h3>
                
                {/* Description */}
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed mb-5">
                  Telemedicine platform for remote patient care.
                </p>
                
                {/* Status badge */}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50/80 text-blue-600">
                  MVP — Pilot Phase
                </span>
              </motion.div>

              {/* TrueBill */}
              <motion.div
                className="group relative bg-white rounded-2xl border border-gray-100/50 p-6 lg:p-8 shadow-sm shadow-gray-900/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Top brand accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400" />
                
                {/* Left gradient accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-amber-400 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category badge */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 mb-6">
                  Business Tool
                </span>
                
                {/* Product name */}
                <h3 className="font-heading text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  TrueBill
                </h3>
                
                {/* Description */}
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed mb-5">
                  Billing and invoicing tool for modern businesses.
                </p>
                
                {/* Status badge */}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50/80 text-green-600">
                  Production — Live Customers
                </span>
              </motion.div>

              {/* TafsirAI */}
              <motion.div
                className="group relative bg-white rounded-2xl border border-gray-100/50 p-6 lg:p-8 shadow-sm shadow-gray-900/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {/* Top brand accent */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-400 to-amber-400" />
                
                {/* Left gradient accent */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-amber-400 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Category badge */}
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 mb-6">
                  AI Application
                </span>
                
                {/* Product name */}
                <h3 className="font-heading text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
                  TafsirAI
                </h3>
                
                {/* Description */}
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed mb-5">
                  AI-powered platform for Islamic text analysis.
                </p>
                
                {/* Status badge */}
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-50/80 text-gray-600">
                  Concept — Early Stage
                </span>
              </motion.div>
            </div>

            {/* Closing Statement */}
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-base lg:text-lg text-gray-600">
                Each product we build teaches us something we bring to yours.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section 4: How We Build Products That Scale */}
      <motion.section
        className="relative py-20 md:py-28 lg:py-36 bg-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            className="text-center mb-20 md:mb-28 lg:mb-36"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 rounded-full mb-8">
              <span className="text-sm font-semibold tracking-widest uppercase text-gray-700">Our Approach</span>
            </div>
            <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-8">
              How We Build Products That Scale
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Built for ambitious founders who need speed and clarity.
            </p>
          </motion.div>

          {/* Process Timeline */}
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              {/* Subtle connector line for desktop */}
              <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-100 to-transparent hidden lg:block" />
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 lg:gap-8">
                {[
                  {
                    num: "01",
                    title: "Discover",
                    tagline: "Validate before you invest.",
                    desc: "We help you test assumptions, understand your market, and define what success looks like before writing a single line of code.",
                  },
                  {
                    num: "02",
                    title: "Design",
                    tagline: "Create experiences users love.",
                    desc: "User research, wireframes, prototypes, and visual design that turns complex problems into intuitive solutions.",
                  },
                  {
                    num: "03",
                    title: "Build",
                    tagline: "Develop scalable products.",
                    desc: "Clean architecture, modern tech stack, and engineering practices that support growth from day one.",
                  },
                  {
                    num: "04",
                    title: "Launch",
                    tagline: "Release with confidence.",
                    desc: "Testing, deployment, monitoring, and support to ensure your product performs in the real world.",
                  },
                  {
                    num: "05",
                    title: "Scale",
                    tagline: "Grow through automation and insights.",
                    desc: "Optimize performance, add features strategically, and use data to guide your product evolution.",
                  },
                ].map((step, index) => (
                  <motion.div
                    key={step.num}
                    className="relative group"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    {/* Step Number - Primary Visual Anchor */}
                    <div className="mb-8">
                      <span className="font-heading text-5xl md:text-6xl font-black text-gray-900">
                        {step.num}
                      </span>
                    </div>

                    {/* Step Title - Secondary Hierarchy */}
                    <h3 className="font-heading text-xl md:text-2xl font-semibold text-gray-900 mb-3">
                      {step.title}
                    </h3>

                    {/* Tagline - Tertiary Hierarchy with Color */}
                    <p className="text-sm md:text-base font-medium text-orange-600 mb-4">
                      {step.tagline}
                    </p>

                    {/* Description - Supporting Content */}
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-xs">
                      {step.desc}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 5: Deep Healthcare Expertise */}
      <motion.section
        className="pt-12 md:pt-16 lg:pt-20 pb-16 md:pb-24 lg:pb-32 bg-gray-50"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Section Headline */}
            <motion.h2
              className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Deep Healthcare Expertise
            </motion.h2>
            
            {/* Body Copy */}
            <motion.div
              className="max-w-3xl mx-auto text-center space-y-6 text-base lg:text-lg text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p>
                Most teams hit a wall with healthcare technology. The regulations, the integrations, the compliance requirements—they stop projects cold.
              </p>
              <p>
                We've navigated it all for over a decade: EHR integration, HIPAA compliance, HL7/FHIR standards, telemedicine regulations. Won government contracts. Rescued failing platforms. Built products serving thousands of patients.
              </p>
              <p className="text-gray-800 font-medium text-lg lg:text-xl mt-10">
                That expertise makes us better builders—whether your product is in healthcare or not.
              </p>
            </motion.div>
            
            {/* Expertise Grid */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-4xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              {[
                { id: 1, name: 'EHR Integration', icon: Database },
                { id: 2, name: 'Telemedicine', icon: Video },
                { id: 3, name: 'HIPAA Compliance', icon: Shield },
                { id: 4, name: 'HL7/FHIR', icon: Network },
                { id: 5, name: 'Clinical Workflows', icon: Activity },
                { id: 6, name: 'Healthcare Operations', icon: Settings },
              ].map((capability, index) => (
                <motion.div
                  key={capability.id}
                  className="capability-block group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="flex flex-col items-center text-center p-2.5 rounded-lg border border-gray-100/60 bg-white/80 hover:border-gray-200 transition-all duration-300">
                    {/* Icon */}
                    <div className="h-8 w-8 rounded-lg bg-orange-100/50 flex items-center justify-center mb-1.5">
                      <capability.icon className="h-4 w-4 text-orange-600" />
                    </div>
                    
                    {/* Label */}
                    <span className="text-sm font-medium text-gray-900">
                      {capability.name}
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
          </div>
        </div>
      </motion.section>

      {/* Section 6: Proven Track Record */}
      <motion.section
        className="py-16 md:py-24 lg:py-32 bg-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            
            {/* Section Headline */}
            <motion.h2
              className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Proven Track Record
            </motion.h2>

            {/* Two-column layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20">
              
              {/* Company Proof Column (60% visual weight) */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className="font-heading text-2xl lg:text-3xl font-bold text-gray-900">
                  Active Product Studio
                </h3>
                
                <p className="text-base lg:text-lg text-gray-600">
                  Four products in active development. From healthcare platforms to AI tools. Each one proves our model works and teaches us something we bring to yours.
                </p>
                
                {/* Product logos grid */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {/* Clinax */}
                  <div className="flex items-center justify-center py-3 px-4 bg-white rounded-lg border border-gray-100/60 shadow-sm">
                    <div className="text-center">
                      <div className="h-8 w-8 rounded-lg bg-orange-100/50 flex items-center justify-center mb-1 mx-auto">
                        <Heart className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-900">Clinax</span>
                    </div>
                  </div>
                  
                  {/* Halo */}
                  <div className="flex items-center justify-center py-3 px-4 bg-white rounded-lg border border-gray-100/60 shadow-sm">
                    <div className="text-center">
                      <div className="h-8 w-8 rounded-lg bg-orange-100/50 flex items-center justify-center mb-1 mx-auto">
                        <Video className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-900">Halo</span>
                    </div>
                  </div>
                  
                  {/* TrueBill */}
                  <div className="flex items-center justify-center py-3 px-4 bg-white rounded-lg border border-gray-100/60 shadow-sm">
                    <div className="text-center">
                      <div className="h-8 w-8 rounded-lg bg-orange-100/50 flex items-center justify-center mb-1 mx-auto">
                        <Building2 className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-900">TrueBill</span>
                    </div>
                  </div>
                  
                  {/* TafsirAI */}
                  <div className="flex items-center justify-center py-3 px-4 bg-white rounded-lg border border-gray-100/60 shadow-sm">
                    <div className="text-center">
                      <div className="h-8 w-8 rounded-lg bg-orange-100/50 flex items-center justify-center mb-1 mx-auto">
                        <Brain className="h-4 w-4 text-orange-600" />
                      </div>
                      <span className="text-xs font-medium text-gray-900">TafsirAI</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Founder Proof Column (40% visual weight) */}
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <h3 className="font-heading text-2xl lg:text-3xl font-bold text-gray-900">
                  Government-Recognized Innovation
                </h3>
                
                <p className="text-base lg:text-lg text-gray-600">
                  Our founder won a competitive healthcare contract from the Government of India—beating multinational corporations. When a critical healthcare platform was failing at 5% success, we turned it around to 80%+ within months.
                </p>
                
                <p className="text-base font-medium text-gray-600">
                  Third-party validation. Measurable outcomes.
                </p>
              </motion.div>

            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 7: Final CTA */}
      <motion.section
        className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            
            {/* Section Headline */}
            <motion.h2
              className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              Have an Idea Worth Building?
            </motion.h2>
            
            {/* Supporting Copy */}
            <motion.div
              className="space-y-4 text-base lg:text-lg text-slate-300 mb-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <p>Whether you're validating a concept or ready to build, let's talk. We'll discuss your product, your goals, and whether we're the right partner.</p>
              <p>No sales pitch. Just an honest conversation about what you're building.</p>
            </motion.div>
            
            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <Button 
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-lg px-8 py-6 rounded-full hover:scale-[1.03] transition-all duration-300"
                onClick={() => scrollToSection("contact")}
              >
                Start Your Project
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-orange-400/60 text-slate-100 text-lg px-8 py-6 rounded-full hover:bg-white hover:text-slate-900 hover:border-white transition-all duration-300"
                onClick={() => window.open('https://calendly.com/truespur', '_blank')}
              >
                Schedule a Call
              </Button>
            </motion.div>
            
          </div>
        </div>
      </motion.section>

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
              <p className="text-amber-300 text-sm italic tracking-wide">"We Craft. You Lead."</p>
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
