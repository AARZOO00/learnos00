'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface ProgressBarProps {
  progress: number
  showLabel?: boolean
}

export function ProgressBar({ progress, showLabel = false }: ProgressBarProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let start = 0
    const duration = 1200
    const startTime = performance.now()

    const animate = (now: number) => {
      const elapsed = now - startTime
      const fraction = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - fraction, 3) // easeOutCubic
      start = Math.round(eased * progress)
      setDisplayValue(start)
      if (fraction < 1) requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)
  }, [isInView, progress])

  return (
    <div ref={ref} className="w-full">
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: '6px', backgroundColor: 'var(--border)' }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: '0%' }}
          animate={isInView ? { width: `${progress}%` } : { width: '0%' }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            background: 'linear-gradient(90deg, #6366f1, #8b5cf6)',
          }}
        />
      </div>
      {showLabel && (
        <span className="text-xs mt-1 block" style={{ color: 'var(--text-muted)' }}>
          {displayValue}%
        </span>
      )}
    </div>
  )
}

export default ProgressBar
