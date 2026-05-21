"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, BookOpenCheck, CheckCircle } from "lucide-react"

export default function TafsirAIPage() {
  const [waitlistName, setWaitlistName] = useState("")
  const [waitlistEmail, setWaitlistEmail] = useState("")
  const [waitlistOrg, setWaitlistOrg] = useState("")
  const [waitlistStatus, setWaitlistStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [waitlistMessage, setWaitlistMessage] = useState("")

  const scrollToWaitlist = () => {
    const el = document.getElementById("tafsirai-waitlist")
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
          product: "TafsirAI",
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
    <div className="container mx-auto px-4 py-10 md:py-14 lg:py-24">
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">Artificial Intelligence</Badge>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            TafsirAI
            <span className="block font-heading text-2xl md:text-3xl font-semibold text-gray-700 mt-2">
              AI-powered insights and understanding of the Quran, built with care.
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-xl">
            TafsirAI helps learners, scholars, and institutions explore Quranic text with augmentative AI—respectfully
            and responsibly. It is designed to support understanding, not replace scholarship.
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
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Context aware</p>
              <p className="text-base text-gray-800">Surface relevant verses, themes, and references together.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Guided exploration</p>
              <p className="text-base text-gray-800">Structured journeys for students, educators, and researchers.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Responsible by design</p>
              <p className="text-base text-gray-800">Designed with safeguards and deference to established scholarship.</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                <BookOpenCheck className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="font-heading text-xl lg:text-2xl">Built for depth, not shortcuts</CardTitle>
                <p className="text-xs text-gray-500">Tools that invite reflection, study, and dialogue.</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <span>Search and explore across translations and supporting resources.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <span>Guided flows for common questions, topics, and themes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <span>Controls that make it clear where AI starts and where sources speak for themselves.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="mt-10 md:mt-12 lg:mt-20">
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="font-heading text-lg lg:text-xl">For learners</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>Support classes, halaqas, and self-paced study with structured journeys and prompts.</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="font-heading text-lg lg:text-xl">For institutions</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>Offer digital experiences that respect tradition while embracing modern tooling.</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="font-heading text-lg lg:text-xl">For researchers</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>Explore patterns, references, and themes at scale, with clear source grounding.</p>
            </CardContent>
          </Card>
        </div>
      </section>
      <section id="tafsirai-waitlist" className="mt-14 md:mt-20 lg:mt-28 max-w-2xl">
        <h2 className="font-heading text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Join the TafsirAI waitlist</h2>
        <p className="text-gray-600 mb-6 text-sm md:text-base">
          Share a few details and we&apos;ll reach out as TafsirAI becomes available for broader access.
        </p>
        <form onSubmit={handleWaitlistSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="tafsirai-name">
                Name
              </label>
              <input
                id="tafsirai-name"
                type="text"
                value={waitlistName}
                onChange={(e) => setWaitlistName(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="tafsirai-email">
                Email
              </label>
              <input
                id="tafsirai-email"
                type="email"
                value={waitlistEmail}
                onChange={(e) => setWaitlistEmail(e.target.value)}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="tafsirai-org">
              Organization (optional)
            </label>
            <input
              id="tafsirai-org"
              type="text"
              value={waitlistOrg}
              onChange={(e) => setWaitlistOrg(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Institution, programme, or initiative"
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
