'use client'

import * as LucideIcons from 'lucide-react'
import { motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { Course } from '@/lib/types'
import { ProgressBar } from './ProgressBar'
import { supabase } from '@/lib/supabase'
interface CourseTileProps {
  course: Course
  index: number
}

const colorThemes = [
  { accent: '#00d9ff', gradFrom: 'rgba(0,217,255,0.07)', iconBg: 'rgba(0,217,255,0.1)', borderHover: 'rgba(0,217,255,0.35)', glow: 'rgba(0,217,255,0.12)', progressColor: '#00d9ff' },
  { accent: '#7c3aed', gradFrom: 'rgba(124,58,237,0.09)', iconBg: 'rgba(124,58,237,0.1)', borderHover: 'rgba(124,58,237,0.4)',  glow: 'rgba(124,58,237,0.15)', progressColor: '#7c3aed' },
  { accent: '#10b981', gradFrom: 'rgba(16,185,129,0.07)', iconBg: 'rgba(16,185,129,0.1)', borderHover: 'rgba(16,185,129,0.35)', glow: 'rgba(16,185,129,0.12)', progressColor: '#10b981' },
  { accent: '#f59e0b', gradFrom: 'rgba(245,158,11,0.07)', iconBg: 'rgba(245,158,11,0.1)', borderHover: 'rgba(245,158,11,0.35)', glow: 'rgba(245,158,11,0.12)', progressColor: '#f59e0b' },
]

const lastActive = ['2 hours ago', '1 day ago', '3 days ago', '5 days ago']

function getStatusLabel(progress: number) {
  if (progress >= 80) return { text: 'Almost Done 🎯', color: '#10b981', bg: 'rgba(16,185,129,0.08)' }
  if (progress >= 50) return { text: 'Halfway There', color: '#00d9ff',  bg: 'rgba(0,217,255,0.08)'   }
  return                     { text: 'Just Started',  color: '#f59e0b',  bg: 'rgba(245,158,11,0.08)'   }
}

export function CourseTile({ course, index }: CourseTileProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[course.icon_name] ?? LucideIcons.BookOpen
  const theme = colorThemes[index % colorThemes.length]
  const status = getStatusLabel(course.progress)

  return (
    <motion.article
      whileHover={{
        scale: 1.02,
        y: -4,
        boxShadow: `0 20px 40px ${theme.glow}, 0 0 0 1px ${theme.borderHover}`,
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      whileTap={{ scale: 0.98 }}
      className="relative rounded-2xl p-5 overflow-hidden noise-overlay cursor-pointer"
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        transition: 'border-color 0.25s',
      }}
    >
      {/* Diagonal gradient */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `linear-gradient(135deg, ${theme.gradFrom} 0%, transparent 55%)`,
        borderRadius: 'inherit',
      }} />
      {/* Top-right orb */}
      <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none" style={{
        background: `radial-gradient(circle, ${theme.accent}18, transparent 70%)`,
        filter: 'blur(12px)',
      }} />
      {/* Progress % badge top-right */}
      <div className="absolute top-4 right-4" style={{
        fontFamily: 'JetBrains Mono',
        fontSize: '11px',
        color: theme.accent,
        opacity: 0.65,
      }}>
        {course.progress}%
      </div>

      <div className="relative z-10">
        {/* Icon */}
        <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{
          background: theme.iconBg,
          border: `1px solid ${theme.accent}25`,
        }}>
          <IconComponent size={19} style={{ color: theme.accent }} strokeWidth={2} />
        </div>

        {/* Title */}
        <h3 style={{
          fontFamily: 'Space Grotesk',
          fontWeight: 600,
          fontSize: '14.5px',
          color: '#e8f0fe',
          lineHeight: 1.35,
          marginBottom: '10px',
          paddingRight: '30px',
        }}>
          {course.title}
        </h3>

        {/* Status badge */}
        <span style={{
          display: 'inline-block',
          fontFamily: 'Space Grotesk',
          fontWeight: 500,
          fontSize: '11px',
          padding: '3px 10px',
          borderRadius: '99px',
          marginBottom: '14px',
          color: status.color,
          background: status.bg,
          border: `1px solid ${status.color}25`,
        }}>
          {status.text}
        </span>

        {/* Last active */}
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#3d4f6b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
          <Clock size={9} style={{ opacity: 0.6 }} />
          {lastActive[index % lastActive.length]}
        </p>

        {/* Progress bar */}
        <ProgressBar progress={course.progress} color={theme.progressColor} />

        {/* Footer */}
        <div className="flex items-center justify-between mt-3">
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#3d4f6b' }}>
            {course.progress}% complete
          </span>
          <motion.div
            whileHover={{ x: 3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            className="flex items-center gap-1"
            style={{ fontFamily: 'Space Grotesk', fontWeight: 500, fontSize: '12px', color: theme.accent }}
          >
            Continue <ArrowRight size={11} />
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}

export default CourseTile
