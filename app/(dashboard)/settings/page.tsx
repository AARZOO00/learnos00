'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { User, Bell, Monitor, AlertTriangle, Check } from 'lucide-react'
import { useAuth } from '@/lib/auth'
import { useToast } from '@/components/ui/Toast'
import { supabase } from '@/lib/supabase'

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <motion.div
      onClick={() => onChange(!checked)}
      style={{
        width: 44,
        height: 24,
        borderRadius: 12,
        cursor: 'pointer',
        position: 'relative',
        padding: 3,
        flexShrink: 0,
        background: checked ? 'rgba(0,217,255,0.15)' : 'rgba(255,255,255,0.04)',
        border: checked ? '1px solid rgba(0,217,255,0.4)' : '1px solid #1a2540',
      }}
    >
      <motion.div
        animate={{ x: checked ? 20 : 0 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          background: checked ? '#00d9ff' : '#3d4f6b',
        }}
      />
    </motion.div>
  )
}

function SectionCard({
  icon: Icon,
  title,
  color,
  children,
}: {
  icon: any
  title: string
  color: string
  children: React.ReactNode
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      className="rounded-2xl p-5 noise-overlay"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <div className="flex items-center gap-2.5 mb-5">
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: `${color}12`, border: `1px solid ${color}25` }}
        >
          <Icon size={14} style={{ color }} />
        </div>

        <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '14px', color: 'var(--text-primary)' }}>
          {title}
        </h2>
      </div>

      {children}
    </motion.section>
  )
}

function InputField({
  label,
  value,
  type = 'text',
}: {
  label: string
  value: string
  type?: string
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#64748b', letterSpacing: '0.06em' }}>
        {label.toUpperCase()}
      </span>

      <input
        type={type}
        value={value}
        readOnly
        style={{
          fontFamily: 'Inter',
          fontSize: '13px',
          background: 'var(--input-bg)',
          border: '1px solid var(--border)',
          borderRadius: '10px',
          padding: '10px 14px',
          color: 'var(--text-primary)',
          outline: 'none',
        }}
      />
    </label>
  )
}

function ToggleRow({
  label,
  desc,
  checked,
  onChange,
}: {
  label: string
  desc: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div>
        <p style={{ fontFamily: 'Space Grotesk', fontWeight: 500, fontSize: '13px', color: 'var(--text-primary)' }}>
          {label}
        </p>
        <p style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>{desc}</p>
      </div>

      <Toggle checked={checked} onChange={onChange} />
    </div>
  )
}

export default function SettingsPage() {
  const [emailNotif, setEmailNotif] = useState(true)
  const [pushNotif, setPushNotif] = useState(false)
  const [weeklyReport, setWeeklyReport] = useState(true)
  const [saveState, setSaveState] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  const { user } = useAuth()
  const { showToast } = useToast()

  const profile = {
    name: user?.name || 'Student',
    email: user?.email || 'student@example.com',
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'dark' | 'light' | null
    const activeTheme = savedTheme || 'dark'

    setTheme(activeTheme)

    if (activeTheme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }
  }, [])

  function toggleTheme() {
    const nextTheme = theme === 'dark' ? 'light' : 'dark'

    setTheme(nextTheme)
    localStorage.setItem('theme', nextTheme)

    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark')
      document.documentElement.classList.remove('light')
    } else {
      document.documentElement.classList.add('light')
      document.documentElement.classList.remove('dark')
    }

    showToast(`${nextTheme === 'dark' ? 'Dark' : 'Light'} theme enabled`, 'success')
  }

  function handleSave() {
    setSaveState('saving')

    setTimeout(() => {
      setSaveState('saved')
      showToast('Settings saved successfully!', 'success')
      setTimeout(() => setSaveState('idle'), 2000)
    }, 800)
  }

  return (
    <main className="min-h-screen px-4 py-8 md:px-6 lg:px-8" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-2xl mx-auto">
        <p style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#64748b', marginBottom: '12px' }}>
          &gt; dashboard / <span style={{ color: '#00d9ff' }}>settings</span>
        </p>

        <h1
          style={{
            fontFamily: 'Space Grotesk',
            fontWeight: 700,
            fontSize: 'clamp(22px,4vw,30px)',
            color: 'var(--text-primary)',
            marginBottom: '28px',
          }}
        >
          Settings
        </h1>

        <div className="space-y-4">
          <SectionCard icon={User} title="Profile" color="#00d9ff">
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Name" value={profile.name} />
                <InputField label="Email" value={profile.email} type="email" />
              </div>

              <div>
                <span style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#64748b', letterSpacing: '0.06em' }}>
                  ROLE
                </span>

                <div className="mt-1.5 flex items-center gap-2">
                  <span style={{ fontFamily: 'Space Grotesk', fontWeight: 500, fontSize: '13px', color: '#8b9ab5' }}>
                    Student
                  </span>

                  <span
                    style={{
                      fontFamily: 'JetBrains Mono',
                      fontSize: '10px',
                      color: '#10b981',
                      background: 'rgba(16,185,129,0.1)',
                      border: '1px solid rgba(16,185,129,0.2)',
                      padding: '2px 8px',
                      borderRadius: '99px',
                    }}
                  >
                    Active
                  </span>
                </div>
              </div>
            </div>
          </SectionCard>

          <SectionCard icon={Bell} title="Notifications" color="#7c3aed">
            <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
              <div className="pb-3">
                <ToggleRow
                  label="Email Notifications"
                  desc="Receive course updates via email"
                  checked={emailNotif}
                  onChange={setEmailNotif}
                />
              </div>

              <div className="py-3">
                <ToggleRow
                  label="Push Notifications"
                  desc="Browser push alerts for reminders"
                  checked={pushNotif}
                  onChange={setPushNotif}
                />
              </div>

              <div className="pt-3">
                <ToggleRow
                  label="Weekly Report"
                  desc="Summary of your learning progress"
                  checked={weeklyReport}
                  onChange={setWeeklyReport}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard icon={Monitor} title="Appearance" color="#10b981">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p style={{ fontFamily: 'Space Grotesk', fontWeight: 500, fontSize: '13px', color: 'var(--text-primary)' }}>
                    Theme
                  </p>
                  <p style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>
                    Switch between dark and light mode
                  </p>
                </div>

                <button
                  onClick={toggleTheme}
                  style={{
                    fontFamily: 'JetBrains Mono',
                    fontSize: '11px',
                    color: '#00d9ff',
                    background: 'rgba(0,217,255,0.08)',
                    border: '1px solid rgba(0,217,255,0.2)',
                    padding: '6px 14px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p style={{ fontFamily: 'Space Grotesk', fontWeight: 500, fontSize: '13px', color: 'var(--text-primary)' }}>
                    Language
                  </p>
                  <p style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>Display language</p>
                </div>

                <select
                  aria-label="Language"
                  defaultValue="English"
                  style={{
                    fontFamily: 'JetBrains Mono',
                    fontSize: '12px',
                    background: 'var(--input-bg)',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    color: 'var(--text-primary)',
                    outline: 'none',
                  }}
                >
                  <option>English</option>
                  <option>Hindi</option>
                </select>
              </div>
            </div>
          </SectionCard>

          <SectionCard icon={AlertTriangle} title="Danger Zone" color="#f43f5e">
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontFamily: 'Space Grotesk', fontWeight: 500, fontSize: '13px', color: 'var(--text-primary)' }}>
                  Reset Progress
                </p>
                <p style={{ fontSize: '11px', color: '#64748b', marginTop: '2px' }}>This action cannot be undone</p>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => showToast('Progress reset!', 'success')}
                style={{
                  fontFamily: 'Space Grotesk',
                  fontWeight: 600,
                  fontSize: '12px',
                  color: '#f43f5e',
                  background: 'rgba(244,63,94,0.08)',
                  border: '1px solid rgba(244,63,94,0.25)',
                  borderRadius: '10px',
                  padding: '8px 16px',
                  cursor: 'pointer',
                }}
              >
                Reset
              </motion.button>
            </div>
          </SectionCard>
        </div>

        <div className="flex justify-end mt-6">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleSave}
            disabled={saveState === 'saving'}
            style={{
              fontFamily: 'Space Grotesk',
              fontWeight: 600,
              fontSize: '14px',
              color: saveState === 'saved' ? '#10b981' : '#00d9ff',
              background: saveState === 'saved' ? 'rgba(16,185,129,0.1)' : 'rgba(0,217,255,0.08)',
              border: saveState === 'saved' ? '1px solid rgba(16,185,129,0.3)' : '1px solid rgba(0,217,255,0.3)',
              borderRadius: '12px',
              padding: '10px 28px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <AnimatePresence mode="wait">
              {saveState === 'saved' ? (
                <motion.span
                  key="saved"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2"
                >
                  <Check size={14} /> Saved!
                </motion.span>
              ) : (
                <motion.span key="save" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  {saveState === 'saving' ? 'Saving...' : 'Save Changes'}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>
    </main>
  )
}