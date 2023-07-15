
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        brand: "var(--vp-c-brand)"
      },
      borderColor: {
        brand: "var(--vp-c-brand)"
      },
      textColor: {
        brand: "var(--vp-c-brand)"
      },

      typography: {
        default: {
          css: {
            '--tw-prose-links': 'var(--vp-c-brand)'
          }
        }
      }

    },

  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
}
