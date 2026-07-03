"use client"

import { useState } from "react"
import { PrimaryButton } from "@/components/cta/PrimaryButton"

interface FormData {
  name: string
  email: string
  message: string
  companyName: string
  journeyStage: string
  timeline: string
  referralSource: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    companyName: "",
    journeyStage: "",
    timeline: "",
    referralSource: ""
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [submitMessage, setSubmitMessage] = useState("")

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please tell us what you're building"
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Please provide a bit more detail (at least 10 characters)"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.name.split(" ")[0] || formData.name,
          lastName: formData.name.split(" ").slice(1).join(" ") || "",
          email: formData.email,
          projectType: formData.journeyStage || "Not specified",
          message: `${formData.message}\n\nCompany/Project: ${formData.companyName || "Not provided"}\nJourney Stage: ${formData.journeyStage || "Not specified"}\nTimeline: ${formData.timeline || "Not specified"}\nReferral Source: ${formData.referralSource || "Not specified"}`,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setSubmitStatus("success")
        setSubmitMessage("Thanks. We've received your message. You'll hear from Aswar or a senior member of our team within 24 hours. We're looking forward to learning more about what you're building.")
        setFormData({
          name: "",
          email: "",
          message: "",
          companyName: "",
          journeyStage: "",
          timeline: "",
          referralSource: ""
        })
        setErrors({})
      } else {
        setSubmitStatus("error")
        setSubmitMessage(data.error || "Something went wrong. Please try again.")
      }
    } catch (error) {
      setSubmitStatus("error")
      setSubmitMessage("Failed to send message. Please try again or email us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name - Required */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border-2 ${
            errors.name ? "border-red-500" : "border-gray-300"
          } focus:border-orange-500 focus:outline-none focus:ring-0 transition-colors duration-200 text-base`}
          placeholder="Your name"
          aria-required="true"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email - Required */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 rounded-lg border-2 ${
            errors.email ? "border-red-500" : "border-gray-300"
          } focus:border-orange-500 focus:outline-none focus:ring-0 transition-colors duration-200 text-base`}
          placeholder="your@email.com"
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.email}
          </p>
        )}
      </div>

      {/* What are you building - Required */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
          What are you building?
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full px-4 py-3 rounded-lg border-2 ${
            errors.message ? "border-red-500" : "border-gray-300"
          } focus:border-orange-500 focus:outline-none focus:ring-0 transition-colors duration-200 text-base resize-y`}
          placeholder="Tell us about your product idea or the problem you're trying to solve..."
          aria-required="true"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {/* Company/Project Name - Optional */}
      <div>
        <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
          Company / Project Name <span className="text-gray-500">(Optional)</span>
        </label>
        <input
          type="text"
          id="companyName"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:outline-none focus:ring-0 transition-colors duration-200 text-base"
          placeholder="Your company or project name"
        />
      </div>

      {/* Journey Stage - Optional */}
      <div>
        <label htmlFor="journeyStage" className="block text-sm font-medium text-gray-700 mb-2">
          Where are you in your journey? <span className="text-gray-500">(Optional)</span>
        </label>
        <select
          id="journeyStage"
          name="journeyStage"
          value={formData.journeyStage}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:outline-none focus:ring-0 transition-colors duration-200 text-base bg-white"
        >
          <option value="">Select an option</option>
          <option value="Validating an idea">Validating an idea</option>
          <option value="Ready to build">Ready to build</option>
          <option value="Already building, need help">Already building, need help</option>
          <option value="Not sure yet">Not sure yet</option>
        </select>
      </div>

      {/* Timeline - Optional */}
      <div>
        <label htmlFor="timeline" className="block text-sm font-medium text-gray-700 mb-2">
          Timeline <span className="text-gray-500">(Optional)</span>
        </label>
        <select
          id="timeline"
          name="timeline"
          value={formData.timeline}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:outline-none focus:ring-0 transition-colors duration-200 text-base bg-white"
        >
          <option value="">Select an option</option>
          <option value="Exploring (3+ months)">Exploring (3+ months)</option>
          <option value="Planning (1-3 months)">Planning (1-3 months)</option>
          <option value="Ready now">Ready now</option>
          <option value="Flexible">Flexible</option>
        </select>
      </div>

      {/* Referral Source - Optional */}
      <div>
        <label htmlFor="referralSource" className="block text-sm font-medium text-gray-700 mb-2">
          How did you hear about us? <span className="text-gray-500">(Optional)</span>
        </label>
        <select
          id="referralSource"
          name="referralSource"
          value={formData.referralSource}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-orange-500 focus:outline-none focus:ring-0 transition-colors duration-200 text-base bg-white"
        >
          <option value="">Select an option</option>
          <option value="Referral">Referral</option>
          <option value="Search">Search</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <PrimaryButton
          type="submit"
          disabled={isSubmitting}
          loading={isSubmitting}
          size="lg"
          className="w-full sm:w-auto"
        >
          Start a Conversation
        </PrimaryButton>
      </div>

      {/* Success/Error Messages */}
      {submitStatus === "success" && (
        <div className="p-4 rounded-lg bg-green-50 border border-green-200" role="alert">
          <p className="text-green-800 font-medium">{submitMessage}</p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="p-4 rounded-lg bg-red-50 border border-red-200" role="alert">
          <p className="text-red-800 font-medium">{submitMessage}</p>
        </div>
      )}
    </form>
  )
}
