'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Users, Zap, Heart, Target } from 'lucide-react'

const values = [
  {
    icon: Users,
    title: 'Community First',
    desc: 'Learning feels better when students grow together.',
  },
  {
    icon: Zap,
    title: 'Innovation Driven',
    desc: 'AI-powered tools make progress faster and smarter.',
  },
  {
    icon: Heart,
    title: 'Human Focused',
    desc: 'Technology supports learners, not replaces them.',
  },
]

export default function AboutPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen px-6 py-10 md:px-12" style={{ background: 'var(--bg-primary)' }}>
      <button
        onClick={() => router.push('/')}
        className="mb-10 flex items-center gap-2 text-cyan-400 font-semibold"
      >
        <ArrowLeft size={20} />
        Back
      </button>

      <section className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          className="rounded-3xl border border-cyan-400/15 bg-slate-950/70 p-8 md:p-12 shadow-2xl shadow-cyan-500/10"
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold tracking-widest text-cyan-300">
            <Target size={14} />
            ABOUT LEARNOS
          </div>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-100 md:text-6xl">
            Building the future of personalized learning.
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-400 md:text-lg">
            LearnOS helps students track progress, build learning streaks, and stay motivated through a modern bento-grid dashboard powered by real-time data.
          </p>

          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-400 md:text-lg">
            Our mission is to make learning more visual, engaging, and accessible by combining clean design, AI-powered personalization, and performance-first engineering.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {values.map((item, index) => {
            const Icon = item.icon

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 24,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -6, scale: 1.01 }}
                className="rounded-2xl border border-cyan-400/15 bg-slate-950/60 p-6 shadow-xl shadow-cyan-500/5"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <Icon size={24} />
                </div>

                <h2 className="text-xl font-bold text-slate-100">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">{item.desc}</p>
              </motion.article>
            )
          })}
        </div>
      </section>
    </main>
  )
}