// tailwind.config.ts (Actualización de animaciones)
import type { Config } from 'tailwindcss';

const config: Config = {
  // ... resto de la configuración
  theme: {
    extend: {
      colors: {
        'v51-cobalt': '#0047AB',
      },
      animation: {
        'reveal-left': 'revealLeft 0.8s ease-out forwards',
        'reveal-right': 'revealRight 0.8s ease-out forwards',
        'marquee-loop': 'marqueeLoop 15s linear infinite',
      },
      keyframes: {
        revealLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        revealRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        marqueeLoop: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' }, // Ajustar según duplicado de texto
        },
      },
    },
  },
};
export default config;