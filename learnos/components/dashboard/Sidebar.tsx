
'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
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
} from 'lucide-react'
import { NavItem } from '@/lib/types'
import styles from './Sidebar.module.css'

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
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <motion.nav
        animate={{ width: isCollapsed ? 60 : 240 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`hidden md:flex fixed left-0 top-0 h-full flex-col z-40 overflow-hidden ${styles.sidebar}`}
      >
        {/* Logo */}
        <div className={`flex items-center gap-2 p-4 mb-2 ${styles.logoContainer}`}>
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${styles.logoIcon}`}
          >
            <Zap size={16} color="#fff" strokeWidth={2.5} />
          </div>
          <AnimatePresence>
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`font-bold text-base whitespace-nowrap ${styles.textPrimary}`}
              >
                LearnOS
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Nav items */}
        <div className="flex flex-col gap-1 px-2 flex-1">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap]
            const isActive = pathname === item.href || pathname.startsWith(item.href)

            return (
              <Link key={item.id} href={item.href} className="block">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`relative flex items-center gap-3 px-2 py-2.5 rounded-xl text-sm font-medium transition-colors w-full ${isActive ? 'text-white' : styles.textMuted}`}
                  style={{ textAlign: 'left', minHeight: 44 }}
                  tabIndex={-1}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className={`absolute inset-0 rounded-xl ${styles.activeNav}`}
                      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    />
                  )}
                  <span className="relative z-10 flex-shrink-0">
                    <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                  </span>
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="relative z-10 whitespace-nowrap"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              </Link>
            )
          })}
        </div>

        {/* User avatar */}
        <div className="p-3 mt-auto">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold ${styles.avatar}`}
            >
              AK
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <p className={`text-sm font-medium whitespace-nowrap ${styles.textPrimary}`}>
                    Alex Kim
                  </p>
                  <p className={`text-xs whitespace-nowrap ${styles.textMuted}`}>
                    Student
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Collapse toggle */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center z-50 ${styles.collapseButton}`}
        >
          {isCollapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </motion.button>
      </motion.nav>

      {/* Mobile bottom nav */}
      <nav
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around px-2 py-2 ${styles.mobileNav}`}
      >
        {navItems.map((item) => {
          const Icon = iconMap[item.icon as keyof typeof iconMap]
          const isActive = pathname === item.href || pathname.startsWith(item.href)

          return (
            <Link key={item.id} href={item.href} className="block">
              <motion.button
                type="button"
                whileTap={{ scale: 0.9 }}
                className={`relative flex items-center justify-center w-10 h-10 rounded-xl ${isActive ? 'text-white' : styles.textMuted}`}
                tabIndex={-1}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeMobileNav"
                    className="absolute inset-0 rounded-xl"
                    style={{ backgroundColor: 'var(--accent)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  />
                )}
                <span className="relative z-10">
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                </span>
              </motion.button>
            </Link>
          )
        })}
      </nav>
    </>
  )
}

export default Sidebar