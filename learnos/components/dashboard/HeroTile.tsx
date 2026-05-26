'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Flame, BookOpen, Zap, TrendingUp } from 'lucide-react'

const statCardVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 20, delay: 0.4 + i * 0.1 },
  }),
}

const stats = [
  { icon: BookOpen, label: 'Active Courses', value: '4', color: '#6366f1' },
  { icon: Zap, label: 'XP This Week', value: '284', color: '#8b5cf6' },
  { icon: TrendingUp, label: 'Percentile', value: 'Top 12%', color: '#06b6d4' },
]

const STREAK_TARGET = 12

export function HeroTile() {
  // Start with static values — server and client initial render will match
  const [date, setDate] = useState('Welcome back')
  const [streakCount, setStreakCount] = useState(STREAK_TARGET)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setDate(
      new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
      })
    )

    // Count-up animation after mount
    setStreakCount(0)
    let count = 0
    const timer = setInterval(() => {
      count += 1
      setStreakCount(count)
      if (count >= STREAK_TARGET) clearInterval(timer)
    }, 60)

    return () => clearInterval(timer)
  }, [])

  return (
    <article className="relative rounded-2xl p-6 md:p-8 overflow-hidden grain">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          backgroundImage: [
            'radial-gradient(ellipse at 10% 50%, rgba(99,102,241,0.25) 0%, transparent 60%), radial-gradient(ellipse at 90% 20%, rgba(139,92,246,0.2) 0%, transparent 60%)',
            'radial-gradient(ellipse at 30% 70%, rgba(99,102,241,0.2) 0%, transparent 60%), radial-gradient(ellipse at 70% 10%, rgba(139,92,246,0.25) 0%, transparent 60%)',
            'radial-gradient(ellipse at 10% 50%, rgba(99,102,241,0.25) 0%, transparent 60%), radial-gradient(ellipse at 90% 20%, rgba(139,92,246,0.2) 0%, transparent 60%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{ backgroundColor: 'var(--card)', borderRadius: 'inherit' }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          borderRadius: 'inherit',
        }}
      />

      {/* Border */}
      <div
        className="absolute inset-0 rounded-2xl -z-10"
        style={{ border: '1px solid var(--border)' }}
      />

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
        <div>
          {/* Date — only show after mount to avoid mismatch */}
          {mounted && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-sm mb-1"
              style={{ color: 'var(--text-muted)' }}
            >
              {date}
            </motion.p>
          )}

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30, delay: 0.15 }}
            className="text-2xl md:text-3xl font-bold mb-1"
            style={{ color: 'var(--text-primary)' }}
          >
            Welcome back, Alex 👋
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-sm"
            style={{ color: 'var(--text-muted)' }}
          >
            Ready to continue your learning journey?
          </motion.p>

          {/* Streak — static value on server, animates after mount */}
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.35 }}
            className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
            style={{
              backgroundColor: 'rgba(251,146,60,0.1)',
              border: '1px solid rgba(251,146,60,0.25)',
              color: '#fb923c',
            }}
          >
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Flame size={14} />
            </motion.span>
            {/* Always render the same structure; streakCount starts at STREAK_TARGET on server */}
            <span>{streakCount} Day Streak</span>
          </motion.div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={statCardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03, translateY: -2 }}
              className="flex flex-col gap-1 px-4 py-3 rounded-xl min-w-[110px]"
              style={{
                backgroundColor: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div
                className="w-6 h-6 rounded-md flex items-center justify-center mb-1"
                style={{ backgroundColor: `${stat.color}20` }}
              >
                <stat.icon size={13} style={{ color: stat.color }} />
              </div>
              <span
                className="text-lg font-bold leading-none"
                style={{ color: 'var(--text-primary)' }}
              >
                {stat.value}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </article>
  )
}

export default HeroTile