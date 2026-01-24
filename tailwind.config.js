/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brc-orange": "#FF5722",
        "brc-black": "#0A0A0A",
        "brc-gray": "#1F1F1F",
        "brc-white": "#FFFFFF",
      },
      fontFamily: {
        // "sans" is the default for the whole app (Inter)
        sans: ['Inter', 'sans-serif'],
        // "display" is ONLY for big headings (Clash Display)
        display: ['Clash Display', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}