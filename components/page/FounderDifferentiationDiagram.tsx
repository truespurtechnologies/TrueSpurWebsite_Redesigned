"use client"

import Image from "next/image"
import { useRef } from "react"
import { motion, useInView, useReducedMotion } from "framer-motion"

interface Capability {
  title: string
  bullets: string[]
}

interface FounderDifferentiationDiagramProps {
  className?: string
}

const capabilities: Capability[] = [
  {
    title: "Founder Mindset",
    bullets: ["Understand uncertainty", "Challenge assumptions", "Think long-term"],
  },
  {
    title: "Product Thinking",
    bullets: ["Validate first", "Prioritize ruthlessly", "Build to scale"],
  },
  {
    title: "Building Every Day",
    bullets: ["Four internal products", "Real customer problems", "Lessons applied to yours"],
  },
]

function TrueSpurMark() {
  return (
    <div className="relative h-20 w-20 overflow-hidden" aria-hidden="true">
      <Image
        src="/images/TrueSpur logo Transparent.png"
        alt=""
        width={384}
        height={384}
        className="absolute left-[-43px] top-[-83px] h-96 w-96 max-w-none"
      />
    </div>
  )
}

function StudioNode() {
  return (
    <motion.div
      className="relative z-10 flex h-56 w-56 flex-col items-center justify-center rounded-full border border-amber-500/40 bg-white text-center shadow-[0_26px_70px_-34px_rgba(146,64,14,0.42)]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <TrueSpurMark />
      <p className="mt-2 font-heading text-xl font-semibold text-gray-900">TrueSpur</p>
      <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gray-500">
        Founder-Led<br />Product Studio
      </p>
    </motion.div>
  )
}

function CapabilityNode({ capability, index, isVisible }: { capability: Capability; index: number; isVisible: boolean }) {
  return (
    <motion.article
      className="relative z-10 w-64 rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-[0_18px_42px_-30px_rgba(17,24,39,0.32)]"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 12 }}
      transition={{ duration: 0.45, delay: 0.7 + index * 0.2, ease: "easeOut" }}
    >
      <div className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full border border-amber-500/30 bg-amber-50/50">
        <span className="h-2.5 w-2.5 rotate-45 bg-orange-500" />
      </div>
      <h3 className="font-heading text-lg font-semibold text-gray-900">{capability.title}</h3>
      <div className="mx-auto mt-3 h-0.5 w-6 rounded-full bg-orange-400" />
      <ul className="mt-3 space-y-1.5 text-sm leading-relaxed text-gray-500">
        {capability.bullets.map((bullet) => (
          <li key={bullet} className="flex items-center justify-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" aria-hidden="true" />
            {bullet}
          </li>
        ))}
      </ul>
    </motion.article>
  )
}

/**
 * A responsive radial diagram that makes TrueSpur's founder-led product-studio
 * positioning scannable before visitors read the surrounding page content.
 */
export function FounderDifferentiationDiagram({ className = "" }: FounderDifferentiationDiagramProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.35 })
  const shouldReduceMotion = useReducedMotion()
  const lineTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.55, delay: 0.25, ease: "easeOut" }

  return (
    <div ref={ref} className={`mx-auto mt-16 max-w-6xl ${className}`}>
      <div className="hidden min-h-[41rem] items-center justify-center md:flex">
        <div className="relative h-[41rem] w-full max-w-6xl">
          <div className="absolute left-1/2 top-[53%] h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-amber-200/70" aria-hidden="true" />
          <div className="absolute left-1/2 top-[53%] h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full border border-amber-100" aria-hidden="true" />
          <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 1200 656" fill="none" aria-hidden="true">
            <motion.path
              d="M600 348 L600 205"
              stroke="#D1D5DB"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isInView ? 1 : 0 }}
              transition={lineTransition}
            />
            <motion.path
              d="M600 348 L316 456"
              stroke="#D1D5DB"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isInView ? 1 : 0 }}
              transition={{ ...lineTransition, delay: shouldReduceMotion ? 0 : 0.35 }}
            />
            <motion.path
              d="M600 348 L884 456"
              stroke="#D1D5DB"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: isInView ? 1 : 0 }}
              transition={{ ...lineTransition, delay: shouldReduceMotion ? 0 : 0.45 }}
            />
            <circle cx="600" cy="205" r="5" fill="#F59E0B" />
            <circle cx="316" cy="456" r="5" fill="#F59E0B" />
            <circle cx="884" cy="456" r="5" fill="#F59E0B" />
          </svg>

          <div className="absolute left-1/2 top-0 -translate-x-1/2">
            <CapabilityNode capability={capabilities[0]} index={0} isVisible={isInView} />
          </div>
          <div className="absolute left-1/2 top-[53%] -translate-x-1/2 -translate-y-1/2">
            {isInView && <StudioNode />}
          </div>
          <div className="absolute bottom-0 left-[4%]">
            <CapabilityNode capability={capabilities[1]} index={1} isVisible={isInView} />
          </div>
          <div className="absolute bottom-0 right-[4%]">
            <CapabilityNode capability={capabilities[2]} index={2} isVisible={isInView} />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center md:hidden">
        {isInView && <StudioNode />}
        {capabilities.map((capability, index) => (
          <div key={capability.title} className="flex w-full flex-col items-center">
            <motion.div
              className="h-12 w-px bg-gray-200"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: isInView ? 1 : 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.35, delay: shouldReduceMotion ? 0 : 0.3 + index * 0.2 }}
              style={{ transformOrigin: "top" }}
            />
            <CapabilityNode capability={capability} index={index} isVisible={isInView} />
          </div>
        ))}
      </div>
    </div>
  )
}
