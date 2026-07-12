'use client'

import { motion } from 'framer-motion'

interface TrustSectionProps {
  heading?: string
  description?: string
  partnerNames?: string[]
  backgroundVariant?: 'dark' | 'light'
}

export function TrustSection({
  heading = 'Trusted by Healthcare Leaders',
  description = 'From innovative startups to established health systems, organizations rely on TrueSpur',
  partnerNames = [
    'Leading Health Network',
    'Major Medical Center',
    'Digital Health Platform',
    'Healthcare Consulting Firm',
    'Biotech Research Institute',
    'Hospital Group',
  ],
  backgroundVariant = 'light',
}: TrustSectionProps) {
  const bgClass =
    backgroundVariant === 'dark'
      ? 'bg-slate-900 text-white'
      : 'bg-orange-50 text-slate-900'
  const secondaryBgClass =
    backgroundVariant === 'dark'
      ? 'bg-slate-800'
      : 'bg-white'

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4 },
    },
  }

  return (
    <section className={`${bgClass} py-16 md:py-24 transition-colors`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            {heading}
          </h2>
          <p
            className={`text-lg ${
              backgroundVariant === 'dark'
                ? 'text-slate-400'
                : 'text-slate-600'
            } max-w-2xl mx-auto`}
          >
            {description}
          </p>
        </motion.div>

        {/* Partner logos / names grid - Asymmetric arrangement */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {partnerNames.map((partner, index) => (
            <motion.div
              key={index}
              className={`${secondaryBgClass} rounded-lg p-6 md:p-8 flex items-center justify-center min-h-24 shadow-sm hover:shadow-md transition-shadow ${
                index % 3 === 1 ? 'md:mt-6' : ''
              } ${index % 3 === 2 ? 'md:-mt-2' : ''}`}
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >
              {/* Partner placeholder - in real implementation, use actual logos */}
              <div className="text-center">
                <div className="w-12 h-12 mx-auto mb-3 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-xl">🏥</span>
                </div>
                <p
                  className={`text-sm font-semibold ${
                    backgroundVariant === 'dark'
                      ? 'text-slate-300'
                      : 'text-slate-700'
                  }`}
                >
                  {partner}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonial or stats highlight */}
        <motion.div
          className={`mt-16 p-8 md:p-12 rounded-lg border-2 border-orange-200 ${
            backgroundVariant === 'dark' ? 'bg-slate-800' : 'bg-white'
          }`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <p
            className={`text-center text-lg leading-relaxed ${
              backgroundVariant === 'dark'
                ? 'text-slate-300'
                : 'text-slate-700'
            }`}
          >
            <span className="text-orange-600 font-semibold">
              {"Healthcare transformation requires more than software—it requires partners who understand your business."}
            </span>
            {' '}TrueSpur brings both expertise and empathy to every engagement.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
