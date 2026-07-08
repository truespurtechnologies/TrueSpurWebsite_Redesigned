import type { ReactNode } from "react"
import { Metadata } from 'next'
import { JsonLd } from "@/components/seo/JsonLd"

export const metadata: Metadata = {
  title: 'Products - TrueSpur Technology Solutions',
  description: 'Explore TrueSpur&apos;s portfolio of digital products across healthcare, digital transformation, and artificial intelligence. See how we turn ideas into scalable solutions.',
  openGraph: {
    title: 'Products - TrueSpur Technology Solutions',
    description: 'Explore TrueSpur&apos;s portfolio of digital products across healthcare, digital transformation, and artificial intelligence.',
    type: 'website',
    url: 'https://truespur.ai/products',
    images: [
      {
        url: '/logo/truespur-main-logo.png',
        width: 1200,
        height: 630,
        alt: 'TrueSpur Products',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Products - TrueSpur Technology Solutions',
    description: 'Explore TrueSpur&apos;s portfolio of digital products across healthcare, digital transformation, and artificial intelligence.',
    images: ['/logo/truespur-main-logo.png'],
  },
  alternates: {
    canonical: 'https://truespur.ai/products',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function ProductsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 text-gray-900">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "TrueSpur Products",
          description: "Explore TrueSpur&apos;s portfolio of digital products across healthcare, digital transformation, and artificial intelligence.",
          url: "https://truespur.ai/products",
          applicationCategory: "BusinessApplication",
        }}
      />
      {children}
    </div>
  )
}
