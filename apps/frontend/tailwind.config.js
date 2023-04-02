/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#E6E6FF",
          100: "#C4C6FF",
          200: "#A2A5FC",
          300: "#8888FC",
          400: "#7069FA",
          500: "#5D55FA",
          600: "#4D3DF7",
          700: "#3525E6",
          800: "#1D0EBE",
          900: "#0C008C",
        },
        secondary: {
          50: "#EFFCF6",
          100: "#C6F7E2",
          200: "#8EEDC7",
          300: "#65D6AD",
          400: "#3EBD93",
          500: "#27AB83",
          600: "#199473",
          700: "#147D64",
          800: "#0C6B58",
          900: "#014D40",
        },
      },
    },
  },
  plugins: [],
};
