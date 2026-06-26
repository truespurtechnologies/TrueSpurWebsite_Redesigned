interface FooterProps {
  scrollToSection?: (sectionId: string) => void
}

export function Footer({ scrollToSection }: FooterProps) {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <button
                onClick={() => scrollToSection ? scrollToSection("home") : window.location.href = "/"}
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
            <p className="text-amber-300 text-sm italic tracking-wide">"We Craft. You Lead."</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-orange-400">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <button
                  onClick={() => scrollToSection ? scrollToSection("services") : window.location.href = "/services"}
                  className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                >
                  Website Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection ? scrollToSection("services") : window.location.href = "/services"}
                  className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                >
                  Mobile App Development
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection ? scrollToSection("services") : window.location.href = "/services"}
                  className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                >
                  Custom Software
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection ? scrollToSection("services") : window.location.href = "/services"}
                  className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                >
                  AI Solutions
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection ? scrollToSection("services") : window.location.href = "/services"}
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
                  onClick={() => scrollToSection ? scrollToSection("expertise") : window.location.href = "/"}
                  className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                >
                  Healthcare
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection ? scrollToSection("expertise") : window.location.href = "/"}
                  className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                >
                  Education
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection ? scrollToSection("expertise") : window.location.href = "/"}
                  className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                >
                  Digital Transformation
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection ? scrollToSection("expertise") : window.location.href = "/"}
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
                  onClick={() => window.location.href = "/about"}
                  className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => window.location.href = "/about"}
                  className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                >
                  Our Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => window.location.href = "/contact"}
                  className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  onClick={() => window.location.href = "/contact"}
                  className="hover:text-orange-400 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-orange-500 rounded"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2026 TrueSpur Technology Solutions. All rights reserved.</p>
          <p className="mt-2 text-sm">"We Craft. You Lead."</p>
        </div>
      </div>
    </footer>
  )
}
