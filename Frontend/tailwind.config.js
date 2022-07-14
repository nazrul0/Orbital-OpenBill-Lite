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

        env_pop: {
          100: "#4CE6B7"
        },

        econ_pop: {
          100: "#6174E5"
        },

        edu_pop: {
          100: "#A057FF"
        },

        social_pop: {
          100: "#0CDBEE"
        },

        gender_pop: {
          100: "#B032E2"
        },

        transport_pop: {
          100: "#7A7B92"
        },

        health_pop: {
          100: "#7D5DFD"
        },

        housing_pop: {
          100: "#0AEBE7"
        },

        priv_pop: {
          100: "#7A7B92"
        },
        
      },
    },
  },
  plugins: [],
}