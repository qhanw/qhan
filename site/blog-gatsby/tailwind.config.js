/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
    "./src/templates/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      marginLeft: {
        '25%': '25%'
      },
      colors: {
        '#006b84': '#006b84'
      },
      width: {
        fill: 'fill-available'
      },
      paddingTop: {
        '82px': '82px',
        '120px': '120px'
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
