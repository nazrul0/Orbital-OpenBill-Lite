/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    fontFamily: {
      main: ['"Red Hat Text"', "Helvetica", "sans-serif"],
      title: ['"Space Grotesk"', "Red Hat Text", "Helvetica", "sans-serif"],
      logo: ['"Barlow"', "Helvetica", "sans-serif"],
    },

    extend: {
      fontSize: {
        md: "1.2rem",
      },

      colors: {
        turquoise: {
          500: "#73FDEA",
          400: "#16E7CF",
        },
      },
    },
  },
  plugins: [],
}