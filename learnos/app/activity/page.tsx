'use client'
import { motion } from 'framer-motion'
import { Calendar, Flame, TrendingUp, Clock, BarChart2 } from 'lucide-react'

const stats = [
  { label: 'Total Sessions', value: 21, icon: <Calendar size={20} /> },
  { label: 'Hours Studied', value: 47, icon: <Clock size={20} /> },
  { label: 'Current Streak', value: '5 days', icon: <Flame size={20} /> },
  { label: 'Longest Streak', value: '12 days', icon: <TrendingUp size={20} /> },
]

const activities = [
  { text: 'Completed React Hooks module', time: '2 hours ago' },
  { text: 'Started System Design chapter 3', time: 'Yesterday' },
  { text: 'Finished TypeScript generics quiz', time: '2 days ago' },
  { text: 'Watched Node.js authentication video', time: '3 days ago' },
  { text: 'Reviewed Advanced React patterns', time: '4 days ago' },
]

export default function ActivityPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] px-4 py-8">
      <article className="max-w-5xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[#e2e8f0] mb-8">Learning Activity</h1>
        <motion.section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          {stats.map((stat, i) => (
            <motion.div key={stat.label} className="bg-[#111118] rounded-xl p-5 flex flex-col items-center border border-[#1e1e2e]" variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } } }}>
              <span className="mb-2 text-[#6366f1]">{stat.icon}</span>
              <span className="text-2xl font-bold text-[#e2e8f0]">{stat.value}</span>
              <span className="text-xs text-[#64748b] mt-1">{stat.label}</span>
            </motion.div>
          ))}
        </motion.section>
        <motion.section className="mb-8" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
          <h2 className="text-lg font-semibold text-[#e2e8f0] mb-4">28-Day Contribution Graph</h2>
          <div className="w-full h-32 bg-[#111118] rounded-xl border border-[#1e1e2e] flex items-center justify-center text-[#64748b] mb-6">
            <span>Bigger Contribution Graph (mockup)</span>
          </div>
          <h2 className="text-lg font-semibold text-[#e2e8f0] mb-4">Weekly Study Hours</h2>
          <div className="w-full h-32 bg-[#111118] rounded-xl border border-[#1e1e2e] flex items-center justify-center text-[#64748b] mb-6">
            <span>Weekly Bar Chart (mockup)</span>
          </div>
        </motion.section>
        <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
          <h2 className="text-lg font-semibold text-[#e2e8f0] mb-4">Recent Activity</h2>
          <ul className="space-y-3">
            {activities.map((a, i) => (
              <li key={i} className="flex items-center gap-3 bg-[#111118] rounded-lg px-4 py-3 border border-[#1e1e2e]">
                <BarChart2 size={18} className="text-[#6366f1]" />
                <span className="text-[#e2e8f0] font-medium">{a.text}</span>
                <span className="ml-auto text-xs text-[#64748b]">{a.time}</span>
              </li>
            ))}
          </ul>
        </motion.section>
      </article>
    </main>
  )
}
