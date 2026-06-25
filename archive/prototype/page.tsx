"use client"

import { motion } from "framer-motion"
import { ArrowRight, Code, Smartphone, Brain, Zap, CheckCircle, Users, Award } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function PrototypePage() {
  return (
    <div className="min-h-screen bg-warm-50">
      {/* Minimalist Navigation */}
      <header className="border-b border-warm-200 bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-6 lg:px-12 py-6 flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/logo/truespur-main-logo.png"
              alt="TrueSpur Technology Solutions"
              className="h-16 w-auto"
            />
          </div>
          
          {/* Clean navigation - minimal */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-warm-700 hover:text-purple-900 font-sans text-base font-medium transition-colors">
              Services
            </a>
            <a href="#work" className="text-warm-700 hover:text-purple-900 font-sans text-base font-medium transition-colors">
              Our Work
            </a>
            <a href="#about" className="text-warm-700 hover:text-purple-900 font-sans text-base font-medium transition-colors">
              About
            </a>
            <Button className="bg-gradient-to-r from-gold-600 to-gold-700 text-purple-950 hover:from-gold-500 hover:to-gold-600 shadow-lg shadow-gold-600/30 rounded-lg px-6 py-2.5 font-sans font-semibold hover:-translate-y-0.5 transition-all">
              Start Your Project
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section - Light background with purple accents */}
      <section className="relative overflow-hidden bg-warm-50 py-24 lg:py-32">
        {/* Subtle decorative elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-warm-50 via-cream-100 to-warm-100" />
        
        <div className="relative container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Trust Badges - Above Fold (Concept 3) - Enhanced visibility */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Badge className="bg-purple-100 text-purple-900 border-2 border-purple-600 px-5 py-2.5 rounded-full font-sans text-sm font-bold">
                  <CheckCircle className="w-5 h-5 mr-2 text-purple-700" strokeWidth={2.5} />
                  10+ Projects Delivered
                </Badge>
                <Badge className="bg-purple-100 text-purple-900 border-2 border-purple-600 px-5 py-2.5 rounded-full font-sans text-sm font-bold">
                  <Award className="w-5 h-5 mr-2 text-purple-700" strokeWidth={2.5} />
                  4+ Industries Served
                </Badge>
              </div>

              {/* Hero Headline - Premium Typography (Concept 2) */}
              <h1 className="font-heading text-5xl lg:text-6xl xl:text-7xl font-bold text-purple-950 mb-6 leading-tight">
                Transform Your Business<br />
                with <span className="bg-gradient-to-r from-gold-600 to-gold-700 bg-clip-text text-transparent">Premium Innovation</span>
              </h1>

              {/* Visual-First Subhead (Concept 1) */}
              <p className="font-sans text-xl text-warm-700 mb-8 leading-relaxed max-w-xl">
                We craft scalable digital solutions that turn your vision into reality—from MVP to market leader.
              </p>

              {/* CTAs - Premium Design (Concept 2) */}
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-gold-600 to-gold-700 text-purple-950 hover:from-gold-500 hover:to-gold-600 shadow-xl shadow-gold-600/40 rounded-xl px-8 py-4 font-sans text-lg font-bold transition-all hover:-translate-y-0.5"
                >
                  See Our Work
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-purple-600 text-purple-900 hover:bg-purple-50 hover:border-purple-700 bg-transparent rounded-xl px-8 py-4 font-sans text-lg font-bold transition-all"
                >
                  Start Your Project
                </Button>
              </div>

              {/* Tech Stack Showcase - Trust Architecture (Concept 3) */}
              <div className="border-t border-warm-200 pt-8">
                <p className="font-sans text-sm text-warm-600 uppercase tracking-wider mb-4 font-semibold">
                  Our Expertise
                </p>
                <div className="flex flex-wrap gap-6 items-center">
                  <div className="flex items-center gap-2 text-warm-700">
                    <Code className="w-5 h-5 text-purple-600" />
                    <span className="font-sans text-sm font-medium">React & Next.js</span>
                  </div>
                  <div className="flex items-center gap-2 text-warm-700">
                    <Smartphone className="w-5 h-5 text-purple-600" />
                    <span className="font-sans text-sm font-medium">Mobile Apps</span>
                  </div>
                  <div className="flex items-center gap-2 text-warm-700">
                    <Brain className="w-5 h-5 text-purple-600" />
                    <span className="font-sans text-sm font-medium">AI Solutions</span>
                  </div>
                  <div className="flex items-center gap-2 text-warm-700">
                    <Zap className="w-5 h-5 text-purple-600" />
                    <span className="font-sans text-sm font-medium">Cloud Native</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Professional Illustration Placeholder */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/10 border-2 border-purple-200">
                {/* Professional illustration placeholder */}
                <div className="aspect-[4/3] bg-gradient-to-br from-purple-50 via-warm-50 to-gold-50 flex items-center justify-center relative">
                  {/* Decorative geometric shapes */}
                  <div className="absolute top-10 right-10 w-24 h-24 rounded-2xl bg-purple-600/10 rotate-12" />
                  <div className="absolute bottom-10 left-10 w-32 h-32 rounded-full bg-gold-600/10" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-2xl bg-gradient-to-br from-purple-600/5 to-gold-600/5 rotate-45" />
                  
                  <div className="text-center p-8 relative z-10">
                    <div className="inline-flex items-center justify-center w-32 h-32 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 mb-6 shadow-lg shadow-purple-600/30">
                      <Code className="w-16 h-16 text-white" strokeWidth={1.5} />
                    </div>
                    <p className="font-sans text-purple-900 text-lg font-bold mb-2">
                      Professional Illustration
                    </p>
                    <p className="font-sans text-warm-600 text-sm max-w-xs mx-auto">
                      High-quality, minimalist illustration showing innovation & technology
                    </p>
                    <div className="mt-4 inline-flex items-center gap-2 text-xs text-warm-500">
                      <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                      <span>Purple + Gold color scheme</span>
                    </div>
                  </div>
                </div>
                
                {/* Tagline badge */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/95 backdrop-blur rounded-xl p-4 shadow-lg border border-purple-100">
                    <p className="font-sans text-purple-900 font-bold text-sm">
                      "We Craft. You Lead."
                    </p>
                    <p className="font-sans text-warm-700 text-xs mt-1">
                      Your trusted technology partner
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Visual-First Storytelling (Concept 1) */}
      <section className="py-24 lg:py-32 bg-warm-50">
        <div className="container mx-auto px-6 lg:px-12">
          {/* Section Header - Premium Typography */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <Badge className="mb-4 bg-warm-200 text-purple-900 px-4 py-2 rounded-full font-sans text-sm font-semibold">
              Our Services
            </Badge>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-purple-900 mb-4 leading-tight">
              Turn Vision Into Reality
            </h2>
            <p className="font-sans text-lg text-warm-700 leading-relaxed">
              From MVP to full-scale platforms, we build solutions that scale with your ambition.
            </p>
          </div>

          {/* Icon-Driven Service Cards (Concept 1: Visual-First) */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-12 shadow-lg shadow-warm-200/50 border border-warm-200 hover:shadow-xl hover:shadow-gold-600/20 hover:border-gold-600/30 transition-all cursor-pointer group"
            >
              <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-600 to-gold-700 text-white shadow-lg shadow-gold-600/30 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-gold-600/40 transition-all">
                <Code className="w-10 h-10" strokeWidth={2} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-purple-900 mb-3">
                Website Development
              </h3>
              <p className="font-sans text-warm-700 leading-relaxed">
                Modern platforms that convert visitors into customers.
              </p>
            </motion.div>

            {/* Service Card 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-12 shadow-lg shadow-warm-200/50 border border-warm-200 hover:shadow-xl hover:shadow-purple-600/20 hover:border-purple-600/30 transition-all cursor-pointer group"
            >
              <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-600/30 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-purple-600/40 transition-all">
                <Smartphone className="w-10 h-10" strokeWidth={2} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-purple-900 mb-3">
                Mobile Apps
              </h3>
              <p className="font-sans text-warm-700 leading-relaxed">
                Native experiences that users love across all devices.
              </p>
            </motion.div>

            {/* Service Card 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-2xl p-12 shadow-lg shadow-warm-200/50 border border-warm-200 hover:shadow-xl hover:shadow-gold-600/20 hover:border-gold-600/30 transition-all cursor-pointer group"
            >
              <div className="mb-8 inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-gold-600 to-gold-700 text-white shadow-lg shadow-gold-600/30 group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-gold-600/40 transition-all">
                <Brain className="w-10 h-10" strokeWidth={2} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-purple-900 mb-3">
                AI Solutions
              </h3>
              <p className="font-sans text-warm-700 leading-relaxed">
                Intelligent systems that transform how you work.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer - Purple accent */}
      <footer className="bg-purple-900 text-white py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <h3 className="font-heading text-2xl font-bold mb-4">TrueSpur</h3>
              <p className="font-sans text-purple-200 text-sm leading-relaxed">
                We Craft. You Lead.<br />
                Your trusted technology partner.
              </p>
            </div>
            <div>
              <h4 className="font-sans text-sm font-bold uppercase tracking-wider mb-4 text-gold-400">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="font-sans text-sm text-purple-200 hover:text-gold-400 transition-colors">Services</a></li>
                <li><a href="#work" className="font-sans text-sm text-purple-200 hover:text-gold-400 transition-colors">Our Work</a></li>
                <li><a href="#about" className="font-sans text-sm text-purple-200 hover:text-gold-400 transition-colors">About</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-sans text-sm font-bold uppercase tracking-wider mb-4 text-gold-400">Contact</h4>
              <p className="font-sans text-sm text-purple-200">Ready to start your project?</p>
              <Button className="mt-4 bg-gradient-to-r from-gold-600 to-gold-700 text-purple-950 hover:from-gold-500 hover:to-gold-600 shadow-lg shadow-gold-600/30 rounded-lg px-6 py-2.5 font-sans font-semibold">
                Get Started
              </Button>
            </div>
          </div>
          <div className="border-t border-purple-700 pt-8 text-center">
            <p className="font-sans text-sm text-purple-300">
              © 2024 TrueSpur Technology Solutions. All rights reserved.
            </p>
            <p className="font-sans text-xs text-purple-400 mt-2">
              🎨 PROTOTYPE VIEW - Light Background Design with Purple + Gold Accents
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
