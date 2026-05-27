'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Edit3, Check } from 'lucide-react'
import { useAuth } from '@/lib/auth'

const stats = [
  { label: 'Courses', value: '4', color: '#00d9ff', bg: 'rgba(0,217,255,0.08)' },
  { label: 'XP Earned', value: '284', color: '#7c3aed', bg: 'rgba(124,58,237,0.08)' },
  { label: 'Day Streak', value: '12', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
  { label: 'Percentile', value: 'Top 12%', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
]

const skills = [
  { label: 'React', color: '#00d9ff', bg: 'rgba(0,217,255,0.08)' },
  { label: 'TypeScript', color: '#7c3aed', bg: 'rgba(124,58,237,0.08)' },
  { label: 'Node.js', color: '#10b981', bg: 'rgba(16,185,129,0.08)' },
  { label: 'System Design', color: '#f59e0b', bg: 'rgba(245,158,11,0.08)' },
  { label: 'Next.js', color: '#00d9ff', bg: 'rgba(0,217,255,0.06)' },
  { label: 'Databases', color: '#7c3aed', bg: 'rgba(124,58,237,0.06)' },
]

const badges = [
  { emoji: '🔥', title: '7 Day Streak', desc: 'Studied 7 days in a row', color: '#f59e0b', bg: 'rgba(245,158,11,0.06)', border: 'rgba(245,158,11,0.2)' },
  { emoji: '⚡', title: 'Fast Learner', desc: 'Completed 2 modules in a day', color: '#00d9ff', bg: 'rgba(0,217,255,0.06)', border: 'rgba(0,217,255,0.2)' },
  { emoji: '🎯', title: 'Goal Setter', desc: 'Set and reached a weekly goal', color: '#10b981', bg: 'rgba(16,185,129,0.06)', border: 'rgba(16,185,129,0.2)' },
]

const contV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const itemV = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 28 },
  },
}

export default function ProfilePage() {
  const { user } = useAuth()

  const displayName = user?.name || user?.email || 'Student'
  const displayEmail = user?.email || 'student@example.com'

  const initials = displayName
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const [bio, setBio] = useState(
    'Passionate about web development and lifelong learning. Building cool things one commit at a time.'
  )
  const [editing, setEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  function handleSaveBio() {
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <main className="min-h-screen px-4 py-8 md:px-6 lg:px-8" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-3xl mx-auto">
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: 'var(--text-muted)', marginBottom: '12px' }}>
          &gt; dashboard / <span style={{ color: '#00d9ff' }}>profile</span>
        </p>

        <motion.div variants={contV} initial="hidden" animate="visible" className="space-y-4">
          <motion.div
            variants={itemV}
            className="rounded-2xl p-6 md:p-8 noise-overlay relative overflow-hidden"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  'radial-gradient(ellipse at 0% 0%, rgba(0,217,255,0.07) 0%, transparent 55%), radial-gradient(ellipse at 100% 100%, rgba(124,58,237,0.07) 0%, transparent 55%)',
                borderRadius: 'inherit',
              }}
            />

            <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
              <div className="relative flex-shrink-0">
                <div
                  className="w-24 h-24 rounded-full p-[2px]"
                  style={{
                    background: 'linear-gradient(135deg, #00d9ff, #7c3aed, #00d9ff)',
                    backgroundSize: '200% 200%',
                    animation: 'rotateGradient 4s linear infinite',
                  }}
                >
                  <div className="w-full h-full rounded-full flex items-center justify-center" style={{ background: 'var(--bg-card)' }}>
                    <span
                      style={{
                        fontFamily: 'Space Grotesk',
                        fontWeight: 700,
                        fontSize: '24px',
                        background: 'linear-gradient(135deg, #00d9ff, #7c3aed)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}
                    >
                      {initials}
                    </span>
                  </div>
                </div>

                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2"
                  style={{ background: '#10b981', borderColor: 'var(--bg-card)', boxShadow: '0 0 8px rgba(16,185,129,0.5)' }}
                />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h1 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '26px', color: 'var(--text-primary)' }}>
                  {displayName}
                </h1>

                <p style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#00d9ff', marginTop: '4px' }}>
                  Student · Level 7
                </p>

                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
                  {displayEmail}
                </p>

                <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-5">
                  {stats.map((s) => (
                    <motion.div
                      key={s.label}
                      whileHover={{ scale: 1.05, y: -2 }}
                      className="flex flex-col items-center px-4 py-2.5 rounded-xl"
                      style={{ background: 'var(--input-bg)', border: `1px solid ${s.bg.replace('0.08', '0.18')}` }}
                    >
                      <span style={{ fontFamily: 'JetBrains Mono', fontWeight: 600, fontSize: '16px', color: s.color }}>
                        {s.value}
                      </span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginTop: '2px' }}>{s.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemV} className="rounded-2xl p-5 noise-overlay" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>About</h2>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => (editing ? handleSaveBio() : setEditing(true))}
                style={{
                  fontFamily: 'Space Grotesk',
                  fontWeight: 500,
                  fontSize: '12px',
                  color: saved ? '#10b981' : '#00d9ff',
                  background: saved ? 'rgba(16,185,129,0.08)' : 'rgba(0,217,255,0.08)',
                  border: saved ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(0,217,255,0.2)',
                  borderRadius: '8px',
                  padding: '5px 12px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                {saved ? <><Check size={11} /> Saved</> : editing ? <><Check size={11} /> Save</> : <><Edit3 size={11} /> Edit</>}
              </motion.button>
            </div>

            {editing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                title="Profile bio"
                placeholder="Write a short bio..."
                aria-label="Profile bio"
                className="w-full text-[13px] bg-[var(--input-bg)] border border-[rgba(0,217,255,0.3)] rounded-[10px] px-[14px] py-[10px] text-[var(--text-secondary)] outline-none resize-none leading-[1.6]"
              />
            ) : (
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.65 }}>{bio}</p>
            )}
          </motion.div>

          <motion.div variants={itemV} className="rounded-2xl p-5 noise-overlay" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)', marginBottom: '14px' }}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((s) => (
                <span
                  key={s.label}
                  style={{
                    fontFamily: 'Space Grotesk',
                    fontWeight: 500,
                    fontSize: '12px',
                    color: s.color,
                    background: s.bg,
                    border: `1px solid ${s.color}25`,
                    borderRadius: '8px',
                    padding: '5px 14px',
                  }}
                >
                  {s.label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemV} className="rounded-2xl p-5 noise-overlay" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
            <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)', marginBottom: '14px' }}>
              Achievements
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {badges.map((b) => (
                <motion.div
                  key={b.title}
                  whileHover={{ scale: 1.04, y: -3 }}
                  className="relative rounded-xl p-4 overflow-hidden"
                  style={{ background: b.bg, border: `1px solid ${b.border}` }}
                >
                  <div style={{ fontSize: '22px', marginBottom: '8px' }}>{b.emoji}</div>
                  <p style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '13px', color: b.color }}>{b.title}</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '3px', lineHeight: 1.4 }}>{b.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  )
}