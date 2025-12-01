import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'winter-blue': '#3B82F6',
        'winter-light-blue': '#93C5FD',
        'winter-ice': '#E0F2FE',
        'winter-purple': '#A78BFA',
        'winter-pink': '#F9A8D4',
        'snow-white': '#FFFFFF',
        'winter-bg': '#F0F9FF',
        'winter-surface': '#FFFFFF',
        'winter-card': '#F8FAFC',
        'winter-text': '#1E293B',
        'winter-accent': '#06B6D4',
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'float-slow': 'float 4s ease-in-out infinite',
        'grow': 'grow 0.5s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'unwrap': 'unwrap 0.8s ease-out',
        'snow': 'snow 10s linear infinite',
        'snow-slow': 'snow 15s linear infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-15px) rotate(5deg)' },
        },
        grow: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-8px)' },
          '75%': { transform: 'translateX(8px)' },
        },
        unwrap: {
          '0%': { transform: 'scale(1) rotateY(0deg)' },
          '50%': { transform: 'scale(1.15) rotateY(180deg)' },
          '100%': { transform: 'scale(1) rotateY(0deg)' },
        },
        snow: {
          '0%': { transform: 'translateY(-100vh) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh) translateX(100px) rotate(360deg)', opacity: '0' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        },
      },
    },
  },
  plugins: [],
}
export default config

