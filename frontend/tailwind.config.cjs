/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "gray-20": "#F8F4EB",
        "gray-50": "#EFE6E6",
        "gray-100": "#DFCCCC",
        "gray-500": "#5E0000",
        "gray-600": "#7CDEDC", // scheduler blocks
        "primary-blue": "#003085", // background profile
        "primary-red": "#CA333A", // nav bar 
        "primary-green-500": "#92D36E", // nav bar circles
        "primary-green-300": "#b1e098",
        "secondary-400": "#FFCD5B",
        "secondary-500": "#FFC132",
        "primary-white": "#FFFFFF",
        "primary-black": "#000002", // text/icons
      },
      fontFamily: {
        dmsans: ["DM Sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
      },
    },
    screens: {
      xs: "320px", //480
      sm: "768px",
      md: "1060px",
    },
  },
  plugins: [],
}