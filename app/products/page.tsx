"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { PageContainer } from "@/components/layout/PageContainer"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PrimaryButton } from "@/components/cta/PrimaryButton"
import { SecondaryButton } from "@/components/cta/SecondaryButton"
import { LeadFormDialog } from "@/components/lead-form-dialog"
import { Activity, Video, DollarSign, Sparkles, Target, Zap, Rocket, TrendingUp } from "lucide-react"

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

// Product Card Component
interface ProductCardProps {
  icon: React.ElementType
  category: string
  name: string
  description: string
  progressDescriptor: string
}

function ProductCard({ icon: Icon, category, name, description, progressDescriptor }: ProductCardProps) {
  return (
    <Card className="group relative h-full flex flex-col bg-white rounded-3xl border border-gray-100/70 p-8 lg:p-10 xl:p-12 shadow-sm shadow-gray-900/6 hover:shadow-lg hover:shadow-gray-900/10 hover:border-gray-200/80 hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-out">
      {/* Left gradient accent - enhanced on hover */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-orange-400/0 via-orange-400/70 to-orange-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* ZONE 1: Product Icon - Emblematic presence */}
      <div className="h-[72px] w-[72px] lg:h-20 lg:w-20 rounded-2xl bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center mb-4 ring-1 ring-orange-100/80 group-hover:ring-orange-200 transition-all duration-200">
        <Icon className="h-9 w-9 lg:h-10 lg:w-10 text-orange-600 -mt-px" strokeWidth={1.5} />
      </div>
      
      {/* Category - Product metadata */}
      <div className="text-[11px] font-semibold uppercase tracking-wider text-orange-600/80 mb-6">
        {category}
      </div>
      
      {/* ZONE 2: Product Identity - Commanding product name */}
      <h3 className="font-heading text-[34px] lg:text-[38px] xl:text-[42px] font-bold text-gray-900 leading-[1.15] tracking-[-0.01em] mb-4">
        {name}
      </h3>
      
      {/* ZONE 3: Product Description */}
      <p className="text-[15px] lg:text-base text-gray-600 leading-[1.65] mb-auto">
        {description}
      </p>
      
      {/* Status Badge - Integrated platform signal */}
      <div className="mt-6 px-5 py-3 bg-gray-50/80 rounded-xl border border-gray-100/50 group-hover:bg-gray-100/60 group-hover:border-gray-200/60 transition-colors duration-200">
        <p className="text-[13px] font-medium text-gray-600 leading-[1.5]">
          {progressDescriptor}
        </p>
      </div>
    </Card>
  )
}

// Learning Card Component
interface LearningCardProps {
  icon: React.ElementType
  title: string
  subtitle: string
  description: string
}

function LearningCard({ icon: Icon, title, subtitle, description }: LearningCardProps) {
  return (
    <Card className="group relative h-full flex flex-col bg-white rounded-2xl lg:rounded-3xl border border-gray-100/70 p-10 lg:p-12 shadow-sm shadow-gray-900/6 hover:shadow-lg hover:shadow-gray-900/10 hover:border-gray-200/80 hover:-translate-y-1 hover:scale-[1.01] transition-all duration-300 ease-out">
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-orange-400 to-amber-400 rounded-l-2xl lg:rounded-l-3xl" />
      
      {/* Icon */}
      <div className="h-12 w-12 lg:h-14 lg:w-14 rounded-lg bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center mb-6 lg:mb-7 ring-1 ring-orange-100/50">
        <Icon className="h-6 w-6 lg:h-7 lg:w-7 text-orange-600" strokeWidth={1.5} />
      </div>
      
      {/* Title */}
      <h3 className="font-heading text-2xl lg:text-[28px] font-semibold text-gray-900 leading-tight mb-2">
        {title}
      </h3>
      
      {/* Subtitle */}
      <p className="text-sm font-semibold text-orange-600 tracking-wide mb-6">
        {subtitle}
      </p>
      
      {/* Description */}
      <p className="text-[15px] lg:text-base text-gray-600 leading-[1.65]">
        {description}
      </p>
    </Card>
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
            <div className="max-w-5xl mx-auto text-center">
              
              <h2 id="why-heading" className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 tracking-[-0.02em] mb-8 lg:mb-10">
                Why We Build Products
              </h2>
              
              <div className="max-w-3xl mx-auto space-y-8 lg:space-y-10 text-base lg:text-lg text-gray-600 leading-[1.75]">
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
              
              {/* Product Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-9 max-w-6xl mx-auto">
                
                <ProductCard 
                  icon={Activity}
                  category="Healthcare Platform"
                  name="Clinax"
                  description="End-to-end healthcare operations platform managing patient records, provider workflows, and pharmacy coordination."
                  progressDescriptor="Actively validating clinical workflows with healthcare stakeholders"
                />
                
                <ProductCard 
                  icon={Video}
                  category="Patient Engagement Platform"
                  name="Halo"
                  description="HIPAA-compliant telemedicine platform enabling secure video consultations and asynchronous patient communication."
                  progressDescriptor="Refining telehealth workflows through provider feedback"
                />
                
                <ProductCard 
                  icon={DollarSign}
                  category="Business Tool"
                  name="TrueBill"
                  description="MSME digitization platform helping businesses streamline billing, quotations, and everyday operations."
                  progressDescriptor="Supporting daily business operations through digital workflows"
                />
                
                <ProductCard 
                  icon={Sparkles}
                  category="AI Application"
                  name="TafsirAI"
                  description="AI-powered Quran companion helping users explore authentic tafsir, hadith, and practical guidance from Islamic sources."
                  progressDescriptor="Exploring how AI can improve access to authentic Islamic knowledge"
                />
                
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
              <h3 className="font-heading text-[28px] lg:text-[36px] xl:text-[42px] font-extrabold text-gray-900 leading-[1.2] tracking-tight">
                Each product we build teaches us something we bring to yours.
              </h3>
            </div>
          </PageContainer>
        </motion.section>

        {/* SECTION 4: WHAT BUILDING THESE PRODUCTS TEACHES US */}
        <motion.section 
          className="py-16 md:py-24 lg:py-32 bg-white"
          aria-labelledby="learning-heading"
          {...animationProps}
        >
          <PageContainer>
            <div className="max-w-6xl mx-auto">
              
              <h2 id="learning-heading" className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 text-center tracking-[-0.02em] mb-8">
                What Building These Products Teaches Us
              </h2>
              
              <p className="text-base lg:text-lg text-gray-600 text-center leading-[1.7] max-w-4xl mx-auto mb-12">
                Every product we build teaches us something we bring to yours. Here&apos;s what we&apos;ve learned from being in the trenches.
              </p>
              
              {/* Learning Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-5xl mx-auto">
                
                <LearningCard 
                  icon={Target}
                  title="Validation"
                  subtitle="Learn before building"
                  description="We've learned how to test demand before building features. We know which validation techniques work and which waste time. We bring that discipline to your product."
                />
                
                <LearningCard 
                  icon={Zap}
                  title="Prioritization"
                  subtitle="Build what matters"
                  description="Building our own products taught us to prioritize ruthlessly. We know the difference between must-have features and nice-to-haves. We help you focus on what moves the needle."
                />
                
                <LearningCard 
                  icon={Rocket}
                  title="Execution"
                  subtitle="Ship with confidence"
                  description="Building products teaches you that execution is never as straightforward as the roadmap suggests. We understand the trade-offs, unexpected challenges, and decisions required to move from idea to reality. We help you execute with clarity and ship with confidence."
                />
                
                <LearningCard 
                  icon={TrendingUp}
                  title="Scale"
                  subtitle="Build for growth"
                  description="Building products teaches you to think beyond the first release. We focus on creating foundations that can support growth, adapt to change, and evolve as products mature. We help you build systems designed to scale from day one."
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
            <div className="max-w-5xl mx-auto">
              
              <h2 id="advantage-heading" className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 tracking-[-0.02em] mb-12 lg:mb-14 text-center">
                The Product Studio Advantage
              </h2>
              
              {/* Editorial Layout - Asymmetric composition */}
              <div className="max-w-4xl mx-auto">
                {/* Pull Quote - Prominent opening */}
                <p className="text-lg lg:text-xl xl:text-2xl text-gray-700 leading-[1.6] mb-12 lg:mb-16">
                  Many development partners focus solely on client delivery. Building products ourselves gives us a different perspective—we&apos;ve faced the same dilemmas founders face: limited budget, uncertain demand, pressure to ship fast without breaking things.
                </p>
                
                {/* Supporting paragraphs - Standard editorial rhythm */}
                <div className="max-w-3xl space-y-8 lg:space-y-10 text-base lg:text-lg text-gray-600 leading-[1.75]">
                  <p>
                    We have. That&apos;s why we don&apos;t just execute your requirements—we challenge assumptions, suggest better approaches, and help you avoid mistakes we&apos;ve already made.
                  </p>
                  <p>
                    When you work with builders who are building too, you get partners who understand the journey—not just the destination.
                  </p>
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
