"use client"

import { motion } from "framer-motion"
import { PartyPopper, X } from "lucide-react"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"

interface AnnouncementBannerProps {
  badge?: string
  title: string
  subtitle?: string
  ctaText: string
  onCtaClick: () => void
  onDismiss?: () => void
}

export function AnnouncementBanner({
  badge,
  title,
  subtitle,
  ctaText,
  onCtaClick,
  onDismiss,
}: AnnouncementBannerProps) {
  const prefersReducedMotion = usePrefersReducedMotion()

  return (
    <div
      role="banner"
      aria-label="Promotional announcement"
      className="relative z-40 w-full overflow-hidden bg-linear-to-r from-emerald-700 via-teal-600 to-cyan-600"
    >
      {/* Moving highlight sweep to draw the eye without shouting */}
      {!prefersReducedMotion && (
        <motion.div
          className="pointer-events-none absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-white/15 to-transparent"
          initial={{ x: "-100%" }}
          animate={{ x: "400%" }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
          aria-hidden="true"
        />
      )}

      <div className="relative container mx-auto px-4 py-2.5 md:py-3">
        <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25">
              <PartyPopper className="h-4 w-4 text-amber-200" strokeWidth={1.75} aria-hidden="true" />
            </span>

            <div className="flex flex-col gap-x-3 gap-y-0.5 min-w-0 md:flex-row md:items-center">
              {badge && (
                <span className="flex w-fit items-center gap-1.5 rounded-full bg-amber-300 pl-1.5 pr-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-900">
                  {/* Contained tricolor nod — kept inside the badge rather than used as a background */}
                  <span className="flex h-3 w-3 flex-col overflow-hidden rounded-full ring-1 ring-emerald-900/20" aria-hidden="true">
                    <span className="h-1 bg-orange-500" />
                    <span className="h-1 bg-white" />
                    <span className="h-1 bg-green-700" />
                  </span>
                  {badge}
                </span>
              )}
              <p className="font-heading text-sm font-bold leading-snug text-white md:text-[15px]">
                {title}
              </p>
              {subtitle && (
                <p className="text-xs leading-snug text-emerald-50/90 md:text-sm">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onCtaClick}
              className="rounded-full bg-white px-5 py-2 text-sm font-bold text-emerald-800 shadow-sm transition-all duration-200 hover:bg-amber-300 hover:text-emerald-900 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-700"
            >
              {ctaText}
            </button>

            {onDismiss && (
              <button
                type="button"
                onClick={onDismiss}
                aria-label="Dismiss announcement"
                className="rounded-full p-1.5 text-white/70 transition-colors duration-200 hover:bg-white/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-700"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Saffron accent hairline separating the banner from the header */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-amber-400 via-white/70 to-amber-400"
        aria-hidden="true"
      />
    </div>
  )
}
