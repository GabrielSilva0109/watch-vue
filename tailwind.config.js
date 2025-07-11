/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#e96744',
        'primary-hover': '#d45a3e',
        'primary-light': '#f27d5f',
        'background': '#1e1e22',
        'background-light': '#2a2a30',
        'background-lighter': '#36363e',
        'text-primary': '#ffffff',
        'text-secondary': '#a0a0a0',
        'text-muted': '#737373',
      }
    },
  },
  plugins: [],
}
