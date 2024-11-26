const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#FF5A7A',
          DEFAULT: '#DC143C',
          dark: '#8B0E26',
        },
      }
    },
  },
  plugins: [
    iconsPlugin({
      collections: getIconCollections(["mdi", "lucide"]),
    }),
  ],
}

