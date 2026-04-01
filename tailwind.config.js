/**
 * PATH: /tailwind.config.js
 * DESC: Configuración de Antigravity para el ecosistema fractal.
 */
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'IBM Plex Mono', 'monospace'],
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-fast': 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      letterSpacing: {
        tighter: '-.05em',
        widest: '.25em',
      }
    },
  },
}