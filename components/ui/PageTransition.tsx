'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { supabase } from '@/lib/supabase'
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0  }}
      exit={{    opacity: 0, y: -8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}