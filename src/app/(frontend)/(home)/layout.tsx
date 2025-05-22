import React from 'react'
import { draftMode } from 'next/headers'
import { AdminBar } from '@/components/AdminBar'
import { Header } from '@/Header/Component'
import { cn } from '@/utilities/ui'

export default async function HomeLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <div className="relative min-h-screen">
      {isEnabled && (
        <div className="fixed top-0 left-0 right-0 z-50">
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
        </div>
      )}
      <Header />
      <main className={cn('relative z-0', isEnabled && 'pt-[var(--admin-bar-height)]')}>
        {children}
      </main>
    </div>
  )
}
