"use client"

import type React from "react"

import Image from "next/image"
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect, useRef } from "react"
import { LeadFormDialog } from "@/components/lead-form-dialog"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { SecondaryButton } from "@/components/cta/SecondaryButton"
import { JsonLd } from "@/components/seo/JsonLd"
import { SITE_CONFIG } from "@/lib/constants"
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
  Rocket,
  Building2,
  Database,
  Video,
  Shield,
  Network,
  Activity,
  Settings,
  ChevronLeft,
  ChevronRight,
  Award,
} from "lucide-react"

// Reduced motion utility
const useReducedMotion = () => {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setShouldReduceMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setShouldReduceMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return shouldReduceMotion
}

// Animation variants with reduced motion support
const createAnimationProps = (shouldReduceMotion: boolean) => ({
  initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 },
  whileInView: shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
  transition: shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, amount: 0.3 }
})

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
  const rounded = useTransform(count, (latest: number) => Math.floor(latest))

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
      <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-yellow-400/70 via-orange-500/70 to-amber-500/70 opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
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
  const shouldReduceMotion = useReducedMotion()
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

  const openLeadForm = (source: string) => {
    setLeadFormSource(source as "get-started" | "start-project" | "get-proposal" | "success-story")
    setIsLeadFormOpen(true)
  }

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

  const navigateToSection = (sectionId: string) => {
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
          label: "Clinax",
          href: "/products/healthcare/clinexa",
          description: "Connected care platform for modern healthcare delivery.",
        },
        {
          label: "Halo",
          href: "/products/healthcare/halome",
          description: "Patient engagement and outreach for hospitals and clinics.",
        },
      ],
    },
    {
      category: "Digital Transformation",
      items: [
        {
          label: "TrueBill",
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

  const approachSteps = [
    {
      num: "01",
      title: "Discover",
      tagline: "Strategy & Validation",
      desc: "Test assumptions, understand your market, and define success before writing a single line of code.",
      icon: Target,
      iconBg: "bg-orange-50",
      iconColor: "text-orange-500",
      numColor: "text-orange-500",
      bar: "from-yellow-400 to-orange-500",
      ring: "ring-1 ring-orange-100",
    },
    {
      num: "02",
      title: "Design",
      tagline: "Experience First",
      desc: "User research, wireframes, and visual design that turns complex problems into intuitive solutions.",
      icon: Palette,
      iconBg: "bg-violet-100",
      iconColor: "text-violet-600",
      numColor: "text-violet-600",
      bar: "from-violet-400 to-purple-500",
      ring: "ring-1 ring-violet-100",
    },
    {
      num: "03",
      title: "Build",
      tagline: "Engineering Excellence",
      desc: "Clean architecture, modern tech stack, and engineering practices that support growth from day one.",
      icon: Code,
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600",
      numColor: "text-sky-600",
      bar: "from-sky-400 to-blue-500",
      ring: "ring-1 ring-sky-100",
    },
    {
      num: "04",
      title: "Launch",
      tagline: "Seamless Deployment",
      desc: "Testing, deployment, monitoring, and support to ensure your product performs in the real world.",
      icon: Rocket,
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600",
      numColor: "text-teal-600",
      bar: "from-teal-400 to-emerald-500",
      ring: "ring-1 ring-teal-100",
    },
    {
      num: "05",
      title: "Scale",
      tagline: "Data-Driven Growth",
      desc: "Optimize performance, add features strategically, and use data to guide your product evolution.",
      icon: Zap,
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600",
      numColor: "text-amber-600",
      bar: "from-amber-400 to-yellow-500",
      ring: "ring-1 ring-amber-100",
    },
  ]

  const [activeApproachStep, setActiveApproachStep] = useState(0)
  const [isApproachAutoplay, setIsApproachAutoplay] = useState(true)

  useEffect(() => {
    if (!isApproachAutoplay) return
    const timer = setInterval(() => {
      setActiveApproachStep((prev) => (prev + 1) % approachSteps.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [isApproachAutoplay, activeApproachStep])

  const expertiseAreas = [
    { id: 1, name: 'EHR Integration', icon: Database, desc: 'Seamless data flow across clinical systems.', tint: 'amber' as const },
    { id: 2, name: 'Telemedicine', icon: Video, desc: 'Secure, low-latency virtual care platforms.', tint: 'slate' as const },
    { id: 3, name: 'HIPAA Compliance', icon: Shield, desc: 'Ironclad security and privacy standards.', tint: 'amber' as const },
    { id: 4, name: 'HL7/FHIR', icon: Network, desc: 'Modern interoperability for healthcare data.', tint: 'slate' as const },
    { id: 5, name: 'Clinical Workflows', icon: Activity, desc: 'Optimizing for the provider experience.', tint: 'amber' as const },
    { id: 6, name: 'Operations', icon: Settings, desc: 'Scaling the backend of modern health.', tint: 'slate' as const },
  ]

  const [activeExpertise, setActiveExpertise] = useState(0)
  const [isExpertiseAutoplay, setIsExpertiseAutoplay] = useState(true)

  useEffect(() => {
    if (!isExpertiseAutoplay) return
    const timer = setInterval(() => {
      setActiveExpertise((prev) => (prev + 1) % expertiseAreas.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isExpertiseAutoplay, activeExpertise])

  const ActiveExpertiseIcon = expertiseAreas[activeExpertise].icon

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "TrueSpur Technology Solutions",
          description: "Transforming businesses with cutting-edge technology solutions. We specialize in website development, mobile apps, custom software, AI solutions, and product consulting.",
          url: "https://truespur.ai",
          logo: "https://truespur.ai/logo/truespur-main-logo.png",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "TrueSpur Technology Solutions",
          url: "https://truespur.ai",
          description: "Transforming businesses with cutting-edge technology solutions. We specialize in website development, mobile apps, custom software, AI solutions, and product consulting.",
        }}
      />
      <LeadFormDialog
        open={isLeadFormOpen}
        onOpenChange={setIsLeadFormOpen}
        source={leadFormSource}
      />
      {/* Header */}
      <Header currentPage="home" />

      <main id="main-content" className="focus:outline-none">

      {/* Hero Section */}
      <motion.section
        id="home"
        aria-labelledby="hero-heading"
        className="relative py-20 md:py-28 lg:py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"
        {...createAnimationProps(shouldReduceMotion)}
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

        {/* Ambient glow — right side where image lives */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/5 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute top-0 left-0 w-80 h-80 bg-slate-800/40 blur-3xl rounded-full pointer-events-none" />

        <div className="relative container mx-auto px-4">
          {/* Two-column split: text left, photo right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center max-w-7xl mx-auto">

            {/* Left column */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0 }}
              >
                <h1 id="hero-heading" className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.1] text-white">
                  Turn Ideas Into{" "}
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    Scalable Digital
                  </span>{" "}
                  Products
                </h1>
              </motion.div>

              <motion.p
                className="text-base lg:text-lg leading-relaxed text-slate-300 mt-6 max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
              >
                From validation to launch, we help you build products that solve real problems and scale with confidence.
              </motion.p>

              <motion.p
                className="text-sm text-slate-400 mt-2 max-w-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
              >
                Founder-led product studio. Building products — our own and yours.
              </motion.p>

              {/* Credential pills */}
              <motion.div
                className="flex flex-wrap gap-2.5 mt-8"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
              >
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                  <span className="text-sm font-semibold text-slate-200">15+ Years Experience</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                  <span className="text-sm font-semibold text-slate-200">4 Products Building</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.08] border border-white/10 backdrop-blur-sm">
                  <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
                  <span className="text-sm font-semibold text-slate-200">Govt. Recognized</span>
                </div>
              </motion.div>

              <motion.div
                className="mt-10"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
              >
                <Button
                  onClick={() => openLeadForm("start-project")}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-base lg:text-lg px-8 py-6 rounded-full shadow-lg shadow-orange-500/25 hover:from-yellow-600 hover:to-orange-600 hover:scale-[1.01] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-slate-900"
                >
                  Start Your Project
                </Button>
              </motion.div>
            </div>

            {/* Right column — team photo with floating proof cards */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            >
              {/* Decorative glow behind image */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-orange-500/15 to-amber-500/10 blur-2xl pointer-events-none" />

              {/* Photo frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-slate-900/60 ring-1 ring-white/10">
                <Image
                  src="/images/hero-team-collaboration.png"
                  alt="TrueSpur team collaborating on product strategy around a whiteboard showing a product roadmap"
                  width={640}
                  height={428}
                  className="w-full h-auto object-cover"
                  priority
                />
                {/* Subtle vignette bottom */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-950/30 to-transparent pointer-events-none" />
              </div>

              {/* Floating proof card — bottom-left */}
              <motion.div
                className="absolute -bottom-5 -left-5 bg-white rounded-xl px-4 py-3 shadow-xl shadow-slate-900/20 border border-gray-100/60"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 }}
              >
                <p className="text-xs text-gray-500 font-medium uppercase tracking-wide">Recognized by</p>
                <p className="text-xl font-black text-gray-900 font-heading leading-tight">StartupTN</p>
                <p className="text-xs text-gray-500 mt-0.5">Tamil Nadu Govt. initiative</p>
              </motion.div>

              {/* Floating award badge — top-right */}
              <motion.div
                className="absolute -top-5 -right-5 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl px-6 py-5 shadow-2xl shadow-orange-500/40 ring-2 ring-white/30"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.9 }}
              >
                <p className="font-heading text-xl font-black text-white leading-none tracking-tight">#1 of 54</p>
                <p className="text-base font-semibold text-orange-100 leading-tight mt-1.5">Govt. Award</p>
              </motion.div>
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
                  We&apos;re building four products right now—Clinax, Halo, TrueBill, TafsirAI. Each one teaches us what founders face: validating ideas, making tough technical calls, launching without costly mistakes.
                </p>
                <p className="text-base lg:text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
                  That&apos;s why we build alongside you—not just for you.
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
                Products We&apos;re Building
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
                We don&apos;t just build products for clients—we build our own. Each one teaches us something we bring to yours.
              </p>
            </motion.div>

            {/* Product Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-5 lg:gap-6 mb-12">

              {/* Clinax — Healthcare: teal/cyan identity */}
              <motion.div
                className="group relative bg-white rounded-2xl border border-gray-100/50 p-6 lg:p-8 shadow-sm shadow-gray-900/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-400 to-cyan-500" />
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-teal-400 to-cyan-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Domain icon block */}
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-teal-50 to-cyan-50 border border-teal-100/60 flex items-center justify-center mb-5">
                  <Heart className="h-7 w-7 text-teal-600" strokeWidth={1.5} />
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-teal-50 text-teal-700 mb-4">
                  Healthcare Platform
                </span>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                  Clinax
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Healthcare platform connecting patients, providers, and pharmacies.
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-purple-50 text-purple-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                  Beta — Active Development
                </span>
              </motion.div>

              {/* Halo — Patient Engagement: sky/blue identity */}
              <motion.div
                className="group relative bg-white rounded-2xl border border-gray-100/50 p-6 lg:p-8 shadow-sm shadow-gray-900/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-sky-400 to-blue-500" />
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-400 to-blue-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-sky-50 to-blue-50 border border-sky-100/60 flex items-center justify-center mb-5">
                  <Users className="h-7 w-7 text-sky-600" strokeWidth={1.5} />
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-sky-50 text-sky-700 mb-4">
                  Patient Engagement
                </span>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                  Halo
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Telemedicine platform for remote patient care.
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  MVP — Pilot Phase
                </span>
              </motion.div>

              {/* TrueBill — Business Tool: amber/green identity */}
              <motion.div
                className="group relative bg-white rounded-2xl border border-gray-100/50 p-6 lg:p-8 shadow-sm shadow-gray-900/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 to-orange-500" />
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-amber-400 to-orange-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100/60 flex items-center justify-center mb-5">
                  <Zap className="h-7 w-7 text-amber-600" strokeWidth={1.5} />
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 mb-4">
                  Business Tool
                </span>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                  TrueBill
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  Billing and invoicing tool for modern businesses.
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                  Production — Live Customers
                </span>
              </motion.div>

              {/* TafsirAI — AI Application: indigo/violet identity */}
              <motion.div
                className="group relative bg-white rounded-2xl border border-gray-100/50 p-6 lg:p-8 shadow-sm shadow-gray-900/5 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-400 to-violet-500" />
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 to-violet-500 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-50 to-violet-50 border border-indigo-100/60 flex items-center justify-center mb-5">
                  <Brain className="h-7 w-7 text-indigo-600" strokeWidth={1.5} />
                </div>
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 mb-4">
                  AI Application
                </span>
                <h3 className="font-heading text-2xl font-bold text-gray-900 mb-2">
                  TafsirAI
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-5">
                  AI-powered platform for Islamic text analysis.
                </p>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-50 text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
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
        className="relative py-16 md:py-24 lg:py-32 bg-white overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Dynamic Background Elements for Glassmorphism */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div 
            className="absolute top-1/4 -left-20 w-96 h-96 bg-orange-100/30 rounded-full blur-[100px]"
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-1/4 -right-20 w-96 h-96 bg-violet-100/30 rounded-full blur-[100px]"
            animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="container mx-auto px-4 relative z-10">
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
            <h2 className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-8 leading-[1.15] tracking-tight">
              How We Build <br className="md:hidden" />
              <span className="relative inline-block mt-2 md:mt-0">
                <span className="relative z-10 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Products That Scale
                </span>
                {/* Dynamic Glowing Aura - Multi-layered */}
                <motion.span 
                  className="absolute -inset-x-12 -inset-y-6 bg-orange-500/10 blur-[50px] rounded-full -z-20"
                  animate={{ 
                    opacity: [0.1, 0.3, 0.1], 
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{ 
                    duration: 6, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                <motion.span 
                  className="absolute -inset-x-8 -inset-y-4 bg-yellow-400/20 blur-3xl rounded-full -z-10"
                  animate={{ 
                    opacity: [0.2, 0.5, 0.2], 
                    scale: [0.95, 1.1, 0.95],
                    rotate: [0, 5, -5, 0] 
                  }}
                  transition={{ 
                    duration: 5, 
                    repeat: Infinity, 
                    ease: "easeInOut" 
                  }}
                />
                <motion.span 
                  className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 blur-xl rounded-full -z-10"
                  animate={{ 
                    opacity: [0.3, 0.7, 0.3], 
                    scale: [1, 1.05, 1] 
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: 0.5 
                  }}
                />
              </span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Built for ambitious founders who need speed and clarity.
            </p>
          </motion.div>

          {/* Process Steps — Interactive Connected Journey */}
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            onMouseLeave={() => setIsApproachAutoplay(true)}
          >
            {/* Desktop Navigation Path (Horizontal) */}
            <div className="hidden lg:block relative mb-16">
              {/* Connecting Path Line */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-yellow-400 via-violet-400 to-orange-500"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(activeApproachStep / (approachSteps.length - 1)) * 100}%` }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>

              <div className="relative flex justify-between items-center px-2">
                {approachSteps.map((step, index) => {
                  const isActive = activeApproachStep === index
                  const isPast = activeApproachStep > index
                  
                  return (
                    <div key={step.num} className="relative flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveApproachStep(index)
                          setIsApproachAutoplay(false)
                        }}
                        onMouseEnter={() => {
                          setActiveApproachStep(index)
                          setIsApproachAutoplay(false)
                        }}
                        className="group relative z-10"
                      >
                        {/* Circle Node */}
                        <motion.div 
                          className={`w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all duration-500 bg-white ${
                            isActive 
                              ? `border-transparent shadow-xl ${step.ring.replace('ring-1', 'ring-4')}` 
                              : isPast 
                                ? "border-gray-300" 
                                : "border-gray-200"
                          }`}
                          animate={{ 
                            scale: isActive ? 1.1 : 1,
                          }}
                        >
                          <div className={`w-full h-full rounded-full flex items-center justify-center ${isActive ? step.iconBg : 'bg-transparent'}`}>
                            <span className={`font-heading text-xl font-black transition-colors duration-500 ${
                              isActive ? step.numColor : isPast ? "text-gray-400" : "text-gray-300"
                            }`}>
                              {step.num}
                            </span>
                          </div>
                        </motion.div>

                        {/* Label with dynamic glassmorphism */}
                        <motion.div 
                          className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-center"
                          animate={{ 
                            y: isActive ? 4 : 0,
                            opacity: isActive ? 1 : 0.6
                          }}
                        >
                          <div className={`relative px-4 py-1.5 rounded-full transition-all duration-500 ${
                            isActive ? "bg-white/40 backdrop-blur-md border border-white/20 shadow-sm" : "bg-transparent border-transparent"
                          }`}>
                            <span className={`text-sm font-bold tracking-tight ${isActive ? "text-gray-900" : "text-gray-500"}`}>
                              {step.title}
                            </span>
                          </div>
                        </motion.div>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Mobile Navigation Path (Vertical - compact) */}
            <div className="lg:hidden flex items-center justify-between px-2 mb-8">
              {approachSteps.map((step, index) => {
                const isActive = activeApproachStep === index
                return (
                  <button
                    key={step.num}
                    onClick={() => {
                      setActiveApproachStep(index)
                      setIsApproachAutoplay(false)
                    }}
                    className="relative group flex flex-col items-center"
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 ${
                      isActive ? `${step.iconBg} shadow-lg ${step.ring} scale-110` : "bg-gray-100"
                    }`}>
                      <span className={`font-heading text-sm font-black ${isActive ? step.numColor : "text-gray-400"}`}>
                        {step.num}
                      </span>
                    </div>
                    <div className={`mt-3 px-2 py-0.5 rounded-full transition-all duration-300 ${
                      isActive ? "bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm" : "bg-transparent border-transparent"
                    }`}>
                      <span className={`text-[10px] font-bold tracking-tight whitespace-nowrap ${isActive ? "text-gray-900" : "text-gray-400"}`}>
                        {step.title}
                      </span>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Content Panel — Sophisticated Glassmorphism Card */}
            <div className="relative min-h-[340px] lg:min-h-[300px]">
              {/* Background Glows that shift color based on active step */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`glow-${activeApproachStep}`}
                  className={`absolute inset-0 blur-3xl opacity-20 transition-all duration-1000 rounded-3xl ${approachSteps[activeApproachStep].iconBg}`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 0.2, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                />
              </AnimatePresence>

              <div className="relative h-full bg-white/60 backdrop-blur-md border border-gray-100 rounded-[2.5rem] p-8 md:p-12 lg:p-14 shadow-2xl shadow-gray-200/40 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeApproachStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center"
                  >
                    {/* Visual Side */}
                    <div className="lg:col-span-5 flex justify-center lg:justify-start">
                      <div className="relative">
                        <motion.div 
                          className={`w-28 h-28 md:w-36 md:h-36 rounded-3xl ${approachSteps[activeApproachStep].iconBg} flex items-center justify-center relative z-10 shadow-lg`}
                          layoutId="approach-icon-container"
                        >
                          {(() => {
                            const ActiveIcon = approachSteps[activeApproachStep].icon
                            return <ActiveIcon className={`w-12 h-12 md:w-16 md:h-16 ${approachSteps[activeApproachStep].iconColor}`} strokeWidth={1.25} />
                          })()}
                        </motion.div>
                        
                        {/* Animated rings around icon */}
                        <motion.div 
                          className={`absolute inset-0 rounded-3xl border-2 ${approachSteps[activeApproachStep].iconColor} opacity-20`}
                          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0, 0.2] }}
                          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </div>
                    </div>

                    {/* Text Side */}
                    <div className="lg:col-span-7">
                      <motion.span 
                        className={`inline-block text-xs font-black uppercase tracking-[0.25em] ${approachSteps[activeApproachStep].numColor} mb-4`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        {approachSteps[activeApproachStep].tagline}
                      </motion.span>
                      <motion.h3 
                        className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6 leading-tight"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        {approachSteps[activeApproachStep].title}
                      </motion.h3>
                      <motion.p 
                        className="text-lg lg:text-xl text-gray-600 leading-relaxed"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {approachSteps[activeApproachStep].desc}
                      </motion.p>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Section 5: Deep Healthcare Expertise */}
      <motion.section
        className="relative py-20 md:py-28 lg:py-36 bg-white overflow-hidden"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Subtle Architectural Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-50/30 to-transparent" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-gray-50 rounded-full blur-3xl opacity-50" />
          {/* Subtle Grid Pattern Overlay */}
          <div className="absolute inset-0 opacity-[0.03] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] pointer-events-none bg-[grid-line:theme(colors.gray.900)_1px] bg-[size:40px_40px]" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-start">
              
              {/* Left Column: Typography Content (50%) */}
              <div className="lg:w-1/2 space-y-10">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  viewport={{ once: true }}
                >
                  <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] tracking-tight mb-8">
                    Deep Healthcare <br />
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Expertise.</span>
                  </h2>
                  
                  <div className="space-y-6 text-lg text-gray-600 leading-relaxed max-w-xl">
                    <p>
                      Most teams hit a wall with healthcare technology. The regulations, the integrations, the compliance requirements—<span className="text-gray-900 font-medium">they stop projects cold.</span>
                    </p>
                    <p>
                      We&apos;ve navigated it all for over a decade: EHR integration, HIPAA compliance, HL7/FHIR standards, and telemedicine regulations. 
                    </p>
                    <div className="pt-4 border-l-2 border-orange-100 pl-6 italic text-gray-500">
                      &quot;We don&apos;t just build software; we build systems that save lives and protect data.&quot;
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  className="bg-gray-50/80 backdrop-blur-sm rounded-2xl p-8 border border-gray-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <p className="text-gray-900 font-semibold text-xl leading-snug">
                    That expertise makes us better builders—<span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">whether your product is in healthcare or not.</span>
                  </p>
                </motion.div>
              </div>

              {/* Right Column: Expertise Carousel (50%) */}
              <motion.div
                className="lg:w-1/2 flex flex-col"
                onMouseEnter={() => setIsExpertiseAutoplay(false)}
                onMouseLeave={() => setIsExpertiseAutoplay(true)}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                {/* Carousel Stage */}
                <div
                  className={`relative flex-1 min-h-[360px] md:min-h-[380px] backdrop-blur-sm rounded-3xl border shadow-xl shadow-gray-900/5 p-8 md:p-10 lg:p-12 overflow-hidden flex flex-col justify-between transition-colors duration-500 ${
                    expertiseAreas[activeExpertise].tint === 'amber'
                      ? 'bg-gradient-to-br from-orange-50/70 via-white to-white border-orange-100/70'
                      : 'bg-gradient-to-br from-gray-50/80 via-white to-white border-gray-100/80'
                  }`}
                >
                  {/* Ambient tonal glow (brand-safe: orange/amber/gray only) */}
                  <div
                    className={`absolute -top-16 -right-16 w-64 h-64 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
                      expertiseAreas[activeExpertise].tint === 'amber' ? 'bg-orange-200/30' : 'bg-gray-300/25'
                    }`}
                    aria-hidden="true"
                  />

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeExpertise}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="relative flex flex-col h-full justify-center"
                    >
                      {/* Ghost icon watermark - visual representation of the topic without disturbing content */}
                      <ActiveExpertiseIcon
                        className="absolute -bottom-10 -right-6 h-48 w-48 text-gray-900/[0.04] rotate-[-8deg] pointer-events-none select-none"
                        aria-hidden="true"
                      />

                      {/* Step Counter */}
                      <div className="text-xs font-black uppercase tracking-[0.2em] text-orange-500/70 mb-6">
                        {String(activeExpertise + 1).padStart(2, '0')} / {String(expertiseAreas.length).padStart(2, '0')}
                      </div>

                      {/* Icon */}
                      <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-white to-orange-50 border border-orange-100/80 flex items-center justify-center mb-8 shadow-sm">
                        <ActiveExpertiseIcon className="h-8 w-8 text-orange-600" />
                      </div>

                      {/* Title & Description */}
                      <h3 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {expertiseAreas[activeExpertise].name}
                      </h3>
                      <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-md">
                        {expertiseAreas[activeExpertise].desc}
                      </p>
                    </motion.div>
                  </AnimatePresence>

                  {/* Progress Bar & Controls */}
                  <div className="flex items-center gap-5 mt-8 pt-6 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => setActiveExpertise((prev) => (prev - 1 + expertiseAreas.length) % expertiseAreas.length)}
                      className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50 transition-all duration-200"
                      aria-label="Previous expertise"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <div className="flex-1 h-1 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${((activeExpertise + 1) / expertiseAreas.length) * 100}%` }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => setActiveExpertise((prev) => (prev + 1) % expertiseAreas.length)}
                      className="p-2.5 rounded-full border border-gray-200 text-gray-500 hover:text-orange-600 hover:border-orange-200 hover:bg-orange-50 transition-all duration-200"
                      aria-label="Next expertise"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Dot Navigation */}
                <div className="flex justify-center gap-2.5 mt-6">
                  {expertiseAreas.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveExpertise(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${idx === activeExpertise ? 'w-8 bg-gradient-to-r from-yellow-400 to-orange-500' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
                      aria-label={`Go to expertise ${idx + 1}`}
                    />
                  ))}
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 6: Proven Track Record */}
      <motion.section
        className="py-16 md:py-24 lg:py-32 bg-white overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-14 items-start">

              {/* Visual proof — ceremony photo + certificate, styled as a premium stacked composition */}
              <motion.div
                className="lg:col-span-4 relative"
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <div className="relative mx-auto max-w-sm lg:max-w-none">
                  <div className="relative pb-8 pr-5">

                    {/* Main ceremony photograph */}
                    <div
                      className="relative rounded-[1.75rem] overflow-hidden shadow-2xl shadow-gray-900/15 border border-gray-100 bg-gray-50"
                      style={{ aspectRatio: "442 / 367" }}
                    >
                      <Image
                        src="/images/recognition/Govt Official Giving award.png"
                        alt="TrueSpur founder receiving the StartupTN government hackathon award from a Tamil Nadu government official"
                        fill
                        className="object-cover saturate-[0.85] contrast-[1.03]"
                        sizes="(max-width: 1024px) 90vw, 400px"
                      />
                    </div>

                    {/* Certificate — stacked inset card */}
                    <motion.div
                      className="absolute -bottom-2 -right-2 lg:-right-4 w-32 sm:w-36 rotate-[-4deg]"
                      initial={{ opacity: 0, y: 12, rotate: 4 }}
                      whileInView={{ opacity: 1, y: 0, rotate: -4 }}
                      transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
                      viewport={{ once: true, amount: 0.3 }}
                    >
                      <div className="bg-white rounded-lg p-1.5 shadow-2xl shadow-gray-900/20 border border-gray-100">
                        <div className="relative w-full overflow-hidden rounded-md" style={{ aspectRatio: "4 / 3" }}>
                          <Image
                            src="/images/recognition/Certificate.png"
                            alt="Certificate of Recognition awarded to TrueSpur's founder for winning first place in the StartupTN Design Hackathon"
                            fill
                            className="object-cover"
                            sizes="160px"
                          />
                        </div>
                      </div>
                    </motion.div>
                  </div>

                  {/* Caption */}
                  <p className="mt-5 text-sm text-gray-500 leading-relaxed max-w-xs">
                    <span className="font-semibold text-gray-700">Directorate for Welfare of the Differently Abled &amp; StartupTN</span> — Award Ceremony, 2023
                  </p>
                </div>
              </motion.div>

              {/* Copy + refined stats */}
              <motion.div
                className="lg:col-span-8"
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
              >
                <p className="text-xs font-bold uppercase tracking-widest text-orange-500 mb-3 flex items-center gap-2">
                  <Award className="h-3.5 w-3.5" strokeWidth={2.5} />
                  Recognition &amp; Results
                </p>
                <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
                  Proven Track Record
                </h2>

                {/* Stat row — minimal, editorial */}
                <div className="grid grid-cols-3 gap-6 mb-10 pb-10 border-b border-gray-100">
                  <div>
                    <p className="font-heading text-3xl lg:text-4xl font-black text-gray-900 leading-none">
                      StartupTN
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Tamil Nadu Govt. initiative</p>
                  </div>
                  <div>
                    <p className="font-heading text-3xl lg:text-4xl font-black text-gray-900 leading-none">
                      #1<span className="text-orange-500">/54</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-2">Ranked govt. &amp; StartupTN</p>
                  </div>
                  <div>
                    <p className="font-heading text-3xl lg:text-4xl font-black text-gray-900 leading-none">
                      15<span className="text-orange-500">+</span>
                    </p>
                    <p className="text-xs text-gray-500 mt-2">EHR, HIPAA, HL7/FHIR expertise</p>
                  </div>
                </div>

                {/* Narrative */}
                <div className="space-y-8">
                  <div>
                    <h3 className="font-heading text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                      Active Product Studio
                    </h3>
                    <p className="text-base text-gray-600">
                      Four products in active development — from healthcare platforms to AI tools. Each one proves our model works and teaches us something we bring to yours.
                    </p>
                    <div className="flex flex-wrap gap-2 pt-3">
                      {[
                        { label: "Clinax", icon: Heart, color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-100" },
                        { label: "Halo", icon: Users, color: "text-sky-600", bg: "bg-sky-50", border: "border-sky-100" },
                        { label: "TrueBill", icon: Zap, color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
                        { label: "TafsirAI", icon: Brain, color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
                      ].map((p) => (
                        <span key={p.label} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${p.bg} ${p.color} border ${p.border}`}>
                          <p.icon className="h-3.5 w-3.5" strokeWidth={2} />
                          {p.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-heading text-xl lg:text-2xl font-bold text-gray-900 mb-2">
                      Government-Recognized Innovation
                    </h3>
                    <p className="text-base text-gray-600">
                      Our founder won first place in a design hackathon organized by the Directorate for Welfare of the Differently Abled and StartupTN — beating 53 other designs including big MNCs — by doing what others skipped: visiting hospitals and interviewing physiotherapists.
                    </p>
                    <p className="text-sm font-semibold text-gray-700 mt-3">
                      World Bank funded. Now serving citizens in remote Tamil Nadu locations.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 7: Final CTA */}
      <motion.section
        className="py-16 md:py-24 lg:py-32 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 }}
        whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" }}
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
              <p>Whether you&apos;re validating a concept or ready to build, let&apos;s talk. We&apos;ll discuss your product, your goals, and whether we&apos;re the right partner.</p>
              <p>No sales pitch. Just an honest conversation about what you&apos;re building.</p>
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
                className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-lg px-8 py-6 rounded-full shadow-lg shadow-orange-500/20 hover:from-yellow-600 hover:to-orange-600 hover:scale-[1.01] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-white"
                onClick={() => openLeadForm("get-started")}
              >
                Start Your Project
              </Button>
              <SecondaryButton 
                size="lg"
                variant="dark"
                onClick={() => window.open(SITE_CONFIG.calendlyUrl, '_blank', 'noopener,noreferrer')}
              >
                Schedule a Call
              </SecondaryButton>
            </motion.div>
            
          </div>
        </div>
      </motion.section>

      </main>

      {/* Footer */}
      <Footer scrollToSection={navigateToSection} />
    </div>
  )
}
