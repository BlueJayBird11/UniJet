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
        "gray-600": "#404040", // scheduler blocks
        "gray-550": "#6B5B5B", // map buttons pressed
        "takenblocks" : "#789daf", // taken scheduler blocks
        "schedulerButtons" : "#789daf", // scheduler buttons
        "settingsButtons" : "#789daf", // settings subpage buttons
        "settingsButtonsPressed" : "#9AB6C3", // settings subpage buttons when pressed
        "viewTimeSlots" : "#404040", // view time slot blocks
        "historySearch" : "#404040", // history search bar
        "primary-blue": "#202020", // background profile/ bg scheduler
        "primary-red": "#203c61", // nav bar
        "schedulerDays": "#203c61", // scheduler days
        "schedulerTimes": "#202020", // scheduler times
        "settingsIconColor": "#DFDFDF", // setting icon
        "primary-green-500": "#789daf", // nav bar circles / banners
        "navBarIcons": "#FFE4C4", // nav bar icons
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