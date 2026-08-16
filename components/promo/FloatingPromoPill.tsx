"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Gift, X } from "lucide-react"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

interface FloatingPromoPillProps {
  badge?: string
  title: string
  subtitle?: string
  ctaText: string
  onCtaClick: () => void
  onDismiss: () => void
  /** Fraction of the page the user must scroll before the pill appears. */
  revealAtScrollFraction?: number
}

export function FloatingPromoPill({
  badge,
  title,
  subtitle,
  ctaText,
  onCtaClick,
  onDismiss,
  revealAtScrollFraction = 0.5,
}: FloatingPromoPillProps) {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [hasReachedThreshold, setHasReachedThreshold] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight

      // Short pages cannot meet a percentage threshold, so reveal immediately.
      if (scrollable <= 0) {
        setHasReachedThreshold(true)
        return
      }

      const progress = window.scrollY / scrollable
      setHasReachedThreshold(progress >= revealAtScrollFraction)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [revealAtScrollFraction])

  return (
    <AnimatePresence>
      {hasReachedThreshold && (
        <motion.div
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
          animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.3, ease: "easeOut" }}
          className="fixed bottom-4 right-4 left-4 z-50 sm:left-auto sm:bottom-6 sm:right-6 sm:w-[344px]"
          role="complementary"
          aria-label="Independence Day offer"
        >
          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-emerald-700 via-teal-600 to-cyan-600 p-5 shadow-2xl shadow-emerald-900/30 ring-1 ring-white/15">
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss offer"
              className="absolute right-2.5 top-2.5 rounded-full p-1.5 text-white/60 transition-colors duration-200 hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-4 w-4" strokeWidth={2} />
            </button>

            <div className="flex items-start gap-3 pr-7">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
                <Gift className="h-4 w-4 text-amber-200" strokeWidth={1.75} aria-hidden="true" />
              </span>

              <div className="min-w-0">
                {badge && (
                  <span className="mb-1.5 inline-block rounded-full bg-amber-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-900">
                    {badge}
                  </span>
                )}
                <p className="font-heading text-[15px] font-bold leading-snug text-white">
                  {title}
                </p>
                {subtitle && (
                  <p className="mt-1 text-xs leading-relaxed text-emerald-50/90">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={onCtaClick}
              className="mt-4 w-full rounded-full bg-white px-5 py-2.5 text-sm font-bold text-emerald-800 shadow-sm transition-all duration-200 hover:bg-amber-300 hover:text-emerald-900 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-700"
            >
              {ctaText}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
