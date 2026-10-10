/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        aurix: {
          void: '#060709',
          surface: '#0B0C10',
          elevated: '#111318',
          card: '#161822',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-bright': 'rgba(255, 255, 255, 0.16)',
          red: '#E11D48',
          'red-bright': '#FF2A55',
          'red-dark': '#881337',
          'red-glow': 'rgba(225, 29, 72, 0.35)',
          muted: '#8B92A4',
          faint: '#4F5568',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        widest: '0.2em',
        hud: '0.15em',
      },
      boxShadow: {
        'glow-red': '0 0 35px -5px rgba(225, 29, 72, 0.45)',
        'glow-red-sm': '0 0 15px -3px rgba(225, 29, 72, 0.35)',
        'card-dark': '0 10px 40px -10px rgba(0,0,0,0.85)',
      },
      backgroundImage: {
        'radial-radial': 'radial-gradient(circle at center, var(--tw-gradient-stops))',
        'noise-overlay': "radial-gradient(ellipse at top, rgba(225, 29, 72, 0.06), transparent 70%)",
      }
    },
  },
  plugins: [],
}
