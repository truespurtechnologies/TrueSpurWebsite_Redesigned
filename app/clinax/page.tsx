"use client"

import { useState } from "react"
import { ArrowDown, ArrowRight, Menu, Network, X } from "lucide-react"
import { LeadFormDialog } from "@/components/lead-form-dialog"
import { Button } from "@/components/ui/button"

const navItems = [
  { label: "How It Works", href: "#how-it-works" },
  { label: "Why Clinax", href: "#why-clinax" },
  { label: "Who It’s For", href: "#who-its-for" },
]

const connectedDomains = [
  "Patient & Care",
  "Appointments",
  "Clinical Workflows",
  "Teams",
  "Branch Operations",
  "Insights",
]

const fragmentedItems = ["WhatsApp", "Spreadsheets", "Calls", "Paper Records", "Multiple Tools", "Individual Knowledge"]

export default function ClinaxPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7fafb] text-[#102a43]">
      <header className="sticky top-0 z-40 border-b border-[#dce8ea] bg-[#f7fafb]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-2" aria-label="Clinax home">
            <span className="flex size-8 items-center justify-center rounded-lg bg-[#0b6473] text-white">
              <Network aria-hidden="true" className="size-4" />
            </span>
            <span className="font-mono text-sm font-bold tracking-[0.22em] text-[#102a43]">CLINAX</span>
          </a>
          <nav className="hidden items-center gap-8 lg:flex" aria-label="Clinax navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-sm font-medium text-[#486581] transition-colors hover:text-[#0b6473]">
                {item.label}
              </a>
            ))}
          </nav>
          <Button onClick={() => setIsDemoOpen(true)} className="hidden rounded-full bg-[#0b6473] px-5 text-white hover:bg-[#084c59] lg:inline-flex">
            Request a Demo
          </Button>
          <button type="button" className="rounded-md p-2 text-[#102a43] lg:hidden" onClick={() => setIsMenuOpen((open) => !open)} aria-expanded={isMenuOpen} aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
            {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="flex flex-col gap-1 border-t border-[#dce8ea] px-5 py-4 lg:hidden" aria-label="Mobile Clinax navigation">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setIsMenuOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-[#486581] hover:bg-[#e7f2f2] hover:text-[#0b6473]">
                {item.label}
              </a>
            ))}
            <Button onClick={() => { setIsMenuOpen(false); setIsDemoOpen(true) }} className="mt-2 rounded-full bg-[#0b6473] text-white hover:bg-[#084c59]">Request a Demo</Button>
          </nav>
        )}
      </header>

      <section id="top" className="mx-auto grid max-w-7xl gap-16 px-5 pb-24 pt-20 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:px-8 lg:pb-32 lg:pt-28">
        <div className="max-w-2xl">
          <p className="mb-6 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0b6473]">Clinax · Clinic Operating System</p>
          <h1 className="max-w-2xl text-pretty text-5xl font-semibold leading-[1.05] tracking-[-0.045em] text-[#102a43] sm:text-6xl lg:text-7xl">The connected operating system for physiotherapy and rehabilitation clinics.</h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-[#486581]">Bring patient care, teams and clinic operations together in one connected platform—so your clinic can operate with greater visibility, efficiency and control as it grows.</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button onClick={() => setIsDemoOpen(true)} className="rounded-full bg-[#0b6473] px-6 text-white hover:bg-[#084c59]">Request a Demo <ArrowRight data-icon="inline-end" /></Button>
            <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 rounded-full border border-[#a9c7c9] px-6 py-2 text-sm font-semibold text-[#0b6473] transition-colors hover:bg-[#e7f2f2]">See how it connects <ArrowDown className="size-4" /></a>
          </div>
        </div>

        <div className="relative min-h-[450px] rounded-[2rem] border border-[#c9dfe1] bg-[#eaf4f3] p-6 sm:p-10" aria-label="Connected clinic operating system visual">
          <div className="absolute inset-0 opacity-60 [background-image:linear-gradient(#c9dfe1_1px,transparent_1px),linear-gradient(90deg,#c9dfe1_1px,transparent_1px)] [background-size:42px_42px]" />
          <div className="relative flex min-h-[400px] items-center justify-center">
            <div className="absolute inset-x-5 top-6 flex justify-between text-[10px] font-mono uppercase tracking-[0.16em] text-[#6b8a8d]"><span>Clinic network</span><span>Live system map</span></div>
            <div className="absolute size-64 rounded-full border border-[#91c6c4] sm:size-80" />
            <div className="absolute size-44 rounded-full border border-[#72b3b2] sm:size-56" />
            <div className="relative flex size-28 flex-col items-center justify-center rounded-full border-8 border-[#b7dfdc] bg-[#0b6473] text-center text-white shadow-xl shadow-[#0b6473]/20 sm:size-36">
              <Network className="mb-2 size-6" /><span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em]">Clinax</span><span className="mt-1 text-xs text-[#c5ece9]">connected core</span>
            </div>
            {connectedDomains.map((domain, index) => {
              const positions = ["left-0 top-20", "right-0 top-20", "-left-2 bottom-20", "-right-2 bottom-20", "left-1/2 top-0 -translate-x-1/2", "bottom-0 left-1/2 -translate-x-1/2"]
              return <div key={domain} className={`absolute ${positions[index]} rounded-full border border-[#a9c7c9] bg-[#f7fafb] px-3 py-2 text-center text-[11px] font-semibold text-[#486581] shadow-sm sm:px-4`}>{domain}</div>
            })}
          </div>
        </div>
      </section>

      <section id="why-clinax" className="border-y border-[#dce8ea] bg-white px-5 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div><p className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0b6473]">The problem</p><h2 className="text-pretty text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#102a43] sm:text-5xl">Growth shouldn&apos;t make your clinic harder to run.</h2><p className="mt-6 max-w-lg text-lg leading-8 text-[#486581]">More patients. More therapists. More appointments. More services. More coordination. More locations.</p><p className="mt-4 max-w-lg leading-7 text-[#627d98]">As your clinic grows, so does the complexity of running it. Information and workflows can become scattered across people and disconnected tools.</p></div>
          <div className="relative rounded-[2rem] bg-[#102a43] p-6 sm:p-10"><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{fragmentedItems.map((item) => <div key={item} className="rounded-xl border border-[#486581] bg-[#1c3852] px-3 py-5 text-center text-sm text-[#d9e9eb]">{item}</div>)}</div><div className="my-6 flex items-center justify-center gap-3 text-[#76c7c4]"><span className="h-px flex-1 bg-[#486581]" /><ArrowRight className="size-5" /><span className="h-px flex-1 bg-[#486581]" /></div><p className="text-center text-sm leading-6 text-[#b9d5d5]">People become the manual integration layer between disconnected tools and information.</p><div className="mt-8 border-t border-[#486581] pt-6 text-center font-semibold text-white">Your clinic may use digital tools. But is your clinic digitally connected?</div></div>
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
        <div className="max-w-3xl"><p className="mb-5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#0b6473]">The shift</p><h2 className="text-pretty text-4xl font-semibold leading-tight tracking-[-0.04em] text-[#102a43] sm:text-5xl">Your clinic deserves more than a collection of tools.</h2></div>
        <div className="mt-14 grid gap-5 lg:grid-cols-[1fr_auto_1fr] lg:items-stretch"><div className="rounded-[1.5rem] border border-[#dce8ea] bg-white p-7 sm:p-9"><p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#829ab1]">The fragmented way</p><ul className="mt-8 flex flex-col gap-5 text-[#627d98]">{["Different tools manage different tasks.", "People are responsible for connecting the information.", "Updates are shared manually.", "Teams work without complete context."].map((text) => <li key={text} className="flex gap-3 leading-7"><span className="mt-3 size-1.5 shrink-0 rounded-full bg-[#a9c7c9]" />{text}</li>)}</ul></div><div className="flex items-center justify-center text-[#0b6473]"><ArrowRight className="hidden size-8 lg:block" /><ArrowDown className="size-7 lg:hidden" /></div><div id="who-its-for" className="rounded-[1.5rem] border border-[#8ec7c4] bg-[#e7f2f2] p-7 sm:p-9"><p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-[#0b6473]">The connected way</p><ul className="mt-8 flex flex-col gap-5 text-[#254e5b]">{["Information, workflows and teams work together.", "Teams operate with shared context.", "Operations become more connected.", "The organization has a stronger foundation to grow."].map((text) => <li key={text} className="flex gap-3 leading-7"><span className="mt-2 flex size-4 shrink-0 items-center justify-center rounded-full bg-[#0b6473] text-white"><span className="size-1.5 rounded-full bg-white" /></span>{text}</li>)}</ul></div></div>
        <p className="mt-16 text-center text-xl font-medium tracking-[-0.02em] text-[#0b6473] sm:text-2xl">From disconnected tools to connected clinic operations.</p>
      </section>

      <LeadFormDialog open={isDemoOpen} onOpenChange={setIsDemoOpen} source="products-hero" />
    </main>
  )
}
