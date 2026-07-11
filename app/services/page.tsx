"use client"

import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PrimaryButton } from "@/components/cta/PrimaryButton"
import { SecondaryButton } from "@/components/cta/SecondaryButton"
import { ServiceCard } from "@/components/cards/ServiceCard"
import { FounderJourneyVisualization } from "@/components/page/FounderJourneyVisualization"
import { LeadFormDialog } from "@/components/lead-form-dialog"
import { JsonLd } from "@/components/seo/JsonLd"
import { SITE_CONFIG } from "@/lib/constants"

export default function ServicesPage() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false)
  const [leadFormSource, setLeadFormSource] = useState<
    "get-started" | "start-project" | "get-proposal" | "success-story" | null
  >(null)

  const openLeadForm = (source: string) => {
    setLeadFormSource(source as "get-started" | "start-project" | "get-proposal" | "success-story")
    setIsLeadFormOpen(true)
  }

  const serviceOfferings = [
    {
      title: "Product Discovery & Validation",
      positioning: "Reduce risk before you build.",
      bullets: [
        "Validate market demand through user research and interviews",
        "Define your MVP and prioritize features that matter",
        "Test assumptions before investing months of development",
        "Build product strategy grounded in evidence, not guesses",
        "Identify the right problems to solve for your target users"
      ]
    },
    {
      title: "Product Design & User Experience",
      positioning: "Design products people want to use.",
      bullets: [
        "Map user journeys and identify friction points",
        "Test designs with real users before writing code",
        "Design experiences users understand and adopt quickly",
        "Create design foundations that evolve as your product grows",
        "Build products people can actually use"
      ]
    },
    {
      title: "SaaS Product Development",
      positioning: "Build products ready to grow with your business.",
      bullets: [
        "Build MVPs on foundations that can evolve as adoption grows",
        "Build customer portals and internal platforms",
        "Create scalable architecture using modern technologies",
        "Ship products ready for real users, not just technically complete",
        "Focus on outcomes—solving problems, not just shipping features"
      ]
    },
    {
      title: "Healthcare Product Development",
      positioning: "Build healthcare products grounded in clinical and operational reality.",
      bullets: [
        "Design clinical workflows that fit how providers actually work",
        "Design healthcare products that earn provider and patient trust",
        "Integrate with EHR systems using HL7, FHIR, and DIRECT standards",
        "Reduce risk by building with healthcare realities in mind",
        "Create patient-facing experiences that build trust"
      ]
    },
    {
      title: "AI Product Development",
      positioning: "Integrate AI to solve real problems.",
      bullets: [
        "Identify where AI creates value vs. where it's just hype",
        "Build AI-assisted workflows that improve user productivity",
        "Develop knowledge systems and LLM applications",
        "Focus on solving problems, not chasing trends",
        "Ensure AI features are reliable, not just impressive demos"
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: "TrueSpur Services",
          description: "We build products. We help you build yours. Product strategy, design, and engineering—integrated into one team that thinks like founders, not vendors.",
          url: "https://truespur.ai/services",
        }}
      />
      <Header currentPage="/services" />
      
      <main>
        {/* SECTION 1: HERO */}
        <section className="py-20 md:py-24 lg:py-28 bg-white" aria-labelledby="services-hero-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              
              <h1 id="services-hero-heading" className="font-heading text-5xl lg:text-6xl xl:text-7xl font-black leading-tight text-gray-900">
                We Build Products. We Help You Build Yours.
              </h1>
              
              <p className="text-lg lg:text-xl leading-relaxed text-gray-600 mt-8 max-w-3xl mx-auto">
                From validating your idea to launching a product people want to use, we partner with founders to turn concepts into real products. Product strategy, design, and engineering—integrated into one team that thinks like founders, not vendors.
              </p>
              
              {/* Lightweight identity signal */}
              <div className="mt-8 flex items-center justify-center gap-2 text-sm text-gray-500">
                <div className="h-px w-8 bg-gray-300" />
                <span className="font-medium">Founder-Led Product Studio</span>
                <div className="h-px w-8 bg-gray-300" />
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
                <PrimaryButton size="lg" onClick={() => openLeadForm("services-hero-primary")}>
                  Start Your Project
                </PrimaryButton>
                
                <SecondaryButton size="lg" variant="light" onClick={() => window.open(SITE_CONFIG.calendlyUrl, '_blank', 'noopener,noreferrer')}>
                  Schedule a Call
                </SecondaryButton>
              </div>
              
            </div>
          </div>
        </section>

        {/* SECTION 2: FROM IDEA TO PRODUCT */}
        <section className="py-16 md:py-24 lg:py-32 bg-gray-50" aria-labelledby="services-journey-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              
              <h2 id="services-journey-heading" className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-8">
                From Idea to Product
              </h2>
              
              <div className="max-w-3xl mx-auto space-y-6 text-base lg:text-lg text-gray-600 leading-relaxed">
                <p>
                  Most founders face the same challenge: they know what problem they want to solve, but need help turning that vision into a product people will use.
                </p>
                <p>
                  We guide you through the entire journey—from validating demand to designing experiences to building software that can evolve with your business to launching with confidence.
                </p>
                <p>
                  We don&apos;t just execute requirements. We challenge assumptions, suggest better approaches, and help you avoid mistakes we&apos;ve already made building our own products.
                </p>
              </div>
              
              <FounderJourneyVisualization />
              
            </div>
          </div>
        </section>

        {/* SECTION 3: WHAT WE OFFER (SERVICES GRID) */}
        <section className="py-16 md:py-24 lg:py-32 bg-white" aria-labelledby="services-offerings-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              
              <h2 id="services-offerings-heading" className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 text-center mb-12">
                What We Offer
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {serviceOfferings.map((service, index) => (
                  <ServiceCard
                    key={index}
                    title={service.title}
                    positioning={service.positioning}
                    bullets={service.bullets}
                  />
                ))}
              </div>
              
            </div>
          </div>
        </section>

        {/* SECTION 4: WHY FOUNDERS WORK WITH US */}
        <section className="py-16 md:py-24 lg:py-32 bg-gray-50" aria-labelledby="services-why-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              
              <h2 id="services-why-heading" className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 text-center mb-8">
                Why Founders Work With Us
              </h2>
              
              <div className="max-w-4xl mx-auto text-base lg:text-lg text-gray-600">
                
                <p className="text-center mb-12">
                  We&apos;re not a typical development agency. We&apos;re a product studio—which means we build our own products (Clinax, Halo, TrueBill, TafsirAI) alongside building yours.
                </p>
                
                {/* Editorial 2-column layout for visual variation */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl mx-auto">
                  
                  <div className="space-y-3">
                    <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900">
                      We think like founders.
                    </h3>
                    <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                      We&apos;ve faced the same challenges you face: limited budget, uncertain demand, pressure to ship fast without breaking things. That shared experience changes how we work. We don&apos;t just execute—we challenge assumptions, suggest better approaches, and help you avoid mistakes we&apos;ve already made.
                    </p>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900">
                      We bring product thinking.
                    </h3>
                    <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                      Our founder is a product manager with 15+ years building healthcare and enterprise software. We validate before we build. We prioritize ruthlessly. We measure success by outcomes, not features shipped.
                    </p>
                  </div>
                  
                  <div className="space-y-3 lg:col-span-2 max-w-3xl mx-auto">
                    <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900">
                      We&apos;re actively building.
                    </h3>
                    <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                      When you work with a team that&apos;s building products themselves, you get partners who understand the journey—not just the destination. We know what it&apos;s like to make difficult product decisions, work within constraints, and balance speed with long-term sustainability.
                    </p>
                  </div>
                  
                </div>
                
              </div>
              
            </div>
          </div>
        </section>

        {/* SECTION 5: HOW WE WORK WITH FOUNDERS */}
        <section className="py-16 md:py-24 lg:py-32 bg-white" aria-labelledby="services-how-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              
              <h2 id="services-how-heading" className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 text-center mb-8">
                How We Work With Founders
              </h2>
              
              <div className="max-w-4xl mx-auto text-base lg:text-lg text-gray-600">
                
                <p className="text-center mb-12">
                  We believe the best products come from honest partnerships, not transactional relationships.
                </p>
                
                <div className="max-w-3xl mx-auto space-y-8">
                  
                  <div>
                    <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                      We start with honest conversations.
                    </h3>
                    <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                      Not every idea should be built. Not every feature matters. We&apos;ll tell you when we think you&apos;re solving the wrong problem or building the wrong thing. That honesty saves you time and money.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                      We challenge assumptions.
                    </h3>
                    <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                      Great products come from questioning everything. We push back on bad ideas and move fast on good ones. We validate before we invest. We build only what creates value.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                      We think long-term.
                    </h3>
                    <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                      We&apos;re not optimizing for the fastest path to invoicing hours. We&apos;re optimizing for building products that solve real problems and scale sustainably. That means sometimes saying no to features that don&apos;t move the business forward.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-4">
                      We build alongside you.
                    </h3>
                    <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
                      You&apos;re not handing off requirements to a vendor. You&apos;re partnering with builders who understand product challenges from the inside. We&apos;re in the trenches with you.
                    </p>
                  </div>
                  
                </div>
                
              </div>
              
            </div>
          </div>
        </section>

        {/* SECTION 6: FINAL CTA */}
        <section className="py-16 md:py-24 lg:py-32 bg-gray-50" aria-labelledby="services-cta-heading">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              
              <h2 id="services-cta-heading" className="font-heading text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-900 mb-8">
                Let&apos;s Talk About What You&apos;re Building.
              </h2>
              
              <div className="max-w-2xl mx-auto space-y-5 text-lg lg:text-xl text-gray-600 leading-relaxed mb-12">
                <p>
                  Whether you&apos;re validating an idea or ready to build, let&apos;s talk. We&apos;ll discuss your product, your goals, and whether we&apos;re the right partner.
                </p>
                <p>
                  No sales pitch. Just an honest conversation about what you&apos;re building and how we can help.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <PrimaryButton size="lg" onClick={() => openLeadForm("services-final-cta-primary")}>
                  Start Your Project
                </PrimaryButton>
                
                <SecondaryButton size="lg" variant="light" onClick={() => window.open(SITE_CONFIG.calendlyUrl, '_blank', 'noopener,noreferrer')}>
                  Schedule a Call
                </SecondaryButton>
              </div>
              
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <LeadFormDialog
        open={isLeadFormOpen}
        onOpenChange={setIsLeadFormOpen}
        source={leadFormSource}
      />
    </div>
  )
}
