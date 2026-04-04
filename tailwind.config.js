/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Esto cubre todas las carpetas fractales
  ],
  theme: {
    extend: {
      colors: {
        'v51-cobalt': '#0047AB',
      }
    },
  },
  plugins: [],
}