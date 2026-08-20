/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary-yellow': '#FFC400',
        'bright-yellow': '#FFD21F',
        'dark-navy': '#05052B',
        'deep-navy': '#070638',
        purple: {
          DEFAULT: '#5B12D6',
          bright: '#7B18E8',
        },
        magenta: '#D414FF',
        'electric-blue': '#087CFF',
        cyan: '#00E5FF',
        'light-bg': '#F7F8FC',
        'text-dark': '#151545',
        'text-gray': '#55556A',
        'border-light': '#E6E6EF',
        green: '#27AE60',
        orange: '#FF8A00',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(91, 18, 214, 0.4)',
        'glow-yellow': '0 0 20px rgba(255, 196, 0, 0.35)',
        'glow-cyan': '0 0 20px rgba(0, 229, 255, 0.35)',
        card: '0 4px 24px rgba(21, 21, 69, 0.08)',
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
