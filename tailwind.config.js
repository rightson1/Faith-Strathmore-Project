/** @type {import('tailwindcss').Config} */
const colors = {
  black: {
    100: "#cccccc",
    200: "#999999",
    300: "#666666",
    400: "#333333",
    500: "#000000",
    600: "#000000",
    700: "#000000",
    800: "#000000",
    900: "#000000",
  },
  white: "#ffffff",
  secondary: "#F0F0F0",
  red: {
    100: "#ffdfcc",
    200: "#ffbf9a",
    300: "#fe9e67",
    400: "#fe7e35",
    500: "#fe5e02",
    600: "#cb4b02",
    700: "#983801",
    800: "#662601",
    900: "#331300",
  },
  indigo: {
    100: "#ccdcdf",
    200: "#99b9c0",
    300: "#6697a0",
    400: "#337481",
    500: "#005161",
    600: "#00414e",
    700: "#00313a",
    800: "#002027",
    900: "#001013",
  },
  background: "#FFFFFF",
  darkBlue: "#091638",
  blue: "#1C3988",
  grayish: "#F3F3FA",
  hover: "#6E8AE9",
};

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  mode: "jit",
  theme: {
    extend: {
      fontFamily: {
        manrope: ["var(--font-manrope)"],
        quest: ["var(--font-quest)"],
      },

      screens: {
        mb: { max: "500px" }, // Define your mobile breakpoint width
        rz: { min: "500px" },
      },
      gridTemplateColumns: {
        150: "repeat(auto-fit, minmax(150px, 1fr))",
        200: "repeat(auto-fit, minmax(200px, 1fr))",
        mb: "repeat(auto-fit, minmax(150px,200px))",
        sm: "repeat(auto-fit, minmax(150px, 250px))",
      },
      colors: {
        ...colors,
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
    require("@tailwindcss/forms")({
      strategy: "class", // only generate classes
    }),
  ],
};
