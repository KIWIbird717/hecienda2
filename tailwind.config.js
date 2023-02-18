/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./src/components/**/*.{jsx, js}"
  ],
  theme: {
    extend: {
      colors: {
        'light-griin': '#D6EAB0',
        'green': '#80AB54',
        'gray': '#F8F8F8',
        'black': 'rgba(0, 0, 0, .85)'
      },
    },
  },
  plugins: [],
}
