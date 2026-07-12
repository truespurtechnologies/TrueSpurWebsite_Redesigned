'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface FounderStorySectionProps {
  headline?: string
  storyText?: string
  journeyComponent?: React.ReactNode
  backgroundVariant?: 'dark' | 'light'
}

export function FounderStorySection({
  headline = 'Built by Founders Who Live the Problem',
  storyText = 'We didn&apos;t start with a software idea. We started in healthcare operations—wrestling with outdated systems, manual processes, and the human cost of inefficiency. After years of working inside healthcare organizations, we decided to build the solutions we needed ourselves. Now we help others navigate the same transformation.',
  journeyComponent,
  backgroundVariant = 'light',
}: FounderStorySectionProps) {
  const bgClass = backgroundVariant === 'dark' ? 'bg-slate-900' : 'bg-white'
  const textClass = backgroundVariant === 'dark' ? 'text-white' : 'text-slate-900'
  const subTextClass =
    backgroundVariant === 'dark' ? 'text-slate-300' : 'text-slate-600'

  return (
    <section className={`${bgClass} py-20 md:py-32 transition-colors`}>
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Left: Story Text */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="space-y-4">
              <h2 className={`text-4xl md:text-5xl font-bold ${textClass} leading-tight text-balance`}>
                {headline}
              </h2>
              <p className={`text-lg leading-relaxed ${subTextClass} text-pretty`}>
                {storyText}
              </p>
            </div>

            {/* Story highlights */}
            <div className="space-y-4 pt-4">
              {[
                ' years of combined healthcare operations experience',
                'Founders still actively involved in client delivery',
                'Built on feedback from hundreds of implementations',
              ].map((highlight, i) => (
                <motion.div
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">✓</span>
                  </div>
                  <span className={subTextClass}>
                    {highlight === ' years of combined healthcare operations experience'
                      ? '15+ years of combined healthcare operations experience'
                      : highlight}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Journey Visualization or Visual Element */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {journeyComponent ? (
              <div className="rounded-xl overflow-hidden shadow-xl">
                {journeyComponent}
              </div>
            ) : (
              <div className={`${backgroundVariant === 'dark' ? 'bg-slate-800' : 'bg-slate-100'} rounded-xl p-12 h-96 flex items-center justify-center`}>
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-orange-100 rounded-lg flex items-center justify-center">
                    <span className="text-4xl">👥</span>
                  </div>
                  <p className={`${subTextClass} font-medium`}>
                    Founder Journey Visualization
                  </p>
                </div>
              </div>
            )}

            {/* Decorative accent */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-orange-500 rounded-full opacity-10 blur-2xl"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
