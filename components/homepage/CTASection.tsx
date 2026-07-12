'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface CTASectionProps {
  heading?: string
  description?: string
  primaryCta?: {
    text: string
    href: string
    icon?: React.ReactNode
  }
  secondaryCta?: {
    text: string
    href: string
  }
  backgroundVariant?: 'dark' | 'light'
}

export function CTASection({
  heading = 'Ready to Transform Your Healthcare Operations?',
  description = 'Join healthcare leaders who&apos;ve chosen TrueSpur to accelerate their digital transformation journey.',
  primaryCta = {
    text: 'Explore Our Services',
    href: '/services',
  },
  secondaryCta = {
    text: 'View Our Products',
    href: '/products',
  },
  backgroundVariant = 'dark',
}: CTASectionProps) {
  const bgClass =
    backgroundVariant === 'dark'
      ? 'bg-gradient-to-r from-slate-900 to-slate-800'
      : 'bg-gradient-to-r from-slate-100 to-slate-50'
  const textClass =
    backgroundVariant === 'dark' ? 'text-white' : 'text-slate-900'
  const subTextClass =
    backgroundVariant === 'dark' ? 'text-slate-300' : 'text-slate-700'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
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

  return (
    <section className={`${bgClass} py-20 md:py-32 transition-all relative overflow-hidden`}>
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 opacity-5 rounded-full -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-orange-500 opacity-5 rounded-full -ml-36 -mb-36"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Heading */}
          <motion.h2
            className={`text-4xl md:text-5xl font-bold ${textClass} leading-tight text-balance`}
            variants={itemVariants}
          >
            {heading}
          </motion.h2>

          {/* Description */}
          <motion.p
            className={`text-xl ${subTextClass} leading-relaxed text-pretty`}
            variants={itemVariants}
          >
            {description}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4 justify-center items-center"
            variants={itemVariants}
          >
            <Link href={primaryCta.href}>
              <motion.button
                className="px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors flex items-center gap-2 whitespace-nowrap"
                whileHover={{ x: 4, scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {primaryCta.text}
                <ArrowRight size={18} />
              </motion.button>
            </Link>

            {secondaryCta && (
              <Link href={secondaryCta.href}>
                <motion.button
                  className={`px-8 py-3 border-2 font-semibold rounded-lg transition-all ${
                    backgroundVariant === 'dark'
                      ? 'border-white text-white hover:bg-white hover:text-slate-900'
                      : 'border-slate-400 text-slate-900 hover:bg-slate-200'
                  }`}
                  whileHover={{ x: -4, scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {secondaryCta.text}
                </motion.button>
              </Link>
            )}
          </motion.div>

          {/* Secondary note */}
          <motion.div
            className={`pt-8 border-t ${
              backgroundVariant === 'dark'
                ? 'border-slate-700'
                : 'border-slate-300'
            }`}
            variants={itemVariants}
          >
            <p className={`text-sm ${subTextClass}`}>
              Not sure where to start?{' '}
              <Link href="/contact">
                <span className="font-semibold text-orange-400 hover:text-orange-300 transition-colors cursor-pointer">
                  Let's talk
                </span>
              </Link>
              {' '}about your healthcare transformation goals.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
