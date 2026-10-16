/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        nyrix: {
          DEFAULT: "#7c3aed",
          light: "#f8f7fc",
          purple: "#7c3aed",
          purpleBright: "#8b5cf6",
          purpleLight: "#a78bfa",
          dark: "#0f172a",
          glass: "rgba(124, 58, 237, 0.03)",
          glassBorder: "rgba(124, 58, 237, 0.1)",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ['"IBM Plex Sans"', "Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(124, 58, 237, 0.12)",
        intense: "0 0 40px rgba(124, 58, 237, 0.2)",
        card: "0 8px 32px rgba(124, 58, 237, 0.08)",
      },
    },
  },
  plugins: [],
};
