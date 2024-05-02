/** @type {import('tailwindcss').Config} */

const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#E0F2FE",
          DEFAULT: "#0284C7",
          dark: "#0369A1",
        },
        accent: {
          light: "#FDE68A",
          DEFAULT: "#F59E0B",
          dark: "#B45309",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
});
