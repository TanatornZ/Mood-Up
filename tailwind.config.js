/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#efefef",
        menu: "#D9D9D9",
      },
    },
  },
  plugins: [require("tailwind-scrollbar")({ nocompatible: true }),],
};
