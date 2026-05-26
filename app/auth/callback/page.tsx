'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // For PKCE flow, Supabase automatically handles the code exchange
        // Just check if we have a valid session
        const { data: { session }, error } = await supabase.auth.getSession()

        if (error) {
          console.error('Auth error:', error.message)
          router.replace('/login')
          return
        }

        if (session) {
          // Session exists, redirect to dashboard
          router.replace('/dashboard')
        } else {
          // No session, redirect to login
          router.replace('/login')
        }
      } catch (err) {
        console.error('Callback error:', err)
        router.replace('/login')
      }
    }

    handleCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020817] text-cyan-400">
      Signing in...
    </div>
  )
}