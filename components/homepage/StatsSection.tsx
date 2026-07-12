'use client'

import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

interface Stat {
  value: number
  suffix?: string
  label: string
  context?: string
  icon?: React.ReactNode
}

interface StatsSectionProps {
  heading?: string
  description?: string
  stats?: Stat[]
  backgroundVariant?: 'dark' | 'light'
}

const defaultStats: Stat[] = [
  {
    value: 100,
    suffix: 'K+',
    label: 'Annual Transactions',
    context: 'Processed across healthcare systems',
  },
  {
    value: 10,
    suffix: '+',
    label: 'Organizations Served',
    context: 'From mid-market to enterprise',
  },
  {
    value: 4,
    suffix: '+',
    label: 'Healthcare Verticals',
    context: 'Hospitals, clinics, labs, and more',
  },
]

function AnimatedStatCounter({
  value,
  suffix = '',
  label,
  context,
  index,
}: Stat & { index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const motionValue = useMotionValue(0)
  const roundedValue = useTransform(motionValue, (latest) =>
    Math.floor(latest)
  )

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const controls = motionValue.set(value, true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [value, motionValue])

  return (
    <motion.div
      ref={ref}
      className="text-center md:text-left space-y-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <div className="flex items-baseline gap-1 justify-center md:justify-start">
        <motion.span className="text-5xl md:text-6xl font-bold text-orange-500">
          {roundedValue}
        </motion.span>
        <span className="text-2xl md:text-3xl font-bold text-slate-700">
          {suffix}
        </span>
      </div>
      <p className="text-lg font-semibold text-slate-900">{label}</p>
      {context && (
        <p className="text-slate-600 text-sm leading-relaxed">{context}</p>
      )}
    </motion.div>
  )
}

export function StatsSection({
  heading = 'Proven Impact at Scale',
  description = 'Numbers that show what TrueSpur delivers',
  stats = defaultStats,
  backgroundVariant = 'light',
}: StatsSectionProps) {
  const bgClass = backgroundVariant === 'dark' ? 'bg-slate-900' : 'bg-white'
  const textClass = backgroundVariant === 'dark' ? 'text-white' : 'text-slate-900'

  return (
    <section className={`${bgClass} py-20 md:py-32 transition-colors`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className={`text-4xl md:text-5xl font-bold ${textClass} mb-4 text-balance`}>
            {heading}
          </h2>
          {description && (
            <p
              className={`text-xl ${
                backgroundVariant === 'dark'
                  ? 'text-slate-400'
                  : 'text-slate-600'
              }`}
            >
              {description}
            </p>
          )}
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {stats.map((stat, index) => (
            <motion.div
              key={`stat-${index}`}
              className={`pb-8 md:pb-0 ${
                index < stats.length - 1
                  ? 'md:border-r'
                  : ''
              } ${
                backgroundVariant === 'dark'
                  ? 'md:border-slate-700'
                  : 'md:border-slate-200'
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              <AnimatedStatCounter {...stat} index={index} />
            </motion.div>
          ))}
        </motion.div>

        {/* Contextual note */}
        <motion.div
          className={`mt-16 pt-12 border-t ${
            backgroundVariant === 'dark'
              ? 'border-slate-700'
              : 'border-slate-200'
          }`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p
            className={`text-sm ${
              backgroundVariant === 'dark'
                ? 'text-slate-400'
                : 'text-slate-600'
            } italic`}
          >
            All metrics represent current-year data from operational systems. 
            Numbers continue to grow as we expand healthcare transformation capabilities.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
