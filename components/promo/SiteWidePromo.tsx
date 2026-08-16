"use client"

import { useState, useEffect } from "react"
import { AnnouncementBanner } from "./AnnouncementBanner"
import { FloatingPromoPill } from "./FloatingPromoPill"
import { LeadFormDialog } from "@/components/lead-form-dialog"

interface PromoConfig {
  badge: string
  title: string
  subtitle: string
  ctaText: string
  pillTitle: string
  pillSubtitle: string
  startDate: string // ISO date, e.g. "2026-08-01"
  endDate: string // ISO date, e.g. "2026-08-31"
  bannerStorageKey: string
  pillStorageKey: string
  source: "independence-day-offer"
}

const PROMO: PromoConfig = {
  badge: "Independence Day",
  title: "Free Product Discovery Call",
  subtitle: "Offer ends 31 Aug — map your MVP with us in 30 minutes.",
  ctaText: "Claim Free Call",
  pillTitle: "Still exploring? Let’s talk.",
  pillSubtitle: "Book a free 30-minute product discovery call. Offer ends 31 Aug.",
  startDate: "2026-08-01",
  endDate: "2026-08-31",
  bannerStorageKey: "truespur-promo-aug-2026-banner-dismissed",
  pillStorageKey: "truespur-promo-aug-2026-pill-dismissed",
  source: "independence-day-offer",
}

function readDismissed(storageKey: string): boolean {
  try {
    return localStorage.getItem(storageKey) === "true"
  } catch {
    // localStorage may be unavailable (private mode, blocked cookies)
    return false
  }
}

function writeDismissed(storageKey: string) {
  try {
    localStorage.setItem(storageKey, "true")
  } catch {
    // Dismissal simply will not persist across reloads
  }
}

function isPromoActive(startDate: string, endDate: string): boolean {
  const now = new Date()
  const start = new Date(startDate)
  const end = new Date(endDate)
  end.setHours(23, 59, 59, 999)
  return now >= start && now <= end
}

export function SiteWidePromo() {
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false)
  const [isCampaignActive, setIsCampaignActive] = useState(false)
  const [isBannerVisible, setIsBannerVisible] = useState(false)
  const [isPillVisible, setIsPillVisible] = useState(false)
  const [hasHydrated, setHasHydrated] = useState(false)

  useEffect(() => {
    if (isPromoActive(PROMO.startDate, PROMO.endDate)) {
      setIsCampaignActive(true)
      setIsBannerVisible(!readDismissed(PROMO.bannerStorageKey))
      setIsPillVisible(!readDismissed(PROMO.pillStorageKey))
    }
    setHasHydrated(true)
  }, [])

  const handleDismissBanner = () => {
    setIsBannerVisible(false)
    writeDismissed(PROMO.bannerStorageKey)
  }

  const handleDismissPill = () => {
    setIsPillVisible(false)
    writeDismissed(PROMO.pillStorageKey)
  }

  const handleOpenLeadForm = () => {
    setIsLeadFormOpen(true)
  }

  // Avoid a server/client markup mismatch: nothing renders until storage is read.
  if (!hasHydrated || !isCampaignActive) {
    return null
  }

  return (
    <>
      {isBannerVisible && (
        <AnnouncementBanner
          badge={PROMO.badge}
          title={PROMO.title}
          subtitle={PROMO.subtitle}
          ctaText={PROMO.ctaText}
          onCtaClick={handleOpenLeadForm}
          onDismiss={handleDismissBanner}
        />
      )}

      {isPillVisible && (
        <FloatingPromoPill
          badge={PROMO.badge}
          title={PROMO.pillTitle}
          subtitle={PROMO.pillSubtitle}
          ctaText={PROMO.ctaText}
          onCtaClick={handleOpenLeadForm}
          onDismiss={handleDismissPill}
        />
      )}

      <LeadFormDialog
        open={isLeadFormOpen}
        onOpenChange={setIsLeadFormOpen}
        source={PROMO.source}
      />
    </>
  )
}
