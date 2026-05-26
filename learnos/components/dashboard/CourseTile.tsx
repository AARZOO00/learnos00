'use client'

import * as LucideIcons from 'lucide-react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Course } from '@/lib/types'
import { ProgressBar } from './ProgressBar'

interface CourseTileProps {
  course: Course
  index: number
}

export function CourseTile({ course, index }: CourseTileProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconComponent = (LucideIcons as any)[course.icon_name] ?? LucideIcons.BookOpen

  const iconColors = [
    { bg: 'rgba(99,102,241,0.15)', color: '#6366f1' },
    { bg: 'rgba(139,92,246,0.15)', color: '#8b5cf6' },
    { bg: 'rgba(6,182,212,0.15)', color: '#06b6d4' },
    { bg: 'rgba(16,185,129,0.15)', color: '#10b981' },
  ]

  const colorScheme = iconColors[index % iconColors.length]

  return (
    <motion.article
      whileHover={{
        scale: 1.02,
        boxShadow: '0 0 30px rgba(99,102,241,0.15)',
        borderColor: '#6366f1',
        transition: { type: 'spring', stiffness: 300, damping: 20 },
      }}
      whileTap={{ scale: 0.98 }}
      className="relative rounded-2xl p-6 overflow-hidden grain cursor-pointer"
      style={{
        backgroundColor: 'var(--card)',
        border: '1px solid var(--border)',
        transition: 'border-color 0.2s',
      }}
    >
      {/* Radial gradient mesh */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 20% 20%, ${colorScheme.color}13, transparent 60%)`,
          borderRadius: 'inherit',
        }}
      />

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
        style={{ backgroundColor: colorScheme.bg }}
      >
        <IconComponent size={18} style={{ color: colorScheme.color }} strokeWidth={2} />
      </div>

      {/* Title */}
      <h3
        className="font-semibold text-base mb-1 leading-snug"
        style={{ color: 'var(--text-primary)' }}
      >
        {course.title}
      </h3>

      {/* Badge */}
      <span
        className="inline-block text-xs px-2 py-0.5 rounded-full mb-4 font-medium"
        style={{
          backgroundColor: `${colorScheme.color}15`,
          color: colorScheme.color,
          border: `1px solid ${colorScheme.color}30`,
        }}
      >
        In Progress
      </span>

      {/* Progress bar */}
      <ProgressBar progress={course.progress} />

      {/* Footer */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-xs font-medium" style={{ color: 'var(--text-muted)' }}>
          {course.progress}% complete
        </span>
        <motion.button
          whileHover={{ x: 2 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="flex items-center gap-1 text-xs font-medium"
          style={{ color: colorScheme.color }}
        >
          Continue
          <ArrowRight size={12} />
        </motion.button>
      </div>
    </motion.article>
  )
}

export default CourseTile
