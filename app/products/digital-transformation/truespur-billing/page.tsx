"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, CheckCircle, ReceiptIndianRupee } from "lucide-react"

export default function TrueSpurBillingPage() {
  return (
    <div className="container mx-auto px-4 py-16 lg:py-24">
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">Digital Transformation</Badge>
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            TrueSpur Billing
            <span className="block font-heading text-2xl md:text-3xl font-semibold text-gray-700 mt-2">
              Billing and invoicing built for growth-ready businesses.
            </span>
          </h1>
          <p className="text-lg text-gray-600 mb-6 max-w-xl">
            TrueSpur Billing brings clarity, control, and speed to your receivables. From quote to cash, get a single,
            coherent view of how revenue flows through your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
              Request a demo
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
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Cash flow clarity</p>
              <p className="text-base text-gray-800">See what is billed, what is due, and what is at risk in real time.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Operational discipline</p>
              <p className="text-base text-gray-800">Standardise billing processes without losing needed flexibility.</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">Designed for teams</p>
              <p className="text-base text-gray-800">Give finance, sales, and operations a shared, reliable picture.</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center">
                <ReceiptIndianRupee className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="font-heading text-xl lg:text-2xl">Revenue, without the fog</CardTitle>
                <p className="text-xs text-gray-500">Turn billing into a strategic advantage, not a recurring fire drill.</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <span>Automated invoice generation that adapts to your pricing models.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <span>Collections workflows that keep teams aligned and accountable.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5" />
                  <span>Analytics for ageing, realisation, and revenue leakage.</span>
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
              <CardTitle className="font-heading text-lg lg:text-xl">Quote-to-cash visibility</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>Follow the lifecycle of every rupee—from quotation to final payment—without spreadsheets.</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="font-heading text-lg lg:text-xl">Flexible integrations</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>Connect with ERPs, CRMs, and banking partners to automate data flows.</p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="font-heading text-lg lg:text-xl">Governance-ready</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-2">
              <p>Audit-friendly logs and controls to meet compliance and reporting needs.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
