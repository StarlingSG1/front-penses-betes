/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3b82f6",
        },
        black : {
          DEFAULT : "#1A1D3E"
        },
        purple : {
          DEFAULT : "#303461"
        },
        gray : {
          DEFAULT : "#6C6E8C",
          "light" : "#E2E8F0"
        },
        blue : {
          DEFAULT : "#3AAEF8",
          "hover" : "#53B8F9",
        },
        pink : {
          DEFAULT : "#9F62ED",
          "hover" : "#AE7AF0",
          // "hover" : "#924DEB",
        },
      },
      fontSize: {
        "subtitle": "1.5rem",
        "title": "2rem",
      },
      fontFamily: {
        noto: ["Noto Sans", "sans-serif"],
        lobster: ["Lobster Two", "cursive"],
        indie : ["Indie Flower", "cursive"],
      },
      screens: {
        'small': '824px',
        'smallest': '400px',
      }
    },
  },
  plugins: [],
}