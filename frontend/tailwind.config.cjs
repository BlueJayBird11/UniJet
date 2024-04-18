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
        "gray-600": "#2E4659", // scheduler blocks
        "takenblocks" : "#202020", // taken blocks
        "viewTimeSlots" : "#2E4659", // view time slot blocks
        "primary-blue": "#202020", // background profile/ bg scheduler
        "primary-red": "#98c1d9", // nav bar 
        "settingsIconColor": "202020", // setting icon
        "primary-green-500": "#2E4659", // nav bar circles
        "primary-green-300": "#b1e098",
        "secondary-400": "#FFCD5B",
        "secondary-500": "#FFC132",
        "primary-white": "#FFFFFF",
        "primary-black": "#DFDFDF", // text/icons
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