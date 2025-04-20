/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "media", // or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e6f7ff",
          100: "#b3e6ff",
          200: "#80d4ff",
          300: "#4dc2ff",
          400: "#1ab0ff",
          500: "#0099e6",
          600: "#0077b3",
          700: "#005580",
          800: "#00334d",
          900: "#00111a",
        },
        accent: {
          purple: "#6e56cf",
          teal: "#14b8a6",
          amber: "#f59e0b",
          rose: "#f43f5e",
          emerald: "#10b981",
        },
      },
      fontFamily: {
        sans: [
          "SF Pro Display",
          "SF Pro Text",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        mono: [
          "SF Mono",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      borderRadius: {
        "4xl": "2rem",
      },
      backdropBlur: {
        xs: "2px",
        sm: "4px",
        md: "8px",
        lg: "12px",
        xl: "16px",
        "2xl": "24px",
      },
      spacing: {
        72: "18rem",
        80: "20rem",
        96: "24rem",
        128: "32rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
        subtle: "0 2px 4px 0 rgba(0, 0, 0, 0.05)",
        elevated:
          "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-primary": "linear-gradient(145deg, #0099e6 0%, #0077b3 100%)",
        "gradient-accent": "linear-gradient(145deg, #6e56cf 0%, #5743b0 100%)",
        "gradient-subtle": "linear-gradient(145deg, #f7f7f7 0%, #eaeaea 100%)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
  safelist: [
    "bg-white",
    "bg-black",
    "text-white",
    "text-black",
    { pattern: /bg-(white|black|gray|blue|indigo|purple)\/\d+/ },
    { pattern: /border-(white|black|gray|blue|indigo|purple)\/\d+/ },
    { pattern: /text-(white|black|gray|blue|indigo|purple)\/\d+/ },
  ],
};
