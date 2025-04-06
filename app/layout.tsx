import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import localFont from "next/font/local"
import "./globals.css"



const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

// Add a comic-style font for the Spider-Verse theme
const comicFont = localFont({
  src: [
    {
      path: "../public/fonts/comicz.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/font.woff2",
      weight: "300",
      style: "normal",
    },
    // {
    //   path: "../public/fonts/KOMIKAX_.ttf",
    //   weight: "700",
    //   style: "normal",
    // },
    {
      path: "../public/fonts/tungsten-black.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/Bangers-Regular.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-comic",
  fallback: ["system-ui", "subheading", "sans-serif"],
})

export const metadata: Metadata = {
  title: "UNITRON 2025 - Enter the Tech-Verse",
  description: "Future Institute of Technology's technical festival with a Spider-Verse theme",
    generator: 'v0.dev',
    icons: {
      icon: "/images/logo_spiderverse.png", // Path to the favicon file
    }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${comicFont.variable} font-sans`}>{children}</body>
    </html>
  )
}



import './globals.css'