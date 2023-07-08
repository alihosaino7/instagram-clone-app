/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "570px",
      md: "768px",
      lg: "992px",
      xl: "1200px",
      "2xl": "1400px",
    },

    container: {
      center: true,
      padding: "1rem",
    },
    extend: {
      backgroundColor: {
        "blue-primary": "#0095f6",
        "blue-primary-hover": "#1877f2",
      },
      textColor: {
        "blue-primary": "#0095f6",
        "blue-primary-hover": "#1877f2",
      },
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("flowbite/plugin")],
};
