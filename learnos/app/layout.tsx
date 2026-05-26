import { Sidebar } from '@/components/dashboard/Sidebar'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LearnOS | Student Dashboard',
  description: 'Your personal student learning dashboard',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto sm:ml-0 md:ml-[240px] pb-20 md:pb-0">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
