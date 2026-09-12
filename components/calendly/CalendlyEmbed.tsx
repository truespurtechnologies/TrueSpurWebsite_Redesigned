"use client"

import { useEffect, useRef, useState } from "react"
import { Loader2 } from "lucide-react"

const CALENDLY_SCRIPT_SRC = "https://assets.calendly.com/assets/external/widget.js"
const CALENDLY_STYLE_HREF = "https://assets.calendly.com/assets/external/widget.css"

export interface CalendlyPrefill {
  name?: string
  email?: string
  /** Maps to Calendly's custom question answers, e.g. { a1: "..." } */
  customAnswers?: Record<string, string>
}

interface CalendlyWidget {
  initInlineWidget: (options: {
    url: string
    parentElement: HTMLElement
    prefill?: CalendlyPrefill
  }) => void
}

declare global {
  interface Window {
    Calendly?: CalendlyWidget
  }
}

/**
 * Calendly posts messages from its own origin. Anything else is ignored so a
 * hostile frame cannot fake a "meeting scheduled" event.
 */
function isCalendlyEvent(event: MessageEvent): boolean {
  let originHost: string
  try {
    originHost = new URL(event.origin).hostname
  } catch {
    return false
  }

  const isCalendlyOrigin = originHost === "calendly.com" || originHost.endsWith(".calendly.com")

  return (
    isCalendlyOrigin &&
    typeof event.data === "object" &&
    event.data !== null &&
    typeof (event.data as { event?: unknown }).event === "string" &&
    (event.data as { event: string }).event.startsWith("calendly.")
  )
}

function loadCalendlyAssets(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === "undefined") {
      reject(new Error("Calendly can only load in the browser."))
      return
    }

    if (!document.querySelector(`link[href="${CALENDLY_STYLE_HREF}"]`)) {
      const link = document.createElement("link")
      link.rel = "stylesheet"
      link.href = CALENDLY_STYLE_HREF
      document.head.appendChild(link)
    }

    if (window.Calendly) {
      resolve()
      return
    }

    const existing = document.querySelector<HTMLScriptElement>(`script[src="${CALENDLY_SCRIPT_SRC}"]`)

    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true })
      existing.addEventListener("error", () => reject(new Error("Calendly script failed to load.")), { once: true })
      return
    }

    const script = document.createElement("script")
    script.src = CALENDLY_SCRIPT_SRC
    script.async = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error("Calendly script failed to load."))
    document.body.appendChild(script)
  })
}

interface CalendlyEmbedProps {
  url: string
  prefill?: CalendlyPrefill
  onEventScheduled: () => void
  /** Height of the scheduling area in pixels. */
  height?: number
}

export function CalendlyEmbed({ url, prefill, onEventScheduled, height = 640 }: CalendlyEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  // Keep the latest callback without re-initialising the widget on every render.
  const onEventScheduledRef = useRef(onEventScheduled)
  useEffect(() => {
    onEventScheduledRef.current = onEventScheduled
  }, [onEventScheduled])

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (!isCalendlyEvent(event)) return

      if ((event.data as { event: string }).event === "calendly.event_scheduled") {
        onEventScheduledRef.current()
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [])

  useEffect(() => {
    let cancelled = false
    const container = containerRef.current

    loadCalendlyAssets()
      .then(() => {
        if (cancelled || !container || !window.Calendly) return

        // Clear any widget left over from a previous mount before re-initialising.
        container.innerHTML = ""
        window.Calendly.initInlineWidget({ url, parentElement: container, prefill })
        setStatus("ready")
      })
      .catch(() => {
        if (!cancelled) setStatus("error")
      })

    return () => {
      cancelled = true
      if (container) container.innerHTML = ""
    }
    // `prefill` is captured once on mount by design; the widget is not re-created
    // mid-session because that would discard whatever the user already selected.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url])

  if (status === "error") {
    return (
      <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-8 text-center">
        <p className="text-sm font-medium text-gray-900">The scheduler could not load.</p>
        <p className="text-xs text-gray-600">
          Your connection or an ad blocker may be preventing it.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-semibold text-orange-600 underline underline-offset-4 hover:text-orange-700"
        >
          Open the scheduler in a new tab
        </a>
      </div>
    )
  }

  return (
    <div className="relative">
      {status === "loading" && (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-2"
          style={{ height }}
        >
          <Loader2 className="h-5 w-5 animate-spin text-orange-500" aria-hidden="true" />
          <p className="text-xs text-gray-500">Loading available times…</p>
        </div>
      )}
      <div ref={containerRef} style={{ minWidth: 320, height }} />
    </div>
  )
}
