"use client"

import React, { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type LeadFormSource = "get-started" | "start-project" | "get-proposal" | "success-story"

type StepKey =
  | "welcome"
  | "fullName"
  | "email"
  | "phone"
  | "company"
  | "role"
  | "modules"
  | "requirements"
  | "success"

interface LeadFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  source: LeadFormSource | null
}

interface LeadFormState {
  fullName: string
  email: string
  phoneCountryCode: string
  phoneNumber: string
  company: string
  role: string
  modules: string[]
  modulesOther: string
  requirements: string
}

const MODULE_OPTIONS = [
  "iOS App",
  "Android App",
  "Website",
  "Payment Integration",
  "AI Automation / Application",
  "Explore TrueSpur Product Suite",
  "Other",
]

const DEFAULT_FORM_STATE: LeadFormState = {
  fullName: "",
  email: "",
  phoneCountryCode: "+1",
  phoneNumber: "",
  company: "",
  role: "",
  modules: [],
  modulesOther: "",
  requirements: "",
}

const COUNTRY_CODES = [
  { code: "+1", label: "US / Canada" },
  { code: "+44", label: "UK" },
  { code: "+61", label: "Australia" },
  { code: "+65", label: "Singapore" },
  { code: "+91", label: "India" },
]

export function LeadFormDialog({ open, onOpenChange, source }: LeadFormDialogProps) {
  const [step, setStep] = useState<StepKey>("welcome")
  const [form, setForm] = useState<LeadFormState>(DEFAULT_FORM_STATE)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const resetState = () => {
    setStep("welcome")
    setForm(DEFAULT_FORM_STATE)
    setSubmitting(false)
    setError(null)
  }

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      resetState()
    }
    onOpenChange(nextOpen)
  }

  const handleNext = () => {
    setError(null)

    if (step === "welcome") {
      setStep("fullName")
      return
    }

    if (step === "fullName") {
      if (!form.fullName.trim()) {
        setError("Please enter your full name.")
        return
      }
      setStep("email")
      return
    }

    if (step === "email") {
      if (!form.email.trim()) {
        setError("Please enter your email address.")
        return
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(form.email)) {
        setError("Please enter a valid email address.")
        return
      }
      setStep("phone")
      return
    }

    if (step === "phone") {
      if (!form.phoneNumber.trim()) {
        setError("Please enter your contact number.")
        return
      }
      setStep("company")
      return
    }

    if (step === "company") {
      if (!form.company.trim()) {
        setError("Please enter your company name.")
        return
      }
      setStep("role")
      return
    }

    if (step === "role") {
      if (!form.role.trim()) {
        setError("Please enter your role in the company.")
        return
      }
      setStep("modules")
      return
    }

    if (step === "modules") {
      if (form.modules.length === 0) {
        setError("Please select at least one module.")
        return
      }
      if (form.modules.includes("Other") && !form.modulesOther.trim()) {
        setError("Please describe the 'Other' modules you need.")
        return
      }
      setStep("requirements")
      return
    }
  }

  const handleBack = () => {
    setError(null)

    if (step === "requirements") {
      setStep("modules")
    } else if (step === "modules") {
      setStep("role")
    } else if (step === "role") {
      setStep("company")
    } else if (step === "company") {
      setStep("phone")
    } else if (step === "phone") {
      setStep("email")
    } else if (step === "email") {
      setStep("fullName")
    } else if (step === "fullName") {
      setStep("welcome")
    }
  }

  const toggleModule = (module: string) => {
    setForm((prev) => {
      const exists = prev.modules.includes(module)
      if (exists) {
        const nextModules = prev.modules.filter((m) => m !== module)
        return { ...prev, modules: nextModules }
      }
      return { ...prev, modules: [...prev.modules, module] }
    })
  }

  const handleSubmit = async () => {
    if (!form.requirements.trim()) {
      setError("Please describe your project requirements.")
      return
    }

    setSubmitting(true)
    setError(null)

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          source,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok || !data.success) {
        throw new Error(data.error || data.message || "Something went wrong while submitting the form.")
      }

      setStep("success")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to submit the form. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const fullName = form.fullName.trim() || "there"

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-lg">
        {step !== "success" && (
          <DialogHeader>
            <DialogTitle>Let&apos;s understand your project</DialogTitle>
            <DialogDescription>
              Answer a few quick questions so TrueSpur can tailor a proposal for you.
            </DialogDescription>
          </DialogHeader>
        )}

        {step === "welcome" && (
          <div className="space-y-4 mt-2">
            <p className="text-sm text-gray-700">
              We&apos;ll ask you a few focused questions to understand your goals, timelines, and the modules you need. This
              helps us prepare a relevant proposal for your enquiry.
            </p>
            <ul className="text-xs text-gray-600 list-disc list-inside space-y-1">
              <li>Approx. 2–3 minutes to complete</li>
              <li>Your details stay private and are used only to contact you</li>
            </ul>
          </div>
        )}

        {step === "fullName" && (
          <div className="space-y-3 mt-2">
            <p className="text-sm font-medium text-gray-800">What is your full Name?</p>
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => setForm((prev) => ({ ...prev, fullName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400"
              placeholder="John Doe"
            />
          </div>
        )}

        {step === "email" && (
          <div className="space-y-3 mt-2">
            <p className="text-sm font-medium text-gray-800">
              Great, {form.fullName.trim() || "there"}, what is your email address?
            </p>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400"
              placeholder="you@example.com"
            />
          </div>
        )}

        {step === "phone" && (
          <div className="space-y-3 mt-2">
            <p className="text-sm font-medium text-gray-800">
              Super, {fullName}, what is your contact number (preferably WhatsApp)?
            </p>
            <div className="flex gap-2">
              <select
                value={form.phoneCountryCode}
                onChange={(e) => setForm((prev) => ({ ...prev, phoneCountryCode: e.target.value }))}
                className="w-32 px-2 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 bg-white"
              >
                {COUNTRY_CODES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.code} ({c.label})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={form.phoneNumber}
                onChange={(e) => setForm((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400"
                placeholder="9876543210"
              />
            </div>
          </div>
        )}

        {step === "company" && (
          <div className="space-y-3 mt-2">
            <p className="text-sm font-medium text-gray-800">
              Which company are you representing, {fullName}?
            </p>
            <input
              type="text"
              value={form.company}
              onChange={(e) => setForm((prev) => ({ ...prev, company: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400"
              placeholder="Your company name"
            />
          </div>
        )}

        {step === "role" && (
          <div className="space-y-3 mt-2">
            <p className="text-sm font-medium text-gray-800">What is your role in the company, {fullName}?</p>
            <input
              type="text"
              value={form.role}
              onChange={(e) => setForm((prev) => ({ ...prev, role: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400"
              placeholder="Founder, Product Manager, CTO, etc."
            />
          </div>
        )}

        {step === "modules" && (
          <div className="space-y-3 mt-2">
            <p className="text-sm font-medium text-gray-800">
              What modules do you need for your project / startup? (Select all that apply)
            </p>
            <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
              {MODULE_OPTIONS.map((option) => {
                const checked = form.modules.includes(option)
                return (
                  <label key={option} className="flex items-center gap-2 text-sm text-gray-800">
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleModule(option)}
                      className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    <span>{option}</span>
                  </label>
                )
              })}
            </div>
            {form.modules.includes("Other") && (
              <div className="pt-2 space-y-1">
                <p className="text-xs text-gray-700">Please describe the other modules you have in mind.</p>
                <input
                  type="text"
                  value={form.modulesOther}
                  onChange={(e) => setForm((prev) => ({ ...prev, modulesOther: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400"
                  placeholder="Additional modules or ideas"
                />
              </div>
            )}
          </div>
        )}

        {step === "requirements" && (
          <div className="space-y-3 mt-2">
            <p className="text-sm font-medium text-gray-800">
              {fullName}, please describe your project requirements so TrueSpur can tailor a proposal for your enquiry.
            </p>
            <textarea
              value={form.requirements}
              onChange={(e) => setForm((prev) => ({ ...prev, requirements: e.target.value }))}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400"
              placeholder="Share your goals, target users, timelines, budget considerations, and any links or references."
            />
            <div className="text-xs text-gray-500 text-right">{form.requirements.length} characters</div>
          </div>
        )}

        {step === "success" && (
          <div className="space-y-4 mt-2">
            <DialogHeader>
              <DialogTitle>Thank you, {fullName}!</DialogTitle>
              <DialogDescription>
                We&apos;ve received your enquiry and a copy has been sent to your email. The TrueSpur team will review your
                details and get back to you shortly.
              </DialogDescription>
            </DialogHeader>
            <div className="pt-2 text-xs text-gray-600">
              If you don&apos;t see an email within a few minutes, please check your spam or promotions folder.
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={() => handleOpenChange(false)}
                className="w-full sm:w-auto"
              >
                Close
              </Button>
            </DialogFooter>
          </div>
        )}

        {step !== "success" && (
          <>
            {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
            <DialogFooter className="mt-4">
              <div className="flex w-full justify-between items-center gap-3">
                <div className="flex-1">
                  {step !== "welcome" && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="w-full text-xs sm:text-sm"
                      disabled={submitting}
                    >
                      Back
                    </Button>
                  )}
                </div>
                <div className="flex-1 flex justify-end">
                  {step === "requirements" ? (
                    <Button
                      type="button"
                      onClick={handleSubmit}
                      className="w-full text-xs sm:text-sm"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting..." : "Submit"}
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      onClick={handleNext}
                      className="w-full text-xs sm:text-sm"
                      disabled={submitting}
                    >
                      {step === "welcome" ? "Start" : "OK"}
                    </Button>
                  )}
                </div>
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
