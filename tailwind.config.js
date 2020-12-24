const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.js', './components/**/*.js'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    colors: {
      ...colors,
      black: '#161925',
      transparent: 'transparent'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
