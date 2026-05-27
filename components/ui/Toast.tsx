'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react'

type ToastType = 'success' | 'error' | 'info'

interface Toast {
  id: number
  message: string
  type: ToastType
}

interface ToastContextType {
  showToast: (message: string, type?: ToastType) => void
}

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
})

export function useToast() {
  return useContext(ToastContext)
}

const toastConfig = {
  success: {
    icon: CheckCircle,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.08)',
    border: 'rgba(16,185,129,0.25)',
  },
  error: {
    icon: AlertCircle,
    color: '#f43f5e',
    bg: 'rgba(244,63,94,0.08)',
    border: 'rgba(244,63,94,0.25)',
  },
  info: {
    icon: Info,
    color: '#00d9ff',
    bg: 'rgba(0,217,255,0.08)',
    border: 'rgba(0,217,255,0.25)',
  },
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const counterRef = useRef(0)

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    counterRef.current += 1
    const id = counterRef.current

    setToasts((prev) => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3500)
  }, [])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          maxWidth: '340px',
          width: '100%',
          pointerEvents: 'none',
        }}
      >
        <AnimatePresence>
          {toasts.map((toast) => {
            const cfg = toastConfig[toast.type]
            const Icon = cfg.icon

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 50, scale: 0.92 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 50, scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'rgba(11,17,32,0.95)',
                  border: `1px solid ${cfg.border}`,
                  backdropFilter: 'blur(16px)',
                  boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px ${cfg.bg}`,
                  pointerEvents: 'auto',
                }}
              >
                <div
                  style={{
                    width: '3px',
                    height: '32px',
                    borderRadius: '99px',
                    background: cfg.color,
                    flexShrink: 0,
                  }}
                />

                <Icon size={15} style={{ color: cfg.color, flexShrink: 0 }} />

                <p
                  style={{
                    fontFamily: 'Space Grotesk',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#e8f0fe',
                    flex: 1,
                    lineHeight: 1.4,
                  }}
                >
                  {toast.message}
                </p>

                <button
                  type="button"
                  aria-label="Close toast"
                  onClick={() =>
                    setToasts((prev) => prev.filter((t) => t.id !== toast.id))
                  }
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#3d4f6b',
                    padding: 0,
                    display: 'flex',
                  }}
                >
                  <X size={13} />
                </button>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}