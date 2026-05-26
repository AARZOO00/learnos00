'use client'

import { useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  BookOpen,
  Activity,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  Zap,
  LogOut,
} from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { NavItem } from '@/lib/types'
import { supabase } from '@/lib/supabase'
const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard', href: '/dashboard' },
  { id: 'courses', label: 'Courses', icon: 'BookOpen', href: '/courses' },
  { id: 'activity', label: 'Activity', icon: 'Activity', href: '/activity' },
  { id: 'settings', label: 'Settings', icon: 'Settings', href: '/settings' },
  { id: 'profile', label: 'Profile', icon: 'User', href: '/profile' },
]

const iconMap = {
  LayoutDashboard,
  BookOpen,
  Activity,
  Settings,
  User,
}

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  if (
    pathname === '/' ||
    pathname === '/login' ||
    pathname === '/about' ||
    pathname === '/features' ||
    pathname === '/pricing' ||
    pathname === '/security' ||
    pathname === '/roadmap' ||
    pathname === '/blog' ||
    pathname === '/careers' ||
    pathname === '/contact' ||
    pathname === '/privacy' ||
    pathname === '/terms' ||
    pathname === '/license' ||
    pathname === '/compliance' ||
    pathname.startsWith('/community')
  ) {
    return null
  }

  const displayName = user?.name || 'Student'
  const initials =
    user?.name
      ?.split(' ')
      .map((n: string) => n[0])
      .join('')
      .slice(0, 2)
      .toUpperCase() || 'ST'

  const handleLogout = async () => {
    await logout()
    setShowUserMenu(false)
    router.push('/')
  }

  return (
    <>
      <motion.nav
        animate={{ width: isCollapsed ? 60 : 240 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="hidden md:flex fixed left-0 top-0 h-full flex-col z-40 overflow-hidden"
        style={{
          background: 'linear-gradient(180deg, #0d1117 0%, #080e18 100%)',
          borderRight: '1px solid #1a2540',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: 'linear-gradient(90deg, #00d9ff, #7c3aed, transparent)',
            opacity: 0.6,
          }}
        />

        <div className="flex items-center gap-2.5 px-4 py-5 mb-1">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 5 }}
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background:
                'linear-gradient(135deg, rgba(0,217,255,0.2), rgba(124,58,237,0.2))',
              border: '1px solid rgba(0,217,255,0.3)',
              boxShadow: '0 0 12px rgba(0,217,255,0.15)',
            }}
          >
            <Zap size={15} color="#00d9ff" strokeWidth={2.5} />
          </motion.div>

          <AnimatePresence>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                className="flex items-center gap-1"
              >
                <span
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontWeight: 700,
                    fontSize: '15px',
                    color: '#e8f0fe',
                    whiteSpace: 'nowrap',
                  }}
                >
                  LearnOS
                </span>
                <span
                  style={{
                    color: '#00d9ff',
                    fontFamily: 'JetBrains Mono',
                    fontSize: '14px',
                  }}
                >
                  _
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mx-3 mb-4 px-2 py-1 rounded-md flex items-center gap-1.5"
              style={{
                background: 'rgba(0,217,255,0.05)',
                border: '1px solid rgba(0,217,255,0.1)',
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span
                style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: '10px',
                  color: '#3d4f6b',
                }}
              >
                v2.4.1 — STABLE
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col gap-0.5 px-2 flex-1">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap]
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

            return (
              <Link key={item.id} href={item.href} className="block relative">
                <motion.div
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative flex items-center gap-3 px-2.5 py-2.5 rounded-xl text-sm font-medium w-full"
                  style={{ minHeight: 42 }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute inset-0 rounded-xl"
                      style={{
                        background: 'rgba(0,217,255,0.07)',
                        borderLeft: '2px solid #00d9ff',
                      }}
                    />
                  )}

                  <span
                    className="relative z-10 flex-shrink-0"
                    style={{
                      color: isActive ? '#00d9ff' : '#3d4f6b',
                    }}
                  >
                    <Icon size={17} strokeWidth={isActive ? 2.5 : 2} />
                  </span>

                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        className="relative z-10 whitespace-nowrap"
                        style={{
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontWeight: isActive ? 600 : 400,
                          fontSize: '13.5px',
                          color: isActive ? '#e8f0fe' : '#8b9ab5',
                        }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>
            )
          })}
        </div>

        <div style={{ height: '1px', background: 'var(--border)', margin: '8px 12px' }} />

        <div className="p-3 relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="w-full flex items-center gap-2.5 rounded-xl p-2 cursor-pointer"
            style={{
              background: showUserMenu ? 'rgba(0,217,255,0.1)' : 'transparent',
              border: showUserMenu
                ? '1px solid rgba(0,217,255,0.2)'
                : '1px solid transparent',
            }}
          >
            <div className="relative flex-shrink-0">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  background: 'linear-gradient(135deg, #00d9ff, #7c3aed)',
                  color: '#fff',
                  fontFamily: 'Space Grotesk',
                  fontSize: '11px',
                }}
              >
                {initials}
              </div>

              <div
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2"
                style={{ borderColor: '#0d1117' }}
              />
            </div>

            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="flex-1 text-left"
                >
                  <p
                    style={{
                      fontFamily: 'Space Grotesk',
                      fontWeight: 600,
                      fontSize: '13px',
                      color: '#e8f0fe',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {displayName}
                  </p>

                  <p
                    style={{
                      fontFamily: 'JetBrains Mono',
                      fontSize: '10px',
                      color: '#3d4f6b',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    Student · Level 7
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <AnimatePresence>
            {showUserMenu && !isCollapsed && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.95 }}
                className="absolute bottom-full left-3 right-3 mb-2 rounded-xl overflow-hidden z-50"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid rgba(0,217,255,0.2)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                }}
              >
                <Link href="/profile">
                  <button
                    onClick={() => setShowUserMenu(false)}
                    className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm"
                    style={{
                      border: 'none',
                      background: 'transparent',
                      color: '#e8f0fe',
                      fontFamily: 'Space Grotesk',
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    <User size={15} style={{ color: '#00d9ff' }} />
                    View Profile
                  </button>
                </Link>

                <div style={{ height: '1px', background: 'rgba(0,217,255,0.1)' }} />

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm"
                  style={{
                    border: 'none',
                    background: 'transparent',
                    color: '#f43f5e',
                    fontFamily: 'Space Grotesk',
                    fontSize: '13px',
                    cursor: 'pointer',
                  }}
                >
                  <LogOut size={15} />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center z-50"
          style={{
            background: '#0d1117',
            border: '1px solid #1a2540',
            color: '#3d4f6b',
          }}
        >
          {isCollapsed ? <ChevronRight size={11} /> : <ChevronLeft size={11} />}
        </motion.button>
      </motion.nav>

      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around px-3 py-2"
        style={{
          background: 'rgba(13,17,23,0.95)',
          borderTop: '1px solid #1a2540',
          backdropFilter: 'blur(20px)',
        }}
      >
        {navItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap]
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/')

          return (
            <Link key={item.id} href={item.href}>
              <motion.div
                whileTap={{ scale: 0.85 }}
                className="relative flex items-center justify-center w-11 h-11 rounded-xl"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeMobileNav"
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'rgba(0,217,255,0.1)',
                      border: '1px solid rgba(0,217,255,0.25)',
                    }}
                  />
                )}

                <span
                  className="relative z-10"
                  style={{
                    color: isActive ? '#00d9ff' : '#3d4f6b',
                  }}
                >
                  <Icon size={19} strokeWidth={isActive ? 2.5 : 1.8} />
                </span>
              </motion.div>
            </Link>
          )
        })}
      </nav>
    </>
  )
}

export default Sidebar