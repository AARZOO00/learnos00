'use client'

import { Suspense } from 'react'
import { motion } from 'framer-motion'
import { BookOpen, Code2, Database, FileCode, Server } from 'lucide-react'
import React from 'react'

const courses = [
  { id: '1', title: 'Advanced React Patterns', progress: 75, icon: <Code2 size={32} />, time: '2h 30m', status: 'in-progress' },
  { id: '2', title: 'System Design Fundamentals', progress: 45, icon: <Database size={32} />, time: '3h 10m', status: 'in-progress' },
  { id: '3', title: 'TypeScript Mastery', progress: 90, icon: <FileCode size={32} />, time: '1h 50m', status: 'completed' },
  { id: '4', title: 'Node.js Backend Development', progress: 30, icon: <Server size={32} />, time: '4h 00m', status: 'in-progress' },
]

const filterTabs = [
  { key: 'all', label: 'All' },
  { key: 'in-progress', label: 'In Progress' },
  { key: 'completed', label: 'Completed' },
]

function FilterTabs({ selected, setSelected }: { selected: string, setSelected: (v: string) => void }) {
  return (
    <div className="flex gap-2 mb-6">
      {filterTabs.map(tab => (
        <button
          key={tab.key}
          className={`px-4 py-1.5 rounded-lg font-medium transition-colors text-sm border border-[#1e1e2e] ${selected === tab.key ? 'bg-[#6366f1] text-white' : 'bg-[#111118] text-[#e2e8f0]'}`}
          onClick={() => setSelected(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="w-full h-2 bg-[#1e1e2e] rounded-full overflow-hidden mt-2 mb-1">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="h-full bg-[#6366f1] rounded-full"
      />
    </div>
  )
}

export default function CoursesPage() {
  const [selected, setSelected] = React.useState('all')
  const filtered = selected === 'all' ? courses : courses.filter(c => c.status === selected)

  return (
    <main className="min-h-screen bg-[#0a0a0f] px-4 py-8">
      <article className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#e2e8f0]">My Courses</h1>
          <span className="bg-[#111118] text-[#6366f1] text-xs font-semibold px-3 py-1 rounded-full border border-[#1e1e2e]">{filtered.length}</span>
        </div>
        <FilterTabs selected={selected} setSelected={setSelected} />
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
        >
          {filtered.map((course, i) => (
            <motion.div
              key={course.id}
              className="bg-[#111118] rounded-2xl p-6 flex flex-col shadow-md border border-[#1e1e2e]"
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } } }}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="bg-[#6366f1]/10 rounded-lg p-2">
                  {course.icon}
                </span>
                <span className="font-semibold text-lg text-[#e2e8f0]">{course.title}</span>
              </div>
              <ProgressBar value={course.progress} />
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-[#64748b]">{course.progress}% complete</span>
                <span className="text-xs text-[#64748b]">{course.time} left</span>
              </div>
              <button className="mt-4 bg-[#6366f1] text-white rounded-lg py-2 font-medium text-sm transition hover:bg-[#7c82f6]">Continue</button>
            </motion.div>
          ))}
        </motion.section>
      </article>
    </main>
  )
}
