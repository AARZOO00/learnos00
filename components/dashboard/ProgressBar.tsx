'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { supabase } from '@/lib/supabase'
interface ProgressBarProps {
  progress: number
  showLabel?: boolean
  color?: string
}

function getProgressColor(progress: number): string {
  if (progress >= 70) return '#10b981'
  if (progress >= 40) return '#00d9ff'
  return '#f59e0b'
}

function getGlowColor(progress: number): string {
  if (progress >= 70) return 'rgba(16,185,129,0.4)'
  if (progress >= 40) return 'rgba(0,217,255,0.4)'
  return 'rgba(245,158,11,0.4)'
}

export function ProgressBar({ progress, showLabel = false, color }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const [displayValue, setDisplayValue] = useState(0)

  const resolvedColor = color || getProgressColor(progress)
  const glowColor = getGlowColor(progress)

  useEffect(() => {
    if (!isInView) return
    let count = 0
    const duration = 1200
    const startTime = performance.now()
    const animate = (now: number) => {
      const fraction = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - fraction, 3)
      count = Math.round(eased * progress)
      setDisplayValue(count)
      if (fraction < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, progress])

  return (
    <div ref={ref} className="w-full">
      <div className="relative w-full rounded-full overflow-hidden" style={{ height: '7px', background: 'rgba(255,255,255,0.04)' }}>
        <motion.div
          className="h-full rounded-full relative overflow-hidden"
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${progress}%` } : { width: '0%' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            background: `linear-gradient(90deg, ${resolvedColor}bb, ${resolvedColor})`,
            boxShadow: `0 0 8px ${glowColor}`,
          }}
        >
          {/* Shimmer */}
          <div
            className="absolute inset-0 animate-shimmer"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
              width: '60%',
            }}
          />
        </motion.div>
        {/* Glow dot at progress end */}
        {isInView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            style={{
              position: 'absolute',
              right: `${100 - progress}%`,
              top: '50%',
              transform: 'translate(50%, -50%)',
              width: '9px',
              height: '9px',
              borderRadius: '50%',
              backgroundColor: resolvedColor,
              boxShadow: `0 0 6px ${resolvedColor}, 0 0 12px ${glowColor}`,
              zIndex: 10,
            }}
          />
        )}
      </div>
      {showLabel && (
        <span style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: resolvedColor, marginTop: '4px', display: 'block' }}>
          {displayValue}%
        </span>
      )}
    </div>
  )
}

export default ProgressBar
