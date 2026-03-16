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
          black: '#0A0A0A',
          white: '#F5F5F3',
          neon: '#CCFF00',
          darkGray: '#1A1A1A',
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

