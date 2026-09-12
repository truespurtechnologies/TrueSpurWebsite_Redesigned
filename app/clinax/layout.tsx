import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Clinax | The Connected Clinic Operating System",
  description:
    "Clinax connects patient care, teams, and clinic operations for physiotherapy and rehabilitation clinics.",
}

export default function ClinaxLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
