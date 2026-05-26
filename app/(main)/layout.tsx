import { Sidebar } from '@/components/dashboard/Sidebar'
import { AuthProvider } from '@/lib/auth'
import { ToastProvider } from '@/components/ui/Toast'
import { supabase } from '@/lib/supabase'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ToastProvider>
        <div className="flex min-h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto sm:ml-0 md:ml-[240px] pb-20 md:pb-0">
            {children}
          </main>
        </div>
      </ToastProvider>
    </AuthProvider>
  )
}