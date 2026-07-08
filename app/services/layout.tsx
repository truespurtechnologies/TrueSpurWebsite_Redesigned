import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services | TrueSpur Technology Solutions",
  description: "We build products. We help you build yours. From validating your idea to launching a product people want to use, we partner with founders to turn concepts into real products.",
  openGraph: {
    title: "Services | TrueSpur Technology Solutions",
    description: "We build products. We help you build yours. Product strategy, design, and engineering—integrated into one team that thinks like founders, not vendors.",
    type: "website",
    url: "https://truespur.ai/services",
    images: [
      {
        url: "/logo/truespur-main-logo.png",
        width: 1200,
        height: 630,
        alt: "TrueSpur Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | TrueSpur Technology Solutions",
    description: "We build products. We help you build yours. Product strategy, design, and engineering—integrated into one team that thinks like founders, not vendors.",
    images: ["/logo/truespur-main-logo.png"],
  },
  alternates: {
    canonical: "https://truespur.ai/services",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
