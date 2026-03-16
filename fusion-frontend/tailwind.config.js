/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fusion: {
          bg: '#F8F9FA',
          white: '#FFFFFF',
          'gray-light': '#E8EEF5',
          'gray-medium': '#9CA3AF',
          'gray-dark': '#4B5563',
          'blue-accent': '#2563EB',
          'blue-dark': '#1E3A8A',
        }
      },
      fontFamily: {
        heading: ['"Anton"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backdropBlur: {
        'xs': '2px',
        'sm': '4px',
        'md': '12px',
        'lg': '16px',
        'xl': '20px',
        '2xl': '40px',
      },
      backgroundImage: {
        'glass': 'rgba(255, 255, 255, 0.1)',
      }
    },
  },
  plugins: [],
}

