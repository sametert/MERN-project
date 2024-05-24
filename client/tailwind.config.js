/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: '#0d1f61',
        merpBg: 'rgb(22,72,196)',
        hoverBg: 'rgba(22,72,196,.9)'
      }
    },
  },
  plugins: [],
}