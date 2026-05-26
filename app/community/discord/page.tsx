'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { section } from 'framer-motion/m'
import { supabase } from '@/lib/supabase'
export default function DiscordPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen px-6 py-10 md:px-16" style={{ background: 'var(--bg-primary)' }}>
      <button
        onClick={() => router.push('/')}
        className="mb-10 flex items-center gap-2 text-cyan-400 font-semibold"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <motion.section
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto max-w-4xl rounded-3xl border border-cyan-400/15 bg-slate-950/70 p-10 text-center"
        >
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
          <MessageCircle size={32} />
        </div>

        <h1 className="text-4xl font-bold text-slate-100">Discord Community</h1>

        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          Join the LearnOS Discord community to connect with learners, share progress,
          ask questions, and grow together.
        </p>

        <a
          href="https://discord.com/users/1492763621988503552"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950"
        >
          Join Discord
        </a>
      </motion.section>
    </main>
  )
}