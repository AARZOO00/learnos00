'use client'
import { motion } from 'framer-motion'
import React, { useState } from 'react'

function Toggle({ checked, onChange }: { checked: boolean, onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors border border-[#1e1e2e] ${checked ? 'bg-[#6366f1]' : 'bg-[#1e1e2e]'}`}
      type="button"
      aria-label="Toggle setting"
    >
      <motion.div
        className="w-5 h-5 rounded-full bg-white shadow"
        layout
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ x: checked ? 24 : 0 }}
      />
    </button>
  )
}

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(false)
  const [weeklyReport, setWeeklyReport] = useState(true)
  const [bio, setBio] = useState('Passionate about web development and lifelong learning.')
  const [saveState, setSaveState] = useState<'idle' | 'success'>('idle')

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaveState('success')
    setTimeout(() => setSaveState('idle'), 1200)
  }

  function handleReset() {
    alert('Progress has been reset!')
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] px-4 py-8">
      <article className="max-w-2xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-[#e2e8f0] mb-8">Settings</h1>
        <form onSubmit={handleSave} className="space-y-8">
          <section className="bg-[#111118] rounded-xl p-6 border border-[#1e1e2e]">
            <h2 className="font-semibold text-[#e2e8f0] mb-4">Profile</h2>
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1">
                <span className="text-xs text-[#64748b]">Name</span>
                <input className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-lg px-3 py-2 text-[#e2e8f0]" defaultValue="Alex Kim" />
              </label>
              <label className="flex flex-col gap-1">
                <span className="text-xs text-[#64748b]">Email</span>
                <input className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-lg px-3 py-2 text-[#e2e8f0]" defaultValue="alex@example.com" />
              </label>
              <div>
                <span className="text-xs text-[#64748b]">Role</span>
                <div className="mt-1 text-[#e2e8f0]">Student</div>
              </div>
            </div>
          </section>
          <section className="bg-[#111118] rounded-xl p-6 border border-[#1e1e2e]">
            <h2 className="font-semibold text-[#e2e8f0] mb-4">Notifications</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-[#e2e8f0]">Email notifications</span>
                <Toggle checked={emailNotif} onChange={setEmailNotif} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#e2e8f0]">Push notifications</span>
                <Toggle checked={pushNotif} onChange={setPushNotif} />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#e2e8f0]">Weekly report</span>
                <Toggle checked={weeklyReport} onChange={setWeeklyReport} />
              </div>
            </div>
          </section>
          <section className="bg-[#111118] rounded-xl p-6 border border-[#1e1e2e]">
            <h2 className="font-semibold text-[#e2e8f0] mb-4">Appearance</h2>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-[#e2e8f0]">Theme</span>
                <span className="px-3 py-1 rounded-lg bg-[#6366f1] text-white text-xs font-semibold">Dark</span>
                <span className="text-xs text-[#64748b]">(locked)</span>
              </div>
              <div className="flex items-center gap-4">
                <label htmlFor="language" className="text-[#e2e8f0]">Language</label>
                <select id="language" className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-lg px-3 py-2 text-[#e2e8f0]" aria-label="Select language">
                  <option>English</option>
                </select>
              </div>
            </div>
          </section>
          <section className="bg-[#111118] rounded-xl p-6 border border-[#1e1e2e]">
            <h2 className="font-semibold text-[#e2e8f0] mb-4 text-red-400">Danger Zone</h2>
            <button type="button" onClick={handleReset} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-semibold transition">Reset Progress</button>
          </section>
          <div className="flex justify-end">
            <motion.button
              type="submit"
              className={`bg-[#6366f1] text-white px-6 py-2 rounded-lg font-semibold transition ${saveState === 'success' ? 'bg-green-500' : ''}`}
              whileTap={{ scale: 0.97 }}
              animate={saveState === 'success' ? { scale: 1.05 } : { scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {saveState === 'success' ? 'Saved!' : 'Save'}
            </motion.button>
          </div>
        </form>
      </article>
    </main>
  )
}
