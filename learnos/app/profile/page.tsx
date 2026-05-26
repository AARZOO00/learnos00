'use client'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

const skills = ['React', 'TypeScript', 'Node.js', 'System Design']
const badges = [
  { icon: '🔥', label: '7 Day Streak' },
  { icon: '⚡', label: 'Fast Learner' },
  { icon: '🎯', label: 'Goal Setter' },
]

export default function ProfilePage() {
  const [bio, setBio] = useState('Passionate about web development and lifelong learning.')
  return (
    <main className="min-h-screen bg-[#0a0a0f] px-4 py-8">
      <article className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[#e2e8f0] mb-8">Profile</h1>
        <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="flex flex-col items-center mb-8">
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-4xl font-bold text-white mb-4">AK</div>
          <div className="text-xl font-semibold text-[#e2e8f0]">Alex Kim</div>
          <div className="text-sm text-[#64748b] mb-1">Student</div>
          <div className="text-xs text-[#64748b] mb-2">Member since January 2024</div>
          <div className="flex gap-4 text-sm text-[#e2e8f0] mb-4">
            <span>4 courses</span>
            <span>· 284 XP</span>
            <span>· 12 day streak</span>
            <span>· Top 12%</span>
          </div>
        </motion.div>
        <motion.section initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, type: 'spring', stiffness: 300, damping: 20 }} className="mb-8">
          <h2 className="text-lg font-semibold text-[#e2e8f0] mb-3">Skills</h2>
          <div className="flex gap-2 flex-wrap">
            {skills.map(skill => (
              <span key={skill} className="px-3 py-1 rounded-full bg-[#1e1e2e] text-[#6366f1] text-xs font-semibold border border-[#6366f1]">{skill}</span>
            ))}
          </div>
        </motion.section>
        <motion.section initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }} className="mb-8">
          <h2 className="text-lg font-semibold text-[#e2e8f0] mb-3">Achievements</h2>
          <div className="flex gap-3 flex-wrap">
            {badges.map(badge => (
              <span key={badge.label} className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#111118] text-[#e2e8f0] text-xs font-semibold border border-[#1e1e2e]">
                <span className="text-lg">{badge.icon}</span> {badge.label}
              </span>
            ))}
          </div>
        </motion.section>
        <motion.section initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, type: 'spring', stiffness: 300, damping: 20 }}>
          <h2 className="text-lg font-semibold text-[#e2e8f0] mb-3">Bio</h2>
          <label htmlFor="bio" className="text-xs text-[#64748b] block mb-2">Tell us about yourself</label>
          <textarea
            id="bio"
            className="w-full min-h-[80px] bg-[#111118] border border-[#1e1e2e] rounded-lg px-3 py-2 text-[#e2e8f0] mb-2"
            value={bio}
            onChange={e => setBio(e.target.value)}
            placeholder="Your bio..."
          />
        </motion.section>
      </article>
    </main>
  )
}
