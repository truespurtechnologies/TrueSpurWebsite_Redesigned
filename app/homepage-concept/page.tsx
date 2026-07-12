'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroBlock } from '@/components/homepage/HeroBlock'
import { InterconnectionSection } from '@/components/homepage/InterconnectionSection'
import { FounderStorySection } from '@/components/homepage/FounderStorySection'
import { StatsSection } from '@/components/homepage/StatsSection'
import { TrustSection } from '@/components/homepage/TrustSection'
import { CTASection } from '@/components/homepage/CTASection'
import { FounderJourneyVisualization } from '@/components/page/FounderJourneyVisualization'

export default function HomePageConceptPage() {
  return (
    <div className="bg-white">
      <Header />

      {/* Hero Section - Visual Proof */}
      <HeroBlock
        headline="Healthcare Software That&apos;s Actually Built for Healthcare"
        subheading="Proof First"
        description="We don&apos;t just talk about transformation. We&apos;ve lived it. TrueSpur combines battle-tested software with consulting expertise to help healthcare organizations modernize faster and smarter."
        primaryCta={{
          text: 'Explore Our Approach',
          href: '/services',
        }}
        secondaryCta={{
          text: 'View Our Products',
          href: '/products',
        }}
        accentedWords={['transformation', 'software', 'expertise']}
      />

      {/* How It Works - Interconnection */}
      <InterconnectionSection
        heading="Products That Power Services"
        subheading="Our software and consulting work together—not separately."
      />

      {/* Founder Story - Why TrueSpur Exists */}
      <FounderStorySection
        headline="Built by Founders Who Get It"
        storyText="We didn't start TrueSpur with a business plan. We started inside healthcare organizations, wrestling with legacy systems, manual workflows, and the real human cost of operational inefficiency. After years working in the trenches, we realized healthcare deserved better. So we built it."
        journeyComponent={<FounderJourneyVisualization />}
        backgroundVariant="light"
      />

      {/* Stats Section - Scale Proof */}
      <StatsSection
        heading="Results at Scale"
        description="Healthcare organizations trust TrueSpur with their most critical operations"
        backgroundVariant="dark"
      />

      {/* Trust Section - Social Proof */}
      <TrustSection
        heading="Trusted by Healthcare Leaders"
        description="From innovative startups to enterprise health systems, healthcare leaders choose TrueSpur"
        backgroundVariant="light"
      />

      {/* Final CTA */}
      <CTASection
        heading="Start Your Healthcare Transformation"
        description="Whether you need software, consulting, or both—we're ready to help."
        backgroundVariant="dark"
      />

      <Footer />
    </div>
  )
}
