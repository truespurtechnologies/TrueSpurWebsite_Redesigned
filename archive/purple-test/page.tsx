"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Code, Smartphone, Brain, CheckCircle, Award } from "lucide-react"
import { motion } from "framer-motion"

export default function PurpleTestPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <div className="flex items-center">
            <div className="text-2xl font-bold text-purple-900">TrueSpur</div>
            <div className="ml-2 text-sm text-warm-600">We Craft. You Lead.</div>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-purple-900">Home</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-purple-900">Services</a>
            <a href="#" className="text-sm font-medium text-gray-600 hover:text-purple-900">About</a>
            <Button className="bg-gradient-to-r from-gold-600 to-gold-700 text-purple-950 hover:from-gold-500 hover:to-gold-600 shadow-lg rounded-full px-6 py-2">
              Get Started
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section - Dark Purple Background (like your current dark hero) */}
      <section className="relative overflow-hidden py-20 bg-purple-900">
        {/* Animated gradient blobs */}
        <div className="pointer-events-none absolute inset-0">
          <motion.div
            className="absolute -top-32 -left-32 h-80 w-80 rounded-full bg-gold-500/25 blur-3xl"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-40 right-[-4rem] h-96 w-96 rounded-full bg-purple-400/20 blur-3xl"
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-gold-500/10 text-gold-300 hover:bg-gold-500/20 border border-gold-400/40">
                Cutting-Edge Technology Solutions
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Transform Your Business with{" "}
                <span className="bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent">
                  Innovation
                </span>
              </h1>
              <p className="text-xl text-purple-100 mb-6 leading-relaxed">
                We specialize in website development, mobile apps, custom software, AI solutions, and product
                consulting. Empowering healthcare, education, and digital transformation with cutting-edge technology.
              </p>
              <p className="text-base text-purple-200 font-medium mb-8 italic">"We Craft. You Lead."</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-purple-950 shadow-lg"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gold-300 text-gold-300 hover:bg-gold-500/10 bg-white/10 backdrop-blur"
                >
                  View Our Work
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-3xl bg-white/95 shadow-2xl overflow-hidden">
                <div className="aspect-video bg-gradient-to-br from-purple-100 to-gold-50 flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                      <Code className="w-12 h-12 text-white" />
                    </div>
                    <p className="text-purple-900 font-semibold">Hero Image Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Light Background */}
      <section className="py-20 bg-gradient-to-b from-white via-purple-50/30 to-gold-50/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-100 text-gray-700">Our Services</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-purple-900 mb-3">
              Turn Your Vision Into a Scalable Product
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From MVP to full-scale platforms, we build reliable, high-performance web and mobile applications.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="h-full border-0 shadow-lg rounded-2xl bg-white p-8 group-hover:shadow-2xl transition-all">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-500 to-gold-600" />
                <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 p-3">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">Website Development</h3>
                <p className="text-gray-600">
                  Modern, responsive websites built with the latest technologies for optimal performance.
                </p>
              </div>
            </motion.div>

            {/* Service Card 2 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="h-full border-0 shadow-lg rounded-2xl bg-white p-8 group-hover:shadow-2xl transition-all">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-purple-600 to-purple-700" />
                <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-purple-700 p-3">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">Mobile App Development</h3>
                <p className="text-gray-600">
                  Native and cross-platform mobile applications that deliver seamless experiences.
                </p>
              </div>
            </motion.div>

            {/* Service Card 3 */}
            <motion.div
              whileHover={{ y: -8 }}
              className="relative group"
            >
              <div className="h-full border-0 shadow-lg rounded-2xl bg-white p-8 group-hover:shadow-2xl transition-all">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-500 to-purple-600" />
                <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-gold-500 to-purple-600 p-3">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-900 mb-3">AI Solutions</h3>
                <p className="text-gray-600">
                  Intelligent systems powered by cutting-edge artificial intelligence and machine learning.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Purple Background */}
      <section className="py-16 bg-purple-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">10+</div>
              <div className="text-sm text-purple-200 uppercase tracking-wider">Projects Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">10+</div>
              <div className="text-sm text-purple-200 uppercase tracking-wider">Customers Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">4+</div>
              <div className="text-sm text-purple-200 uppercase tracking-wider">Industries</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-gold-400 mb-2">100K+</div>
              <div className="text-sm text-purple-200 uppercase tracking-wider">Transactions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Purple */}
      <footer className="bg-purple-950 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-3">TrueSpur</h3>
              <p className="text-purple-200 text-sm">We Craft. You Lead.<br />Your trusted technology partner.</p>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-3 text-gold-400">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-purple-200 hover:text-gold-400">Services</a></li>
                <li><a href="#" className="text-purple-200 hover:text-gold-400">About</a></li>
                <li><a href="#" className="text-purple-200 hover:text-gold-400">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-bold uppercase tracking-wider mb-3 text-gold-400">Get Started</h4>
              <Button className="bg-gradient-to-r from-gold-600 to-gold-700 text-purple-950 hover:from-gold-500 hover:to-gold-600">
                Contact Us
              </Button>
            </div>
          </div>
          <div className="border-t border-purple-800 pt-6 text-center text-sm text-purple-300">
            © 2024 TrueSpur Technology Solutions. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
