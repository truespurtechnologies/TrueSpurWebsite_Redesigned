"use client"

import { useEffect, useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { CalendlyEmbed, type CalendlyPrefill } from "./CalendlyEmbed"
import { MeetingScheduledPanel } from "./MeetingScheduledPanel"
import { SITE_CONFIG } from "@/lib/constants"

interface CalendlyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  prefill?: CalendlyPrefill
}

export function CalendlyDialog({ open, onOpenChange, prefill }: CalendlyDialogProps) {
  const [isScheduled, setIsScheduled] = useState(false)

  // Reset once the dialog has closed so the next open starts on the scheduler.
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => setIsScheduled(false), 200)
      return () => clearTimeout(timer)
    }
  }, [open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={isScheduled ? "max-w-lg p-6 md:p-8" : "max-w-3xl p-6"}>
        {isScheduled ? (
          <>
            <MeetingScheduledPanel name={prefill?.name} />
            <DialogFooter>
              <Button
                type="button"
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto"
              >
                Back to TrueSpur
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl">Book your discovery call</DialogTitle>
              <DialogDescription>
                Pick a time that suits you. It takes 30 minutes, and there&apos;s no cost.
              </DialogDescription>
            </DialogHeader>
            <CalendlyEmbed
              url={SITE_CONFIG.calendlyUrl}
              prefill={prefill}
              onEventScheduled={() => setIsScheduled(true)}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
