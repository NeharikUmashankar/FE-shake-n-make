/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    colors: {
      mainBlue: "#184B92",
      lightestBlue: "#537AB0",
      lightBlue: "#34619E",
      darkBlue: "#0E3975",
      darkestBlue: "#062A5A",
      white: "#f8fafc",
      buttonText: "#eff6ff",
      sky: colors.sky,
      amber: colors.amber,
      red: colors.red,
      rose: colors.rose,
      green: colors.green,
    },
  },
  plugins: [],
};
