/** @type {import('tailwindcss').Config} */
const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require('daisyui'), forms, typography],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#eee",
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          ".bg-my-gradient": {
            "background": "linear-gradient(to left top, rgba(155, 217, 242, 0), #bcd4f2)"
          }
        },
      },
      {
        dark: {
          ...require("daisyui/src/colors/themes")["[data-theme=dark]"],
          ".bg-my-gradient": {
            "background": "linear-gradient(to left top, rgba(0, 0, 0, 0.45),  #002c69 )"
          },
          primary: "#181c1e",
          "base-100": "#181c1e",
        },
      },
    ],
  },
  
};