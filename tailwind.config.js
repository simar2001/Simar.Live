module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    typography: {
      DEFAULT: { // this is for prose class
        css: {
          color: theme('colors.blue'),
        }
      }
    }
  },
  variants: {
    extend: {},
  },
  plugins: [require(node_modules/'@tailwindcss/typography')],
}