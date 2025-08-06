/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: "#43c463",
        "primary-dark": "#33a74c",
        "primary-glow": "#8af3a7",
        secondary: "#ffb347",
        "text-dark": "#1e1e1e",
        "text-muted": "#497b94",
        card: "#ecffd7",
        bg: "#d3f7ce",
      },
      backgroundImage: {
        "bg-gradient": "linear-gradient(135deg, #d3f7ce, #b5e8c2, #a0e2b8)",
      },
      keyframes: {
        underline: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      animation: {
        underline: 'underline 0.4s ease-out forwards',
      },
    },
  },
  plugins: [],
};
