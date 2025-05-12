/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // ← this is key
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // you're probably already extending colors via CSS vars
    },
  },
  plugins: [],
};
