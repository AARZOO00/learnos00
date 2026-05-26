'use client'

import { motion } from 'framer-motion'
import { Course } from '@/lib/types'
import { HeroTile } from '@/components/dashboard/HeroTile'
import { CourseTile } from '@/components/dashboard/CourseTile'
import { ActivityTile } from '@/components/dashboard/ActivityTile'
import { Terminal } from 'lucide-react'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
}
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
}

const FALLBACK_COURSES: Course[] = [
  { id:'1', title:'Advanced React Patterns',      progress:75, icon_name:'Code2',    created_at:'' },
  { id:'2', title:'System Design Fundamentals',   progress:45, icon_name:'Database', created_at:'' },
  { id:'3', title:'TypeScript Mastery',           progress:90, icon_name:'FileCode', created_at:'' },
  { id:'4', title:'Node.js Backend Development',  progress:30, icon_name:'Server',   created_at:'' },
]

interface BentoGridProps { courses: Course[]; error?: string | null }

export function BentoGrid({ courses, error }: BentoGridProps) {
  const displayCourses = courses.length > 0 ? courses : FALLBACK_COURSES

  return (
    <motion.section variants={containerVariants} initial="hidden" animate="visible" className="space-y-4 md:space-y-5">
      {/* Error banner */}
      {error && (
        <motion.div variants={itemVariants}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
          style={{ background: 'rgba(0,217,255,0.04)', border: '1px solid rgba(0,217,255,0.12)', color: '#8b9ab5' }}
        >
          <Terminal size={14} style={{ color: '#00d9ff', flexShrink: 0 }} />
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px' }}>
            <span style={{ color: '#00d9ff' }}>$ warn: </span>demo mode — {error}
          </span>
        </motion.div>
      )}

      {/* Hero — full width */}
      <motion.div variants={itemVariants}>
        <HeroTile />
      </motion.div>

      {/* Courses — responsive grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
        {displayCourses.map((course, i) => (
          <motion.div key={course.id} variants={itemVariants}>
            <CourseTile course={course} index={i} />
          </motion.div>
        ))}
      </div>

      {/* Activity — full width */}
      <motion.div variants={itemVariants}>
        <ActivityTile />
      </motion.div>
    </motion.section>
  )
}

export default BentoGrid
