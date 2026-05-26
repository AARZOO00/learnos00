'use client'

import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/dashboard/Sidebar'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const showSidebar =
    pathname === '/dashboard' ||
    pathname === '/courses' ||
    pathname === '/activity' ||
    pathname === '/settings' ||
    pathname === '/profile'

  if (!showSidebar) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen w-full bg-[var(--bg-primary)]">
      <Sidebar />

      <main className="min-h-screen pl-[280px] overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}