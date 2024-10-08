/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'light-blue': '#61dafb',
      },
      fontFamily: {
        onest: ['Onest, sans-serif'],
      },
    },
  },
  plugins: [],
}
