"use client"

import { CalendarCheck, Mail, Video } from "lucide-react"

interface MeetingScheduledPanelProps {
  name?: string
}

export function MeetingScheduledPanel({ name }: MeetingScheduledPanelProps) {
  const greeting = name?.trim() ? `You're all set, ${name.trim()}.` : "You're all set."

  return (
    <div className="flex flex-col items-center py-4 text-center" role="status" aria-live="polite">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
        <CalendarCheck className="h-7 w-7 text-emerald-700" strokeWidth={1.75} aria-hidden="true" />
      </span>

      <h3 className="font-heading mt-4 text-2xl font-extrabold text-gray-900">
        Meeting scheduled
      </h3>
      <p className="mt-2 max-w-sm text-sm text-gray-600">
        {greeting} Your discovery call is confirmed and now on our calendar.
      </p>

      <div className="mt-6 w-full max-w-sm space-y-3 rounded-xl border border-gray-100 bg-gray-50/80 p-4 text-left">
        <div className="flex items-start gap-3">
          <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" strokeWidth={1.75} aria-hidden="true" />
          <p className="text-xs leading-relaxed text-gray-700">
            A calendar invite and confirmation email are on their way. Check your spam or
            promotions folder if you don&apos;t see it shortly.
          </p>
        </div>
        <div className="flex items-start gap-3">
          <Video className="mt-0.5 h-4 w-4 shrink-0 text-gray-500" strokeWidth={1.75} aria-hidden="true" />
          <p className="text-xs leading-relaxed text-gray-700">
            The invite includes your meeting link. You can reschedule any time from that email.
          </p>
        </div>
      </div>
    </div>
  )
}
