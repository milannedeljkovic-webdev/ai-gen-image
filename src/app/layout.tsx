import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI Image Generator',
  description: 'Create stunning images with AI-powered generation using advanced models',
  keywords: 'AI, image generation, artificial intelligence, creative tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(
        inter.className,
        "min-h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 antialiased"
      )}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}