/** @type {import('tailwindcss').Config} */
export default {
  // 1. CONTENT is for file paths only
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  // 2. THEME is where you define colors
  theme: {
    extend: {
      colors: {
        primary: '#5f6FFF', // Add your color here
      },
    },
  },
  plugins: [],
}