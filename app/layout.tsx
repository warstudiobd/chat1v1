import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'LotChat - Live Voice Rooms & Chat',
  description: 'Connect with people around the world through live voice rooms, gifting, and messaging.',
  generator: 'v0.app',
  manifest: '/manifest.json',
  applicationName: 'LotChat',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'LotChat',
  },
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
    shortcut: '/logo.png',
  },
  openGraph: {
    title: 'LotChat - Voice Room & Chat',
    description: 'Connect with people through live voice rooms, gifting, and messaging.',
    images: ['/logo.png'],
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0A0A0F',
  userScalable: false,
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased" style={{ backgroundColor: '#0A0A0F' }}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
