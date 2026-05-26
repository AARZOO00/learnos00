'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Mail, MessageSquare, MapPin, Phone } from 'lucide-react'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3000)
  }

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
          Contact
        </h1>
        <div style={{ width: '60px' }} />
      </motion.header>

      <main className="relative z-10 px-6 py-12 md:px-12 max-w-4xl mx-auto">
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
            Get in Touch
          </h2>
          <p style={{
            fontFamily: 'JetBrains Mono',
            fontSize: '16px',
            color: '#8b9ab5',
          }}>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            { icon: Mail, title: 'Email', value: 'support@learnos.com' },
            { icon: MessageSquare, title: 'Chat', value: 'Live support available' },
            { icon: MapPin, title: 'Location', value: 'San Francisco, CA' },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="p-6 rounded-2xl text-center"
                style={{
                  background: 'rgba(0,0,0,0.3)',
                  border: '1px solid rgba(0,217,255,0.12)',
                }}
              >
                <Icon size={32} color="#00d9ff" style={{ margin: '0 auto 16px' }} />
                <h3 style={{
                  fontFamily: 'Space Grotesk',
                  fontWeight: 600,
                  fontSize: '16px',
                  color: '#e8f0fe',
                  marginBottom: '8px',
                }}>
                  {item.title}
                </h3>
                <p style={{
                  fontFamily: 'JetBrains Mono',
                  fontSize: '14px',
                  color: '#3d4f6b',
                }}>
                  {item.value}
                </p>
              </motion.div>
            )
          })}
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit}
          className="p-8 rounded-2xl"
          style={{
            background: 'rgba(0,0,0,0.3)',
            border: '1px solid rgba(0,217,255,0.12)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(0,217,255,0.2)',
                color: '#e8f0fe',
                fontFamily: 'Space Grotesk',
                fontSize: '14px',
              }}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(0,217,255,0.2)',
                color: '#e8f0fe',
                fontFamily: 'Space Grotesk',
                fontSize: '14px',
              }}
            />
          </div>
          <input
            type="text"
            placeholder="Subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(0,217,255,0.2)',
              color: '#e8f0fe',
              fontFamily: 'Space Grotesk',
              fontSize: '14px',
              marginBottom: '6px',
            }}
          />
          <textarea
            placeholder="Your Message"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            rows={6}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '10px',
              background: 'rgba(0,0,0,0.3)',
              border: '1px solid rgba(0,217,255,0.2)',
              color: '#e8f0fe',
              fontFamily: 'JetBrains Mono',
              fontSize: '14px',
              marginBottom: '16px',
              resize: 'none',
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            style={{
              width: '100%',
              padding: '12px 24px',
              borderRadius: '10px',
              background: submitted ? 'linear-gradient(135deg, #10b981, #06b6d4)' : 'linear-gradient(135deg, #00d9ff, #7c3aed)',
              border: 'none',
              color: '#000',
              fontFamily: 'Space Grotesk',
              fontWeight: 700,
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s',
            }}
          >
            {submitted ? '✓ Message Sent!' : 'Send Message'}
          </motion.button>
        </motion.form>
      </main>
    </div>
  )
}
