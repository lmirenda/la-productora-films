import type { Metadata } from 'next'
import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body className="min-h-screen flex flex-col">
        <Providers>
          <Header />
          <main className={cn('relative z-0 flex-1', isEnabled && 'pb-[var(--admin-bar-height)]')}>
            {children}
          </main>
          <Footer />

          {isEnabled && (
            <div className="fixed bottom-0 left-0 right-0 z-[9999]">
              <AdminBar
                adminBarProps={{
                  preview: isEnabled,
                }}
              />
            </div>
          )}
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  description:
    '20 years of global production services in Uruguay. Full support for commercials, features, and digital content with international standards and local expertise.',

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  alternates: {
    canonical: '/',
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@laproductorafilms',
    description:
      '20 years of global production services in Uruguay. Full support for commercials, features, and digital content with international standards and local expertise.',
    images: [`${getServerSideURL()}/twitter-image.png`],
  },
}
