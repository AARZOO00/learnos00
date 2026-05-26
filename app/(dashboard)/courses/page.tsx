'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef } from 'react'
import * as LucideIcons from 'lucide-react'
import { ArrowRight, Clock, Search, Filter } from 'lucide-react'
import { ProgressBar } from '@/components/dashboard/ProgressBar'

const courses = [
  { id:'1', title:'Advanced React Patterns',     progress:75, icon_name:'Code2',    time:'2h 30m', status:'in-progress', description:'Hooks, patterns, and performance optimization' },
  { id:'2', title:'System Design Fundamentals',  progress:45, icon_name:'Database', time:'3h 10m', status:'in-progress', description:'Scalability, distributed systems, and architecture' },
  { id:'3', title:'TypeScript Mastery',          progress:90, icon_name:'FileCode', time:'0h 50m', status:'completed',   description:'Advanced types, generics, and type inference' },
  { id:'4', title:'Node.js Backend Dev',         progress:30, icon_name:'Server',   time:'4h 00m', status:'in-progress', description:'REST APIs, authentication, and databases' },
]

const colorThemes = [
  { accent:'#00d9ff', iconBg:'rgba(0,217,255,0.1)',   gradFrom:'rgba(0,217,255,0.06)',   borderH:'rgba(0,217,255,0.35)',   glow:'rgba(0,217,255,0.12)'   },
  { accent:'#7c3aed', iconBg:'rgba(124,58,237,0.1)',  gradFrom:'rgba(124,58,237,0.08)',  borderH:'rgba(124,58,237,0.4)',   glow:'rgba(124,58,237,0.15)'  },
  { accent:'#10b981', iconBg:'rgba(16,185,129,0.1)',  gradFrom:'rgba(16,185,129,0.06)',  borderH:'rgba(16,185,129,0.35)', glow:'rgba(16,185,129,0.12)'  },
  { accent:'#f59e0b', iconBg:'rgba(245,158,11,0.1)',  gradFrom:'rgba(245,158,11,0.06)',  borderH:'rgba(245,158,11,0.35)', glow:'rgba(245,158,11,0.12)'  },
]

const tabs = [
  { key:'all', label:'All', count: courses.length },
  { key:'in-progress', label:'In Progress', count: courses.filter(c=>c.status==='in-progress').length },
  { key:'completed',   label:'Completed',   count: courses.filter(c=>c.status==='completed').length },
]

const containerV = { hidden:{}, visible:{ transition:{ staggerChildren:0.09, delayChildren:0.1 } } }
const itemV = { hidden:{ opacity:0, y:20 }, visible:{ opacity:1, y:0, transition:{ type:'spring', stiffness:300, damping:28 } } }

export default function CoursesPage() {
  const [selected, setSelected] = useState('all')
  const [search, setSearch] = useState('')
  const filtered = courses
    .filter(c => selected === 'all' || c.status === selected)
    .filter(c => c.title.toLowerCase().includes(search.toLowerCase()))

  return (
    <main className="min-h-screen px-4 py-8 md:px-6 lg:px-8" style={{ background:'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <p style={{ fontFamily:'JetBrains Mono', fontSize:'11px', color:'#3d4f6b', marginBottom:'12px' }}>
          &gt; dashboard / <span style={{ color:'#00d9ff' }}>courses</span>
        </p>

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <h1 style={{ fontFamily:'Space Grotesk', fontWeight:700, fontSize:'clamp(22px,4vw,30px)', color:'#e8f0fe', letterSpacing:'-0.02em' }}>
              My Courses
            </h1>
            <span style={{
              fontFamily:'JetBrains Mono', fontSize:'11px', color:'#00d9ff',
              background:'rgba(0,217,255,0.08)', border:'1px solid rgba(0,217,255,0.2)',
              borderRadius:'99px', padding:'2px 10px',
            }}>{filtered.length}</span>
          </div>
          {/* Search */}
          <div className="relative">
            <Search size={13} style={{ position:'absolute', left:'12px', top:'50%', transform:'translateY(-50%)', color:'#3d4f6b' }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search courses..."
              style={{
                fontFamily:'JetBrains Mono', fontSize:'12px',
                background:'rgba(0,0,0,0.3)', border:'1px solid #1a2540',
                borderRadius:'10px', padding:'8px 12px 8px 32px',
                color:'#8b9ab5', outline:'none', width:'200px',
              }}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 relative">
          {tabs.map(tab => (
            <button
              key={tab.key}
              onClick={() => setSelected(tab.key)}
              style={{
                position:'relative', fontFamily:'Space Grotesk', fontWeight:500, fontSize:'13px',
                padding:'7px 16px', borderRadius:'10px', border:'none',
                color: selected === tab.key ? '#00d9ff' : '#3d4f6b',
                background: selected === tab.key ? 'rgba(0,217,255,0.08)' : 'transparent',
                cursor:'pointer', transition:'color 0.2s',
                outline: selected === tab.key ? '1px solid rgba(0,217,255,0.25)' : '1px solid transparent',
              }}
            >
              {tab.label}
              {tab.count > 0 && (
                <span style={{ marginLeft:'6px', fontFamily:'JetBrains Mono', fontSize:'10px', color: selected===tab.key ? '#00d9ff' : '#3d4f6b' }}>
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Course Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selected + search}
            variants={containerV}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-5"
          >
            {filtered.map((course, i) => {
              const theme = colorThemes[courses.findIndex(c=>c.id===course.id) % colorThemes.length]
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const Icon = (LucideIcons as any)[course.icon_name] ?? LucideIcons.BookOpen
              return (
                <motion.article
                  key={course.id}
                  variants={itemV}
                  whileHover={{ scale:1.02, y:-4, boxShadow:`0 20px 40px ${theme.glow}, 0 0 0 1px ${theme.borderH}`, transition:{ type:'spring', stiffness:300, damping:20 } }}
                  whileTap={{ scale:0.98 }}
                  className="relative rounded-2xl p-5 overflow-hidden cursor-pointer noise-overlay"
                  style={{ background:'var(--bg-card)', border:'1px solid var(--border)' }}
                >
                  <div className="absolute inset-0 pointer-events-none" style={{ background:`linear-gradient(135deg, ${theme.gradFrom} 0%, transparent 55%)`, borderRadius:'inherit' }} />
                  <div className="absolute -top-5 -right-5 w-20 h-20 rounded-full pointer-events-none" style={{ background:`radial-gradient(circle, ${theme.accent}18, transparent 70%)`, filter:'blur(10px)' }} />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background:theme.iconBg, border:`1px solid ${theme.accent}25` }}>
                        <Icon size={19} style={{ color:theme.accent }} strokeWidth={2} />
                      </div>
                      <span style={{ fontFamily:'JetBrains Mono', fontSize:'11px', color:theme.accent, opacity:0.65 }}>
                        {course.progress}%
                      </span>
                    </div>
                    <h3 style={{ fontFamily:'Space Grotesk', fontWeight:600, fontSize:'14.5px', color:'#e8f0fe', lineHeight:1.3, marginBottom:'6px' }}>
                      {course.title}
                    </h3>
                    <p style={{ fontSize:'11px', color:'#3d4f6b', marginBottom:'14px', lineHeight:1.5 }}>
                      {course.description}
                    </p>
                    <ProgressBar progress={course.progress} color={theme.accent} />
                    <div className="flex items-center justify-between mt-3 mb-4">
                      <span style={{ fontFamily:'JetBrains Mono', fontSize:'10px', color:'#3d4f6b' }}>
                        {course.progress}% done
                      </span>
                      <span style={{ fontFamily:'JetBrains Mono', fontSize:'10px', color:'#3d4f6b', display:'flex', alignItems:'center', gap:'3px' }}>
                        <Clock size={9} /> {course.time} left
                      </span>
                    </div>
                    <motion.button
                      whileHover={{ x:2 }}
                      transition={{ type:'spring', stiffness:400, damping:20 }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl"
                      style={{
                        fontFamily:'Space Grotesk', fontWeight:600, fontSize:'13px',
                        color: theme.accent,
                        background: `${theme.iconBg}`,
                        border:`1px solid ${theme.accent}20`,
                      }}
                    >
                      Continue <ArrowRight size={13} />
                    </motion.button>
                  </div>
                </motion.article>
              )
            })}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div style={{ textAlign:'center', padding:'60px', color:'#3d4f6b', fontFamily:'JetBrains Mono', fontSize:'13px' }}>
            No courses found.
          </div>
        )}
      </div>
    </main>
  )
}
