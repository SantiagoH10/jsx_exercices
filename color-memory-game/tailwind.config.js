/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ccblue': '#0D173F',
        'ccred': '#FF0000',
        'ccaqua': '#3E64B8'
      },
      fontFamily: {
        'sans': ['Arial', 'sans-serif'],
        'serif': ['Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}

