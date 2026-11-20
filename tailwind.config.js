/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          violet: '#7C3AED',
          violetDark: '#6D28D9',
          violetDeep: '#5B21B6',
          lime: '#A3E635',
          limeHover: '#84CC16',
          dark: '#0F071E',
          cardDark: '#1A0F35',
          cardBorder: '#2E1A56',
        }
      },
      fontFamily: {
        heading: ['"Bricolage Grotesque"', 'sans-serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        'tactile-violet': '0 4px 0 0 #5B21B6',
        'tactile-lime': '0 4px 0 0 #4D7C0F',
        'tactile-white': '0 4px 0 0 #CBD5E1',
        'glow-violet': '0 0 50px -10px rgba(124, 58, 237, 0.5)',
        'glow-lime': '0 0 50px -10px rgba(163, 230, 53, 0.4)',
      },
    },
  },
  plugins: [],
}
