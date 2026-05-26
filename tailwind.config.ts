import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary':   'var(--bg-primary)',
        'bg-card':      'var(--bg-card)',
        'border-dark':  'var(--border)',
        'accent-cyan':  'var(--accent-cyan)',
        'accent-violet':'var(--accent-violet)',
        'accent-emerald':'var(--accent-emerald)',
        'accent-amber': 'var(--accent-amber)',
        'text-primary': 'var(--text-primary)',
        'text-muted':   'var(--text-muted)',
      },
      fontFamily: {
        sans:  ['Inter', 'system-ui', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
        mono:  ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'shimmer':      'shimmer 2s linear infinite',
        'cursor-blink': 'cursorBlink 1.1s ease-in-out infinite',
        'float':        'floatY 4s ease-in-out infinite',
        'pulse-cyan':   'pulseCyan 2s ease-in-out infinite',
        'border-pulse': 'borderPulse 3s ease-in-out infinite',
        'rotate-gradient': 'rotateGradient 4s linear infinite',
      },
      keyframes: {
        shimmer:         { '0%':{ transform:'translateX(-100%)' }, '100%':{ transform:'translateX(100%)' } },
        cursorBlink:     { '0%,100%':{ opacity:'1' }, '50%':{ opacity:'0' } },
        floatY:          { '0%,100%':{ transform:'translateY(0px)' }, '50%':{ transform:'translateY(-5px)' } },
        pulseCyan:       { '0%,100%':{ boxShadow:'0 0 0 0 rgba(0,217,255,0.4)' }, '50%':{ boxShadow:'0 0 0 6px rgba(0,217,255,0)' } },
        borderPulse:     { '0%,100%':{ borderColor:'rgba(0,217,255,0.2)' }, '50%':{ borderColor:'rgba(124,58,237,0.35)' } },
        rotateGradient:  { '0%':{ backgroundPosition:'0% 50%' }, '50%':{ backgroundPosition:'100% 50%' }, '100%':{ backgroundPosition:'0% 50%' } },
      },
    },
  },
  plugins: [],
}

export default config
