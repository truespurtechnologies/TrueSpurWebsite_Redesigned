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
import { JsonLd } from "@/components/seo/JsonLd"
import { SITE_CONFIG } from "@/lib/constants"

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

// Capability Card Component
function CapabilityCard({ title, description }: { title: string; description: string }) {
  return (
    <Card className="relative bg-white rounded-xl border border-gray-100/80 p-7 lg:p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out group">
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-amber-400 rounded-l-xl group-hover:from-orange-500 group-hover:to-amber-500 transition-colors duration-300" />
      
      {/* Capability headline */}
      <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-4">
        {title}
      </h3>
      
      {/* Description */}
      <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
        {description}
      </p>
    </Card>
  )
}

// Belief Card Component
function BeliefCard({ belief, explanation }: { belief: string; explanation: string }) {
  return (
    <Card className="relative bg-white rounded-xl border border-gray-100/80 p-7 lg:p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out group">
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-400 to-amber-400 rounded-l-xl group-hover:from-orange-500 group-hover:to-amber-500 transition-colors duration-300" />
      
      {/* Belief headline */}
      <h3 className="font-heading text-base lg:text-lg font-semibold text-gray-900 mb-4">
        {belief}
      </h3>
      
      {/* Explanation */}
      <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
        {explanation}
      </p>
    </Card>
  )
}

export default function AboutPage() {
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
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About TrueSpur",
          description: "Learn about TrueSpur, a founder-led product studio that helps ambitious founders turn ideas into scalable digital products.",
          url: "https://truespur.ai/about",
        }}
      />
      <LeadFormDialog
        open={isLeadFormOpen}
        onOpenChange={setIsLeadFormOpen}
        source={leadFormSource}
      />
      <Header 
        currentPage="/about"
      />
      
      <main id="main-content" className="focus:outline-none">
        {/* SECTION 1: HERO */}
        <motion.section 
          className="py-12 md:py-16 lg:py-20 bg-white"
          aria-labelledby="hero-heading"
          {...animationProps}
        >
        <PageContainer>
          <div className="max-w-4xl mx-auto text-center">
            
            <h1 id="hero-heading" className="font-heading text-4xl lg:text-5xl xl:text-6xl font-black leading-tight text-gray-900">
              Building Products — Our Own and Yours
            </h1>
            
            <div className="mt-8 max-w-3xl mx-auto space-y-4">
              <p className="text-lg lg:text-xl leading-relaxed text-gray-600">
                TrueSpur is a founder-led product studio. We help ambitious founders turn ideas into scalable digital products—and we build our own products too.
              </p>
              <p className="text-lg lg:text-xl leading-relaxed text-gray-600">
                That shared experience changes everything.
              </p>
            </div>
            
            <div className="mt-8">
              <PrimaryButton size="lg" onClick={() => openLeadForm('about-hero')}>
                Start Your Project
              </PrimaryButton>
            </div>
            
          </div>
        </PageContainer>
      </motion.section>

      {/* SECTION 2: WHY TRUESPUR EXISTS */}
      <motion.section 
        className="py-16 md:py-20 lg:py-24 bg-gray-50"
        aria-labelledby="why-truespur-heading"
        {...animationProps}
      >
        <PageContainer>
          <div className="max-w-5xl mx-auto text-center">
            
            <h2 id="why-truespur-heading" className="font-heading text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 mb-8">
              Why TrueSpur Exists
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-4 text-base lg:text-lg text-gray-600">
              <p>Most founders face the same challenge: they have a great idea, but lack the technical expertise to build it. They hire agencies that don&apos;t understand product thinking. They work with developers who can&apos;t translate vision into execution.</p>
              <p>We built TrueSpur to solve that problem.</p>
              <p>We&apos;re product builders who partner with founders—not just execute requirements. We validate before you invest. We design for real users. We Build products ready to grow with your business to thousands of users without rebuilding.</p>
              <p>And because we build our own products (Clinax, Halo, TrueBill, TafsirAI), we understand product challenges from the inside. We&apos;ve faced the tough technical decisions, the launch anxiety, the scaling challenges. That&apos;s why we don&apos;t just advise—we build alongside you.</p>
            </div>
            
          </div>
        </PageContainer>
      </motion.section>

      {/* SECTION 3: OUR APPROACH TO BUILDING PRODUCTS */}
      <motion.section 
        className="py-16 md:py-20 lg:py-24 bg-white"
        aria-labelledby="approach-heading"
        {...animationProps}
      >
        <PageContainer>
          <div className="max-w-5xl mx-auto text-center">
            
            <h2 id="approach-heading" className="font-heading text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 mb-8">
              Our Approach to Building Products
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-4 text-base lg:text-lg text-gray-600">
              <p>We don&apos;t just build products for clients. We build our own.</p>
              <p>Right now, we&apos;re actively developing four products: Clinax (healthcare platform), Halo (patient engagement platform), TrueBill (billing automation), and TafsirAI (AI-powered insights). Each one teaches us something we bring to yours.</p>
              
              <h3 className="font-heading text-xl lg:text-2xl font-semibold text-gray-900 mt-6 mb-4">
                Why this matters:
              </h3>
              
              <p>Building your own products forces you to make the same hard decisions your clients face. Do we build this feature now or later? How do we validate demand before investing months of development? What&apos;s the minimum we can ship to test with real users?</p>
              <p>When you&apos;ve wrestled with those questions yourself, you become a better partner. You understand that founders need speed and clarity, not just technical execution. You know when to push back on a bad idea and when to move fast on a good one.</p>
              <p>That&apos;s the product studio difference. We&apos;re not just service providers—we&apos;re builders who understand the journey because we&apos;re building products ourselves.</p>
            </div>
            
          </div>
        </PageContainer>
      </motion.section>

      {/* SECTION 4: WHAT WE BRING TO EVERY PROJECT */}
      <motion.section 
        className="py-16 md:py-20 lg:py-24 bg-gray-50"
        aria-labelledby="capabilities-heading"
        {...animationProps}
      >
        <PageContainer>
          <div className="max-w-6xl mx-auto">
            
            <h2 id="capabilities-heading" className="font-heading text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 text-center mb-8">
              What We Bring to Every Project
            </h2>
            
            <p className="text-base lg:text-lg text-gray-600 text-center max-w-4xl mx-auto mb-12">
              Building scalable products requires more than good intentions. It requires deep capabilities across strategy, design, and engineering.
            </p>
            
            {/* Capability Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <CapabilityCard 
                title="Product strategy:"
                description="We help you validate demand, define your MVP, prioritize ruthlessly, and build roadmaps that balance vision with reality. No feature bloat. No building in the dark."
              />
              <CapabilityCard 
                title="Design that converts:"
                description="User research. Wireframes. High-fidelity prototypes. We design interfaces that are intuitive, accessible, and conversion-focused—tested with real users before a single line of code."
              />
              <CapabilityCard 
                title="Engineering excellence:"
                description="Clean code. Modern architecture. Scalable infrastructure. We build products that handle growth from launch to thousands of users without rebuilding. React, Node.js, cloud-native deployment, CI/CD pipelines—we use proven technologies that scale."
              />
              <CapabilityCard 
                title="Launch & beyond:"
                description="Go-to-market strategy. Analytics setup. Performance monitoring. We don't just ship code—we ship products ready for real users and real growth."
              />
            </div>
            
          </div>
        </PageContainer>
      </motion.section>

      {/* SECTION 5: MEET THE FOUNDER */}
      <motion.section 
        className="py-16 md:py-20 lg:py-24 bg-white"
        aria-labelledby="founder-heading"
        {...animationProps}
      >
        <PageContainer>
          <div className="max-w-6xl mx-auto">
            
            <h2 id="founder-heading" className="font-heading text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 mb-12 text-center lg:text-left">
              Meet the Founder
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
              
              {/* Founder Photo */}
              <div className="col-span-1 lg:col-span-2">
                <div className="w-full max-w-sm mx-auto lg:mx-0 bg-gray-200 rounded-2xl shadow-lg aspect-3/4 overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500 text-center px-4 text-sm" role="img" aria-label="Founder photograph placeholder">
                      Founder Photo
                    </span>
                  </div>
                  {/* Production-ready image container - replace with actual image */}
                  {/* <img 
                    src="/images/founder-aswar.jpg" 
                    alt="Aswar, founder of TrueSpur - experienced product manager with 15+ years in healthcare and enterprise software"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  /> */}
                </div>
              </div>
              
              {/* Content */}
              <div className="col-span-1 lg:col-span-3 space-y-5">
                
                <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                  TrueSpur was founded by Aswar, a product manager with 15+ years building healthcare and enterprise software products at world-class companies like Advisory Board Company (acquired by Optum) and athenahealth.
                </p>
                
                <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                  He wasn&apos;t always a product leader—he learned it through years of solving hard problems, rescuing failing products, and proving that capability comes from relentless learning, not pedigree.
                </p>
                
                <div>
                  <h3 className="font-heading text-base lg:text-lg font-semibold text-gray-900 mb-3">
                    Product thinking from the inside:
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    Aswar learned how to validate ideas, prioritize ruthlessly, ship products that solve real problems, and scale them to thousands of users. At athenahealth, he rescued DIRECT Messaging from a 5% success rate to 80%+, built Electronic Case Reporting from scratch post-COVID, and delivered Referral 360x in six months with a 15-person team.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-heading text-base lg:text-lg font-semibold text-gray-900 mb-3">
                    Why this experience matters:
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    Aswar doesn&apos;t just understand product theory. He&apos;s rescued failing products, built new ones from scratch, and scaled them in production. He knows what works, what doesn&apos;t, and how to navigate the messy reality between vision and execution.
                  </p>
                </div>
                
                <p className="text-sm lg:text-base text-gray-600 leading-relaxed italic">
                  That experience is what he brings to every TrueSpur product—yours and ours.
                </p>
                
              </div>
              
            </div>
          </div>
        </PageContainer>
      </motion.section>

      {/* SECTION 6: DEEP HEALTHCARE EXPERIENCE */}
      <motion.section 
        className="py-16 md:py-20 lg:py-24 bg-gray-50"
        aria-labelledby="healthcare-heading"
        {...animationProps}
      >
        <PageContainer>
          <div className="max-w-5xl mx-auto text-center">
            
            <h2 id="healthcare-heading" className="font-heading text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 mb-8">
              Deep Healthcare Experience
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-5 text-base lg:text-lg text-gray-600">
              
              <p>Healthcare technology is notoriously difficult. The regulations, the integrations, the compliance requirements—they stop most projects cold.</p>
              <p>We&apos;ve navigated it all for over a decade.</p>
              
              <div className="text-left space-y-5">
                <div>
                  <h3 className="font-heading text-base lg:text-lg font-semibold text-gray-900 mb-3">
                    Domain expertise:
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    TrueSpur has deep experience across the entire healthcare technology stack: EHR systems, telemedicine platforms, healthcare interoperability (HL7, FHIR, DIRECT), clinical workflows, insurance billing, and data analytics. We understand HIPAA compliance, clinical validation, and healthcare data security—not from reading documentation, but from shipping products that meet those standards.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-heading text-base lg:text-lg font-semibold text-gray-900 mb-3">
                    Government-recognized:
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    Our founder won a competitive healthcare contract from the Government of India—beating multinational corporations. The win came from doing the ground work: visiting hospitals, interviewing healthcare workers, understanding real constraints. Not assumptions. Evidence.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-heading text-base lg:text-lg font-semibold text-gray-900 mb-3">
                    Production experience:
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    We&apos;ve built healthcare platforms across EHR integration, telemedicine workflows, and clinical data exchange—navigating complex regulatory requirements, legacy system integrations, and interoperability standards that most teams never encounter.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-heading text-base lg:text-lg font-semibold text-gray-900 mb-3">
                    Why this makes us better builders:
                  </h3>
                  <p className="text-sm lg:text-base text-gray-600 leading-relaxed">
                    Healthcare is one of the most complex, regulated industries in the world. If you can build products that work in healthcare, you can build products that work anywhere. That discipline, that attention to detail, that understanding of compliance and security—it makes us better partners, whether your product is in healthcare or not.
                  </p>
                </div>
              </div>
              
            </div>
          </div>
        </PageContainer>
      </motion.section>

      {/* SECTION 7: WHAT WE BELIEVE */}
      <motion.section 
        className="py-16 md:py-20 lg:py-24 bg-white"
        aria-labelledby="beliefs-heading"
        {...animationProps}
      >
        <PageContainer>
          <div className="max-w-5xl mx-auto">
            
            <h2 id="beliefs-heading" className="font-heading text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 text-center mb-8">
              What We Believe
            </h2>
            
            <p className="text-base lg:text-lg text-gray-600 text-center max-w-4xl mx-auto mb-12">
              These principles guide how we build products—ours and yours.
            </p>
            
            {/* Belief Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <BeliefCard 
                belief="Validate before you invest."
                explanation="Great ideas fail when they solve problems nobody has. We validate demand before writing code. Talk to users. Test assumptions. Build the right thing, not just build things right."
              />
              <BeliefCard 
                belief="Outcomes over output."
                explanation="Shipping features doesn't matter if they don't solve real problems. We measure success by customer impact, not velocity. Does this create value? Does this move the business forward? If not, we don't build it."
              />
              <BeliefCard 
                belief="Face challenges, don't avoid them."
                explanation="Hard problems don't get easier by ignoring them. When things get difficult, that's when the real work begins. We lean into complexity, not away from it."
              />
              <BeliefCard 
                belief="Learning is the competitive advantage."
                explanation="We don't have all the answers. But we know how to find them. We learn from users, from data, from failures. Continuous learning isn't a nice-to-have—it's how we stay ahead."
              />
              <BeliefCard 
                belief="Build systems that scale."
                explanation="Products that work for 10 users often break at 1,000. We build for scale from day one—clean code, modern architecture, thoughtful infrastructure. So you don't have to rebuild when you grow."
              />
            </div>
            
          </div>
        </PageContainer>
      </motion.section>

      {/* SECTION 8: LOOKING AHEAD */}
      <motion.section 
        className="py-16 md:py-20 lg:py-24 bg-gray-50"
        aria-labelledby="looking-ahead-heading"
        {...animationProps}
      >
        <PageContainer>
          <div className="max-w-5xl mx-auto text-center">
            
            <h2 id="looking-ahead-heading" className="font-heading text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 mb-8">
              Looking Ahead
            </h2>
            
            <div className="max-w-4xl mx-auto space-y-4 text-base lg:text-lg text-gray-600">
              <p>We&apos;re building TrueSpur to prove that world-class products can be built from India—products that solve meaningful problems and compete globally.</p>
              <p>Our internal products (Clinax, Halo, TrueBill, TafsirAI) are the proof. Each one is designed to solve real problems and scale to thousands of users. We&apos;re not building portfolio pieces—we&apos;re building businesses.</p>
              <p>As we grow, we&apos;ll continue the dual model: building our own products and partnering with founders to build theirs. Both sides make us better. Our products teach us what founders face. Our client work exposes us to new industries and challenges.</p>
              <p>The goal isn&apos;t just revenue or growth. It&apos;s impact. Creating jobs. Helping founders bring their ideas to life. Building products that solve real problems for real people.</p>
              <p>That&apos;s what drives us. Building products that solve real problems, helping founders bring ideas to life, and proving that world-class products can be built from anywhere.</p>
            </div>
            
          </div>
        </PageContainer>
      </motion.section>

      {/* SECTION 9: FINAL CTA */}
      <motion.section 
        className="py-16 md:py-20 lg:py-24 bg-white"
        aria-labelledby="cta-heading"
        {...animationProps}
      >
        <PageContainer>
          <div className="max-w-4xl mx-auto text-center">
            
            <h2 id="cta-heading" className="font-heading text-3xl lg:text-4xl xl:text-5xl font-extrabold text-gray-900 mb-8">
              Let&apos;s Build Something Together
            </h2>
            
            <div className="max-w-3xl mx-auto space-y-4 text-base lg:text-lg text-gray-600 mb-12">
              <p>Whether you&apos;re validating a concept or ready to build, we&apos;d love to talk.</p>
              <p>We&apos;ll discuss your product, your goals, and whether we&apos;re the right partner. No sales pitch. Just an honest conversation about what you&apos;re building and how we can help.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <PrimaryButton size="lg" onClick={() => openLeadForm('about-final-cta-primary')}>
                Start Your Project
              </PrimaryButton>
              <SecondaryButton size="lg" onClick={() => window.open(SITE_CONFIG.calendlyUrl, '_blank', 'noopener,noreferrer')}>
                Schedule a Call
              </SecondaryButton>
            </div>
            
          </div>
        </PageContainer>
      </motion.section>

      </main>

      <Footer />
    </div>
  )
}
