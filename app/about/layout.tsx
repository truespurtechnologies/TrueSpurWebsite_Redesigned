import type { ReactNode } from 'react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About TrueSpur - Founder-Led Product Studio Building Digital Products',
  description: 'Learn about TrueSpur, a founder-led product studio that helps ambitious founders turn ideas into scalable digital products. Discover our approach, expertise, and the founder behind our mission.',
  keywords: ['TrueSpur', 'product studio', 'digital products', 'founder-led', 'healthcare technology', 'product development', 'Aswar'],
  openGraph: {
    title: 'About TrueSpur - Founder-Led Product Studio',
    description: 'Building products—our own and yours. Learn about our founder-led approach to digital product development.',
    type: 'website',
    url: 'https://www.truespur.ai/about',
    images: [
      {
        url: '/images/truespur-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TrueSpur - Founder-Led Product Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About TrueSpur - Founder-Led Product Studio',
    description: 'Building products—our own and yours. Learn about our founder-led approach to digital product development.',
    images: ['/images/truespur-og-image.jpg'],
  },
  alternates: {
    canonical: 'https://www.truespur.ai/about',
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

export default function AboutLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
