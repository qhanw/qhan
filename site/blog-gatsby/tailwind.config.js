/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      marginTop: {
        '80%': '80%',
      },
      marginLeft: {
        '25%': '25%'
      }
    },
  },
  plugins: [],
}