import type { Metadata } from "next"
import { Instrument_Serif, DM_Sans } from "next/font/google"

// Clinax has its own dedicated product identity (Instrument Serif + DM Sans),
// scoped to this route via CSS variables so it does not affect the main
// TrueSpur site typography (Poppins / Inter, set in the root layout).
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: "400",
  variable: "--font-clinax-serif",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-clinax-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Clinax — Connected Operating System for Clinics | TrueSpur",
  description:
    "Clinax brings patient care, teams, and clinic operations together in one connected platform, built for physiotherapy and rehabilitation clinics that need visibility, efficiency, and control as they grow.",
  alternates: {
    canonical: "https://truespur.ai/clinax",
  },
  openGraph: {
    title: "Clinax — Connected Operating System for Clinics",
    description:
      "Bring patient care, teams and clinic operations together in one connected platform. A TrueSpur product.",
    type: "website",
    url: "https://truespur.ai/clinax",
  },
}

export default function ClinaxLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${instrumentSerif.variable} ${dmSans.variable}`}>{children}</div>
}
