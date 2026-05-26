'use client'

import { motion } from 'framer-motion'

function SkeletonBlock({ w = '100%', h = '14px', rounded = '6px' }: { w?: string; h?: string; rounded?: string }) {
  return (
    <div style={{ position: 'relative', width: w, height: h, borderRadius: rounded, background: '#1a2540', overflow: 'hidden' }}>
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 1.6, repeat: Infinity, ease: 'linear', repeatDelay: 0.4 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(90deg, transparent, rgba(0,217,255,0.06), transparent)',
          width: '60%',
        }}
      />
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div style={{ background: '#0b1120', border: '1px solid #1a2540', borderRadius: '16px', padding: '20px' }}>
      <SkeletonBlock w="44px" h="44px" rounded="12px" />
      <div style={{ marginTop: '16px', marginBottom: '10px' }}>
        <SkeletonBlock w="85%" h="14px" />
        <div style={{ marginTop: '6px' }}>
          <SkeletonBlock w="60%" h="11px" />
        </div>
      </div>
      <SkeletonBlock w="60px" h="20px" rounded="99px" />
      <div style={{ marginTop: '16px' }}>
        <SkeletonBlock h="7px" rounded="99px" />
      </div>
      <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between' }}>
        <SkeletonBlock w="70px" h="10px" />
        <SkeletonBlock w="60px" h="10px" />
      </div>
    </div>
  )
}

export default SkeletonCard
