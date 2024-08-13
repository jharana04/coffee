/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        //"name":"value"
        lightbrown: "#d3ad7f",
        brown: "rgb(68 44 14)",
        red: "#FF6868",
        secondary: "#555",
        primary: "#FCFCFC",
      },
      // fontFamily: {
      //   primary: ["Poppins", "sans-serif"],
      // },
    },
  },
  plugins: [require("daisyui")],
};
