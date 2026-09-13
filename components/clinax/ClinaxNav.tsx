"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function ClinaxNav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", handler, { passive: true })
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const links = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Why Clinax", href: "#why-clinax" },
    { label: "Who It's For", href: "#who-its-for" },
  ]

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm border-b border-[#D6E0EA] shadow-sm" : "bg-transparent"
      }`}
      style={{ fontFamily: "var(--font-clinax-sans)" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <Link href="/clinax" className="flex items-center gap-2.5 group" aria-label="Clinax home">
          <span className="w-7 h-7 rounded-md bg-[#0D9DAA] flex items-center justify-center">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <circle cx="7" cy="7" r="2.5" fill="white" />
              <path d="M7 1.5V4M7 10V12.5M1.5 7H4M10 7H12.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </span>
          <span className="text-[#0B1F3A] font-semibold tracking-[0.06em] text-[15px] uppercase">Clinax</span>
          <span className="hidden sm:inline text-[#5A7189] text-xs font-normal ml-0.5 tracking-wide border-l border-[#D6E0EA] pl-2.5">
            by TrueSpur
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-[#5A7189] hover:text-[#0B1F3A] text-sm font-medium transition-colors duration-150 cursor-pointer"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <button
            onClick={() => scrollTo("#contact")}
            className="bg-[#0B1F3A] text-white text-sm font-medium px-5 py-2.5 rounded-md hover:bg-[#0D2B4E] transition-colors duration-150 cursor-pointer"
          >
            Request a Demo
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-5 h-0.5 bg-[#0B1F3A] transition-all duration-200 origin-center ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span className={`block w-5 h-0.5 bg-[#0B1F3A] transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
          <span
            className={`block w-5 h-0.5 bg-[#0B1F3A] transition-all duration-200 origin-center ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white border-t border-[#D6E0EA] transition-all duration-300 overflow-hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col px-6 py-4 gap-1">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-[#0B1F3A] text-base font-medium py-3 text-left border-b border-[#EEF2F7] last:border-0 cursor-pointer"
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo("#contact")}
            className="mt-3 bg-[#0B1F3A] text-white text-sm font-medium px-5 py-3 rounded-md cursor-pointer w-full"
          >
            Request a Demo
          </button>
        </nav>
      </div>
    </header>
  )
}
