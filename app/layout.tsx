"use client"

import "./globals.css"
import { Toaster } from "sonner"
import { Inter } from "next/font/google"
import { Providers } from "./providers"
import { VideoBackground } from "@/components/video-background"

const inter = Inter({ 
  subsets: ["latin"], 
  display: "swap",
  variable: "--font-inter"
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased dark`}>
      <head>
        <title>$LUDOMAN Crypto</title>
        <meta name="description" content="Web3 cryptocurrency dashboard for $LUDOMAN" />
      </head>
      <body className={inter.className}>
        <VideoBackground />
        <Providers>{children}</Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}