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
        "takenblocks" : "#C23345", // taken scheduler blocks
        "schedulerButtons" : "#C23345", // scheduler buttons
        "settingsButtons" : "#C23345", // settings subpage buttons
        "settingsButtonsPressed" : "#c14757", // settings subpage buttons when pressed
        "viewTimeSlots" : "#404040", // view time slot blocks
        "historySearch" : "#404040", // history search bar
        "primary-blue": "#202020", // background profile/ bg scheduler
        "primary-red": "#6A0D19", // nav bar 
        "schedulerDays": "#6A0D19", // scheduler days
        "schedulerTimes": "#202020", // scheduler times
        "settingsIconColor": "#DFDFDF", // setting icon
        "primary-green-500": "#C23345", // nav bar circles
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