import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services | TrueSpur Technology Solutions",
  description: "We build products. We help you build yours. From validating your idea to launching a product people want to use, we partner with founders to turn concepts into real products.",
  openGraph: {
    title: "Services | TrueSpur Technology Solutions",
    description: "We build products. We help you build yours. Product strategy, design, and engineering—integrated into one team that thinks like founders, not vendors.",
    type: "website",
  },
}

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
