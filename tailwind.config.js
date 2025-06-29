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
        primary: {
          50: '#f0f1f9',
          100: '#dde0f1',
          200: '#c0c7e6',
          300: '#9ca6d6',
          400: '#7880c2',
          500: '#5a67d8',
          600: '#4c51bf',
          700: '#434190',
          800: '#2d3561',
          900: '#252949',
        },
        secondary: {
          50: '#edf7ed',
          100: '#d3ead6',
          200: '#a9d5b0',
          300: '#7bc285',
          400: '#57af63',
          500: '#48bb78',
          600: '#38a169',
          700: '#2d7d56',
          800: '#276749',
          900: '#22543d',
        },
        surface: '#f7fafc',
        warning: '#ed8936',
        error: '#e53e3e',
        info: '#4299e1',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        shimmer: 'shimmer 1.5s ease-in-out infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        fadeIn: 'fadeIn 0.2s ease-out',
        slideUp: 'slideUp 0.3s ease-out',
      },
      keyframes: {
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}