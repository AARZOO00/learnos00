'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, BookOpen, Zap, TrendingUp } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { supabase } from '@/lib/supabase'
const STREAK_TARGET = 12
const XP_CURRENT = 284
const XP_MAX = 500

const stats = [
  { icon: BookOpen,   label: 'Active Courses', value: '4',       color: '#00d9ff',  bg: 'rgba(0,217,255,0.08)'   },
  { icon: Zap,        label: 'XP This Week',   value: '284',     color: '#7c3aed',  bg: 'rgba(124,58,237,0.08)'  },
  { icon: TrendingUp, label: 'Percentile',      value: 'Top 12%', color: '#10b981',  bg: 'rgba(16,185,129,0.08)'  },
]

export function HeroTile() {
  const { user } = useAuth()
  const [date, setDate] = useState('')
  const [streakCount, setStreakCount] = useState(STREAK_TARGET)
  const [mounted, setMounted] = useState(false)

  const getUserDisplayName = () => {
    if (!user) return 'Student'
    return user.name
  }

  useEffect(() => {
    setMounted(true)
    setDate(new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }))
    setStreakCount(0)
    let count = 0
    const timer = setInterval(() => {
      count += 1
      setStreakCount(count)
      if (count >= STREAK_TARGET) clearInterval(timer)
    }, 55)
    return () => clearInterval(timer)
  }, [])

  const xpPercent = Math.round((XP_CURRENT / XP_MAX) * 100)

  return (
    <article className="relative rounded-2xl overflow-hidden noise-overlay" style={{ border: '1px solid rgba(0,217,255,0.12)' }}>
      {/* Background layers */}
      <div className="absolute inset-0" style={{ background: 'var(--bg-card)', borderRadius: 'inherit' }} />
      <motion.div
        className="absolute inset-0"
        animate={{
          backgroundImage: [
            'radial-gradient(ellipse at 5% 90%, rgba(0,217,255,0.1) 0%, transparent 50%), radial-gradient(ellipse at 95% 10%, rgba(124,58,237,0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.03) 0%, transparent 70%)',
            'radial-gradient(ellipse at 25% 70%, rgba(0,217,255,0.08) 0%, transparent 50%), radial-gradient(ellipse at 75% 20%, rgba(124,58,237,0.12) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.04) 0%, transparent 70%)',
            'radial-gradient(ellipse at 5% 90%, rgba(0,217,255,0.1) 0%, transparent 50%), radial-gradient(ellipse at 95% 10%, rgba(124,58,237,0.1) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(16,185,129,0.03) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ borderRadius: 'inherit' }}
      />
      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern scanlines opacity-60" style={{ borderRadius: 'inherit' }} />
      {/* Corner accent - top left */}
      <div className="absolute top-0 left-0 w-8 h-8" style={{
        borderTop: '2px solid rgba(0,217,255,0.5)',
        borderLeft: '2px solid rgba(0,217,255,0.5)',
        borderTopLeftRadius: '14px',
      }} />
      {/* Corner accent - bottom right */}
      <div className="absolute bottom-0 right-0 w-8 h-8" style={{
        borderBottom: '2px solid rgba(124,58,237,0.4)',
        borderRight: '2px solid rgba(124,58,237,0.4)',
        borderBottomRightRadius: '14px',
      }} />

      <div className="relative z-10 p-6 md:p-8">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Left: Greeting */}
          <div className="flex-1">
            {mounted && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#00d9ff', marginBottom: '10px', letterSpacing: '0.05em' }}
              >
                &gt; {date}
              </motion.p>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 28, delay: 0.15 }}
              style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(24px, 4vw, 36px)', lineHeight: 1.15, marginBottom: '6px', color: '#e8f0fe' }}
            >
              Welcome back,{' '}
              <span style={{
                background: 'linear-gradient(90deg, #00d9ff, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>{getUserDisplayName()}</span>{' '}👋
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              style={{ color: '#8b9ab5', fontSize: '14px', marginBottom: '20px' }}
            >
              Ready to continue your learning journey?
            </motion.p>

            {/* Streak badge */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 22, delay: 0.32 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full"
              style={{
                background: 'rgba(245,158,11,0.08)',
                border: '1px solid rgba(245,158,11,0.25)',
                color: '#f59e0b',
                fontSize: '13px',
                fontWeight: 500,
              }}
            >
              <motion.span animate={{ scale: [1, 1.25, 1] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <Flame size={13} />
              </motion.span>
              <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600 }}>{streakCount} Day Streak</span>
            </motion.div>

            {/* XP Progress bar */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-4 p-3.5 rounded-xl"
              style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(0,217,255,0.08)' }}
            >
              <div className="flex justify-between items-center mb-2">
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#3d4f6b', letterSpacing: '0.08em' }}>
                  XP TO LEVEL 8
                </span>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#00d9ff' }}>
                  {XP_CURRENT} / {XP_MAX}
                </span>
              </div>
              <div style={{ height: '5px', background: 'rgba(255,255,255,0.04)', borderRadius: '99px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${xpPercent}%` }}
                  transition={{ duration: 1.4, ease: 'easeOut', delay: 0.6 }}
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #00d9ff, #7c3aed)',
                    borderRadius: '99px',
                    boxShadow: '0 0 8px rgba(0,217,255,0.4)',
                  }}
                />
              </div>
            </motion.div>
          </div>

          {/* Right: Stats */}
          <div className="flex flex-wrap lg:flex-col gap-3">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.35 + i * 0.1 }}
                whileHover={{ scale: 1.04, y: -2, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                className="flex items-center gap-3 px-4 py-3 rounded-xl"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: `1px solid ${stat.bg.replace('0.08', '0.15')}`,
                  minWidth: '140px',
                  backdropFilter: 'blur(8px)',
                  cursor: 'default',
                }}
              >
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: stat.bg, border: `1px solid ${stat.color}25` }}>
                  <stat.icon size={14} style={{ color: stat.color }} />
                </div>
                <div>
                  <div style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '16px', color: '#e8f0fe', lineHeight: 1 }}>
                    {stat.value}
                  </div>
                  <div style={{ fontSize: '11px', color: '#3d4f6b', marginTop: '3px' }}>{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}

export default HeroTile
