'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, MessageCircle } from 'lucide-react'

export default function TwitterPage() {
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

      <section className="mx-auto max-w-4xl rounded-3xl border border-cyan-400/15 bg-slate-950/70 p-10 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
          <MessageCircle size={32} />
        </div>

        <h1 className="text-4xl font-bold text-slate-100">Twitter Community</h1>

        <p className="mx-auto mt-4 max-w-2xl text-slate-400">
          Join the LearnOS Twitter community to connect with learners, share progress,
          ask questions, and grow together.
        </p>

        <button
          onClick={() => router.push('/')}
          className="mt-8 rounded-xl bg-cyan-400 px-6 py-3 font-bold text-slate-950"
        >
          Coming Soon
        </button>
      </section>
    </main>
  )
}