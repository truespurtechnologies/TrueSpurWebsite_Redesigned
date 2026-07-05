"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PrimaryButton } from "@/components/cta/PrimaryButton"
import { ContactForm } from "@/components/contact/ContactForm"
import { ProcessStepCard } from "@/components/contact/ProcessStepCard"

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
const createAnimationProps = (_shouldReduceMotion: boolean) => ({
  initial: _shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
  whileInView: _shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
  transition: _shouldReduceMotion ? { duration: 0 } : { duration: 0.4, ease: "easeOut" },
  viewport: { once: true, amount: 0.3 }
})

export default function ContactPage() {
  const shouldReduceMotion = useReducedMotion()
  const animationProps = createAnimationProps(shouldReduceMotion)

  const scrollToForm = () => {
    const formSection = document.getElementById('contact-form')
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="/contact" />
      
      <main>
        {/* SECTION 1: HERO */}
        <section className="py-16 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div 
              {...animationProps}
              className="text-center"
            >
              <h1 className="font-heading text-5xl lg:text-6xl xl:text-7xl font-black text-gray-900 leading-[1.15] mb-6">
                Let&apos;s Talk About What You&apos;re Building.
              </h1>
              <p className="text-lg lg:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mt-6">
                Whether you&apos;re validating an idea or ready to build, we&apos;d love to have a conversation. No sales pitch. No pressure. Just an honest discussion about your product and whether we&apos;re the right partner to help you build it.
              </p>
              <div className="mt-10">
                <PrimaryButton 
                  onClick={scrollToForm}
                  size="lg"
                >
                  Start a Conversation
                </PrimaryButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 2: WHY FOUNDERS REACH OUT */}
        <section className="py-16 md:py-24 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div {...animationProps}>
              <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.1] mb-8">
                Why Founders Reach Out
              </h2>
              <div className="space-y-6 text-base leading-relaxed text-gray-600">
                <p>
                  Founders reach out to us at different stages—some are validating an idea, others are ready to build, and some are already building but need help navigating complexity.
                </p>
                <p>
                  You might be a non-tech founder who understands your domain but needs help translating vision into execution. You might be building in healthcare and need expertise in compliance, EHR integration, or clinical workflows. Or you might just want to talk to someone who thinks like a product manager, not a vendor.
                </p>
                <p>
                  Wherever you are in your journey, if you&apos;re thinking about building a product, we&apos;re here to talk.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: WHAT HAPPENS NEXT */}
        <section className="py-16 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <motion.div {...animationProps}>
              <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.1] mb-6 text-center">
                What Happens Next
              </h2>
              <p className="text-base text-gray-600 leading-relaxed text-center mb-12">
                Here&apos;s exactly what to expect after you reach out:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ProcessStepCard
                  number={1}
                  title="You fill out the form."
                  description="Tell us about what you're building. Just a few sentences—enough for us to understand the problem you're solving and who it's for."
                />
                <ProcessStepCard
                  number={2}
                  title="We respond within 24 hours."
                  description="Aswar (our founder) or a senior team member will reach out to schedule a conversation. We'll send a calendar link or suggest a few times that work."
                />
                <ProcessStepCard
                  number={3}
                  title="We have a 30-45 minute conversation."
                  description="No sales pitch. We'll ask about your product, your goals, and what you've validated so far. We'll share how we'd approach it, what concerns us, and what excites us. We'll challenge assumptions and help you think through the hard questions."
                />
                <ProcessStepCard
                  number={4}
                  title="We determine fit together."
                  description="Not every idea should be built. Not every founder-partner fit works. We'll be honest about whether we think we're the right partner for you. If we're not, we'll say so. If we are, we'll talk about next steps."
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: PERMISSION FRAMEWORK */}
        <section className="py-16 md:py-24 lg:py-32 bg-gray-50">
          <div className="container mx-auto px-4 max-w-3xl">
            <motion.div {...animationProps}>
              <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.1] mb-8">
                You Don&apos;t Need Everything Figured Out
              </h2>
              <div className="space-y-6 text-base leading-relaxed text-gray-600">
                <p>
                  You don&apos;t need a detailed spec. You don&apos;t need wireframes. You don&apos;t need a budget estimate or a technology stack picked out.
                </p>
                <p>
                  You just need to be thinking about a problem worth solving.
                </p>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                    If you&apos;re still validating:
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    We can help you figure out whether there&apos;s real demand, who your users are, and what to build first.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                    If you&apos;re not sure where to start:
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    We can help you break down the problem, prioritize what matters, and create a roadmap that balances vision with reality.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                    If you&apos;re worried about cost:
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    We&apos;ll have an honest conversation about what&apos;s realistic for your stage and goals. We&apos;re optimizing for building products that work, not maximizing project scope.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                    If you&apos;re building in healthcare:
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    We understand the complexity—HIPAA compliance, EHR integration, clinical workflows, regulatory requirements. We&apos;ve navigated it all for over a decade.
                  </p>
                </div>
              </div>

              <p className="text-base text-gray-600 leading-relaxed mt-8">
                The best time to reach out is when you&apos;re thinking seriously about building something. We&apos;ll help you figure out the rest.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 5: HOW WE HELP FOUNDERS */}
        <section className="py-16 md:py-24 lg:py-32 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div {...animationProps}>
              <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.1] mb-8">
                How We Help Founders
              </h2>
              <p className="text-base text-gray-600 leading-relaxed mb-8">
                We partner with founders through the entire journey—from validating demand to launching products people want to use.
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                    Product Discovery & Validation:
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Test assumptions before investing months of development. Validate market demand. Define your MVP. Build strategy grounded in evidence.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                    Product Design & User Experience:
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Design experiences users understand and adopt quickly. Test with real users before writing code. Create foundations that evolve as your product grows.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                    Product Development:
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Build MVPs on scalable foundations. Ship products ready for real users, not just technically complete. Focus on outcomes—solving problems, not just shipping features.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                    Healthcare Expertise:
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Navigate HIPAA compliance, EHR integration, clinical workflows, and regulatory requirements. Build healthcare products grounded in operational reality.
                  </p>
                </div>

                <div>
                  <h3 className="font-heading text-lg lg:text-xl font-semibold text-gray-900 mb-2">
                    AI Integration:
                  </h3>
                  <p className="text-base text-gray-600 leading-relaxed">
                    Identify where AI creates value vs. where it&apos;s just hype. Build AI-assisted workflows that solve real problems, not chase trends.
                  </p>
                </div>
              </div>

              <p className="text-base text-gray-600 leading-relaxed mt-8">
                We think like product managers, not vendors. We validate before we build. We measure success by outcomes, not features shipped.
              </p>
            </motion.div>
          </div>
        </section>

        {/* SECTION 6: CONTACT FORM */}
        <section id="contact-form" data-contact-form className="py-16 md:py-24 lg:py-28 bg-gray-50">
          <div className="container mx-auto px-4 max-w-2xl">
            <motion.div {...animationProps}>
              <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.1] mb-6 text-center">
                Ready to Start the Conversation?
              </h2>
              <p className="text-base text-gray-600 leading-relaxed text-center mb-8">
                Tell us a bit about what you&apos;re building. We&apos;re only asking for what we need to have a meaningful conversation—your name, how to reach you, and a brief description of your product idea.
              </p>
              <p className="text-base text-gray-600 leading-relaxed text-center mb-12">
                Everything else is optional. We&apos;ll learn the details when we talk.
              </p>
              
              <ContactForm />
            </motion.div>
          </div>
        </section>

        {/* SECTION 7: CLOSING REASSURANCE */}
        <section className="py-16 md:py-24 lg:py-32 mb-16 md:mb-20 lg:mb-24 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div {...animationProps} className="text-center">
              <h2 className="font-heading text-4xl lg:text-5xl font-extrabold text-gray-900 leading-[1.1] mb-6">
                We&apos;re Looking Forward to Talking
              </h2>
              <div className="space-y-6 text-base leading-relaxed text-gray-600">
                <p>
                  Whether we end up working together or not, we&apos;ll make sure you leave the conversation with more clarity than you came in with.
                </p>
                <p>
                  We&apos;ll share what we think about your idea—honestly. We&apos;ll surface risks you might not have considered. We&apos;ll suggest approaches you might not have explored. And if we&apos;re not the right fit, we&apos;ll tell you that too.
                </p>
                <p>
                  Because the best partnerships start with honest conversations.
                </p>
                <p>
                  We&apos;re looking forward to hearing what you&apos;re building.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  )
}
