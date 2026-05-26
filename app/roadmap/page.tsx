'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Map } from 'lucide-react'
import { supabase } from '@/lib/supabase'
export default function RoadmapPage() {
  const router = useRouter()

  const items = ['AI Course Recommendations', 'Progress Analytics', 'Certificate System', 'Community Learning Rooms']

  return (
    <main className="min-h-screen px-6 py-10 md:px-16" style={{ background: 'var(--bg-primary)' }}>
      <button onClick={() => router.push('/')} className="mb-10 flex items-center gap-2 text-cyan-400 font-semibold">
        <ArrowLeft size={20} /> Back
      </button>

      <motion.section initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-5xl rounded-3xl border border-cyan-400/15 bg-slate-950/70 p-10">
        <Map className="mb-6 text-cyan-300" size={42} />
        <h1 className="text-4xl font-bold text-slate-100">Product Roadmap</h1>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {items.map((item) => (
            <div key={item} className="rounded-2xl border border-cyan-400/10 bg-slate-900/40 p-5 text-slate-300">
              {item}
            </div>
          ))}
        </div>
      </motion.section>
    </main>
  )
}