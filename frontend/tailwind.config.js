/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/*.jsx", "./src/*/*.jsx"],
  theme: {
    extend: {
      animation: {
        pop: "pop 0.1s forwards",
        "zoom-in": "zoom-in 1s forwards",
        "zoom-out": "zoom-out 1s forwards",
        rotate: "rotate 0.5s infinite",
      },
      keyframes: {
        pop: {
          "0%": { scale: "1" },
          "50%": { scale: "1.1" },
          "100%": { scale: "1" },
        },
        "zoom-in": {
          "0%": { scale: "0", opacity: "0" },
          "100%": { scale: "1", opacity: "1" },
        },
        "zoom-out": {
          "0%": { scale: "1", opacity: "1" },
          "100%": { scale: "0", opacity: "0" },
        },
        rotate: {
          "0%": { scale: "1", transform: "rotate(0)" },
          "50%": { scale: "1.5", transform: "rotate(180deg)" },
          "100%": { scale: "1", transform: "rotate(360deg)" },
        },
      },
      colors: {
        "light-b": "var(--light-b)",
        "darker-g": "var(--darker-g)",
        "dark-g": "var(--dark-g)",
        "g": "var(--g)",
        "light-g": "var(--light-g)",
        "pale-b": "var(--pale-b)",
        "pale-r": "var(--pale-r)",
        "pale-g": "var(--pale-g)",
      },
    }
  },
  plugins: [],
};
