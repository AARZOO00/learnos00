'use client'

import { motion } from 'framer-motion'
import { Course } from '@/lib/types'
import { HeroTile } from '@/components/dashboard/HeroTile'
import { CourseTile } from '@/components/dashboard/CourseTile'
import { ActivityTile } from '@/components/dashboard/ActivityTile'
import { AlertCircle } from 'lucide-react'

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
}

interface BentoGridProps {
  courses: Course[]
  error?: string | null
}

export function BentoGrid({ courses, error }: BentoGridProps) {
  // Use fallback courses if Supabase isn't configured
  const displayCourses: Course[] =
    courses.length > 0
      ? courses
      : [
          { id: '1', title: 'Advanced React Patterns', progress: 75, icon_name: 'Code2', created_at: '' },
          { id: '2', title: 'System Design Fundamentals', progress: 45, icon_name: 'Database', created_at: '' },
          { id: '3', title: 'TypeScript Mastery', progress: 90, icon_name: 'FileCode', created_at: '' },
          { id: '4', title: 'Node.js Backend Development', progress: 30, icon_name: 'Server', created_at: '' },
        ]

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
    >
      {/* Error banner if Supabase returned error */}
      {error && (
        <motion.div
          variants={itemVariants}
          className="col-span-1 md:col-span-2 lg:col-span-3 flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
          style={{
            backgroundColor: 'rgba(99,102,241,0.08)',
            border: '1px solid rgba(99,102,241,0.2)',
            color: 'var(--text-muted)',
          }}
        >
          <AlertCircle size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
          <span>Using demo data — Supabase not connected: {error}</span>
        </motion.div>
      )}

      {/* Hero tile — full width */}
      <motion.div
        variants={itemVariants}
        className="col-span-1 md:col-span-2 lg:col-span-3"
      >
        <HeroTile />
      </motion.div>

      {/* Course tiles */}
      {displayCourses.map((course, index) => (
        <motion.div key={course.id} variants={itemVariants}>
          <CourseTile course={course} index={index} />
        </motion.div>
      ))}

      {/* Activity tile — spans 2 cols on lg, full on md */}
      <motion.div
        variants={itemVariants}
        className="col-span-1 md:col-span-2"
      >
        <ActivityTile />
      </motion.div>
    </motion.section>
  )
}

export default BentoGrid
