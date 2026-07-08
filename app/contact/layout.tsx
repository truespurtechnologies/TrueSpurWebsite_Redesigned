import type { ReactNode } from "react"
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contact - TrueSpur Technology Solutions',
  description: 'Get in touch with TrueSpur. Whether you have a product idea, need technical expertise, or want to discuss a project, we&apos;re here to help you build something great.',
  openGraph: {
    title: 'Contact - TrueSpur Technology Solutions',
    description: 'Get in touch with TrueSpur. Whether you have a product idea, need technical expertise, or want to discuss a project, we&apos;re here to help you build something great.',
    type: 'website',
    url: 'https://truespur.ai/contact',
    images: [
      {
        url: '/logo/truespur-main-logo.png',
        width: 1200,
        height: 630,
        alt: 'Contact TrueSpur',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact - TrueSpur Technology Solutions',
    description: 'Get in touch with TrueSpur. Whether you have a product idea, need technical expertise, or want to discuss a project, we&apos;re here to help you build something great.',
    images: ['/logo/truespur-main-logo.png'],
  },
  alternates: {
    canonical: 'https://truespur.ai/contact',
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

export default function ContactLayout({ children }: { children: ReactNode }) {
  return children
}
