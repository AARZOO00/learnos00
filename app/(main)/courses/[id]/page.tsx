'use client'

import { motion } from 'framer-motion'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, Clock, BookOpen, CheckCircle, Circle, Play } from 'lucide-react'
import { ProgressBar } from '@/components/dashboard/ProgressBar'

const coursesData = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    icon_name: 'Code2',
    progress: 75,
    description: 'Master advanced React patterns including compound components, render props, custom hooks, and performance optimization techniques used in production apps.',
    color: '#00d9ff',
    bg: 'rgba(0,217,255,0.08)',
    totalLessons: 24,
    completedLessons: 18,
    estimatedTime: '12h 30m',
    modules: [
      { title: 'Compound Components Pattern', lessons: 4, done: true },
      { title: 'Render Props & HOCs',         lessons: 4, done: true },
      { title: 'Custom Hooks Deep Dive',       lessons: 6, done: true },
      { title: 'Performance Optimization',     lessons: 5, done: false },
      { title: 'Testing Patterns',             lessons: 5, done: false },
    ],
  },
  {
    id: '2',
    title: 'System Design Fundamentals',
    icon_name: 'Database',
    progress: 45,
    description: 'Learn how to design scalable systems. Covers load balancing, caching strategies, database sharding, microservices, and real-world architecture decisions.',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.08)',
    totalLessons: 20,
    completedLessons: 9,
    estimatedTime: '18h 00m',
    modules: [
      { title: 'Scalability Basics',        lessons: 4, done: true },
      { title: 'Database Design',           lessons: 5, done: true },
      { title: 'Caching Strategies',        lessons: 4, done: false },
      { title: 'Microservices Architecture',lessons: 4, done: false },
      { title: 'Real-world Case Studies',   lessons: 3, done: false },
    ],
  },
  {
    id: '3',
    title: 'TypeScript Mastery',
    icon_name: 'FileCode',
    progress: 90,
    description: 'Go beyond basic TypeScript. Advanced generics, conditional types, mapped types, declaration merging, and building type-safe libraries.',
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    totalLessons: 18,
    completedLessons: 16,
    estimatedTime: '1h 20m',
    modules: [
      { title: 'Advanced Generics',      lessons: 4, done: true },
      { title: 'Conditional Types',      lessons: 4, done: true },
      { title: 'Mapped & Utility Types', lessons: 4, done: true },
      { title: 'Declaration Merging',    lessons: 3, done: true },
      { title: 'Type-safe Libraries',    lessons: 3, done: false },
    ],
  },
  {
    id: '4',
    title: 'Node.js Backend Development',
    icon_name: 'Server',
    progress: 30,
    description: 'Build production-grade Node.js backends. REST APIs, GraphQL, authentication, database integration, testing, and deployment strategies.',
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.08)',
    totalLessons: 28,
    completedLessons: 8,
    estimatedTime: '22h 00m',
    modules: [
      { title: 'REST API Design',        lessons: 5, done: true },
      { title: 'Authentication & Auth',  lessons: 6, done: false },
      { title: 'Database Integration',   lessons: 6, done: false },
      { title: 'GraphQL Basics',         lessons: 5, done: false },
      { title: 'Testing & Deployment',   lessons: 6, done: false },
    ],
  },
]

const contV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
}
const itemV = {
  hidden:   { opacity: 0, y: 16 },
  visible:  { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 28 } },
}

export default function CourseDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router  = useRouter()
  const course  = coursesData.find(c => c.id === id)

  if (!course) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontFamily: 'JetBrains Mono', color: '#f43f5e', fontSize: '14px' }}>! Course not found</p>
          <button onClick={() => router.back()} style={{ marginTop: '16px', background: 'none', border: 'none', color: '#00d9ff', cursor: 'pointer', fontFamily: 'Space Grotesk' }}>
            ← Go back
          </button>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen px-4 py-8 md:px-6 lg:px-8" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-3xl mx-auto">

        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -3 }}
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'Space Grotesk', fontSize: '13px', color: '#3d4f6b',
          }}
        >
          <ArrowLeft size={14} /> Back to Courses
        </motion.button>

        <motion.div variants={contV} initial="hidden" animate="visible" className="space-y-4">

          {/* Hero card */}
          <motion.div
            variants={itemV}
            className="rounded-2xl p-6 md:p-8 relative overflow-hidden noise-overlay"
            style={{ background: 'var(--bg-card)', border: `1px solid ${course.color}20` }}
          >
            <div className="absolute inset-0 pointer-events-none" style={{
              background: `radial-gradient(ellipse at 0% 0%, ${course.bg} 0%, transparent 60%)`,
              borderRadius: 'inherit',
            }} />
            <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none" style={{
              background: `radial-gradient(circle, ${course.color}15, transparent 70%)`,
              filter: 'blur(16px)',
            }} />

            <div className="relative z-10">
              {/* Breadcrumb */}
              <p style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#3d4f6b', marginBottom: '14px' }}>
                &gt; courses / <span style={{ color: course.color }}>{course.id}</span>
              </p>

              <h1 style={{
                fontFamily: 'Space Grotesk', fontWeight: 700,
                fontSize: 'clamp(20px,4vw,28px)', color: '#e8f0fe',
                letterSpacing: '-0.02em', marginBottom: '10px',
              }}>
                {course.title}
              </h1>

              <p style={{ fontSize: '13px', color: '#8b9ab5', lineHeight: 1.65, marginBottom: '20px' }}>
                {course.description}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap gap-3 mb-5">
                {[
                  { icon: BookOpen, label: `${course.totalLessons} Lessons`,            color: course.color },
                  { icon: CheckCircle, label: `${course.completedLessons} Completed`,   color: '#10b981'    },
                  { icon: Clock, label: course.estimatedTime + ' left',                 color: '#f59e0b'    },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                    style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid #1a2540' }}>
                    <s.icon size={12} style={{ color: s.color }} />
                    <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#8b9ab5' }}>
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Progress */}
              <div className="mb-5">
                <div className="flex justify-between mb-2">
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#3d4f6b' }}>
                    Overall Progress
                  </span>
                  <span style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: course.color }}>
                    {course.progress}%
                  </span>
                </div>
                <ProgressBar progress={course.progress} color={course.color} />
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${course.color}25` }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl"
                style={{
                  fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '13px',
                  color: course.color,
                  background: course.bg,
                  border: `1px solid ${course.color}30`,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <Play size={13} fill={course.color} /> Continue Learning
              </motion.button>
            </div>
          </motion.div>

          {/* Modules */}
          <motion.div
            variants={itemV}
            className="rounded-2xl p-5 noise-overlay"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '15px', color: '#e8f0fe', marginBottom: '14px' }}>
              Course Modules
            </h2>

            <div className="space-y-2">
              {course.modules.map((mod, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.07, type: 'spring', stiffness: 300, damping: 26 }}
                  whileHover={{ x: 3, transition: { type: 'spring', stiffness: 400, damping: 20 } }}
                  className="flex items-center gap-3 p-3.5 rounded-xl cursor-pointer"
                  style={{
                    background: mod.done ? `${course.bg}` : 'rgba(0,0,0,0.2)',
                    border: mod.done ? `1px solid ${course.color}20` : '1px solid #1a2540',
                    transition: 'background 0.2s',
                  }}
                >
                  {mod.done
                    ? <CheckCircle size={16} style={{ color: course.color, flexShrink: 0 }} />
                    : <Circle     size={16} style={{ color: '#3d4f6b',    flexShrink: 0 }} />
                  }
                  <div className="flex-1 min-w-0">
                    <p style={{
                      fontFamily: 'Space Grotesk', fontWeight: 500, fontSize: '13px',
                      color: mod.done ? '#e8f0fe' : '#8b9ab5',
                    }}>
                      {mod.title}
                    </p>
                    <p style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#3d4f6b', marginTop: '2px' }}>
                      {mod.lessons} lessons
                    </p>
                  </div>
                  <span style={{
                    fontFamily: 'JetBrains Mono', fontSize: '10px',
                    color: mod.done ? course.color : '#3d4f6b',
                    flexShrink: 0,
                  }}>
                    {mod.done ? 'Done ✓' : 'Locked'}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </main>
  )
}