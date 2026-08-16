import type { Metadata } from 'next'
import { Geist, Geist_Mono, Poppins, Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { SiteWidePromo } from '@/components/promo/SiteWidePromo'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

// Premium Design System Fonts
const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({ 
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://truespur.ai'),
  title: 'TrueSpur Technology Solutions',
  description: 'Transforming businesses with cutting-edge technology solutions. We specialize in website development, mobile apps, custom software, AI solutions, and product consulting.',
  generator: 'Next.js',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'TrueSpur Technology Solutions',
    description: 'Transforming businesses with cutting-edge technology solutions. We specialize in website development, mobile apps, custom software, AI solutions, and product consulting.',
    type: 'website',
    url: 'https://truespur.ai',
    images: [
      {
        url: '/logo/truespur-main-logo.png',
        width: 1200,
        height: 630,
        alt: 'TrueSpur Technology Solutions',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrueSpur Technology Solutions',
    description: 'Transforming businesses with cutting-edge technology solutions. We specialize in website development, mobile apps, custom software, AI solutions, and product consulting.',
    images: ['/logo/truespur-main-logo.png'],
  },
  alternates: {
    canonical: 'https://truespur.ai',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`}>
      <body className={`font-sans antialiased`}>
        <SiteWidePromo />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
