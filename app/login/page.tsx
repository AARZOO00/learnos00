'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, Chrome } from 'lucide-react'
import { supabase } from '@/lib/supabase'

function InputField({
  icon, placeholder, value, onChange, type, rightSlot,
}: {
  icon: React.ReactNode
  placeholder: string
  value: string
  onChange: (v: string) => void
  type: string
  rightSlot?: React.ReactNode
}) {
  const [focused, setFocused] = useState(false)
  return (
    <div
      className="flex items-center gap-3 px-4 py-3 rounded-xl"
      style={{
        background: 'rgba(0,0,0,0.25)',
        border: focused ? '1px solid rgba(0,217,255,0.45)' : '1px solid #1a2540',
        boxShadow: focused ? '0 0 0 3px rgba(0,217,255,0.07)' : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
    >
      <span className="flex-shrink-0">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          flex: 1, background: 'none', border: 'none', outline: 'none',
          fontFamily: 'Inter', fontSize: '13px', color: '#e8f0fe',
        }}
      />
      {rightSlot}
    </div>
  )
}

export default function LoginPage() {
  const router = useRouter()
  const [tab, setTab]           = useState<'login' | 'signup'>('login')
  const [email, setEmail]       = useState('')
  const [password, setPass]     = useState('')
  const [fullName, setFullName] = useState('')
  const [showPass, setShow]     = useState(false)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [info, setInfo]         = useState('')

  // ✅ Email login/signup - Supabase auth with email
  async function handleEmailAuth() {
    if (!email || !password) { setError('Please fill all fields.'); return }
    if (tab === 'signup' && !fullName) { setError('Please enter your name.'); return }
    setError(''); setInfo('')
    setLoading(true)

    try {
      if (tab === 'signup') {
        const { error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: fullName || email.split('@')[0] },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          },
        })
        if (err) { setError(err.message) }
        else { setInfo('Account created! Check your email to verify.') }
      } else {
        const { error: err } = await supabase.auth.signInWithPassword({ email, password })
        if (err) { setError(err.message) }
        else {
          // Wait for auth state to update
          await new Promise(r => setTimeout(r, 500))
          router.push('/dashboard')
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed')
    } finally {
      setLoading(false)
    }
  }

  // ✅ Google OAuth - properly configured with current origin
  async function handleGoogle() {
    setLoading(true); setError('')
    try {
      const { error: err } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (err) { setError(err.message) }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OAuth failed')
      setLoading(false)
    }
  }

  // ✅ GitHub OAuth
  async function handleGithub() {
    setLoading(true); setError('')
    try {
      const { error: err } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (err) { setError(err.message) }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OAuth failed')
      setLoading(false)
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{ background: 'var(--bg-primary)' }}
    >
      {/* Background orbs */}
      <div style={{
        position: 'absolute', top: '-15%', left: '-10%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,217,255,0.06), transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', right: '-5%',
        width: '450px', height: '450px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,58,237,0.08), transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: '60%',
        width: '300px', height: '300px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,0.04), transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(0,217,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.025) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 26 }}
        className="relative w-full max-w-md"
        style={{
          background: 'rgba(11,17,32,0.92)',
          border: '1px solid rgba(0,217,255,0.12)',
          borderRadius: '24px',
          padding: '36px',
          boxShadow: '0 0 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,217,255,0.05)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Corner accents */}
        <div style={{
          position: 'absolute', top: 0, left: 0, width: '30px', height: '30px',
          borderTop: '2px solid rgba(0,217,255,0.5)',
          borderLeft: '2px solid rgba(0,217,255,0.5)',
          borderTopLeftRadius: '22px',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, right: 0, width: '30px', height: '30px',
          borderBottom: '2px solid rgba(124,58,237,0.4)',
          borderRight: '2px solid rgba(124,58,237,0.4)',
          borderBottomRightRadius: '22px',
        }} />

        {/* Logo */}
        <div className="flex items-center gap-2.5 mb-8">
          <motion.div
            whileHover={{ scale: 1.08, rotate: 5 }}
            transition={{ type: 'spring', stiffness: 400, damping: 18 }}
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, rgba(0,217,255,0.2), rgba(124,58,237,0.2))',
              border: '1px solid rgba(0,217,255,0.3)',
              boxShadow: '0 0 14px rgba(0,217,255,0.15)',
            }}
          >
            <Zap size={16} color="#00d9ff" strokeWidth={2.5} />
          </motion.div>
          <div className="flex items-center gap-0.5">
            <span style={{
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
              fontSize: '16px', color: '#e8f0fe', letterSpacing: '-0.02em',
            }}>LearnOS</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1.1, repeat: Infinity }}
              style={{ color: '#00d9ff', fontFamily: 'JetBrains Mono', fontSize: '15px', marginLeft: '1px' }}
            >_</motion.span>
          </div>
        </div>

        {/* Heading */}
        <div className="mb-6">
          <AnimatePresence mode="wait">
            <motion.h1
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              style={{
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700,
                fontSize: '24px', color: '#e8f0fe', marginBottom: '6px', letterSpacing: '-0.02em',
              }}
            >
              {tab === 'login' ? 'Welcome back' : 'Create account'}
            </motion.h1>
          </AnimatePresence>
          <p style={{ fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#3d4f6b' }}>
            {tab === 'login'
              ? '> continue your learning journey'
              : '> join the learning revolution'}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex mb-6 p-1 rounded-xl gap-1" style={{ background: 'rgba(0,0,0,0.3)', border: '1px solid #1a2540' }}>
          {(['login', 'signup'] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(''); setInfo('') }}
              className="flex-1 py-2 rounded-lg relative"
              style={{
                fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: '13px',
                color: tab === t ? '#e8f0fe' : '#3d4f6b',
                background: 'transparent', border: 'none', cursor: 'pointer',
              }}
            >
              {tab === t && (
                <motion.div
                  layoutId="tabBg"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: 'rgba(0,217,255,0.08)', border: '1px solid rgba(0,217,255,0.2)' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <span style={{ position: 'relative', zIndex: 1 }}>
                {t === 'login' ? 'Sign In' : 'Sign Up'}
              </span>
            </button>
          ))}
        </div>

        {/* Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>

          {/* Name field - only signup */}
          <AnimatePresence>
            {tab === 'signup' && (
              <motion.div
                key="namefield"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                style={{ overflow: 'hidden' }}
              >
                <InputField
                  icon={<span style={{ fontFamily: 'JetBrains Mono', fontSize: '12px', color: '#3d4f6b' }}>@</span>}
                  placeholder="Full name"
                  value={fullName}
                  onChange={setFullName}
                  type="text"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email */}
          <InputField
            icon={<Mail size={14} style={{ color: '#3d4f6b' }} />}
            placeholder="Email address"
            value={email}
            onChange={setEmail}
            type="email"
          />

          {/* Password */}
          <InputField
            icon={<Lock size={14} style={{ color: '#3d4f6b' }} />}
            placeholder="Password"
            value={password}
            onChange={setPass}
            type={showPass ? 'text' : 'password'}
            rightSlot={
              <button
                onClick={() => setShow(!showPass)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#3d4f6b', padding: 0, display: 'flex' }}
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            }
          />

          {/* Forgot password */}
          {tab === 'login' && (
            <div style={{ textAlign: 'right', marginTop: '-4px' }}>
              <button style={{ background: 'none', border: 'none', fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#00d9ff', cursor: 'pointer', opacity: 0.7 }}>
                forgot password?
              </button>
            </div>
          )}

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#f43f5e',
                  background: 'rgba(244,63,94,0.07)', border: '1px solid rgba(244,63,94,0.2)',
                  borderRadius: '8px', padding: '8px 12px',
                }}
              >
                ! {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Info message */}
          <AnimatePresence>
            {info && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  fontFamily: 'JetBrains Mono', fontSize: '11px', color: '#10b981',
                  background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)',
                  borderRadius: '8px', padding: '8px 12px',
                }}
              >
                ✓ {info}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleEmailAuth}
            disabled={loading}
            style={{
              width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              padding: '12px', borderRadius: '12px', marginTop: '4px',
              fontFamily: 'Space Grotesk, sans-serif', fontWeight: 600, fontSize: '14px',
              background: loading
                ? 'rgba(0,217,255,0.04)'
                : 'linear-gradient(135deg, rgba(0,217,255,0.14), rgba(124,58,237,0.14))',
              border: '1px solid rgba(0,217,255,0.28)',
              color: loading ? '#3d4f6b' : '#00d9ff',
              cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: loading ? 'none' : '0 0 20px rgba(0,217,255,0.08)',
              transition: 'all 0.2s',
            }}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                style={{
                  width: '16px', height: '16px', borderRadius: '50%',
                  border: '2px solid rgba(0,217,255,0.15)',
                  borderTopColor: '#00d9ff',
                }}
              />
            ) : (
              <>
                <Mail size={14} />
                {tab === 'login' ? 'Sign In with Email' : 'Create Account'}
                <ArrowRight size={14} />
              </>
            )}
          </motion.button>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div style={{ flex: 1, height: '1px', background: 'rgba(0,217,255,0.08)' }} />
          <span style={{ fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#3d4f6b' }}>or continue with</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(0,217,255,0.08)' }} />
        </div>

        {/* Google OAuth button - full width */}
        <motion.button
          whileHover={{ scale: 1.02, borderColor: 'rgba(0,217,255,0.3)' }}
          whileTap={{ scale: 0.97 }}
          onClick={handleGoogle}
          disabled={loading}
          style={{
            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
            padding: '11px', borderRadius: '12px',
            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 500, fontSize: '13px',
            background: 'rgba(0,0,0,0.25)', border: '1px solid #1a2540',
            color: '#8b9ab5', cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'border-color 0.2s, color 0.2s',
          }}
        >
          <Chrome size={15} />
          Continue with Google
        </motion.button>

        {/* Footer */}
        <p style={{
          textAlign: 'center', marginTop: '20px',
          fontFamily: 'JetBrains Mono', fontSize: '10px', color: '#3d4f6b', lineHeight: 1.7,
        }}>
          By continuing, you agree to our{' '}
          <span style={{ color: '#00d9ff', opacity: 0.7, cursor: 'pointer' }}>Terms</span>{' '}
          &amp;{' '}
          <span style={{ color: '#00d9ff', opacity: 0.7, cursor: 'pointer' }}>Privacy Policy</span>
        </p>
      </motion.div>
    </div>
  )
}