/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html','./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fdf9f5',
          100: '#f8efe7',
          200: '#f0dcc6',
          300: '#e5c8a5',
          400: '#d7ac7c',
          500: '#c48a52',
          600: '#a66f3b',
          700: '#85552e',
          800: '#6b4427',
          900: '#583a23'
        },
        clay: {
          50: '#fbf7f6',
          100: '#f3e8e4',
          200: '#e4cfc6',
          300: '#d1b0a1',
          400: '#b98b78',
          500: '#a36f5e',
          600: '#895847',
          700: '#6f4639',
          800: '#5c3a31',
          900: '#4c312a'
        },
        amber: {
          450: '#f2b566'
        }
      },
      boxShadow: {
        soft: '0 10px 25px -10px rgba(0,0,0,0.15)',
        lift: '0 16px 40px -12px rgba(0,0,0,0.2)'
      },
      borderRadius: {
        xl2: '1rem'
      },
      fontFamily: {
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif']
      },
      transitionTimingFunction: {
        'soft': 'cubic-bezier(0.22, 1, 0.36, 1)'
      }
    }
  },
  plugins: [],
}
