'use client'
import { motion } from 'framer-motion'
import { Terminal, RefreshCw } from 'lucide-react'

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background:'var(--bg-primary)' }}>
      <motion.div
        initial={{ opacity:0, y:20 }}
        animate={{ opacity:1, y:0 }}
        transition={{ type:'spring', stiffness:300, damping:28 }}
        className="text-center max-w-sm"
      >
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
          style={{ background:'rgba(244,63,94,0.08)', border:'1px solid rgba(244,63,94,0.2)' }}>
          <Terminal size={22} style={{ color:'#f43f5e' }} />
        </div>
        <h1 style={{ fontFamily:'Space Grotesk', fontWeight:700, fontSize:'20px', color:'#e8f0fe', marginBottom:'8px' }}>
          Something went wrong
        </h1>
        <p style={{ fontFamily:'JetBrains Mono', fontSize:'11px', color:'#3d4f6b', marginBottom:'24px', wordBreak:'break-all' }}>
          {error.message}
        </p>
        <motion.button
          whileHover={{ scale:1.04 }}
          whileTap={{ scale:0.96 }}
          onClick={reset}
          className="flex items-center gap-2 mx-auto px-5 py-2.5 rounded-xl"
          style={{
            fontFamily:'Space Grotesk', fontWeight:600, fontSize:'13px',
            color:'#00d9ff', background:'rgba(0,217,255,0.08)',
            border:'1px solid rgba(0,217,255,0.25)', cursor:'pointer',
          }}
        >
          <RefreshCw size={13} /> Retry
        </motion.button>
      </motion.div>
    </div>
  )
}
