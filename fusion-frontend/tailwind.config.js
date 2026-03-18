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
          primary: '#406b4a',
          'primary-dark': '#34583d',
          'primary-darker': '#2c4c34',
          light: '#ebf2ed',
          'light-border': '#d2e3d8',
          accent: '#8bcda3',
          text: '#1a2f22',
          // Keep blue-accent mapped to brand green to fix broken carousel references
          'blue-accent': '#406b4a',
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

