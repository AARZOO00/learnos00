'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Activity, Flame, Calendar } from 'lucide-react'

type Intensity = 0 | 1 | 2 | 3

interface DayData { day: number; intensity: Intensity }

const FIXED_GRID: DayData[] = [
  {day:0,intensity:0},{day:1,intensity:1},{day:2,intensity:3},{day:3,intensity:2},
  {day:4,intensity:1},{day:5,intensity:0},{day:6,intensity:0},{day:7,intensity:2},
  {day:8,intensity:3},{day:9,intensity:1},{day:10,intensity:2},{day:11,intensity:3},
  {day:12,intensity:1},{day:13,intensity:0},{day:14,intensity:1},{day:15,intensity:2},
  {day:16,intensity:0},{day:17,intensity:3},{day:18,intensity:2},{day:19,intensity:1},
  {day:20,intensity:0},{day:21,intensity:2},{day:22,intensity:3},{day:23,intensity:3},
  {day:24,intensity:1},{day:25,intensity:2},{day:26,intensity:0},{day:27,intensity:1},
]

const intensityConfig: Record<Intensity, { bg: string; glow: string }> = {
  0: { bg: 'rgba(26,37,64,0.6)',  glow: 'none' },
  1: { bg: '#0e4a5e',             glow: 'none' },
  2: { bg: '#0891b2',             glow: '0 0 6px rgba(0,217,255,0.2)' },
  3: { bg: '#00d9ff',             glow: '0 0 10px rgba(0,217,255,0.45)' },
}

const dayLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
const barHeights = [40, 65, 30, 90, 80, 55, 70]
const totalContributions = FIXED_GRID.filter(d => d.intensity > 0).length

export function ActivityTile() {
  const [mounted, setMounted] = useState(false)
  const [time, setTime] = useState('')
  const [hoveredCell, setHoveredCell] = useState<number | null>(null)

  useEffect(() => {
    setMounted(true)
    const update = () => {
      const now = new Date()
      setTime(now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }))
    }
    update()
    const id = setInterval(update, 30000)
    return () => clearInterval(id)
  }, [])

  return (
    <article className="rounded-2xl p-5 noise-overlay" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'rgba(0,217,255,0.08)', border: '1px solid rgba(0,217,255,0.15)' }}>
            <Activity size={14} style={{ color: '#00d9ff' }} />
          </div>
          <div>
            <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '14px', color: '#e8f0fe' }}>
              Activity Matrix
            </h2>
            {mounted && (
              <p style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#00d9ff', opacity: 0.7 }}>
                {time}
              </p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3" style={{ fontSize: '11px', color: '#3d4f6b' }}>
          <span className="flex items-center gap-1">
            <Calendar size={11} /> {totalContributions} sessions
          </span>
          <span className="flex items-center gap-1">
            <Flame size={11} style={{ color: '#f59e0b' }} /> 5d streak
          </span>
        </div>
      </div>

      {/* Day labels */}
      <div className="grid mb-1.5" style={{ gridTemplateColumns: 'repeat(7, minmax(0,1fr))', gap: '6px' }}>
        {dayLabels.map((d, i) => (
          <div key={i} style={{ fontFamily: 'JetBrains Mono', fontSize: '9px', color: '#3d4f6b', textAlign: 'center' }}>{d}</div>
        ))}
      </div>

      {/* Contribution grid */}
      <div className="grid mb-5" style={{ gridTemplateColumns: 'repeat(7, minmax(0,1fr))', gap: '6px', position: 'relative' }}>
        {FIXED_GRID.map((cell, i) => {
          const cfg = intensityConfig[cell.intensity]
          return (
            <div key={cell.day} style={{ position: 'relative' }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22, delay: mounted ? 0.015 * i : 0 }}
                whileHover={{ scale: 1.3, zIndex: 20 }}
                onHoverStart={() => setHoveredCell(i)}
                onHoverEnd={() => setHoveredCell(null)}
                className="rounded-md aspect-square cursor-pointer"
                style={{ background: cfg.bg, boxShadow: cfg.glow }}
              />
              {hoveredCell === i && (
                <div style={{
                  position: 'absolute', bottom: '110%', left: '50%', transform: 'translateX(-50%)',
                  background: '#0d1117', border: '1px solid #1a2540',
                  borderRadius: '6px', padding: '4px 8px', whiteSpace: 'nowrap',
                  fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#e8f0fe',
                  zIndex: 30, pointerEvents: 'none',
                }}>
                  Day {cell.day + 1} · {cell.intensity === 0 ? 'No' : cell.intensity === 1 ? '1' : cell.intensity === 2 ? '2' : '3+'} session{cell.intensity !== 1 ? 's' : ''}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border)', marginBottom: '16px' }} />

      {/* Bar chart */}
      <div>
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#3d4f6b', marginBottom: '10px', letterSpacing: '0.06em' }}>
          LAST 7 DAYS
        </p>
        <div className="flex items-end gap-2" style={{ height: '72px' }}>
          {barHeights.map((h, i) => {
            const isMax = h === Math.max(...barHeights)
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex items-end justify-center" style={{ height: '56px' }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.5 + i * 0.06 }}
                    className="w-full rounded-t-sm"
                    style={{
                      background: isMax
                        ? 'linear-gradient(180deg, #00d9ff, #0891b2)'
                        : 'linear-gradient(180deg, #1a2540, #1a2540)',
                      boxShadow: isMax ? '0 0 10px rgba(0,217,255,0.3)' : 'none',
                      minHeight: '3px',
                      maxHeight: '100%',
                    }}
                  />
                </div>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '9px', color: '#3d4f6b' }}>
                  {['M','T','W','T','F','S','S'][i]}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <p style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#3d4f6b', marginTop: '10px' }}>
        Peak day: <span style={{ color: '#00d9ff' }}>Thursday</span>
      </p>
    </article>
  )
}

export default ActivityTile
