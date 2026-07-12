'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface HeroBlockProps {
  headline: string
  subheading: string
  description: string
  primaryCta: {
    text: string
    href: string
  }
  secondaryCta?: {
    text: string
    href: string
  }
  visualElement?: 'screenshot' | 'founder' | 'diagram'
  accentedWords?: string[]
}

export function HeroBlock({
  headline,
  subheading,
  description,
  primaryCta,
  secondaryCta,
  visualElement = 'screenshot',
  accentedWords = [],
}: HeroBlockProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  }

  // Render headline with accented words in orange
  const renderHeadline = () => {
    let renderedHeadline = headline
    accentedWords.forEach((word) => {
      const regex = new RegExp(`(${word})`, 'gi')
      renderedHeadline = renderedHeadline.replace(
        regex,
        `<span class="text-orange-500">$1</span>`
      )
    })
    return (
      <h1
        className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight text-balance"
        dangerouslySetInnerHTML={{ __html: renderedHeadline }}
      />
    )
  }

  return (
    <section className="bg-white pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left: Content */}
          <motion.div className="space-y-8" variants={itemVariants}>
            {/* Subheading badge */}
            <motion.div
              className="inline-block"
              variants={itemVariants}
            >
              <span className="inline-block px-4 py-2 bg-orange-50 text-orange-700 text-sm font-semibold rounded-full">
                {subheading}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants}>
              {renderHeadline()}
            </motion.div>

            {/* Description */}
            <motion.p
              className="text-lg text-slate-600 leading-relaxed text-pretty"
              variants={itemVariants}
            >
              {description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-wrap gap-4 pt-4"
              variants={itemVariants}
            >
              <Link href={primaryCta.href}>
                <motion.button
                  className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2"
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {primaryCta.text}
                  <ArrowRight size={18} />
                </motion.button>
              </Link>
              {secondaryCta && (
                <Link href={secondaryCta.href}>
                  <motion.button
                    className="px-8 py-3 border-2 border-slate-300 text-slate-900 font-semibold rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-colors"
                    whileHover={{ x: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {secondaryCta.text}
                  </motion.button>
                </Link>
              )}
            </motion.div>
          </motion.div>

          {/* Right: Visual Element */}
          <motion.div
            className="relative h-96 md:h-full min-h-96 rounded-xl overflow-hidden shadow-2xl"
            variants={itemVariants}
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 40, opacity: 0 }}
          >
            {/* Placeholder background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-4xl">🏥</span>
                </div>
                <p className="text-slate-600 font-medium">
                  {visualElement === 'screenshot' && 'Product Interface'}
                  {visualElement === 'founder' && 'Founder Story'}
                  {visualElement === 'diagram' && 'System Architecture'}
                </p>
              </div>
            </div>

            {/* Accent stripe (orange) along bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
