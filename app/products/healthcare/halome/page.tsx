"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle, MessageCircle } from "lucide-react"

export default function HaloMePage() {
  const [waitlistName, setWaitlistName] = useState("")
  const [waitlistEmail, setWaitlistEmail] = useState("")
  const [waitlistOrg, setWaitlistOrg] = useState("")
  const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [waitlistMessage, setWaitlistMessage] = useState("")

  const scrollToWaitlist = () => {
    const el = document.getElementById("halome-waitlist")
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setWaitlistStatus("loading")
    setWaitlistMessage("")

    if (!waitlistName.trim() || !waitlistEmail.trim()) {
      setWaitlistStatus("error")
      setWaitlistMessage("Name and email are required")
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(waitlistEmail)) {
      setWaitlistStatus("error")
      setWaitlistMessage("Please enter a valid email address")
      return
    }

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: waitlistName,
          email: waitlistEmail,
          organization: waitlistOrg,
          product: "HaloMe",
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || data.message || "Failed to join waitlist")
      }

      setWaitlistStatus("success")
      setWaitlistMessage(data.message || "You're on the waitlist. We'll keep you updated.")
      setWaitlistName("")
      setWaitlistEmail("")
      setWaitlistOrg("")
    } catch (error) {
      setWaitlistStatus("error")
      setWaitlistMessage(error instanceof Error ? error.message : "Failed to join waitlist. Please try again.")
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">Healthcare Product Suite</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            HaloMe
            <span className="block text-xl md:text-2xl font-semibold text-gray-700 mt-2">
              Patient engagement that feels personal, not transactional.
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-xl">
            HaloMe helps health systems reach, educate, and support patients beyond the hospital walls—through
            thoughtful, timely, and contextual communication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
              onClick={scrollToWaitlist}
            >
              Join waitlist
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="border-orange-300 text-orange-600 hover:bg-orange-50"
              asChild
            >
              <a href="/">Back to home</a>
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Omnichannel</p>
              <p className="text-base text-gray-800">Reach patients via SMS, WhatsApp, email, and in-app experiences.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Contextual</p>
              <p className="text-base text-gray-800">Trigger communication based on real events in the care journey.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Measurable</p>
              <p className="text-base text-gray-800">Track engagement, satisfaction, and adherence with clarity.</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-lg">Engagement with empathy</CardTitle>
                <p className="text-xs text-gray-500">Built for real patient lives, not just outreach campaigns.</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <span>Personalised reminders for medication, follow-ups, and preventive care.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <span>Two-way communication for questions, clarifications, and support.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <span>Insight dashboards to understand who is at risk of falling through the cracks.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-16 lg:mt-24">
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Pre-visit & post-discharge flows</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>Design and automate journeys that prepare patients before visits and support them after discharge.</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Education that lands</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>Deliver the right educational content at the right time in the care journey.</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="text-base">Feedback loops</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>Capture satisfaction and outcome signals to improve care, not just processes.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section id="halome-waitlist" className="mt-20 lg:mt-24 max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Join the HaloMe waitlist</h2>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Share a few details and we&apos;ll reach out as we open up early access and pilots.
        </p>
        <form onSubmit={handleWaitlistSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="halome-name">
                Name
              </label>
              <input
                id="halome-name"
                type="text"
                value={waitlistName}
                onChange={(e) => setWaitlistName(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="halome-email">
                Email
              </label>
              <input
                id="halome-email"
                type="email"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="halome-org">
              Organization (optional)
            </label>
            <input
              id="halome-org"
              type="text"
              value={waitlistOrg}
              onChange={(e) => setWaitlistOrg(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Hospital, clinic, or initiative"
            />
          </div>
          {waitlistMessage && (
            <p
              className={`text-sm ${
                waitlistStatus === "success" ? "text-green-600" : waitlistStatus === "error" ? "text-red-600" : "text-gray-600"
              }`}
            >
              {waitlistMessage}
            </p>
          )}
          <Button
            type="submit"
            disabled={waitlistStatus === "loading"}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
          >
            {waitlistStatus === "loading" ? "Submitting..." : "Request early access"}
          </Button>
        </form>
      </section>
    </div>
  )
}
