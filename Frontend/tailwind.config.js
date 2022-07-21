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
          100: "#3FEBB7"
        },

        econ_pop: {
          100: "#6268EE"
        },

        edu_pop: {
          100: "#AC70F1"
        },

        social_pop: {
          100: "#35E3E6"
        },

        gender_pop: {
          100: "#8b5cf6"
        },

        transport_pop: {
          100: "#7B75ED"
        },

        health_pop: {
          100: "#7873EA"
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