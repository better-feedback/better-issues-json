module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins: ["poppins", "sans-serif"],
    },
    extend: {
      colors: {
        "better-black": "#0A0F0D",
        "better-red": "#EE4266",
        "better-yellow": "#FFEEB0",
        "better-green": "#3CBBB1",
        "better-violet": "#2A1E5C",
        "better-purple": "#B7C0EE",
        "better-white": "#FFFFFC",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
    },
  },
  plugins: [],
};
