/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        prosper: {
          navy: '#0B1F3A',
          blue: '#1E5BFF',
          'light-gray': '#F5F7FA',
          'dark-gray': '#1A1A1A',
          white: '#FFFFFF'
        }
      },
      fontFamily: {
        sans: ['Blinker', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
