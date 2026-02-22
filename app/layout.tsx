import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ServiceWorkerRegister } from "@/components/sw-register";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "LotChat: Voice & Video Room",
  description:
    "Join voice rooms, meet new people, send gifts, play games and build your community on LotChat by WarStudio Ltd.",
  applicationName: "LotChat",
  authors: [{ name: "WarStudio Ltd" }],
  generator: "Next.js",
  keywords: [
    "voice chat",
    "video room",
    "social",
    "gifts",
    "games",
    "LotChat",
    "WarStudio",
  ],
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "LotChat",
    startupImage: "/icon-512.jpg",
  },
  openGraph: {
    type: "website",
    siteName: "LotChat",
    title: "LotChat: Voice & Video Room",
    description:
      "Join voice rooms, meet new people, send gifts, play games and build your community.",
    images: [{ url: "/icon-512.jpg", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary",
    title: "LotChat: Voice & Video Room",
    description:
      "Join voice rooms, meet new people, send gifts, play games and build your community.",
    images: ["/icon-512.jpg"],
  },
  other: {
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
  },
};

export const viewport: Viewport = {
  themeColor: "#7c3aed",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/icon-192.jpg" />
        <link rel="apple-touch-icon" href="/icon-192.jpg" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
