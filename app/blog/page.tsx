'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { supabase } from '@/lib/supabase'
const posts = [
  {
    title: 'Designing a Better Learning Dashboard',
    excerpt: 'How LearnOS uses bento cards, progress tracking, and clean UI to improve student focus.',
    date: 'May 20, 2026',
    category: 'Design',
  },
  {
    title: 'Building in Public: Our First 100 Days',
    excerpt: "We're sharing what we learned launching LearnOS and listening to learner feedback.",
    date: 'May 5, 2026',
    category: 'Updates',
  },
  {
    title: 'Why Progress Tracking Matters',
    excerpt: 'Small wins, streaks, and visual feedback can help learners stay consistent.',
    date: 'April 18, 2026',
    category: 'Learning',
  },
]

export default function BlogPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen px-6 py-10 md:px-16" style={{ background: 'var(--bg-primary)' }}>
      <button onClick={() => router.push('/')} className="mb-10 flex items-center gap-2 text-cyan-400 font-semibold">
        <ArrowLeft size={20} />
        Back
      </button>

      <section className="mx-auto max-w-5xl">
        <h1 className="text-center text-4xl font-bold text-slate-100 md:text-5xl">Blog</h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-slate-400">
          Updates, product notes, and learning insights from LearnOS.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.title} className="rounded-2xl border border-cyan-400/15 bg-slate-950/70 p-6">
              <div className="mb-4 flex items-center gap-2 text-xs text-cyan-300">
                <Tag size={14} />
                {post.category}
              </div>

              <h2 className="text-xl font-bold text-slate-100">{post.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">{post.excerpt}</p>

              <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
                <Calendar size={14} />
                {post.date}
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}