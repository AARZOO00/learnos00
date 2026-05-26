'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft, BadgeCheck } from 'lucide-react'
import { supabase } from '@/lib/supabase'
export default function LicensePage() {
  const router = useRouter()

  return (
    <main className="min-h-screen px-6 py-10 md:px-16" style={{ background: 'var(--bg-primary)' }}>
      <button onClick={() => router.push('/')} className="mb-10 flex items-center gap-2 text-cyan-400 font-semibold">
        <ArrowLeft size={20} /> Back
      </button>

      <motion.section initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-5xl rounded-3xl border border-cyan-400/15 bg-slate-950/70 p-10">
        <BadgeCheck className="mb-6 text-cyan-300" size={42} />
        <h1 className="text-4xl font-bold text-slate-100">License</h1>
        <p className="mt-4 leading-7 text-slate-400">
          LearnOS is a student learning dashboard project built for educational and portfolio demonstration purposes.
        </p>
      </motion.section>
    </main>
  )
}