'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'
import { supabase } from '@/lib/supabase'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        const { data: { user: sbUser } } = await supabase.auth.getUser()

        if (sbUser) {
          setUser({
            id:     sbUser.id,
            name:   sbUser.user_metadata?.full_name
                    || sbUser.user_metadata?.name
                    || sbUser.email?.split('@')[0]
                    || 'Student',
            email:  sbUser.email || '',
            avatar: sbUser.user_metadata?.avatar_url,
          })
          setLoading(false)
          return
        }
      } catch (error) {
        console.error('Error loading user:', error)
      }

      // Demo mode — fallback user
      setUser({
        id:    'demo-user',
        name:  'Alex Kim',
        email: 'alex@learnos.dev',
      })
      setLoading(false)
    }

    loadUser()

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        setUser({
          id:     session.user.id,
          name:   session.user.user_metadata?.full_name
                  || session.user.user_metadata?.name
                  || session.user.email?.split('@')[0]
                  || 'Student',
          email:  session.user.email || '',
          avatar: session.user.user_metadata?.avatar_url,
        })
      } else {
        setUser(null)
      }
    })

    return () => {
      subscription?.unsubscribe()
    }
  }, [])

  async function logout() {
    try {
      await supabase.auth.signOut()
      setUser(null)
    } catch (error) {
      console.error('Error during logout:', error)
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}