/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Space Grotesk"', 'sans-serif'],
      },
      colors: {
        cute: {
          pink: '#FF6B9D',
          purple: '#7C3AED',
          indigo: '#4F46E5',
          amber: '#F59E0B',
          teal: '#0D9488',
          mint: '#10B981',
          bgLight: '#FAF9F6',
          bgDark: '#0B0F19',
          cardLight: '#FFFFFF',
          cardDark: '#131B2E',
          borderLight: '#E2E8F0',
          borderDark: '#1E293B',
        }
      },
      animation: {
        'bounce-subtle': 'bounceSubtle 2s infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 1.5s infinite linear',
      },
      keyframes: {
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(-3%)' },
          '50%': { transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 1, boxShadow: '0 0 25px rgba(99, 102, 241, 0.4)' },
          '50%': { opacity: 0.85, boxShadow: '0 0 10px rgba(99, 102, 241, 0.1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
