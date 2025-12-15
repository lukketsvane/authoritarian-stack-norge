import type React from "react"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Maktkartet – Kven styrer eigentleg Noreg?",
  description:
    "Ein interaktiv visualisering av korleis kapital, media og stat heng saman i Noreg. Utforsk nettverk av makt, svingdører og interesseorganisasjonar.",
  generator: "v0.app",
  keywords: ["Norge", "makt", "politikk", "kapital", "media", "nettverk", "demokrati"],
  authors: [{ name: "Maktkartet" }],
  openGraph: {
    title: "Maktkartet – Kven styrer eigentleg Noreg?",
    description: "Utforsk nettverk av makt i norsk samfunn",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#faf6f1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="no" className="bg-[#faf6f1]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400..900&family=Source+Serif+4:wght@200..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
