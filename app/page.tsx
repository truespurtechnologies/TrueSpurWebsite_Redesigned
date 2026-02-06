"use client"

import type React from "react"

import Image from "next/image"
import { motion } from "framer-motion"
import useEmblaCarousel from "embla-carousel-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { useState, useEffect } from "react"
import {
  ArrowRight,
  Code,
  Smartphone,
  Brain,
  Users,
  Heart,
  GraduationCap,
  Zap,
  CheckCircle,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Loader2,
} from "lucide-react"

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home")
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProductMobileOpen, setIsProductMobileOpen] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    projectType: "Website Development",
    message: "",
  })
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [formMessage, setFormMessage] = useState("")

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" })
  const [spotlightIndex, setSpotlightIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "services", "expertise", "about", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element =
          section === "home"
            ? (document.querySelector("header")?.nextElementSibling as HTMLElement)
            : document.getElementById(section)

        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setSpotlightIndex(emblaApi.selectedScrollSnap())
    }

    emblaApi.on("select", onSelect)
    onSelect()

    const autoplay = setInterval(() => {
      if (!emblaApi) return
      emblaApi.scrollNext()
    }, 7000)

    return () => {
      emblaApi.off("select", onSelect)
      clearInterval(autoplay)
    }
  }, [emblaApi])

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false)

    if (sectionId === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" })
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      const headerHeight = 80
      const elementPosition = element.offsetTop - headerHeight
      window.scrollTo({ top: elementPosition, behavior: "smooth" })
    }
  }

  const navItems = [
    { id: "home", label: "Home" },
    { id: "services", label: "Services" },
    { id: "expertise", label: "Expertise" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ]

  const productSuite = [
    {
      category: "Healthcare",
      items: [
        {
          label: "Clinexa",
          href: "/products/healthcare/clinexa",
          description: "Connected care platform for modern healthcare delivery.",
        },
        {
          label: "HaloMe",
          href: "/products/healthcare/halome",
          description: "Patient engagement and outreach for hospitals and clinics.",
        },
      ],
    },
    {
      category: "Digital Transformation",
      items: [
        {
          label: "TrueSpur Billing",
          href: "/products/digital-transformation/truespur-billing",
          description: "Billing and invoicing built for growth-ready businesses.",
        },
      ],
    },
    {
      category: "Artificial Intelligence",
      items: [
        {
          label: "TafsirAI",
          href: "/products/artificial-intelligence/tafsir-ai",
          description: "AI-powered insights and understanding of Islamic Quran through advanced natural language processing.",
        },
      ],
    },
  ]

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus("loading")
    setFormMessage("")

    // Validation
    if (!formData.firstName.trim()) {
      setFormStatus("error")
      setFormMessage("First name is required")
      return
    }
    if (!formData.lastName.trim()) {
      setFormStatus("error")
      setFormMessage("Last name is required")
      return
    }
    if (!formData.email.trim()) {
      setFormStatus("error")
      setFormMessage("Email is required")
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setFormStatus("error")
      setFormMessage("Please enter a valid email address")
      return
    }
    if (!formData.message.trim()) {
      setFormStatus("error")
      setFormMessage("Message is required")
      return
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message")
      }

      setFormStatus("success")
      setFormMessage("Message sent successfully! We'll get back to you soon.")
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        projectType: "Website Development",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormStatus("idle")
        setFormMessage("")
      }, 5000)
    } catch (error) {
      setFormStatus("error")
      setFormMessage(error instanceof Error ? error.message : "Failed to send message. Please try again.")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 md:py-6 flex items-center justify-between">
          <div className="flex items-center">
            <button
              onClick={() => scrollToSection("home")}
              className="focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
            >
              <img
                src="/logo/truespur-main-logo.png"
                alt="TrueSpur Technology Solutions - We Craft. You Lead."
                className="h-16 w-auto md:h-18 lg:h-20 hover:opacity-80 transition-opacity cursor-pointer"
              />
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavigationMenu viewport={true}>
              <NavigationMenuList>
                {/* Home first */}
                {navItems
                  .filter((item) => item.id === "home")
                  .map((item) => (
                    <NavigationMenuItem key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`text-sm font-medium transition-colors duration-200 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-3 py-1.5 ${
                          activeSection === item.id
                            ? "text-orange-600 border-b-2 border-orange-600"
                            : "text-gray-600"
                        }`}
                      >
                        {item.label}
                      </button>
                    </NavigationMenuItem>
                  ))}

                {/* Product Suite immediately after Home */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm font-medium text-gray-700 hover:text-orange-600">
                    Product Suite
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="md:min-w-[700px]">
                    <div className="grid gap-6 p-4 md:grid-cols-3 bg-white rounded-xl border shadow-xl">
                      {productSuite.map((group) => (
                        <div key={group.category} className="space-y-3">
                          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                            {group.category}
                          </p>
                          <div className="space-y-2">
                            {group.items.map((product) => (
                              <NavigationMenuLink
                                key={product.label}
                                href={product.href}
                                className="block rounded-lg border border-transparent px-3 py-2 text-left hover:border-orange-200 hover:bg-orange-50/80 transition-all duration-200"
                              >
                                <div className="text-sm font-semibold text-gray-900">
                                  {product.label}
                                </div>
                                {product.description && (
                                  <p className="mt-1 text-xs text-gray-600 leading-snug">
                                    {product.description}
                                  </p>
                                )}
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Remaining sections */}
                {navItems
                  .filter((item) => item.id !== "home")
                  .map((item) => (
                    <NavigationMenuItem key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={`text-sm font-medium transition-colors duration-200 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-md px-3 py-1.5 ${
                          activeSection === item.id
                            ? "text-orange-600 border-b-2 border-orange-600"
                            : "text-gray-600"
                        }`}
                      >
                        {item.label}
                      </button>
                    </NavigationMenuItem>
                  ))}

                <NavigationMenuIndicator />
              </NavigationMenuList>
              <NavigationMenuViewport />
            </NavigationMenu>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-md p-2"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Desktop CTA Button */}
          <Button
            onClick={() => scrollToSection("contact")}
            className="hidden md:block bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t bg-white/95 backdrop-blur">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {/* Home first */}
              {navItems
                .filter((item) => item.id === "home")
                .map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      activeSection === item.id ? "text-orange-600 bg-orange-50" : "text-gray-600"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}

              {/* Mobile Product Suite */}
              <div className="mt-2 border-t border-gray-100 pt-3">
                <button
                  onClick={() => setIsProductMobileOpen((open) => !open)}
                  className="flex w-full items-center justify-between px-4 py-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <span>Product Suite</span>
                  <span className={`transition-transform ${isProductMobileOpen ? "rotate-180" : "rotate-0"}`}>
                    ▾
                  </span>
                </button>

                {isProductMobileOpen && (
                  <div className="mt-2 space-y-3 px-2">
                    {productSuite.map((group) => (
                      <div key={group.category} className="space-y-1">
                        <p className="px-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                          {group.category}
                        </p>
                        <div className="space-y-1">
                          {group.items.map((product) => (
                            <a
                              key={product.label}
                              href={product.href}
                              onClick={() => setIsMenuOpen(false)}
                              className="block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                            >
                              {product.label}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Remaining sections */}
              {navItems
                .filter((item) => item.id !== "home")
                .map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 hover:bg-orange-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                      activeSection === item.id ? "text-orange-600 bg-orange-50" : "text-gray-600"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              <div className="pt-4">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                >
                  Get Started
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">
                Cutting-Edge Technology Solutions
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Transform Your Business with{" "}
                <span className="bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent">
                  Innovation
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                We specialize in website development, mobile apps, custom software, AI solutions, and product
                consulting. Empowering healthcare, education, and digital transformation with cutting-edge technology.
              </p>
              <p className="text-lg text-orange-600 font-medium mb-8 italic">"We Craft. You Lead."</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => scrollToSection("contact")}
                  className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => scrollToSection("services")}
                  className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  View Our Work
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/hero-landing.jpg"
                alt="Team collaborating on modern technology solutions at TrueSpur"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-100 text-gray-700 hover:bg-gray-100">Our Services</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Comprehensive Technology Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From concept to deployment, we deliver end-to-end solutions that drive growth and innovation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:border-orange-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Code className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Website Development</CardTitle>
                <CardDescription>
                  Modern, responsive websites built with the latest technologies for optimal performance and user
                  experience.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:border-orange-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Smartphone className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Mobile App Development</CardTitle>
                <CardDescription>
                  Native and cross-platform mobile applications that deliver seamless experiences across all devices.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:border-orange-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Custom Software Development</CardTitle>
                <CardDescription>
                  Tailored software solutions designed to meet your specific business requirements and workflows.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:border-orange-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">Product Research</CardTitle>
                <CardDescription>
                  Strategic guidance and technical expertise to help you make informed decisions about your technology
                  investments.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:border-orange-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Brain className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl">AI Solutions</CardTitle>
                <CardDescription>
                  Cutting-edge artificial intelligence and machine learning solutions to automate and optimize your
                  business processes.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardHeader>
                <CardTitle className="text-xl text-center">Ready to Get Started?</CardTitle>
                <CardDescription className="text-center">
                  {"Let's discuss your project and find the perfect solution for your needs."}
                </CardDescription>
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="w-full mt-4 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                >
                  Contact Us Today
                </Button>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">Industry Expertise</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Deep Domain Knowledge</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We bring specialized expertise in key industries, understanding unique challenges and requirements
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Healthcare</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  HIPAA-compliant solutions, patient management systems, telemedicine platforms, and healthcare
                  analytics.
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                    Electronic Health Records (EHR)
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                    Telemedicine Platforms
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                    Medical Device Integration
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                    Healthcare Analytics
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Education</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Learning management systems, educational apps, virtual classrooms, and student information systems.
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                    Learning Management Systems
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                    Virtual Classrooms
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                    Student Information Systems
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                    Educational Mobile Apps
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">Digital Transformation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Cloud migration, process automation, digital workflows, and modernization of legacy systems.
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                    Cloud Migration & Architecture
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                    Process Automation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                    Legacy System Modernization
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                    Digital Workflow Solutions
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Products / Featured Solutions Section (placeholder content, update with real products later) */}
      <section id="products" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gray-100 text-gray-700 hover:bg-gray-100">Products &amp; Solutions</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">World-Class Products, Proven Results</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
               Discover our leading suite of products, proudly adopted by more than 100+ teams and orgnzations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-100">Healthcare</Badge>
                <CardTitle className="text-xl">Clinexa</CardTitle>
                <CardDescription>
                  Clinexa unifies patient journeys, clinicians, and operations into a single, intelligent platform. Designed for hospitals, clinics, and digital health initiatives that need reliability, speed, and clinical-grade workflows.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="border-orange-200 text-orange-700">
                    Virtual Clinic
                  </Badge>
                  <Badge variant="outline" className="border-orange-200 text-orange-700">
                    Telemedicine
                  </Badge>
                  <Badge variant="outline" className="border-orange-200 text-orange-700">
                    SaaS
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
                  asChild
                >
                  <a href="/products/healthcare/clinexa">View product</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-100">Healthcare</Badge>
                <CardTitle className="text-xl">HaloMe</CardTitle>
                <CardDescription>
                  HaloMe helps health systems reach, educate, and support patients beyond the hospital walls. It does thisthrough thoughtful, timely, and contextual communication.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="border-orange-200 text-orange-700">
                    Patient App
                  </Badge>
                  <Badge variant="outline" className="border-orange-200 text-orange-700">
                    SaaS
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
                  asChild
                >
                  <a href="/products/healthcare/halome">View product</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-100">Digital Transformation</Badge>
                <CardTitle className="text-xl">TrueBill</CardTitle>
                <CardDescription>
                  TrueBill brings clarity, control, and speed to your receivables. From quote to cash, get a single, coherent view of how revenue flows through your business.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="border-orange-200 text-orange-700">
                    iOS & Android
                  </Badge>
                  <Badge variant="outline" className="border-orange-200 text-orange-700">
                    Cloud
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
                  asChild
                >
                  <a href="/products/digital-transformation/truespur-billing">View product</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader>
                <Badge className="mb-3 bg-orange-100 text-orange-700 hover:bg-orange-100">AI Solutions</Badge>
                <CardTitle className="text-xl">Tafsir Divine Guidance</CardTitle>
                <CardDescription>
                  TafsirAI helps learners, scholars, and institutions explore Quranic text with augmentative AI—respectfully and responsibly. It is designed to support understanding, not replace scholarship.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="outline" className="border-orange-200 text-orange-700">
                    Web & Mobile
                  </Badge>
                  <Badge variant="outline" className="border-orange-200 text-orange-700">
                    Quranic Insights
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  className="w-full border-orange-300 text-orange-600 hover:bg-orange-50"
                  asChild
                >
                  <a href="/products/artificial-intelligence/tafsir-ai">View product</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats / Metrics Section (placeholder metrics, replace with real numbers later) */}
      <section id="stats" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">Value Realized</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Empowering Innovation Worldwide</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The early outcomes speak for themselves—demonstrating how we empower customers to achieve measurable progress in healthcare, education, and digital transformation.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <Card className="border-0 shadow-lg text-center">
              <CardContent className="py-8">
                <p className="text-4xl font-bold text-gray-900 mb-2">10+</p>
                <p className="text-gray-600">Projects Delivered</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="py-8">
                <p className="text-4xl font-bold text-gray-900 mb-2">10+</p>
                <p className="text-gray-600">Customers Served</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="py-8">
                <p className="text-4xl font-bold text-gray-900 mb-2">4+</p>
                <p className="text-gray-600">Industries Touched</p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg text-center">
              <CardContent className="py-8">
                <p className="text-4xl font-bold text-gray-900 mb-2">100K+</p>
                <p className="text-gray-600">Annual Transactions</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards & Recognitions Section */}
      <motion.section
        id="awards"
        className="relative overflow-hidden py-20 bg-gradient-to-b from-[#FFF7ED] via-white to-[#E5F0FF]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-200/40 blur-3xl" />
          <div className="absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-200/40 blur-3xl" />
        </div>

        <div className="relative container mx-auto px-4">
          <div className="text-center mb-14 max-w-4xl mx-auto">
            <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">Recognized for Innovation</Badge>
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-4 leading-snug">
              Developed a winning design that secured World Bank–backed projects for the Tamil Nadu State Government
            </h2>
            <p className="text-base lg:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Designing impactful solutions for the Welfare of Differently Abled Persons in partnership with the Tamil Nadu State Government.
            </p>
          </div>

          <div className="grid gap-10 xl:gap-16 lg:grid-cols-2 items-stretch">
            {/* Left column: text cards */}
            <motion.div
              className="space-y-10"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-500 opacity-80 group-hover:opacity-100 blur-[1px] transition-opacity duration-300" />
                <div className="relative rounded-2xl bg-white/95 shadow-lg border border-white/60 backdrop-blur-sm px-1 py-1 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-out">
                  <CardHeader className="pt-5 pb-5 px-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md shadow-orange-200">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-semibold tracking-tight text-gray-900">
                        <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                          Government of Tamil Nadu Award
                        </span>
                      </CardTitle>
                    </div>
                    <CardDescription className="mt-1 text-sm md:text-base text-gray-700 leading-relaxed">
                      Award-winning mobile outreach and therapy unit design for differently-abled persons, supported by the
                      World Bank and the Government of Tamil Nadu.
                    </CardDescription>
                  </CardHeader>
                </div>
              </motion.div>

              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-orange-500 via-pink-500 to-rose-500 opacity-80 group-hover:opacity-100 blur-[1px] transition-opacity duration-300" />
                <div className="relative rounded-2xl bg-white/95 shadow-lg border border-white/60 backdrop-blur-sm px-1 py-1 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-out">
                  <CardHeader className="pt-5 pb-5 px-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-md shadow-orange-200">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-semibold tracking-tight text-gray-900">
                        <span className="bg-gradient-to-r from-orange-600 to-pink-500 bg-clip-text text-transparent">
                          Innovation Recognition
                        </span>
                      </CardTitle>
                    </div>
                    <CardDescription className="mt-1 text-sm md:text-base text-gray-700 leading-relaxed">
                      Groundbreaking mobile outreach solution that brings therapy, eye care, hearing care, and physiotherapy services closer to underserved communities.
                    </CardDescription>
                  </CardHeader>
                </div>
              </motion.div>

              <motion.div
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.4 }}
              >
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500 opacity-80 group-hover:opacity-100 blur-[1px] transition-opacity duration-300" />
                <div className="relative rounded-2xl bg-white/95 shadow-lg border border-white/60 backdrop-blur-sm px-1 py-1 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 ease-out">
                  <CardHeader className="pt-5 pb-5 px-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-11 h-11 bg-gradient-to-r from-yellow-600 to-orange-600 rounded-xl flex items-center justify-center shadow-md shadow-orange-200">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <CardTitle className="text-2xl font-semibold tracking-tight text-gray-900">
                        <span className="bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                          Community Impact
                        </span>
                      </CardTitle>
                    </div>
                    <CardDescription className="mt-1 text-sm md:text-base text-gray-700 leading-relaxed">
                      Delivering sustained community health and welfare impact through accessible, mobile outreach and therapy units.
                    </CardDescription>
                  </CardHeader>
                </div>
              </motion.div>
            </motion.div>

            {/* Right column: recognition spotlight with images */}
            <motion.div
              className="relative group h-full"
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="absolute -inset-[1px] rounded-3xl bg-gradient-to-br from-yellow-400 via-orange-500 to-amber-500 opacity-80 group-hover:opacity-100 blur-[1.5px] transition-opacity duration-300" />
              <Card className="relative h-full border border-white/60 shadow-2xl rounded-3xl overflow-hidden bg-white/95 backdrop-blur-sm">
                <CardHeader className="pb-2 pt-6 px-6">
                  <div className="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 mb-3 border border-orange-100">
                    <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />
                    <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-600">
                      Recognition Spotlight
                    </span>
                  </div>
                  <CardTitle className="text-2xl font-semibold tracking-tight text-gray-900 mb-1">
                    <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                      Award-winning public sector innovation
                    </span>
                  </CardTitle>
                  <CardDescription className="text-sm md:text-base text-gray-700 max-w-md leading-relaxed">
                    Real-world validation of our design excellence and impact in public sector healthcare.
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-3 pb-3 px-6 flex flex-col gap-3">
                  <div ref={emblaRef} className="relative rounded-2xl overflow-hidden bg-gray-100 shadow-md">
                    <div className="flex">
                      <div className="relative min-w-full h-72 w-full lg:h-80">
                        <Image
                          src="/images/recognition/certificate-placeholder.jpeg"
                          alt="Certificate of recognition for first place in the Mobile Outreach and Therapy Unit design hackathon"
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          priority
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        />
                      </div>

                      <div className="relative min-w-full h-72 w-full lg:h-80">
                        <Image
                          src="/images/recognition/ceremony-placeholder.jpg"
                          alt="Award ceremony photo presenting the certificate of recognition"
                          fill
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                        />
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {[0, 1].map((index) => (
                        <button
                          key={index}
                          type="button"
                          className={`h-2.5 w-2.5 rounded-full border border-orange-500 transition-all duration-300 ${
                            spotlightIndex === index ? "bg-orange-500 scale-110" : "bg-white/70 hover:bg-orange-100"
                          }`}
                          onClick={() => emblaApi && emblaApi.scrollTo(index)}
                          aria-label={index === 0 ? "View certificate" : "View award ceremony photo"}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1 text-xs md:text-sm text-gray-700">
                    <p className="font-semibold text-gray-900">
                      <span className="bg-gradient-to-r from-orange-600 to-amber-500 bg-clip-text text-transparent">
                        First place – Design of Mobile Outreach and Therapy Unit
                      </span>
                    </p>
                    <p className="text-gray-800">
                      Directorate for Welfare of the Differently Abled &amp; StartupTN, World Bank–backed initiative (2023).
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-gray-100 text-gray-700 hover:bg-gray-100">About TrueSpur</Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">Innovation Meets Excellence</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At TrueSpur Technology Solutions, we believe in the power of technology to transform businesses and
                improve lives. Our team of experienced developers, designers, and consultants work closely with clients
                to deliver solutions that not only meet current needs but also scale for future growth.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                With deep expertise in healthcare, education, and digital transformation, we understand the unique
                challenges these industries face and provide tailored solutions using cutting-edge technologies.
              </p>
            </div>
            <div className="relative">
              <img
                src="/images/about-team.jpg"
                alt="TrueSpur team collaborating on innovative technology solutions"
                className="rounded-2xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium">
                Award Winning Team
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Showcase Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-900 text-orange-300 hover:bg-orange-900">
              Trusted By Industry Leaders
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Our Valued Customers</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're proud to partner with innovative companies across healthcare, education, and enterprise sectors
            </p>
          </div>

          {/* Customer Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center mb-12">
            <div className="bg-white rounded-lg p-6 w-full h-24 flex items-center justify-center hover:bg-orange-50 transition-colors group">
              <img
                src="/customers/medispur-logo.jpg"
                alt="MediSpur"
                className="max-h-12 md:max-h-14 lg:max-h-16 max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="bg-white rounded-lg p-6 w-full h-24 flex items-center justify-center hover:bg-orange-50 transition-colors group">
              <img
                src="/customers/jy-shipping-logo.jpg"
                alt="Joy Shipping Services Private Limited"
                className="max-h-12 md:max-h-14 lg:max-h-16 max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="bg-white rounded-lg p-6 w-full h-24 flex items-center justify-center hover:bg-orange-50 transition-colors group">
              <img
                src="/customers/steel-world-logo.png"
                alt="Steel World"
                className="max-h-12 md:max-h-14 lg:max-h-16 max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="bg-white rounded-lg p-6 w-full h-24 flex items-center justify-center hover:bg-orange-50 transition-colors group">
              <img
                src="/customers/popular-steels-logo.png"
                alt="Popular Steels"
                className="max-h-12 md:max-h-14 lg:max-h-16 max-w-full object-contain opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>

          {/* Customer Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-gray-900 border-gray-800 text-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-orange-500 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "TrueSpur delivered an exceptional billing platform that streamlined our sales process. Their
                  expertise in critical thinking was invaluable."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold">Munirul Gutha</p>
                    <p className="text-gray-400 text-sm">Founder, Popular Steels</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 text-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-orange-500 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "Truespur’s award-winning Mobile Outreach Vehicle is transforming disability services in rural Tamil
                  Nadu. Built in collaboration with the Government Disability Welfare Department, it brings essential
                  care and smart diagnostics directly to remote communities. Mohideen’s vision turned innovation into
                  impact—now, this vehicle is changing lives where it’s needed most."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">SO</span>
                  </div>
                  <div>
                    <p className="font-semibold">Senior Official</p>
                    <p className="text-gray-400 text-sm">TN Government Disability Welfare Department</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 text-white">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-4 h-4 text-orange-500 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">
                  "Their AI-powered automation solution reduced our processing time by 60%. The ROI was evident within
                  the first quarter of implementation."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-semibold text-sm">MS</span>
                  </div>
                  <div>
                    <p className="font-semibold">Wasim Feroz</p>
                    <p className="text-gray-400 text-sm">Managing Director, Joy Shipping</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-gray-300 mb-6">
              Join these industry leaders in transforming their business with technology
            </p>
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
            >
              Become Our Next Success Story
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-orange-100 text-orange-700 hover:bg-orange-100">Get In Touch</Badge>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {"Let's Build Something Amazing Together"}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to transform your business with cutting-edge technology? Contact us today for a free consultation.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email</h4>
                    <p className="text-gray-600">info@truespur.ai</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Phone</h4>
                    <p className="text-gray-600">+91-9884664913</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-600 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Office</h4>
                    <p className="text-gray-600">N.G.O Colony, 1st Main Road</p>
                    <p className="text-gray-600">Adambakkam, Chennai</p>
                    <p className="text-gray-600">TamilNadu, 600088</p>
                  </div>
                </div>
              </div>
            </div>

            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">Send us a message</CardTitle>
                <CardDescription>{"We'll get back to you within 24 hours"}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {formStatus === "success" && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-800 text-sm font-medium">{formMessage}</p>
                  </div>
                )}
                {formStatus === "error" && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-800 text-sm font-medium">{formMessage}</p>
                  </div>
                )}

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">First Name</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        disabled={formStatus === "loading"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Last Name</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        disabled={formStatus === "loading"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={formStatus === "loading"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Project Type</label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleInputChange}
                      disabled={formStatus === "loading"}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                    >
                      <option>Website Development</option>
                      <option>Mobile App Development</option>
                      <option>Custom Software Development</option>
                      <option>Product Consulting</option>
                      <option>AI Solutions</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      disabled={formStatus === "loading"}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-50 disabled:cursor-not-allowed"
                      placeholder="Tell us about your project..."
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={formStatus === "loading"}
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "loading" ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <button
                  onClick={() => scrollToSection("home")}
                  className="focus:outline-none focus:ring-2 focus:ring-orange-500 rounded-lg"
                >
                  <img
                    src="/logo/truespur-footer-logo.png"
                    alt="TrueSpur Technology Solutions - We Craft. You Lead."
                    className="h-12 w-auto brightness-0 invert hover:opacity-80 transition-opacity cursor-pointer"
                  />
                </button>
              </div>
              <p className="text-gray-400 mb-4">Transforming businesses with cutting-edge technology solutions.</p>
              <p className="text-orange-400 text-sm italic">"We Craft. You Lead."</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-orange-400">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Website Development
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Mobile App Development
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Custom Software
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    AI Solutions
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("services")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Product Consulting
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-orange-400">Industries</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => scrollToSection("expertise")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Healthcare
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("expertise")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Education
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("expertise")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Digital Transformation
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("expertise")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Enterprise Solutions
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-orange-400">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Our Team
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TrueSpur Technology Solutions. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
