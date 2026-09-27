/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: '440px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        forest: {
          50: '#f2f8f5',
          100: '#e1efe8',
          200: '#c5ded3',
          300: '#9bc4b4',
          400: '#6ba490',
          500: '#468671',
          600: '#346b5a',
          700: '#2a5548',
          800: '#24453b',
          900: '#1e3a32',
          950: '#0d1f1a',
          DEFAULT: '#244835',
        },
        sage: {
          50: '#f6f7f4',
          100: '#ebede5',
          200: '#d7dbce',
          300: '#bcc3ae',
          400: '#9ea88c',
          500: '#838e70',
          600: '#677156',
          700: '#505844',
          800: '#424838',
          900: '#383d30',
        },
        cream: {
          50: '#fdfcf9',
          100: '#faf8f2',
          200: '#f4efe4',
          300: '#ece3d1',
          400: '#dfd2b7',
          DEFAULT: '#FAF8F3',
        },
        brand: {
          teal: '#187E91',
          'teal-dark': '#136B7C',
          'teal-light': '#25A8BE',
          forest: '#244835',
          'forest-dark': '#183325',
          clay: '#C27D56',
          sand: '#E9E4D9',
          moss: '#48684C',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '"Inter"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'premium': '0 20px 40px -15px rgba(24, 126, 145, 0.08), 0 0 1px 1px rgba(0,0,0,0.04)',
        'premium-hover': '0 30px 60px -12px rgba(24, 126, 145, 0.16), 0 0 1px 1px rgba(24, 126, 145, 0.1)',
        'glow-teal': '0 0 35px -5px rgba(24, 126, 145, 0.35)',
        'glow-forest': '0 0 35px -5px rgba(36, 72, 53, 0.35)',
      },
      animation: {
        'float-slow': 'float 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.92', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.02)' },
        },
      },
    },
  },
  plugins: [],
}
