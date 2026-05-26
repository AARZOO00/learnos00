'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, Flame, Calendar } from 'lucide-react'

type Intensity = 0 | 1 | 2 | 3

interface DayData {
  day: number
  intensity: Intensity
}

// Hardcoded deterministic data — Math.random() hata diya completely
// Server aur client pe hamesha same rahega
const FIXED_GRID: DayData[] = [
  { day: 0,  intensity: 0 }, { day: 1,  intensity: 1 }, { day: 2,  intensity: 3 },
  { day: 3,  intensity: 2 }, { day: 4,  intensity: 1 }, { day: 5,  intensity: 0 },
  { day: 6,  intensity: 0 }, { day: 7,  intensity: 2 }, { day: 8,  intensity: 3 },
  { day: 9,  intensity: 1 }, { day: 10, intensity: 2 }, { day: 11, intensity: 3 },
  { day: 12, intensity: 1 }, { day: 13, intensity: 0 }, { day: 14, intensity: 1 },
  { day: 15, intensity: 2 }, { day: 16, intensity: 0 }, { day: 17, intensity: 3 },
  { day: 18, intensity: 2 }, { day: 19, intensity: 1 }, { day: 20, intensity: 0 },
  { day: 21, intensity: 2 }, { day: 22, intensity: 3 }, { day: 23, intensity: 3 },
  { day: 24, intensity: 1 }, { day: 25, intensity: 2 }, { day: 26, intensity: 0 },
  { day: 27, intensity: 1 },
]

const intensityStyles: Record<Intensity, React.CSSProperties> = {
  0: { backgroundColor: '#1e1e2e' },
  1: { backgroundColor: 'rgba(67,56,202,0.4)' },
  2: { backgroundColor: 'rgba(99,102,241,0.7)' },
  3: { backgroundColor: '#818cf8' },
}

const barHeights = [40, 65, 30, 80, 90, 55, 70]
const dayLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const totalContributions = FIXED_GRID.filter((d) => d.intensity > 0).length

export function ActivityTile() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <article
      className="rounded-2xl p-6 grain"
      style={{ backgroundColor: 'var(--card)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'rgba(99,102,241,0.1)' }}
          >
            <Activity size={15} style={{ color: '#6366f1' }} />
          </div>
          <h2 className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            Learning Activity
          </h2>
        </div>
        <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--text-muted)' }}>
          <span className="flex items-center gap-1">
            <Calendar size={12} />
            {totalContributions} sessions
          </span>
          <span className="flex items-center gap-1">
            <Flame size={12} style={{ color: '#fb923c' }} />
            5 day streak
          </span>
        </div>
      </div>

      <div className="grid gap-1.5 mb-6" style={{ gridTemplateColumns: 'repeat(7, minmax(0, 1fr))' }}>
        {FIXED_GRID.map((cell, index) => (
          <motion.div
            key={cell.day}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
              delay: mounted ? 0.02 * index : 0,
            }}
            whileHover={{ scale: 1.2, zIndex: 10 }}
            className="rounded-md aspect-square"
            style={intensityStyles[cell.intensity]}
          />
        ))}
      </div>

      <div className="mb-4" style={{ borderTop: '1px solid var(--border)' }} />

      <div>
        <p className="text-xs mb-3 font-medium" style={{ color: 'var(--text-muted)' }}>
          Last 7 Days
        </p>
        <div className="flex items-end gap-2" style={{ height: 64 }}>
          {barHeights.map((height, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex items-end justify-center" style={{ height: 52 }}>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 + i * 0.07 }}
                  className="w-full rounded-t-sm"
                  style={{
                    background: i === 3 ? 'linear-gradient(180deg, #818cf8, #6366f1)' : 'var(--border)',
                    minHeight: 3,
                    maxHeight: '100%',
                  }}
                />
              </div>
              <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>
                {dayLabels[i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-xs mt-3" style={{ color: 'var(--text-muted)' }}>
        Most active: <span style={{ color: 'var(--accent)' }}>Thursday</span>
      </p>
    </article>
  )
}

export default ActivityTile