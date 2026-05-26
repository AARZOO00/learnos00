'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Zap,
  ArrowRight,
  BookOpen,
  Activity,
  Rocket,
  TrendingUp,
  Users,
  Award,
  Flame,
  Trophy,
  CalendarDays,
  Code2,
} from 'lucide-react'

const features = [
  { icon: BookOpen, title: 'Vast Curriculum', desc: 'Explore thousands of courses across all skill levels' },
  { icon: Zap, title: 'AI-Powered', desc: 'Personalized learning paths powered by intelligent algorithms' },
  { icon: TrendingUp, title: 'Track Progress', desc: 'Monitor your learning journey with detailed analytics' },
]

const stats = [
  { label: 'Active Learners', value: '50K+', icon: Users },
  { label: 'Courses Available', value: '1200+', icon: BookOpen },
  { label: 'Avg. Completion', value: '94%', icon: Award },
  { label: 'Daily Streak Record', value: '365 Days', icon: Rocket },
]

const previewCards = [
  { title: 'React Patterns', value: '75%', desc: 'Advanced components', icon: Code2 },
  { title: 'Daily Streak', value: '12 Days', desc: 'Keep learning daily', icon: Flame },
  { title: 'Weekly Activity', value: '84%', desc: 'Completion rate', icon: Activity },
  { title: 'Achievement', value: 'Gold', desc: 'Top 12% learner', icon: Trophy },
  { title: 'Next Lesson', value: 'Today', desc: 'System Design Basics', icon: CalendarDays },
  { title: 'Courses', value: '4 Active', desc: 'Continue learning', icon: BookOpen },
]

const footerGroups = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '/features' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Security', href: '/security' },
      { label: 'Roadmap', href: '/roadmap' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Blog', href: '/blog' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Terms', href: '/terms' },
      { label: 'License', href: '/license' },
      { label: 'Compliance', href: '/compliance' },
    ],
  },
  {
    title: 'Community',
    links: [
      { label: 'Discord', href: '/community/discord' },
      { label: 'Twitter', href: '/community/twitter' },
      { label: 'GitHub', href: '/community/github' },
      { label: 'Forum', href: '/community/forum' },
    ],
  },
]

export default function Home() {
  const router = useRouter()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, type: 'spring', stiffness: 300, damping: 30 },
    },
  }

  return (
    <div style={{ background: 'var(--bg-primary)' }} className="min-h-screen w-full overflow-hidden">
      <motion.div
        animate={{ y: [0, 30, 0], x: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: '-5%',
          left: '-8%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0,217,255,0.12), transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <motion.div
        animate={{ y: [0, -30, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          bottom: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.15), transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="absolute inset-0 grid-pattern opacity-40 pointer-events-none" />

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-20 flex items-center justify-between px-6 py-6 md:px-12 md:py-8"
      >
        <div className="flex items-center gap-2.5">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(0,217,255,0.2), rgba(124,58,237,0.2))',
              border: '1px solid rgba(0,217,255,0.3)',
              boxShadow: '0 0 12px rgba(0,217,255,0.15)',
            }}
          >
            <Zap size={18} color="#00d9ff" strokeWidth={2.5} />
          </motion.div>

          <span
            style={{
              fontFamily: 'Space Grotesk',
              fontWeight: 700,
              fontSize: '18px',
              color: '#e8f0fe',
              letterSpacing: '-0.02em',
            }}
          >
            LearnOS
          </span>
        </div>

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0,217,255,0.2)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/login')}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              background: 'transparent',
              border: '1px solid rgba(0,217,255,0.3)',
              color: '#00d9ff',
              fontFamily: 'Space Grotesk',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
            }}
          >
            Sign In
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,217,255,0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/login')}
            style={{
              padding: '10px 20px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, rgba(0,217,255,0.15), rgba(124,58,237,0.15))',
              border: '1px solid rgba(0,217,255,0.3)',
              color: '#00d9ff',
              fontFamily: 'Space Grotesk',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              boxShadow: '0 0 20px rgba(0,217,255,0.1)',
            }}
          >
            Get Started
          </motion.button>
        </div>
      </motion.header>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex flex-col items-center justify-center px-6 py-16 md:py-32"
      >
        <motion.section variants={itemVariants} className="text-center max-w-4xl mx-auto mb-20">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
            style={{
              background: 'rgba(0,217,255,0.08)',
              border: '1px solid rgba(0,217,255,0.2)',
            }}
          >
            <Rocket size={14} color="#00d9ff" />
            <span
              style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '11px',
                color: '#00d9ff',
                letterSpacing: '0.05em',
              }}
            >
              FUTURE OF LEARNING IS HERE
            </span>
          </div>

          <h1
            style={{
              fontFamily: 'Space Grotesk',
              fontWeight: 700,
              fontSize: 'clamp(36px, 7vw, 72px)',
              color: '#e8f0fe',
              lineHeight: 1.2,
              marginBottom: '20px',
              letterSpacing: '-0.02em',
            }}
          >
            Master Skills{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #00d9ff, #7c3aed)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              at Your Pace
            </span>
          </h1>

          <p
            style={{
              fontFamily: 'JetBrains Mono',
              fontSize: '16px',
              color: '#8b9ab5',
              lineHeight: 1.6,
              maxWidth: '600px',
              margin: '0 auto 32px',
            }}
          >
            LearnOS combines AI-powered personalization with a bento-grid dashboard to visualize your growth.
            Track progress, build streaks, and join thousands of learners worldwide.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(0,217,255,0.3)' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push('/login')}
              className="flex items-center justify-center gap-3 px-8 py-4"
              style={{
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(0,217,255,0.2), rgba(124,58,237,0.2))',
                border: '1px solid rgba(0,217,255,0.4)',
                color: '#00d9ff',
                fontFamily: 'Space Grotesk',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
                boxShadow: '0 0 30px rgba(0,217,255,0.15)',
              }}
            >
              Start Learning Now
              <ArrowRight size={18} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(124,58,237,0.2)' }}
              whileTap={{ scale: 0.95 }}
              style={{
                padding: '16px 32px',
                borderRadius: '14px',
                background: 'transparent',
                border: '1px solid rgba(124,58,237,0.3)',
                color: '#7c3aed',
                fontFamily: 'Space Grotesk',
                fontWeight: 600,
                fontSize: '15px',
                cursor: 'pointer',
              }}
            >
              Watch Demo
            </motion.button>
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-5xl mx-auto mb-32">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.article
                key={stat.label}
                whileHover={{ y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="p-4 rounded-xl text-center"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(0,217,255,0.12)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <Icon size={24} style={{ color: '#00d9ff', margin: '0 auto 8px' }} />
                <p style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '18px', color: '#e8f0fe', marginBottom: '4px' }}>
                  {stat.value}
                </p>
                <p style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#3d4f6b' }}>
                  {stat.label}
                </p>
              </motion.article>
            )
          })}
        </motion.section>

        <motion.section variants={itemVariants} className="w-full max-w-5xl mx-auto mb-32">
          <h2
            style={{
              fontFamily: 'Space Grotesk',
              fontWeight: 700,
              fontSize: 'clamp(24px, 5vw, 40px)',
              color: '#e8f0fe',
              textAlign: 'center',
              marginBottom: '40px',
            }}
          >
            Why Choose LearnOS?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <motion.article
                  key={feature.title}
                  whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,217,255,0.15)' }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="p-6"
                  style={{
                    borderRadius: '20px',
                    background: 'rgba(0,0,0,0.3)',
                    border: '1px solid rgba(0,217,255,0.12)',
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,217,255,0.15), rgba(124,58,237,0.15))',
                      border: '1px solid rgba(0,217,255,0.2)',
                    }}
                  >
                    <Icon size={24} color="#00d9ff" strokeWidth={1.5} />
                  </div>
                  <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '16px', color: '#e8f0fe', marginBottom: '8px' }}>
                    {feature.title}
                  </h3>
                  <p style={{ fontFamily: 'JetBrains Mono', fontSize: '13px', color: '#3d4f6b', lineHeight: 1.5 }}>
                    {feature.desc}
                  </p>
                </motion.article>
              )
            })}
          </div>
        </motion.section>

        <motion.section variants={itemVariants} className="w-full max-w-6xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(24px, 5vw, 40px)', color: '#e8f0fe', marginBottom: '8px' }}>
              Your Command Center Awaits
            </h2>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', color: '#8b9ab5' }}>
              Beautiful bento grid dashboard with real-time progress tracking
            </p>
          </div>

          <motion.div
            whileHover={{ boxShadow: '0 40px 80px rgba(0,217,255,0.2)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="rounded-2xl overflow-hidden"
            style={{
              background: 'rgba(0,0,0,0.4)',
              border: '1px solid rgba(0,217,255,0.15)',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div
              style={{
                padding: '24px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '16px',
              }}
            >
              {previewCards.map((card, i) => {
                const Icon = card.icon

                return (
                  <motion.article
                    key={card.title}
                    whileHover={{ scale: 1.02, y: -4 }}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 22,
                      delay: i * 0.06,
                    }}
                    style={{
                      background: 'linear-gradient(135deg, rgba(0,217,255,0.10), rgba(124,58,237,0.10))',
                      border: '1px solid rgba(0,217,255,0.2)',
                      borderRadius: '16px',
                      padding: '20px',
                      minHeight: '170px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'radial-gradient(circle at top left, rgba(0,217,255,0.16), transparent 35%)',
                        opacity: 0.8,
                      }}
                    />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div
                        style={{
                          width: '42px',
                          height: '42px',
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(0,217,255,0.10)',
                          border: '1px solid rgba(0,217,255,0.22)',
                          marginBottom: '18px',
                        }}
                      >
                        <Icon size={21} color="#00d9ff" />
                      </div>

                      <h3 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '15px', color: '#e8f0fe', marginBottom: '8px' }}>
                        {card.title}
                      </h3>

                      <p style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: '24px', color: '#00d9ff', marginBottom: '6px' }}>
                        {card.value}
                      </p>

                      <p style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#8b9ab5' }}>
                        {card.desc}
                      </p>
                    </div>

                    <div
                      style={{
                        position: 'relative',
                        zIndex: 1,
                        height: '5px',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,0.08)',
                        overflow: 'hidden',
                        marginTop: '16px',
                      }}
                    >
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: i * 0.08 }}
                        style={{
                          height: '100%',
                          width: '100%',
                          transformOrigin: 'left',
                          borderRadius: '999px',
                          background: 'linear-gradient(90deg, #00d9ff, #7c3aed)',
                        }}
                      />
                    </div>
                  </motion.article>
                )
              })}
            </div>
          </motion.div>
        </motion.section>

        <motion.section variants={itemVariants} className="text-center w-full max-w-2xl mx-auto mb-20">
          <h2 style={{ fontFamily: 'Space Grotesk', fontWeight: 700, fontSize: 'clamp(24px, 5vw, 40px)', color: '#e8f0fe', marginBottom: '16px' }}>
            Ready to Level Up?
          </h2>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: '14px', color: '#8b9ab5', marginBottom: '24px' }}>
            Join the learning revolution. Start your journey today and transform your skills into expertise.
          </p>

          <motion.button
            whileHover={{ scale: 1.08, boxShadow: '0 0 50px rgba(0,217,255,0.4)' }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/login')}
            className="flex items-center justify-center gap-3 mx-auto px-10 py-4"
            style={{
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #00d9ff, #7c3aed)',
              border: 'none',
              color: '#000',
              fontFamily: 'Space Grotesk',
              fontWeight: 700,
              fontSize: '16px',
              cursor: 'pointer',
              boxShadow: '0 0 40px rgba(0,217,255,0.3)',
            }}
          >
            Get Started Free
            <ArrowRight size={20} />
          </motion.button>
        </motion.section>
      </motion.main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="relative z-10 mt-32 px-6 py-12 border-t"
        style={{ borderColor: 'rgba(0,217,255,0.1)' }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {footerGroups.map((group) => (
              <div key={group.title}>
                <p style={{ fontFamily: 'Space Grotesk', fontWeight: 600, fontSize: '13px', color: '#e8f0fe', marginBottom: '12px' }}>
                  {group.title}
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {group.links.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        style={{
                          fontFamily: 'JetBrains Mono',
                          fontSize: '12px',
                          color: '#3d4f6b',
                          opacity: 0.7,
                          textDecoration: 'none',
                          display: 'block',
                        }}
                        className="hover:text-cyan-400 hover:opacity-100"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t" style={{ borderColor: 'rgba(0,217,255,0.08)' }}>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#3d4f6b' }}>
              © 2026 LearnOS. All rights reserved.
            </p>
            <p style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#3d4f6b', marginTop: '12px' }}>
              Crafted with <span style={{ color: '#f43f5e' }}>❤</span> for the future of learning
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}