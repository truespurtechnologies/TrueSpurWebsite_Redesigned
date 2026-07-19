"use client"

import type React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { PageContainer } from "@/components/layout/PageContainer"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PrimaryButton } from "@/components/cta/PrimaryButton"
import { SecondaryButton } from "@/components/cta/SecondaryButton"
import { LeadFormDialog } from "@/components/lead-form-dialog"
import { Activity, Video, DollarSign, Sparkles, Target, Zap, Rocket, TrendingUp, Quote, Wallet, Compass, Gauge, ArrowRight } from "lucide-react"

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

// Category visual accents - grounded in each product's existing category
const categoryStyles = {
  healthcare: {
    iconBg: "from-rose-50 to-rose-100/60",
    iconColor: "text-rose-600",
    ring: "ring-rose-100/80 group-hover:ring-rose-200",
    dot: "bg-rose-500",
    accent: "via-rose-400/70",
    wash: "from-rose-50/80 via-white to-white",
  },
  engagement: {
    iconBg: "from-sky-50 to-sky-100/60",
    iconColor: "text-sky-600",
    ring: "ring-sky-100/80 group-hover:ring-sky-200",
    dot: "bg-sky-500",
    accent: "via-sky-400/70",
    wash: "from-sky-50/80 via-white to-white",
  },
  business: {
    iconBg: "from-emerald-50 to-emerald-100/60",
    iconColor: "text-emerald-600",
    ring: "ring-emerald-100/80 group-hover:ring-emerald-200",
    dot: "bg-emerald-500",
    accent: "via-emerald-400/70",
    wash: "from-emerald-50/80 via-white to-white",
  },
  ai: {
    iconBg: "from-violet-50 to-violet-100/60",
    iconColor: "text-violet-600",
    ring: "ring-violet-100/80 group-hover:ring-violet-200",
    dot: "bg-violet-500",
    accent: "via-violet-400/70",
    wash: "from-violet-50/80 via-white to-white",
  },
} as const

// Product Showcase - interactive tab switcher + animated stage panel
interface ShowcaseProduct {
  icon: React.ElementType
  accent: keyof typeof categoryStyles
  category: string
  name: string
  description: string
  progressDescriptor: string
}

const AUTO_ADVANCE_MS = 6000

function ProductShowcase({ products, shouldReduceMotion }: { products: ShowcaseProduct[]; shouldReduceMotion: boolean }) {
  const [active, setActive] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    if (shouldReduceMotion || isPaused) return
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % products.length)
    }, AUTO_ADVANCE_MS)
    return () => clearInterval(timer)
  }, [active, isPaused, shouldReduceMotion, products.length])

  const selectTab = (i: number) => setActive(i)

  const moveTab = (delta: number) => {
    setActive((prev) => {
      const next = (prev + delta + products.length) % products.length
      tabRefs.current[next]?.focus()
      return next
    })
  }

  const activeProduct = products[active]
  const activeStyles = categoryStyles[activeProduct.accent]
  const ActiveIcon = activeProduct.icon

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Tab list */}
      <div
        className="lg:col-span-4 flex flex-col gap-2"
        role="tablist"
        aria-label="Our products"
        aria-orientation="vertical"
      >
        {products.map((p, i) => {
          const isActive = i === active
          const styles = categoryStyles[p.accent]
          return (
            <button
              key={p.name}
              ref={(el) => { tabRefs.current[i] = el }}
              role="tab"
              type="button"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => selectTab(i)}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") { e.preventDefault(); moveTab(1) }
                if (e.key === "ArrowUp") { e.preventDefault(); moveTab(-1) }
              }}
              className={`group relative text-left rounded-2xl px-6 py-5 overflow-hidden transition-all duration-300 ${
                isActive ? "bg-white shadow-md shadow-gray-900/8 ring-1 ring-gray-900/5" : "bg-transparent hover:bg-white/70"
              }`}
            >
              <div className="relative flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2.5">
                  <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${styles.dot}`} aria-hidden="true" />
                  <span className={`text-[11px] font-semibold uppercase tracking-wider ${isActive ? "text-gray-500" : "text-gray-400"}`}>
                    {p.category}
                  </span>
                </div>
                <span className={`font-heading text-xs font-semibold tracking-wider ${isActive ? "text-gray-400" : "text-gray-300"}`} aria-hidden="true">
                  0{i + 1}
                </span>
              </div>
              <h4 className={`relative font-heading text-xl lg:text-2xl font-bold tracking-tight transition-colors duration-200 ${
                isActive ? "text-gray-900" : "text-gray-400 group-hover:text-gray-600"
              }`}>
                {p.name}
              </h4>

              {/* Auto-advance progress indicator */}
              {isActive && !shouldReduceMotion && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gray-100/80">
                  <motion.div
                    key={active}
                    className="h-full bg-gradient-to-r from-orange-400 to-amber-500"
                    initial={{ width: "0%" }}
                    animate={{ width: isPaused ? "0%" : "100%" }}
                    transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                  />
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Stage panel */}
      <div className="lg:col-span-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -16 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            role="tabpanel"
            className={`relative h-full min-h-[380px] lg:min-h-[420px] overflow-hidden rounded-3xl bg-gradient-to-br ${activeStyles.wash} border border-gray-100/80 p-9 lg:p-14 shadow-sm shadow-gray-900/5`}
          >
            {/* Oversized watermark index */}
            <span className="absolute -right-3 -top-14 font-heading text-[200px] lg:text-[260px] font-black text-gray-900/[0.04] leading-none select-none pointer-events-none" aria-hidden="true">
              0{active + 1}
            </span>

            <div className={`relative h-16 w-16 rounded-2xl bg-white flex items-center justify-center mb-8 shadow-sm ring-1 ${activeStyles.ring}`}>
              <ActiveIcon className={`h-7 w-7 ${activeStyles.iconColor}`} strokeWidth={1.5} />
            </div>

            <div className="relative flex items-center gap-2 mb-4">
              <span className={`h-1.5 w-1.5 rounded-full flex-shrink-0 ${activeStyles.dot}`} aria-hidden="true" />
              <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                {activeProduct.category}
              </span>
            </div>

            <h3 className="relative font-heading text-4xl lg:text-5xl font-black text-gray-900 tracking-[-0.02em] leading-[1.1] mb-5">
              {activeProduct.name}
            </h3>

            <p className="relative text-base lg:text-lg text-gray-600 leading-relaxed max-w-xl mb-8">
              {activeProduct.description}
            </p>

            <div className="relative pt-6 border-t border-gray-900/[0.06] max-w-xl">
              <p className="text-sm text-gray-500 italic leading-relaxed">
                {activeProduct.progressDescriptor}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

// Learning Step Component - editorial progression flow (dark stage)
interface LearningStepProps {
  index: number
  icon: React.ElementType
  title: string
  subtitle: string
  description: string
}

function LearningStep({ index, icon: Icon, title, subtitle, description }: LearningStepProps) {
  return (
    <div className="group relative flex-1">
      {/* Oversized ghost numeral */}
      <span className="block font-heading text-6xl lg:text-7xl font-black text-white/[0.06] leading-none mb-5 select-none" aria-hidden="true">
        0{index}
      </span>

      {/* Icon */}
      <div className="relative h-12 w-12 lg:h-14 lg:w-14 rounded-xl bg-gradient-to-br from-orange-500/15 to-amber-500/10 flex items-center justify-center mb-6 ring-1 ring-orange-400/20 group-hover:ring-orange-400/50 transition-all duration-300">
        <Icon className="h-6 w-6 lg:h-7 lg:w-7 text-orange-400" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="font-heading text-2xl lg:text-[26px] font-bold text-white leading-tight mb-2">
        {title}
      </h3>

      {/* Subtitle */}
      <p className="text-sm font-semibold text-orange-400 tracking-wide mb-5">
        {subtitle}
      </p>

      {/* Description */}
      <p className="text-[15px] text-gray-400 leading-[1.7]">
        {description}
      </p>
    </div>
  )
}

export default function ProductsPage() {
  const shouldReduceMotion = useReducedMotion()
  const animationProps = createAnimationProps(shouldReduceMotion)
  
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false)
  const [leadFormSource, setLeadFormSource] = useState<
    "get-started" | "start-project" | "get-proposal" | "success-story" | null
  >(null)

  const openLeadForm = (source: string) => {
    setLeadFormSource(source as "get-started" | "start-project" | "get-proposal" | "success-story")
    setIsLeadFormOpen(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <LeadFormDialog
        open={isLeadFormOpen}
        onOpenChange={setIsLeadFormOpen}
        source={leadFormSource}
      />
      <Header 
        currentPage="/products"
      />
      
      <main id="main-content" className="focus:outline-none">
        {/* SECTION 1: HERO */}
        <section className="relative py-24 md:py-32 lg:py-40 xl:py-48 overflow-hidden" aria-labelledby="hero-heading">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
          
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
          {/* Orange glow - larger for visual energy */}
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/8 blur-3xl rounded-full" />
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-amber-500/6 blur-3xl rounded-full" />
          
          {/* Content */}
          <div className="relative container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              
              <motion.h1 
                id="hero-heading"
                className="font-heading text-5xl lg:text-6xl xl:text-7xl font-black leading-[1.15] tracking-[-0.02em] text-white"
                {...animationProps}
              >
                Products We&apos;re Building
              </motion.h1>
              
              <motion.p 
                className="text-lg lg:text-xl leading-[1.6] text-slate-300 mt-8 max-w-3xl mx-auto"
                {...animationProps}
              >
                We don&apos;t just build products for clients—we build our own. Each one teaches us something we bring to yours.
              </motion.p>
              
              <motion.p 
                className="text-base lg:text-lg leading-[1.6] text-slate-400/90 mt-6 lg:mt-8 max-w-2xl mx-auto"
                {...animationProps}
              >
                From healthcare platforms to AI applications, we&apos;re solving real problems and learning what founders face every day.
              </motion.p>
              
              <motion.div className="mt-14 lg:mt-16" {...animationProps}>
                <PrimaryButton size="lg" onClick={() => openLeadForm('products-hero')}>
                  Start Your Project
                </PrimaryButton>
              </motion.div>

              {/* Visual preview strip - previews the four products detailed below */}
              <motion.div
                className="mt-16 lg:mt-20 flex items-center justify-center gap-6 sm:gap-10 lg:gap-14 flex-wrap"
                {...animationProps}
              >
                {[
                  { icon: Activity, label: "Healthcare" },
                  { icon: Video, label: "Engagement" },
                  { icon: DollarSign, label: "Business" },
                  { icon: Sparkles, label: "AI" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex flex-col items-center gap-3">
                    <div className="h-12 w-12 lg:h-14 lg:w-14 rounded-2xl bg-white/10 ring-1 ring-white/15 flex items-center justify-center backdrop-blur-sm">
                      <Icon className="h-5 w-5 lg:h-6 lg:w-6 text-orange-300" strokeWidth={1.5} />
                    </div>
                    <span className="text-xs font-medium text-slate-400 tracking-wide">{label}</span>
                  </div>
                ))}
              </motion.div>
              
            </div>
          </div>
        </section>

        {/* SECTION 2: WHY WE BUILD PRODUCTS */}
        <motion.section 
          className="pt-12 md:pt-20 lg:pt-28 pb-16 md:pb-24 lg:pb-32 bg-white"
          aria-labelledby="why-heading"
          {...animationProps}
        >
          <PageContainer>
            <div className="max-w-6xl mx-auto">

              <h2 id="why-heading" className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 tracking-[-0.02em] mb-12 lg:mb-16 text-center">
                Why We Build Products
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

                {/* Typography column */}
                <div className="lg:col-span-3 space-y-8 lg:space-y-10 text-base lg:text-lg text-gray-600 leading-[1.75]">
                  <p>
                    Building your own products forces you to make the same hard decisions your clients face. Do we build this feature now or later? How do we validate demand before investing months of development? What&apos;s the minimum we can ship to test with real users?
                  </p>
                  <p>
                    When you&apos;ve wrestled with those questions yourself, you become a better partner. You understand that founders need speed and clarity, not just technical execution. You know when to push back on a bad idea and when to move fast on a good one.
                  </p>
                  <p>
                    That&apos;s why we build Clinax, Halo, TrueBill, and TafsirAI. Each product teaches us something we bring to yours—from healthcare workflows to AI applications, from validation to long-term product evolution.
                  </p>
                </div>

                {/* Visual column - grounded in the exact categories shown in the portfolio below */}
                <div className="lg:col-span-2">
                  <div className="relative rounded-3xl border border-gray-100/80 bg-gray-50/60 p-8 lg:p-9 shadow-sm shadow-gray-900/5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-orange-600/80 mb-6">
                      What We&apos;re Building
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white border border-gray-100/70">
                        <Activity className="h-5 w-5 text-rose-600" strokeWidth={1.5} />
                        <span className="text-sm font-semibold text-gray-900">Healthcare</span>
                      </div>
                      <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white border border-gray-100/70">
                        <Video className="h-5 w-5 text-sky-600" strokeWidth={1.5} />
                        <span className="text-sm font-semibold text-gray-900">Engagement</span>
                      </div>
                      <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white border border-gray-100/70">
                        <DollarSign className="h-5 w-5 text-emerald-600" strokeWidth={1.5} />
                        <span className="text-sm font-semibold text-gray-900">Business Tools</span>
                      </div>
                      <div className="flex flex-col gap-2 p-4 rounded-2xl bg-white border border-gray-100/70">
                        <Sparkles className="h-5 w-5 text-violet-600" strokeWidth={1.5} />
                        <span className="text-sm font-semibold text-gray-900">AI Applications</span>
                      </div>
                    </div>
                    <p className="mt-6 text-sm text-gray-500 leading-[1.6]">
                      Four products, four different worlds—each one sharpening how we build yours.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          </PageContainer>
        </motion.section>

        {/* SECTION 3: PRODUCT PORTFOLIO */}
        <motion.section 
          className="py-16 md:py-24 lg:py-32 bg-gray-50"
          aria-labelledby="portfolio-heading"
          {...animationProps}
        >
          <PageContainer>
            <div className="max-w-7xl mx-auto">
              
              <h2 id="portfolio-heading" className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 text-center tracking-[-0.02em] mb-11">
                Our Product Portfolio
              </h2>
              
              <p className="text-base lg:text-lg text-gray-600 text-center leading-[1.7] max-w-3xl mx-auto mb-16">
                Four products across healthcare, business tools, and AI. Each one solving real problems and teaching us what founders face.
              </p>
              
              {/* Product Showcase - interactive tab switcher + stage panel */}
              <div className="max-w-6xl mx-auto">
                <ProductShowcase shouldReduceMotion={shouldReduceMotion} products={[
                  {
                    icon: Activity,
                    accent: "healthcare",
                    category: "Healthcare Platform",
                    name: "Clinax",
                    description: "End-to-end healthcare operations platform managing patient records, provider workflows, and pharmacy coordination.",
                    progressDescriptor: "Actively validating clinical workflows with healthcare stakeholders",
                  },
                  {
                    icon: Video,
                    accent: "engagement",
                    category: "Patient Engagement Platform",
                    name: "Halo",
                    description: "HIPAA-compliant telemedicine platform enabling secure video consultations and asynchronous patient communication.",
                    progressDescriptor: "Refining telehealth workflows through provider feedback",
                  },
                  {
                    icon: DollarSign,
                    accent: "business",
                    category: "Business Tool",
                    name: "TrueBill",
                    description: "MSME digitization platform helping businesses streamline billing, quotations, and everyday operations.",
                    progressDescriptor: "Supporting daily business operations through digital workflows",
                  },
                  {
                    icon: Sparkles,
                    accent: "ai",
                    category: "AI Application",
                    name: "TafsirAI",
                    description: "AI-powered Quran companion helping users explore authentic tafsir, hadith, and practical guidance from Islamic sources.",
                    progressDescriptor: "Exploring how AI can improve access to authentic Islamic knowledge",
                  },
                ]} />
              </div>
              
            </div>
          </PageContainer>
        </motion.section>

        {/* PORTFOLIO SIGNAL BRIDGE - Strategic Transition */}
        <motion.section 
          className="py-12 md:py-16 lg:py-20 bg-gray-50"
          {...animationProps}
        >
          <PageContainer>
            <div className="max-w-4xl mx-auto text-center">
              <Quote className="mx-auto h-10 w-10 text-orange-500/25 mb-6" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="font-heading text-[28px] lg:text-[36px] xl:text-[42px] font-extrabold text-gray-900 leading-[1.2] tracking-tight">
                Each product we build teaches us something we bring to yours.
              </h3>
            </div>
          </PageContainer>
        </motion.section>

        {/* SECTION 4: WHAT BUILDING THESE PRODUCTS TEACHES US */}
        <motion.section 
          className="relative py-20 md:py-28 lg:py-36 bg-gray-900 overflow-hidden"
          aria-labelledby="learning-heading"
          {...animationProps}
        >
          {/* Ambient glow accents */}
          <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-orange-500/10 blur-[120px]" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-32 right-1/4 h-96 w-96 rounded-full bg-amber-500/10 blur-[120px]" aria-hidden="true" />

          <PageContainer className="relative">
            <div className="max-w-6xl mx-auto">

              <div className="max-w-3xl mx-auto text-center mb-16 lg:mb-20">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-orange-400 mb-5">
                  The Builder&apos;s Framework
                </p>
                <h2 id="learning-heading" className="font-heading text-4xl lg:text-5xl xl:text-6xl font-black text-white tracking-[-0.02em] leading-[1.1] mb-6">
                  What Building These Products <span className="text-orange-400">Teaches Us</span>
                </h2>
                <p className="text-base lg:text-lg text-gray-400 leading-[1.7]">
                  Every product we build teaches us something we bring to yours. Here&apos;s what we&apos;ve learned from being in the trenches.
                </p>
              </div>

              {/* Progression flow */}
              <div className="flex flex-col lg:flex-row lg:items-start gap-12 lg:gap-0">

                <LearningStep
                  index={1}
                  icon={Target}
                  title="Validation"
                  subtitle="Learn before building"
                  description="We've learned how to test demand before building features. We know which validation techniques work and which waste time. We bring that discipline to your product."
                />

                <div className="hidden lg:flex items-start justify-center pt-16 px-4 lg:px-6" aria-hidden="true">
                  <ArrowRight className="h-5 w-5 text-orange-400/40" strokeWidth={1.5} />
                </div>

                <LearningStep
                  index={2}
                  icon={Zap}
                  title="Prioritization"
                  subtitle="Build what matters"
                  description="Building our own products taught us to prioritize ruthlessly. We know the difference between must-have features and nice-to-haves. We help you focus on what moves the needle."
                />

                <div className="hidden lg:flex items-start justify-center pt-16 px-4 lg:px-6" aria-hidden="true">
                  <ArrowRight className="h-5 w-5 text-orange-400/40" strokeWidth={1.5} />
                </div>

                <LearningStep
                  index={3}
                  icon={Rocket}
                  title="Execution"
                  subtitle="Ship with confidence"
                  description="Building products teaches you that execution is never as straightforward as the roadmap suggests. We help you execute with clarity and ship with confidence."
                />

                <div className="hidden lg:flex items-start justify-center pt-16 px-4 lg:px-6" aria-hidden="true">
                  <ArrowRight className="h-5 w-5 text-orange-400/40" strokeWidth={1.5} />
                </div>

                <LearningStep
                  index={4}
                  icon={TrendingUp}
                  title="Scale"
                  subtitle="Build for growth"
                  description="Building products teaches you to think beyond the first release. We help you build systems designed to scale from day one."
                />

              </div>

            </div>
          </PageContainer>
        </motion.section>

        {/* SECTION 5: PRODUCT STUDIO ADVANTAGE */}
        <motion.section 
          className="pt-20 md:pt-28 lg:pt-36 pb-12 md:pb-16 lg:pb-20 bg-gray-50"
          aria-labelledby="advantage-heading"
          {...animationProps}
        >
          <PageContainer>
            <div className="max-w-6xl mx-auto">

              <h2 id="advantage-heading" className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 tracking-[-0.02em] mb-14 lg:mb-16 text-center">
                The Product Studio Advantage
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-start">

                {/* Typography column - editorial layout preserved */}
                <div className="lg:col-span-3">
                  <p className="text-lg lg:text-xl xl:text-2xl text-gray-700 leading-[1.6] mb-10 lg:mb-12">
                    Many development partners focus solely on client delivery. Building products ourselves gives us a different perspective—we&apos;ve faced the same dilemmas founders face: limited budget, uncertain demand, pressure to ship fast without breaking things.
                  </p>

                  <div className="space-y-8 lg:space-y-10 text-base lg:text-lg text-gray-600 leading-[1.75]">
                    <p>
                      We have. That&apos;s why we don&apos;t just execute your requirements—we challenge assumptions, suggest better approaches, and help you avoid mistakes we&apos;ve already made.
                    </p>
                    <p>
                      When you work with builders who are building too, you get partners who understand the journey—not just the destination.
                    </p>
                  </div>
                </div>

                {/* Visual column - the same dilemmas from the pull quote, visualized */}
                <div className="lg:col-span-2">
                  <div className="relative rounded-3xl border border-gray-200/70 bg-white p-8 lg:p-9 shadow-sm shadow-gray-900/5">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-orange-600/80 mb-6">
                      The Founder Dilemma
                    </p>
                    <div className="space-y-5">
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 ring-1 ring-orange-100/80">
                          <Wallet className="h-5 w-5 text-orange-600" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Limited budget</p>
                          <p className="text-sm text-gray-500 leading-[1.5]">Every dollar has to earn its place</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 ring-1 ring-orange-100/80">
                          <Compass className="h-5 w-5 text-orange-600" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Uncertain demand</p>
                          <p className="text-sm text-gray-500 leading-[1.5]">No guarantee anyone wants it yet</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className="h-10 w-10 rounded-xl bg-orange-50 flex items-center justify-center flex-shrink-0 ring-1 ring-orange-100/80">
                          <Gauge className="h-5 w-5 text-orange-600" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Pressure to ship fast</p>
                          <p className="text-sm text-gray-500 leading-[1.5]">Without breaking what already works</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </PageContainer>
        </motion.section>

        {/* SECTION 6: FINAL CTA */}
        <section className="relative py-24 md:py-32 lg:py-40 xl:py-48 overflow-hidden" aria-labelledby="cta-heading">
          {/* Background (matches hero) */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900" />
          
          {/* Subtle texture overlay */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
          
          {/* Content */}
          <div className="relative container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              
              <motion.h2 
                id="cta-heading"
                className="font-heading text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-[-0.02em] leading-[1.15] mb-12 lg:mb-14"
                {...animationProps}
              >
                Ready to Build Your Product?
              </motion.h2>
              
              <motion.div 
                className="max-w-3xl mx-auto space-y-6 lg:space-y-7 text-base lg:text-lg text-slate-300 leading-[1.65] mb-16 lg:mb-20"
                {...animationProps}
              >
                <p>
                  We&apos;re building products ourselves and helping founders build theirs. If you have an idea worth building, let&apos;s talk.
                </p>
                <p className="text-slate-400">
                  No sales pitch. Just an honest conversation about your product and how we can help.
                </p>
              </motion.div>
              
              {/* CTA Buttons */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 lg:gap-7 items-center justify-center"
                {...animationProps}
              >
                <PrimaryButton size="lg" onClick={() => openLeadForm('products-final-cta-primary')}>
                  Start Your Project
                </PrimaryButton>
                
                <SecondaryButton 
                  size="lg"
                  variant="dark"
                  onClick={() => window.location.href = '/products/artificial-intelligence'}
                >
                  View Our Services
                </SecondaryButton>
              </motion.div>
              
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
