"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { PageContainer } from "@/components/layout/PageContainer"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PrimaryButton } from "@/components/cta/PrimaryButton"
import { SecondaryButton } from "@/components/cta/SecondaryButton"

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
  initial: _shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 40 },
  whileInView: _shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
  transition: _shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" },
  viewport: { once: true, amount: 0.3 }
})

export default function ContactPage() {
  const shouldReduceMotion = useReducedMotion()
  const animationProps = createAnimationProps(shouldReduceMotion)

  const openLeadForm = (source: string) => {
    // Implementation for opening lead form
    console.log(`Opening lead form from ${source}`)
  }

  return (
    <div className="min-h-screen bg-white">
      <Header currentPage="/contact" openLeadForm={openLeadForm} />
      
      <main>
        <PageContainer>
          <motion.div 
            initial={animationProps.initial}
            whileInView={animationProps.whileInView}
            transition={animationProps.transition}
            viewport={animationProps.viewport}
            className="text-center py-16 lg:py-24"
          >
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Get in touch with the TrueSpur team to discuss your project ideas and learn how we can help bring them to life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <PrimaryButton 
                onClick={() => openLeadForm("get-started")}
                className="inline-flex items-center"
              >
                Start Your Project
              </PrimaryButton>
              <SecondaryButton 
                onClick={() => window.location.href = "/about"}
                className="inline-flex items-center"
              >
                Learn About Us
              </SecondaryButton>
            </div>
          </motion.div>
          
          <motion.div 
            initial={animationProps.initial}
            whileInView={animationProps.whileInView}
            transition={animationProps.transition}
            viewport={animationProps.viewport}
            className="max-w-4xl mx-auto py-12"
          >
            <div className="bg-gray-50 rounded-2xl p-8 md:p-12 text-center">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-gray-900 mb-4">
                Contact Page Coming Soon
              </h2>
              <p className="text-gray-600 mb-6">
                We're currently building our comprehensive contact page with detailed contact information, 
                contact forms, and team information. In the meantime, please use the "Start Your Project" 
                button above to get in touch with us.
              </p>
              <p className="text-sm text-gray-500">
                This page is under development and will be updated according to the approved specifications.
              </p>
            </div>
          </motion.div>
        </PageContainer>
      </main>
      
      <Footer />
    </div>
  )
}
