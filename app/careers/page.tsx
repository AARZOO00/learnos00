'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Briefcase, Users, Zap } from 'lucide-react'
import { supabase } from '@/lib/supabase'
const jobs = [
  {
    title: 'Senior Frontend Engineer',
    team: 'Product',
    level: 'Senior',
    location: 'Remote',
  },
  {
    title: 'AI/ML Engineer',
    team: 'Platform',
    level: 'Senior',
    location: 'Remote',
  },
  {
    title: 'Product Manager',
    team: 'Product',
    level: 'Mid-level',
    location: 'Remote',
  },
  {
    title: 'Full Stack Engineer',
    team: 'Backend',
    level: 'Mid-level',
    location: 'Remote',
  },
  {
    title: 'Community Manager',
    team: 'Growth',
    level: 'Entry-level',
    location: 'Remote',
  },
  {
    title: 'Learning Experience Designer',
    team: 'Content',
    level: 'Mid-level',
    location: 'Remote',
  },
]

export default function CareersPage() {
  return (
    <div style={{ background: 'var(--bg-primary)' }} className="min-h-screen">
      <div style={{
        position: 'fixed', top: '-10%', left: '-10%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,217,255,0.08), transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
      }} />

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12 md:py-8"
      >
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <ArrowLeft size={20} color="#00d9ff" />
          <span style={{ fontFamily: 'Space Grotesk', fontWeight: 600, color: '#00d9ff' }}>Back</span>
        </Link>
        <h1 style={{
          fontFamily: 'Space Grotesk',
          fontWeight: 700,
          fontSize: '24px',
          color: '#e8f0fe',
        }}>
          Careers
        </h1>
        <div style={{ width: '60px' }} />
      </motion.header>

      <main className="relative z-10 px-6 py-12 md:px-12 max-w-4xl mx-auto">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-20"
        >
          <h2 style={{
            fontFamily: 'Space Grotesk',
            fontWeight: 700,
            fontSize: 'clamp(32px, 6vw, 56px)',
            color: '#e8f0fe',
            marginBottom: '16px',
          }}>
            Join Our Mission
          </h2>
          <p style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '16px',
            color: '#8b9ab5',
            marginBottom: '20px',
          }}>
            We're building the future of learning. If you're passionate about education and technology, we'd love to hear from you!
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px',
          }}>
            {[
              { label: '80+ Team Members', icon: Users },
              { label: 'Full Benefits', icon: Briefcase },
              { label: 'Remote First', icon: Zap },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} style={{
                  padding: '16px',
                  borderRadius: '12px',
                  background: 'rgba(0,217,255,0.08)',
                  border: '1px solid rgba(0,217,255,0.15)',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
                }}>
                  <Icon size={24} color="#00d9ff" />
                  <span style={{
                    fontFamily: 'Space Grotesk',
                    fontSize: '13px',
                    fontWeight: 600,
                    color: '#e8f0fe',
                    textAlign: 'center',
                  }}>
                    {item.label}
                  </span>
                </div>
              )
            })}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.08, delayChildren: 0.2 }}
        >
          <h3 style={{
            fontFamily: 'Space Grotesk',
            fontWeight: 700,
            fontSize: '20px',
            color: '#e8f0fe',
            marginBottom: '16px',
          }}>
            Open Positions
          </h3>
          <div className="space-y-4">
            {jobs.map((job, idx) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: 8 }}
                className="p-6 rounded-2xl cursor-pointer"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(0,217,255,0.12)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '8px' }}>
                  <h4 style={{
                    fontFamily: 'Space Grotesk',
                    fontWeight: 700,
                    fontSize: '16px',
                    color: '#e8f0fe',
                  }}>
                    {job.title}
                  </h4>
                  <span style={{
                    fontFamily: 'Space Grotesk',
                    fontSize: '11px',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    background: 'rgba(124,58,237,0.2)',
                    color: '#7c3aed',
                  }}>
                    {job.level}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <span style={{
                    fontFamily: 'JetBrains Mono',
                    fontSize: '12px',
                    color: '#3d4f6b',
                  }}>
                    {job.team}
                  </span>
                  <span style={{
                    fontFamily: 'JetBrains Mono',
                    fontSize: '12px',
                    color: '#3d4f6b',
                  }}>
                    {job.location}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  )
}
