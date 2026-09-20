import type { Metadata } from "next"
import { Caladea, Plus_Jakarta_Sans } from "next/font/google"

// Clinax v2 identity mirrors the Clinax × Physiora proposal deck:
// Cambria headings (Caladea is the metric-compatible web equivalent) and a
// clean sans body. Scoped via CSS variables so the rest of the site is
// unaffected, same approach as app/clinax/layout.tsx.
const caladea = Caladea({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-cx2-heading",
  display: "swap",
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cx2-body",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Clinax — The Clinical Operating System for Growing Clinics | TrueSpur",
  description:
    "Run your physiotherapy or rehab clinic without WhatsApp chaos, spreadsheets and paper files. Clinax connects reception, therapists and leadership on one platform.",
  alternates: {
    canonical: "https://truespur.ai/clinax-v2",
  },
  // Preview route for A/B comparison against /clinax — keep out of search
  // until it is promoted.
  robots: { index: false, follow: false },
  openGraph: {
    title: "Clinax — The Clinical Operating System for Growing Clinics",
    description: "One connected platform for patient operations, clinical care and clinic operations. A TrueSpur product.",
    type: "website",
    url: "https://truespur.ai/clinax-v2",
    images: [
      {
        url: "https://truespur.ai/images/clinax/management-dashboard.png",
        width: 1492,
        height: 682,
        alt: "Clinax management dashboard — appointments, revenue and therapist utilisation in one view",
      },
    ],
  },
}

export default function ClinaxV2Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${caladea.variable} ${jakarta.variable}`} style={{ fontFamily: "var(--font-cx2-body)" }}>
      {children}
    </div>
  )
}
