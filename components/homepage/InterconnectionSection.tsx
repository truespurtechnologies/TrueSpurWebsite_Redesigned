'use client'

import { motion } from 'framer-motion'
import { Code, Smartphone, Brain, Users, Heart, Database } from 'lucide-react'
import Link from 'next/link'

interface ProductCard {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  accentFeature: string
  href: string
}

const defaultProducts: ProductCard[] = [
  {
    id: '1',
    name: 'Internal Product Suite',
    description: 'Our proprietary software that manages healthcare operations',
    icon: <Database className="w-8 h-8" />,
    accentFeature: 'Built on 5+ years of healthcare expertise',
    href: '/products',
  },
  {
    id: '2',
    name: 'Integration Platform',
    description: 'Connect your systems seamlessly',
    icon: <Code className="w-8 h-8" />,
    accentFeature: 'Pre-built connectors for major EHR systems',
    href: '/products',
  },
  {
    id: '3',
    name: 'Consulting Services',
    description: 'Expert guidance on healthcare transformation',
    icon: <Users className="w-8 h-8" />,
    accentFeature: 'Delivered by founders who built the products',
    href: '/services',
  },
]

interface InterconnectionSectionProps {
  heading?: string
  subheading?: string
  products?: ProductCard[]
}

export function InterconnectionSection({
  heading = 'How TrueSpur Creates Value',
  subheading = 'Our products power our services. Our services inform our products.',
  products = defaultProducts,
}: InterconnectionSectionProps) {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  }

  return (
    <section className="bg-slate-50 py-20 md:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16 md:mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-balance">
            {heading}
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto text-pretty">
            {subheading}
          </p>
        </motion.div>

        {/* Product Cards Grid with Asymmetry */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              className={`relative group cursor-pointer ${
                index === 1 ? 'md:mt-8' : ''
              } ${index === 2 ? 'md:-mt-4' : ''}`}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              onClick={() => {
                window.location.href = product.href
              }}
            >
              <div className="bg-white rounded-xl p-8 h-full shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100">
                {/* Icon background circle */}
                <div className="w-16 h-16 bg-orange-50 rounded-lg flex items-center justify-center mb-6 text-orange-500 group-hover:bg-orange-100 transition-colors">
                  {product.icon}
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-base leading-relaxed mb-6">
                  {product.description}
                </p>

                {/* Accent Feature (Orange highlight) */}
                <div className="pt-6 border-t border-slate-200">
                  <p className="text-sm font-semibold text-orange-600">
                    ✓ {product.accentFeature}
                  </p>
                </div>

                {/* Hover indicator */}
                <div className="absolute top-0 left-0 w-1 h-0 bg-orange-500 transition-all duration-300 group-hover:h-full rounded-t-xl"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Connection explanation */}
        <motion.div
          className="mt-16 text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="inline-block bg-white px-8 py-6 rounded-xl border-2 border-orange-200 border-dashed">
            <p className="text-slate-700 text-lg leading-relaxed">
              <span className="font-semibold text-orange-600">The TrueSpur Advantage:</span> We don't sell software and consulting separately. 
              We embed the lessons learned from implementing our products directly into our services, 
              and we use real-world service engagements to evolve our platform.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
