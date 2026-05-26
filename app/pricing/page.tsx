'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import { supabase } from '@/lib/supabase'
const plans = [
  {
    name: 'Starter',
    price: 'Free',
    desc: 'Perfect to get started',
    features: [
      'Access to 50+ courses',
      'Basic progress tracking',
      'Community access',
      '1 course at a time',
      'Mobile app access',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    desc: 'For serious learners',
    features: [
      'All Starter features',
      'Unlimited courses',
      'Advanced analytics',
      'Priority support',
      'AI-powered recommendations',
      'Certificate generation',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'For teams & organizations',
    features: [
      'All Pro features',
      'Team management',
      'Custom curriculum',
      'Dedicated support',
      'SSO & SAML',
      'Advanced reporting',
      'API access',
    ],
    cta: 'Contact Sales',
  },
]

export default function PricingPage() {
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
          Pricing
        </h1>
        <div style={{ width: '60px' }} />
      </motion.header>

      <main className="relative z-10 px-6 py-12 md:px-12 max-w-6xl mx-auto">
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
            Simple, Transparent Pricing
          </h2>
          <p style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '16px',
            color: '#8b9ab5',
            maxWidth: '600px',
            margin: '0 auto',
          }}>
            Choose the plan that fits your learning journey. All plans include a 7-day free trial.
          </p>
        </motion.section>

        <motion.section
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
        >
          {plans.map((plan, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -12 }}
              className="rounded-2xl p-8"
              style={{
                background: plan.highlighted ? 'linear-gradient(135deg, rgba(0,217,255,0.08), rgba(124,58,237,0.08))' : 'rgba(0,0,0,0.3)',
                border: plan.highlighted ? '2px solid rgba(0,217,255,0.4)' : '1px solid rgba(0,217,255,0.12)',
                position: plan.highlighted ? 'relative' : 'initial',
              }}
            >
              {plan.highlighted && (
                <div style={{
                  position: 'absolute', top: '-12px', right: '24px',
                  background: 'linear-gradient(135deg, #00d9ff, #7c3aed)',
                  color: '#000',
                  padding: '4px 16px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 700,
                  fontFamily: 'Space Grotesk',
                }}>
                  Most Popular
                </div>
              )}
              <h3 style={{
                fontFamily: 'Space Grotesk',
                fontWeight: 700,
                fontSize: '20px',
                color: '#e8f0fe',
                marginBottom: '8px',
              }}>
                {plan.name}
              </h3>
              <p style={{
                fontFamily: 'JetBrains Mono',
                fontSize: '12px',
                color: '#3d4f6b',
                marginBottom: '16px',
              }}>
                {plan.desc}
              </p>
              <div style={{ marginBottom: '24px' }}>
                <span style={{
                  fontFamily: 'Space Grotesk',
                  fontWeight: 700,
                  fontSize: '36px',
                  color: '#00d9ff',
                }}>
                  {plan.price}
                </span>
                {plan.period && (
                  <span style={{
                    fontFamily: 'JetBrains Mono',
                    fontSize: '12px',
                    color: '#3d4f6b',
                  }}>
                    {plan.period}
                  </span>
                )}
              </div>
              <ul style={{ marginBottom: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {plan.features.map((feature, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Check size={16} color="#00d9ff" style={{ flexShrink: 0 }} />
                    <span style={{
                      fontFamily: 'JetBrains Mono',
                      fontSize: '13px',
                      color: '#8b9ab5',
                    }}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: '100%',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  background: plan.highlighted ? 'linear-gradient(135deg, #00d9ff, #7c3aed)' : 'transparent',
                  border: plan.highlighted ? 'none' : '1px solid rgba(0,217,255,0.3)',
                  color: plan.highlighted ? '#000' : '#00d9ff',
                  fontFamily: 'Space Grotesk',
                  fontWeight: 700,
                  fontSize: '14px',
                  cursor: 'pointer',
                }}
              >
                {plan.cta}
              </motion.button>
            </motion.article>
          ))}
        </motion.section>
      </main>
    </div>
  )
}
