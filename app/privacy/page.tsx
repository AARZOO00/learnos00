'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Shield } from 'lucide-react'

export default function PrivacyPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen px-6 py-10 md:px-16" style={{ background: 'var(--bg-primary)' }}>
      <button onClick={() => router.push('/')} className="mb-10 flex items-center gap-2 text-cyan-400 font-semibold">
        <ArrowLeft size={20} /> Back
      </button>

      <motion.section initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-5xl rounded-3xl border border-cyan-400/15 bg-slate-950/70 p-10">
        <Shield className="mb-6 text-cyan-300" size={42} />
        <h1 className="text-4xl font-bold text-slate-100">Privacy Policy</h1>
        <p className="mt-4 text-slate-400">Last updated: May 2026</p>

        {['Information We Collect', 'How We Use Information', 'Data Security'].map((title) => (
          <div key={title} className="mt-8 rounded-2xl border border-cyan-400/10 bg-slate-900/40 p-6">
            <h2 className="text-xl font-bold text-slate-100">{title}</h2>
            <p className="mt-3 leading-7 text-slate-400">
              LearnOS uses learning data only to improve progress tracking, personalization, and platform security.
            </p>
          </div>
        ))}
      </motion.section>
    </main>
  )
}