'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, BookOpen, BarChart3, Zap, Users, Lock, Brain, Award } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const features = [
  { icon: Brain, title: 'AI-Powered Personalization', desc: 'Intelligent algorithms adapt your learning path based on your pace, strengths, and goals.' },
  { icon: BarChart3, title: 'Advanced Analytics', desc: 'Track your progress with detailed metrics, visualize growth, and identify areas for improvement.' },
  { icon: BookOpen, title: 'Vast Curriculum Library', desc: '1200+ courses across programming, design, business, and more. New content added weekly.' },
  { icon: Zap, title: 'Instant Feedback', desc: 'Get real-time feedback on your work with AI-powered code review and learning recommendations.' },
  { icon: Users, title: 'Community Learning', desc: 'Join study groups, participate in challenges, and learn from thousands of peers worldwide.' },
  { icon: Lock, title: 'Progress Protection', desc: 'Your learning data is encrypted and secure. Download your progress anytime as a certificate.' },
]

export default function FeaturesPage() {
  return (
    <div style={{ background: 'var(--bg-primary)' }} className="min-h-screen">
      {/* Background orbs */}
      <div style={{
        position: 'fixed', top: '-10%', left: '-10%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,217,255,0.08), transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
      }} />
      <div style={{
        position: 'fixed', bottom: '-10%', right: '-5%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.1), transparent 70%)',
        filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Header */}
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
          Features
        </h1>
        <div style={{ width: '60px' }} />
      </motion.header>

      {/* Main content */}
      <main className="relative z-10 px-6 py-12 md:px-12 max-w-6xl mx-auto">
        {/* Hero section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-20"
        >
          <h2 style={{
            fontFamily: 'Space Grotesk',
            fontWeight: 700,
            fontSize: 'clamp(32px, 6vw, 56px)',
            color: '#e8f0fe',
            marginBottom: '16px',
          }}>
            Everything You Need to{' '}
            <span style={{
              background: 'linear-gradient(90deg, #00d9ff, #7c3aed)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              Master Skills
            </span>
          </h2>
          <p style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '16px',
            color: '#8b9ab5',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            LearnOS combines cutting-edge technology with personalized learning to help you reach your goals faster.
          </p>
        </motion.section>

        {/* Features grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,217,255,0.15)' }}
                className="p-6 rounded-2xl"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(0,217,255,0.12)',
                  transition: 'all 0.3s',
                }}
              >
                <div style={{
                  width: '48px', height: '48px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(0,217,255,0.15), rgba(124,58,237,0.15))',
                  border: '1px solid rgba(0,217,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '16px',
                }}>
                  <Icon size={24} color="#00d9ff" strokeWidth={1.5} />
                </div>
                <h3 style={{
                  fontFamily: 'Space Grotesk',
                  fontWeight: 600,
                  fontSize: '18px',
                  color: '#e8f0fe',
                  marginBottom: '8px',
                }}>
                  {feature.title}
                </h3>
                <p style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: '14px',
                  color: '#3d4f6b',
                  lineHeight: 1.6,
                }}>
                  {feature.desc}
                </p>
              </motion.article>
            )
          })}
        </motion.section>

        {/* CTA section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center p-8 rounded-2xl"
          style={{
            background: 'rgba(0,217,255,0.05)',
            border: '1px solid rgba(0,217,255,0.15)',
          }}
        >
          <h3 style={{
            fontFamily: 'Space Grotesk',
            fontWeight: 700,
            fontSize: '24px',
            color: '#e8f0fe',
            marginBottom: '12px',
          }}>
            Ready to unlock all features?
          </h3>
          <p style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '14px',
            color: '#8b9ab5',
            marginBottom: '20px',
          }}>
            Start your free trial today and experience the power of personalized learning.
          </p>
          <Link href="/login">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '12px 32px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #00d9ff, #7c3aed)',
                border: 'none',
                color: '#000',
                fontFamily: 'Space Grotesk',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              Get Started Free
            </motion.button>
          </Link>
        </motion.section>
      </main>
    </div>
  )
}
